/*
 * @poppinss/chokidar-ts
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import tsStatic from 'typescript'
import Debug from 'debug'

import { ConfigParser } from './ConfigParser'
import { PluginManager } from './PluginManager'

const debug = Debug('tsc:builder')

/**
 * Exposes the API to build the project similar to `tsc` command.
 */
export class Builder {
  public host: tsStatic.CompilerHost
  public program: tsStatic.Program
  public compilerOptions?: tsStatic.CompilerOptions

  constructor (
    private _cwd: string,
    private _configFileName: string,
    private _ts: typeof tsStatic,
    private _pluginManager: PluginManager,
  ) {
    debug('initiating builder')
  }

  /**
   * Build the project using the Typescript compiler API
   */
  public build (optionsToExtend?: tsStatic.CompilerOptions) {
    const configParser = new ConfigParser(this._cwd, this._configFileName, this._ts)
    const { error, config } = configParser.parse(optionsToExtend)

    /**
     * Hard exception when trying to parse the config
     */
    if (error) {
      debug('config parse error')
      return {
        diagnostics: [error],
        skipped: true,
        configError: true,
        config: config,
      }
    }

    /**
     * Errors after parsing the config
     */
    if (config!.errors.length) {
      debug('config syntactic error')
      return {
        diagnostics: config!.errors,
        skipped: true,
        configError: true,
        config: config,
      }
    }

    const { options, fileNames } = config!
    this.host = this._ts.createCompilerHost(options)
    this.program = this._ts.createProgram(fileNames, options, this.host)
    this.compilerOptions = options

    debug('emitting program')
    const result = this.program.emit(
      undefined,
      this._ts.sys.writeFile,
      undefined,
      undefined,
      this._pluginManager.getTransformers(this._ts, options),
    )

    const diagnostics = this._ts.getPreEmitDiagnostics(this.program).concat(result.diagnostics)
    debug('initial build has "%d" errors', diagnostics.length)

    return {
      configError: false,
      skipped: result.emitSkipped,
      diagnostics,
      config: config,
    }
  }
}
