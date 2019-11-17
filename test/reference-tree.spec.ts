/*
 * @poppinss/chokidar-ts
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import test from 'japa'
import { join } from 'path'
import { ReferenceTree } from '../src/ReferenceTree'

test.group('Reference Tree', () => {
  test('create reference tree with a file and it\'s imports', (assert) => {
    const tree = new ReferenceTree()
    tree.add(join(__dirname, './User.ts'), ['./Database', '../Config'])

    assert.deepEqual(tree.toJSON(), {
      [join(__dirname, './Database.ts')]: [join(__dirname, './User.ts')],
      [join(__dirname, '../Config.ts')]: [join(__dirname, './User.ts')],
    })
  })

  test('raise error when filePath is not absolute', (assert) => {
    const tree = new ReferenceTree()
    const fn = () => tree.add('./User.ts', ['./Database', '../Config'])

    assert.throw(fn, 'ReferenceTree.add requires absolute path for the tracking file')
  })

  test('handle absolute reference paths', (assert) => {
    const tree = new ReferenceTree()
    tree.add(join(__dirname, './User.ts'), ['./Database', join(__dirname, '../Config')])

    assert.deepEqual(tree.toJSON(), {
      [join(__dirname, './Database.ts')]: [join(__dirname, './User.ts')],
      [join(__dirname, '../Config.ts')]: [join(__dirname, './User.ts')],
    })
  })

  test('ignore reference files not ending with .ts', (assert) => {
    const tree = new ReferenceTree()
    tree.add(join(__dirname, './User.ts'), ['./Database.js', './Config'])

    assert.deepEqual(tree.toJSON(), {
      [join(__dirname, './Config.ts')]: [join(__dirname, './User.ts')],
    })
  })

  test('reconcile file imports when added for multiple times', (assert) => {
    const tree = new ReferenceTree()
    tree.add(join(__dirname, './User.ts'), ['./Database', '../Config'])
    tree.add(join(__dirname, './User.ts'), ['./Database'])

    assert.deepEqual(tree.toJSON(), {
      [join(__dirname, './Database.ts')]: [join(__dirname, './User.ts')],
    })
  })

  test('reconcile file imports when file has been removed', (assert) => {
    const tree = new ReferenceTree()
    tree.add(join(__dirname, './User.ts'), ['./Database', '../Config'])
    tree.remove(join(__dirname, './User.ts'))

    assert.deepEqual(tree.toJSON(), {})
  })
})
