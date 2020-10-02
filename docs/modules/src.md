**[@poppinss/chokidar-ts](../README.md)**

> [Globals](../README.md) / src

# Module: src

## Index

### Classes

* [Builder](../classes/src.builder.md)
* [ConfigParser](../classes/src.configparser.md)
* [DiagnosticsStore](../classes/src.diagnosticsstore.md)
* [LspWatcher](../classes/src.lspwatcher.md)
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

### ImportReferenceNode

Ƭ  **ImportReferenceNode**: { modulePath: string ; version: number  }

Shape of an import reference. The version is required to
find between stale dependencies without running
unnecessary loops

#### Type declaration:

Name | Type |
------ | ------ |
`modulePath` | string |
`version` | number |

___

### PluginFn

Ƭ  **PluginFn**: (ts: *typeof* tsStatic,config: tsStatic.CompilerOptions) => tsStatic.TransformerFactory\<tsStatic.SourceFile> \| tsStatic.CustomTransformerFactory

Shape of Plugin function

___

### SourceFilesManagerOptions

Ƭ  **SourceFilesManagerOptions**: { excludes?: string[] ; files: string[] ; includes?: string[]  }

Options accepted by source files manager

#### Type declaration:

Name | Type |
------ | ------ |
`excludes?` | string[] |
`files` | string[] |
`includes?` | string[] |

___

### WatcherEvents

Ƭ  **WatcherEvents**: { add: { absPath: string ; relativePath: string  } ; change: { absPath: string ; relativePath: string  } ; source:add: { absPath: string ; relativePath: string  } ; source:change: { absPath: string ; relativePath: string  } ; source:unlink: { absPath: string ; relativePath: string  } ; subsequent:build: { absPath: string ; diagnostics: tsStatic.Diagnostic[] ; relativePath: string ; skipped: boolean  } ; unlink: { absPath: string ; relativePath: string  }  }

Events emitted by the watcher

#### Type declaration:

Name | Type |
------ | ------ |
`add` | { absPath: string ; relativePath: string  } |
`change` | { absPath: string ; relativePath: string  } |
`source:add` | { absPath: string ; relativePath: string  } |
`source:change` | { absPath: string ; relativePath: string  } |
`source:unlink` | { absPath: string ; relativePath: string  } |
`subsequent:build` | { absPath: string ; diagnostics: tsStatic.Diagnostic[] ; relativePath: string ; skipped: boolean  } |
`unlink` | { absPath: string ; relativePath: string  } |
