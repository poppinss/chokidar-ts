[@poppinss/chokidar-ts](../README.md) › ["src/Contracts"](_src_contracts_.md)

# Module: "src/Contracts"

## Index

### Type aliases

* [ImportReferenceNode](_src_contracts_.md#importreferencenode)
* [PluginFn](_src_contracts_.md#pluginfn)
* [SourceFilesManagerOptions](_src_contracts_.md#sourcefilesmanageroptions)
* [WatcherEvents](_src_contracts_.md#watcherevents)

## Type aliases

###  ImportReferenceNode

Ƭ **ImportReferenceNode**: *object*

Shape of an import reference. The version is required to
find between stale dependencies without running
unnecessary loops

#### Type declaration:

* **modulePath**: *string*

* **version**: *number*

___

###  PluginFn

Ƭ **PluginFn**: *function*

Shape of Plugin function

#### Type declaration:

▸ (`ts`: typeof tsStatic, `config`: tsStatic.CompilerOptions): *tsStatic.TransformerFactory‹tsStatic.SourceFile› | tsStatic.CustomTransformerFactory*

**Parameters:**

Name | Type |
------ | ------ |
`ts` | typeof tsStatic |
`config` | tsStatic.CompilerOptions |

___

###  SourceFilesManagerOptions

Ƭ **SourceFilesManagerOptions**: *object*

Options accepted by source files manager

#### Type declaration:

* **excludes**? : *string[]*

* **files**: *string[]*

* **includes**? : *string[]*

___

###  WatcherEvents

Ƭ **WatcherEvents**: *object*

Events emitted by the watcher

#### Type declaration:

* **add**: *string*

* **change**: *string*

* **source:unlink**: *string*

* **subsequent:build**(): *object*

  * **diagnostics**: *tsStatic.Diagnostic[]*

  * **path**: *string*

  * **skipped**: *boolean*

* **unlink**: *string*
