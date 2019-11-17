/*
 * @poppinss/chokidar-ts
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import tsStatic from 'typescript'

/**
 * Shape of Plugin function
 */
export type PluginFn = (
  ts: typeof tsStatic,
  config: tsStatic.CompilerOptions,
) => tsStatic.TransformerFactory<tsStatic.SourceFile> | tsStatic.CustomTransformerFactory

/**
 * Shape of an import reference. The version is required to
 * find between stale dependencies without running
 * unnecessary loops
 */
export type ImportReferenceNode = { version: number, modulePath: string }

/**
 * Options accepted by source files manager
 */
export type SourceFilesManagerOptions = {
  includes?: string[],
  excludes?: string[],
  files: string[],
}
