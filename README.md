# Chokidar TS
> A thin wrapper on top of [chokidar](https://github.com/paulmillr/chokidar) file watcher that relies on the `tsconfig.json` file to distinguish between the TypeScript source files and other files.

[![gh-workflow-image]][gh-workflow-url] [![typescript-image]][typescript-url] [![npm-image]][npm-url] [![license-image]][license-url]

## Why does this package exists?
When running a Node.js backend development server with a file watcher, we need to know whether a newly added or changed file is part of our TypeScript project.

The best way to establish if a file is part of a TypeScript project is to rely on the `tsconfig.json` file.

This is precisely what this package does. It will create a file watcher using chokidar and then uses the `includes` and `excludes` patterns from the `tsconfig.json` file to know if a changed file is part of a TypeScript project.

## Setup
Install the package from the npm packages registry. In addition, the package has a peer dependency on the `typescript` package, so make sure to install that as well.

```sh
npm i @poppinss/chokidar-ts
```

```sh
yarn add @poppinss/chokidar-ts
```

```sh
pnpm add @poppinss/chokidar-ts
```

And use it as follows.

```ts
import typescript from 'typescript'
import { ConfigParser, Watcher } from '@poppinss/chokidar-ts'

const projectRoot = new URL('./', import.meta.url)
const configFileName = 'tsconfig.json'

const { config } = new ConfigParser(
  projectRoot,
  configFileName,
  typescript,
).parse()

if (config) {
  const watcher = new Watcher(projectRoot, config)
  watcher.watch(['.'])
}
```

## Listening for events
The `Watcher` class emits the following events. Events prefixed with `source` refers to files included by the `tsconfig.json` file, and other events refer to non-typescript or files excluded by the `tsconfig.json` file.

- `add`: A new file has been added. The file is either not a TypeScript file or is excluded by the `tsconfig.json` file.
- `source:add`: A new TypeScript source file has been added.
- `change`: An existing file has been updated. The file is either not a TypeScript file or is excluded by the `tsconfig.json` file.
- `source:change`: An existing TypeScript source file has been changed.
- `unlink`: An existing file has been deleted. The file is not a TypeScript source file.
- `source:unlink`: An existing TypeScript source file has been deleted.

```ts
const watcher = new Watcher(projectRoot, config)

watcher.on('add', (file) => {
  console.log(file.absPath)
  console.log(file.relativePath)
})

watcher.on('source:add', (file) => {
  console.log(file.absPath)
  console.log(file.relativePath)
})

watcher.on('change', (file) => {
  console.log(file.absPath)
  console.log(file.relativePath)
})

watcher.on('source:change', (file) => {
  console.log(file.absPath)
  console.log(file.relativePath)
})

watcher.on('unlink', (file) => {
  console.log(file.absPath)
  console.log(file.relativePath)
})

watcher.on('source:unlink', (file) => {
  console.log(file.absPath)
  console.log(file.relativePath)
})

watcher.watch(['.'])
```

## Handling config parser errors
Parsing the `tsconfig.json` file can produce errors, and you can display them using the TypeScript compiler as follows.

```ts
import typescript from 'typescript'
const { error, config } = new ConfigParser(
  projectRoot,
  configFileName,
  typescript,
).parse()

if (error) {
  const compilerHost = typescript.createCompilerHost({})
  console.log(
    typescript.formatDiagnosticsWithColorAndContext([error], compilerHost)
  )

  return
}

if (!config) {
  return
}

if (config.errors) {
  const compilerHost = typescript.createCompilerHost({})
  console.log(
    typescript.formatDiagnosticsWithColorAndContext(config.errors, compilerHost)
  )

  return
}
```

[gh-workflow-image]: https://img.shields.io/github/actions/workflow/status/poppinss/chokidar-ts/checks.yml?style=for-the-badge
[gh-workflow-url]: https://github.com/poppinss/chokidar-ts/actions/workflows/checks.yml "Github action"

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]: "typescript"

[npm-image]: https://img.shields.io/npm/v/@poppinss/chokidar-ts.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/@poppinss/chokidar-ts 'npm'

[license-image]: https://img.shields.io/npm/l/@poppinss/chokidar-ts?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md 'license'
