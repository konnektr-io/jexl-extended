# JEXL Extended - Monaco Editor Integration

The `jexl-extended` package includes built-in Monaco Editor language support for enhanced development experience.

## Installation

```bash
npm install jexl-extended monaco-editor
```

## Quick Setup

### Method 1: Using the Main Package Export (Recommended)

```typescript
import * as monaco from "monaco-editor";
import { Monaco } from "jexl-extended";

// Register JEXL language support
Monaco.registerJexlLanguage(monaco);

// Create an editor with JEXL support
const editor = Monaco.createJexlEditor(
  monaco,
  document.getElementById("editor"),
  {
    value: 'users|filter("value.age > 18")|map("value.name")|join(", ")',
    theme: "vs-dark",
  }
);
```

### Method 2: Importing Specific Components

```typescript
import * as monaco from "monaco-editor";
import {
  jexlMonarchLanguage,
  jexlLanguageConfiguration,
  createJexlCompletionItems,
  registerJexlLanguage,
} from "jexl-extended/dist/monaco";

// Register the language
registerJexlLanguage(monaco);
```

### Method 3: Manual Setup (Advanced)

```typescript
import * as monaco from "monaco-editor";
import {
  jexlMonarchLanguage,
  jexlLanguageConfiguration,
  createJexlCompletionItems,
  createJexlKeywords,
  createJexlOperators,
} from "jexl-extended/dist/monaco";

// Register language
monaco.languages.register({
  id: "jexl",
  extensions: [".jexl"],
  aliases: ["JEXL", "jexl"],
  mimetypes: ["text/jexl"],
});

// Set language configuration
monaco.languages.setLanguageConfiguration("jexl", jexlLanguageConfiguration);

// Set syntax highlighting
monaco.languages.setMonarchTokensProvider("jexl", jexlMonarchLanguage);

// Add completion provider
monaco.languages.registerCompletionItemProvider("jexl", {
  provideCompletionItems: (model, position) => {
    const word = model.getWordUntilPosition(position);
    const range = {
      startLineNumber: position.lineNumber,
      endLineNumber: position.lineNumber,
      startColumn: word.startColumn,
      endColumn: word.endColumn,
    };

    return {
      suggestions: [
        ...createJexlCompletionItems().map((item) => ({ ...item, range })),
        ...createJexlKeywords().map((item) => ({ ...item, range })),
        ...createJexlOperators().map((item) => ({ ...item, range })),
      ],
    };
  },
});
```

## Complete Example with Evaluation

```typescript
import * as monaco from "monaco-editor";
import JexlExtended, { Monaco } from "jexl-extended";

// Initialize JEXL evaluator
const jexl = new JexlExtended();

// Sample data
const data = {
  users: [
    { name: "Alice", age: 28, active: true },
    { name: "Bob", age: 32, active: false },
    { name: "Charlie", age: 24, active: true },
  ],
};

// Setup editor
Monaco.registerJexlLanguage(monaco);
const editor = Monaco.createJexlEditor(
  monaco,
  document.getElementById("editor"),
  {
    value: 'users|filter("value.active")|map("value.name")|join(", ")',
    theme: "vs-dark",
  }
);

// Add evaluation on Ctrl+Enter
editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
  const expression = editor.getValue();
  try {
    const result = jexl.evalSync(expression, data);
    console.log("Result:", result);
  } catch (error) {
    console.error("Error:", error.message);
  }
});
```

## Features

### Syntax Highlighting

- **Keywords**: `true`, `false`, `null`, `and`, `or`, `not`, `in`
- **Operators**: All JEXL operators including transform pipes (`|`)
- **Functions**: All 80+ JEXL Extended functions
- **Literals**: Strings, numbers, arrays, objects
- **Comments**: Line (`//`) and block (`/* */`) comments

### IntelliSense Completion

Complete auto-completion for all JEXL Extended functions:

- **String Functions**: `length`, `substring`, `uppercase`, `trim`, `split`, etc.
- **Math Functions**: `abs`, `floor`, `ceil`, `round`, `sum`, `max`, `min`, etc.
- **Array Functions**: `map`, `filter`, `sort`, `reduce`, `join`, `distinct`, etc.
- **Object Functions**: `keys`, `values`, `entries`, `merge`
- **Date/Time Functions**: `now`, `millis`, `toDateTime`, `dateTimeAdd`, etc.
- **Type Conversion**: `toString`, `toNumber`, `toBoolean`, `parseInteger`
- **Utility Functions**: `eval`, `uuid`, `base64Encode`, `base64Decode`

### Hover Documentation

Hover over any JEXL function to see:

- Function description
- Usage examples
- Parameter information

### Code Folding

Automatic folding support for:

- Array literals `[...]`
- Object literals `{...}`

## Import Paths Reference

All Monaco-related exports are available under the `Monaco` namespace:

```typescript
// Main exports
import { Monaco } from "jexl-extended";

// Individual imports
import {
  registerJexlLanguage,
  createJexlEditor,
  jexlMonarchLanguage,
  jexlLanguageConfiguration,
  createJexlCompletionItems,
  createJexlKeywords,
  createJexlOperators,
  JEXL_LANGUAGE_ID,
} from "jexl-extended/dist/monaco";

// Type imports
import type {
  ILanguageConfiguration,
  IMonarchLanguage,
  ICompletionItem,
  ICompletionList,
} from "jexl-extended/dist/monaco";
```

## Browser Usage

For browser environments, you can load Monaco and JEXL Extended via CDN:

```html
<script src="https://unpkg.com/monaco-editor@latest/min/vs/loader.js"></script>
<script src="https://unpkg.com/jexl-extended@latest/dist/index.js"></script>

<script>
  require.config({
    paths: { vs: "https://unpkg.com/monaco-editor@latest/min/vs" },
  });
  require(["vs/editor/editor.main"], function () {
    // JEXL Extended is available as window.JexlExtended
    const { Monaco } = window.JexlExtended;

    Monaco.registerJexlLanguage(monaco);
    const editor = Monaco.createJexlEditor(
      monaco,
      document.getElementById("editor"),
      {
        value: 'data|filter("value.active")|map("value.name")|join(", ")',
        theme: "vs-dark",
      }
    );
  });
</script>
```

## Package Integration

The Monaco language definitions are included directly in the `jexl-extended` package under the `/monaco` export. This means:

1. **No separate installation required** - Monaco support comes with `jexl-extended`
2. **Version synchronization** - Language definitions stay in sync with JEXL functions
3. **Optional dependency** - Monaco is not required unless you use the Monaco features
4. **Type safety** - Full TypeScript support with proper type definitions

## Browser Support

The Monaco integration works in all modern browsers that support Monaco Editor. Make sure to:

1. Include Monaco Editor in your project
2. Configure your bundler to handle Monaco's worker files
3. Set up proper CSP headers if needed

## TypeScript Support

Full TypeScript support is included with proper type definitions for all Monaco integration functions.

```typescript
import type { Monaco } from "jexl-extended";

// All types are properly exported
const config: Monaco.ILanguageConfiguration = Monaco.jexlLanguageConfiguration;
const language: Monaco.IMonarchLanguage = Monaco.jexlMonarchLanguage;
```
