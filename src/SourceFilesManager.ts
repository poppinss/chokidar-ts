/*
 * @poppinss/chokidar-ts
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import mem from 'mem'
import Debug from 'debug'
import { join } from 'path'
import { platform } from 'os'
import picomatch from 'picomatch'
import tsStatic from 'typescript'
import { SourceFilesManagerOptions } from './Contracts'

const BACK_SLASH_REGEX = /\\/g
const debug = Debug('tsc:source:manager')

/**
 * Exposes the API to manage the source files for a typescript project. You need
 * full blown source files management during the watch mode, since new files
 * are added and removed regularly.
 */
export class SourceFilesManager {
	private isWindows = platform() === 'win32'

	/**
	 * Pattern matcher for included files
	 */
	private whitelisted = picomatch(
		(this.options.includes || []).map((pattern) => {
			return this.normalizeSlashToUnix(join(this.appRoot, pattern))
		})
	)

	/**
	 * Pattern matcher for excluded files
	 */
	private blacklisted = picomatch(
		(this.options.excludes || []).map((pattern) => {
			return this.normalizeSlashToUnix(join(this.appRoot, pattern))
		})
	)

	/**
	 * An array of project files collected as part of the first scan. We need
	 * an object here, so that we can share it by reference with the
	 * typescript language server.
	 */
	private projectFiles: tsStatic.MapLike<{ version: number }> = {}

	/**
	 * A memoized function to match the file path against the whitelisted
	 * and blacklisted patterns
	 */
	private matchAgainstPattern = mem((filePath: string) => {
		filePath = this.normalizeSlashToUnix(filePath)

		if (!this.whitelisted(filePath)) {
			return false
		}

		if (this.blacklisted(filePath)) {
			return false
		}

		return true
	})

	constructor(private appRoot: string, private options: SourceFilesManagerOptions) {
		this.options.files.forEach((file) => this.add(file))
	}

	/**
	 * Normalizes windows slashes to unix. Since, glob patterns
	 * are not paths, they are not normalized for cross platform
	 * checks and hence we have to convert all paths to unix.
	 */
	private normalizeSlashToUnix(path: string): string {
		if (!this.isWindows) {
			return path
		}

		return path.replace(BACK_SLASH_REGEX, '/')
	}

	/**
	 * Add a new source file to the list of project files. This is helpful
	 * when new source files are added after the initial typescript
	 * build.
	 */
	public add(filePath: string): void {
		filePath = this.normalizeSlashToUnix(filePath)
		this.projectFiles[filePath] = this.projectFiles[filePath] || { version: 1 }
		debug('adding new source file "%s"', filePath)
	}

	/**
	 * Bumps the project file version. This is required to tell the
	 * typescript compiler that file has been changed.
	 */
	public bumpVersion(filePath: string) {
		filePath = this.normalizeSlashToUnix(filePath)
		const projectFile = this.projectFiles[filePath]
		if (!projectFile) {
			return
		}

		projectFile.version++
		debug('source file version bump "%s:%d"', filePath, projectFile.version)
	}

	/**
	 * Remove file from the list of existing source files
	 */
	public remove(filePath: string) {
		filePath = this.normalizeSlashToUnix(filePath)
		debug('removing source file "%s"', filePath)
		delete this.projectFiles[filePath]
	}

	/**
	 * Returns true when filePath is part of the source files after checking
	 * them against `includes`, `excludes` and custom set of `files`.
	 */
	public isSourceFile(filePath: string): boolean {
		filePath = this.normalizeSlashToUnix(filePath)
		return !!this.projectFiles[filePath] || this.matchAgainstPattern(filePath)
	}

	/**
	 * Returns file version
	 */
	public getFileVersion(filePath: string): null | number {
		filePath = this.normalizeSlashToUnix(filePath)
		const projectFile = this.projectFiles[filePath]
		return projectFile ? projectFile.version : null
	}

	/**
	 * Returns a copy of project source files
	 */
	public toJSON() {
		return this.projectFiles
	}
}
