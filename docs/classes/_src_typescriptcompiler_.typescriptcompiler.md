**[@poppinss/chokidar-ts](../README.md)**

> [Globals](../README.md) / ["src/TypescriptCompiler"](../modules/_src_typescriptcompiler_.md) / TypescriptCompiler

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

### constructor

\+ **new TypescriptCompiler**(`cwd`: string, `configFileName`: string, `ts`: *typeof* tsStatic): [TypescriptCompiler](_src_typescriptcompiler_.typescriptcompiler.md)

#### Parameters:

Name | Type |
------ | ------ |
`cwd` | string |
`configFileName` | string |
`ts` | *typeof* tsStatic |

**Returns:** [TypescriptCompiler](_src_typescriptcompiler_.typescriptcompiler.md)

## Properties

### ts

•  **ts**: *typeof* tsStatic

## Methods

### builder

▸ **builder**(`options`: tsStatic.ParsedCommandLine): [Builder](_src_builder_.builder.md)

Get builder instance

#### Parameters:

Name | Type |
------ | ------ |
`options` | tsStatic.ParsedCommandLine |

**Returns:** [Builder](_src_builder_.builder.md)

___

### configParser

▸ **configParser**(): [ConfigParser](_src_configparser_.configparser.md)

Get config parser instance

**Returns:** [ConfigParser](_src_configparser_.configparser.md)

___

### use

▸ **use**(`transformer`: [PluginFn](../modules/_src_contracts_.md#pluginfn), `lifecycle`: \"before\" \| \"after\"): this

Add plugin which can apply transformers to the typescript compiler

#### Parameters:

Name | Type |
------ | ------ |
`transformer` | [PluginFn](../modules/_src_contracts_.md#pluginfn) |
`lifecycle` | \"before\" \| \"after\" |

**Returns:** this

___

### watcher

▸ **watcher**(`options`: tsStatic.ParsedCommandLine, `mode`: \"raw\" \| \"lsp\"): [LspWatcher](_src_lspwatcher_.lspwatcher.md) \| [Watcher](_src_watcher_.watcher.md)

Get watcher instance

#### Parameters:

Name | Type |
------ | ------ |
`options` | tsStatic.ParsedCommandLine |
`mode` | \"raw\" \| \"lsp\" |

**Returns:** [LspWatcher](_src_lspwatcher_.lspwatcher.md) \| [Watcher](_src_watcher_.watcher.md)
