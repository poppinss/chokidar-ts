[@poppinss/chokidar-ts](../README.md) › ["src/Watcher"](../modules/_src_watcher_.md) › [Watcher](_src_watcher_.watcher.md) › [Typed](_src_watcher_.watcher.typed.md)

# Class: Typed <**EventDataMap, EmptyEvents**>

Async event emitter.

You must list supported events and the data type they emit, if any.

**`example`** 
```
import Emittery = require('emittery');

const emitter = new Emittery.Typed<{value: string}, 'open' | 'close'>();

emitter.emit('open');
emitter.emit('value', 'foo\n');
emitter.emit('value', 1); // TS compilation error
emitter.emit('end'); // TS compilation error
```

## Type parameters

▪ **EventDataMap**: *Events*

▪ **EmptyEvents**: *string*

## Hierarchy

* **Typed**

## Index

### Methods

* [anyEvent](_src_watcher_.watcher.typed.md#anyevent)
* [emit](_src_watcher_.watcher.typed.md#emit)
* [emitSerial](_src_watcher_.watcher.typed.md#emitserial)
* [events](_src_watcher_.watcher.typed.md#events)
* [off](_src_watcher_.watcher.typed.md#off)
* [offAny](_src_watcher_.watcher.typed.md#offany)
* [on](_src_watcher_.watcher.typed.md#on)
* [onAny](_src_watcher_.watcher.typed.md#onany)
* [once](_src_watcher_.watcher.typed.md#once)

## Methods

###  anyEvent

▸ **anyEvent**(): *AsyncIterableIterator‹[Extract‹keyof EventDataMap, string›, EventDataMap[Extract<keyof EventDataMap, string>]]›*

**Returns:** *AsyncIterableIterator‹[Extract‹keyof EventDataMap, string›, EventDataMap[Extract<keyof EventDataMap, string>]]›*

___

###  emit

▸ **emit**<**Name**>(`eventName`: Name, `eventData`: EventDataMap[Name]): *Promise‹void›*

**Type parameters:**

▪ **Name**: *Extract‹keyof EventDataMap, string›*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | Name |
`eventData` | EventDataMap[Name] |

**Returns:** *Promise‹void›*

▸ **emit**<**Name**>(`eventName`: Name): *Promise‹void›*

**Type parameters:**

▪ **Name**: *EmptyEvents*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | Name |

**Returns:** *Promise‹void›*

___

###  emitSerial

▸ **emitSerial**<**Name**>(`eventName`: Name, `eventData`: EventDataMap[Name]): *Promise‹void›*

**Type parameters:**

▪ **Name**: *Extract‹keyof EventDataMap, string›*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | Name |
`eventData` | EventDataMap[Name] |

**Returns:** *Promise‹void›*

▸ **emitSerial**<**Name**>(`eventName`: Name): *Promise‹void›*

**Type parameters:**

▪ **Name**: *EmptyEvents*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | Name |

**Returns:** *Promise‹void›*

___

###  events

▸ **events**<**Name**>(`eventName`: Name): *AsyncIterableIterator‹EventDataMap[Name]›*

**Type parameters:**

▪ **Name**: *Extract‹keyof EventDataMap, string›*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | Name |

**Returns:** *AsyncIterableIterator‹EventDataMap[Name]›*

___

###  off

▸ **off**<**Name**>(`eventName`: Name, `listener`: function): *void*

**Type parameters:**

▪ **Name**: *Extract‹keyof EventDataMap, string›*

**Parameters:**

▪ **eventName**: *Name*

▪ **listener**: *function*

▸ (`eventData`: EventDataMap[Name]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`eventData` | EventDataMap[Name] |

**Returns:** *void*

▸ **off**<**Name**>(`eventName`: Name, `listener`: function): *void*

**Type parameters:**

▪ **Name**: *EmptyEvents*

**Parameters:**

▪ **eventName**: *Name*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *void*

___

###  offAny

▸ **offAny**(`listener`: function): *void*

**Parameters:**

▪ **listener**: *function*

▸ (`eventName`: Extract‹keyof EventDataMap, string› | EmptyEvents, `eventData?`: undefined | EventDataMap[Extract<keyof EventDataMap, string>]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | Extract‹keyof EventDataMap, string› &#124; EmptyEvents |
`eventData?` | undefined &#124; EventDataMap[Extract<keyof EventDataMap, string>] |

**Returns:** *void*

___

###  on

▸ **on**<**Name**>(`eventName`: Name, `listener`: function): *Emittery.UnsubscribeFn*

**Type parameters:**

▪ **Name**: *Extract‹keyof EventDataMap, string›*

**Parameters:**

▪ **eventName**: *Name*

▪ **listener**: *function*

▸ (`eventData`: EventDataMap[Name]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`eventData` | EventDataMap[Name] |

**Returns:** *Emittery.UnsubscribeFn*

▸ **on**<**Name**>(`eventName`: Name, `listener`: function): *Emittery.UnsubscribeFn*

**Type parameters:**

▪ **Name**: *EmptyEvents*

**Parameters:**

▪ **eventName**: *Name*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *Emittery.UnsubscribeFn*

___

###  onAny

▸ **onAny**(`listener`: function): *Emittery.UnsubscribeFn*

**Parameters:**

▪ **listener**: *function*

▸ (`eventName`: Extract‹keyof EventDataMap, string› | EmptyEvents, `eventData?`: undefined | EventDataMap[Extract<keyof EventDataMap, string>]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | Extract‹keyof EventDataMap, string› &#124; EmptyEvents |
`eventData?` | undefined &#124; EventDataMap[Extract<keyof EventDataMap, string>] |

**Returns:** *Emittery.UnsubscribeFn*

___

###  once

▸ **once**<**Name**>(`eventName`: Name): *Promise‹EventDataMap[Name]›*

**Type parameters:**

▪ **Name**: *Extract‹keyof EventDataMap, string›*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | Name |

**Returns:** *Promise‹EventDataMap[Name]›*

▸ **once**<**Name**>(`eventName`: Name): *Promise‹void›*

**Type parameters:**

▪ **Name**: *EmptyEvents*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | Name |

**Returns:** *Promise‹void›*
