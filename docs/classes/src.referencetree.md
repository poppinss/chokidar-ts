**[@poppinss/chokidar-ts](../README.md)**

> [Globals](../README.md) / [src](../modules/src.md) / ReferenceTree

# Class: ReferenceTree

Reference tree exposes the API to track files along with their
dependencies. Here dependencies are the imported files fetched
using the Typescript compiler API.

The reference tree is optimized to fetch a list of files dependent on
a given file.

## Hierarchy

* **ReferenceTree**

## Index

### Constructors

* [constructor](src.referencetree.md#constructor)

### Methods

* [add](src.referencetree.md#add)
* [getDependencies](src.referencetree.md#getdependencies)
* [remove](src.referencetree.md#remove)
* [toJSON](src.referencetree.md#tojson)

## Constructors

### constructor

\+ **new ReferenceTree**(): [ReferenceTree](src.referencetree.md)

**Returns:** [ReferenceTree](src.referencetree.md)

## Methods

### add

▸ **add**(`modulePath`: string, `importReferences`: string[]): void

Add a new module to the tree along with it's imports

#### Parameters:

Name | Type |
------ | ------ |
`modulePath` | string |
`importReferences` | string[] |

**Returns:** void

___

### getDependencies

▸ **getDependencies**(`modulePath`: string): string[]

Returns an array of dependencies for a given module

#### Parameters:

Name | Type |
------ | ------ |
`modulePath` | string |

**Returns:** string[]

___

### remove

▸ **remove**(`modulePath`: string): void

Remove module

#### Parameters:

Name | Type |
------ | ------ |
`modulePath` | string |

**Returns:** void

___

### toJSON

▸ **toJSON**(): object

Serializes tree to an object

**Returns:** object
