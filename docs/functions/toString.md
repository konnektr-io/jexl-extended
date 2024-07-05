[**jexl-extended**](../README.md) • **Docs**

***

[jexl-extended](../globals.md) / toString

# Function: toString()

> **toString**(`input`, `prettify`): `string`

Casts the input to a string.

## Parameters

• **input**: `unknown`

The input can be any type.

• **prettify**: `boolean` = `false`

If true, the output will be pretty-printed.

## Returns

`string`

## Example

```jexl
string(123) // "123"
123|string // "123"
```

## Defined in

[extended-grammar.ts:19](https://github.com/nikoraes/jexl-extended/blob/6615aed6c8a07c2ecf0502c413d5c565a91b5f13/src/extended-grammar.ts#L19)
