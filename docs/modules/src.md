[@poppinss/chokidar-ts](../README.md) › [src](src.md)

# Module: src

## Index

### Classes

* [Builder](../classes/src.builder.md)
* [ConfigParser](../classes/src.configparser.md)
* [DiagnosticsStore](../classes/src.diagnosticsstore.md)
* [ModuleResolver](../classes/src.moduleresolver.md)
* [PluginManager](../classes/src.pluginmanager.md)
* [ReferenceTree](../classes/src.referencetree.md)
* [SourceFilesManager](../classes/src.sourcefilesmanager.md)
* [TypescriptCompiler](../classes/src.typescriptcompiler.md)
* [Watcher](../classes/src.watcher.md)

### Type aliases

* [ImportReferenceNode](src.md#importreferencenode)
* [PluginFn](src.md#pluginfn)
* [SourceFilesManagerOptions](src.md#sourcefilesmanageroptions)
* [WatcherEvents](src.md#watcherevents)

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
