/*
 * @poppinss/chokidar-ts
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type tsStatic from 'typescript'

import debug from './debug.js'

/**
 * Exposes the API to parse typescript config file using the
 * TypeScript's official compiler.
 */
export class ConfigParser {
  #cwd: string
  #configFileName: string
  #ts: typeof tsStatic

  constructor(cwd: string | URL, configFileName: string, ts: typeof tsStatic) {
    this.#cwd = typeof cwd === 'string' ? cwd : fileURLToPath(cwd)
    this.#configFileName = configFileName
    this.#ts = ts
  }

  /**
   * Parse file. The errors the return back inside the `error` property
   */
  parse(optionsToExtend?: tsStatic.CompilerOptions): {
    error: tsStatic.Diagnostic | null
    config?: tsStatic.ParsedCommandLine
  } {
    let hardException: null | tsStatic.Diagnostic = null
    debug('parsing config file "%s"', this.#configFileName)

    const parsedConfig = this.#ts.getParsedCommandLineOfConfigFile(
      join(this.#cwd, this.#configFileName),
      optionsToExtend || {},
      {
        ...this.#ts.sys,
        useCaseSensitiveFileNames: true,
        getCurrentDirectory: () => this.#cwd,
        onUnRecoverableConfigFileDiagnostic: (error) => (hardException = error),
      }
    )

    return { config: parsedConfig, error: hardException }
  }
}
