[**jexl-extended**](../README.md) • **Docs**

***

[jexl-extended](../README.md) / arrayFilter

# Function: arrayFilter()

> **arrayFilter**(`input`, `expression`): `unknown`[]

Returns a new array with the elements of the input array that match the specified expression.
The expression must be a valid JEXL expression string, and is applied to each element of the array.
The relative context provided to the expression is an object with the properties value and array (the original array).

## Parameters

• **input**: `unknown`[]

• **expression**: `string`

## Returns

`unknown`[]

## Defined in

[extended-grammar.ts:489](https://github.com/nikoraes/jexl-extended/blob/0f5e836bd796a7ceb7bc07f325b2ca770e2551a1/src/extended-grammar.ts#L489)
