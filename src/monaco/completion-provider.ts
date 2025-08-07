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

export interface CompletionDocItem {
  type: 'function' | 'transform';
  name: string;
  label: string;
  description: string;
  detail: string;
  documentation: string;
  examples: string[];
  parameters: {
    name: string;
    description: string;
    type: string;
    optional: boolean;
  }[];
  returns: {
    type: string;
    description: string;
  };
  insertText: string;
  aliases?: string[];
}

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

// Load completion documentation from generated file
let completionDocsCache: CompletionDocItem[] | null = null;

function loadCompletionDocs(): CompletionDocItem[] {
  if (completionDocsCache) {
    return completionDocsCache;
  }
  
  try {
    // In Node.js environment, try to load from file system
    if (typeof require !== 'undefined') {
      const fs = require('fs');
      const path = require('path');
      const docsPath = path.resolve(__dirname, '../../dist/completion-docs.json');
      if (fs.existsSync(docsPath)) {
        const data = fs.readFileSync(docsPath, 'utf8');
        completionDocsCache = JSON.parse(data);
        return completionDocsCache;
      }
    }
  } catch (error) {
    console.warn('Could not load completion docs from file system:', error);
  }
  
  // Fallback to embedded documentation
  completionDocsCache = getFallbackCompletionDocs();
  return completionDocsCache;
}

function getFallbackCompletionDocs(): CompletionDocItem[] {
  // Fallback documentation for when the generated file is not available
  return [
    {
      type: 'function',
      name: 'toString',
      label: 'string',
      description: 'Casts the input to a string',
      detail: 'JEXL Function',
      documentation: 'Casts the input to a string\n\n**Examples:**\n`string(123) // "123"`\n`123|string // "123"`',
      examples: ['string(123) // "123"', '123|string // "123"'],
      parameters: [
        { name: 'input', description: 'The input can be any type.', type: 'unknown', optional: false },
        { name: 'prettify', description: 'If true, the output will be pretty-printed.', type: 'boolean', optional: true }
      ],
      returns: { type: 'string', description: 'The input converted to a JSON string representation.' },
      insertText: 'string(${1:input})'
    }
    // Add more fallback items as needed
  ];
}

export function createJexlCompletionItems(type?: 'function' | 'transform'): ICompletionItem[] {
  const docs = loadCompletionDocs();
  const filteredDocs = type ? docs.filter(doc => doc.type === type) : docs;
  
  return filteredDocs.map(doc => {
    const kind = doc.type === 'function' ? CompletionItemKind.Function : CompletionItemKind.Method;
    
    return {
      label: doc.label,
      kind,
      insertText: doc.insertText,
      insertTextRules: 4, // InsertTextRule.InsertAsSnippet
      documentation: doc.documentation,
      detail: doc.detail
    };
  });
}

export function createJexlFunctionItems(): ICompletionItem[] {
  return createJexlCompletionItems('function');
}

export function createJexlTransformItems(): ICompletionItem[] {
  return createJexlCompletionItems('transform');
}

export function getJexlCompletionDoc(functionName: string): CompletionDocItem | undefined {
  const docs = loadCompletionDocs();
  return docs.find(doc => doc.label === functionName || doc.name === functionName || doc.aliases?.includes(functionName));
}

export function createJexlKeywords(): ICompletionItem[] {
  // Accurate JEXL keywords based on actual grammar
  const keywords = ['true', 'false', 'null', 'undefined', 'in'];
  
  return keywords.map(keyword => ({
    label: keyword,
    kind: CompletionItemKind.Keyword,
    insertText: keyword,
    documentation: `JEXL keyword: ${keyword}`,
    detail: 'JEXL Keyword'
  }));
}

export function createJexlOperators(): ICompletionItem[] {
  // Accurate JEXL operators based on actual grammar
  const operators = [
    { label: '==', desc: 'Equality comparison' },
    { label: '!=', desc: 'Inequality comparison' },
    { label: '>', desc: 'Greater than' },
    { label: '<', desc: 'Less than' },
    { label: '>=', desc: 'Greater than or equal' },
    { label: '<=', desc: 'Less than or equal' },
    { label: '&&', desc: 'Logical AND' },
    { label: '||', desc: 'Logical OR' },
    { label: '!', desc: 'Logical NOT' },
    { label: 'in', desc: 'Membership test' },
    { label: '|', desc: 'Transform pipe operator' },
    { label: '+', desc: 'Addition' },
    { label: '-', desc: 'Subtraction' },
    { label: '*', desc: 'Multiplication' },
    { label: '/', desc: 'Division' },
    { label: '//', desc: 'Floor division' },
    { label: '%', desc: 'Modulus' },
    { label: '^', desc: 'Exponentiation' },
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
