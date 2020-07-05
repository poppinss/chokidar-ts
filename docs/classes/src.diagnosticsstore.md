[@poppinss/chokidar-ts](../README.md) › [src](../modules/src.md) › [DiagnosticsStore](src.diagnosticsstore.md)

# Class: DiagnosticsStore

Exposes the API to collect typescript project diagnostics. We start by
consuming the diagnostics for the entire project in reference to the
file paths. As files are changed, we update the diagnostics for
that file itself.

## Hierarchy

- **DiagnosticsStore**

## Index

### Constructors

- [constructor](src.diagnosticsstore.md#constructor)

### Methods

- [add](src.diagnosticsstore.md#add)
- [bulkAdd](src.diagnosticsstore.md#bulkadd)
- [remove](src.diagnosticsstore.md#remove)
- [toJSON](src.diagnosticsstore.md#tojson)

## Constructors

### constructor

\+ **new DiagnosticsStore**(): _[DiagnosticsStore](src.diagnosticsstore.md)_

**Returns:** _[DiagnosticsStore](src.diagnosticsstore.md)_

## Methods

### add

▸ **add**(`filePath`: string, `diagnostics`: tsStatic.Diagnostic[]): _void_

Add diagnostics for a given file

**Parameters:**

| Name          | Type                  |
| ------------- | --------------------- |
| `filePath`    | string                |
| `diagnostics` | tsStatic.Diagnostic[] |

**Returns:** _void_

---

### bulkAdd

▸ **bulkAdd**(`diagnostics`: tsStatic.Diagnostic[]): _void_

Consumes diagnostics for the entire project

**Parameters:**

| Name          | Type                  |
| ------------- | --------------------- |
| `diagnostics` | tsStatic.Diagnostic[] |

**Returns:** _void_

---

### remove

▸ **remove**(`filePath`: string): _void_

Remove diagnostics for a given file

**Parameters:**

| Name       | Type   |
| ---------- | ------ |
| `filePath` | string |

**Returns:** _void_

---

### toJSON

▸ **toJSON**(): _Diagnostic[]_

Returns an array of all the diagnostics

**Returns:** _Diagnostic[]_
