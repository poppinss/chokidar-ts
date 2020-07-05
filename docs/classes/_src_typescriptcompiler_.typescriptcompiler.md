[@poppinss/chokidar-ts](../README.md) › ["src/TypescriptCompiler"](../modules/_src_typescriptcompiler_.md) › [TypescriptCompiler](_src_typescriptcompiler_.typescriptcompiler.md)

# Class: TypescriptCompiler

Typescript compiler exposes the API to build, watch or parse
the typescript config file.

## Hierarchy

- **TypescriptCompiler**

## Index

### Constructors

- [constructor](_src_typescriptcompiler_.typescriptcompiler.md#constructor)

### Properties

- [ts](_src_typescriptcompiler_.typescriptcompiler.md#ts)

### Methods

- [builder](_src_typescriptcompiler_.typescriptcompiler.md#builder)
- [configParser](_src_typescriptcompiler_.typescriptcompiler.md#configparser)
- [use](_src_typescriptcompiler_.typescriptcompiler.md#use)
- [watcher](_src_typescriptcompiler_.typescriptcompiler.md#watcher)

## Constructors

### constructor

\+ **new TypescriptCompiler**(`cwd`: string, `configFileName`: string, `ts`: typeof tsStatic): _[TypescriptCompiler](_src_typescriptcompiler_.typescriptcompiler.md)_

**Parameters:**

| Name             | Type            |
| ---------------- | --------------- |
| `cwd`            | string          |
| `configFileName` | string          |
| `ts`             | typeof tsStatic |

**Returns:** _[TypescriptCompiler](_src_typescriptcompiler_.typescriptcompiler.md)_

## Properties

### ts

• **ts**: _typeof tsStatic_

## Methods

### builder

▸ **builder**(`options`: tsStatic.ParsedCommandLine): _[Builder](_src_builder_.builder.md)‹›_

Get builder instance

**Parameters:**

| Name      | Type                       |
| --------- | -------------------------- |
| `options` | tsStatic.ParsedCommandLine |

**Returns:** _[Builder](_src_builder_.builder.md)‹›_

---

### configParser

▸ **configParser**(): _[ConfigParser](_src_configparser_.configparser.md)‹›_

Get config parser instance

**Returns:** _[ConfigParser](_src_configparser_.configparser.md)‹›_

---

### use

▸ **use**(`transformer`: [PluginFn](../modules/_src_contracts_.md#pluginfn), `lifecycle`: "before" | "after"): _this_

Add plugin which can apply transformers to the typescript compiler

**Parameters:**

| Name          | Type                                               |
| ------------- | -------------------------------------------------- |
| `transformer` | [PluginFn](../modules/_src_contracts_.md#pluginfn) |
| `lifecycle`   | "before" &#124; "after"                            |

**Returns:** _this_

---

### watcher

▸ **watcher**(`options`: tsStatic.ParsedCommandLine): _[Watcher](_src_watcher_.watcher.md)‹›_

Get watcher instance

**Parameters:**

| Name      | Type                       |
| --------- | -------------------------- |
| `options` | tsStatic.ParsedCommandLine |

**Returns:** _[Watcher](_src_watcher_.watcher.md)‹›_
