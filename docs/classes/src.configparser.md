[@poppinss/chokidar-ts](../README.md) › [src](../modules/src.md) › [ConfigParser](src.configparser.md)

# Class: ConfigParser

Exposes the API to parse typescript config

## Hierarchy

- **ConfigParser**

## Index

### Constructors

- [constructor](src.configparser.md#constructor)

### Methods

- [parse](src.configparser.md#parse)

## Constructors

### constructor

\+ **new ConfigParser**(`cwd`: string, `configFileName`: string, `ts`: typeof tsStatic): _[ConfigParser](src.configparser.md)_

**Parameters:**

| Name             | Type            |
| ---------------- | --------------- |
| `cwd`            | string          |
| `configFileName` | string          |
| `ts`             | typeof tsStatic |

**Returns:** _[ConfigParser](src.configparser.md)_

## Methods

### parse

▸ **parse**(`optionsToExtend?`: tsStatic.CompilerOptions): _object_

Parses the typescript config file

**Parameters:**

| Name               | Type                     |
| ------------------ | ------------------------ |
| `optionsToExtend?` | tsStatic.CompilerOptions |

**Returns:** _object_

- **config**? : _tsStatic.ParsedCommandLine_

- **error**: _tsStatic.Diagnostic | null_
