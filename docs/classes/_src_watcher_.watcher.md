[@poppinss/chokidar-ts](../README.md) › ["src/Watcher"](../modules/_src_watcher_.md) › [Watcher](_src_watcher_.watcher.md)

# Class: Watcher

Exposes the API to build the typescript project and then watch it
for changes.

## Hierarchy

- Typed‹[WatcherEvents](../modules/_src_contracts_.md#watcherevents), "watcher:ready"›

  ↳ **Watcher**

## Index

### Constructors

- [constructor](_src_watcher_.watcher.md#constructor)

### Properties

- [chokidar](_src_watcher_.watcher.md#chokidar)
- [compilerOptions](_src_watcher_.watcher.md#optional-compileroptions)
- [host](_src_watcher_.watcher.md#host)
- [program](_src_watcher_.watcher.md#program)
- [listenerAdded](_src_watcher_.watcher.md#static-readonly-listeneradded)
- [listenerRemoved](_src_watcher_.watcher.md#static-readonly-listenerremoved)

### Methods

- [anyEvent](_src_watcher_.watcher.md#anyevent)
- [bindMethods](_src_watcher_.watcher.md#bindmethods)
- [clearListeners](_src_watcher_.watcher.md#clearlisteners)
- [emit](_src_watcher_.watcher.md#emit)
- [emitSerial](_src_watcher_.watcher.md#emitserial)
- [events](_src_watcher_.watcher.md#events)
- [listenerCount](_src_watcher_.watcher.md#listenercount)
- [off](_src_watcher_.watcher.md#off)
- [offAny](_src_watcher_.watcher.md#offany)
- [on](_src_watcher_.watcher.md#on)
- [onAny](_src_watcher_.watcher.md#onany)
- [once](_src_watcher_.watcher.md#once)
- [watch](_src_watcher_.watcher.md#watch)
- [mixin](_src_watcher_.watcher.md#static-mixin)

## Constructors

### constructor

\+ **new Watcher**(`cwd`: string, `ts`: typeof tsStatic, `config`: tsStatic.ParsedCommandLine, `pluginManager`: [PluginManager](_src_pluginmanager_.pluginmanager.md)): _[Watcher](_src_watcher_.watcher.md)_

**Parameters:**

| Name            | Type                                                  |
| --------------- | ----------------------------------------------------- |
| `cwd`           | string                                                |
| `ts`            | typeof tsStatic                                       |
| `config`        | tsStatic.ParsedCommandLine                            |
| `pluginManager` | [PluginManager](_src_pluginmanager_.pluginmanager.md) |

**Returns:** _[Watcher](_src_watcher_.watcher.md)_

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

_Inherited from [Watcher](_src_watcher_.watcher.md).[listenerAdded](_src_watcher_.watcher.md#static-readonly-listeneradded)_

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

_Inherited from [Watcher](_src_watcher_.watcher.md).[listenerRemoved](_src_watcher_.watcher.md#static-readonly-listenerremoved)_

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

▸ **anyEvent**(): _AsyncIterableIterator‹[EventNameFromDataMap‹[WatcherEvents](../modules/_src_contracts_.md#watcherevents)›, WatcherEvents[EventNameFromDataMap<WatcherEvents>]]›_

_Inherited from [Watcher](_src_watcher_.watcher.md).[anyEvent](_src_watcher_.watcher.md#anyevent)_

_Overrides void_

**Returns:** _AsyncIterableIterator‹[EventNameFromDataMap‹[WatcherEvents](../modules/_src_contracts_.md#watcherevents)›, WatcherEvents[EventNameFromDataMap<WatcherEvents>]]›_

---

### bindMethods

▸ **bindMethods**(`target`: object, `methodNames?`: keyof string[]): _void_

_Inherited from [Watcher](_src_watcher_.watcher.md).[bindMethods](_src_watcher_.watcher.md#bindmethods)_

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

▸ **clearListeners**(`eventName?`: EventName): _void_

_Inherited from [Watcher](_src_watcher_.watcher.md).[clearListeners](_src_watcher_.watcher.md#clearlisteners)_

Clear all event listeners on the instance.

If `eventName` is given, only the listeners for that event are cleared.

**Parameters:**

| Name         | Type      |
| ------------ | --------- |
| `eventName?` | EventName |

**Returns:** _void_

---

### emit

▸ **emit**<**Name**>(`eventName`: Name, `eventData`: WatcherEvents[Name]): _Promise‹void›_

_Inherited from [Watcher](_src_watcher_.watcher.md).[emit](_src_watcher_.watcher.md#emit)_

_Overrides void_

**Type parameters:**

▪ **Name**: _EventNameFromDataMap‹[WatcherEvents](../modules/_src_contracts_.md#watcherevents)›_

**Parameters:**

| Name        | Type                |
| ----------- | ------------------- |
| `eventName` | Name                |
| `eventData` | WatcherEvents[Name] |

**Returns:** _Promise‹void›_

▸ **emit**<**Name**>(`eventName`: Name): _Promise‹void›_

_Inherited from [Watcher](_src_watcher_.watcher.md).[emit](_src_watcher_.watcher.md#emit)_

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

▸ **emitSerial**<**Name**>(`eventName`: Name, `eventData`: WatcherEvents[Name]): _Promise‹void›_

_Inherited from [Watcher](_src_watcher_.watcher.md).[emitSerial](_src_watcher_.watcher.md#emitserial)_

_Overrides void_

**Type parameters:**

▪ **Name**: _EventNameFromDataMap‹[WatcherEvents](../modules/_src_contracts_.md#watcherevents)›_

**Parameters:**

| Name        | Type                |
| ----------- | ------------------- |
| `eventName` | Name                |
| `eventData` | WatcherEvents[Name] |

**Returns:** _Promise‹void›_

▸ **emitSerial**<**Name**>(`eventName`: Name): _Promise‹void›_

_Inherited from [Watcher](_src_watcher_.watcher.md).[emitSerial](_src_watcher_.watcher.md#emitserial)_

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

▸ **events**<**Name**>(`eventName`: Name): _AsyncIterableIterator‹WatcherEvents[Name]›_

_Inherited from [Watcher](_src_watcher_.watcher.md).[events](_src_watcher_.watcher.md#events)_

_Overrides void_

**Type parameters:**

▪ **Name**: _EventNameFromDataMap‹[WatcherEvents](../modules/_src_contracts_.md#watcherevents)›_

**Parameters:**

| Name        | Type |
| ----------- | ---- |
| `eventName` | Name |

**Returns:** _AsyncIterableIterator‹WatcherEvents[Name]›_

---

### listenerCount

▸ **listenerCount**(`eventName?`: EventName): _number_

_Inherited from [Watcher](_src_watcher_.watcher.md).[listenerCount](_src_watcher_.watcher.md#listenercount)_

The number of listeners for the `eventName` or all events if not specified.

**Parameters:**

| Name         | Type      |
| ------------ | --------- |
| `eventName?` | EventName |

**Returns:** _number_

---

### off

▸ **off**<**Name**>(`eventName`: Name, `listener`: function): _void_

_Inherited from [Watcher](_src_watcher_.watcher.md).[off](_src_watcher_.watcher.md#off)_

_Overrides void_

**Type parameters:**

▪ **Name**: _EventNameFromDataMap‹[WatcherEvents](../modules/_src_contracts_.md#watcherevents)›_

**Parameters:**

▪ **eventName**: _Name_

▪ **listener**: _function_

▸ (`eventData`: WatcherEvents[Name]): _void_

**Parameters:**

| Name        | Type                |
| ----------- | ------------------- |
| `eventData` | WatcherEvents[Name] |

**Returns:** _void_

▸ **off**<**Name**>(`eventName`: Name, `listener`: function): _void_

_Inherited from [Watcher](_src_watcher_.watcher.md).[off](_src_watcher_.watcher.md#off)_

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

_Inherited from [Watcher](_src_watcher_.watcher.md).[offAny](_src_watcher_.watcher.md#offany)_

_Overrides void_

**Parameters:**

▪ **listener**: _function_

▸ (`eventName`: EventNameFromDataMap‹[WatcherEvents](../modules/_src_contracts_.md#watcherevents)› | "watcher:ready", `eventData?`: WatcherEvents[EventNameFromDataMap<WatcherEvents>]): _void_

**Parameters:**

| Name         | Type                                                                                                      |
| ------------ | --------------------------------------------------------------------------------------------------------- |
| `eventName`  | EventNameFromDataMap‹[WatcherEvents](../modules/_src_contracts_.md#watcherevents)› &#124; "watcher:ready" |
| `eventData?` | WatcherEvents[EventNameFromDataMap<WatcherEvents>]                                                        |

**Returns:** _void_

---

### on

▸ **on**<**Name**>(`eventName`: Name, `listener`: function): _Emittery.UnsubscribeFn_

_Inherited from [Watcher](_src_watcher_.watcher.md).[on](_src_watcher_.watcher.md#on)_

_Overrides void_

**Type parameters:**

▪ **Name**: _EventNameFromDataMap‹[WatcherEvents](../modules/_src_contracts_.md#watcherevents)›_

**Parameters:**

▪ **eventName**: _Name_

▪ **listener**: _function_

▸ (`eventData`: WatcherEvents[Name]): _void_

**Parameters:**

| Name        | Type                |
| ----------- | ------------------- |
| `eventData` | WatcherEvents[Name] |

**Returns:** _Emittery.UnsubscribeFn_

▸ **on**<**Name**>(`eventName`: Name, `listener`: function): _Emittery.UnsubscribeFn_

_Inherited from [Watcher](_src_watcher_.watcher.md).[on](_src_watcher_.watcher.md#on)_

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

_Inherited from [Watcher](_src_watcher_.watcher.md).[onAny](_src_watcher_.watcher.md#onany)_

_Overrides void_

**Parameters:**

▪ **listener**: _function_

▸ (`eventName`: EventNameFromDataMap‹[WatcherEvents](../modules/_src_contracts_.md#watcherevents)› | "watcher:ready", `eventData?`: WatcherEvents[EventNameFromDataMap<WatcherEvents>]): _void_

**Parameters:**

| Name         | Type                                                                                                      |
| ------------ | --------------------------------------------------------------------------------------------------------- |
| `eventName`  | EventNameFromDataMap‹[WatcherEvents](../modules/_src_contracts_.md#watcherevents)› &#124; "watcher:ready" |
| `eventData?` | WatcherEvents[EventNameFromDataMap<WatcherEvents>]                                                        |

**Returns:** _Emittery.UnsubscribeFn_

---

### once

▸ **once**<**Name**>(`eventName`: Name): _Promise‹WatcherEvents[Name]›_

_Inherited from [Watcher](_src_watcher_.watcher.md).[once](_src_watcher_.watcher.md#once)_

_Overrides void_

**Type parameters:**

▪ **Name**: _EventNameFromDataMap‹[WatcherEvents](../modules/_src_contracts_.md#watcherevents)›_

**Parameters:**

| Name        | Type |
| ----------- | ---- |
| `eventName` | Name |

**Returns:** _Promise‹WatcherEvents[Name]›_

▸ **once**<**Name**>(`eventName`: Name): _Promise‹void›_

_Inherited from [Watcher](_src_watcher_.watcher.md).[once](_src_watcher_.watcher.md#once)_

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

_Inherited from [Watcher](_src_watcher_.watcher.md).[mixin](_src_watcher_.watcher.md#static-mixin)_

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
