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
import { test } from '@japa/runner'
import { join, normalize } from 'node:path'

import { ConfigParser } from '../src/config_parser.js'
import { SourceFilesManager } from '../src/source_files_manager.js'

test.group('Source Files Manager', () => {
  test('return files based on the includes pattern', async ({ assert, fs }) => {
    await fs.create(
      'tsconfig.json',
      JSON.stringify({
        include: ['./**/*'],
      })
    )
    await fs.create('foo/bar/baz.ts', "import path from 'path'")

    const { config } = new ConfigParser(fs.basePath, 'tsconfig.json', ts).parse()

    const sourceFilesManager = new SourceFilesManager(fs.basePath, {
      includes: config!.raw.include,
      excludes: config!.raw.exclude,
      files: config!.fileNames.map((fileName) => normalize(fileName)),
    })

    assert.deepEqual(sourceFilesManager.toJSON(), {
      [slash(join(fs.basePath, 'foo', 'bar', 'baz.ts'))]: {
        version: 1,
      },
    })
  })

  test('return files based on the includes and exclude patterns', async ({ assert, fs }) => {
    await fs.create(
      'tsconfig.json',
      JSON.stringify({
        include: ['./**/*'],
        exclude: ['./foo/bar/*.ts'],
      })
    )
    await fs.create('foo/bar/baz.ts', "import path from 'path'")

    const { config } = new ConfigParser(fs.basePath, 'tsconfig.json', ts).parse()

    const sourceFilesManager = new SourceFilesManager(fs.basePath, {
      includes: config!.raw.include,
      excludes: config!.raw.exclude,
      files: config!.fileNames.map((fileName) => normalize(fileName)),
    })

    assert.deepEqual(sourceFilesManager.toJSON(), {})
  })

  test('add new file when to the project source files', async ({ assert, fs }) => {
    await fs.create(
      'tsconfig.json',
      JSON.stringify({
        include: ['./**/*'],
        exclude: ['./foo/bar/*.ts'],
      })
    )
    await fs.create('foo/bar/baz.ts', "import path from 'path'")

    const { config } = new ConfigParser(fs.basePath, 'tsconfig.json', ts).parse()

    const sourceFilesManager = new SourceFilesManager(fs.basePath, {
      includes: config!.raw.include,
      excludes: config!.raw.exclude,
      files: config!.fileNames.map((fileName) => normalize(fileName)),
    })

    sourceFilesManager.add(join(fs.basePath, './foo', 'baz.ts'))
    assert.deepEqual(sourceFilesManager.toJSON(), {
      [slash(join(fs.basePath, './foo', 'baz.ts'))]: { version: 1 },
    })
  })

  test('bump version for existing source file', async ({ assert, fs }) => {
    await fs.create(
      'tsconfig.json',
      JSON.stringify({
        include: ['./**/*'],
      })
    )
    await fs.create('foo/bar/baz.ts', "import path from 'path'")

    const { config } = new ConfigParser(fs.basePath, 'tsconfig.json', ts).parse()

    const sourceFilesManager = new SourceFilesManager(fs.basePath, {
      includes: config!.raw.include,
      excludes: config!.raw.exclude,
      files: config!.fileNames.map((fileName) => normalize(fileName)),
    })

    sourceFilesManager.bumpVersion(join(fs.basePath, './foo', 'bar', 'baz.ts'))
    assert.deepEqual(sourceFilesManager.toJSON(), {
      [slash(join(fs.basePath, './foo', 'bar', 'baz.ts'))]: { version: 2 },
    })
  })

  test('delete source file', async ({ assert, fs }) => {
    await fs.create(
      'tsconfig.json',
      JSON.stringify({
        include: ['./**/*'],
      })
    )
    await fs.create('foo/bar/baz.ts', "import path from 'path'")

    const { config } = new ConfigParser(fs.basePath, 'tsconfig.json', ts).parse()

    const sourceFilesManager = new SourceFilesManager(fs.basePath, {
      includes: config!.raw.include,
      excludes: config!.raw.exclude,
      files: config!.fileNames.map((fileName) => normalize(fileName)),
    })

    sourceFilesManager.remove(join(fs.basePath, './foo', 'bar', 'baz.ts'))
    assert.deepEqual(sourceFilesManager.toJSON(), {})
  })

  test('return true when file is part of include pattern', async ({ assert, fs }) => {
    await fs.create(
      'tsconfig.json',
      JSON.stringify({
        include: ['./**/*'],
      })
    )

    const { config } = new ConfigParser(fs.basePath, 'tsconfig.json', ts).parse()
    const sourceFilesManager = new SourceFilesManager(fs.basePath, {
      includes: config!.raw.include,
      excludes: config!.raw.exclude,
      files: config!.fileNames.map((fileName) => normalize(fileName)),
    })

    assert.isTrue(sourceFilesManager.isSourceFile(join(fs.basePath, './foo', 'bar', 'baz.ts')))
  })

  test('return false when file is part of exclude pattern', async ({ assert, fs }) => {
    await fs.create(
      'tsconfig.json',
      JSON.stringify({
        include: ['./**/*'],
        exclude: ['./foo/bar/baz.ts'],
      })
    )

    const { config } = new ConfigParser(fs.basePath, 'tsconfig.json', ts).parse()
    const sourceFilesManager = new SourceFilesManager(fs.basePath, {
      includes: config!.raw.include,
      excludes: config!.raw.exclude,
      files: config!.fileNames.map((fileName) => normalize(fileName)),
    })

    assert.isFalse(sourceFilesManager.isSourceFile(join(fs.basePath, './foo', 'bar', 'baz.ts')))
  })

  test('return false when file is outside the source directory', async ({ assert, fs }) => {
    await fs.create(
      'tsconfig.json',
      JSON.stringify({
        include: ['./**/*'],
      })
    )

    const { config } = new ConfigParser(fs.basePath, 'tsconfig.json', ts).parse()
    const sourceFilesManager = new SourceFilesManager(fs.basePath, {
      includes: config!.raw.include,
      excludes: config!.raw.exclude,
      files: config!.fileNames.map((fileName) => normalize(fileName)),
    })

    assert.isFalse(sourceFilesManager.isSourceFile(join(fs.basePath, '../foo', 'bar', 'baz.ts')))
  })

  test('return true when file part of project files', async ({ assert, fs }) => {
    await fs.create(
      'tsconfig.json',
      JSON.stringify({
        include: ['./**/*'],
        exclude: ['./foo/bar/baz.ts'],
        files: [join(fs.basePath, './foo', 'bar', 'baz.ts')],
      })
    )

    const { config } = new ConfigParser(fs.basePath, 'tsconfig.json', ts).parse()
    const sourceFilesManager = new SourceFilesManager(fs.basePath, {
      includes: config!.raw.include,
      excludes: config!.raw.exclude,
      files: config!.fileNames.map((fileName) => normalize(fileName)),
    })

    assert.isTrue(sourceFilesManager.isSourceFile(join(fs.basePath, './foo', 'bar', 'baz.ts')))
  })
})
