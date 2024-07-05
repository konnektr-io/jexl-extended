[**jexl-extended**](../README.md) • **Docs**

***

[jexl-extended](../globals.md) / arrayMap

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

[extended-grammar.ts:418](https://github.com/nikoraes/jexl-extended/blob/6615aed6c8a07c2ecf0502c413d5c565a91b5f13/src/extended-grammar.ts#L418)
