/**
 * Monaco Editor Language Registration for JEXL
 * Helper functions to register JEXL language support with Monaco Editor
 */

import { jexlLanguageConfiguration } from './language-configuration';
import { jexlMonarchLanguage } from './monarch-language';
import { 
  createJexlCompletionItems, 
  createJexlFunctionItems,
  createJexlTransformItems,
  createJexlKeywords, 
  createJexlOperators,
  getJexlCompletionDoc
} from './completion-provider';

export const JEXL_LANGUAGE_ID = 'jexl';

/**
 * Registers JEXL language support with Monaco Editor
 * @param monaco - The Monaco Editor instance
 */
export function registerJexlLanguage(monaco: any) {
  // Register the language
  monaco.languages.register({
    id: JEXL_LANGUAGE_ID,
    extensions: ['.jexl'],
    aliases: ['JEXL', 'jexl'],
    mimetypes: ['text/jexl']
  });

  // Set language configuration
  monaco.languages.setLanguageConfiguration(JEXL_LANGUAGE_ID, jexlLanguageConfiguration);

  // Set monarch tokenizer
  monaco.languages.setMonarchTokensProvider(JEXL_LANGUAGE_ID, jexlMonarchLanguage);

  // Register completion provider
  monaco.languages.registerCompletionItemProvider(JEXL_LANGUAGE_ID, {
    provideCompletionItems: function(model: any, position: any) {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn
      };

      // Check if we're after a pipe operator
      const textBeforeCursor = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column
      });

      // Look for the last pipe operator before the cursor
      const lastPipeIndex = textBeforeCursor.lastIndexOf('|');
      const isAfterPipe = lastPipeIndex !== -1 && 
        // Make sure there's no significant content after the pipe (just whitespace and partial word)
        /^\s*\w*$/.test(textBeforeCursor.substring(lastPipeIndex + 1));
      
      // Debug logging (can be removed in production)
      console.log('Completion context:', {
        textBeforeCursor,
        lastPipeIndex,
        afterPipe: lastPipeIndex !== -1 ? textBeforeCursor.substring(lastPipeIndex + 1) : 'none',
        isAfterPipe
      });

      if (isAfterPipe) {
        // After pipe: only show transforms
        const transformItems = createJexlTransformItems();
        return {
          suggestions: transformItems.map(item => ({ ...item, range }))
        };
      } else {
        // Regular context: show functions and keywords (no operators to avoid duplicates)
        const functionItems = createJexlFunctionItems();
        const keywordItems = createJexlKeywords();

        return {
          suggestions: [
            ...functionItems.map(item => ({ ...item, range })),
            ...keywordItems.map(item => ({ ...item, range }))
          ]
        };
      }
    }
  });

  // Register hover provider
  monaco.languages.registerHoverProvider(JEXL_LANGUAGE_ID, {
    provideHover: function(model: any, position: any) {
      const word = model.getWordAtPosition(position);
      if (!word) return;

      console.log('Hover for word:', word.word);

      // Get documentation for the specific function/transform
      const doc = getJexlCompletionDoc(word.word);

      console.log('Found doc:', doc ? doc.label : 'none');

      if (doc) {
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn
          ),
          contents: [
            { value: `**${doc.label}** (${doc.type}) - ${doc.detail}` },
            { value: doc.documentation }
          ]
        };
      }
    }
  });

  // Register folding provider for arrays and objects
  monaco.languages.registerFoldingRangeProvider(JEXL_LANGUAGE_ID, {
    provideFoldingRanges: function(model: any) {
      const ranges: any[] = [];
      const text = model.getValue();
      const lines = text.split('\n');

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Find opening brackets/braces
        for (let j = 0; j < line.length; j++) {
          if (line[j] === '[' || line[j] === '{') {
            const openChar = line[j];
            const closeChar = openChar === '[' ? ']' : '}';
            
            // Find matching closing bracket/brace
            let depth = 1;
            let found = false;
            
            for (let k = i; k < lines.length && !found; k++) {
              const startPos = k === i ? j + 1 : 0;
              const searchLine = lines[k];
              
              for (let l = startPos; l < searchLine.length; l++) {
                if (searchLine[l] === openChar) {
                  depth++;
                } else if (searchLine[l] === closeChar) {
                  depth--;
                  if (depth === 0) {
                    // Found matching closing bracket
                    if (k > i) { // Only fold if spans multiple lines
                      ranges.push({
                        start: i + 1,
                        end: k + 1,
                        kind: monaco.languages.FoldingRangeKind.Region
                      });
                    }
                    found = true;
                    break;
                  }
                }
              }
            }
          }
        }
      }

      return ranges;
    }
  });
}

/**
 * Creates a Monaco Editor instance with JEXL language support
 * @param monaco - The Monaco Editor instance
 * @param container - The DOM element to mount the editor
 * @param options - Editor options
 * @returns Monaco Editor instance
 */
export function createJexlEditor(monaco: any, container: HTMLElement, options: any = {}) {
  // Ensure JEXL language is registered
  registerJexlLanguage(monaco);

  return monaco.editor.create(container, {
    language: JEXL_LANGUAGE_ID,
    theme: 'vs-dark',
    automaticLayout: true,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    fontSize: 14,
    lineNumbers: 'on',
    folding: true,
    ...options
  });
}
