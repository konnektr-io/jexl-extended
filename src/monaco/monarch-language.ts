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

  // Keywords (JEXL operators and logical keywords)
  keywords: [
    'true', 'false', 'null', 'undefined',
    'and', 'or', 'not', 'in',
    'if', 'else', 'endif'
  ],

  // Operators
  operators: [
    '=', '>', '<', '!', '~', '?', ':',
    '==', '<=', '>=', '!=', '&&', '||', '++', '--',
    '+', '-', '*', '/', '&', '|', '^', '%', '<<',
    '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=',
    '^=', '%=', '<<=', '>>=', '>>>='
  ],

  // Common delimiters and separators
  symbols: /[=><!~?:&|+\-*\/\^%]+/,

  // String and transform functions from jexl-extended
  builtinFunctions: [
    // Type conversion
    'string', '$string', 'json', '$json', 'parseJson', '$parseJson', 'toJson',
    'number', '$number', 'toNumber', 'parseFloat', '$parseFloat', 'float', 'toFloat',
    'boolean', '$boolean', 'toBoolean', 'bool', '$bool', 'toBool',
    'parseInteger', 'parseInt', '$parseInteger', 'toInt', 'integer',
    
    // String functions
    'length', '$length', 'count', '$count', 'size', '$size',
    'substring', '$substring', 'substringBefore', '$substringBefore',
    'substringAfter', '$substringAfter', 'uppercase', '$uppercase', 'upper', '$upper',
    'lowercase', '$lowercase', 'lower', '$lower', 'camelCase', '$camelCase',
    'toCamelCase', 'pascalCase', '$pascalCase', 'toPascalCase', 'trim', '$trim',
    'pad', '$pad', 'contains', '$contains', 'includes', '$includes',
    'startsWith', '$startsWith', 'endsWith', '$endsWith', 'split', '$split',
    'replace', '$replace', 'base64Encode', '$base64Encode', 'base64Decode', '$base64Decode',
    'formUrlEncoded', '$formUrlEncoded',
    
    // Math functions
    'abs', '$abs', 'floor', '$floor', 'ceil', '$ceil', 'round', '$round',
    'power', '$power', 'sqrt', '$sqrt', 'random', '$random',
    'formatNumber', '$formatNumber', 'formatBase', '$formatBase',
    'formatInteger', '$formatInteger', 'sum', '$sum', 'max', '$max',
    'min', '$min', 'average', 'avg', '$average',
    
    // Logic functions
    'not', '$not', 'case', '$case', 'switch', '$switch',
    
    // Array functions
    'append', '$append', 'concat', '$concat', 'reverse', '$reverse',
    'shuffle', '$shuffle', 'sort', '$sort', 'order', '$order',
    'distinct', '$distinct', 'toObject', '$toObject', 'fromEntries', '$fromEntries',
    'mapField', '$mapField', 'map', '$map', 'any', '$any', 'some', '$some',
    'all', '$all', 'every', '$every', 'filter', '$filter', 'find', '$find',
    'reduce', '$reduce', 'join', '$join',
    
    // Object functions
    'keys', '$keys', 'values', '$values', 'entries', '$entries',
    'merge', '$merge',
    
    // Date/Time functions
    'now', '$now', 'millis', '$millis', 'millisToDateTime', '$millisToDateTime',
    'fromMillis', '$fromMillis', 'toDateTime', '$toDateTime', 'dateTimeString',
    'dateTimeToMillis', '$dateTimeToMillis', 'toMillis', '$toMillis',
    'dateTimeFormat', '$dateTimeFormat', 'dateTimeAdd', '$dateTimeAdd',
    
    // Utility functions
    'eval', '$eval', 'uuid', '$uuid', 'uid', '$uid'
  ],

  // The main tokenizer for the JEXL language
  tokenizer: {
    root: [
      // Identifiers and keywords
      [/[a-zA-Z_$][\w$]*/, {
        cases: {
          '@keywords': 'keyword',
          '@builtinFunctions': 'function.builtin',
          '@default': 'identifier'
        }
      }],

      // Transform pipe operator
      [/\|/, 'operator.pipe'],

      // Property access with dot notation
      [/\.[\w$]+/, 'property'],

      // Array access and filters
      [/\[/, { token: 'delimiter.bracket', bracket: '@open', next: '@arrayAccess' }],

      // Object literals
      [/\{/, { token: 'delimiter.curly', bracket: '@open', next: '@objectLiteral' }],

      // Function calls
      [/([a-zA-Z_$][\w$]*)\s*(\()/, ['function', 'delimiter.parenthesis']],

      // Parentheses for grouping
      [/\(/, { token: 'delimiter.parenthesis', bracket: '@open' }],
      [/\)/, { token: 'delimiter.parenthesis', bracket: '@close' }],

      // Numbers
      [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
      [/0[xX][0-9a-fA-F]+/, 'number.hex'],
      [/\d+/, 'number'],

      // Strings
      [/"([^"\\]|\\.)*$/, 'string.invalid'],  // non-terminated string
      [/'([^'\\]|\\.)*$/, 'string.invalid'],  // non-terminated string
      [/"/, { token: 'string.quote', bracket: '@open', next: '@string_double' }],
      [/'/, { token: 'string.quote', bracket: '@open', next: '@string_single' }],

      // Template literals (for expressions within strings)
      [/`/, { token: 'string.quote', bracket: '@open', next: '@string_backtick' }],

      // Operators
      [/@symbols/, {
        cases: {
          '@operators': 'operator',
          '@default': ''
        }
      }],

      // Delimiters
      [/[;,.]/, 'delimiter'],

      // Whitespace
      { include: '@whitespace' }
    ],

    // Array access context (for filters and indexing)
    arrayAccess: [
      [/\]/, { token: 'delimiter.bracket', bracket: '@close', next: '@pop' }],
      [/\.[\w$]+/, 'property'],
      [/==|!=|<=|>=|<|>/, 'operator.comparison'],
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

    string_backtick: [
      [/[^\\`$]+/, 'string'],
      [/\$\{/, { token: 'delimiter.bracket', next: '@expressionInTemplate' }],
      [/\\./, 'string.escape'],
      [/`/, { token: 'string.quote', bracket: '@close', next: '@pop' }]
    ],

    // Expression within template literals
    expressionInTemplate: [
      [/\}/, { token: 'delimiter.bracket', next: '@pop' }],
      { include: '@root' }
    ],

    // Whitespace and comments
    whitespace: [
      [/[ \t\r\n]+/, 'white'],
      [/\/\*/, 'comment', '@comment'],
      [/\/\/.*$/, 'comment']
    ],

    comment: [
      [/[^\/*]+/, 'comment'],
      [/\/\*/, 'comment', '@push'],    // nested comment
      ["\\*/", 'comment', '@pop'],
      [/[\/*]/, 'comment']
    ]
  }
};
