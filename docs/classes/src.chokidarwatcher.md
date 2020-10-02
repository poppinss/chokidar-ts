**[@poppinss/chokidar-ts](../README.md)**

> [Globals](../README.md) / [src](../modules/src.md) / ChokidarWatcher

# Class: ChokidarWatcher

Exposes the API to watch source files using chokidar. Since this module
is anyways used by the assembler, we also expose the chokidar API directly

## Hierarchy

* Typed\<[WatcherEvents](../modules/src.md#watcherevents), \"watcher:ready\">

  ↳ **ChokidarWatcher**

## Index

### Constructors

* [constructor](src.chokidarwatcher.md#constructor)

### Properties

* [chokidar](src.chokidarwatcher.md#chokidar)
* [listenerAdded](src.chokidarwatcher.md#listeneradded)
* [listenerRemoved](src.chokidarwatcher.md#listenerremoved)

### Methods

* [anyEvent](src.chokidarwatcher.md#anyevent)
* [bindMethods](src.chokidarwatcher.md#bindmethods)
* [clearListeners](src.chokidarwatcher.md#clearlisteners)
* [emit](src.chokidarwatcher.md#emit)
* [emitSerial](src.chokidarwatcher.md#emitserial)
* [events](src.chokidarwatcher.md#events)
* [listenerCount](src.chokidarwatcher.md#listenercount)
* [off](src.chokidarwatcher.md#off)
* [offAny](src.chokidarwatcher.md#offany)
* [on](src.chokidarwatcher.md#on)
* [onAny](src.chokidarwatcher.md#onany)
* [once](src.chokidarwatcher.md#once)
* [watch](src.chokidarwatcher.md#watch)
* [mixin](src.chokidarwatcher.md#mixin)

## Constructors

### constructor

\+ **new ChokidarWatcher**(`cwd`: string): [ChokidarWatcher](src.chokidarwatcher.md)

#### Parameters:

Name | Type |
------ | ------ |
`cwd` | string |

**Returns:** [ChokidarWatcher](src.chokidarwatcher.md)

## Properties

### chokidar

•  **chokidar**: FSWatcher

___

### listenerAdded

▪ `Static` `Readonly` **listenerAdded**: unique symbol

*Inherited from [ChokidarWatcher](src.chokidarwatcher.md).[listenerAdded](src.chokidarwatcher.md#listeneradded)*

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

### listenerRemoved

▪ `Static` `Readonly` **listenerRemoved**: unique symbol

*Inherited from [ChokidarWatcher](src.chokidarwatcher.md).[listenerRemoved](src.chokidarwatcher.md#listenerremoved)*

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

### anyEvent

▸ **anyEvent**(): AsyncIterableIterator\<[EventNameFromDataMap\<[WatcherEvents](../modules/src.md#watcherevents)>, WatcherEvents[EventNameFromDataMap\<WatcherEvents>]]>

*Inherited from [ChokidarWatcher](src.chokidarwatcher.md).[anyEvent](src.chokidarwatcher.md#anyevent)*

*Overrides void*

**Returns:** AsyncIterableIterator\<[EventNameFromDataMap\<[WatcherEvents](../modules/src.md#watcherevents)>, WatcherEvents[EventNameFromDataMap\<WatcherEvents>]]>

___

### bindMethods

▸ **bindMethods**(`target`: object, `methodNames?`: readonly string[]): void

*Inherited from [ChokidarWatcher](src.chokidarwatcher.md).[bindMethods](src.chokidarwatcher.md#bindmethods)*

Bind the given `methodNames`, or all `Emittery` methods if `methodNames` is not defined, into the `target` object.

**`example`** 
```
import Emittery = require('emittery');

const object = {};

new Emittery().bindMethods(object);

object.emit('event');
```

#### Parameters:

Name | Type |
------ | ------ |
`target` | object |
`methodNames?` | readonly string[] |

**Returns:** void

___

### clearListeners

▸ **clearListeners**(`eventName?`: EventNames): void

*Inherited from [ChokidarWatcher](src.chokidarwatcher.md).[clearListeners](src.chokidarwatcher.md#clearlisteners)*

Clear all event listeners on the instance.

If `eventName` is given, only the listeners for that event are cleared.

#### Parameters:

Name | Type |
------ | ------ |
`eventName?` | EventNames |

**Returns:** void

___

### emit

▸ **emit**\<Name>(`eventName`: Name, `eventData`: WatcherEvents[Name]): Promise\<void>

*Inherited from [ChokidarWatcher](src.chokidarwatcher.md).[emit](src.chokidarwatcher.md#emit)*

*Overrides void*

#### Type parameters:

Name | Type |
------ | ------ |
`Name` | EventNameFromDataMap\<[WatcherEvents](../modules/src.md#watcherevents)> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | Name |
`eventData` | WatcherEvents[Name] |

**Returns:** Promise\<void>

▸ **emit**\<Name>(`eventName`: Name): Promise\<void>

*Inherited from [ChokidarWatcher](src.chokidarwatcher.md).[emit](src.chokidarwatcher.md#emit)*

*Overrides void*

#### Type parameters:

Name | Type |
------ | ------ |
`Name` | \"watcher:ready\" |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | Name |

**Returns:** Promise\<void>

___

### emitSerial

▸ **emitSerial**\<Name>(`eventName`: Name, `eventData`: WatcherEvents[Name]): Promise\<void>

*Inherited from [ChokidarWatcher](src.chokidarwatcher.md).[emitSerial](src.chokidarwatcher.md#emitserial)*

*Overrides void*

#### Type parameters:

Name | Type |
------ | ------ |
`Name` | EventNameFromDataMap\<[WatcherEvents](../modules/src.md#watcherevents)> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | Name |
`eventData` | WatcherEvents[Name] |

**Returns:** Promise\<void>

▸ **emitSerial**\<Name>(`eventName`: Name): Promise\<void>

*Inherited from [ChokidarWatcher](src.chokidarwatcher.md).[emitSerial](src.chokidarwatcher.md#emitserial)*

*Overrides void*

#### Type parameters:

Name | Type |
------ | ------ |
`Name` | \"watcher:ready\" |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | Name |

**Returns:** Promise\<void>

___

### events

▸ **events**\<Name>(`eventName`: Name): AsyncIterableIterator\<WatcherEvents[Name]>

*Inherited from [ChokidarWatcher](src.chokidarwatcher.md).[events](src.chokidarwatcher.md#events)*

*Overrides void*

#### Type parameters:

Name | Type |
------ | ------ |
`Name` | EventNameFromDataMap\<[WatcherEvents](../modules/src.md#watcherevents)> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | Name |

**Returns:** AsyncIterableIterator\<WatcherEvents[Name]>

___

### listenerCount

▸ **listenerCount**(`eventName?`: EventNames): number

*Inherited from [ChokidarWatcher](src.chokidarwatcher.md).[listenerCount](src.chokidarwatcher.md#listenercount)*

The number of listeners for the `eventName` or all events if not specified.

#### Parameters:

Name | Type |
------ | ------ |
`eventName?` | EventNames |

**Returns:** number

___

### off

▸ **off**\<Name>(`eventName`: Name, `listener`: (eventData: WatcherEvents[Name]) => void): void

*Inherited from [ChokidarWatcher](src.chokidarwatcher.md).[off](src.chokidarwatcher.md#off)*

*Overrides void*

#### Type parameters:

Name | Type |
------ | ------ |
`Name` | EventNameFromDataMap\<[WatcherEvents](../modules/src.md#watcherevents)> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | Name |
`listener` | (eventData: WatcherEvents[Name]) => void |

**Returns:** void

▸ **off**\<Name>(`eventName`: Name, `listener`: () => void): void

*Inherited from [ChokidarWatcher](src.chokidarwatcher.md).[off](src.chokidarwatcher.md#off)*

*Overrides void*

#### Type parameters:

Name | Type |
------ | ------ |
`Name` | \"watcher:ready\" |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | Name |
`listener` | () => void |

**Returns:** void

___

### offAny

▸ **offAny**(`listener`: (eventName: EventNameFromDataMap\<[WatcherEvents](../modules/src.md#watcherevents)> \| \"watcher:ready\",eventData?: WatcherEvents[EventNameFromDataMap\<WatcherEvents>]) => void): void

*Inherited from [ChokidarWatcher](src.chokidarwatcher.md).[offAny](src.chokidarwatcher.md#offany)*

*Overrides void*

#### Parameters:

Name | Type |
------ | ------ |
`listener` | (eventName: EventNameFromDataMap\<[WatcherEvents](../modules/src.md#watcherevents)> \| \"watcher:ready\",eventData?: WatcherEvents[EventNameFromDataMap\<WatcherEvents>]) => void |

**Returns:** void

___

### on

▸ **on**\<Name>(`eventName`: Name, `listener`: (eventData: WatcherEvents[Name]) => void): Emittery.UnsubscribeFn

*Inherited from [ChokidarWatcher](src.chokidarwatcher.md).[on](src.chokidarwatcher.md#on)*

*Overrides void*

#### Type parameters:

Name | Type |
------ | ------ |
`Name` | EventNameFromDataMap\<[WatcherEvents](../modules/src.md#watcherevents)> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | Name |
`listener` | (eventData: WatcherEvents[Name]) => void |

**Returns:** Emittery.UnsubscribeFn

▸ **on**\<Name>(`eventName`: Name, `listener`: () => void): Emittery.UnsubscribeFn

*Inherited from [ChokidarWatcher](src.chokidarwatcher.md).[on](src.chokidarwatcher.md#on)*

*Overrides void*

#### Type parameters:

Name | Type |
------ | ------ |
`Name` | \"watcher:ready\" |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | Name |
`listener` | () => void |

**Returns:** Emittery.UnsubscribeFn

___

### onAny

▸ **onAny**(`listener`: (eventName: EventNameFromDataMap\<[WatcherEvents](../modules/src.md#watcherevents)> \| \"watcher:ready\",eventData?: WatcherEvents[EventNameFromDataMap\<WatcherEvents>]) => void): Emittery.UnsubscribeFn

*Inherited from [ChokidarWatcher](src.chokidarwatcher.md).[onAny](src.chokidarwatcher.md#onany)*

*Overrides void*

#### Parameters:

Name | Type |
------ | ------ |
`listener` | (eventName: EventNameFromDataMap\<[WatcherEvents](../modules/src.md#watcherevents)> \| \"watcher:ready\",eventData?: WatcherEvents[EventNameFromDataMap\<WatcherEvents>]) => void |

**Returns:** Emittery.UnsubscribeFn

___

### once

▸ **once**\<Name>(`eventName`: Name): Promise\<WatcherEvents[Name]>

*Inherited from [ChokidarWatcher](src.chokidarwatcher.md).[once](src.chokidarwatcher.md#once)*

*Overrides void*

#### Type parameters:

Name | Type |
------ | ------ |
`Name` | EventNameFromDataMap\<[WatcherEvents](../modules/src.md#watcherevents)> |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | Name |

**Returns:** Promise\<WatcherEvents[Name]>

▸ **once**\<Name>(`eventName`: Name): Promise\<void>

*Inherited from [ChokidarWatcher](src.chokidarwatcher.md).[once](src.chokidarwatcher.md#once)*

*Overrides void*

#### Type parameters:

Name | Type |
------ | ------ |
`Name` | \"watcher:ready\" |

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | Name |

**Returns:** Promise\<void>

___

### watch

▸ **watch**(`watchPattern`: string \| string[], `watcherOptions?`: chokidar.WatchOptions): void

Build and watch project for changes

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`watchPattern` | string \| string[] | ['.'] |
`watcherOptions?` | chokidar.WatchOptions | - |

**Returns:** void

___

### mixin

▸ `Static`**mixin**(`emitteryPropertyName`: string, `methodNames?`: readonly string[]): Function

*Inherited from [ChokidarWatcher](src.chokidarwatcher.md).[mixin](src.chokidarwatcher.md#mixin)*

In TypeScript, it returns a decorator which mixins `Emittery` as property `emitteryPropertyName` and `methodNames`, or all `Emittery` methods if `methodNames` is not defined, into the target class.

**`example`** 
```
import Emittery = require('emittery');

@Emittery.mixin('emittery')
class MyClass {}

const instance = new MyClass();

instance.emit('event');
```

#### Parameters:

Name | Type |
------ | ------ |
`emitteryPropertyName` | string |
`methodNames?` | readonly string[] |

**Returns:** Function
