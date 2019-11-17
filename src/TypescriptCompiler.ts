/*
 * @poppinss/chokidar-ts
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import { join } from 'path'
import tsStatic from 'typescript'

import { Builder } from './Builder'
import { Watcher } from './Watcher'
import { PluginFn } from './Contracts'
import { ConfigParser } from './ConfigParser'
import { PluginManager } from './PluginManager'

/**
 * Typescript compiler exposes the API to build, watch or parse
 * the typescript config file.
 */
export class TypescriptCompiler {
  private _pluginManager = new PluginManager()

  constructor (
    public ts: typeof tsStatic,
    private _configPath: string,
    private _cwd: string,
  ) {}

  /**
   * Add plugin which can apply transformers to the typescript compiler
   */
  public use (transformer: PluginFn, lifecycle: 'before' | 'after') {
    this._pluginManager.use(transformer, lifecycle)
    return this
  }

  /**
   * Get builder instance
   */
  public builder () {
    return new Builder(join(this._cwd, this._configPath), this.ts, this._pluginManager)
  }

  /**
   * Get watcher instance
   */
  public watcher () {
    return new Watcher(this._cwd, join(this._cwd, this._configPath), this.ts, this._pluginManager)
  }

  /**
   * Get config parser instance
   */
  public configParser () {
    return new ConfigParser(join(this._cwd, this._configPath), this.ts)
  }
}
