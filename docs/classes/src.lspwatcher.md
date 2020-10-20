**[@poppinss/chokidar-ts](../README.md)**

> [Globals](../README.md) / [src](../modules/src.md) / LspWatcher

# Class: LspWatcher

Exposes the API to build the typescript project and then watch it
for changes.

## Hierarchy

* Typed\<[WatcherEvents](../modules/src.md#watcherevents), \"watcher:ready\">

  ↳ **LspWatcher**

## Index

### Constructors

* [constructor](src.lspwatcher.md#constructor)

### Properties

* [chokidar](src.lspwatcher.md#chokidar)
* [compilerOptions](src.lspwatcher.md#compileroptions)
* [host](src.lspwatcher.md#host)
* [program](src.lspwatcher.md#program)
* [listenerAdded](src.lspwatcher.md#listeneradded)
* [listenerRemoved](src.lspwatcher.md#listenerremoved)

### Methods

* [anyEvent](src.lspwatcher.md#anyevent)
* [bindMethods](src.lspwatcher.md#bindmethods)
* [clearListeners](src.lspwatcher.md#clearlisteners)
* [emit](src.lspwatcher.md#emit)
* [emitSerial](src.lspwatcher.md#emitserial)
* [events](src.lspwatcher.md#events)
* [listenerCount](src.lspwatcher.md#listenercount)
* [off](src.lspwatcher.md#off)
* [offAny](src.lspwatcher.md#offany)
* [on](src.lspwatcher.md#on)
* [onAny](src.lspwatcher.md#onany)
* [once](src.lspwatcher.md#once)
* [watch](src.lspwatcher.md#watch)
* [mixin](src.lspwatcher.md#mixin)

## Constructors

### constructor

\+ **new LspWatcher**(`cwd`: string, `ts`: *typeof* tsStatic, `config`: tsStatic.ParsedCommandLine, `pluginManager`: [PluginManager](src.pluginmanager.md)): [LspWatcher](src.lspwatcher.md)

#### Parameters:

Name | Type |
------ | ------ |
`cwd` | string |
`ts` | *typeof* tsStatic |
`config` | tsStatic.ParsedCommandLine |
`pluginManager` | [PluginManager](src.pluginmanager.md) |

**Returns:** [LspWatcher](src.lspwatcher.md)

## Properties

### chokidar

•  **chokidar**: FSWatcher

___

### compilerOptions

• `Optional` **compilerOptions**: tsStatic.CompilerOptions

___

### host

•  **host**: tsStatic.CompilerHost

___

### program

•  **program**: tsStatic.Program

___

### listenerAdded

▪ `Static` `Readonly` **listenerAdded**: unique symbol

*Inherited from [LspWatcher](src.lspwatcher.md).[listenerAdded](src.lspwatcher.md#listeneradded)*

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

*Inherited from [LspWatcher](src.lspwatcher.md).[listenerRemoved](src.lspwatcher.md#listenerremoved)*

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

*Inherited from [LspWatcher](src.lspwatcher.md).[anyEvent](src.lspwatcher.md#anyevent)*

*Overrides void*

**Returns:** AsyncIterableIterator\<[EventNameFromDataMap\<[WatcherEvents](../modules/src.md#watcherevents)>, WatcherEvents[EventNameFromDataMap\<WatcherEvents>]]>

___

### bindMethods

▸ **bindMethods**(`target`: object, `methodNames?`: readonly string[]): void

*Inherited from [LspWatcher](src.lspwatcher.md).[bindMethods](src.lspwatcher.md#bindmethods)*

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

*Inherited from [LspWatcher](src.lspwatcher.md).[clearListeners](src.lspwatcher.md#clearlisteners)*

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

*Inherited from [LspWatcher](src.lspwatcher.md).[emit](src.lspwatcher.md#emit)*

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

*Inherited from [LspWatcher](src.lspwatcher.md).[emit](src.lspwatcher.md#emit)*

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

*Inherited from [LspWatcher](src.lspwatcher.md).[emitSerial](src.lspwatcher.md#emitserial)*

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

*Inherited from [LspWatcher](src.lspwatcher.md).[emitSerial](src.lspwatcher.md#emitserial)*

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

*Inherited from [LspWatcher](src.lspwatcher.md).[events](src.lspwatcher.md#events)*

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

*Inherited from [LspWatcher](src.lspwatcher.md).[listenerCount](src.lspwatcher.md#listenercount)*

The number of listeners for the `eventName` or all events if not specified.

#### Parameters:

Name | Type |
------ | ------ |
`eventName?` | EventNames |

**Returns:** number

___

### off

▸ **off**\<Name>(`eventName`: Name, `listener`: (eventData: WatcherEvents[Name]) => void): void

*Inherited from [LspWatcher](src.lspwatcher.md).[off](src.lspwatcher.md#off)*

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

*Inherited from [LspWatcher](src.lspwatcher.md).[off](src.lspwatcher.md#off)*

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

▸ **offAny**(`listener`: (eventName: EventNameFromDataMap\<[WatcherEvents](../modules/src.md#watcherevents)> \| \"watcher:ready\", eventData?: WatcherEvents[EventNameFromDataMap\<WatcherEvents>]) => void): void

*Inherited from [LspWatcher](src.lspwatcher.md).[offAny](src.lspwatcher.md#offany)*

*Overrides void*

#### Parameters:

Name | Type |
------ | ------ |
`listener` | (eventName: EventNameFromDataMap\<[WatcherEvents](../modules/src.md#watcherevents)> \| \"watcher:ready\", eventData?: WatcherEvents[EventNameFromDataMap\<WatcherEvents>]) => void |

**Returns:** void

___

### on

▸ **on**\<Name>(`eventName`: Name, `listener`: (eventData: WatcherEvents[Name]) => void): Emittery.UnsubscribeFn

*Inherited from [LspWatcher](src.lspwatcher.md).[on](src.lspwatcher.md#on)*

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

*Inherited from [LspWatcher](src.lspwatcher.md).[on](src.lspwatcher.md#on)*

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

▸ **onAny**(`listener`: (eventName: EventNameFromDataMap\<[WatcherEvents](../modules/src.md#watcherevents)> \| \"watcher:ready\", eventData?: WatcherEvents[EventNameFromDataMap\<WatcherEvents>]) => void): Emittery.UnsubscribeFn

*Inherited from [LspWatcher](src.lspwatcher.md).[onAny](src.lspwatcher.md#onany)*

*Overrides void*

#### Parameters:

Name | Type |
------ | ------ |
`listener` | (eventName: EventNameFromDataMap\<[WatcherEvents](../modules/src.md#watcherevents)> \| \"watcher:ready\", eventData?: WatcherEvents[EventNameFromDataMap\<WatcherEvents>]) => void |

**Returns:** Emittery.UnsubscribeFn

___

### once

▸ **once**\<Name>(`eventName`: Name): Promise\<WatcherEvents[Name]>

*Inherited from [LspWatcher](src.lspwatcher.md).[once](src.lspwatcher.md#once)*

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

*Inherited from [LspWatcher](src.lspwatcher.md).[once](src.lspwatcher.md#once)*

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

▸ **watch**(`watchPattern`: string \| string[], `watcherOptions?`: chokidar.WatchOptions): object

Build and watch project for changes

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`watchPattern` | string \| string[] | ['.'] |
`watcherOptions?` | chokidar.WatchOptions | - |

**Returns:** object

Name | Type |
------ | ------ |
`diagnostics` | Diagnostic[] |
`skipped` | boolean |

___

### mixin

▸ `Static`**mixin**(`emitteryPropertyName`: string \| symbol, `methodNames?`: readonly string[]): Function

*Inherited from [LspWatcher](src.lspwatcher.md).[mixin](src.lspwatcher.md#mixin)*

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
`emitteryPropertyName` | string \| symbol |
`methodNames?` | readonly string[] |

**Returns:** Function
