import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Completion Documentation', () => {
  const completionDocsPath = path.join(__dirname, '..', 'dist', 'completion-docs.json');

  it('should generate completion docs file', () => {
    expect(fs.existsSync(completionDocsPath)).toBe(true);
  });

  it('should contain valid JSON with expected structure', () => {
    const completionDocs = JSON.parse(fs.readFileSync(completionDocsPath, 'utf8'));
    
    expect(Array.isArray(completionDocs)).toBe(true);
    expect(completionDocs.length).toBeGreaterThan(100); // Should have many functions/transforms
    
    // Check structure of first item
    const firstItem = completionDocs[0];
    expect(firstItem).toHaveProperty('type');
    expect(firstItem).toHaveProperty('name');
    expect(firstItem).toHaveProperty('label');
    expect(firstItem).toHaveProperty('description');
    expect(firstItem).toHaveProperty('documentation');
    expect(firstItem).toHaveProperty('insertText');
    
    // Type should be either 'function' or 'transform'
    expect(['function', 'transform']).toContain(firstItem.type);
  });

  it('should differentiate between functions and transforms', () => {
    const completionDocs = JSON.parse(fs.readFileSync(completionDocsPath, 'utf8'));
    
    const functions = completionDocs.filter((item: any) => item.type === 'function');
    const transforms = completionDocs.filter((item: any) => item.type === 'transform');
    
    expect(functions.length).toBeGreaterThan(0);
    expect(transforms.length).toBeGreaterThan(0);
    
    // Functions should have insertText with parentheses
    const functionWithParams = functions.find((fn: any) => fn.parameters && fn.parameters.length > 0);
    if (functionWithParams) {
      expect(functionWithParams.insertText).toMatch(/\(\$\{.*\}\)/);
    }
    
    // Transforms should not have parentheses in insertText
    const transformItem = transforms[0];
    expect(transformItem.insertText).not.toMatch(/\(/);
  });

  it('should include examples for functions with JSDoc examples', () => {
    const completionDocs = JSON.parse(fs.readFileSync(completionDocsPath, 'utf8'));
    
    // Find a function that should have examples (like absoluteValue)
    const absFunction = completionDocs.find((item: any) => item.name === 'absoluteValue');
    expect(absFunction).toBeDefined();
    expect(absFunction.examples).toBeDefined();
    expect(Array.isArray(absFunction.examples)).toBe(true);
    expect(absFunction.examples.length).toBeGreaterThan(0);
  });
});
