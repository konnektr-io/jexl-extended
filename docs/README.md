**jexl-extended** • [**Docs**](globals.md)

***

# Jexl Extended Grammar

This package includes an extended grammar for the [Jexl expression parser and evaluator](https://github.com/TomFrost/Jexl).

## Installation

```bash
npm install jexl-extended
```

## Usage

Use the entire library as you would the original Jexl library, but import from `jexl-extended` instead of `jexl`.

```javascript
import jexl from 'jexl-extended';

const result = jexl.evalSync('[{name:"tek",age:32}, {name:"bar",age:34}, {name:"baz",age:33}, {name:"foo",age:35}]|map("value.age")');
// [32, 34, 33, 35]

```

It is also possible to use the extended grammar in the original Jexl library by importing parts of the grammar you need and adding it to the Jexl instance.

```javascript
import jexl from 'jexl';
import { arrayMap } from 'jexl-extended/extended-grammar';

jexl.addTransform('map', arrayMap);
const result = jexl.evalSync('[{name:"tek",age:32}, {name:"bar",age:34}, {name:"baz",age:33}, {name:"foo",age:35}]|map("value.age")');
// [32, 34, 33, 35]
```
