[@poppinss/chokidar-ts](../README.md) › [src](../modules/src.md) › [ReferenceTree](src.referencetree.md)

# Class: ReferenceTree

Reference tree exposes the API to track files along with their
dependencies. Here dependencies are the imported files fetched
using the Typescript compiler API.

The reference tree is optimized to fetch a list of files dependent on
a given file.

## Hierarchy

- **ReferenceTree**

## Index

### Constructors

- [constructor](src.referencetree.md#constructor)

### Methods

- [add](src.referencetree.md#add)
- [getDependencies](src.referencetree.md#getdependencies)
- [remove](src.referencetree.md#remove)
- [toJSON](src.referencetree.md#tojson)

## Constructors

### constructor

\+ **new ReferenceTree**(): _[ReferenceTree](src.referencetree.md)_

**Returns:** _[ReferenceTree](src.referencetree.md)_

## Methods

### add

▸ **add**(`modulePath`: string, `importReferences`: string[]): _void_

Add a new module to the tree along with it's imports

**Parameters:**

| Name               | Type     |
| ------------------ | -------- |
| `modulePath`       | string   |
| `importReferences` | string[] |

**Returns:** _void_

---

### getDependencies

▸ **getDependencies**(`modulePath`: string): _string[]_

Returns an array of dependencies for a given module

**Parameters:**

| Name         | Type   |
| ------------ | ------ |
| `modulePath` | string |

**Returns:** _string[]_

---

### remove

▸ **remove**(`modulePath`: string): _void_

Remove module

**Parameters:**

| Name         | Type   |
| ------------ | ------ |
| `modulePath` | string |

**Returns:** _void_

---

### toJSON

▸ **toJSON**(): _object_

Serializes tree to an object

**Returns:** _object_

- \[ **key**: _string_\]: string[]