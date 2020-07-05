[@poppinss/chokidar-ts](../README.md) › [src](../modules/src.md) › [DiagnosticsStore](src.diagnosticsstore.md)

# Class: DiagnosticsStore

Exposes the API to collect typescript project diagnostics. We start by
consuming the diagnostics for the entire project in reference to the
file paths. As files are changed, we update the diagnostics for
that file itself.

## Hierarchy

* **DiagnosticsStore**

## Index

### Constructors

* [constructor](src.diagnosticsstore.md#constructor)

### Methods

* [add](src.diagnosticsstore.md#add)
* [bulkAdd](src.diagnosticsstore.md#bulkadd)
* [remove](src.diagnosticsstore.md#remove)
* [toJSON](src.diagnosticsstore.md#tojson)

## Constructors

###  constructor

\+ **new DiagnosticsStore**(): *[DiagnosticsStore](src.diagnosticsstore.md)*

**Returns:** *[DiagnosticsStore](src.diagnosticsstore.md)*

## Methods

###  add

▸ **add**(`filePath`: string, `diagnostics`: tsStatic.Diagnostic[]): *void*

Add diagnostics for a given file

**Parameters:**

Name | Type |
------ | ------ |
`filePath` | string |
`diagnostics` | tsStatic.Diagnostic[] |

**Returns:** *void*

___

###  bulkAdd

▸ **bulkAdd**(`diagnostics`: tsStatic.Diagnostic[]): *void*

Consumes diagnostics for the entire project

**Parameters:**

Name | Type |
------ | ------ |
`diagnostics` | tsStatic.Diagnostic[] |

**Returns:** *void*

___

###  remove

▸ **remove**(`filePath`: string): *void*

Remove diagnostics for a given file

**Parameters:**

Name | Type |
------ | ------ |
`filePath` | string |

**Returns:** *void*

___

###  toJSON

▸ **toJSON**(): *Diagnostic[]*

Returns an array of all the diagnostics

**Returns:** *Diagnostic[]*
