[@poppinss/chokidar-ts](../README.md) › ["src/ModuleResolver"](../modules/_src_moduleresolver_.md) › [ModuleResolver](_src_moduleresolver_.moduleresolver.md)

# Class: ModuleResolver

Wraps the typescript compiler `nodeModuleNameResolver` to ignore the
native modules and dependencies. Since, we need module resolver
to report type errors, we do not type check node_modules when
they are changed during the watch mode.

## Hierarchy

* **ModuleResolver**

## Index

### Constructors

* [constructor](_src_moduleresolver_.moduleresolver.md#constructor)

### Methods

* [addAmbientModules](_src_moduleresolver_.moduleresolver.md#addambientmodules)
* [resolve](_src_moduleresolver_.moduleresolver.md#resolve)

## Constructors

###  constructor

\+ **new ModuleResolver**(`ts`: typeof tsStatic, `compilerOptions`: tsStatic.CompilerOptions): *[ModuleResolver](_src_moduleresolver_.moduleresolver.md)*

**Parameters:**

Name | Type |
------ | ------ |
`ts` | typeof tsStatic |
`compilerOptions` | tsStatic.CompilerOptions |

**Returns:** *[ModuleResolver](_src_moduleresolver_.moduleresolver.md)*

## Methods

###  addAmbientModules

▸ **addAmbientModules**(`filePath`: string, `ambientModules`: string[]): *void*

Track ambient module

**Parameters:**

Name | Type |
------ | ------ |
`filePath` | string |
`ambientModules` | string[] |

**Returns:** *void*

___

###  resolve

▸ **resolve**(`importPath`: string, `modulePath`: string): *null | string*

Returns the resolved module path

**Parameters:**

Name | Type |
------ | ------ |
`importPath` | string |
`modulePath` | string |

**Returns:** *null | string*
