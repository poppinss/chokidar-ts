[@poppinss/chokidar-ts](../README.md) › [src](../modules/src.md) › [TypescriptCompiler](src.typescriptcompiler.md)

# Class: TypescriptCompiler

Typescript compiler exposes the API to build, watch or parse
the typescript config file.

## Hierarchy

- **TypescriptCompiler**

## Index

### Constructors

- [constructor](src.typescriptcompiler.md#constructor)

### Properties

- [ts](src.typescriptcompiler.md#ts)

### Methods

- [builder](src.typescriptcompiler.md#builder)
- [configParser](src.typescriptcompiler.md#configparser)
- [use](src.typescriptcompiler.md#use)
- [watcher](src.typescriptcompiler.md#watcher)

## Constructors

### constructor

\+ **new TypescriptCompiler**(`cwd`: string, `configFileName`: string, `ts`: typeof tsStatic): _[TypescriptCompiler](src.typescriptcompiler.md)_

**Parameters:**

| Name             | Type            |
| ---------------- | --------------- |
| `cwd`            | string          |
| `configFileName` | string          |
| `ts`             | typeof tsStatic |

**Returns:** _[TypescriptCompiler](src.typescriptcompiler.md)_

## Properties

### ts

• **ts**: _typeof tsStatic_

## Methods

### builder

▸ **builder**(`options`: tsStatic.ParsedCommandLine): _[Builder](src.builder.md)‹›_

Get builder instance

**Parameters:**

| Name      | Type                       |
| --------- | -------------------------- |
| `options` | tsStatic.ParsedCommandLine |

**Returns:** _[Builder](src.builder.md)‹›_

---

### configParser

▸ **configParser**(): _[ConfigParser](src.configparser.md)‹›_

Get config parser instance

**Returns:** _[ConfigParser](src.configparser.md)‹›_

---

### use

▸ **use**(`transformer`: [PluginFn](../modules/src.md#pluginfn), `lifecycle`: "before" | "after"): _this_

Add plugin which can apply transformers to the typescript compiler

**Parameters:**

| Name          | Type                                   |
| ------------- | -------------------------------------- |
| `transformer` | [PluginFn](../modules/src.md#pluginfn) |
| `lifecycle`   | "before" &#124; "after"                |

**Returns:** _this_

---

### watcher

▸ **watcher**(`options`: tsStatic.ParsedCommandLine): _[Watcher](src.watcher.md)‹›_

Get watcher instance

**Parameters:**

| Name      | Type                       |
| --------- | -------------------------- |
| `options` | tsStatic.ParsedCommandLine |

**Returns:** _[Watcher](src.watcher.md)‹›_
