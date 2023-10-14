/*
 * @poppinss/chokidar-ts
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import slash from 'slash'
import ts from 'typescript'
import { join } from 'node:path'
import { test } from '@japa/runner'

import { ConfigParser } from '../src/config_parser.js'

test.group('Config Parser', () => {
  test('raise error when config file is missing', ({ fs, assert }) => {
    const configParser = new ConfigParser(fs.basePath, 'tsconfig.json', ts)
    const { error, config } = configParser.parse()

    assert.isUndefined(config)
    assert.equal(
      error!.messageText as string,
      `Cannot read file '${join(fs.basePath, 'tsconfig.json')}'.`
    )
  })

  test('raise error when config file has unknown options', async ({ fs, assert }) => {
    await fs.create(
      'tsconfig.json',
      JSON.stringify({
        compilerOptions: {
          foo: true,
        },
      })
    )

    const configParser = new ConfigParser(fs.basePath, 'tsconfig.json', ts)
    const { error, config } = configParser.parse()

    assert.isNull(error)
    assert.lengthOf(config!.errors, 2)
    assert.equal(config!.errors[0].messageText, "Unknown compiler option 'foo'.")
  })

  test('parse config file and populate include files', async ({ fs, assert }) => {
    await fs.create(
      'tsconfig.json',
      JSON.stringify({
        include: ['./**/*'],
      })
    )

    await fs.create('bar/foo.ts', '')

    const configParser = new ConfigParser(fs.basePath, 'tsconfig.json', ts)
    const { error, config } = configParser.parse()

    assert.isNull(error)
    assert.lengthOf(config!.errors, 0)
    assert.deepEqual(config!.fileNames, [slash(join(fs.basePath, 'bar/foo.ts'))])
  })

  test('parse config file and respect exclude pattern', async ({ fs, assert }) => {
    await fs.create(
      'tsconfig.json',
      JSON.stringify({
        include: ['./**/*'],
        exclude: ['./bar/foo.ts'],
      })
    )

    await fs.create('bar/foo.ts', '')

    const configParser = new ConfigParser(fs.basePath, 'tsconfig.json', ts)
    const { error, config } = configParser.parse()

    assert.isNull(error)
    assert.lengthOf(config!.errors, 1)
    assert.deepEqual(config!.fileNames, [])
  })

  test('parse config file and respect explicit files array', async ({ fs, assert }) => {
    await fs.create(
      'tsconfig.json',
      JSON.stringify({
        include: ['./**/*'],
        exclude: ['./bar/foo.ts'],
        files: ['./bar/foo.ts'],
      })
    )

    await fs.create('bar/foo.ts', '')

    const configParser = new ConfigParser(fs.basePath, 'tsconfig.json', ts)
    const { error, config } = configParser.parse()

    assert.isNull(error)
    assert.lengthOf(config!.errors, 0)
    assert.deepEqual(config!.fileNames, [slash(join(fs.basePath, 'bar/foo.ts'))])
  })
})
