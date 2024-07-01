[**jexl-extended**](../README.md) • **Docs**

***

[jexl-extended](../globals.md) / arrayFilter

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

[extended-grammar.ts:491](https://github.com/nikoraes/jexl-extended/blob/db8adde102268337995e72b2224f129152316ed5/src/extended-grammar.ts#L491)
