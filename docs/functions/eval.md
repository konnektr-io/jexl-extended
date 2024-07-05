[**jexl-extended**](../README.md) • **Docs**

***

[jexl-extended](../globals.md) / \_eval

# Function: \_eval()

> **\_eval**(`input`, `expression`): `any`

Evaluate provided and return the result.
If only one argument is provided, it is expected that the first argument is a JEXL expression.
If two arguments are provided, the first argument is the context (must be an object) and the second argument is the JEXL expression.
The expression uses the default JEXL extended grammar and can't use any custom defined functions or transforms.

## Parameters

• **input**: `unknown`

• **expression**: `string`

## Returns

`any`

## Defined in

[extended-grammar.ts:594](https://github.com/nikoraes/jexl-extended/blob/0d088073b18839315bb7964d107cdd49b0d074cd/src/extended-grammar.ts#L594)
