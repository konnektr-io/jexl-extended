#!/usr/bin/env ts-node

import fs from "fs";
import path from "path";

/**
 * Utility script to manage MDX documentation
 */

const DOCS_DIR = "./docs";

function cleanDocs(): void {
  console.log("🧹 Cleaning MDX documentation...");

  if (fs.existsSync(DOCS_DIR)) {
    fs.rmSync(DOCS_DIR, { recursive: true });
    console.log("✅ Cleaned existing documentation");
  }
}

function validateDocs(): boolean {
  console.log("🔍 Validating MDX documentation...");

  if (!fs.existsSync(DOCS_DIR)) {
    console.error("❌ docs directory not found. Run: npm run docs:mdx");
    return false;
  }

  const indexPath = path.join(DOCS_DIR, "index.mdx");
  if (!fs.existsSync(indexPath)) {
    console.error("❌ index.mdx not found");
    return false;
  }

  const metaPath = path.join(DOCS_DIR, "meta.json");
  if (!fs.existsSync(metaPath)) {
    console.error("❌ meta.json not found");
    return false;
  }

  // Count categories and files
  const entries = fs.readdirSync(DOCS_DIR, { withFileTypes: true });
  const categories = entries.filter((entry) => entry.isDirectory()).length;

  let totalFiles = 0;
  entries
    .filter((entry) => entry.isDirectory())
    .forEach((dir) => {
      const categoryPath = path.join(DOCS_DIR, dir.name);
      const files = fs
        .readdirSync(categoryPath)
        .filter((f) => f.endsWith(".mdx"));
      totalFiles += files.length;
    });

  console.log(`✅ Validation passed:`);
  console.log(`   - ${categories} categories found`);
  console.log(`   - ${totalFiles} MDX files found`);

  return true;
}

function listStats(): void {
  if (!fs.existsSync(DOCS_DIR)) {
    console.error("❌ docs directory not found. Run: npm run docs:mdx");
    return;
  }

  console.log("📊 MDX Documentation Statistics:");

  const entries = fs.readdirSync(DOCS_DIR, { withFileTypes: true });
  const categories = entries.filter((entry) => entry.isDirectory());

  categories.forEach((category) => {
    const categoryPath = path.join(DOCS_DIR, category.name);
    const files = fs
      .readdirSync(categoryPath)
      .filter((f) => f.endsWith(".mdx") && f !== "index.mdx");
    console.log(`   ${category.name}: ${files.length} functions`);
  });

  const totalFiles = categories.reduce((total, category) => {
    const categoryPath = path.join(DOCS_DIR, category.name);
    const files = fs
      .readdirSync(categoryPath)
      .filter((f) => f.endsWith(".mdx") && f !== "index.mdx");
    return total + files.length;
  }, 0);

  console.log(`\n📈 Total: ${totalFiles} function documentation pages`);
}

// CLI interface
const command = process.argv[2];

switch (command) {
  case "clean":
    cleanDocs();
    break;
  case "validate":
    process.exit(validateDocs() ? 0 : 1);
  case "stats":
    listStats();
    break;
  default:
    console.log("Usage: ts-node mdx-utils.ts <command>");
    console.log("Commands:");
    console.log("  clean     - Remove all generated MDX files");
    console.log("  validate  - Validate generated documentation");
    console.log("  stats     - Show documentation statistics");
    process.exit(1);
}
