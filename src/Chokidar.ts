/*
 * @poppinss/chokidar-ts
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import Debug from 'debug'
import chokidar from 'chokidar'
import Emittery from 'emittery'
import { WatcherEvents } from './Contracts'

const debug = Debug('tsc:watcher')

/**
 * Exposes the API to watch source files using chokidar. Since this module
 * is anyways used by the assembler, we also expose the chokidar API directly
 */
export class ChokidarWatcher extends Emittery.Typed<WatcherEvents, 'watcher:ready'> {
	public chokidar: chokidar.FSWatcher

	constructor(private cwd: string) {
		super()
		debug('initiating watcher')
	}

	/**
	 * Returns a boolean telling if it is a script file or not.
	 *
	 * We check for the `compilerOptions.allowJs` before marking
	 * `.js` files as a script files.
	 */
	private isScriptFile(filePath: string): boolean {
		return filePath.endsWith('.ts') || filePath.endsWith('.tsx')
	}

	/**
	 * Initiates chokidar watcher
	 */
	private initiateWatcher(
		watchPattern: string | string[] = ['.'],
		watcherOptions?: chokidar.WatchOptions
	) {
		watcherOptions = Object.assign(
			{
				ignored: ['node_modules/**', /(^|[\/\\])\../],
				cwd: this.cwd,
				ignoreInitial: true,
			},
			watcherOptions
		)

		debug('initiating watcher with %j options', watcherOptions)
		this.chokidar = chokidar.watch(watchPattern, watcherOptions)
	}

	/**
	 * Invoked when chokidar notifies for a new file addtion
	 */
	private onNewFile(filePath: string) {
		if (!this.isScriptFile(filePath)) {
			debug('new file added "%s"', filePath)
			this.emit('add', filePath)
			return
		}

		debug('new source file added "%s"', filePath)
		this.emit('source:add', filePath)
	}

	/**
	 * Invoked when chokidar notifies for changes the existing
	 * source file
	 */
	private onChange(filePath: string) {
		if (!this.isScriptFile(filePath)) {
			debug('file changed "%s"', filePath)
			this.emit('change', filePath)
			return
		}

		debug('source file changed "%s"', filePath)
		this.emit('source:change', filePath)
	}

	/**
	 * Invoked when chokidar notifies for file deletion
	 */
	private onRemove(filePath: string) {
		if (!this.isScriptFile(filePath)) {
			debug('file removed "%s"', filePath)
			this.emit('unlink', filePath)
			return
		}

		/**
		 * Notify subscribers
		 */
		debug('source file removed "%s"', filePath)
		this.emit('source:unlink', filePath)
	}

	/**
	 * Build and watch project for changes
	 */
	public watch(watchPattern: string | string[] = ['.'], watcherOptions?: chokidar.WatchOptions) {
		this.initiateWatcher(watchPattern, watcherOptions)

		this.chokidar.on('ready', () => {
			debug('watcher ready')
			this.emit('watcher:ready')
		})

		this.chokidar.on('add', (path: string) => this.onNewFile(path))
		this.chokidar.on('change', (path: string) => this.onChange(path))
		this.chokidar.on('unlink', (path: string) => this.onRemove(path))
	}
}
