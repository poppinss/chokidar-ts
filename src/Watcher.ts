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
import { outputFile } from 'fs-extra'

import { Builder } from './Builder'
import { ReferenceTree } from './ReferenceTree'
import { PluginManager } from './PluginManager'
import { DiagnosticsStore } from './DiagnosticsStore'
import { SourceFilesManager } from './SourceFilesManager'

const debug = Debug('tsc:watcher')

/**
 * Exposes the API to build the typescript project and then watch it
 * for changes.
 */
export class Watcher extends Emittery {
  private _referenceTree: ReferenceTree
  private _diagnosticsStore: DiagnosticsStore
  private _sourceFilesManager: SourceFilesManager
  private _languageService: tsStatic.LanguageService

  public watcher: chokidar.FSWatcher
  public program: tsStatic.Program
  public host: tsStatic.CompilerHost

  constructor (
    private _cwd: string,
    private _configFileName: string,
    private _ts: typeof tsStatic,
    private _pluginManager: PluginManager,
  ) {
    super()
    debug('initiating watcher')
  }

  /**
   * Returns a boolean telling if it is a script file or not.
   * Typescript can process `.js` and `.ts` files both.
   *
   * Even though it can also handle `.json` files, we don't suppor them
   * yet.
   */
  private _isScriptFile (filePath: string): boolean {
    return filePath.endsWith('.ts') || filePath.endsWith('.js')
  }

  /**
   * Initiates the source file manager to track the source files as they
   * are added, changed and removed
   */
  private _initiateSourceFileManager (config: tsStatic.ParsedCommandLine) {
    this._sourceFilesManager = new SourceFilesManager(this._cwd, {
      includes: config['configFileSpecs'].validatedIncludeSpecs,
      excludes: config['configFileSpecs'].validatedExcludeSpecs,
      files: config!.fileNames,
    })
  }

  /**
   * Initiates the diagnostic store to store diagnostic messages
   */
  private _initiateDiagnosticsStore (diagnostics: tsStatic.Diagnostic[]) {
    this._diagnosticsStore = new DiagnosticsStore()
    this._diagnosticsStore.bulkAdd(diagnostics)
  }

  /**
   * Initiates the reference tree to track module dependencies
   */
  private _initiateReferenceTree () {
    this._referenceTree = new ReferenceTree()

    Object.keys(this._sourceFilesManager.toJSON()).forEach((filePath) => {
      const sourceFile = this.program.getSourceFile(filePath)
      if (!sourceFile) {
        return
      }

      const imports = this._ts.preProcessFile(sourceFile.text).importedFiles
      this._referenceTree.add(filePath, imports.map((file) => file.fileName))
    })
  }

  /**
   * Initiates chokidar watcher
   */
  private _initiateWatcher (
    outDir: string,
    watchPattern: string | string[] = ['.'],
    watcherOptions?: chokidar.WatchOptions,
  ) {
    watcherOptions = Object.assign({
      ignored: [
        'node_modules/**',
        `${outDir}/**`,
        /(^|[\/\\])\../,
      ],
      cwd: this._cwd,
      ignoreInitial: true,
    }, watcherOptions)

    debug('initating watcher with %j options', watcherOptions)
    this.watcher = chokidar.watch(watchPattern, watcherOptions)
  }

  /**
   * Initiates the language service. We can use the service instance to
   * re-compile files, without re-building the entire project
   */
  private _initiateLanguageService (options: tsStatic.CompilerOptions) {
    /**
     * Compiler host for the language service. This is pretty much a copy/paste
     * from the Typescript compiler API documentation
     */
    const languageServiceHost = {
      readFile: this._ts.sys.readFile,
      fileExists: this._ts.sys.fileExists,
      readDirectory: this._ts.sys.readDirectory,

      getCurrentDirectory: () => this._cwd,
      getCompilationSettings: () => options,
      getScriptFileNames: () => Object.keys(this._sourceFilesManager.toJSON()),
      getDefaultLibFileName: options => this._ts.getDefaultLibFilePath(options),
      getCustomTransformers: () => this._pluginManager.getTransformers(this._ts, options),

      getScriptVersion: file => {
        const version = this._sourceFilesManager.getFileVersion(file)
        return version ? String(version) : ''
      },

      getScriptSnapshot: fileName => {
        const contents = this._ts.sys.readFile(fileName)
        if (contents === undefined) {
          return undefined
        }
        return this._ts.ScriptSnapshot.fromString(contents.toString())
      },
    }

    debug('initating language service')
    this._languageService = this._ts.createLanguageService(
      languageServiceHost,
      this._ts.createDocumentRegistry(),
    )
  }

  /**
   * Process the diagnostics for a given file by adding
   * them to the diagnostics store.
   */
  private _processFileDiagnostics (absPath: string) {
    const diagnostics = this._languageService
      .getCompilerOptionsDiagnostics()
      .concat(this._languageService.getSyntacticDiagnostics(absPath))
      .concat(this._languageService.getSemanticDiagnostics(absPath))

    this._diagnosticsStore.add(absPath, diagnostics)
  }

  /**
   * Rebuilds the source file without writing it's compiled output
   * to the disk. Following operations are peformed.
   *
   * 1. File is re-compiled
   * 2. File diagnostics are updated in the store.
   * 3. Reference tree is updated with new imports.
   */
  private _reBuildSourceFile (absPath: string): tsStatic.EmitOutput {
    /**
     * Process file diagnostics and update the diagnostic store
     */
    this._processFileDiagnostics(absPath)

    /**
     * Getting emit output for the file
     */
    const output = this._languageService.getEmitOutput(absPath)

    /**
     * Make sure to re-add the module, so that we can track it's imports
     * and reconcile the dependencies tree
     */
    output.outputFiles.forEach((file) => {
      const imports = this._ts.preProcessFile(file.text).importedFiles
      this._referenceTree.add(file.name, imports.map((file) => file.fileName))
    })

    return output
  }

  /**
   * Process the source file
   */
  private async _processSourceFile (
    absPath: string,
    relativePath: string,
    trigger: 'add' | 'change',
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
      this._sourceFilesManager.add(absPath)
    } else {
      this._sourceFilesManager.bumpVersion(absPath)
    }

    const output = this._reBuildSourceFile(absPath)

    /**
     * Re-build source file dependencies, since the changes in the public
     * API may impact the dependencies as well
     */
    const dependencies = this._referenceTree.getDependencies(absPath)
    dependencies.forEach((dependency) => this._reBuildSourceFile(dependency))

    /**
     * Write files to the disk, when the emitting
     * is enabled
     */
    if (!output.emitSkipped) {
      await Promise.all(output.outputFiles.map((one) => {
        return outputFile(one.name, one.text, 'utf-8')
      }))
    }

    /**
     * Notify subscribers
     */
    this.emit('subsequent:build', {
      path: relativePath,
      skipped: output.emitSkipped,
      diagnostics: this._diagnosticsStore.toJSON(),
    })
  }

  /**
   * Invoked when chokidar notifies for a new file addtion
   */
  private _onNewFile (filePath: string) {
    const absPath = join(this._cwd, filePath)

    if (!this._isScriptFile(filePath) || !this._sourceFilesManager.isSourceFile(absPath)) {
      debug('new file added "%s"', filePath)
      this.emit('add', filePath)
      return
    }

    debug('new source file added "%s"', filePath)
    this._processSourceFile(absPath, filePath, 'add')
  }

  /**
   * Invoked when chokidar notifies for changes the existing
   * source file
   */
  private _onChange (filePath: string) {
    const absPath = join(this._cwd, filePath)

    if (!this._isScriptFile(filePath) || !this._sourceFilesManager.isSourceFile(absPath)) {
      debug('file changed "%s"', filePath)
      this.emit('change', filePath)
      return
    }

    debug('source file changed "%s"', filePath)
    this._processSourceFile(absPath, filePath, 'change')
  }

  /**
   * Invoked when chokidar notifies for file deletion
   */
  private _onRemove (filePath: string) {
    const absPath = join(this._cwd, filePath)

    if (!this._isScriptFile(filePath) || !this._sourceFilesManager.isSourceFile(absPath)) {
      debug('file removed "%s"', filePath)
      this.emit('unlink', filePath)
      return
    }

    /**
     * Clean up tracking for a given file
     */
    this._sourceFilesManager.remove(absPath)
    this._diagnosticsStore.remove(absPath)
    this._referenceTree.remove(absPath)

    /**
     * Notify subscribers
     */
    debug('source file removed "%s"', filePath)
    this.emit('source:unlink', filePath)
  }

  public on (event: 'watcher:ready', cb: () => void): Emittery.UnsubscribeFn
  public on (event: 'add', cb: (filePath: string) => void): Emittery.UnsubscribeFn
  public on (event: 'change', cb: (filePath: string) => void): Emittery.UnsubscribeFn
  public on (event: 'unlink', cb: (filePath: string) => void): Emittery.UnsubscribeFn
  public on (event: 'source:unlink', cb: (filePath: string) => void): Emittery.UnsubscribeFn

  public on (
    event: 'subsequent:build',
    cb: (data: {
      path: string,
      skipped: boolean,
      diagnostics: tsStatic.Diagnostic[],
    }) => void,
  ): Emittery.UnsubscribeFn

  public on (event: string, cb: any): Emittery.UnsubscribeFn
  public on (event: string, cb: any): Emittery.UnsubscribeFn {
    return super.on(event, cb)
  }

  /**
   * Build and watch project for changes
   */
  public watch (
    watchPattern: string | string[] = ['.'],
    watcherOptions?: chokidar.WatchOptions,
    optionsToExtend?: tsStatic.CompilerOptions,
  ) {
    const builder = new Builder(this._cwd, this._configFileName, this._ts, this._pluginManager)
    const buildResponse = builder.build(optionsToExtend)

    this.program = builder.program
    this.host = builder.host

    /**
     * Do not start watcher when config is missing
     */
    if (!buildResponse.config) {
      return buildResponse
    }

    this._initiateDiagnosticsStore(buildResponse.diagnostics)
    this._initiateSourceFileManager(buildResponse.config!)
    this._initiateReferenceTree()
    this._initiateWatcher(buildResponse.config!.options.outDir!, watchPattern, watcherOptions)

    this.watcher.on('ready', () => {
      debug('watcher ready')
      this.emit('watcher:ready')
      this._initiateLanguageService(buildResponse.config!.options)
    })

    this.watcher.on('add', (path: string) => this._onNewFile(path))
    this.watcher.on('change', (path: string) => this._onChange(path))
    this.watcher.on('unlink', (path: string) => this._onRemove(path))

    return buildResponse
  }
}
