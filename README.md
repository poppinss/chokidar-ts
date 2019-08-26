<div align="center">
  <img src="https://res.cloudinary.com/adonisjs/image/upload/q_100/v1557762307/poppinss_iftxlt.jpg" width="600px">
</div>

# Chokidar Ts
> Typescript compiler using chokidar vs native Fs events.

[![circleci-image]][circleci-url] [![appveyor-image]][appveyor-url] [![npm-image]][npm-url] ![][typescript-image] [![license-image]][license-url]

This module uses the compiler API of typescript to work as replacement for `tsc` and `tsc --watch` and uses [chokidar](https://github.com/paulmillr/chokidar) for watching file changes.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of contents

- [Why not simply use tsc?](#why-not-simply-use-tsc)
- [Why this module?](#why-this-module)
- [How it works?](#how-it-works)
    - [parseConfig](#parseconfig)
    - [build](#build)
    - [watch](#watch)
    - [use](#use)
- [Usage](#usage)
    - [parseConfig(compileOptionsToExtend?: ts.CompilerOptions)](#parseconfigcompileoptionstoextend-tscompileroptions)
    - [build(parsedConfig: tsStatic.ParsedCommandLine)](#buildparsedconfig-tsstaticparsedcommandline)
    - [watch(parsedConfig: tsStatic.ParsedCommandLine, watchPattern?: [], options?: chokidar.WatchOptions)](#watchparsedconfig-tsstaticparsedcommandline-watchpattern--options-chokidarwatchoptions)
    - [use(transformer: PluginFn, lifecycle: 'before' | 'after')](#usetransformer-pluginfn-lifecycle-before--after)
- [API Docs](#api-docs)
- [Debug](#debug)
- [Maintainers](#maintainers)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Why not simply use tsc?
You must use `tsc`, since it is the official command line tool provided by the Typescript team. However, it has following restrictions.

1. It only watches for typescript source files.
2. Uses `fs.watch` or `fs.watchFile`. Both have their own issues and that's why modules like chokidar were created.
3. There is no way to hook custom transformers when using `tsc`.

> If all of the above problems doesn't impact your projects, then simply use `tsc` and do waste time looking for alternatives.

Because of the above restrictions, communities like [webpack](https://github.com/TypeStrong/ts-loader) and [gulp](https://www.npmjs.com/package/gulp-typescript) also has to use the compiler API to add support for typescript in their build tools.

## Why this module?
If you are user of Webpack or gulp and working in frontend space, then your life is all set, since they have first class support for Typescript projects.

However, I maintain a [Node.js framework](https://adonisjs.com/), which is bit different from frontend projects and has some unique challenges.

A backend project may have other files from `.ts` files. For example: Restart the server when `.env` file changes or when there is a change in a view template. Because of this, you will see many backend projects using the `nodemon` watcher to watch for all files and then rebuild the typescript project on every change and they end up making the build process too slow.

I created this module to address the above defined workflow by using the [Language Service](https://github.com/microsoft/TypeScript/wiki/Using-the-Language-Service-API) API of Typescript and build only the changed files.

## How it works?
I make sure not to over engineer the process of compiling the code and keep it identical to the workings of `tsc`.

The module exposes 4 main functions.

#### parseConfig
The `parseConfig` method will read the config from `tsconfig.json` file and returns it back to you. You can use it for tasks like, **using `outDir` value to cleanup the old build**.

#### build
The `build` method will compile the Typescript source files to Javascript. It is identical to `tsc` command.

#### watch
This is where things get's interesting. Instead of using the native `fs` events (which are super slow), we make use of `chokidar` to watch the entire project and handle file changes, as explained below.

**Is Typescript file?**
Handle the event internally and process the file using the Language service API. We also check the file path against the `includes` and `excludes` to make sure, that we are processing the right files.

**If not a typescript file?**
We will emit `add`, `change` or `unlink` event, so that you (the module consumer) can use and decide what to do on that event. For example: If filePath is `.env`, then restart the Node.js server.

By using this flow, you will always one watcher in your entire project, that will process the Typescript files, restart the Node.js server or copy files to build folder.

#### use
Define custom transformers to transform the AST. You can read more about the transform API by following this [article series](https://levelup.gitconnected.com/writing-typescript-custom-ast-transformer-part-1-7585d6916819).

## Usage
Install the module from npm registry as follows:

```sh
npm i @poppinss/chokidar-ts

# yarn
yarn add @poppinss/chokidar-ts
```

and then use it as follows:

```ts
import { TypescriptCompiler } from '@poppinss/chokidar-ts'

const compiler = new TypescriptCompiler(
  require('typescript/lib/typescript'),
  'tsconfig.json',
  __dirname,
)
```

The consturctor accepts three arguments:

1. `typescript`: You must pass in the typescript reference, that is used by your project.
2. `config file`: The name of the config file from where to read the configuration.
3. `project root`: The path to the project root.

#### parseConfig(compileOptionsToExtend?: ts.CompilerOptions)
Parse the project config. Optionally, you can define your custom compiler options. There are helpful, when you want to overwrite some of the values from the `tsconfig.json` file.

```ts
const { error, config } = compiler.parseConfig()

/**
 * Unable to read the config at all
 */
if (error) {
  console.log(error)
}

/**
 * Config has been process, but has some errors
 */
if (config && config.errors.length) {
  console.log(config.errors)
}

// Use config
```

#### build(parsedConfig: tsStatic.ParsedCommandLine)
Build the project. It is same as running `tsc` command. However, the `incremental: true` will have no impact, since typescript team hasn't exposed the API for creating incremental builds.

```ts
const { error, config } = compiler.parseConfig()

compiler.on('initial:build', (hasError, diagnostics) => {
})

if (config) {
  compiler.build(config)
}
```

#### watch(parsedConfig: tsStatic.ParsedCommandLine, watchPattern?: [], options?: chokidar.WatchOptions)
Start the project watcher. You can also optionally pass `chokidar` options to customize the watcher behavior. By default, we will watch the entire project, except `dot files`, `node_modules` and the typescript `build` directory.

```ts
const { error, config } = compiler.parseConfig()

compiler.on('initial:build', (hasError, diagnostics) => {
  // start the HTTP server
})

compiler.on('subsequent:build', (filePath, hasError, diagnostics) => {
  // restart the HTTP server
})

compiler.on('add', (filePath) => {
  // file other than `.ts` files has been added
})

compiler.on('change', (filePath) => {
  // file other than `.ts` files has changed
})

compiler.on('unlink', (filePath) => {
  // file other than `.ts` files has been removed
})

compiler.on('source:unlink', (filePath) => {
  // source file removed
})

if (config) {
  compiler.watch(config)
}

// Stop the watcher
compiler.watcher.close()
```

#### use(transformer: PluginFn, lifecycle: 'before' | 'after')
Define your custom transformer. The transformer will receive the parsed config and the `typescript` reference passed to the constructor.

```ts
compiler.use((ts, config) => {
  return function transformer (ctx) {
  }
}, 'after')
```

## API Docs
Following are the autogenerated files via Typedoc

* [API](docs/README.md)

## Debug
You can debug the behavior of this module by running it as `DEBUG=adonis:tsc node script-file`

## Maintainers
[Harminder virk](https://github.com/thetutlage)

[appveyor-image]: https://img.shields.io/appveyor/ci/thetutlage/chokidar-ts/master.svg?style=for-the-badge&logo=appveyor
[appveyor-url]: https://ci.appveyor.com/project/thetutlage/chokidar-ts "appveyor"

[circleci-image]: https://img.shields.io/circleci/project/github/poppinss/chokidar-ts/master.svg?style=for-the-badge&logo=circleci
[circleci-url]: https://circleci.com/gh/poppinss/chokidar-ts "circleci"

[npm-image]: https://img.shields.io/npm/v/@poppinss/chokidar-ts.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/@poppinss/chokidar-ts "npm"

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript

[license-url]: LICENSE.md
[license-image]: https://img.shields.io/aur/license/pac.svg?style=for-the-badge
