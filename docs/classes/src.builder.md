[@poppinss/chokidar-ts](../README.md) › [src](../modules/src.md) › [Builder](src.builder.md)

# Class: Builder

Exposes the API to build the project similar to `tsc` command.

## Hierarchy

- **Builder**

## Index

### Constructors

- [constructor](src.builder.md#constructor)

### Properties

- [compilerOptions](src.builder.md#optional-compileroptions)
- [host](src.builder.md#host)
- [program](src.builder.md#program)

### Methods

- [build](src.builder.md#build)

## Constructors

### constructor

\+ **new Builder**(`ts`: typeof tsStatic, `config`: tsStatic.ParsedCommandLine, `pluginManager`: [PluginManager](src.pluginmanager.md)): _[Builder](src.builder.md)_

**Parameters:**

| Name            | Type                                  |
| --------------- | ------------------------------------- |
| `ts`            | typeof tsStatic                       |
| `config`        | tsStatic.ParsedCommandLine            |
| `pluginManager` | [PluginManager](src.pluginmanager.md) |

**Returns:** _[Builder](src.builder.md)_

## Properties

### `Optional` compilerOptions

• **compilerOptions**? : _tsStatic.CompilerOptions_

---

### host

• **host**: _tsStatic.CompilerHost_

---

### program

• **program**: _tsStatic.Program_

## Methods

### build

▸ **build**(): _object_

Build the project using the Typescript compiler API

**Returns:** _object_

- **diagnostics**: _Diagnostic[]_

- **skipped**: _boolean_ = result.emitSkipped
