import jexl from './src'
import typedoc from './docs/typedoc.json'
import fs from 'fs'
import { GrammarType } from './src'

interface Grammar {
    elements: { [symbol: string]: Element };
    functions: { [name: string]: (...args: unknown[]) => unknown };
    transforms: { [name: string]: (...args: [unknown, ...unknown[]]) => unknown };
}

interface CompletionDocItem {
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

const libs = {
    [GrammarType.Function]: jexl._grammar.functions,
    [GrammarType.Transform]: (jexl._grammar as unknown as Grammar).transforms
}

function extractExamples(commentSummary: any[], blockTags: any[]): string[] {
    const examples: string[] = [];
    
    // Look for @example tags
    const exampleTags = blockTags?.filter(tag => tag.tag === '@example') || [];
    
    for (const exampleTag of exampleTags) {
        for (const content of exampleTag.content || []) {
            if (content.kind === 'code') {
                // Extract code examples, removing markdown code blocks
                const codeText = content.text
                    .replace(/```[a-zA-Z]*\n?/g, '') // Remove code block markers
                    .split('\n')
                    .map(line => line.trim())
                    .filter(line => line.length > 0 && !line.startsWith('//'))
                    .slice(0, 3); // Limit to 3 examples
                
                examples.push(...codeText);
            } else if (content.kind === 'text') {
                // Handle inline examples
                const lines = content.text.split('\n')
                    .map(line => line.trim())
                    .filter(line => line.length > 0 && !line.startsWith('//'))
                    .slice(0, 3);
                
                examples.push(...lines);
            }
        }
    }
    
    return examples;
}

function getReturnInfo(signature: any): { type: string; description: string } {
    const returnType = signature.type?.name || signature.type?.type || 'unknown';
    
    // Look for @returns tag
    const returnsTag = signature.comment?.blockTags?.find((tag: any) => tag.tag === '@returns');
    const returnDescription = returnsTag?.content?.[0]?.text || '';
    
    return {
        type: returnType,
        description: returnDescription
    };
}

function getParameters(signature: any): CompletionDocItem['parameters'] {
    if (!signature.parameters) return [];
    
    return signature.parameters.map((param: any) => ({
        name: param.name,
        description: param.comment?.summary?.[0]?.text || '',
        type: param.type?.name || param.type?.type || 'unknown',
        optional: param.flags?.isOptional || false
    }));
}

function createInsertText(functionName: string, parameters: CompletionDocItem['parameters'], type: 'function' | 'transform'): string {
    if (type === 'transform') {
        // Transforms skip the first parameter (the piped value) and only include additional parameters
        const additionalParams = parameters.slice(1);
        
        if (additionalParams.length === 0) {
            // No additional parameters, just the transform name
            return functionName;
        }
        
        // Include parameter placeholders for additional parameters
        const paramPlaceholders = additionalParams.map((param, index) => {
            const placeholder = param.optional ? `\${${index + 1}:${param.name}?}` : `\${${index + 1}:${param.name}}`;
            return placeholder;
        }).join(', ');
        
        return `${functionName}(${paramPlaceholders})`;
    }
    
    // Functions use parentheses
    if (parameters.length === 0) {
        return `${functionName}()`;
    }
    
    const paramPlaceholders = parameters.map((param, index) => {
        const placeholder = param.optional ? `\${${index + 1}:${param.name}?}` : `\${${index + 1}:${param.name}}`;
        return placeholder;
    }).join(', ');
    
    return `${functionName}(${paramPlaceholders})`;
}

function mapTypeToCompletionType(grammarType: string): 'function' | 'transform' {
    return grammarType === GrammarType.Function ? 'function' : 'transform';
}

export const completionDocs: CompletionDocItem[] = [];
const seenItems = new Set<string>(); // Track seen function:type combinations to avoid duplicates

for (const [type, lib] of Object.entries(libs)) {
    for (const key in lib) {
        if (key.startsWith('$')) continue;
        
        const functionName = lib[key].name;
        const doc = typedoc.children.find((child: any) => child.name === functionName);
        
        if (!doc) {
            console.warn(`No documentation found for ${functionName}`);
            continue;
        }
        
        const signature = doc.signatures?.[0];
        if (!signature) {
            console.warn(`No signature found for ${functionName}`);
            continue;
        }
        
        const description = signature.comment?.summary?.[0]?.text || '';
        const examples = extractExamples(signature.comment?.summary || [], signature.comment?.blockTags || []);
        const parameters = getParameters(signature);
        const returnInfo = getReturnInfo(signature);
        
        // Create documentation string for Monaco hover
        const exampleText = examples.length > 0 
            ? `\n\n**Examples:**\n${examples.map(ex => `\`${ex}\``).join('\n')}`
            : '';
        
        const paramText = parameters.length > 0
            ? `\n\n**Parameters:**\n${parameters.map(p => `- \`${p.name}\` (${p.type}${p.optional ? '?' : ''}): ${p.description}`).join('\n')}`
            : '';
        
        const returnText = returnInfo.description 
            ? `\n\n**Returns:** ${returnInfo.description}`
            : '';
        
        const completionType = mapTypeToCompletionType(type);
        
        // Create the base completion item
        const createCompletionItem = (itemType: 'function' | 'transform'): CompletionDocItem => ({
            type: itemType,
            name: functionName,
            label: key,
            description: description.split('\n')[0], // First line for brief description
            detail: `JEXL ${itemType}`,
            documentation: `${description}${exampleText}${paramText}${returnText}`,
            examples,
            parameters,
            returns: returnInfo,
            insertText: createInsertText(key, parameters, itemType),
            // Add aliases if the key differs from function name
            aliases: key !== functionName ? [functionName] : undefined
        });

        // For functions from the "functions" library
        if (completionType === 'function') {
            // Always add the function version
            const functionKey = `${functionName}:function`;
            if (!seenItems.has(functionKey)) {
                seenItems.add(functionKey);
                completionDocs.push(createCompletionItem('function'));
            } else {
                // Add as alias to existing function
                const existingItem = completionDocs.find(item => item.name === functionName && item.type === 'function');
                if (existingItem && key !== functionName) {
                    if (!existingItem.aliases) {
                        existingItem.aliases = [];
                    }
                    if (!existingItem.aliases.includes(key)) {
                        existingItem.aliases.push(key);
                    }
                }
            }
            
            // If it has 1+ parameters, also add a transform version
            if (parameters.length > 0) {
                const transformKey = `${functionName}:transform`;
                if (!seenItems.has(transformKey)) {
                    seenItems.add(transformKey);
                    completionDocs.push(createCompletionItem('transform'));
                } else {
                    // Add as alias to existing transform
                    const existingItem = completionDocs.find(item => item.name === functionName && item.type === 'transform');
                    if (existingItem && key !== functionName) {
                        if (!existingItem.aliases) {
                            existingItem.aliases = [];
                        }
                        if (!existingItem.aliases.includes(key)) {
                            existingItem.aliases.push(key);
                        }
                    }
                }
            }
        } else {
            // For transforms from the "transforms" library, only add transform version
            const transformKey = `${functionName}:transform`;
            if (!seenItems.has(transformKey)) {
                seenItems.add(transformKey);
                completionDocs.push(createCompletionItem('transform'));
            } else {
                // Add as alias to existing transform
                const existingItem = completionDocs.find(item => item.name === functionName && item.type === 'transform');
                if (existingItem && key !== functionName) {
                    if (!existingItem.aliases) {
                        existingItem.aliases = [];
                    }
                    if (!existingItem.aliases.includes(key)) {
                        existingItem.aliases.push(key);
                    }
                }
            }
        }
    }
}

// Sort by type and then by name for better organization
completionDocs.sort((a, b) => {
    if (a.type !== b.type) {
        return a.type === 'function' ? -1 : 1; // Functions first
    }
    return a.label.localeCompare(b.label);
});

// Save output as TypeScript file for direct import
const tsContent = `// Auto-generated completion documentation
// This file is generated by completion-docs.ts - do not edit manually

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

export const completionDocs: CompletionDocItem[] = ${JSON.stringify(completionDocs, null, 2)};
`;

const tsOutputPath = './src/monaco/completion-docs.generated.ts';
fs.writeFileSync(tsOutputPath, tsContent);

console.info(`TypeScript completion docs generated (${tsOutputPath})`);
console.info(`Generated documentation for ${completionDocs.length} items:`);
console.info(`- Functions: ${completionDocs.filter(item => item.type === 'function').length}`);
console.info(`- Transforms: ${completionDocs.filter(item => item.type === 'transform').length}`);
