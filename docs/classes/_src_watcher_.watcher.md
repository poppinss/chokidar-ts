[@poppinss/chokidar-ts](../README.md) › ["src/Watcher"](../modules/_src_watcher_.md) › [Watcher](_src_watcher_.watcher.md)

# Class: Watcher

Exposes the API to build the typescript project and then watch it
for changes.

## Hierarchy

* Emittery

  ↳ **Watcher**

## Index

### Classes

* [Typed](_src_watcher_.watcher.typed.md)

### Interfaces

* [Events](../interfaces/_src_watcher_.watcher.events.md)

### Type aliases

* [UnsubscribeFn](_src_watcher_.watcher.md#static-unsubscribefn)

### Constructors

* [constructor](_src_watcher_.watcher.md#constructor)

### Properties

* [compilerOptions](_src_watcher_.watcher.md#optional-compileroptions)
* [host](_src_watcher_.watcher.md#host)
* [program](_src_watcher_.watcher.md#program)
* [watcher](_src_watcher_.watcher.md#watcher)

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

## Type aliases

### `Static` UnsubscribeFn

Ƭ **UnsubscribeFn**: *function*

Removes an event subscription.

#### Type declaration:

▸ (): *void*

## Constructors

###  constructor

\+ **new Watcher**(`_cwd`: string, `_configFileName`: string, `_ts`: ts, `_pluginManager`: [PluginManager](_src_pluginmanager_.pluginmanager.md)): *[Watcher](_src_watcher_.watcher.md)*

**Parameters:**

Name | Type |
------ | ------ |
`_cwd` | string |
`_configFileName` | string |
`_ts` | ts |
`_pluginManager` | [PluginManager](_src_pluginmanager_.pluginmanager.md) |

**Returns:** *[Watcher](_src_watcher_.watcher.md)*

## Properties

### `Optional` compilerOptions

• **compilerOptions**? : *tsStatic.CompilerOptions*

___

###  host

• **host**: *tsStatic.CompilerHost*

___

###  program

• **program**: *tsStatic.Program*

___

###  watcher

• **watcher**: *FSWatcher*

## Methods

###  anyEvent

▸ **anyEvent**(): *AsyncIterableIterator‹unknown›*

*Inherited from void*

Get an async iterator which buffers a tuple of an event name and data each time an event is emitted.

Call `return()` on the iterator to remove the subscription.

In the same way as for `events`, you can subscribe by using the `for await` statement.

**`example`** 
```
import Emittery = require('emittery');

const emitter = new Emittery();
const iterator = emitter.anyEvent();

emitter.emit('🦄', '🌈1'); // Buffered
emitter.emit('🌟', '🌈2'); // Buffered

iterator.next()
.then(({value, done}) => {
// done is false
// value is ['🦄', '🌈1']
return iterator.next();
})
.then(({value, done}) => {
// done is false
// value is ['🌟', '🌈2']
// revoke subscription
return iterator.return();
})
.then(({done}) => {
// done is true
});
```

**Returns:** *AsyncIterableIterator‹unknown›*

___

###  bindMethods

▸ **bindMethods**(`target`: object, `methodNames?`: keyof string[]): *void*

*Inherited from void*

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

▸ **clearListeners**(`eventName?`: undefined | string): *void*

*Inherited from void*

Clear all event listeners on the instance.

If `eventName` is given, only the listeners for that event are cleared.

**Parameters:**

Name | Type |
------ | ------ |
`eventName?` | undefined &#124; string |

**Returns:** *void*

___

###  emit

▸ **emit**(`eventName`: string, `eventData?`: unknown): *Promise‹void›*

*Inherited from void*

Trigger an event asynchronously, optionally with some data. Listeners are called in the order they were added, but executed concurrently.

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | string |
`eventData?` | unknown |

**Returns:** *Promise‹void›*

A promise that resolves when all the event listeners are done. *Done* meaning executed if synchronous or resolved when an async/promise-returning function. You usually wouldn't want to wait for this, but you could for example catch possible errors. If any of the listeners throw/reject, the returned promise will be rejected with the error, but the other listeners will not be affected.

___

###  emitSerial

▸ **emitSerial**(`eventName`: string, `eventData?`: unknown): *Promise‹void›*

*Inherited from void*

Same as `emit()`, but it waits for each listener to resolve before triggering the next one. This can be useful if your events depend on each other. Although ideally they should not. Prefer `emit()` whenever possible.

If any of the listeners throw/reject, the returned promise will be rejected with the error and the remaining listeners will *not* be called.

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | string |
`eventData?` | unknown |

**Returns:** *Promise‹void›*

A promise that resolves when all the event listeners are done.

___

###  events

▸ **events**(`eventName`: string): *AsyncIterableIterator‹unknown›*

*Inherited from void*

Get an async iterator which buffers data each time an event is emitted.

Call `return()` on the iterator to remove the subscription.

**`example`** 
```
import Emittery = require('emittery');

const emitter = new Emittery();
const iterator = emitter.events('🦄');

emitter.emit('🦄', '🌈1'); // Buffered
emitter.emit('🦄', '🌈2'); // Buffered

iterator
.next()
.then(({value, done}) => {
// done === false
// value === '🌈1'
return iterator.next();
})
.then(({value, done}) => {
// done === false
// value === '🌈2'
// Revoke subscription
return iterator.return();
})
.then(({done}) => {
// done === true
});
```

In practice you would usually consume the events using the [for await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of) statement. In that case, to revoke the subscription simply break the loop.

**`example`** 
```
import Emittery = require('emittery');

const emitter = new Emittery();
const iterator = emitter.events('🦄');

emitter.emit('🦄', '🌈1'); // Buffered
emitter.emit('🦄', '🌈2'); // Buffered

// In an async context.
for await (const data of iterator) {
if (data === '🌈2') {
break; // Revoke the subscription when we see the value `🌈2`.
}
}
```

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | string |

**Returns:** *AsyncIterableIterator‹unknown›*

___

###  listenerCount

▸ **listenerCount**(`eventName?`: undefined | string): *number*

*Inherited from void*

The number of listeners for the `eventName` or all events if not specified.

**Parameters:**

Name | Type |
------ | ------ |
`eventName?` | undefined &#124; string |

**Returns:** *number*

___

###  off

▸ **off**(`eventName`: string, `listener`: function): *void*

*Inherited from void*

Remove an event subscription.

**Parameters:**

▪ **eventName**: *string*

▪ **listener**: *function*

▸ (`eventData?`: unknown): *void*

**Parameters:**

Name | Type |
------ | ------ |
`eventData?` | unknown |

**Returns:** *void*

___

###  offAny

▸ **offAny**(`listener`: function): *void*

*Inherited from void*

Remove an `onAny` subscription.

**Parameters:**

▪ **listener**: *function*

▸ (`eventName`: string, `eventData?`: unknown): *void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | string |
`eventData?` | unknown |

**Returns:** *void*

___

###  on

▸ **on**(`event`: "watcher:ready", `cb`: function): *Emittery.UnsubscribeFn*

*Overrides void*

**Parameters:**

▪ **event**: *"watcher:ready"*

▪ **cb**: *function*

▸ (): *void*

**Returns:** *Emittery.UnsubscribeFn*

▸ **on**(`event`: "add", `cb`: function): *Emittery.UnsubscribeFn*

*Overrides void*

**Parameters:**

▪ **event**: *"add"*

▪ **cb**: *function*

▸ (`filePath`: string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`filePath` | string |

**Returns:** *Emittery.UnsubscribeFn*

▸ **on**(`event`: "change", `cb`: function): *Emittery.UnsubscribeFn*

*Overrides void*

**Parameters:**

▪ **event**: *"change"*

▪ **cb**: *function*

▸ (`filePath`: string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`filePath` | string |

**Returns:** *Emittery.UnsubscribeFn*

▸ **on**(`event`: "unlink", `cb`: function): *Emittery.UnsubscribeFn*

*Overrides void*

**Parameters:**

▪ **event**: *"unlink"*

▪ **cb**: *function*

▸ (`filePath`: string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`filePath` | string |

**Returns:** *Emittery.UnsubscribeFn*

▸ **on**(`event`: "source:unlink", `cb`: function): *Emittery.UnsubscribeFn*

*Overrides void*

**Parameters:**

▪ **event**: *"source:unlink"*

▪ **cb**: *function*

▸ (`filePath`: string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`filePath` | string |

**Returns:** *Emittery.UnsubscribeFn*

▸ **on**(`event`: "subsequent:build", `cb`: function): *Emittery.UnsubscribeFn*

*Overrides void*

**Parameters:**

▪ **event**: *"subsequent:build"*

▪ **cb**: *function*

▸ (`data`: object): *void*

**Parameters:**

Name | Type |
------ | ------ |
`data` | object |

**Returns:** *Emittery.UnsubscribeFn*

▸ **on**(`event`: string, `cb`: any): *Emittery.UnsubscribeFn*

*Overrides void*

**Parameters:**

Name | Type |
------ | ------ |
`event` | string |
`cb` | any |

**Returns:** *Emittery.UnsubscribeFn*

___

###  onAny

▸ **onAny**(`listener`: function): *Emittery.UnsubscribeFn*

*Inherited from void*

Subscribe to be notified about any event.

**Parameters:**

▪ **listener**: *function*

▸ (`eventName`: string, `eventData?`: unknown): *unknown*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | string |
`eventData?` | unknown |

**Returns:** *Emittery.UnsubscribeFn*

A method to unsubscribe.

___

###  once

▸ **once**(`eventName`: string): *Promise‹unknown›*

*Inherited from void*

Subscribe to an event only once. It will be unsubscribed after the first
event.

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | string |

**Returns:** *Promise‹unknown›*

The event data when `eventName` is emitted.

___

###  watch

▸ **watch**(`watchPattern`: string | string[], `watcherOptions?`: chokidar.WatchOptions, `optionsToExtend?`: tsStatic.CompilerOptions): *object*

Build and watch project for changes

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`watchPattern` | string &#124; string[] |  ['.'] |
`watcherOptions?` | chokidar.WatchOptions | - |
`optionsToExtend?` | tsStatic.CompilerOptions | - |

**Returns:** *object*

___

### `Static` mixin

▸ **mixin**(`emitteryPropertyName`: string, `methodNames?`: keyof string[]): *Function*

*Inherited from void*

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
