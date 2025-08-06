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

  // Functions and transforms from jexl-extended (automatically generated)
  builtinFunctions: [
    '$abs', '$all', '$any', '$append', '$average', '$base64Decode', '$base64Encode',
    '$bool', '$boolean', '$camelCase', '$case', '$ceil', '$concat', '$contains',
    '$count', '$dateTimeAdd', '$dateTimeFormat', '$dateTimeToMillis', '$distinct',
    '$endsWith', '$entries', '$eval', '$every', '$filter', '$find', '$floor',
    '$formUrlEncoded', '$formatBase', '$formatInteger', '$formatNumber',
    '$fromEntries', '$fromMillis', '$includes', '$join', '$json', '$keys', '$length',
    '$lower', '$lowercase', '$map', '$mapField', '$max', '$merge', '$millis',
    '$millisToDateTime', '$min', '$not', '$now', '$number', '$order', '$pad',
    '$parseFloat', '$parseInteger', '$parseJson', '$pascalCase', '$power', '$random',
    '$reduce', '$replace', '$reverse', '$round', '$shuffle', '$size', '$some',
    '$sort', '$split', '$sqrt', '$startsWith', '$string', '$substring',
    '$substringAfter', '$substringBefore', '$sum', '$switch', '$toDateTime',
    '$toMillis', '$toObject', '$trim', '$uid', '$upper', '$uppercase', '$uuid',
    '$values', 'abs', 'all', 'any', 'append', 'average', 'avg', 'base64Decode',
    'base64Encode', 'bool', 'boolean', 'camelCase', 'camelcase', 'case', 'ceil',
    'concat', 'contains', 'count', 'dateTimeAdd', 'dateTimeFormat', 'dateTimeString',
    'dateTimeToMillis', 'distinct', 'endsWith', 'entries', 'eval', 'every', 'filter',
    'find', 'float', 'floor', 'formUrlEncoded', 'formatBase', 'formatInteger',
    'formatNumber', 'fromEntries', 'fromMillis', 'includes', 'integer', 'join',
    'json', 'keys', 'length', 'lower', 'lowercase', 'map', 'mapField', 'max',
    'merge', 'millis', 'millisToDateTime', 'min', 'not', 'now', 'number', 'order',
    'pad', 'parseFloat', 'parseInt', 'parseInteger', 'parseJson', 'pascalCase',
    'pascalcase', 'power', 'random', 'reduce', 'replace', 'reverse', 'round',
    'shuffle', 'size', 'some', 'sort', 'split', 'sqrt', 'startsWith', 'string',
    'substring', 'substringAfter', 'substringBefore', 'sum', 'switch', 'toBool',
    'toBoolean', 'toCamelCase', 'toDateTime', 'toFloat', 'toInt', 'toJson',
    'toMillis', 'toNumber', 'toObject', 'toPascalCase', 'trim', 'uid', 'upper',
    'uppercase', 'uuid', 'values'
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

      // Strings (JEXL supports single and double quotes only)
      [/"([^"\\]|\\.)*$/, 'string.invalid'],  // non-terminated string
      [/'([^'\\]|\\.)*$/, 'string.invalid'],  // non-terminated string
      [/"/, { token: 'string.quote', bracket: '@open', next: '@string_double' }],
      [/'/, { token: 'string.quote', bracket: '@open', next: '@string_single' }],

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

    // Whitespace (JEXL does not support comments)
    whitespace: [
      [/[ \t\r\n]+/, 'white']
    ]
  }
};
