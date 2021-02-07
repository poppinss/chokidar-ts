/*
 * @poppinss/chokidar-ts
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import tsStatic from 'typescript'

import { Builder } from './Builder'
import { Watcher } from './Watcher'
import { PluginFn } from './Contracts'
import { LspWatcher } from './LspWatcher'
import { ConfigParser } from './ConfigParser'
import { PluginManager } from './PluginManager'

/**
 * Typescript compiler exposes the API to build, watch or parse
 * the typescript config file.
 */
export class TypescriptCompiler {
  private pluginManager = new PluginManager()

  constructor(private cwd: string, private configFileName: string, public ts: typeof tsStatic) {}

  /**
   * Add plugin which can apply transformers to the typescript compiler
   */
  public use(transformer: PluginFn, lifecycle: 'before' | 'after') {
    this.pluginManager.use(transformer, lifecycle)
    return this
  }

  /**
   * Get builder instance
   */
  public builder(options: tsStatic.ParsedCommandLine) {
    return new Builder(this.ts, options, this.pluginManager)
  }

  /**
   * Get watcher instance
   */
  public watcher(options: tsStatic.ParsedCommandLine, mode: 'raw' | 'lsp') {
    return mode === 'raw'
      ? new Watcher(this.cwd, this.ts, options, this.pluginManager)
      : new LspWatcher(this.cwd, this.ts, options, this.pluginManager)
  }

  /**
   * Get config parser instance
   */
  public configParser() {
    return new ConfigParser(this.cwd, this.configFileName, this.ts)
  }
}
