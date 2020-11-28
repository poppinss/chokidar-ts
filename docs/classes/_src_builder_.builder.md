**[@poppinss/chokidar-ts](../README.md)**

> [Globals](../README.md) / ["src/Builder"](../modules/_src_builder_.md) / Builder

# Class: Builder

Exposes the API to build the project similar to `tsc` command.

## Hierarchy

* **Builder**

## Index

### Constructors

* [constructor](_src_builder_.builder.md#constructor)

### Properties

* [compilerOptions](_src_builder_.builder.md#compileroptions)
* [host](_src_builder_.builder.md#host)
* [program](_src_builder_.builder.md#program)

### Methods

* [build](_src_builder_.builder.md#build)
* [createProgram](_src_builder_.builder.md#createprogram)

## Constructors

### constructor

\+ **new Builder**(`ts`: *typeof* tsStatic, `config`: tsStatic.ParsedCommandLine, `pluginManager`: [PluginManager](_src_pluginmanager_.pluginmanager.md)): [Builder](_src_builder_.builder.md)

#### Parameters:

Name | Type |
------ | ------ |
`ts` | *typeof* tsStatic |
`config` | tsStatic.ParsedCommandLine |
`pluginManager` | [PluginManager](_src_pluginmanager_.pluginmanager.md) |

**Returns:** [Builder](_src_builder_.builder.md)

## Properties

### compilerOptions

• `Optional` **compilerOptions**: tsStatic.CompilerOptions

___

### host

•  **host**: tsStatic.CompilerHost

___

### program

•  **program**: tsStatic.Program

## Methods

### build

▸ **build**(): object

Build the project using the Typescript compiler API

**Returns:** object

Name | Type |
------ | ------ |
`diagnostics` | Diagnostic[] |
`skipped` | boolean |

___

### createProgram

▸ **createProgram**(): void

Create typescript program

**Returns:** void
