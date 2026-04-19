/**
 * split-blog-posts.ts
 * ---------------------------------------------------------------------------
 * Reads the existing blogPosts array (via the compiled module) and writes one
 * TypeScript file per post into  data/posts/<slug>.ts
 * Then rewrites data/blogPosts.ts as a thin index that re-exports everything.
 *
 * Run:  npx ts-node --skip-project scripts/split-blog-posts.ts
 * ---------------------------------------------------------------------------
 */

import * as fs from 'fs';
import * as path from 'path';

// ---------------------------------------------------------------------------
// Load posts from the existing source (we evaluate the TS file via require)
// ---------------------------------------------------------------------------
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { blogPosts } = require('../data/blogPosts') as {
  blogPosts: Array<Record<string, unknown>>;
};

const ROOT = path.resolve(__dirname, '..');
const POSTS_DIR = path.join(ROOT, 'data', 'posts');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Safely serialise any value to a TypeScript literal.
 *  - strings with backticks/backslashes are emitted as JSON-encoded strings
 *  - objects/arrays are recursively serialised
 */
function serialise(value: unknown, indent = 2): string {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';

  if (typeof value === 'boolean' || typeof value === 'number') {
    return String(value);
  }

  if (typeof value === 'string') {
    // Use JSON.stringify so special chars (backtick, backslash, newlines)
    // are correctly escaped. The result is a valid TS string literal.
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    const items = value.map((v) => ' '.repeat(indent + 2) + serialise(v, indent + 2));
    return `[\n${items.join(',\n')}\n${' '.repeat(indent)}]`;
  }

  if (typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    const keys = Object.keys(obj);
    if (keys.length === 0) return '{}';
    const pairs = keys.map((k) => {
      const key = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : JSON.stringify(k);
      return `${' '.repeat(indent + 2)}${key}: ${serialise(obj[k], indent + 2)}`;
    });
    return `{\n${pairs.join(',\n')}\n${' '.repeat(indent)}}`;
  }

  return JSON.stringify(value);
}

/** Generate the content of a single post file. */
function generatePostFile(post: Record<string, unknown>): string {
  return `import type { BlogPost } from '../blogPosts';

const post: BlogPost = ${serialise(post, 0)};

export default post;
`;
}

// ---------------------------------------------------------------------------
// 1. Create data/posts/ directory
// ---------------------------------------------------------------------------
if (!fs.existsSync(POSTS_DIR)) {
  fs.mkdirSync(POSTS_DIR);
  console.log('Created data/posts/');
}

// ---------------------------------------------------------------------------
// 2. Write one file per post
// ---------------------------------------------------------------------------
const slugToVarName: Array<{ slug: string; varName: string; fileName: string }> = [];

blogPosts.forEach((post, i) => {
  const slug = post.slug as string;
  if (!slug) {
    console.error(`Post at index ${i} has no slug – skipping`);
    return;
  }

  // Convert slug to a valid JS identifier (replace hyphens with underscores)
  const fileName = `${slug}.ts`;
  const filePath = path.join(POSTS_DIR, fileName);

  fs.writeFileSync(filePath, generatePostFile(post), 'utf8');
  slugToVarName.push({ slug, varName: `post_${slug.replace(/-/g, '_')}`, fileName });
  console.log(`  ✓  data/posts/${fileName}`);
});

// ---------------------------------------------------------------------------
// 3. Rewrite data/blogPosts.ts as a thin index
// ---------------------------------------------------------------------------
const importLines = slugToVarName
  .map(({ varName, fileName }) => `import ${varName} from './posts/${fileName.replace('.ts', '')}';`)
  .join('\n');

const arrayEntries = slugToVarName.map(({ varName }) => `  ${varName}`).join(',\n');

const indexContent = `// ============================================================
// data/blogPosts.ts  –  AUTO-GENERATED index (do not edit)
// Add/edit posts in data/posts/<slug>.ts instead.
// ============================================================

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  lastUpdated?: string; // ISO - for dateModified tracking
  readTime: string;
  category: string;
  tags: string[];
  coverImage?: string;
  contentHtml: string; // pre-rendered HTML string
  faqs?: { question: string; answer: string }[];
  howTo?: {
    name: string;
    description?: string;
    steps: { name: string; text: string }[];
  };
};

// ── Individual post imports ──────────────────────────────────
${importLines}

// ── Master array (order = newest-first after getAllPosts()) ──
export const blogPosts: BlogPost[] = [
${arrayEntries},
];

export const getAllPosts = (): BlogPost[] =>
  [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((p) => p.slug === slug);
`;

const indexPath = path.join(ROOT, 'data', 'blogPosts.ts');
fs.writeFileSync(indexPath, indexContent, 'utf8');
console.log('\n✅  data/blogPosts.ts rewritten as thin index');
console.log(`✅  ${slugToVarName.length} post files created in data/posts/`);
console.log('\nVerify with:  npm run build');
