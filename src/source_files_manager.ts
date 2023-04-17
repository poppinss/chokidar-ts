/*
 * @poppinss/chokidar-ts
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import mem from 'mem'
import slash from 'slash'
import { join } from 'node:path'
import picomatch from 'picomatch'
import type tsStatic from 'typescript'

import debug from './debug.js'
import type { SourceFilesManagerOptions } from './types.js'

/**
 * Exposes the API to manage the source files for a typescript project.
 * All paths are stored with unix paths
 */
export class SourceFilesManager {
  #appRoot: string
  #included: picomatch.Matcher
  #excluded: picomatch.Matcher

  /**
   * A collection of project files collected as part of the first scan. We need
   * an object here, so that we can share it by reference with the
   * typescript language server.
   */
  #projectFiles: tsStatic.MapLike<{ version: number }> = {}

  /**
   * A memoized function to match the file path against included and excluded
   * picomatch patterns
   */
  #matchAgainstPattern = mem((filePath: string) => {
    filePath = slash(filePath)

    if (!this.#included(filePath)) {
      return false
    }

    if (this.#excluded(filePath)) {
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
   * Add a new source file to the list of project files. This is helpful
   * when new source files are added after the initial typescript
   * build.
   */
  add(filePath: string): void {
    filePath = slash(filePath)
    this.#projectFiles[filePath] = this.#projectFiles[filePath] || { version: 1 }
    debug('adding new source file "%s"', filePath)
  }

  /**
   * Bumps the project file version. This is required to tell the
   * typescript compiler that file has been changed.
   */
  bumpVersion(filePath: string) {
    filePath = slash(filePath)
    const projectFile = this.#projectFiles[filePath]
    if (!projectFile) {
      return
    }

    projectFile.version++
    debug('source file version bump "%s:%d"', filePath, projectFile.version)
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
    filePath = slash(filePath)
    return !!this.#projectFiles[filePath] || this.#matchAgainstPattern(filePath)
  }

  /**
   * Returns a copy of project source files
   */
  toJSON() {
    return this.#projectFiles
  }
}
