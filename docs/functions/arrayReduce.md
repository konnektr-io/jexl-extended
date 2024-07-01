[**jexl-extended**](../README.md) • **Docs**

***

[jexl-extended](../globals.md) / arrayReduce

# Function: arrayReduce()

> **arrayReduce**(`input`, `expression`, `initialValue`): `unknown`

Returns an aggregated value derived from applying the function parameter successively to each value in array in combination with the result of the previous application of the function.
The expression must be a valid JEXL expression string, and behaves like an infix operator between each value within the array.
The relative context provided to the expression is an object with the properties accumulator, value, index and array (the original array).

## Parameters

• **input**: `unknown`[]

• **expression**: `string`

• **initialValue**: `unknown`

## Returns

`unknown`

## Defined in

[extended-grammar.ts:504](https://github.com/nikoraes/jexl-extended/blob/db8adde102268337995e72b2224f129152316ed5/src/extended-grammar.ts#L504)
