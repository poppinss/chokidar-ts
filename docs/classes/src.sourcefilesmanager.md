[@poppinss/chokidar-ts](../README.md) › [src](../modules/src.md) › [SourceFilesManager](src.sourcefilesmanager.md)

# Class: SourceFilesManager

Exposes the API to manage the source files for a typescript project. You need
full blown source files management during the watch mode, since new files
are added and removed regularly.

## Hierarchy

- **SourceFilesManager**

## Index

### Constructors

- [constructor](src.sourcefilesmanager.md#constructor)

### Methods

- [add](src.sourcefilesmanager.md#add)
- [bumpVersion](src.sourcefilesmanager.md#bumpversion)
- [getFileVersion](src.sourcefilesmanager.md#getfileversion)
- [isSourceFile](src.sourcefilesmanager.md#issourcefile)
- [remove](src.sourcefilesmanager.md#remove)
- [toJSON](src.sourcefilesmanager.md#tojson)

## Constructors

### constructor

\+ **new SourceFilesManager**(`appRoot`: string, `options`: [SourceFilesManagerOptions](../modules/src.md#sourcefilesmanageroptions)): _[SourceFilesManager](src.sourcefilesmanager.md)_

**Parameters:**

| Name      | Type                                                                     |
| --------- | ------------------------------------------------------------------------ |
| `appRoot` | string                                                                   |
| `options` | [SourceFilesManagerOptions](../modules/src.md#sourcefilesmanageroptions) |

**Returns:** _[SourceFilesManager](src.sourcefilesmanager.md)_

## Methods

### add

▸ **add**(`filePath`: string): _void_

Add a new source file to the list of project files. This is helpful
when new source files are added after the initial typescript
build.

**Parameters:**

| Name       | Type   |
| ---------- | ------ |
| `filePath` | string |

**Returns:** _void_

---

### bumpVersion

▸ **bumpVersion**(`filePath`: string): _void_

Bumps the project file version. This is required to tell the
typescript compiler that file has been changed.

**Parameters:**

| Name       | Type   |
| ---------- | ------ |
| `filePath` | string |

**Returns:** _void_

---

### getFileVersion

▸ **getFileVersion**(`filePath`: string): _null | number_

Returns file version

**Parameters:**

| Name       | Type   |
| ---------- | ------ |
| `filePath` | string |

**Returns:** _null | number_

---

### isSourceFile

▸ **isSourceFile**(`filePath`: string): _boolean_

Returns true when filePath is part of the source files after checking
them against `includes`, `excludes` and custom set of `files`.

**Parameters:**

| Name       | Type   |
| ---------- | ------ |
| `filePath` | string |

**Returns:** _boolean_

---

### remove

▸ **remove**(`filePath`: string): _void_

Remove file from the list of existing source files

**Parameters:**

| Name       | Type   |
| ---------- | ------ |
| `filePath` | string |

**Returns:** _void_

---

### toJSON

▸ **toJSON**(): _MapLike‹object›_

Returns a copy of project source files

**Returns:** _MapLike‹object›_
