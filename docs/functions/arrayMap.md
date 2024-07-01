[**jexl-extended**](../README.md) • **Docs**

***

[jexl-extended](../README.md) / arrayMap

# Function: arrayMap()

> **arrayMap**(`input`, `expression`): `any`[]

Returns an array containing the results of applying the expression parameter to each value in the array parameter.
The expression must be a valid JEXL expression string, which is applied to each element of the array.
The relative context provided to the expression is an object with the properties value, index and array (the original array).

## Parameters

• **input**: `unknown`[]

• **expression**: `string`

## Returns

`any`[]

## Defined in

[extended-grammar.ts:449](https://github.com/nikoraes/jexl-extended/blob/0f5e836bd796a7ceb7bc07f325b2ca770e2551a1/src/extended-grammar.ts#L449)
