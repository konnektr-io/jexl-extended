/**
 * Monaco Editor Monarch Language Definition for JEXL
 * This provides the syntax highlighting rules without requiring Monaco as a dependency
 */

export interface IMonarchLanguage {
  defaultToken?: string;
  ignoreCase?: boolean;
  keywords?: string[];
  operators?: string[];
  symbols?: RegExp;
  builtinFunctions?: string[];
  tokenizer: any;
}

export const jexlMonarchLanguage: IMonarchLanguage = {
  // Set defaultToken to invalid to see what tokens are missed
  defaultToken: 'invalid',

  // Keywords (JEXL literals and reserved words)
  keywords: [
    'true', 'false', 'null', 'undefined', 'in'
  ],

  // Operators (accurate JEXL operators from grammar)
  operators: [
    '+', '-', '*', '/', '//', '%', '^',
    '==', '!=', '>', '>=', '<', '<=',
    '&&', '||', '!', 'in'
  ],

  // Common delimiters and separators (JEXL specific)
  symbols: /[+\-*\/%\^=!><&|?:]+/,

  // The main tokenizer for the JEXL language
  tokenizer: {
    root: [
      // Strings first (to avoid interference)
      [/"([^"\\]|\\.)*$/, 'string.invalid'],  // non-terminated string
      [/'([^'\\]|\\.)*$/, 'string.invalid'],  // non-terminated string
      [/"/, { token: 'string.quote', bracket: '@open', next: '@string_double' }],
      [/'/, { token: 'string.quote', bracket: '@open', next: '@string_single' }],

      // Numbers (including negative numbers)
      [/-?\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
      [/0[xX][0-9a-fA-F]+/, 'number.hex'],
      [/-?\d+/, 'number'],

      // Multi-character operators (must come before single character ones)
      [/==|!=|<=|>=|&&|\|\||\/\//, 'operator'],
      
      // Transform pipe operator - followed by transform name
      [/\|/, { token: 'operator.pipe', next: '@afterPipe' }],
      
      // Single character operators and symbols
      [/[+\-*\/%\^><!=?:]/, 'operator'],
      
      // Function calls: any identifier followed by opening parenthesis
      [/\$?[a-zA-Z_$][\w$]*(?=\s*\()/, 'function'],

      // Keywords
      [/\b(true|false|null|undefined|in)\b/, 'keyword'],

      // Property access with dot notation (including leading dot for filters)
      [/\.[\w$]+/, 'property'],

      // Array access and filters
      [/\[/, { token: 'delimiter.bracket', bracket: '@open', next: '@arrayAccess' }],

      // Object literals
      [/\{/, { token: 'delimiter.curly', bracket: '@open', next: '@objectLiteral' }],

      // Parentheses for grouping
      [/\(/, { token: 'delimiter.parenthesis', bracket: '@open' }],
      [/\)/, { token: 'delimiter.parenthesis', bracket: '@close' }],

      // Regular identifiers (variables)
      [/[a-zA-Z_$][\w$]*/, 'identifier'],

      // Delimiters
      [/[;,]/, 'delimiter'],
      [/\./, 'delimiter.dot'],

      // Whitespace
      { include: '@whitespace' }
    ],

    // After pipe operator - next identifier is a transform
    afterPipe: [
      [/\s+/, 'white'],
      [/[a-zA-Z_$][\w$]*/, { token: 'transform', next: '@pop' }],
      [/./, { token: '@rematch', next: '@pop' }]
    ],

    // Array access context (for filters and indexing)
    arrayAccess: [
      [/\]/, { token: 'delimiter.bracket', bracket: '@close', next: '@pop' }],
      
      // Property access within array filters (e.g., .attributeName)
      [/\.[\w$]+/, 'property'],
      
      // Comparison operators
      [/==|!=|<=|>=|<|>/, 'operator.comparison'],
      
      // Logical operators
      [/&&|\|\|/, 'operator.logical'],
      
      // Numbers in array context
      [/-?\d+(\.\d+)?/, 'number'],
      
      // Strings in array context
      [/"([^"\\]|\\.)*"/, 'string'],
      [/'([^'\\]|\\.)*'/, 'string'],
      
      // Identifiers in array context
      [/[a-zA-Z_$][\w$]*/, 'identifier'],
      
      // Other operators
      [/[+\-*\/%\^!]/, 'operator'],
      
      { include: '@root' }
    ],

    // Object literal context
    objectLiteral: [
      [/\}/, { token: 'delimiter.curly', bracket: '@close', next: '@pop' }],
      [/[a-zA-Z_$][\w$]*(?=\s*:)/, 'key'],
      [/:/, 'delimiter'],
      { include: '@root' }
    ],

    // String handling
    string_double: [
      [/[^\\"]+/, 'string'],
      [/\\./, 'string.escape.invalid'],
      [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }]
    ],

    string_single: [
      [/[^\\']+/, 'string'],
      [/\\./, 'string.escape.invalid'],
      [/'/, { token: 'string.quote', bracket: '@close', next: '@pop' }]
    ],

    // Whitespace (JEXL does not support comments)
    whitespace: [
      [/[ \t\r\n]+/, 'white']
    ]
  }
};
