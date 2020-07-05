[@poppinss/chokidar-ts](../README.md) › [src](../modules/src.md) › [ModuleResolver](src.moduleresolver.md)

# Class: ModuleResolver

Wraps the typescript compiler `nodeModuleNameResolver` to ignore the
native modules and dependencies. Since, we need module resolver
to report type errors, we do not type check node_modules when
they are changed during the watch mode.

## Hierarchy

- **ModuleResolver**

## Index

### Constructors

- [constructor](src.moduleresolver.md#constructor)

### Methods

- [addAmbientModules](src.moduleresolver.md#addambientmodules)
- [resolve](src.moduleresolver.md#resolve)

## Constructors

### constructor

\+ **new ModuleResolver**(`ts`: typeof tsStatic, `compilerOptions`: tsStatic.CompilerOptions): _[ModuleResolver](src.moduleresolver.md)_

**Parameters:**

| Name              | Type                     |
| ----------------- | ------------------------ |
| `ts`              | typeof tsStatic          |
| `compilerOptions` | tsStatic.CompilerOptions |

**Returns:** _[ModuleResolver](src.moduleresolver.md)_

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
