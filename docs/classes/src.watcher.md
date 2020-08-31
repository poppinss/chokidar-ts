[@poppinss/chokidar-ts](../README.md) › [src](../modules/src.md) › [Watcher](src.watcher.md)

# Class: Watcher

Exposes the API to build the typescript project and then watch it
for changes.

## Hierarchy

* Typed‹[WatcherEvents](../modules/src.md#watcherevents), "watcher:ready"›

  ↳ **Watcher**

## Index

### Constructors

* [constructor](src.watcher.md#constructor)

### Properties

* [chokidar](src.watcher.md#chokidar)
* [compilerOptions](src.watcher.md#optional-compileroptions)
* [host](src.watcher.md#host)
* [program](src.watcher.md#program)
* [listenerAdded](src.watcher.md#static-readonly-listeneradded)
* [listenerRemoved](src.watcher.md#static-readonly-listenerremoved)

### Methods

* [anyEvent](src.watcher.md#anyevent)
* [bindMethods](src.watcher.md#bindmethods)
* [clearListeners](src.watcher.md#clearlisteners)
* [emit](src.watcher.md#emit)
* [emitSerial](src.watcher.md#emitserial)
* [events](src.watcher.md#events)
* [listenerCount](src.watcher.md#listenercount)
* [off](src.watcher.md#off)
* [offAny](src.watcher.md#offany)
* [on](src.watcher.md#on)
* [onAny](src.watcher.md#onany)
* [once](src.watcher.md#once)
* [watch](src.watcher.md#watch)
* [mixin](src.watcher.md#static-mixin)

## Constructors

###  constructor

\+ **new Watcher**(`cwd`: string, `ts`: typeof tsStatic, `config`: tsStatic.ParsedCommandLine, `pluginManager`: [PluginManager](src.pluginmanager.md)): *[Watcher](src.watcher.md)*

**Parameters:**

Name | Type |
------ | ------ |
`cwd` | string |
`ts` | typeof tsStatic |
`config` | tsStatic.ParsedCommandLine |
`pluginManager` | [PluginManager](src.pluginmanager.md) |

**Returns:** *[Watcher](src.watcher.md)*

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

### `Static` `Readonly` listenerAdded

▪ **listenerAdded**: *unique symbol*

*Inherited from [Watcher](src.watcher.md).[listenerAdded](src.watcher.md#static-readonly-listeneradded)*

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

### `Static` `Readonly` listenerRemoved

▪ **listenerRemoved**: *unique symbol*

*Inherited from [Watcher](src.watcher.md).[listenerRemoved](src.watcher.md#static-readonly-listenerremoved)*

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

▸ **anyEvent**(): *AsyncIterableIterator‹[EventNameFromDataMap‹[WatcherEvents](../modules/src.md#watcherevents)›, WatcherEvents[EventNameFromDataMap‹WatcherEvents›]]›*

*Inherited from [Watcher](src.watcher.md).[anyEvent](src.watcher.md#anyevent)*

*Overrides void*

**Returns:** *AsyncIterableIterator‹[EventNameFromDataMap‹[WatcherEvents](../modules/src.md#watcherevents)›, WatcherEvents[EventNameFromDataMap‹WatcherEvents›]]›*

___

###  bindMethods

▸ **bindMethods**(`target`: object, `methodNames?`: readonly string[]): *void*

*Inherited from [Watcher](src.watcher.md).[bindMethods](src.watcher.md#bindmethods)*

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
`methodNames?` | readonly string[] |

**Returns:** *void*

___

###  clearListeners

▸ **clearListeners**(`eventName?`: EventNames): *void*

*Inherited from [Watcher](src.watcher.md).[clearListeners](src.watcher.md#clearlisteners)*

Clear all event listeners on the instance.

If `eventName` is given, only the listeners for that event are cleared.

**Parameters:**

Name | Type |
------ | ------ |
`eventName?` | EventNames |

**Returns:** *void*

___

###  emit

▸ **emit**‹**Name**›(`eventName`: Name, `eventData`: WatcherEvents[Name]): *Promise‹void›*

*Inherited from [Watcher](src.watcher.md).[emit](src.watcher.md#emit)*

*Overrides void*

**Type parameters:**

▪ **Name**: *EventNameFromDataMap‹[WatcherEvents](../modules/src.md#watcherevents)›*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | Name |
`eventData` | WatcherEvents[Name] |

**Returns:** *Promise‹void›*

▸ **emit**‹**Name**›(`eventName`: Name): *Promise‹void›*

*Inherited from [Watcher](src.watcher.md).[emit](src.watcher.md#emit)*

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

▸ **emitSerial**‹**Name**›(`eventName`: Name, `eventData`: WatcherEvents[Name]): *Promise‹void›*

*Inherited from [Watcher](src.watcher.md).[emitSerial](src.watcher.md#emitserial)*

*Overrides void*

**Type parameters:**

▪ **Name**: *EventNameFromDataMap‹[WatcherEvents](../modules/src.md#watcherevents)›*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | Name |
`eventData` | WatcherEvents[Name] |

**Returns:** *Promise‹void›*

▸ **emitSerial**‹**Name**›(`eventName`: Name): *Promise‹void›*

*Inherited from [Watcher](src.watcher.md).[emitSerial](src.watcher.md#emitserial)*

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

▸ **events**‹**Name**›(`eventName`: Name): *AsyncIterableIterator‹WatcherEvents[Name]›*

*Inherited from [Watcher](src.watcher.md).[events](src.watcher.md#events)*

*Overrides void*

**Type parameters:**

▪ **Name**: *EventNameFromDataMap‹[WatcherEvents](../modules/src.md#watcherevents)›*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | Name |

**Returns:** *AsyncIterableIterator‹WatcherEvents[Name]›*

___

###  listenerCount

▸ **listenerCount**(`eventName?`: EventNames): *number*

*Inherited from [Watcher](src.watcher.md).[listenerCount](src.watcher.md#listenercount)*

The number of listeners for the `eventName` or all events if not specified.

**Parameters:**

Name | Type |
------ | ------ |
`eventName?` | EventNames |

**Returns:** *number*

___

###  off

▸ **off**‹**Name**›(`eventName`: Name, `listener`: function): *void*

*Inherited from [Watcher](src.watcher.md).[off](src.watcher.md#off)*

*Overrides void*

**Type parameters:**

▪ **Name**: *EventNameFromDataMap‹[WatcherEvents](../modules/src.md#watcherevents)›*

**Parameters:**

▪ **eventName**: *Name*

▪ **listener**: *function*

▸ (`eventData`: WatcherEvents[Name]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`eventData` | WatcherEvents[Name] |

**Returns:** *void*

▸ **off**‹**Name**›(`eventName`: Name, `listener`: function): *void*

*Inherited from [Watcher](src.watcher.md).[off](src.watcher.md#off)*

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

*Inherited from [Watcher](src.watcher.md).[offAny](src.watcher.md#offany)*

*Overrides void*

**Parameters:**

▪ **listener**: *function*

▸ (`eventName`: EventNameFromDataMap‹[WatcherEvents](../modules/src.md#watcherevents)› | "watcher:ready", `eventData?`: WatcherEvents[EventNameFromDataMap‹WatcherEvents›]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | EventNameFromDataMap‹[WatcherEvents](../modules/src.md#watcherevents)› &#124; "watcher:ready" |
`eventData?` | WatcherEvents[EventNameFromDataMap‹WatcherEvents›] |

**Returns:** *void*

___

###  on

▸ **on**‹**Name**›(`eventName`: Name, `listener`: function): *Emittery.UnsubscribeFn*

*Inherited from [Watcher](src.watcher.md).[on](src.watcher.md#on)*

*Overrides void*

**Type parameters:**

▪ **Name**: *EventNameFromDataMap‹[WatcherEvents](../modules/src.md#watcherevents)›*

**Parameters:**

▪ **eventName**: *Name*

▪ **listener**: *function*

▸ (`eventData`: WatcherEvents[Name]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`eventData` | WatcherEvents[Name] |

**Returns:** *Emittery.UnsubscribeFn*

▸ **on**‹**Name**›(`eventName`: Name, `listener`: function): *Emittery.UnsubscribeFn*

*Inherited from [Watcher](src.watcher.md).[on](src.watcher.md#on)*

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

*Inherited from [Watcher](src.watcher.md).[onAny](src.watcher.md#onany)*

*Overrides void*

**Parameters:**

▪ **listener**: *function*

▸ (`eventName`: EventNameFromDataMap‹[WatcherEvents](../modules/src.md#watcherevents)› | "watcher:ready", `eventData?`: WatcherEvents[EventNameFromDataMap‹WatcherEvents›]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | EventNameFromDataMap‹[WatcherEvents](../modules/src.md#watcherevents)› &#124; "watcher:ready" |
`eventData?` | WatcherEvents[EventNameFromDataMap‹WatcherEvents›] |

**Returns:** *Emittery.UnsubscribeFn*

___

###  once

▸ **once**‹**Name**›(`eventName`: Name): *Promise‹WatcherEvents[Name]›*

*Inherited from [Watcher](src.watcher.md).[once](src.watcher.md#once)*

*Overrides void*

**Type parameters:**

▪ **Name**: *EventNameFromDataMap‹[WatcherEvents](../modules/src.md#watcherevents)›*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | Name |

**Returns:** *Promise‹WatcherEvents[Name]›*

▸ **once**‹**Name**›(`eventName`: Name): *Promise‹void›*

*Inherited from [Watcher](src.watcher.md).[once](src.watcher.md#once)*

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

▸ **mixin**(`emitteryPropertyName`: string, `methodNames?`: readonly string[]): *Function*

*Inherited from [Watcher](src.watcher.md).[mixin](src.watcher.md#static-mixin)*

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
`methodNames?` | readonly string[] |

**Returns:** *Function*
