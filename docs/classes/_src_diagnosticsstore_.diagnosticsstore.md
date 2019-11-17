[@poppinss/chokidar-ts](../README.md) › ["src/DiagnosticsStore"](../modules/_src_diagnosticsstore_.md) › [DiagnosticsStore](_src_diagnosticsstore_.diagnosticsstore.md)

# Class: DiagnosticsStore

Exposes the API to collect typescript project diagnostics. We start by
consuming the diagnostics for the entire project in reference to the
file paths. As files are changed, we update the diagnostics for
that file itself.

## Hierarchy

* **DiagnosticsStore**

## Index

### Constructors

* [constructor](_src_diagnosticsstore_.diagnosticsstore.md#constructor)

### Methods

* [add](_src_diagnosticsstore_.diagnosticsstore.md#add)
* [bulkAdd](_src_diagnosticsstore_.diagnosticsstore.md#bulkadd)
* [remove](_src_diagnosticsstore_.diagnosticsstore.md#remove)
* [toJSON](_src_diagnosticsstore_.diagnosticsstore.md#tojson)

## Constructors

###  constructor

\+ **new DiagnosticsStore**(): *[DiagnosticsStore](_src_diagnosticsstore_.diagnosticsstore.md)*

**Returns:** *[DiagnosticsStore](_src_diagnosticsstore_.diagnosticsstore.md)*

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
