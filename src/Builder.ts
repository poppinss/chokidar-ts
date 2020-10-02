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
import { PluginManager } from './PluginManager'

const debug = Debug('tsc:builder')

/**
 * Exposes the API to build the project similar to `tsc` command.
 */
export class Builder {
	public host: tsStatic.CompilerHost
	public program: tsStatic.Program
	public compilerOptions?: tsStatic.CompilerOptions

	constructor(
		private ts: typeof tsStatic,
		private config: tsStatic.ParsedCommandLine,
		private pluginManager: PluginManager
	) {
		debug('initiating builder')
	}

	/**
	 * Create typescript program
	 */
	public createProgram() {
		const { options, fileNames } = this.config
		this.host = this.ts.createCompilerHost(options)
		this.program = this.ts.createProgram(fileNames, options, this.host)
		this.compilerOptions = this.config.options
	}

	/**
	 * Build the project using the Typescript compiler API
	 */
	public build() {
		this.createProgram()

		debug('emitting program')
		const result = this.program.emit(
			undefined,
			this.ts.sys.writeFile,
			undefined,
			undefined,
			this.pluginManager.getTransformers(this.ts, this.config.options)
		)

		const diagnostics = this.ts.getPreEmitDiagnostics(this.program).concat(result.diagnostics)
		debug('initial build has "%d" errors', diagnostics.length)

		return {
			skipped: result.emitSkipped,
			diagnostics,
		}
	}
}
