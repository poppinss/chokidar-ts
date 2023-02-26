/*
 * @poppinss/chokidar-ts
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Options accepted by source files manager
 */
export type SourceFilesManagerOptions = {
  includes?: string[]
  excludes?: string[]
  files: string[]
}

/**
 * Events emitted by the watcher
 */
export type WatcherEvents = {
  'add': { absPath: string; relativePath: string }
  'source:add': { absPath: string; relativePath: string }
  'change': { absPath: string; relativePath: string }
  'source:change': { absPath: string; relativePath: string }
  'unlink': { absPath: string; relativePath: string }
  'source:unlink': { absPath: string; relativePath: string }
}
