[@poppinss/chokidar-ts](../README.md) › ["src/Builder"](../modules/_src_builder_.md) › [Builder](_src_builder_.builder.md)

# Class: Builder

Exposes the API to build the project similar to `tsc` command.

## Hierarchy

- **Builder**

## Index

### Constructors

- [constructor](_src_builder_.builder.md#constructor)

### Properties

- [compilerOptions](_src_builder_.builder.md#optional-compileroptions)
- [host](_src_builder_.builder.md#host)
- [program](_src_builder_.builder.md#program)

### Methods

- [build](_src_builder_.builder.md#build)

## Constructors

### constructor

\+ **new Builder**(`ts`: typeof tsStatic, `config`: tsStatic.ParsedCommandLine, `pluginManager`: [PluginManager](_src_pluginmanager_.pluginmanager.md)): _[Builder](_src_builder_.builder.md)_

**Parameters:**

| Name            | Type                                                  |
| --------------- | ----------------------------------------------------- |
| `ts`            | typeof tsStatic                                       |
| `config`        | tsStatic.ParsedCommandLine                            |
| `pluginManager` | [PluginManager](_src_pluginmanager_.pluginmanager.md) |

**Returns:** _[Builder](_src_builder_.builder.md)_

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
