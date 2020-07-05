/*
 * @poppinss/chokidar-ts
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import tsStatic from 'typescript'
import { PluginFn } from './Contracts'

/**
 * Exposes the API to register plugins and get typescript compiler
 * transformers
 */
export class PluginManager {
	private plugins: { fn: PluginFn; lifecycle: 'after' | 'before' }[] = []

	/**
	 * Hook plugin to define custom transformers
	 */
	public use(transformer: PluginFn, lifecycle: 'before' | 'after'): this {
		this.plugins.push({ fn: transformer, lifecycle })
		return this
	}

	/**
	 * Returns transformers based upon the registered plugins
	 */
	public getTransformers(ts: typeof tsStatic, options: tsStatic.CompilerOptions) {
		return this.plugins.reduce(
			(transformers: tsStatic.CustomTransformers, { fn, lifecycle }) => {
				if (lifecycle === 'after') {
					transformers.after!.push(fn(ts, options))
				} else {
					transformers.before!.push(fn(ts, options))
				}

				return transformers
			},
			{ before: [], after: [] }
		)
	}
}
