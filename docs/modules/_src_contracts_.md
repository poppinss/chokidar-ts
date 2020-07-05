[@poppinss/chokidar-ts](../README.md) › ["src/Contracts"](_src_contracts_.md)

# Module: "src/Contracts"

## Index

### Type aliases

- [ImportReferenceNode](_src_contracts_.md#importreferencenode)
- [PluginFn](_src_contracts_.md#pluginfn)
- [SourceFilesManagerOptions](_src_contracts_.md#sourcefilesmanageroptions)
- [WatcherEvents](_src_contracts_.md#watcherevents)

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
