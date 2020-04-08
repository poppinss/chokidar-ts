[@poppinss/chokidar-ts](../README.md) › ["src/Watcher"](../modules/_src_watcher_.md) › [Watcher](_src_watcher_.watcher.md)

# Class: Watcher

Exposes the API to build the typescript project and then watch it
for changes.

## Hierarchy

* Typed‹[WatcherEvents](../modules/_src_contracts_.md#watcherevents), "watcher:ready"›

  ↳ **Watcher**

## Index

### Constructors

* [constructor](_src_watcher_.watcher.md#constructor)

### Properties

* [chokidar](_src_watcher_.watcher.md#chokidar)
* [compilerOptions](_src_watcher_.watcher.md#optional-compileroptions)
* [host](_src_watcher_.watcher.md#host)
* [program](_src_watcher_.watcher.md#program)
* [listenerAdded](_src_watcher_.watcher.md#static-listeneradded)
* [listenerRemoved](_src_watcher_.watcher.md#static-listenerremoved)

### Methods

* [anyEvent](_src_watcher_.watcher.md#anyevent)
* [bindMethods](_src_watcher_.watcher.md#bindmethods)
* [clearListeners](_src_watcher_.watcher.md#clearlisteners)
* [emit](_src_watcher_.watcher.md#emit)
* [emitSerial](_src_watcher_.watcher.md#emitserial)
* [events](_src_watcher_.watcher.md#events)
* [listenerCount](_src_watcher_.watcher.md#listenercount)
* [off](_src_watcher_.watcher.md#off)
* [offAny](_src_watcher_.watcher.md#offany)
* [on](_src_watcher_.watcher.md#on)
* [onAny](_src_watcher_.watcher.md#onany)
* [once](_src_watcher_.watcher.md#once)
* [watch](_src_watcher_.watcher.md#watch)
* [mixin](_src_watcher_.watcher.md#static-mixin)

## Constructors

###  constructor

\+ **new Watcher**(`cwd`: string, `ts`: typeof tsStatic, `config`: tsStatic.ParsedCommandLine, `pluginManager`: [PluginManager](_src_pluginmanager_.pluginmanager.md)): *[Watcher](_src_watcher_.watcher.md)*

**Parameters:**

Name | Type |
------ | ------ |
`cwd` | string |
`ts` | typeof tsStatic |
`config` | tsStatic.ParsedCommandLine |
`pluginManager` | [PluginManager](_src_pluginmanager_.pluginmanager.md) |

**Returns:** *[Watcher](_src_watcher_.watcher.md)*

## Properties

###  chokidar

• **chokidar**: *FSWatcher*

___

### `Optional` compilerOptions

• **compilerOptions**? : *tsStatic.CompilerOptions*

___

###  host

• **host**: *tsStatic.CompilerHost*

___

###  program

• **program**: *tsStatic.Program*

___

### `Static` listenerAdded

▪ **listenerAdded**: *keyof symbol*

*Inherited from [Watcher](_src_watcher_.watcher.md).[listenerAdded](_src_watcher_.watcher.md#static-listeneradded)*

Fires when an event listener was added.

An object with `listener` and `eventName` (if `on` or `off` was used) is provided as event data.

**`example`** 
```
import Emittery = require('emittery');

const emitter = new Emittery();

emitter.on(Emittery.listenerAdded, ({listener, eventName}) => {
console.log(listener);
//=> data => {}

console.log(eventName);
//=> '🦄'
});

emitter.on('🦄', data => {
// Handle data
});
```

___

### `Static` listenerRemoved

▪ **listenerRemoved**: *keyof symbol*

*Inherited from [Watcher](_src_watcher_.watcher.md).[listenerRemoved](_src_watcher_.watcher.md#static-listenerremoved)*

Fires when an event listener was removed.

An object with `listener` and `eventName` (if `on` or `off` was used) is provided as event data.

**`example`** 
```
import Emittery = require('emittery');

const emitter = new Emittery();

const off = emitter.on('🦄', data => {
// Handle data
});

emitter.on(Emittery.listenerRemoved, ({listener, eventName}) => {
console.log(listener);
//=> data => {}

console.log(eventName);
//=> '🦄'
});

off();
```

## Methods

###  anyEvent

▸ **anyEvent**(): *AsyncIterableIterator‹[EventNameFromDataMap‹[WatcherEvents](../modules/_src_contracts_.md#watcherevents)›, WatcherEvents[EventNameFromDataMap<WatcherEvents>]]›*

*Inherited from [Watcher](_src_watcher_.watcher.md).[anyEvent](_src_watcher_.watcher.md#anyevent)*

*Overrides void*

**Returns:** *AsyncIterableIterator‹[EventNameFromDataMap‹[WatcherEvents](../modules/_src_contracts_.md#watcherevents)›, WatcherEvents[EventNameFromDataMap<WatcherEvents>]]›*

___

###  bindMethods

▸ **bindMethods**(`target`: object, `methodNames?`: keyof string[]): *void*

*Inherited from [Watcher](_src_watcher_.watcher.md).[bindMethods](_src_watcher_.watcher.md#bindmethods)*

Bind the given `methodNames`, or all `Emittery` methods if `methodNames` is not defined, into the `target` object.

**`example`** 
```
import Emittery = require('emittery');

const object = {};

new Emittery().bindMethods(object);

object.emit('event');
```

**Parameters:**

Name | Type |
------ | ------ |
`target` | object |
`methodNames?` | keyof string[] |

**Returns:** *void*

___

###  clearListeners

▸ **clearListeners**(`eventName?`: EventName): *void*

*Inherited from [Watcher](_src_watcher_.watcher.md).[clearListeners](_src_watcher_.watcher.md#clearlisteners)*

Clear all event listeners on the instance.

If `eventName` is given, only the listeners for that event are cleared.

**Parameters:**

Name | Type |
------ | ------ |
`eventName?` | EventName |

**Returns:** *void*

___

###  emit

▸ **emit**<**Name**>(`eventName`: Name, `eventData`: WatcherEvents[Name]): *Promise‹void›*

*Inherited from [Watcher](_src_watcher_.watcher.md).[emit](_src_watcher_.watcher.md#emit)*

*Overrides void*

**Type parameters:**

▪ **Name**: *EventNameFromDataMap‹[WatcherEvents](../modules/_src_contracts_.md#watcherevents)›*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | Name |
`eventData` | WatcherEvents[Name] |

**Returns:** *Promise‹void›*

▸ **emit**<**Name**>(`eventName`: Name): *Promise‹void›*

*Inherited from [Watcher](_src_watcher_.watcher.md).[emit](_src_watcher_.watcher.md#emit)*

*Overrides void*

**Type parameters:**

▪ **Name**: *"watcher:ready"*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | Name |

**Returns:** *Promise‹void›*

___

###  emitSerial

▸ **emitSerial**<**Name**>(`eventName`: Name, `eventData`: WatcherEvents[Name]): *Promise‹void›*

*Inherited from [Watcher](_src_watcher_.watcher.md).[emitSerial](_src_watcher_.watcher.md#emitserial)*

*Overrides void*

**Type parameters:**

▪ **Name**: *EventNameFromDataMap‹[WatcherEvents](../modules/_src_contracts_.md#watcherevents)›*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | Name |
`eventData` | WatcherEvents[Name] |

**Returns:** *Promise‹void›*

▸ **emitSerial**<**Name**>(`eventName`: Name): *Promise‹void›*

*Inherited from [Watcher](_src_watcher_.watcher.md).[emitSerial](_src_watcher_.watcher.md#emitserial)*

*Overrides void*

**Type parameters:**

▪ **Name**: *"watcher:ready"*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | Name |

**Returns:** *Promise‹void›*

___

###  events

▸ **events**<**Name**>(`eventName`: Name): *AsyncIterableIterator‹WatcherEvents[Name]›*

*Inherited from [Watcher](_src_watcher_.watcher.md).[events](_src_watcher_.watcher.md#events)*

*Overrides void*

**Type parameters:**

▪ **Name**: *EventNameFromDataMap‹[WatcherEvents](../modules/_src_contracts_.md#watcherevents)›*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | Name |

**Returns:** *AsyncIterableIterator‹WatcherEvents[Name]›*

___

###  listenerCount

▸ **listenerCount**(`eventName?`: EventName): *number*

*Inherited from [Watcher](_src_watcher_.watcher.md).[listenerCount](_src_watcher_.watcher.md#listenercount)*

The number of listeners for the `eventName` or all events if not specified.

**Parameters:**

Name | Type |
------ | ------ |
`eventName?` | EventName |

**Returns:** *number*

___

###  off

▸ **off**<**Name**>(`eventName`: Name, `listener`: function): *void*

*Inherited from [Watcher](_src_watcher_.watcher.md).[off](_src_watcher_.watcher.md#off)*

*Overrides void*

**Type parameters:**

▪ **Name**: *EventNameFromDataMap‹[WatcherEvents](../modules/_src_contracts_.md#watcherevents)›*

**Parameters:**

▪ **eventName**: *Name*

▪ **listener**: *function*

▸ (`eventData`: WatcherEvents[Name]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`eventData` | WatcherEvents[Name] |

**Returns:** *void*

▸ **off**<**Name**>(`eventName`: Name, `listener`: function): *void*

*Inherited from [Watcher](_src_watcher_.watcher.md).[off](_src_watcher_.watcher.md#off)*

*Overrides void*

**Type parameters:**

▪ **Name**: *"watcher:ready"*

**Parameters:**

▪ **eventName**: *Name*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *void*

___

###  offAny

▸ **offAny**(`listener`: function): *void*

*Inherited from [Watcher](_src_watcher_.watcher.md).[offAny](_src_watcher_.watcher.md#offany)*

*Overrides void*

**Parameters:**

▪ **listener**: *function*

▸ (`eventName`: EventNameFromDataMap‹[WatcherEvents](../modules/_src_contracts_.md#watcherevents)› | "watcher:ready", `eventData?`: WatcherEvents[EventNameFromDataMap<WatcherEvents>]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | EventNameFromDataMap‹[WatcherEvents](../modules/_src_contracts_.md#watcherevents)› &#124; "watcher:ready" |
`eventData?` | WatcherEvents[EventNameFromDataMap<WatcherEvents>] |

**Returns:** *void*

___

###  on

▸ **on**<**Name**>(`eventName`: Name, `listener`: function): *Emittery.UnsubscribeFn*

*Inherited from [Watcher](_src_watcher_.watcher.md).[on](_src_watcher_.watcher.md#on)*

*Overrides void*

**Type parameters:**

▪ **Name**: *EventNameFromDataMap‹[WatcherEvents](../modules/_src_contracts_.md#watcherevents)›*

**Parameters:**

▪ **eventName**: *Name*

▪ **listener**: *function*

▸ (`eventData`: WatcherEvents[Name]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`eventData` | WatcherEvents[Name] |

**Returns:** *Emittery.UnsubscribeFn*

▸ **on**<**Name**>(`eventName`: Name, `listener`: function): *Emittery.UnsubscribeFn*

*Inherited from [Watcher](_src_watcher_.watcher.md).[on](_src_watcher_.watcher.md#on)*

*Overrides void*

**Type parameters:**

▪ **Name**: *"watcher:ready"*

**Parameters:**

▪ **eventName**: *Name*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *Emittery.UnsubscribeFn*

___

###  onAny

▸ **onAny**(`listener`: function): *Emittery.UnsubscribeFn*

*Inherited from [Watcher](_src_watcher_.watcher.md).[onAny](_src_watcher_.watcher.md#onany)*

*Overrides void*

**Parameters:**

▪ **listener**: *function*

▸ (`eventName`: EventNameFromDataMap‹[WatcherEvents](../modules/_src_contracts_.md#watcherevents)› | "watcher:ready", `eventData?`: WatcherEvents[EventNameFromDataMap<WatcherEvents>]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | EventNameFromDataMap‹[WatcherEvents](../modules/_src_contracts_.md#watcherevents)› &#124; "watcher:ready" |
`eventData?` | WatcherEvents[EventNameFromDataMap<WatcherEvents>] |

**Returns:** *Emittery.UnsubscribeFn*

___

###  once

▸ **once**<**Name**>(`eventName`: Name): *Promise‹WatcherEvents[Name]›*

*Inherited from [Watcher](_src_watcher_.watcher.md).[once](_src_watcher_.watcher.md#once)*

*Overrides void*

**Type parameters:**

▪ **Name**: *EventNameFromDataMap‹[WatcherEvents](../modules/_src_contracts_.md#watcherevents)›*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | Name |

**Returns:** *Promise‹WatcherEvents[Name]›*

▸ **once**<**Name**>(`eventName`: Name): *Promise‹void›*

*Inherited from [Watcher](_src_watcher_.watcher.md).[once](_src_watcher_.watcher.md#once)*

*Overrides void*

**Type parameters:**

▪ **Name**: *"watcher:ready"*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | Name |

**Returns:** *Promise‹void›*

___

###  watch

▸ **watch**(`watchPattern`: string | string[], `watcherOptions?`: chokidar.WatchOptions): *object*

Build and watch project for changes

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`watchPattern` | string &#124; string[] | ['.'] |
`watcherOptions?` | chokidar.WatchOptions | - |

**Returns:** *object*

* **diagnostics**: *Diagnostic[]*

* **skipped**: *boolean* = result.emitSkipped

___

### `Static` mixin

▸ **mixin**(`emitteryPropertyName`: string, `methodNames?`: keyof string[]): *Function*

*Inherited from [Watcher](_src_watcher_.watcher.md).[mixin](_src_watcher_.watcher.md#static-mixin)*

In TypeScript, it returns a decorator which mixins `Emittery` as property `emitteryPropertyName` and `methodNames`, or all `Emittery` methods if `methodNames` is not defined, into the target class.

**`example`** 
```
import Emittery = require('emittery');

@Emittery.mixin('emittery')
class MyClass {}

const instance = new MyClass();

instance.emit('event');
```

**Parameters:**

Name | Type |
------ | ------ |
`emitteryPropertyName` | string |
`methodNames?` | keyof string[] |

**Returns:** *Function*
