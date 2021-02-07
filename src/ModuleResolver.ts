/*
 * @poppinss/chokidar-ts
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import Debug from 'debug'
import tsStatic from 'typescript'
import builtInModules from 'builtin-modules'

const debug = Debug('tsc:module:resolver')

/**
 * Wraps the typescript compiler `nodeModuleNameResolver` to ignore the
 * native modules and dependencies. Since, we need module resolver
 * to report type errors, we do not type check node_modules when
 * they are changed during the watch mode.
 */
export class ModuleResolver {
  private ignoreList: Set<string> = new Set(builtInModules)
  private ambientModules: Map<string, string> = new Map()

  constructor(private ts: typeof tsStatic, private compilerOptions: tsStatic.CompilerOptions) {}

  /**
   * Track ambient module
   */
  public addAmbientModules(filePath: string, ambientModules: string[]) {
    ambientModules.forEach((ambientModule) => this.ambientModules.set(ambientModule, filePath))
  }

  /**
   * Returns the resolved module path
   */
  public resolve(importPath: string, modulePath: string): null | string {
    if (this.ignoreList.has(importPath)) {
      debug('ignoring module "%s"', importPath)
      return null
    }

    /**
     * Resolve ambientModuleFilePath when imports is tracked as ambient
     * module already
     */
    const ambientModuleFilePath = this.ambientModules.get(importPath)
    if (ambientModuleFilePath) {
      return ambientModuleFilePath
    }

    const resolved = this.ts.resolveModuleName(
      importPath,
      modulePath,
      this.compilerOptions,
      this.ts.sys
    )

    /**
     * Return null when unable to resolve the module or the module extension
     * is not ts
     */
    if (!resolved.resolvedModule || resolved.resolvedModule.extension !== '.ts') {
      return null
    }

    /**
     * Ignore node module packages
     */
    if (resolved.resolvedModule.packageId) {
      debug('adding node module "%s" to ignore list', importPath)
      this.ignoreList.add(importPath)
      return null
    }

    return resolved.resolvedModule.resolvedFileName
  }
}
