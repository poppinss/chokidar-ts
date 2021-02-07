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
import { WatcherEvents } from './Contracts'
import { ReferenceTree } from './ReferenceTree'
import { PluginManager } from './PluginManager'
import { ModuleResolver } from './ModuleResolver'
import { DiagnosticsStore } from './DiagnosticsStore'
import { SourceFilesManager } from './SourceFilesManager'

const debug = Debug('tsc:watcher')

/**
 * Exposes the API to build the typescript project and then watch it
 * for changes.
 */
export class LspWatcher extends Emittery.Typed<WatcherEvents, 'watcher:ready'> {
  /**
   * Available only in LSP mode
   */
  private referenceTree: ReferenceTree
  private diagnosticsStore: DiagnosticsStore
  private moduleResolver: ModuleResolver
  private languageService: tsStatic.LanguageService

  /**
   * Available only in both modes
   */
  private sourceFilesManager: SourceFilesManager

  public chokidar: chokidar.FSWatcher
  public program: tsStatic.Program
  public host: tsStatic.CompilerHost
  public compilerOptions?: tsStatic.CompilerOptions

  constructor(
    private cwd: string,
    private ts: typeof tsStatic,
    private config: tsStatic.ParsedCommandLine,
    private pluginManager: PluginManager
  ) {
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
   * Returns resolved imports from the source text
   */
  private getSourceImports(filePath: string, fileText: string) {
    const { importedFiles, ambientExternalModules } = this.ts.preProcessFile(fileText, true, true)

    if (ambientExternalModules) {
      this.moduleResolver.addAmbientModules(filePath, ambientExternalModules)
    }

    return importedFiles.reduce((result: string[], { fileName }) => {
      const resolvedImport = this.moduleResolver.resolve(fileName, filePath)
      if (resolvedImport) {
        result.push(resolvedImport)
      }

      return result
    }, [])
  }

  /**
   * Initiates the source file manager to track the source files as they
   * are added, changed and removed
   */
  private initiateSourceFileManager(config: tsStatic.ParsedCommandLine) {
    this.sourceFilesManager = new SourceFilesManager(this.cwd, {
      includes: config['configFileSpecs'].validatedIncludeSpecs,
      excludes: config['configFileSpecs'].validatedExcludeSpecs,
      files: config!.fileNames,
    })
  }

  /**
   * Initiates the diagnostic store to store diagnostic messages
   */
  private initiateDiagnosticsStore(diagnostics: tsStatic.Diagnostic[]) {
    this.diagnosticsStore = new DiagnosticsStore()
    this.diagnosticsStore.bulkAdd(diagnostics)
  }

  /**
   * Initiates the module resolver. We need it to resolve imports
   */
  private initiateModuleResolver() {
    this.moduleResolver = new ModuleResolver(this.ts, this.compilerOptions!)
  }

  /**
   * Initiates the reference tree to track module dependencies
   */
  private initiateReferenceTree() {
    this.referenceTree = new ReferenceTree()

    Object.keys(this.sourceFilesManager.toJSON()).forEach((filePath) => {
      const sourceFile = this.program.getSourceFile(filePath)
      if (!sourceFile) {
        return
      }

      this.referenceTree.add(filePath, this.getSourceImports(filePath, sourceFile.text))
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
        ignored: [this.config.raw.exclude],
        cwd: this.cwd,
        ignoreInitial: true,
      },
      watcherOptions
    )

    debug('initating watcher with %j options', watcherOptions)
    this.chokidar = chokidar.watch(watchPattern, watcherOptions)
  }

  /**
   * Initiates the language service. We can use the service instance to
   * re-compile files, without re-building the entire project
   */
  private initiateLanguageService(options: tsStatic.CompilerOptions) {
    /**
     * Compiler host for the language service. This is pretty much a copy/paste
     * from the Typescript compiler API documentation
     */
    const languageServiceHost: tsStatic.LanguageServiceHost = {
      readFile: this.ts.sys.readFile,
      fileExists: this.ts.sys.fileExists,
      readDirectory: this.ts.sys.readDirectory,

      getCurrentDirectory: () => this.cwd,
      getCompilationSettings: () => options,
      getScriptFileNames: () => Object.keys(this.sourceFilesManager.toJSON()),
      getDefaultLibFileName: (libOptions) => this.ts.getDefaultLibFilePath(libOptions),
      getCustomTransformers: () => this.pluginManager.getTransformers(this.ts, options),

      getScriptVersion: (file) => {
        const version = this.sourceFilesManager.getFileVersion(file)
        return version ? String(version) : ''
      },

      getScriptSnapshot: (fileName) => {
        const contents = this.ts.sys.readFile(fileName)
        if (contents === undefined) {
          return undefined
        }
        return this.ts.ScriptSnapshot.fromString(contents.toString())
      },
    }

    debug('initating language service')
    this.languageService = this.ts.createLanguageService(
      languageServiceHost,
      this.ts.createDocumentRegistry()
    )
  }

  /**
   * Process the diagnostics for a given file by adding
   * them to the diagnostics store.
   */
  private processFileDiagnostics(absPath: string) {
    const diagnostics = this.languageService
      .getCompilerOptionsDiagnostics()
      .concat(this.languageService.getSyntacticDiagnostics(absPath))
      .concat(this.languageService.getSemanticDiagnostics(absPath))

    this.diagnosticsStore.add(absPath, diagnostics)
  }

  /**
   * Rebuilds the source file without writing it's compiled output
   * to the disk. Following operations are peformed.
   *
   * 1. File is re-compiled
   * 2. File diagnostics are updated in the store.
   * 3. Reference tree is updated with new imports.
   */
  private reBuildSourceFile(absPath: string): tsStatic.EmitOutput {
    /**
     * Process file diagnostics and update the diagnostic store
     */
    this.processFileDiagnostics(absPath)

    /**
     * Getting emit output for the file
     */
    const output = this.languageService.getEmitOutput(absPath)

    /**
     * Make sure to re-add the module, so that we can track it's imports
     * and reconcile the dependencies tree
     */
    output.outputFiles.forEach((file) => {
      this.referenceTree.add(file.name, this.getSourceImports(file.name, file.text))
    })

    return output
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
    } else {
      this.sourceFilesManager.bumpVersion(absPath)
    }

    const output = this.reBuildSourceFile(absPath)

    /**
     * Write files to the disk, when the emitting
     * is enabled
     */
    if (!output.emitSkipped) {
      await Promise.all(
        output.outputFiles.map((one) => {
          return outputFile(one.name, one.text, 'utf-8')
        })
      )
    }

    /**
     * Notify subscribers
     */
    this.emit('subsequent:build', {
      absPath,
      relativePath,
      skipped: output.emitSkipped,
      diagnostics: this.diagnosticsStore.toJSON(),
    })

    /**
     * Re-build source file dependencies, since the changes in the public
     * API may impact the dependencies as well
     */
    const dependencies = this.referenceTree.getDependencies(absPath)
    dependencies.forEach((dependency) => this.reBuildSourceFile(dependency))
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
    this.diagnosticsStore.remove(absPath)
    this.referenceTree.remove(absPath)

    /**
     * Notify subscribers
     */
    this.emit('source:unlink', { relativePath: filePath, absPath })
  }

  /**
   * Build and watch project for changes
   */
  public watch(watchPattern: string | string[] = ['.'], watcherOptions?: chokidar.WatchOptions) {
    const builder = new Builder(this.ts, this.config, this.pluginManager)

    const buildResponse = builder.build()

    this.host = builder.host
    this.program = builder.program
    this.compilerOptions = builder.compilerOptions

    this.initiateSourceFileManager(this.config)
    this.initiateDiagnosticsStore(buildResponse.diagnostics)
    this.initiateModuleResolver()
    this.initiateReferenceTree()

    this.initiateWatcher(watchPattern, watcherOptions)

    this.chokidar.on('ready', () => {
      debug('watcher ready')
      this.emit('watcher:ready')

      this.initiateLanguageService(this.config!.options)
    })

    this.chokidar.on('add', (path: string) => this.onNewFile(path))
    this.chokidar.on('change', (path: string) => this.onChange(path))
    this.chokidar.on('unlink', (path: string) => this.onRemove(path))

    return buildResponse
  }
}
