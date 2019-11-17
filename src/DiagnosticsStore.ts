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

const debug = Debug('tsc:diagnostic:store')

/**
 * Exposes the API to collect typescript project diagnostics. We start by
 * consuming the diagnostics for the entire project in reference to the
 * file paths. As files are changed, we update the diagnostics for
 * that file itself.
 */
export class DiagnosticsStore {
  private _diagnostics: Map<string, tsStatic.Diagnostic[]> = new Map()

  constructor () {
    debug('initiating diagnostics store')
  }

  /**
   * Consumes diagnostics for the entire project
   */
  public bulkAdd (diagnostics: tsStatic.Diagnostic[]) {
    diagnostics.forEach((diagnostic) => {
      if (!diagnostic.file) {
        return
      }

      const fileName = diagnostic.file.fileName
      debug('adding diagnostics for "%s" file', fileName)

      if (!this._diagnostics.has(fileName)) {
        this._diagnostics.set(fileName, [])
      }

      this._diagnostics.get(fileName)!.push(diagnostic)
    })
  }

  /**
   * Add diagnostics for a given file
   */
  public add (filePath: string, diagnostics: tsStatic.Diagnostic[]) {
    /**
     * Narrow down the map size, since we need to serialize it
     * quite often
     */
    if (!diagnostics.length) {
      this.remove(filePath)
      return
    }

    debug('adding diagnostics for "%s" file', filePath)
    this._diagnostics.set(filePath, diagnostics)
  }

  /**
   * Remove diagnostics for a given file
   */
  public remove (filePath: string): void {
    if (this._diagnostics.has(filePath)) {
      debug('removing diagnostics for "%s" file', filePath)
      this._diagnostics.delete(filePath)
    }
  }

  /**
   * Returns an array of all the diagnostics
   */
  public toJSON () {
    let serialized: tsStatic.Diagnostic[] = []
    this._diagnostics.forEach((diagnostics) => serialized = serialized.concat(diagnostics))
    return serialized
  }
}
