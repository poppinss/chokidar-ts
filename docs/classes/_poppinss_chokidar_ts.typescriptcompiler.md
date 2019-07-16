> **[@poppinss/chokidar-ts](../README.md)**

[Globals](../README.md) / [@poppinss/chokidar-ts](../modules/_poppinss_chokidar_ts.md) / [TypescriptCompiler](_poppinss_chokidar_ts.typescriptcompiler.md) /

# Class: TypescriptCompiler

Exposes the API to compile Typescript projects and watch for file changes
along with other files than the source typescript files.

## Hierarchy

* `EventEmitter`

  * **TypescriptCompiler**

### Index

#### Constructors

* [constructor](_poppinss_chokidar_ts.typescriptcompiler.md#constructor)

#### Properties

* [watcher](_poppinss_chokidar_ts.typescriptcompiler.md#optional-watcher)
* [defaultMaxListeners](_poppinss_chokidar_ts.typescriptcompiler.md#static-defaultmaxlisteners)

#### Methods

* [addListener](_poppinss_chokidar_ts.typescriptcompiler.md#addlistener)
* [build](_poppinss_chokidar_ts.typescriptcompiler.md#build)
* [emit](_poppinss_chokidar_ts.typescriptcompiler.md#emit)
* [eventNames](_poppinss_chokidar_ts.typescriptcompiler.md#eventnames)
* [getMaxListeners](_poppinss_chokidar_ts.typescriptcompiler.md#getmaxlisteners)
* [listenerCount](_poppinss_chokidar_ts.typescriptcompiler.md#listenercount)
* [listeners](_poppinss_chokidar_ts.typescriptcompiler.md#listeners)
* [off](_poppinss_chokidar_ts.typescriptcompiler.md#off)
* [on](_poppinss_chokidar_ts.typescriptcompiler.md#on)
* [once](_poppinss_chokidar_ts.typescriptcompiler.md#once)
* [parseConfig](_poppinss_chokidar_ts.typescriptcompiler.md#parseconfig)
* [prependListener](_poppinss_chokidar_ts.typescriptcompiler.md#prependlistener)
* [prependOnceListener](_poppinss_chokidar_ts.typescriptcompiler.md#prependoncelistener)
* [rawListeners](_poppinss_chokidar_ts.typescriptcompiler.md#rawlisteners)
* [removeAllListeners](_poppinss_chokidar_ts.typescriptcompiler.md#removealllisteners)
* [removeListener](_poppinss_chokidar_ts.typescriptcompiler.md#removelistener)
* [setMaxListeners](_poppinss_chokidar_ts.typescriptcompiler.md#setmaxlisteners)
* [use](_poppinss_chokidar_ts.typescriptcompiler.md#use)
* [watch](_poppinss_chokidar_ts.typescriptcompiler.md#watch)
* [listenerCount](_poppinss_chokidar_ts.typescriptcompiler.md#static-listenercount)

## Constructors

###  constructor

\+ **new TypescriptCompiler**(`_ts`: `ts`, `_configPath`: string, `_cwd`: string): *[TypescriptCompiler](_poppinss_chokidar_ts.typescriptcompiler.md)*

**Parameters:**

Name | Type |
------ | ------ |
`_ts` | `ts` |
`_configPath` | string |
`_cwd` | string |

**Returns:** *[TypescriptCompiler](_poppinss_chokidar_ts.typescriptcompiler.md)*

## Properties

### `Optional` watcher

• **watcher**? : *`chokidar.FSWatcher`*

Only created when `watch` method is invoked

___

### `Static` defaultMaxListeners

▪ **defaultMaxListeners**: *number*

*Inherited from void*

## Methods

###  addListener

▸ **addListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  build

▸ **build**(`parsedConfig`: `tsStatic.ParsedCommandLine`): *boolean*

Build typescript project

**Parameters:**

Name | Type |
------ | ------ |
`parsedConfig` | `tsStatic.ParsedCommandLine` |

**Returns:** *boolean*

___

###  emit

▸ **emit**(`event`: string | symbol, ...`args`: any[]): *boolean*

*Inherited from void*

*Overrides void*

**Parameters:**

Name | Type |
------ | ------ |
`event` | string \| symbol |
`...args` | any[] |

**Returns:** *boolean*

___

###  eventNames

▸ **eventNames**(): *`Array<string | symbol>`*

*Inherited from void*

*Overrides void*

**Returns:** *`Array<string | symbol>`*

___

###  getMaxListeners

▸ **getMaxListeners**(): *number*

*Inherited from void*

*Overrides void*

**Returns:** *number*

___

###  listenerCount

▸ **listenerCount**(`type`: string | symbol): *number*

*Inherited from void*

*Overrides void*

**Parameters:**

Name | Type |
------ | ------ |
`type` | string \| symbol |

**Returns:** *number*

___

###  listeners

▸ **listeners**(`event`: string | symbol): *`Function`[]*

*Inherited from void*

*Overrides void*

**Parameters:**

Name | Type |
------ | ------ |
`event` | string \| symbol |

**Returns:** *`Function`[]*

___

###  off

▸ **off**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  on

▸ **on**(`event`: "watcher:ready", `cb`: function): *this*

*Overrides void*

**Parameters:**

▪ **event**: *"watcher:ready"*

▪ **cb**: *function*

▸ (): *void*

**Returns:** *this*

▸ **on**(`event`: "add", `cb`: function): *this*

*Overrides void*

**Parameters:**

▪ **event**: *"add"*

▪ **cb**: *function*

▸ (`filePath`: string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`filePath` | string |

**Returns:** *this*

▸ **on**(`event`: "change", `cb`: function): *this*

*Overrides void*

**Parameters:**

▪ **event**: *"change"*

▪ **cb**: *function*

▸ (`filePath`: string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`filePath` | string |

**Returns:** *this*

▸ **on**(`event`: "unlink", `cb`: function): *this*

*Overrides void*

**Parameters:**

▪ **event**: *"unlink"*

▪ **cb**: *function*

▸ (`filePath`: string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`filePath` | string |

**Returns:** *this*

▸ **on**(`event`: "config:error", `cb`: function): *this*

*Overrides void*

**Parameters:**

▪ **event**: *"config:error"*

▪ **cb**: *function*

▸ (`error`: `tsStatic.Diagnostic`): *void*

**Parameters:**

Name | Type |
------ | ------ |
`error` | `tsStatic.Diagnostic` |

**Returns:** *this*

▸ **on**(`event`: "config:success", `cb`: function): *this*

*Overrides void*

**Parameters:**

▪ **event**: *"config:success"*

▪ **cb**: *function*

▸ (`config`: `tsStatic.ParsedCommandLine`): *void*

**Parameters:**

Name | Type |
------ | ------ |
`config` | `tsStatic.ParsedCommandLine` |

**Returns:** *this*

▸ **on**(`event`: "initial:build", `cb`: function): *this*

*Overrides void*

**Parameters:**

▪ **event**: *"initial:build"*

▪ **cb**: *function*

▸ (`hasError`: boolean, `diagnostics`: `tsStatic.Diagnostic`[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`hasError` | boolean |
`diagnostics` | `tsStatic.Diagnostic`[] |

**Returns:** *this*

▸ **on**(`event`: "subsequent:build", `cb`: function): *this*

*Overrides void*

**Parameters:**

▪ **event**: *"subsequent:build"*

▪ **cb**: *function*

▸ (`hasError`: boolean, `diagnostics`: `tsStatic.Diagnostic`[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`hasError` | boolean |
`diagnostics` | `tsStatic.Diagnostic`[] |

**Returns:** *this*

▸ **on**(`event`: string, `cb`: any): *this*

*Overrides void*

**Parameters:**

Name | Type |
------ | ------ |
`event` | string |
`cb` | any |

**Returns:** *this*

___

###  once

▸ **once**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  parseConfig

▸ **parseConfig**(`compileOptionsToExtend?`: `tsStatic.CompilerOptions`): *object*

Parses and returns the config. Also an event will be
emitted when config has errors.

**Parameters:**

Name | Type |
------ | ------ |
`compileOptionsToExtend?` | `tsStatic.CompilerOptions` |

**Returns:** *object*

___

###  prependListener

▸ **prependListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  prependOnceListener

▸ **prependOnceListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  rawListeners

▸ **rawListeners**(`event`: string | symbol): *`Function`[]*

*Inherited from void*

*Overrides void*

**Parameters:**

Name | Type |
------ | ------ |
`event` | string \| symbol |

**Returns:** *`Function`[]*

___

###  removeAllListeners

▸ **removeAllListeners**(`event?`: string | symbol): *this*

*Inherited from void*

*Overrides void*

**Parameters:**

Name | Type |
------ | ------ |
`event?` | string \| symbol |

**Returns:** *this*

___

###  removeListener

▸ **removeListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  setMaxListeners

▸ **setMaxListeners**(`n`: number): *this*

*Inherited from void*

*Overrides void*

**Parameters:**

Name | Type |
------ | ------ |
`n` | number |

**Returns:** *this*

___

###  use

▸ **use**(`transformer`: `PluginFn`, `lifecycle`: "before" | "after"): *this*

Hook plugin to define custom transformers

**Parameters:**

Name | Type |
------ | ------ |
`transformer` | `PluginFn` |
`lifecycle` | "before" \| "after" |

**Returns:** *this*

___

###  watch

▸ **watch**(`parsedConfig`: `tsStatic.ParsedCommandLine`, `watchPattern`: string | string[], `options?`: `chokidar.WatchOptions`): *void*

Build the initial project and then start watcher

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`parsedConfig` | `tsStatic.ParsedCommandLine` | - |
`watchPattern` | string \| string[] |  ['.'] |
`options?` | `chokidar.WatchOptions` | - |

**Returns:** *void*

___

### `Static` listenerCount

▸ **listenerCount**(`emitter`: `EventEmitter`, `event`: string | symbol): *number*

*Inherited from void*

**`deprecated`** since v4.0.0

**Parameters:**

Name | Type |
------ | ------ |
`emitter` | `EventEmitter` |
`event` | string \| symbol |

**Returns:** *number*