import { describe, it, expect } from 'vitest';
import { getJexlCompletionDoc } from '../src/monaco/completion-provider';

describe('Completion Provider', () => {
  it('should find documentation for function names', () => {
    const doc = getJexlCompletionDoc('abs');
    expect(doc).toBeDefined();
    expect(doc?.name).toBe('absoluteValue');
    expect(doc?.label).toBe('abs');
  });

  it('should find documentation for function aliases', () => {
    const doc = getJexlCompletionDoc('absoluteValue');
    expect(doc).toBeDefined();
    expect(doc?.name).toBe('absoluteValue');
    expect(doc?.label).toBe('abs');
  });

  it('should return undefined for unknown functions', () => {
    const doc = getJexlCompletionDoc('unknownFunction');
    expect(doc).toBeUndefined();
  });

  it('should find documentation for transform names', () => {
    const doc = getJexlCompletionDoc('uppercase');
    expect(doc).toBeDefined();
  });
});
