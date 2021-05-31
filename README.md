<div align="center">
  <img src="https://res.cloudinary.com/adonisjs/image/upload/q_100/v1557762307/poppinss_iftxlt.jpg" width="600px">
</div>

# Chokidar Ts

> Typescript compiler using chokidar vs native Fs events.

[![gh-workflow-image]][gh-workflow-url] [![typescript-image]][typescript-url] [![npm-image]][npm-url] [![license-image]][license-url] [![synk-image]][synk-url]

This module uses the compiler API of typescript to work as replacement for `tsc` and `tsc --watch` and uses [chokidar](https://github.com/paulmillr/chokidar) for watching file changes.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of contents

- [Why not simply use tsc?](#why-not-simply-use-tsc)
- [Why this module?](#why-this-module)
- [Goals](#goals)
- [How it works?](#how-it-works)
    - [ConfigParser](#configparser)
    - [Builder](#builder)
    - [LSP Watcher](#lsp-watcher)
    - [Watcher](#watcher)
- [Customer Transformers](#customer-transformers)
- [Installation](#installation)
- [Usage](#usage)
    - [configParser(compileOptionsToExtend?: ts.CompilerOptions)](#configparsercompileoptionstoextend-tscompileroptions)
    - [builder(options: ts.ParsedCommandLine)](#builderoptions-tsparsedcommandline)
    - [watcher(options: ts.ParsedCommandLine, mode: 'raw' | 'lsp')](#watcheroptions-tsparsedcommandline-mode-raw--lsp)
    - [use(transformer: PluginFn, lifecycle: 'before' | 'after')](#usetransformer-pluginfn-lifecycle-before--after)
- [API Docs](#api-docs)
- [Debug](#debug)
- [Reference Tree](#reference-tree)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<details>
<summary>
	<strong>❓ Upgrading from <code>2.x.x</code></strong>
</summary>

<ul>
  <li>
  	<p>The emitted events now emits an object with <code>relativePath</code> and <code>absPath</code> properties</p>
  	<pre><code>watcher.on('add', ({ relativePath, absPath }) => {
})</code></pre>
  </li>

  <li>
  	<p>Now you have to define an explicit watch mode when creating the <code>watcher</code> instance.</p>
  	<pre><code>const lspWatcher = compiler.watcher(config!, 'lsp')
const watcher = compiler.watcher(config!, 'raw')</code></pre>
  </li>
</ul>

</details>

## Why not simply use tsc?

You must use `tsc`, since it is the official command line tool provided by the Typescript team. However, it has following restrictions.

1. It only watches for typescript source files.
2. Uses `fs.watch` or `fs.watchFile`. Both have their own issues and that's why modules like chokidar were created.
3. There is no way to hook custom transformers when using `tsc`.

> If all of the above problems doesn't impact your projects, then simply use `tsc` and do waste time looking for alternatives.

Because of the above restrictions (and many more), communities like [webpack](https://github.com/TypeStrong/ts-loader) and [gulp](https://www.npmjs.com/package/gulp-typescript) also has to use the compiler API to add support for typescript in their build tools.

## Why this module?

If you are user of Webpack or gulp and working in frontend space, then your life is all set, since they have first class support for Typescript projects.

However, I maintain a [Node.js framework](https://adonisjs.com/), which is bit different from frontend projects and has some unique challenges.

A backend project may have other files from `.ts` files. For example: Restart the server when `.env` file changes or when there is a change in a view template. Because of this, you will see many backend projects using the `nodemon` watcher to watch for all files and then rebuild the typescript project on every change and they end up making the build process too slow.

I created this module to address the above defined workflow by using the [Language Service](https://github.com/microsoft/TypeScript/wiki/Using-the-Language-Service-API) API of Typescript and build only the changed files.

## Goals

The goal of this module is to stay as close as possible to the behavior of `tsc` and `tsc --watch`, while addressing the above mentioned issues.

- Always rely on `tsconfig.json` file and do not invent new configuration options.
- Use much of the defaults from the compiler API. We are not set out to create a compiler with different approach all together.
- Allow custom AST transformers

## How it works?

I make sure not to over engineer the process of compiling the code and keep it identical to the workings of `tsc`.

The module exposes 3 main sub-modules.

#### ConfigParser

The `ConfigParser` module exposes the API to parse the typescript config

#### Builder

The `Builder` module exposes the API to build the entire project. It is similar to `tsc`.

#### LSP Watcher

This is where things get's interesting. Instead of using the native `fs` events (which are super slow), we make use of `chokidar` to watch the entire project and handle file changes, as explained below.

**Is Typescript file?**
Handle the event internally and process the file using the Language service API. We also check the file path against the `includes` and `excludes` to make sure, that we are processing the right files.

**If not a typescript file?**
We will emit `add`, `change` or `unlink` event, so that you (the module consumer) can use and decide what to do on that event. For example: If filePath is `.env`, then restart the Node.js server.

By using this flow, you will always have one watcher in your entire project, that will process the Typescript files, restart the Node.js server or copy files to build folder.

#### Watcher

The Watch is similar to the LSP watcher, but instead of compiling files using the Typescript compiler, it will just emit the events.

This is helpful when you are running your application using a module like [ts-node](https://npm.im/ts-node) or [@adonisjs/require-ts](https://npm.im/@adonisjs/require-ts) but want the watcher to restart the HTTP server on file change.

Instead of using a standard file watcher. The watcher class uses Typescript config to decide which files to watch or ignore.

## Customer Transformers

You can also define custom transformers to transform the AST. You can read more about the transform API by following this [article series](https://levelup.gitconnected.com/writing-typescript-custom-ast-transformer-part-1-7585d6916819).

## Installation

Install the module from npm registry as follows:

```sh
npm i @poppinss/chokidar-ts

# yarn
yarn add @poppinss/chokidar-ts
```

## Usage

```ts
import { TypescriptCompiler } from '@poppinss/chokidar-ts'

const compiler = new TypescriptCompiler(
  __dirname,
  'tsconfig.json',
  require('typescript/lib/typescript')
)
```

The constructor accepts three arguments:

1. `project root`: The path to the project root.
2. `config file`: The name of the config file from where to read the configuration.
3. `typescript`: You must pass in the typescript reference, that is used by your project.

#### configParser(compileOptionsToExtend?: ts.CompilerOptions)

Parse the project config. Optionally, you can define your custom compiler options. There are helpful, when you want to overwrite some of the values from the `tsconfig.json` file.

```ts
const { error, config } = compiler.configParser().parse()

/**
 * Unable to read the config at all
 */
if (error) {
  console.log(error)
  return
}

/**
 * Config has been processed, but has some errors
 */
if (config && config.errors.length) {
  console.log(config.errors)
  return
}

// Use config
```

#### builder(options: ts.ParsedCommandLine)

Build the project. It is same as running `tsc` command. However, the `incremental: true` will have no impact.

The `build` command is used to build the project from scratch, it indirectly means, we should cleanup the old build before running this command and hence `incremental: true` has no impact once old build is deleted.

**Why Delete the Old Build?**

Because, the typescript compiler is not smart enough to delete the compiled file once the source file has been deleted and you will end up having files inside your build directory which doesn't even exists inside the source.

Deleting the build and re-building the project results in the most consistent and reliable output.

```ts
const { error, config } = compiler.configParser().parse()
if (error || !config) {
  console.log(error)
  return
}

if (config.errors.length) {
  console.log(config.errors)
  return
}

const { diagnostics, skipped } = compiler.builder(config!).build()

if (diagnostics.length) {
  console.log('Built with few errors')
  console.log(diagnostics)
} else {
  console.log('Built successfully')
}
```

#### watcher(options: ts.ParsedCommandLine, mode: 'raw' | 'lsp')

Returns an instance of watcher that uses `chokidar` and Typescript `LanguageService` to compile the files as they change.

```ts
const { error, config } = compiler.configParser().parse()
if (error || !config) {
  console.log(error)
  return
}

if (config.errors.length) {
  console.log(config.errors)
  return
}

const watcher = compiler.watcher(config!, 'lsp')

watcher.on('watcher:ready', () => {
  // Watcher is ready
})

watcher.on('subsequent:build', ({ relativePath, absPath, skipped, diagnostics }) => {
  // re-built source files
})

watcher.on('add', ({ relativePath, absPath }) => {
  // file other than `.ts` files has been added
})

watcher.on('change', ({ relativePath, absPath }) => {
  // file other than `.ts` files has changed
})

watcher.on('unlink', ({ relativePath, absPath }) => {
  // file other than `.ts` files has been removed
})

watcher.on('source:unlink', ({ relativePath, absPath }) => {
  // source file removed
})

watcher.watch(['.'], {
  ignored: ['node_modules', 'build'],
})

// Stop the watcher anytime you want to
watcher.chokidar.close()
```

When you choose `raw` mode over the `lsp` mode, then instead of emitting `subsequent:build`, it will emit following events.

- `source:add`
- `source:change`
- `source:unlink`

#### use(transformer: PluginFn, lifecycle: 'before' | 'after')

Define your custom transformer. The transformer will receive the parsed config and the `typescript` reference passed to the constructor.

```ts
compiler.use((ts, config) => {
  return function transformer(ctx) {}
}, 'after')
```

## API Docs

Following are the autogenerated files via Typedoc

- [API](docs/README.md)

## Debug

You can debug the behavior of this module by running it as `DEBUG=tsc:* node script-file`

## Reference Tree

In watch mode, we need to maintain a reference tree of files to re-process dependent files when a given file changes. This is how it works:

Let's say your project has just two file.

```sh
.
└── foo.ts
└── bar.ts
```

The `foo.ts` file has a dependency on `bar.ts` file.

```ts
// foo.ts

import { greet } from './bar'

console.log(greet('virk'))
```

```ts
// bar.ts

export function greet(name: string) {
  return `Hello ${name}`
}
```

When the `bar.ts` file changes, we also have to re-process the `foo.ts` to ensure that it is still valid.

To achieve the defined behavior, we maintain a reference tree of all the source files mentioned inside `includes` and not inside `excludes` of the `tsconfig.json` file.

Reference tree for `node_modules` is not maintained. So, if you update a package, you will have to re-start the compiler.

[gh-workflow-image]: https://img.shields.io/github/workflow/status/poppinss/chokidar-ts/test?style=for-the-badge
[gh-workflow-url]: https://github.com/poppinss/chokidar-ts/actions/workflows/test.yml "Github action"

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]: "typescript"

[npm-image]: https://img.shields.io/npm/v/@poppinss/chokidar-ts.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/@poppinss/chokidar-ts 'npm'

[license-image]: https://img.shields.io/npm/l/@poppinss/chokidar-ts?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md 'license'

[synk-image]: https://img.shields.io/snyk/vulnerabilities/github/poppinss/chokidar-ts?label=Synk%20Vulnerabilities&style=for-the-badge
[synk-url]: https://snyk.io/test/github/poppinss/chokidar-ts?targetFile=package.json 'synk'
