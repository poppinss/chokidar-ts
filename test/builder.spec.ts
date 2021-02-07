/*
 * @poppinss/chokidar-ts
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import test from 'japa'
import ts from 'typescript'
import { join } from 'path'
import { Filesystem } from '@poppinss/dev-utils'

import { Builder } from '../src/Builder'
import { ConfigParser } from '../src/ConfigParser'
import { PluginManager } from '../src/PluginManager'
import { normalizeSlash } from '../test-helpers'

const fs = new Filesystem(join(__dirname, 'app'))

test.group('Builder', (group) => {
  group.afterEach(async () => {
    await fs.cleanup()
  })

  group.beforeEach(async () => {
    await fs.ensureRoot()
  })

  test('build project', async (assert) => {
    await fs.add(
      'tsconfig.json',
      JSON.stringify({
        include: ['./**/*'],
      })
    )

    await fs.add('foo/bar.ts', '')
    await fs.add('foo/baz.ts', '')

    const configParser = new ConfigParser(fs.basePath, 'tsconfig.json', ts)
    const config = configParser.parse()

    const builder = new Builder(ts, config.config!, new PluginManager())
    const response = builder.build()

    assert.isFalse(response.skipped)
    assert.deepEqual(response.diagnostics, [])

    const hasBarFile = await fs.fsExtra.pathExists(join(fs.basePath, 'foo/bar.js'))
    const hasBazFile = await fs.fsExtra.pathExists(join(fs.basePath, 'foo/baz.js'))

    assert.isTrue(hasBarFile)
    assert.isTrue(hasBazFile)
  }).timeout(6000)

  test('build project to custom out dir', async (assert) => {
    await fs.add(
      'tsconfig.json',
      JSON.stringify({
        include: ['./**/*'],
        compilerOptions: {
          outDir: './build',
          rootDir: './',
        },
      })
    )

    await fs.add('foo/bar.ts', '')
    await fs.add('foo/baz.ts', '')

    const configParser = new ConfigParser(fs.basePath, 'tsconfig.json', ts)
    const config = configParser.parse()

    const builder = new Builder(ts, config.config!, new PluginManager())
    const response = builder.build()

    assert.isFalse(response.skipped)
    assert.deepEqual(response.diagnostics, [])

    const hasBarFile = await fs.fsExtra.pathExists(join(fs.basePath, './build/foo/bar.js'))
    const hasBazFile = await fs.fsExtra.pathExists(join(fs.basePath, './build/foo/baz.js'))

    assert.isTrue(hasBarFile)
    assert.isTrue(hasBazFile)
  }).timeout(6000)

  test('return file errors', async (assert) => {
    await fs.add(
      'tsconfig.json',
      JSON.stringify({
        include: ['./**/*'],
        compilerOptions: {
          outDir: './build',
          rootDir: './',
        },
      })
    )

    await fs.add('foo/bar.ts', "import path from 'path'")
    await fs.add('foo/baz.ts', '')

    const configParser = new ConfigParser(fs.basePath, 'tsconfig.json', ts)
    const config = configParser.parse()

    const builder = new Builder(ts, config.config!, new PluginManager())
    const response = builder.build()

    assert.isFalse(response.skipped)
    assert.lengthOf(response.diagnostics, 1)
    assert.equal(
      response.diagnostics[0].messageText,
      "Module '\"path\"' can only be default-imported using the 'esModuleInterop' flag"
    )
    assert.equal(
      response.diagnostics[0].file!.fileName,
      normalizeSlash(join(fs.basePath, 'foo/bar.ts'))
    )

    const hasBarFile = await fs.fsExtra.pathExists(join(fs.basePath, './build/foo/bar.js'))
    const hasBazFile = await fs.fsExtra.pathExists(join(fs.basePath, './build/foo/baz.js'))

    assert.isTrue(hasBarFile)
    assert.isTrue(hasBazFile)
  }).timeout(6000)

  test('do not write files when noEmitOnError is true', async (assert) => {
    await fs.add(
      'tsconfig.json',
      JSON.stringify({
        include: ['./**/*'],
        compilerOptions: {
          outDir: './build',
          rootDir: './',
          noEmitOnError: true,
        },
      })
    )

    await fs.add('foo/bar.ts', "import path from 'path'")
    await fs.add('foo/baz.ts', '')

    const configParser = new ConfigParser(fs.basePath, 'tsconfig.json', ts)
    const config = configParser.parse()

    const builder = new Builder(ts, config.config!, new PluginManager())
    const response = builder.build()

    assert.isTrue(response.skipped)
    assert.lengthOf(response.diagnostics, 2)
    assert.equal(
      response.diagnostics[0].messageText,
      "Module '\"path\"' can only be default-imported using the 'esModuleInterop' flag"
    )
    assert.equal(
      response.diagnostics[0].file!.fileName,
      normalizeSlash(join(fs.basePath, 'foo/bar.ts'))
    )

    const hasBarFile = await fs.fsExtra.pathExists(join(fs.basePath, './build/foo/bar.js'))
    const hasBazFile = await fs.fsExtra.pathExists(join(fs.basePath, './build/foo/baz.js'))

    assert.isFalse(hasBarFile)
    assert.isFalse(hasBazFile)
  }).timeout(6000)
})
