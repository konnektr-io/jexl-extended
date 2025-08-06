/**
 * Monaco Editor Completion Provider for JEXL
 * This provides IntelliSense completion items without requiring Monaco as a dependency
 */

export interface ICompletionItem {
  label: string;
  kind: number;
  insertText: string;
  insertTextRules?: number;
  documentation?: string;
  detail?: string;
}

export interface ICompletionList {
  suggestions: ICompletionItem[];
}

// JEXL function documentation
const functionDocs: Record<string, { description: string; example: string }> = {
  // String functions
  'length': { description: 'Returns the length of a string or array', example: '"hello"|length // 5' },
  'substring': { description: 'Extracts a substring from a string', example: '"hello"|substring(1, 3) // "el"' },
  'substringBefore': { description: 'Gets substring before a delimiter', example: '"hello-world"|substringBefore("-") // "hello"' },
  'substringAfter': { description: 'Gets substring after a delimiter', example: '"hello-world"|substringAfter("-") // "world"' },
  'uppercase': { description: 'Converts string to uppercase', example: '"hello"|uppercase // "HELLO"' },
  'lowercase': { description: 'Converts string to lowercase', example: '"HELLO"|lowercase // "hello"' },
  'camelCase': { description: 'Converts string to camelCase', example: '"hello world"|camelCase // "helloWorld"' },
  'pascalCase': { description: 'Converts string to PascalCase', example: '"hello world"|pascalCase // "HelloWorld"' },
  'trim': { description: 'Removes whitespace from both ends', example: '" hello "|trim // "hello"' },
  'pad': { description: 'Pads string to specified length', example: '"hi"|pad(5, "0") // "hi000"' },
  'contains': { description: 'Checks if string contains substring', example: '"hello"|contains("ell") // true' },
  'split': { description: 'Splits string into array', example: '"a,b,c"|split(",") // ["a", "b", "c"]' },
  'replace': { description: 'Replaces occurrences in string', example: '"hello"|replace("l", "x") // "hexxo"' },
  'base64Encode': { description: 'Encodes string to base64', example: '"hello"|base64Encode // "aGVsbG8="' },
  'base64Decode': { description: 'Decodes base64 string', example: '"aGVsbG8="|base64Decode // "hello"' },

  // Math functions
  'abs': { description: 'Returns absolute value', example: '-5|abs // 5' },
  'floor': { description: 'Rounds down to nearest integer', example: '3.7|floor // 3' },
  'ceil': { description: 'Rounds up to nearest integer', example: '3.2|ceil // 4' },
  'round': { description: 'Rounds to nearest integer', example: '3.7|round // 4' },
  'power': { description: 'Raises number to power', example: '2|power(3) // 8' },
  'sqrt': { description: 'Returns square root', example: '9|sqrt // 3' },
  'random': { description: 'Returns random number between 0-1', example: 'random() // 0.123...' },
  'sum': { description: 'Sums array of numbers', example: '[1,2,3]|sum // 6' },
  'max': { description: 'Returns maximum value', example: '[1,5,3]|max // 5' },
  'min': { description: 'Returns minimum value', example: '[1,5,3]|min // 1' },
  'average': { description: 'Returns average of numbers', example: '[1,2,3]|average // 2' },

  // Array functions
  'append': { description: 'Appends item to array', example: '[1,2]|append(3) // [1,2,3]' },
  'reverse': { description: 'Reverses array order', example: '[1,2,3]|reverse // [3,2,1]' },
  'shuffle': { description: 'Randomly shuffles array', example: '[1,2,3]|shuffle // [2,1,3]' },
  'sort': { description: 'Sorts array', example: '[3,1,2]|sort // [1,2,3]' },
  'distinct': { description: 'Removes duplicates from array', example: '[1,2,2,3]|distinct // [1,2,3]' },
  'map': { description: 'Transforms each array element', example: 'users|map("value.name") // ["John", "Jane"]' },
  'filter': { description: 'Filters array elements', example: 'users|filter("value.age > 30") // filtered array' },
  'find': { description: 'Finds first matching element', example: 'users|find("value.name == \'John\'") // first match' },
  'reduce': { description: 'Reduces array to single value', example: '[1,2,3]|reduce("accumulator + value", 0) // 6' },
  'join': { description: 'Joins array elements into string', example: '[1,2,3]|join(",") // "1,2,3"' },
  'any': { description: 'Tests if any element matches', example: 'users|any("value.age > 30") // true/false' },
  'every': { description: 'Tests if all elements match', example: 'users|every("value.age > 18") // true/false' },

  // Object functions
  'keys': { description: 'Returns object keys as array', example: '{a:1,b:2}|keys // ["a","b"]' },
  'values': { description: 'Returns object values as array', example: '{a:1,b:2}|values // [1,2]' },
  'entries': { description: 'Returns key-value pairs', example: '{a:1}|entries // [["a",1]]' },
  'merge': { description: 'Merges objects', example: '{a:1}|merge({b:2}) // {a:1,b:2}' },

  // Type conversion
  'toString': { description: 'Converts value to string', example: '123|toString // "123"' },
  'toNumber': { description: 'Converts value to number', example: '"123"|toNumber // 123' },
  'toBoolean': { description: 'Converts value to boolean', example: '"true"|toBoolean // true' },
  'parseInteger': { description: 'Parses string to integer', example: '"123"|parseInteger // 123' },

  // Date/Time functions
  'now': { description: 'Returns current date/time', example: 'now() // "2023-12-25T10:30:00Z"' },
  'millis': { description: 'Returns current timestamp', example: 'millis() // 1703505000000' },
  'toDateTime': { description: 'Converts to date/time', example: '1703505000000|toDateTime // "2023-12-25T10:30:00Z"' },
  'dateTimeToMillis': { description: 'Converts date to timestamp', example: '"2023-12-25T10:30:00Z"|dateTimeToMillis // 1703505000000' },
  'dateTimeAdd': { description: 'Adds time to date', example: 'now()|dateTimeAdd("day", 1) // tomorrow' },

  // Utility functions
  'eval': { description: 'Evaluates JEXL expression', example: '"1+2"|eval // 3' },
  'uuid': { description: 'Generates UUID', example: 'uuid() // "123e4567-e89b-12d3-a456-426614174000"' },
  'not': { description: 'Logical NOT operation', example: 'true|not // false' }
};

// Monaco CompletionItemKind enum values (to avoid Monaco dependency)
export const CompletionItemKind = {
  Method: 0,
  Function: 1,
  Constructor: 2,
  Field: 3,
  Variable: 4,
  Class: 5,
  Struct: 6,
  Interface: 7,
  Module: 8,
  Property: 9,
  Event: 10,
  Operator: 11,
  Unit: 12,
  Value: 13,
  Constant: 14,
  Enum: 15,
  EnumMember: 16,
  Keyword: 17,
  Text: 18,
  Color: 19,
  File: 20,
  Reference: 21,
  Customcolor: 22,
  Folder: 23,
  TypeParameter: 24,
  User: 25,
  Issue: 26,
  Snippet: 27
};

export function createJexlCompletionItems(): ICompletionItem[] {
  const functions = Object.keys(functionDocs);
  
  return functions.map(func => {
    const doc = functionDocs[func];
    return {
      label: func,
      kind: CompletionItemKind.Function,
      insertText: func + '(${1})',
      insertTextRules: 4, // InsertTextRule.InsertAsSnippet
      documentation: `${doc.description}\n\nExample: ${doc.example}`,
      detail: 'JEXL Function'
    };
  });
}

export function createJexlKeywords(): ICompletionItem[] {
  const keywords = ['true', 'false', 'null', 'undefined', 'and', 'or', 'not', 'in', 'if', 'else', 'endif'];
  
  return keywords.map(keyword => ({
    label: keyword,
    kind: CompletionItemKind.Keyword,
    insertText: keyword,
    documentation: `JEXL keyword: ${keyword}`,
    detail: 'JEXL Keyword'
  }));
}

export function createJexlOperators(): ICompletionItem[] {
  const operators = [
    { label: '==', desc: 'Equality comparison' },
    { label: '!=', desc: 'Inequality comparison' },
    { label: '>', desc: 'Greater than' },
    { label: '<', desc: 'Less than' },
    { label: '>=', desc: 'Greater than or equal' },
    { label: '<=', desc: 'Less than or equal' },
    { label: '&&', desc: 'Logical AND' },
    { label: '||', desc: 'Logical OR' },
    { label: '|', desc: 'Transform pipe operator' },
    { label: '+', desc: 'Addition' },
    { label: '-', desc: 'Subtraction' },
    { label: '*', desc: 'Multiplication' },
    { label: '/', desc: 'Division' },
    { label: '%', desc: 'Modulus' },
    { label: '?', desc: 'Conditional operator' },
    { label: ':', desc: 'Conditional separator' }
  ];
  
  return operators.map(op => ({
    label: op.label,
    kind: CompletionItemKind.Operator,
    insertText: op.label,
    documentation: op.desc,
    detail: 'JEXL Operator'
  }));
}
