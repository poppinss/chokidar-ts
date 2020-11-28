**[@poppinss/chokidar-ts](../README.md)**

> [Globals](../README.md) / "src/Contracts"

# Module: "src/Contracts"

## Index

### Type aliases

* [ImportReferenceNode](_src_contracts_.md#importreferencenode)
* [PluginFn](_src_contracts_.md#pluginfn)
* [SourceFilesManagerOptions](_src_contracts_.md#sourcefilesmanageroptions)
* [WatcherEvents](_src_contracts_.md#watcherevents)

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

Ƭ  **PluginFn**: (ts: *typeof* tsStatic, config: tsStatic.CompilerOptions) => tsStatic.TransformerFactory\<tsStatic.SourceFile> \| tsStatic.CustomTransformerFactory

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
