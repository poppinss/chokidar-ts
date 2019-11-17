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
import ts from 'typescript'
import { Filesystem } from '@poppinss/dev-utils'

import { ConfigParser } from '../src/ConfigParser'
import { normalizeSlash } from '../test-helpers'

const fs = new Filesystem(join(__dirname, 'app'))

test.group('Config Parser', (group) => {
  group.afterEach(async () => {
    await fs.cleanup()
  })

  group.beforeEach(async () => {
    await fs.ensureRoot()
  })

  test('raise error when config file is missing', (assert) => {
    const configParser = new ConfigParser(fs.basePath, 'tsconfig.json', ts)
    const { error, config } = configParser.parse()

    assert.isUndefined(config)
    assert.equal(error!.messageText as string, `File '${join(fs.basePath, 'tsconfig.json')}' not found.`)
  })

  test('raise error when config file has unknown options', async (assert) => {
    await fs.add('tsconfig.json', JSON.stringify({
      compilerOptions: {
        foo: true,
      },
    }))

    const configParser = new ConfigParser(fs.basePath, 'tsconfig.json', ts)
    const { error, config } = configParser.parse()

    assert.isNull(error)
    assert.lengthOf(config!.errors, 2)
    assert.equal(config!.errors[0].messageText, `Unknown compiler option 'foo'.`)
  })

  test('parse config file and populate include files', async (assert) => {
    await fs.add('tsconfig.json', JSON.stringify({
      include: ['./**/*'],
    }))

    await fs.add('bar/foo.ts', ``)

    const configParser = new ConfigParser(fs.basePath, 'tsconfig.json', ts)
    const { error, config } = configParser.parse()

    assert.isNull(error)
    assert.lengthOf(config!.errors, 0)
    assert.deepEqual(config!.fileNames, [normalizeSlash(join(fs.basePath, 'bar/foo.ts'))])
  })

  test('parse config file and respect exclude pattern', async (assert) => {
    await fs.add('tsconfig.json', JSON.stringify({
      include: ['./**/*'],
      exclude: ['./bar/foo.ts'],
    }))

    await fs.add('bar/foo.ts', ``)

    const configParser = new ConfigParser(fs.basePath, 'tsconfig.json', ts)
    const { error, config } = configParser.parse()

    assert.isNull(error)
    assert.lengthOf(config!.errors, 1)
    assert.deepEqual(config!.fileNames, [])
  })

  test('parse config file and respect explicit files array', async (assert) => {
    await fs.add('tsconfig.json', JSON.stringify({
      include: ['./**/*'],
      exclude: ['./bar/foo.ts'],
      files: ['./bar/foo.ts'],
    }))

    await fs.add('bar/foo.ts', ``)

    const configParser = new ConfigParser(fs.basePath, 'tsconfig.json', ts)
    const { error, config } = configParser.parse()

    assert.isNull(error)
    assert.lengthOf(config!.errors, 0)
    assert.deepEqual(config!.fileNames, [normalizeSlash(join(fs.basePath, 'bar/foo.ts'))])
  })
})
