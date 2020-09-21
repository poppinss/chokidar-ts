**@poppinss/chokidar-ts**

> [Globals](../README.md) / [src](../modules/src.md) / SourceFilesManager

# Class: SourceFilesManager

Exposes the API to manage the source files for a typescript project. You need
full blown source files management during the watch mode, since new files
are added and removed regularly.

## Hierarchy

* **SourceFilesManager**

## Index

### Constructors

* [constructor](src.sourcefilesmanager.md#constructor)

### Methods

* [add](src.sourcefilesmanager.md#add)
* [bumpVersion](src.sourcefilesmanager.md#bumpversion)
* [getFileVersion](src.sourcefilesmanager.md#getfileversion)
* [isSourceFile](src.sourcefilesmanager.md#issourcefile)
* [remove](src.sourcefilesmanager.md#remove)
* [toJSON](src.sourcefilesmanager.md#tojson)

## Constructors

### constructor

\+ **new SourceFilesManager**(`appRoot`: string, `options`: [SourceFilesManagerOptions](../modules/src.md#sourcefilesmanageroptions)): [SourceFilesManager](src.sourcefilesmanager.md)

#### Parameters:

Name | Type |
------ | ------ |
`appRoot` | string |
`options` | [SourceFilesManagerOptions](../modules/src.md#sourcefilesmanageroptions) |

**Returns:** [SourceFilesManager](src.sourcefilesmanager.md)

## Methods

### add

▸ **add**(`filePath`: string): void

Add a new source file to the list of project files. This is helpful
when new source files are added after the initial typescript
build.

#### Parameters:

Name | Type |
------ | ------ |
`filePath` | string |

**Returns:** void

___

### bumpVersion

▸ **bumpVersion**(`filePath`: string): void

Bumps the project file version. This is required to tell the
typescript compiler that file has been changed.

#### Parameters:

Name | Type |
------ | ------ |
`filePath` | string |

**Returns:** void

___

### getFileVersion

▸ **getFileVersion**(`filePath`: string): null \| number

Returns file version

#### Parameters:

Name | Type |
------ | ------ |
`filePath` | string |

**Returns:** null \| number

___

### isSourceFile

▸ **isSourceFile**(`filePath`: string): boolean

Returns true when filePath is part of the source files after checking
them against `includes`, `excludes` and custom set of `files`.

#### Parameters:

Name | Type |
------ | ------ |
`filePath` | string |

**Returns:** boolean

___

### remove

▸ **remove**(`filePath`: string): void

Remove file from the list of existing source files

#### Parameters:

Name | Type |
------ | ------ |
`filePath` | string |

**Returns:** void

___

### toJSON

▸ **toJSON**(): MapLike\<{ version: number  }>

Returns a copy of project source files

**Returns:** MapLike\<{ version: number  }>
