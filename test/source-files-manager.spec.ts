/*
 * @poppinss/chokidar-ts
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import test from 'japa'
import { join, normalize } from 'path'
import { Filesystem } from '@poppinss/dev-utils'
import { SourceFilesManager } from '../src/SourceFilesManager'
import { parseTsConfig } from '../test-helpers'

const fs = new Filesystem(join(__dirname, 'app'))

function joinUnix (...paths: string[]): string {
  return join(...paths).replace(/\\/g, '/')
}

test.group('Source Files Manager', (group) => {
  group.afterEach(async () => {
    await fs.cleanup()
  })

  group.beforeEach(async () => {
    await fs.ensureRoot()
  })

  test('return files based on the includes pattern', async (assert) => {
    await fs.add('tsconfig.json', JSON.stringify({
      include: ['./**/*'],
    }))
    await fs.add('foo/bar/baz.ts', `import path from 'path'`)

    const config = parseTsConfig(join(fs.basePath, 'tsconfig.json'))

    const sourceFilesManager = new SourceFilesManager(
      fs.basePath,
      {
        includes: config!['configFileSpecs'].validatedIncludeSpecs,
        excludes: config!['configFileSpecs'].validatedExcludeSpecs,
        files: config!.fileNames.map((fileName) => normalize(fileName)),
      },
    )

    assert.deepEqual(sourceFilesManager.toJSON(), {
      [joinUnix(fs.basePath, 'foo', 'bar', 'baz.ts')]: {
        version: 1,
      },
    })
  })

  test('return files based on the includes and exclude patterns', async (assert) => {
    await fs.add('tsconfig.json', JSON.stringify({
      include: ['./**/*'],
      exclude: ['./foo/bar/*.ts'],
    }))
    await fs.add('foo/bar/baz.ts', `import path from 'path'`)

    const config = parseTsConfig(join(fs.basePath, 'tsconfig.json'))

    const sourceFilesManager = new SourceFilesManager(
      fs.basePath,
      {
        includes: config!['configFileSpecs'].validatedIncludeSpecs,
        excludes: config!['configFileSpecs'].validatedExcludeSpecs,
        files: config!.fileNames.map((fileName) => normalize(fileName)),
      },
    )

    assert.deepEqual(sourceFilesManager.toJSON(), {})
  })

  test('add new file when to the project source files', async (assert) => {
    await fs.add('tsconfig.json', JSON.stringify({
      include: ['./**/*'],
      exclude: ['./foo/bar/*.ts'],
    }))
    await fs.add('foo/bar/baz.ts', `import path from 'path'`)

    const config = parseTsConfig(join(fs.basePath, 'tsconfig.json'))

    const sourceFilesManager = new SourceFilesManager(
      fs.basePath,
      {
        includes: config!['configFileSpecs'].validatedIncludeSpecs,
        excludes: config!['configFileSpecs'].validatedExcludeSpecs,
        files: config!.fileNames.map((fileName) => normalize(fileName)),
      },
    )

    sourceFilesManager.add(join(fs.basePath, './foo', 'baz.ts'))
    assert.deepEqual(sourceFilesManager.toJSON(), {
      [joinUnix(fs.basePath, './foo', 'baz.ts')]: { version: 1 },
    })
  })

  test('bump version for existing source file', async (assert) => {
    await fs.add('tsconfig.json', JSON.stringify({
      include: ['./**/*'],
    }))
    await fs.add('foo/bar/baz.ts', `import path from 'path'`)

    const config = parseTsConfig(join(fs.basePath, 'tsconfig.json'))

    const sourceFilesManager = new SourceFilesManager(
      fs.basePath,
      {
        includes: config!['configFileSpecs'].validatedIncludeSpecs,
        excludes: config!['configFileSpecs'].validatedExcludeSpecs,
        files: config!.fileNames.map((fileName) => normalize(fileName)),
      },
    )

    sourceFilesManager.bumpVersion(join(fs.basePath, './foo', 'bar', 'baz.ts'))
    assert.deepEqual(sourceFilesManager.toJSON(), {
      [joinUnix(fs.basePath, './foo', 'bar', 'baz.ts')]: { version: 2 },
    })
  })

  test('delete source file', async (assert) => {
    await fs.add('tsconfig.json', JSON.stringify({
      include: ['./**/*'],
    }))
    await fs.add('foo/bar/baz.ts', `import path from 'path'`)

    const config = parseTsConfig(join(fs.basePath, 'tsconfig.json'))

    const sourceFilesManager = new SourceFilesManager(
      fs.basePath,
      {
        includes: config!['configFileSpecs'].validatedIncludeSpecs,
        excludes: config!['configFileSpecs'].validatedExcludeSpecs,
        files: config!.fileNames.map((fileName) => normalize(fileName)),
      },
    )

    sourceFilesManager.remove(join(fs.basePath, './foo', 'bar', 'baz.ts'))
    assert.deepEqual(sourceFilesManager.toJSON(), {})
  })

  test('return true when file is part of include pattern', async (assert) => {
    await fs.add('tsconfig.json', JSON.stringify({
      include: ['./**/*'],
    }))

    const config = parseTsConfig(join(fs.basePath, 'tsconfig.json'))
    const sourceFilesManager = new SourceFilesManager(
      fs.basePath,
      {
        includes: config!['configFileSpecs'].validatedIncludeSpecs,
        excludes: config!['configFileSpecs'].validatedExcludeSpecs,
        files: config!.fileNames.map((fileName) => normalize(fileName)),
      },
    )

    assert.isTrue(sourceFilesManager.isSourceFile(join(fs.basePath, './foo', 'bar', 'baz.ts')))
  })

  test('return false when file is part of exclude pattern', async (assert) => {
    await fs.add('tsconfig.json', JSON.stringify({
      include: ['./**/*'],
      exclude: ['./foo/bar/baz.ts'],
    }))

    const config = parseTsConfig(join(fs.basePath, 'tsconfig.json'))
    const sourceFilesManager = new SourceFilesManager(
      fs.basePath,
      {
        includes: config!['configFileSpecs'].validatedIncludeSpecs,
        excludes: config!['configFileSpecs'].validatedExcludeSpecs,
        files: config!.fileNames.map((fileName) => normalize(fileName)),
      },
    )

    assert.isFalse(sourceFilesManager.isSourceFile(join(fs.basePath, './foo', 'bar', 'baz.ts')))
  })

  test('return false when file is outside the source directory', async (assert) => {
    await fs.add('tsconfig.json', JSON.stringify({
      include: ['./**/*'],
    }))

    const config = parseTsConfig(join(fs.basePath, 'tsconfig.json'))
    const sourceFilesManager = new SourceFilesManager(
      fs.basePath,
      {
        includes: config!['configFileSpecs'].validatedIncludeSpecs,
        excludes: config!['configFileSpecs'].validatedExcludeSpecs,
        files: config!.fileNames.map((fileName) => normalize(fileName)),
      },
    )

    assert.isFalse(sourceFilesManager.isSourceFile(join(fs.basePath, '../foo', 'bar', 'baz.ts')))
  })

  test('return true when file part of project files', async (assert) => {
    await fs.add('tsconfig.json', JSON.stringify({
      include: ['./**/*'],
      exclude: ['./foo/bar/baz.ts'],
      files: [join(fs.basePath, './foo', 'bar', 'baz.ts')],
    }))

    const config = parseTsConfig(join(fs.basePath, 'tsconfig.json'))
    const sourceFilesManager = new SourceFilesManager(
      fs.basePath,
      {
        includes: config!['configFileSpecs'].validatedIncludeSpecs,
        excludes: config!['configFileSpecs'].validatedExcludeSpecs,
        files: config!.fileNames.map((fileName) => normalize(fileName)),
      },
    )

    assert.isTrue(sourceFilesManager.isSourceFile(join(fs.basePath, './foo', 'bar', 'baz.ts')))
  })
})
