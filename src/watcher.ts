/*
 * @poppinss/chokidar-ts
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import slash from 'slash'
import chokidar from 'chokidar'
import Emittery from 'emittery'
import { join } from 'node:path'
import tsStatic from 'typescript'

import debug from './debug.js'
import type { WatcherEvents } from './types.js'
import { SourceFilesManager } from './source_files_manager.js'

const DEFAULT_INCLUDES = ['**/*']
const DEFAULT_EXCLUDES = ['node_modules/**', 'bower_components/**', 'jspm_packages/**']

/**
 * Exposes the API to build the typescript project and then watch it
 * for changes.
 */
export class Watcher extends Emittery<WatcherEvents & { 'watcher:ready': undefined }> {
  #cwd: string
  #config: tsStatic.ParsedCommandLine
  #sourceFilesManager: SourceFilesManager

  constructor(cwd: string, config: tsStatic.ParsedCommandLine) {
    const outDir = config.raw.compilerOptions?.outDir
    const includes = config.raw.include || DEFAULT_INCLUDES
    const excludes =
      config.raw.exclude || (outDir ? DEFAULT_EXCLUDES.concat(outDir) : DEFAULT_EXCLUDES)

    debug('initiating watcher %O', { includes, excludes, outDir, files: config.fileNames })

    super()
    this.#cwd = cwd
    this.#config = config
    this.#sourceFilesManager = new SourceFilesManager(this.#cwd, {
      includes,
      excludes,
      files: config.fileNames,
    })
  }

  /**
   * Returns a boolean telling if it is a script file or not.
   *
   * We check for the `compilerOptions.allowJs` before marking
   * `.js` files as a script files.
   */
  #isScriptFile(filePath: string): boolean {
    if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
      return true
    }

    if (this.#config.options.allowJs && filePath.endsWith('.js')) {
      return true
    }

    return false
  }

  /**
   * Initiates chokidar watcher
   */
  #initiateWatcher(
    watchPattern: string | string[] = ['.'],
    watcherOptions?: chokidar.WatchOptions
  ) {
    watcherOptions = Object.assign(
      {
        ignored: this.#config.raw.exclude,
        cwd: this.#cwd,
        ignoreInitial: true,
      },
      watcherOptions
    )

    debug('initating watcher with %j options', watcherOptions)
    return chokidar.watch(watchPattern, watcherOptions)
  }

  /**
   * Process the source file
   */
  async #processSourceFile(absPath: string, relativePath: string, trigger: 'add' | 'change') {
    /**
     * Update the source files manager to add the new file or
     * bump it's version.
     *
     * Bumping the version is important, so that the typescript compiler
     * referencing the source files manager should re-read the file
     * from disk
     */
    if (trigger === 'add') {
      this.#sourceFilesManager.add(absPath)
      this.emit('source:add', { relativePath: slash(relativePath), absPath })
    } else {
      this.#sourceFilesManager.bumpVersion(absPath)
      this.emit('source:change', { relativePath: slash(relativePath), absPath })
    }
  }

  /**
   * Invoked when chokidar notifies for a new file addtion
   */
  #onNewFile(filePath: string) {
    const absPath = join(this.#cwd, filePath)

    if (!this.#isScriptFile(filePath) || !this.#sourceFilesManager.isSourceFile(absPath)) {
      debug('new file added "%s"', filePath)
      this.emit('add', { relativePath: slash(filePath), absPath })
      return
    }

    debug('new source file added "%s"', filePath)
    this.#processSourceFile(absPath, filePath, 'add')
  }

  /**
   * Invoked when chokidar notifies for changes the existing
   * source file
   */
  #onChange(filePath: string) {
    const absPath = join(this.#cwd, filePath)

    if (!this.#isScriptFile(filePath) || !this.#sourceFilesManager.isSourceFile(absPath)) {
      debug('file changed "%s"', filePath)
      this.emit('change', { relativePath: slash(filePath), absPath })
      return
    }

    debug('source file changed "%s"', filePath)
    this.#processSourceFile(absPath, filePath, 'change')
  }

  /**
   * Invoked when chokidar notifies for file deletion
   */
  #onRemove(filePath: string) {
    const absPath = join(this.#cwd, filePath)

    if (!this.#isScriptFile(filePath) || !this.#sourceFilesManager.isSourceFile(absPath)) {
      debug('file removed "%s"', filePath)
      this.emit('unlink', { relativePath: slash(filePath), absPath })
      return
    }

    debug('source file removed "%s"', filePath)

    /**
     * Clean up tracking for a given file
     */
    this.#sourceFilesManager.remove(absPath)

    /**
     * Notify subscribers
     */
    this.emit('source:unlink', { relativePath: slash(filePath), absPath })
  }

  /**
   * Build and watch project for changes
   */
  watch(watchPattern: string | string[] = ['.'], watcherOptions?: chokidar.WatchOptions) {
    const watcher = this.#initiateWatcher(watchPattern, watcherOptions)

    watcher.on('ready', () => {
      debug('watcher ready')
      this.emit('watcher:ready')
    })

    watcher.on('add', (path: string) => this.#onNewFile(path))
    watcher.on('change', (path: string) => this.#onChange(path))
    watcher.on('unlink', (path: string) => this.#onRemove(path))

    return watcher
  }
}
