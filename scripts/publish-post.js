#!/usr/bin/env node
/**
 * publish-post.js  —  Zero-dependency blog publisher
 * ---------------------------------------------------------------------------
 * Reads a .md file with YAML frontmatter and publishes it as a typed
 * data/posts/<slug>.ts file, then registers it in data/blogPosts.ts.
 *
 * USAGE (single command, everything in the .md file):
 *   node scripts/publish-post.js blog-drafts/my-post.md
 *
 * FRONTMATTER FORMAT (place at top of .md between --- delimiters):
 * ---
 * slug: my-post-slug
 * title: "My Full Post Title"
 * description: "Meta description, max 160 chars"
 * date: 2026-04-19
 * readTime: "12 min"
 * category: WordPress
 * tags: [WordPress, Rust, WebAssembly, Security]
 * coverImage: /images/my-banner.webp
 * faqs:
 *   - question: "What is X?"
 *     answer: "X is..."
 *   - question: "Does it affect SEO?"
 *     answer: "Yes, because..."
 * ---
 *
 * Categories: Engineering | WordPress | Salesforce
 * ---------------------------------------------------------------------------
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ── 1. Get the markdown file path ────────────────────────────────────────────
const mdArg = process.argv[2];
if (!mdArg) {
  console.error('Usage: node scripts/publish-post.js blog-drafts/my-post.md');
  process.exit(1);
}

const ROOT       = path.resolve(__dirname, '..');
const fullMdPath = path.resolve(ROOT, mdArg);

if (!fs.existsSync(fullMdPath)) {
  console.error(`File not found: ${fullMdPath}`);
  process.exit(1);
}

const raw = fs.readFileSync(fullMdPath, 'utf8');

// ── 2. Parse YAML frontmatter ─────────────────────────────────────────────────
function parseFrontmatter(src) {
  const match = src.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) {
    console.error('No YAML frontmatter found. Add --- delimiters at top of file.');
    process.exit(1);
  }
  const yamlBlock = match[1];
  const body      = match[2];

  // Minimal YAML parser (handles strings, arrays, nested faqs)
  const meta = {};

  // Parse multi-line faqs block separately
  const faqMatch = yamlBlock.match(/^faqs:\s*\n((?:[ \t]+- [\s\S]*?(?=\n\S|\n?$))*)/m);
  if (faqMatch) {
    const faqBlock = faqMatch[1];
    const faqs = [];
    // Each FAQ item starts with "  - question:"
    const items = faqBlock.split(/\n[ \t]+- /).filter(Boolean);
    for (const item of items) {
      const qMatch = item.match(/question:\s*["']?(.+?)["']?\s*\n/);
      const aMatch = item.match(/answer:\s*["']?([\s\S]+?)["']?\s*$/m);
      if (qMatch && aMatch) {
        faqs.push({
          question: qMatch[1].trim().replace(/^["']|["']$/g, ''),
          answer:   aMatch[1].trim().replace(/^["']|["']$/g, ''),
        });
      }
    }
    if (faqs.length) meta.faqs = faqs;
  }

  // Parse remaining scalar/array fields
  const lines = yamlBlock.replace(/^faqs:[\s\S]*$/m, '').split('\n');
  for (const line of lines) {
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (!m) continue;
    const [, key, val] = m;
    if (val.startsWith('[')) {
      // Inline array: [Tag1, Tag2, Tag3]
      meta[key] = val.replace(/^\[|\]$/g, '').split(',').map(t => t.trim().replace(/^["']|["']$/g, ''));
    } else {
      meta[key] = val.replace(/^["']|["']$/g, '').trim();
    }
  }

  return { meta, body };
}

const { meta, body } = parseFrontmatter(raw);

// Validate required fields
const required = ['slug','title','description','date','readTime','category','tags','coverImage'];
for (const field of required) {
  if (!meta[field]) { console.error(`Missing frontmatter field: ${field}`); process.exit(1); }
}

const { slug, title, description, date, readTime, category, coverImage } = meta;
const tags = Array.isArray(meta.tags) ? meta.tags : [meta.tags];
const faqs = meta.faqs || [];

// ── 3. Markdown → HTML ────────────────────────────────────────────────────────
function mdToHtml(md) {
  let html = md;

  // Fenced code blocks
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const esc = code.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    return `<pre><code${lang ? ` class="language-${lang}"` : ''}>${esc}</code></pre>`;
  });

  // Inline code
  html = html.replace(/`([^`\n]+)`/g, (_, c) =>
    `<code>${c.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</code>`);

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote><p>$1</p></blockquote>');

  // Headings (strip leading #'s)
  html = html.replace(/^######\s+(.+)$/gm, '<h6>$1</h6>');
  html = html.replace(/^#####\s+(.+)$/gm,  '<h5>$1</h5>');
  html = html.replace(/^####\s+(.+)$/gm,   '<h4>$1</h4>');
  html = html.replace(/^###\s+(.+)$/gm,    '<h3>$1</h3>');
  html = html.replace(/^##\s+(.+)$/gm,     '<h2>$1</h2>');
  html = html.replace(/^#\s+(.+)$/gm,      '<h1>$1</h1>');

  // Horizontal rules
  html = html.replace(/^[-*_]{3,}\s*$/gm, '<hr />');

  // Bold & italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/_(.+?)_/g, '<em>$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Unordered lists
  html = html.replace(/((?:^[-*+] .+\n?)+)/gm, block => {
    const items = block.trim().split('\n').map(l => `<li>${l.replace(/^[-*+] /, '')}</li>`).join('\n');
    return `<ul>\n${items}\n</ul>\n`;
  });

  // Ordered lists
  html = html.replace(/((?:^\d+\. .+\n?)+)/gm, block => {
    const items = block.trim().split('\n').map(l => `<li>${l.replace(/^\d+\. /, '')}</li>`).join('\n');
    return `<ol>\n${items}\n</ol>\n`;
  });

  // Paragraphs
  const blockTags = /^<(h[1-6]|ul|ol|li|pre|blockquote|hr|p|div|table|thead|tbody|tr|td|th)[\s\S]*>|^<\/(ul|ol|pre|blockquote|table)>/;
  return html.split('\n').map(line => {
    const t = line.trim();
    if (!t) return '';
    if (blockTags.test(t)) return line;
    return `<p>${t}</p>`;
  }).filter(Boolean).join('\n');
}

// Convert MD body → HTML, strip leading <h1> (page renders title separately)
let bodyHtml = mdToHtml(body).replace(/^<h1>.*?<\/h1>\s*/i, '');

// ── 4. Build the WordPress CTA block (matches template in [slug].tsx) ─────────
// The page renders a category-aware CTA automatically from post.category —
// but we also embed a simple in-content CTA before the FAQs for lead-gen,
// matching the style seen in wordpress-losing-customers-nextjs-blog-post.ts
const isWordPress = category === 'WordPress';

const ctaHtml = isWordPress
  ? `\n<hr />\n<div style="background: rgba(99,102,241,0.08); border: 1px solid rgba(99,102,241,0.25); border-radius: 12px; padding: 2rem; margin-top: 3rem;">\n  <h3 style="color: #818cf8; margin-top: 0;">Need help with your WordPress site?</h3>\n  <p>Whether you're dealing with security vulnerabilities, plugin conflicts, slow load times, or Core Web Vitals failures — we handle the technical side so you can focus on your business. Custom plugin development, performance hardening, Wasm integrations, and ongoing maintenance retainers.</p>\n  <p><a href="/contact?ref=wordpress-blog" style="display: inline-block; background: linear-gradient(135deg, #6366f1, #4f46e5); color: white; padding: 0.75rem 1.5rem; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 0.5rem;">Talk to Us About Your WordPress Site &rarr;</a></p>\n</div>\n`
  : `\n<hr />\n<div style="background: rgba(59,130,246,0.08); border: 1px solid rgba(59,130,246,0.2); border-radius: 12px; padding: 2rem; margin-top: 3rem;">\n  <h3 style="color: #60a5fa; margin-top: 0;">Let's build something together</h3>\n  <p>We build fast, modern websites and applications using Next.js, React, WordPress, Rust, and more. If you have a project in mind or just want to talk through an idea, we'd love to hear from you.</p>\n  <p><a href="/contact?ref=blog" style="display: inline-block; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; padding: 0.75rem 1.5rem; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 0.5rem;">Start a Project &rarr;</a></p>\n</div>\n`;

// ── 5. Banner image ───────────────────────────────────────────────────────────
const ext       = path.extname(coverImage).slice(1).toLowerCase();
const mimeMap   = { webp:'image/webp', png:'image/png', jpg:'image/jpeg', jpeg:'image/jpeg', avif:'image/avif' };
const coverMime = mimeMap[ext] || 'image/webp';
const banner    = `<picture>\n  <source media="(min-width: 1px)" srcset="${coverImage} 1x" type="${coverMime}" />\n  <img src="${coverImage}" alt="${title}" style="width:100%; border-radius:12px; margin-bottom: 2rem;" loading="eager" width="1200" height="630" />\n</picture>\n\n`;

const contentHtml = banner + bodyHtml + ctaHtml;

// ── 6. Write data/posts/<slug>.ts ─────────────────────────────────────────────
const postsDir    = path.join(ROOT, 'data', 'posts');
if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir, { recursive: true });

const postFilePath = path.join(postsDir, `${slug}.ts`);
if (fs.existsSync(postFilePath)) {
  console.error(`⚠️  data/posts/${slug}.ts already exists. Delete it first to re-publish.`);
  process.exit(1);
}

const faqsField = faqs.length
  ? `,\n  faqs: ${JSON.stringify(faqs, null, 4).replace(/^/gm, '  ').trimStart()}`
  : '';

const varName = `post_${slug.replace(/-/g, '_')}`;

const postFileContent =
`import type { BlogPost } from '../blogPosts';

const post: BlogPost = {
  slug: ${JSON.stringify(slug)},
  title: ${JSON.stringify(title)},
  description: ${JSON.stringify(description)},
  date: ${JSON.stringify(date)},
  readTime: ${JSON.stringify(readTime)},
  category: ${JSON.stringify(category)},
  tags: ${JSON.stringify(tags)}${faqsField},
  coverImage: ${JSON.stringify(coverImage)},
  contentHtml: ${JSON.stringify(contentHtml)},
};

export default post;
`;

fs.writeFileSync(postFilePath, postFileContent, 'utf8');
console.log(`✓ Created  data/posts/${slug}.ts`);

// ── 7. Register in data/blogPosts.ts ─────────────────────────────────────────
const indexPath = path.join(ROOT, 'data', 'blogPosts.ts');
let   index     = fs.readFileSync(indexPath, 'utf8');

const importLine  = `import ${varName} from './posts/${slug}';`;
const lastImport  = index.lastIndexOf('\nimport ');
const afterImport = index.indexOf('\n', lastImport + 1);
index = index.slice(0, afterImport) + '\n' + importLine + index.slice(afterImport);

index = index.replace(
  'export const blogPosts: BlogPost[] = [',
  `export const blogPosts: BlogPost[] = [\n  ${varName},`
);

fs.writeFileSync(indexPath, index, 'utf8');
console.log(`✓ Registered in data/blogPosts.ts`);

console.log(`
✅ Published!
   URL      : /blog/${slug}
   Cover    : ${coverImage}
   Category : ${category}
   Tags     : ${tags.join(', ')}
   FAQs     : ${faqs.length} question${faqs.length !== 1 ? 's' : ''}
   CTA      : ${isWordPress ? 'WordPress' : 'General'} style

Next steps:
  npm run build
  git add data/posts/${slug}.ts data/blogPosts.ts public/images/$(basename ${coverImage})
  git commit -m "blog: add ${slug}" && git push
`);
