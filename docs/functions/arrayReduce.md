[**jexl-extended**](../README.md) • **Docs**

***

[jexl-extended](../README.md) / arrayReduce

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

[extended-grammar.ts:502](https://github.com/nikoraes/jexl-extended/blob/0f5e836bd796a7ceb7bc07f325b2ca770e2551a1/src/extended-grammar.ts#L502)
