[**jexl-extended**](../README.md) • **Docs**

***

[jexl-extended](../globals.md) / arrayFind

# Function: arrayFind()

> **arrayFind**(`input`, `expression`): `unknown`

Finds the first element in an array that matches the specified expression.
The expression must be a valid JEXL expression string, and is applied to each element of the array.
The relative context provided to the expression is an object with the properties value and array (the original array).

## Parameters

• **input**: `unknown`[]

• **expression**: `string`

## Returns

`unknown`

## Defined in

[extended-grammar.ts:471](https://github.com/nikoraes/jexl-extended/blob/06a031f168fa218082d7ed9df57973f42e70c755/src/extended-grammar.ts#L471)
