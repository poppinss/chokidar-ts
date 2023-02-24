/*
 * @poppinss/chokidar-ts
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import Debug from 'debug'
import { join } from 'path'
import chokidar from 'chokidar'
import Emittery from 'emittery'
import tsStatic from 'typescript'

import { WatcherEvents } from './Contracts'
import { SourceFilesManager } from './SourceFilesManager'

const debug = Debug('tsc:watcher')

/**
 * Exposes the API to build the typescript project and then watch it
 * for changes.
 */
export class Watcher extends Emittery<WatcherEvents & { 'watcher:ready': undefined }> {
  /**
   * Available only in both modes
   */
  private sourceFilesManager: SourceFilesManager

  public chokidar: chokidar.FSWatcher
  public program: tsStatic.Program
  public host: tsStatic.CompilerHost
  public compilerOptions?: tsStatic.CompilerOptions

  constructor(private cwd: string, private config: tsStatic.ParsedCommandLine) {
    super()
    debug('initiating watcher')
  }

  /**
   * Returns a boolean telling if it is a script file or not.
   *
   * We check for the `compilerOptions.allowJs` before marking
   * `.js` files as a script files.
   */
  private isScriptFile(filePath: string): boolean {
    if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
      return true
    }

    if (this.compilerOptions!.allowJs && filePath.endsWith('.js')) {
      return true
    }

    return false
  }

  /**
   * Initiates the source file manager to track the source files as they
   * are added, changed and removed
   */
  private initiateSourceFileManager(config: tsStatic.ParsedCommandLine) {
    this.sourceFilesManager = new SourceFilesManager(this.cwd, {
      includes: config!.raw.include,
      excludes: config!.raw.exclude,
      files: config!.fileNames,
    })
  }

  /**
   * Initiates chokidar watcher
   */
  private initiateWatcher(
    watchPattern: string | string[] = ['.'],
    watcherOptions?: chokidar.WatchOptions
  ) {
    watcherOptions = Object.assign(
      {
        ignored: this.config.raw.exclude,
        cwd: this.cwd,
        ignoreInitial: true,
      },
      watcherOptions
    )

    debug('initating watcher with %j options', watcherOptions)
    this.chokidar = chokidar.watch(watchPattern, watcherOptions)
  }

  /**
   * Process the source file
   */
  private async processSourceFile(
    absPath: string,
    relativePath: string,
    trigger: 'add' | 'change'
  ) {
    /**
     * Update the source files manager to add the new file or
     * bump it's version.
     *
     * Bumping the version is important, so that the typescript compiler
     * referencing the source files manager should re-read the file
     * from disk
     */
    if (trigger === 'add') {
      this.sourceFilesManager.add(absPath)
      this.emit('source:add', { relativePath, absPath })
    } else {
      this.sourceFilesManager.bumpVersion(absPath)
      this.emit('source:change', { relativePath, absPath })
    }
  }

  /**
   * Invoked when chokidar notifies for a new file addtion
   */
  private onNewFile(filePath: string) {
    const absPath = join(this.cwd, filePath)

    if (!this.isScriptFile(filePath) || !this.sourceFilesManager.isSourceFile(absPath)) {
      debug('new file added "%s"', filePath)
      this.emit('add', { relativePath: filePath, absPath })
      return
    }

    debug('new source file added "%s"', filePath)
    this.processSourceFile(absPath, filePath, 'add')
  }

  /**
   * Invoked when chokidar notifies for changes the existing
   * source file
   */
  private onChange(filePath: string) {
    const absPath = join(this.cwd, filePath)

    if (!this.isScriptFile(filePath) || !this.sourceFilesManager.isSourceFile(absPath)) {
      debug('file changed "%s"', filePath)
      this.emit('change', { relativePath: filePath, absPath })
      return
    }

    debug('source file changed "%s"', filePath)
    this.processSourceFile(absPath, filePath, 'change')
  }

  /**
   * Invoked when chokidar notifies for file deletion
   */
  private onRemove(filePath: string) {
    const absPath = join(this.cwd, filePath)

    if (!this.isScriptFile(filePath) || !this.sourceFilesManager.isSourceFile(absPath)) {
      debug('file removed "%s"', filePath)
      this.emit('unlink', { relativePath: filePath, absPath })
      return
    }

    debug('source file removed "%s"', filePath)

    /**
     * Clean up tracking for a given file
     */
    this.sourceFilesManager.remove(absPath)

    /**
     * Notify subscribers
     */
    this.emit('source:unlink', { relativePath: filePath, absPath })
  }

  /**
   * Build and watch project for changes
   */
  public watch(watchPattern: string | string[] = ['.'], watcherOptions?: chokidar.WatchOptions) {
    this.initiateSourceFileManager(this.config)
    this.initiateWatcher(watchPattern, watcherOptions)

    this.chokidar.on('ready', () => {
      debug('watcher ready')
      this.emit('watcher:ready')
    })

    this.chokidar.on('add', (path: string) => this.onNewFile(path))
    this.chokidar.on('change', (path: string) => this.onChange(path))
    this.chokidar.on('unlink', (path: string) => this.onRemove(path))
  }
}
