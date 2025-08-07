/**
 * Monaco Editor Completion Provider for JEXL
 * This provides IntelliSense completion items without requiring Monaco as a dependency
 */

// Import completion docs directly (generated file)
import { completionDocs, type CompletionDocItem } from './completion-docs.generated';

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

export function createJexlCompletionItems(type?: 'function' | 'transform'): ICompletionItem[] {
  const filteredDocs = type ? completionDocs.filter(doc => doc.type === type) : completionDocs;
  
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

export function getJexlCompletionDoc(functionName: string, preferredType?: 'function' | 'transform'): CompletionDocItem | undefined {
  // Find all matches for the function name
  const matches = completionDocs.filter(doc => 
    doc.label === functionName || 
    doc.name === functionName || 
    doc.aliases?.includes(functionName)
  );
  
  if (matches.length === 0) {
    return undefined;
  }
  
  // If we have a preferred type, try to find that first
  if (preferredType) {
    const preferredMatch = matches.find(doc => doc.type === preferredType);
    if (preferredMatch) {
      return preferredMatch;
    }
  }
  
  // Otherwise return the first match
  return matches[0];
}

export function getOperatorDoc(operator: string): { label: string; documentation: string; detail: string } | undefined {
  const operators = createJexlOperators();
  const operatorItem = operators.find(op => op.label === operator);
  
  if (operatorItem) {
    return {
      label: operatorItem.label,
      documentation: operatorItem.documentation || '',
      detail: operatorItem.detail || 'JEXL Operator'
    };
  }
  
  return undefined;
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
    { label: '|', desc: 'Transform pipe operator' },
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
