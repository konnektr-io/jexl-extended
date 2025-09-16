import { describe, it, expect } from "vitest";
import {
  getJexlCompletionDoc,
  createJexlCompletionItems,
} from "../src/monaco/completion-provider";

describe("Completion Provider", () => {
  it("should find documentation for function names", () => {
    const doc = getJexlCompletionDoc("abs");
    expect(doc).toBeDefined();
    expect(doc?.name).toBe("absoluteValue");
    expect(doc?.label).toBe("abs");
  });

  it("should find documentation for function aliases", () => {
    const doc = getJexlCompletionDoc("absoluteValue");
    expect(doc).toBeDefined();
    expect(doc?.name).toBe("absoluteValue");
    expect(doc?.label).toBe("abs");
  });

  it("should return undefined for unknown functions", () => {
    const doc = getJexlCompletionDoc("unknownFunction");
    expect(doc).toBeUndefined();
  });

  it("should find documentation for transform names", () => {
    const doc = getJexlCompletionDoc("uppercase");
    expect(doc).toBeDefined();
  });

  it("should find documentation for transform aliases and partial input", () => {
    // 'boolean' is the label, 'toBoolean' and 'toBool' are aliases
    const doc1 = getJexlCompletionDoc("toBoolean", "transform");
    expect(doc1).toBeDefined();
    expect(doc1?.label).toBe("boolean");
    expect(doc1?.aliases).toContain("toBoolean");

    const doc2 = getJexlCompletionDoc("toBool", "transform");
    expect(doc2).toBeDefined();
    expect(doc2?.label).toBe("boolean");
    expect(doc2?.aliases).toContain("toBool");

    // Partial input: simulate completion filtering
    const allTransforms = createJexlCompletionItems("transform", "toBo");
    const labels = allTransforms.map((item) => item.label);
    expect(labels).toContain("boolean");
    // Should only return transforms whose label or alias starts with 'toBo'
    expect(allTransforms.length).toBeGreaterThan(0);
  });
});
