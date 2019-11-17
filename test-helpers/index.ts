/*
 * @poppinss/chokidar-ts
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import ts from 'typescript'

export function parseTsConfig (configPath: string) {
  return ts.getParsedCommandLineOfConfigFile(configPath, {}, {
    ...ts.sys,
    useCaseSensitiveFileNames: true,
    onUnRecoverableConfigFileDiagnostic: () => {},
  })
}
