[@poppinss/chokidar-ts](../README.md) › [src](../modules/src.md) › [PluginManager](src.pluginmanager.md)

# Class: PluginManager

Exposes the API to register plugins and get typescript compiler
transformers

## Hierarchy

* **PluginManager**

## Index

### Methods

* [getTransformers](src.pluginmanager.md#gettransformers)
* [use](src.pluginmanager.md#use)

## Methods

###  getTransformers

▸ **getTransformers**(`ts`: typeof tsStatic, `options`: tsStatic.CompilerOptions): *CustomTransformers*

Returns transformers based upon the registered plugins

**Parameters:**

Name | Type |
------ | ------ |
`ts` | typeof tsStatic |
`options` | tsStatic.CompilerOptions |

**Returns:** *CustomTransformers*

___

###  use

▸ **use**(`transformer`: [PluginFn](../modules/src.md#pluginfn), `lifecycle`: "before" | "after"): *this*

Hook plugin to define custom transformers

**Parameters:**

Name | Type |
------ | ------ |
`transformer` | [PluginFn](../modules/src.md#pluginfn) |
`lifecycle` | "before" &#124; "after" |

**Returns:** *this*
