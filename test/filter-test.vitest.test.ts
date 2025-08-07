import { describe, it, expect } from 'vitest';
import { getJexlCompletionDoc } from '../src/monaco/completion-provider';

describe('Filter Function Test', () => {
  it('should find documentation for filter function', () => {
    const doc = getJexlCompletionDoc('filter');
    console.log('Filter doc:', doc);
    expect(doc).toBeDefined();
    expect(doc?.name).toBe('arrayFilter');
    expect(doc?.label).toBe('filter');
  });
});
