[**jexl-extended**](../README.md) • **Docs**

***

[jexl-extended](../globals.md) / arrayAny

# Function: arrayAny()

> **arrayAny**(`input`, `expression`): `boolean`

Checks whether the provided array has any elements that match the specified expression.
The expression must be a valid JEXL expression string, and is applied to each element of the array.
The relative context provided to the expression is an object with the properties value and array (the original array).

## Parameters

• **input**: `unknown`[]

• **expression**: `string`

## Returns

`boolean`

## Defined in

[extended-grammar.ts:431](https://github.com/nikoraes/jexl-extended/blob/0d088073b18839315bb7964d107cdd49b0d074cd/src/extended-grammar.ts#L431)
