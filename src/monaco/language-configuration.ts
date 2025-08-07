/**
 * Monaco Editor Language Configuration for JEXL
 * This provides the basic language configuration without requiring Monaco as a dependency
 */

export interface ILanguageConfiguration {
  comments?: {
    lineComment?: string;
    blockComment?: [string, string];
  };
  brackets?: [string, string][];
  autoClosingPairs?: Array<{ open: string; close: string; notIn?: string[] }>;
  surroundingPairs?: Array<{ open: string; close: string }>;
  folding?: {
    markers?: {
      start: RegExp;
      end: RegExp;
    };
  };
}

export const jexlLanguageConfiguration: ILanguageConfiguration = {
  // JEXL does not support comments - removed comment configuration
  brackets: [
    ['{', '}'],
    ['[', ']'],
    ['(', ')']
  ],
  autoClosingPairs: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '"', close: '"' },
    { open: "'", close: "'" }
  ],
  surroundingPairs: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '"', close: '"' },
    { open: "'", close: "'" }
  ]
  // Removed folding configuration as JEXL doesn't support comments
};
