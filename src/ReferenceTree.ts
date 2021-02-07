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
  private tree: Map<string, Set<ImportReferenceNode>> = new Map()
  private imports: Map<string, ImportReferenceNode> = new Map()

  constructor() {
    debug('initiating reference tree')
  }

  /**
   * Creates the top level node in the depdencies map
   */
  private addDependencyNode(modulePath: string) {
    if (!this.tree.has(modulePath)) {
      this.tree.set(modulePath, new Set())
    }
  }

  /**
   * Adds the dependency on the module node
   */
  private addDependency(dependencyPath: string, importRef: ImportReferenceNode) {
    this.addDependencyNode(dependencyPath)
    debug('adding "%s" as dependency for "%s" module', dependencyPath, importRef.modulePath)
    this.tree.get(dependencyPath)!.add(importRef)
  }

  /**
   * Updates the import verion
   */
  private bumpVersion(modulePath: string) {
    const oldVersion = this.imports.get(modulePath)
    this.imports.set(modulePath, {
      version: oldVersion ? oldVersion.version++ : 1,
      modulePath,
    })
  }

  /**
   * Add a new module to the tree along with it's imports
   */
  public add(modulePath: string, importReferences: string[]) {
    if (!isAbsolute(modulePath)) {
      throw new Error('ReferenceTree.add requires absolute path for the tracking file')
    }

    /**
     * Create node in the imports tree
     */
    this.bumpVersion(modulePath)
    const importRef = this.imports.get(modulePath)!

    importReferences.forEach((reference) => this.addDependency(reference, importRef))
  }

  /**
   * Remove module
   */
  public remove(modulePath: string) {
    debug('removing module "%s"', modulePath)
    this.imports.delete(modulePath)
  }

  /**
   * Returns an array of dependencies for a given module
   */
  public getDependencies(modulePath: string): string[] {
    const dependenciesRefs = this.tree.get(modulePath)
    if (!dependenciesRefs) {
      return []
    }

    const serialized: string[] = []

    dependenciesRefs.forEach((ref) => {
      const originalRef = this.imports.get(ref.modulePath)

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
  public toJSON() {
    const serialized: { [key: string]: string[] } = {}

    this.tree.forEach((_, modulePath) => {
      const dependencies = this.getDependencies(modulePath)
      if (dependencies.length) {
        serialized[modulePath] = dependencies
      }
    })

    return serialized
  }
}
