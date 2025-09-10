# Jexl Extended Grammar

This package includes an extended grammar for the [Jexl expression parser and evaluator](https://github.com/TomFrost/Jexl) by TomFrost.

## Features

- 🚀 **80+ Built-in Functions** - String manipulation, math, arrays, objects, dates, and more
- 🎨 **Monaco Editor Support** - Syntax highlighting, IntelliSense, and hover documentation  
- 📝 **TypeScript Support** - Full type definitions included
- 🔧 **Modular** - Use the entire library or import individual functions
- 🎮 **Interactive Playground** - Try expressions online at [nikoraes.github.io/jexl-playground/](https://nikoraes.github.io/jexl-playground/)

## Installation

```bash
npm install jexl-extended
```

## Quick Start

```javascript
import jexl from 'jexl-extended';

const data = [
  {name: "John", age: 32}, 
  {name: "Jane", age: 34}, 
  {name: "Bob", age: 33}
];

const result = jexl.evalSync('data|filter("value.age > 32")|map("value.name")|join(", ")', {data});
// "Jane, Bob"
```

## Monaco Editor Integration

Get a rich IDE experience for JEXL expressions:

```typescript
import * as monaco from 'monaco-editor';
import { Monaco } from 'jexl-extended';

// Register JEXL language support
Monaco.registerJexlLanguage(monaco);

// Create editor with JEXL support
const editor = Monaco.createJexlEditor(monaco, document.getElementById('editor'), {
  value: 'users|filter("value.active")|map("value.name")|sort',
  theme: 'vs-dark'
});
```

[📖 See full Monaco integration guide](./MONACO.md)

It is also possible to use the extended grammar in the original Jexl library by importing parts of the grammar you need and adding it to the Jexl instance.

```javascript
import jexl from 'jexl';
import { arrayMap } from 'jexl-extended/extended-grammar';

jexl.addTransform('map', arrayMap);
const result = jexl.evalSync('[{name:"tek",age:32}, {name:"bar",age:34}, {name:"baz",age:33}, {name:"foo",age:35}]|map("value.age")');
// [32, 34, 33, 35]
```

## Other Language Implementations

This extended grammar is also available in other programming languages:

- **C#**: [JexlNet](https://github.com/nikoraes/JexlNet) - A C# implementation of JEXL with extended grammar support
- **Python**: [pyjexl-extended](https://github.com/nikoraes/pyjexl-extended) - Python implementation with extended functions and transforms

## Related Projects

- [Jexl](https://github.com/TomFrost/Jexl) - The original JavaScript implementation of JEXL that this library extends
- [jexl-rs](https://github.com/mozilla/jexl-rs) - A Rust-based JEXL parser and evaluator
- [PyJEXL](https://github.com/mozilla/pyjexl) - Mozilla's Python-based JEXL parser and evaluator
