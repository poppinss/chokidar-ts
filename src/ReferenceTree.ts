/*
* @poppinss/chokidar-ts
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import Debug from 'debug'
import { isAbsolute } from 'path'
import { ImportReferenceNode } from './Contracts'

const debug = Debug('tsc:reference:tree')

/**
 * Reference tree exposes the API to track files along with their
 * dependencies. Here dependencies are the imported files fetched
 * using the Typescript compiler API.
 *
 * The reference tree is optimized to fetch a list of files dependent on
 * a given file.
 */
export class ReferenceTree {
  private _tree: Map<string, Set<ImportReferenceNode>> = new Map()
  private _imports: Map<string, ImportReferenceNode> = new Map()

  constructor () {
    debug('initiating reference tree')
  }

  /**
   * Creates the top level node in the depdencies map
   */
  private _addDependencyNode (modulePath: string) {
    if (!this._tree.has(modulePath)) {
      this._tree.set(modulePath, new Set())
    }
  }

  /**
   * Adds the dependency on the module node
   */
  private _addDependency (dependencyPath: string, importRef: ImportReferenceNode) {
    this._addDependencyNode(dependencyPath)
    debug('adding "%s" as dependency for "%s" module', dependencyPath, importRef.modulePath)
    this._tree.get(dependencyPath)!.add(importRef)
  }

  /**
   * Updates the import verion
   */
  private _bumpVersion (modulePath: string) {
    const oldVersion = this._imports.get(modulePath)
    this._imports.set(modulePath, {
      version: oldVersion ? oldVersion.version++ : 1,
      modulePath,
    })
  }

  /**
   * Add a new module to the tree along with it's imports
   */
  public add (modulePath: string, importReferences: string[]) {
    if (!isAbsolute(modulePath)) {
      throw new Error('ReferenceTree.add requires absolute path for the tracking file')
    }

    /**
     * Create node in the imports tree
     */
    this._bumpVersion(modulePath)
    const importRef = this._imports.get(modulePath)!

    importReferences.forEach((reference) => this._addDependency(reference, importRef))
  }

  /**
   * Remove module
   */
  public remove (modulePath: string) {
    debug('removing module "%s"', modulePath)
    this._imports.delete(modulePath)
  }

  /**
   * Returns an array of dependencies for a given module
   */
  public getDependencies (modulePath: string): string[] {
    const dependenciesRefs = this._tree.get(modulePath)
    if (!dependenciesRefs) {
      return []
    }

    const serialized: string[] = []

    dependenciesRefs.forEach((ref) => {
      const originalRef = this._imports.get(ref.modulePath)
      /**
       * Cleaning up non existing dependencies
       */
      if (!originalRef) {
        dependenciesRefs.delete(ref)
        return
      }

      /**
       * Cleaning up stale nodes
       */
      if (originalRef.version !== ref.version) {
        dependenciesRefs.delete(ref)
        return
      }

      serialized.push(ref.modulePath)
    })

    debug('module "%s" has following dependencies %j', modulePath, serialized)
    return serialized
  }

  /**
   * Serializes tree to an object
   */
  public toJSON () {
    const serialized: { [key: string]: string[] } = {}

    this._tree.forEach((_value, modulePath) => {
      const dependencies = this.getDependencies(modulePath)
      if (dependencies.length) {
        serialized[modulePath] = dependencies
      }
    })

    return serialized
  }
}
