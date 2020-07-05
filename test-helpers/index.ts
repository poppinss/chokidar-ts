/*
 * @poppinss/chokidar-ts
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { platform } from 'os'
import ts from 'typescript'

const BACK_SLASH_REGEX = /\\/g

export function parseTsConfig(configPath: string) {
	return ts.getParsedCommandLineOfConfigFile(
		configPath,
		{},
		{
			...ts.sys,
			useCaseSensitiveFileNames: true,
			onUnRecoverableConfigFileDiagnostic: () => {},
		}
	)
}

export function normalizeSlash(path: string) {
	if (platform() !== 'win32') {
		return path
	}

	return path.replace(BACK_SLASH_REGEX, '/')
}
