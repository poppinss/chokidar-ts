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
import tsStatic from 'typescript'

const debug = Debug('tsc:config:parser')

/**
 * Exposes the API to parse typescript config
 */
export class ConfigParser {
  constructor (
    private _cwd: string,
    private _configFileName: string,
    private _ts: typeof tsStatic,
  ) {
    debug('parsing config file "%s"', this._configFileName)
  }

  /**
   * Parses the typescript config file
   */
  public parse (optionsToExtend?: tsStatic.CompilerOptions): {
    error: tsStatic.Diagnostic | null,
    config?: tsStatic.ParsedCommandLine,
  } {
    let hardException: null | tsStatic.Diagnostic = null

    const parsedConfig = this._ts.getParsedCommandLineOfConfigFile(
      join(this._cwd, this._configFileName),
      optionsToExtend || {},
      {
        ...this._ts.sys,
        useCaseSensitiveFileNames: true,
        getCurrentDirectory: () => this._cwd,
        onUnRecoverableConfigFileDiagnostic: (error) => (hardException = error),
      },
    )

    return { config: parsedConfig, error: hardException }
  }
}
