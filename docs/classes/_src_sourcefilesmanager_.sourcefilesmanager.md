[@poppinss/chokidar-ts](../README.md) › ["src/SourceFilesManager"](../modules/_src_sourcefilesmanager_.md) › [SourceFilesManager](_src_sourcefilesmanager_.sourcefilesmanager.md)

# Class: SourceFilesManager

Exposes the API to manage the source files for a typescript project. You need
full blown source files management during the watch mode, since new files
are added and removed regularly.

## Hierarchy

* **SourceFilesManager**

## Index

### Constructors

* [constructor](_src_sourcefilesmanager_.sourcefilesmanager.md#constructor)

### Methods

* [add](_src_sourcefilesmanager_.sourcefilesmanager.md#add)
* [bumpVersion](_src_sourcefilesmanager_.sourcefilesmanager.md#bumpversion)
* [getFileVersion](_src_sourcefilesmanager_.sourcefilesmanager.md#getfileversion)
* [isSourceFile](_src_sourcefilesmanager_.sourcefilesmanager.md#issourcefile)
* [remove](_src_sourcefilesmanager_.sourcefilesmanager.md#remove)
* [toJSON](_src_sourcefilesmanager_.sourcefilesmanager.md#tojson)

## Constructors

###  constructor

\+ **new SourceFilesManager**(`_appRoot`: string, `_options`: [SourceFilesManagerOptions](../modules/_src_contracts_.md#sourcefilesmanageroptions)): *[SourceFilesManager](_src_sourcefilesmanager_.sourcefilesmanager.md)*

**Parameters:**

Name | Type |
------ | ------ |
`_appRoot` | string |
`_options` | [SourceFilesManagerOptions](../modules/_src_contracts_.md#sourcefilesmanageroptions) |

**Returns:** *[SourceFilesManager](_src_sourcefilesmanager_.sourcefilesmanager.md)*

## Methods

###  add

▸ **add**(`filePath`: string): *void*

Add a new source file to the list of project files. This is helpful
when new source files are added after the initial typescript
build.

**Parameters:**

Name | Type |
------ | ------ |
`filePath` | string |

**Returns:** *void*

___

###  bumpVersion

▸ **bumpVersion**(`filePath`: string): *void*

Bumps the project file version. This is required to tell the
typescript compiler that file has been changed.

**Parameters:**

Name | Type |
------ | ------ |
`filePath` | string |

**Returns:** *void*

___

###  getFileVersion

▸ **getFileVersion**(`filePath`: string): *null | number*

Returns file version

**Parameters:**

Name | Type |
------ | ------ |
`filePath` | string |

**Returns:** *null | number*

___

###  isSourceFile

▸ **isSourceFile**(`filePath`: string): *boolean*

Returns true when filePath is part of the source files after checking
them against `includes`, `excludes` and custom set of `files`.

**Parameters:**

Name | Type |
------ | ------ |
`filePath` | string |

**Returns:** *boolean*

___

###  remove

▸ **remove**(`filePath`: string): *void*

Remove file from the list of existing source files

**Parameters:**

Name | Type |
------ | ------ |
`filePath` | string |

**Returns:** *void*

___

###  toJSON

▸ **toJSON**(): *MapLike‹object›*

Returns a copy of project source files

**Returns:** *MapLike‹object›*
