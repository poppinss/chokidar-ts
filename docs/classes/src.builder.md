**@poppinss/chokidar-ts**

> [Globals](../README.md) / [src](../modules/src.md) / Builder

# Class: Builder

Exposes the API to build the project similar to `tsc` command.

## Hierarchy

* **Builder**

## Index

### Constructors

* [constructor](src.builder.md#constructor)

### Properties

* [compilerOptions](src.builder.md#compileroptions)
* [host](src.builder.md#host)
* [program](src.builder.md#program)

### Methods

* [build](src.builder.md#build)
* [createProgram](src.builder.md#createprogram)

## Constructors

### constructor

\+ **new Builder**(`ts`: *typeof* tsStatic, `config`: tsStatic.ParsedCommandLine, `pluginManager`: [PluginManager](src.pluginmanager.md)): [Builder](src.builder.md)

#### Parameters:

Name | Type |
------ | ------ |
`ts` | *typeof* tsStatic |
`config` | tsStatic.ParsedCommandLine |
`pluginManager` | [PluginManager](src.pluginmanager.md) |

**Returns:** [Builder](src.builder.md)

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
