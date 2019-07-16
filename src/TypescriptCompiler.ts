/**
 * @module @poppinss/chokidar-ts
 */

/*
* @poppinss/chokidar-ts
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import * as nanomatch from 'nanomatch'
import * as tsStatic from 'typescript'
import * as chokidar from 'chokidar'
import { join, relative } from 'path'
import { EventEmitter } from 'events'
import { existsSync, readFileSync, writeFileSync } from 'fs'

type PluginFn = (
  ts: typeof tsStatic,
  config: tsStatic.CompilerOptions,
) => tsStatic.TransformerFactory<tsStatic.SourceFile> | tsStatic.CustomTransformerFactory

/**
 * Exposes the API to compile Typescript projects and watch for file changes
 * along with other files than the source typescript files.
 */
export class TypescriptCompiler extends EventEmitter {
  /**
   * Only created when `watch` method is invoked
   */
  public watcher?: chokidar.FSWatcher

  /**
   * A copy of initial source files we collected after the first build. We
   * mutate this object, when we detect a new file being added or removed
   * inside the watcher.
   */
  private _sourceFiles: tsStatic.MapLike<{ version: number }> = {}

  /**
   * Include patterns defined inside `tsconfig.json` file.
   */
  private _includePatterns: string[] = []

  /**
   * Exlcude patterns defined inside `tsconfig.json` file.
   */
  private _excludePatterns: string[] = []

  /**
   * Reference to language service to compile files on demand inside
   * the watcher.
   */
  private _languageService: tsStatic.LanguageService

  /**
   * A copy of custom transformers
   */
  private _transformers: tsStatic.CustomTransformers = {
    before: [],
    after: [],
  }

  /**
   * Registered list of plugins
   */
  private _plugins: { fn: PluginFn, lifecycle: 'after' | 'before' }[] = []

  constructor (
    private _ts: typeof tsStatic,
    private _configPath: string,
    private _cwd: string,
  ) {
    super()
  }

  /**
   * Builds the initial typescript project and emit the diagnostic
   */
  private _buildProject (fileNames: string[], options: tsStatic.CompilerOptions): boolean {
    /**
     * Calling plugins to setup transformers
     */
    this._plugins.forEach(({ fn, lifecycle }) => {
      if (lifecycle === 'after') {
        this._transformers.after!.push(fn(this._ts, options))
      } else {
        this._transformers.before!.push(fn(this._ts, options))
      }
    })

    const program = this._ts.createProgram(fileNames, options)
    const result = program.emit(
      undefined,
      this._ts.sys.writeFile,
      undefined,
      undefined,
      this._transformers,
    )

    const diagnostics = this._ts.getPreEmitDiagnostics(program).concat(result.diagnostics)

    this.emit('initial:build', result.emitSkipped, diagnostics)
    return !result.emitSkipped
  }

  /**
   * Loads the project config
   */
  private _loadConfig (optionsToExtends?: tsStatic.CompilerOptions): {
    error?: tsStatic.Diagnostic,
    config?: tsStatic.ParsedCommandLine,
  } {
    let hardException: null | tsStatic.Diagnostic = null

    const parsedConfig = this._ts.getParsedCommandLineOfConfigFile(
      this._configPath,
      optionsToExtends || {},
      {
        ...this._ts.sys,
        useCaseSensitiveFileNames: true,
        onUnRecoverableConfigFileDiagnostic: (error) => {
          hardException = error
        },
      },
    )

    if (hardException) {
      return { error: hardException }
    }

    /**
     * Setting include patterns, so that we can ignore typescript files
     * which are not part of the typescript project
     */
    const includeSpecs = parsedConfig!['configFileSpecs'].validatedIncludeSpecs
    this._includePatterns = includeSpecs.map((path: string) => {
      return join(this._cwd, relative(this._cwd, path))
    })

    /**
     * Setting exclude patterns, so that we can ignore typescript files
     * are excluded
     */
    const excludeSpecs = parsedConfig!['configFileSpecs'].validatedExcludeSpecs
    this._excludePatterns = excludeSpecs.map((path: string) => {
      return join(this._cwd, relative(this._cwd, path))
    })

    /**
     * Setting source files. We are later use them with language
     * service
     */
    parsedConfig!.fileNames.forEach((file) => {
      this._sourceFiles[file] = { version: 1 }
    })

    return { config: parsedConfig }
  }

  /**
   * Creates a new service host
   */
  private _getServiceHost (options: tsStatic.CompilerOptions): tsStatic.LanguageServiceHost {
    return {
      getScriptFileNames: () => Object.keys(this._sourceFiles),
      getScriptVersion: file => {
        return this._sourceFiles[file] && this._sourceFiles[file].version.toString()
      },
      getScriptSnapshot: fileName => {
        if (!existsSync(fileName)) {
          return undefined
        }
        return this._ts.ScriptSnapshot.fromString(readFileSync(fileName).toString())
      },
      getCustomTransformers: () => this._transformers,
      getCurrentDirectory: () => this._cwd,
      getCompilationSettings: () => options,
      getDefaultLibFileName: options => this._ts.getDefaultLibFilePath(options),
      fileExists: this._ts.sys.fileExists,
      readFile: this._ts.sys.readFile,
      readDirectory: this._ts.sys.readDirectory,
    }
  }

  /**
   * Creates the language service. We use this service process
   * changed files.
   */
  private _createLanguageService (options: tsStatic.CompilerOptions) {
    this._languageService = this._ts.createLanguageService(
      this._getServiceHost(options),
      this._ts.createDocumentRegistry(),
    )
  }

  /**
   * Returns a boolean telling if it is a typescript
   * file or not.
   */
  private _isTsFile (filePath: string): boolean {
    return filePath.endsWith('.ts')
  }

  /**
   * Returns a boolean telling if the absolute file to a path
   * is part of the typescript project or not. It will look
   * at the `includes` and `excludes` section of `tsconfig`
   * to make the decision.
   */
  private _isTsSourceFile (absPath: string): boolean {
    /**
     * If file exists in the `sourceFiles`, then return true
     */
    if (this._sourceFiles[absPath]) {
      return true
    }

    /**
     * Return `false` when file is not part of the include
     * patterns
     */
    if (!nanomatch.isMatch(absPath, this._includePatterns)) {
      return false
    }

    /**
     * If file is part of include patterns, then make sure that
     * this file is not excluded as well.
     */
    return !nanomatch.isMatch(absPath, this._excludePatterns)
  }

  /**
   * Returns diagnostics for a given file. The file must be
   * tracked by the `languageService` compiler first.
   */
  private _getFileErrors (absPath: string): tsStatic.Diagnostic[] {
    return this._languageService
      .getCompilerOptionsDiagnostics()
      .concat(this._languageService.getSyntacticDiagnostics(absPath))
      .concat(this._languageService.getSemanticDiagnostics(absPath))
  }

  /**
   * Processing the source file by getting it's emit output
   * and writing it to the disk
   */
  private _processSourceFile (absPath: string) {
    const output = this._languageService.getEmitOutput(absPath)

    if (output.emitSkipped) {
      this.emit('subsequent:build', true, this._getFileErrors(absPath))
      return
    }

    this.emit('subsequent:build', false, this._getFileErrors(absPath))
    output.outputFiles.forEach((one) => {
      writeFileSync(one.name, one.text, 'utf-8')
    })
  }

  /**
   * Triggered when an existing file is changed
   */
  private _onChange (filePath: string) {
    /**
     * Emit `change` when source file is not a typescript
     * file, since we don't handle them.
     */
    if (!this._isTsFile(filePath)) {
      this.emit('change', filePath)
      return
    }

    const absPath = join(this._cwd, filePath)

    /**
     * Ignore file when it's not part of the typescript project
     */
    if (!this._isTsSourceFile(absPath)) {
      return
    }

    /**
     * Bump the file version, so that the language service should read
     * the file again from disk.
     */
    this._sourceFiles[absPath].version++
    this._processSourceFile(absPath)
  }

  /**
   * Triggered when file is removed
   */
  private _onRemove (filePath: string) {
    /**
     * Emit `unlink` when source file is not a typescript
     * file, since we don't handle them.
     */
    if (!this._isTsFile(filePath)) {
      this.emit('unlink', filePath)
      return
    }

    const absPath = join(this._cwd, filePath)
    delete this._sourceFiles[absPath]
  }

  /**
   * Triggered when a new file is added to the project
   */
  private _onNewFile (filePath: string) {
    /**
     * Emit `add` when source file is not a typescript
     * file, since we don't handle them.
     */
    if (!this._isTsFile(filePath)) {
      this.emit('add', filePath)
      return
    }

    const absPath = join(this._cwd, filePath)

    /**
     * Ignore file when it's not part of the typescript project
     */
    if (!this._isTsSourceFile(absPath)) {
      return
    }

    /**
     * Start tracking the file, so that language server can do it's job
     * and also it will improve the performance of `_isTsSourceFile`
     * in subsequent events.
     */
    this._sourceFiles[absPath] = { version: 1 }
    this._processSourceFile(absPath)
  }

  public on (event: 'watcher:ready', cb: () => void): this
  public on (event: 'add', cb: (filePath: string) => void): this
  public on (event: 'change', cb: (filePath: string) => void): this
  public on (event: 'unlink', cb: (filePath: string) => void): this
  public on (event: 'config:error', cb: (error: tsStatic.Diagnostic) => void): this
  public on (event: 'config:success', cb: (config: tsStatic.ParsedCommandLine) => void): this

  public on (
    event: 'initial:build',
    cb: (hasError: boolean, diagnostics: tsStatic.Diagnostic[]) => void,
  ): this

  public on (
    event: 'subsequent:build',
    cb: (hasError: boolean, diagnostics: tsStatic.Diagnostic[]) => void,
  ): this

  public on (event: string, cb: any): this
  public on (event: string, cb: any): this {
    super.on(event, cb)
    return this
  }

  /**
   * Hook plugin to define custom transformers
   */
  public use (transformer: PluginFn, lifecycle: 'before' | 'after'): this {
    this._plugins.push({ fn: transformer, lifecycle })
    return this
  }

  /**
   * Build typescript project
   */
  public build (parsedConfig: tsStatic.ParsedCommandLine): boolean {
    return this._buildProject(parsedConfig.fileNames, parsedConfig.options)
  }

  /**
   * Parses and returns the config. Also an event will be
   * emitted when config has errors.
   */
  public parseConfig (
    compileOptionsToExtend?: tsStatic.CompilerOptions,
  ): { error?: tsStatic.Diagnostic, config?: tsStatic.ParsedCommandLine } {
    return this._loadConfig(compileOptionsToExtend)
  }

  /**
   * Build the initial project and then start watcher
   */
  public watch (
    parsedConfig: tsStatic.ParsedCommandLine,
    watchPattern: string | string[] = ['.'],
    options?: chokidar.WatchOptions,
  ) {
    /**
     * Do initial project build, this will emit `initial:build`
     * event. If build fails, then we will not start the
     * watcher.
     */
    const success = this._buildProject(parsedConfig.fileNames, parsedConfig.options)
    if (!success) {
      return
    }

    options = Object.assign({
      /**
       * Ignoring dot files, node_modules and the `outDir`.
       */
      ignored: [
        'node_modules/**',
        `${parsedConfig.options.outDir}/**`,
        /(^|[\/\\])\../,
      ],
      cwd: this._cwd,
      ignoreInitial: true,
    }, options)

    this.watcher = chokidar.watch(watchPattern, options)
    this.watcher.on('ready', () => {
      this.emit('watcher:ready')
      this._createLanguageService(parsedConfig.options)
    })

    this.watcher.on('add', (path: string) => this._onNewFile(path))
    this.watcher.on('change', (path: string) => this._onChange(path))
    this.watcher.on('unlink', (path: string) => this._onRemove(path))
  }
}
