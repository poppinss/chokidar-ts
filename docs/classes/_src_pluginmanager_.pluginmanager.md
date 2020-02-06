[@poppinss/chokidar-ts](../README.md) › ["src/PluginManager"](../modules/_src_pluginmanager_.md) › [PluginManager](_src_pluginmanager_.pluginmanager.md)

# Class: PluginManager

Exposes the API to register plugins and get typescript compiler
transformers

## Hierarchy

* **PluginManager**

## Index

### Methods

* [getTransformers](_src_pluginmanager_.pluginmanager.md#gettransformers)
* [use](_src_pluginmanager_.pluginmanager.md#use)

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

▸ **use**(`transformer`: [PluginFn](../modules/_src_contracts_.md#pluginfn), `lifecycle`: "before" | "after"): *this*

Hook plugin to define custom transformers

**Parameters:**

Name | Type |
------ | ------ |
`transformer` | [PluginFn](../modules/_src_contracts_.md#pluginfn) |
`lifecycle` | "before" &#124; "after" |

**Returns:** *this*
