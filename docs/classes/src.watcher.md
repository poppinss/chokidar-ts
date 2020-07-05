[@poppinss/chokidar-ts](../README.md) › [src](../modules/src.md) › [Watcher](src.watcher.md)

# Class: Watcher

Exposes the API to build the typescript project and then watch it
for changes.

## Hierarchy

- Typed‹[WatcherEvents](../modules/src.md#watcherevents), "watcher:ready"›

  ↳ **Watcher**

## Index

### Constructors

- [constructor](src.watcher.md#constructor)

### Properties

- [chokidar](src.watcher.md#chokidar)
- [compilerOptions](src.watcher.md#optional-compileroptions)
- [host](src.watcher.md#host)
- [program](src.watcher.md#program)
- [listenerAdded](src.watcher.md#static-readonly-listeneradded)
- [listenerRemoved](src.watcher.md#static-readonly-listenerremoved)

### Methods

- [anyEvent](src.watcher.md#anyevent)
- [bindMethods](src.watcher.md#bindmethods)
- [clearListeners](src.watcher.md#clearlisteners)
- [emit](src.watcher.md#emit)
- [emitSerial](src.watcher.md#emitserial)
- [events](src.watcher.md#events)
- [listenerCount](src.watcher.md#listenercount)
- [off](src.watcher.md#off)
- [offAny](src.watcher.md#offany)
- [on](src.watcher.md#on)
- [onAny](src.watcher.md#onany)
- [once](src.watcher.md#once)
- [watch](src.watcher.md#watch)
- [mixin](src.watcher.md#static-mixin)

## Constructors

### constructor

\+ **new Watcher**(`cwd`: string, `ts`: typeof tsStatic, `config`: tsStatic.ParsedCommandLine, `pluginManager`: [PluginManager](src.pluginmanager.md)): _[Watcher](src.watcher.md)_

**Parameters:**

| Name            | Type                                  |
| --------------- | ------------------------------------- |
| `cwd`           | string                                |
| `ts`            | typeof tsStatic                       |
| `config`        | tsStatic.ParsedCommandLine            |
| `pluginManager` | [PluginManager](src.pluginmanager.md) |

**Returns:** _[Watcher](src.watcher.md)_

## Properties

### chokidar

• **chokidar**: _FSWatcher_

---

### `Optional` compilerOptions

• **compilerOptions**? : _tsStatic.CompilerOptions_

---

### host

• **host**: _tsStatic.CompilerHost_

---

### program

• **program**: _tsStatic.Program_

---

### `Static` `Readonly` listenerAdded

▪ **listenerAdded**: _keyof symbol_

_Inherited from [Watcher](src.watcher.md).[listenerAdded](src.watcher.md#static-readonly-listeneradded)_

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

---

### `Static` `Readonly` listenerRemoved

▪ **listenerRemoved**: _keyof symbol_

_Inherited from [Watcher](src.watcher.md).[listenerRemoved](src.watcher.md#static-readonly-listenerremoved)_

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

▸ **anyEvent**(): _AsyncIterableIterator‹[EventNameFromDataMap‹[WatcherEvents](../modules/src.md#watcherevents)›, WatcherEvents[EventNameFromDataMap<WatcherEvents>]]›_

_Inherited from [Watcher](src.watcher.md).[anyEvent](src.watcher.md#anyevent)_

_Overrides void_

**Returns:** _AsyncIterableIterator‹[EventNameFromDataMap‹[WatcherEvents](../modules/src.md#watcherevents)›, WatcherEvents[EventNameFromDataMap<WatcherEvents>]]›_

---

### bindMethods

▸ **bindMethods**(`target`: object, `methodNames?`: keyof string[]): _void_

_Inherited from [Watcher](src.watcher.md).[bindMethods](src.watcher.md#bindmethods)_

Bind the given `methodNames`, or all `Emittery` methods if `methodNames` is not defined, into the `target` object.

**`example`**

```
import Emittery = require('emittery');

const object = {};

new Emittery().bindMethods(object);

object.emit('event');
```

**Parameters:**

| Name           | Type           |
| -------------- | -------------- |
| `target`       | object         |
| `methodNames?` | keyof string[] |

**Returns:** _void_

---

### clearListeners

▸ **clearListeners**(`eventName?`: EventNames): _void_

_Inherited from [Watcher](src.watcher.md).[clearListeners](src.watcher.md#clearlisteners)_

Clear all event listeners on the instance.

If `eventName` is given, only the listeners for that event are cleared.

**Parameters:**

| Name         | Type       |
| ------------ | ---------- |
| `eventName?` | EventNames |

**Returns:** _void_

---

### emit

▸ **emit**‹**Name**›(`eventName`: Name, `eventData`: WatcherEvents[Name]): _Promise‹void›_

_Inherited from [Watcher](src.watcher.md).[emit](src.watcher.md#emit)_

_Overrides void_

**Type parameters:**

▪ **Name**: _EventNameFromDataMap‹[WatcherEvents](../modules/src.md#watcherevents)›_

**Parameters:**

| Name        | Type                |
| ----------- | ------------------- |
| `eventName` | Name                |
| `eventData` | WatcherEvents[Name] |

**Returns:** _Promise‹void›_

▸ **emit**‹**Name**›(`eventName`: Name): _Promise‹void›_

_Inherited from [Watcher](src.watcher.md).[emit](src.watcher.md#emit)_

_Overrides void_

**Type parameters:**

▪ **Name**: _"watcher:ready"_

**Parameters:**

| Name        | Type |
| ----------- | ---- |
| `eventName` | Name |

**Returns:** _Promise‹void›_

---

### emitSerial

▸ **emitSerial**‹**Name**›(`eventName`: Name, `eventData`: WatcherEvents[Name]): _Promise‹void›_

_Inherited from [Watcher](src.watcher.md).[emitSerial](src.watcher.md#emitserial)_

_Overrides void_

**Type parameters:**

▪ **Name**: _EventNameFromDataMap‹[WatcherEvents](../modules/src.md#watcherevents)›_

**Parameters:**

| Name        | Type                |
| ----------- | ------------------- |
| `eventName` | Name                |
| `eventData` | WatcherEvents[Name] |

**Returns:** _Promise‹void›_

▸ **emitSerial**‹**Name**›(`eventName`: Name): _Promise‹void›_

_Inherited from [Watcher](src.watcher.md).[emitSerial](src.watcher.md#emitserial)_

_Overrides void_

**Type parameters:**

▪ **Name**: _"watcher:ready"_

**Parameters:**

| Name        | Type |
| ----------- | ---- |
| `eventName` | Name |

**Returns:** _Promise‹void›_

---

### events

▸ **events**‹**Name**›(`eventName`: Name): _AsyncIterableIterator‹WatcherEvents[Name]›_

_Inherited from [Watcher](src.watcher.md).[events](src.watcher.md#events)_

_Overrides void_

**Type parameters:**

▪ **Name**: _EventNameFromDataMap‹[WatcherEvents](../modules/src.md#watcherevents)›_

**Parameters:**

| Name        | Type |
| ----------- | ---- |
| `eventName` | Name |

**Returns:** _AsyncIterableIterator‹WatcherEvents[Name]›_

---

### listenerCount

▸ **listenerCount**(`eventName?`: EventNames): _number_

_Inherited from [Watcher](src.watcher.md).[listenerCount](src.watcher.md#listenercount)_

The number of listeners for the `eventName` or all events if not specified.

**Parameters:**

| Name         | Type       |
| ------------ | ---------- |
| `eventName?` | EventNames |

**Returns:** _number_

---

### off

▸ **off**‹**Name**›(`eventName`: Name, `listener`: function): _void_

_Inherited from [Watcher](src.watcher.md).[off](src.watcher.md#off)_

_Overrides void_

**Type parameters:**

▪ **Name**: _EventNameFromDataMap‹[WatcherEvents](../modules/src.md#watcherevents)›_

**Parameters:**

▪ **eventName**: _Name_

▪ **listener**: _function_

▸ (`eventData`: WatcherEvents[Name]): _void_

**Parameters:**

| Name        | Type                |
| ----------- | ------------------- |
| `eventData` | WatcherEvents[Name] |

**Returns:** _void_

▸ **off**‹**Name**›(`eventName`: Name, `listener`: function): _void_

_Inherited from [Watcher](src.watcher.md).[off](src.watcher.md#off)_

_Overrides void_

**Type parameters:**

▪ **Name**: _"watcher:ready"_

**Parameters:**

▪ **eventName**: _Name_

▪ **listener**: _function_

▸ (): _void_

**Returns:** _void_

---

### offAny

▸ **offAny**(`listener`: function): _void_

_Inherited from [Watcher](src.watcher.md).[offAny](src.watcher.md#offany)_

_Overrides void_

**Parameters:**

▪ **listener**: _function_

▸ (`eventName`: EventNameFromDataMap‹[WatcherEvents](../modules/src.md#watcherevents)› | "watcher:ready", `eventData?`: WatcherEvents[EventNameFromDataMap<WatcherEvents>]): _void_

**Parameters:**

| Name         | Type                                                                                          |
| ------------ | --------------------------------------------------------------------------------------------- |
| `eventName`  | EventNameFromDataMap‹[WatcherEvents](../modules/src.md#watcherevents)› &#124; "watcher:ready" |
| `eventData?` | WatcherEvents[EventNameFromDataMap<WatcherEvents>]                                            |

**Returns:** _void_

---

### on

▸ **on**‹**Name**›(`eventName`: Name, `listener`: function): _Emittery.UnsubscribeFn_

_Inherited from [Watcher](src.watcher.md).[on](src.watcher.md#on)_

_Overrides void_

**Type parameters:**

▪ **Name**: _EventNameFromDataMap‹[WatcherEvents](../modules/src.md#watcherevents)›_

**Parameters:**

▪ **eventName**: _Name_

▪ **listener**: _function_

▸ (`eventData`: WatcherEvents[Name]): _void_

**Parameters:**

| Name        | Type                |
| ----------- | ------------------- |
| `eventData` | WatcherEvents[Name] |

**Returns:** _Emittery.UnsubscribeFn_

▸ **on**‹**Name**›(`eventName`: Name, `listener`: function): _Emittery.UnsubscribeFn_

_Inherited from [Watcher](src.watcher.md).[on](src.watcher.md#on)_

_Overrides void_

**Type parameters:**

▪ **Name**: _"watcher:ready"_

**Parameters:**

▪ **eventName**: _Name_

▪ **listener**: _function_

▸ (): _void_

**Returns:** _Emittery.UnsubscribeFn_

---

### onAny

▸ **onAny**(`listener`: function): _Emittery.UnsubscribeFn_

_Inherited from [Watcher](src.watcher.md).[onAny](src.watcher.md#onany)_

_Overrides void_

**Parameters:**

▪ **listener**: _function_

▸ (`eventName`: EventNameFromDataMap‹[WatcherEvents](../modules/src.md#watcherevents)› | "watcher:ready", `eventData?`: WatcherEvents[EventNameFromDataMap<WatcherEvents>]): _void_

**Parameters:**

| Name         | Type                                                                                          |
| ------------ | --------------------------------------------------------------------------------------------- |
| `eventName`  | EventNameFromDataMap‹[WatcherEvents](../modules/src.md#watcherevents)› &#124; "watcher:ready" |
| `eventData?` | WatcherEvents[EventNameFromDataMap<WatcherEvents>]                                            |

**Returns:** _Emittery.UnsubscribeFn_

---

### once

▸ **once**‹**Name**›(`eventName`: Name): _Promise‹WatcherEvents[Name]›_

_Inherited from [Watcher](src.watcher.md).[once](src.watcher.md#once)_

_Overrides void_

**Type parameters:**

▪ **Name**: _EventNameFromDataMap‹[WatcherEvents](../modules/src.md#watcherevents)›_

**Parameters:**

| Name        | Type |
| ----------- | ---- |
| `eventName` | Name |

**Returns:** _Promise‹WatcherEvents[Name]›_

▸ **once**‹**Name**›(`eventName`: Name): _Promise‹void›_

_Inherited from [Watcher](src.watcher.md).[once](src.watcher.md#once)_

_Overrides void_

**Type parameters:**

▪ **Name**: _"watcher:ready"_

**Parameters:**

| Name        | Type |
| ----------- | ---- |
| `eventName` | Name |

**Returns:** _Promise‹void›_

---

### watch

▸ **watch**(`watchPattern`: string | string[], `watcherOptions?`: chokidar.WatchOptions): _object_

Build and watch project for changes

**Parameters:**

| Name              | Type                   | Default |
| ----------------- | ---------------------- | ------- |
| `watchPattern`    | string &#124; string[] | ['.']   |
| `watcherOptions?` | chokidar.WatchOptions  | -       |

**Returns:** _object_

- **diagnostics**: _Diagnostic[]_

- **skipped**: _boolean_ = result.emitSkipped

---

### `Static` mixin

▸ **mixin**(`emitteryPropertyName`: string, `methodNames?`: keyof string[]): _Function_

_Inherited from [Watcher](src.watcher.md).[mixin](src.watcher.md#static-mixin)_

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

| Name                   | Type           |
| ---------------------- | -------------- |
| `emitteryPropertyName` | string         |
| `methodNames?`         | keyof string[] |

**Returns:** _Function_
