[@poppinss/chokidar-ts](../README.md) › ["src/ConfigParser"](../modules/_src_configparser_.md) › [ConfigParser](_src_configparser_.configparser.md)

# Class: ConfigParser

Exposes the API to parse typescript config

## Hierarchy

* **ConfigParser**

## Index

### Constructors

* [constructor](_src_configparser_.configparser.md#constructor)

### Methods

* [parse](_src_configparser_.configparser.md#parse)

## Constructors

###  constructor

\+ **new ConfigParser**(`cwd`: string, `configFileName`: string, `ts`: typeof tsStatic): *[ConfigParser](_src_configparser_.configparser.md)*

**Parameters:**

Name | Type |
------ | ------ |
`cwd` | string |
`configFileName` | string |
`ts` | typeof tsStatic |

**Returns:** *[ConfigParser](_src_configparser_.configparser.md)*

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
