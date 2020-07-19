[@poppinss/chokidar-ts](../README.md) › [src](../modules/src.md) › [ConfigParser](src.configparser.md)

# Class: ConfigParser

Exposes the API to parse typescript config

## Hierarchy

* **ConfigParser**

## Index

### Constructors

* [constructor](src.configparser.md#constructor)

### Methods

* [parse](src.configparser.md#parse)

## Constructors

###  constructor

\+ **new ConfigParser**(`cwd`: string, `configFileName`: string, `ts`: typeof tsStatic): *[ConfigParser](src.configparser.md)*

**Parameters:**

Name | Type |
------ | ------ |
`cwd` | string |
`configFileName` | string |
`ts` | typeof tsStatic |

**Returns:** *[ConfigParser](src.configparser.md)*

## Methods

###  parse

▸ **parse**(`optionsToExtend?`: tsStatic.CompilerOptions): *object*

Parses the typescript config file

**Parameters:**

Name | Type |
------ | ------ |
`optionsToExtend?` | tsStatic.CompilerOptions |

**Returns:** *object*

* **config**? : *tsStatic.ParsedCommandLine*

* **error**: *tsStatic.Diagnostic | null*
