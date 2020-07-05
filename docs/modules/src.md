[@poppinss/chokidar-ts](../README.md) › [src](src.md)

# Module: src

## Index

### Classes

- [Builder](../classes/src.builder.md)
- [ConfigParser](../classes/src.configparser.md)
- [DiagnosticsStore](../classes/src.diagnosticsstore.md)
- [ModuleResolver](../classes/src.moduleresolver.md)
- [PluginManager](../classes/src.pluginmanager.md)
- [ReferenceTree](../classes/src.referencetree.md)
- [SourceFilesManager](../classes/src.sourcefilesmanager.md)
- [TypescriptCompiler](../classes/src.typescriptcompiler.md)
- [Watcher](../classes/src.watcher.md)

### Type aliases

- [ImportReferenceNode](src.md#importreferencenode)
- [PluginFn](src.md#pluginfn)
- [SourceFilesManagerOptions](src.md#sourcefilesmanageroptions)
- [WatcherEvents](src.md#watcherevents)

## Type aliases

### ImportReferenceNode

Ƭ **ImportReferenceNode**: _object_

Shape of an import reference. The version is required to
find between stale dependencies without running
unnecessary loops

#### Type declaration:

- **modulePath**: _string_

- **version**: _number_

---

### PluginFn

Ƭ **PluginFn**: _function_

Shape of Plugin function

#### Type declaration:

▸ (`ts`: typeof tsStatic, `config`: tsStatic.CompilerOptions): _tsStatic.TransformerFactory‹tsStatic.SourceFile› | tsStatic.CustomTransformerFactory_

**Parameters:**

| Name     | Type                     |
| -------- | ------------------------ |
| `ts`     | typeof tsStatic          |
| `config` | tsStatic.CompilerOptions |

---

### SourceFilesManagerOptions

Ƭ **SourceFilesManagerOptions**: _object_

Options accepted by source files manager

#### Type declaration:

- **excludes**? : _string[]_

- **files**: _string[]_

- **includes**? : _string[]_

---

### WatcherEvents

Ƭ **WatcherEvents**: _object_

Events emitted by the watcher

#### Type declaration:

- **add**: _string_

- **change**: _string_

- **source:unlink**: _string_

- **subsequent:build**(): _object_

  - **diagnostics**: _tsStatic.Diagnostic[]_

  - **path**: _string_

  - **skipped**: _boolean_

- **unlink**: _string_
