/*
 * @poppinss/chokidar-ts
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import slash from 'slash'
import memoize from 'memoize'
import { join } from 'node:path'
import picomatch from 'picomatch'

import debug from './debug.js'
import type { SourceFilesManagerOptions } from './types.js'

/**
 * Exposes the API to manage the source files for a typescript project.
 * All paths are stored as unix paths
 */
export class SourceFilesManager {
  #appRoot: string
  #included: picomatch.Matcher
  #excluded: picomatch.Matcher

  /**
   * A collection of project files collected as part of the first scan.
   */
  #projectFiles: Record<string, boolean> = {}

  /**
   * A memoized function to match the file path against included and excluded
   * picomatch patterns
   */
  #matchAgainstPattern = memoize((filePath: string) => {
    filePath = slash(filePath)

    if (!this.#included(filePath)) {
      debug('file rejected by includes %s', filePath)
      return false
    }

    if (this.#excluded(filePath)) {
      debug('file rejected by excludes %s', filePath)
      return false
    }

    return true
  })

  constructor(appRoot: string, options: SourceFilesManagerOptions) {
    this.#appRoot = appRoot

    options.files.forEach((file) => this.add(file))

    this.#included = picomatch(
      (options.includes || []).map((pattern) => {
        return slash(join(this.#appRoot, pattern))
      })
    )

    this.#excluded = picomatch(
      (options.excludes || []).map((pattern) => {
        return slash(join(this.#appRoot, pattern))
      })
    )
  }

  /**
   * Track a new source file
   */
  add(filePath: string): void {
    filePath = slash(filePath)
    this.#projectFiles[filePath] = true
    debug('adding new source file "%s"', filePath)
  }

  /**
   * Remove file from the list of existing source files
   */
  remove(filePath: string) {
    filePath = slash(filePath)
    debug('removing source file "%s"', filePath)
    delete this.#projectFiles[filePath]
  }

  /**
   * Returns true when filePath is part of the source files after checking
   * them against `includes`, `excludes` and custom set of `files`.
   */
  isSourceFile(filePath: string): boolean {
    debug('matching for watched file %s', filePath)
    filePath = slash(filePath)

    return !!this.#projectFiles[filePath] || this.#matchAgainstPattern(filePath)
  }

  /**
   * Returns true if the file should be watched
   */
  shouldWatch(filePath: string) {
    /**
     * Always watch the project root
     */
    if (filePath === this.#appRoot) {
      return true
    }

    return this.isSourceFile(filePath)
  }

  /**
   * Returns a copy of project source files
   */
  toJSON() {
    return this.#projectFiles
  }
}
