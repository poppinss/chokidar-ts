[@poppinss/chokidar-ts](../README.md) › ["src/Builder"](../modules/_src_builder_.md) › [Builder](_src_builder_.builder.md)

# Class: Builder

Exposes the API to build the project similar to `tsc` command.

## Hierarchy

* **Builder**

## Index

### Constructors

* [constructor](_src_builder_.builder.md#constructor)

### Properties

* [compilerOptions](_src_builder_.builder.md#optional-compileroptions)
* [host](_src_builder_.builder.md#host)
* [program](_src_builder_.builder.md#program)

### Methods

* [build](_src_builder_.builder.md#build)

## Constructors

###  constructor

\+ **new Builder**(`_cwd`: string, `_configFileName`: string, `_ts`: ts, `_pluginManager`: [PluginManager](_src_pluginmanager_.pluginmanager.md)): *[Builder](_src_builder_.builder.md)*

**Parameters:**

Name | Type |
------ | ------ |
`_cwd` | string |
`_configFileName` | string |
`_ts` | ts |
`_pluginManager` | [PluginManager](_src_pluginmanager_.pluginmanager.md) |

**Returns:** *[Builder](_src_builder_.builder.md)*

## Properties

### `Optional` compilerOptions

• **compilerOptions**? : *tsStatic.CompilerOptions*

___

###  host

• **host**: *tsStatic.CompilerHost*

___

###  program

• **program**: *tsStatic.Program*

## Methods

###  build

▸ **build**(`optionsToExtend?`: tsStatic.CompilerOptions): *object*

Build the project using the Typescript compiler API

**Parameters:**

Name | Type |
------ | ------ |
`optionsToExtend?` | tsStatic.CompilerOptions |

**Returns:** *object*
