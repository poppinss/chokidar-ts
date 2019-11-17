[@poppinss/chokidar-ts](../README.md) › ["src/TypescriptCompiler"](../modules/_src_typescriptcompiler_.md) › [TypescriptCompiler](_src_typescriptcompiler_.typescriptcompiler.md)

# Class: TypescriptCompiler

Typescript compiler exposes the API to build, watch or parse
the typescript config file.

## Hierarchy

* **TypescriptCompiler**

## Index

### Constructors

* [constructor](_src_typescriptcompiler_.typescriptcompiler.md#constructor)

### Properties

* [ts](_src_typescriptcompiler_.typescriptcompiler.md#ts)

### Methods

* [builder](_src_typescriptcompiler_.typescriptcompiler.md#builder)
* [configParser](_src_typescriptcompiler_.typescriptcompiler.md#configparser)
* [use](_src_typescriptcompiler_.typescriptcompiler.md#use)
* [watcher](_src_typescriptcompiler_.typescriptcompiler.md#watcher)

## Constructors

###  constructor

\+ **new TypescriptCompiler**(`ts`: ts, `_configFileName`: string, `_cwd`: string): *[TypescriptCompiler](_src_typescriptcompiler_.typescriptcompiler.md)*

**Parameters:**

Name | Type |
------ | ------ |
`ts` | ts |
`_configFileName` | string |
`_cwd` | string |

**Returns:** *[TypescriptCompiler](_src_typescriptcompiler_.typescriptcompiler.md)*

## Properties

###  ts

• **ts**: *ts*

## Methods

###  builder

▸ **builder**(): *[Builder](_src_builder_.builder.md)‹›*

Get builder instance

**Returns:** *[Builder](_src_builder_.builder.md)‹›*

___

###  configParser

▸ **configParser**(): *[ConfigParser](_src_configparser_.configparser.md)‹›*

Get config parser instance

**Returns:** *[ConfigParser](_src_configparser_.configparser.md)‹›*

___

###  use

▸ **use**(`transformer`: [PluginFn](../modules/_src_contracts_.md#pluginfn), `lifecycle`: "before" | "after"): *this*

Add plugin which can apply transformers to the typescript compiler

**Parameters:**

Name | Type |
------ | ------ |
`transformer` | [PluginFn](../modules/_src_contracts_.md#pluginfn) |
`lifecycle` | "before" &#124; "after" |

**Returns:** *this*

___

###  watcher

▸ **watcher**(): *[Watcher](_src_watcher_.watcher.md)‹›*

Get watcher instance

**Returns:** *[Watcher](_src_watcher_.watcher.md)‹›*
