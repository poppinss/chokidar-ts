[@poppinss/chokidar-ts](../README.md) › ["src/ModuleResolver"](../modules/_src_moduleresolver_.md) › [ModuleResolver](_src_moduleresolver_.moduleresolver.md)

# Class: ModuleResolver

Wraps the typescript compiler `nodeModuleNameResolver` to ignore the
native modules and dependencies. Since, we need module resolver
to report type errors, we do not type check node_modules when
they are changed during the watch mode.

## Hierarchy

- **ModuleResolver**

## Index

### Constructors

- [constructor](_src_moduleresolver_.moduleresolver.md#constructor)

### Methods

- [addAmbientModules](_src_moduleresolver_.moduleresolver.md#addambientmodules)
- [resolve](_src_moduleresolver_.moduleresolver.md#resolve)

## Constructors

### constructor

\+ **new ModuleResolver**(`ts`: typeof tsStatic, `compilerOptions`: tsStatic.CompilerOptions): _[ModuleResolver](_src_moduleresolver_.moduleresolver.md)_

**Parameters:**

| Name              | Type                     |
| ----------------- | ------------------------ |
| `ts`              | typeof tsStatic          |
| `compilerOptions` | tsStatic.CompilerOptions |

**Returns:** _[ModuleResolver](_src_moduleresolver_.moduleresolver.md)_

## Methods

### addAmbientModules

▸ **addAmbientModules**(`filePath`: string, `ambientModules`: string[]): _void_

Track ambient module

**Parameters:**

| Name             | Type     |
| ---------------- | -------- |
| `filePath`       | string   |
| `ambientModules` | string[] |

**Returns:** _void_

---

### resolve

▸ **resolve**(`importPath`: string, `modulePath`: string): _null | string_

Returns the resolved module path

**Parameters:**

| Name         | Type   |
| ------------ | ------ |
| `importPath` | string |
| `modulePath` | string |

**Returns:** _null | string_
