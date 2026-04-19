/**
 * publish-post.ts
 * ---------------------------------------------------------------------------
 * Converts a .md draft into a typed data/posts/<slug>.ts file and registers
 * it in data/blogPosts.ts automatically.
 *
 * Usage:
 *   npx ts-node --skip-project --compiler-options '{"module":"commonjs","esModuleInterop":true}' \
 *     scripts/publish-post.ts \
 *     --md blog-drafts/my-post.md \
 *     --slug my-post-slug \
 *     --title "My Post Title" \
 *     --description "Short meta description (max 160 chars)" \
 *     --date 2026-04-19 \
 *     --readTime "12 min" \
 *     --category Engineering \
 *     --tags "WordPress,Rust,WebAssembly,Security" \
 *     --coverImage /images/my-banner.webp
 *
 * The script will:
 *  1. Parse the markdown → HTML (via marked)
 *  2. Write data/posts/<slug>.ts
 *  3. Append the import + array entry to data/blogPosts.ts
 * ---------------------------------------------------------------------------
 */

import * as fs from 'fs';
import * as path from 'path';
import { marked } from 'marked';

// ── CLI arg parsing ──────────────────────────────────────────────────────────
const args = process.argv.slice(2);
function getArg(flag: string): string {
  const i = args.indexOf(flag);
  if (i === -1 || !args[i + 1]) {
    console.error(`Missing required arg: ${flag}`);
    process.exit(1);
  }
  return args[i + 1];
}

const mdPath       = getArg('--md');
const slug         = getArg('--slug');
const title        = getArg('--title');
const description  = getArg('--description');
const date         = getArg('--date');
const readTime     = getArg('--readTime');
const category     = getArg('--category');
const tagsRaw      = getArg('--tags');
const coverImage   = getArg('--coverImage');

const tags = tagsRaw.split(',').map((t) => t.trim());

// ── 1. Read markdown and convert to HTML ────────────────────────────────────
const ROOT = path.resolve(__dirname, '..');
const fullMdPath = path.resolve(ROOT, mdPath);

if (!fs.existsSync(fullMdPath)) {
  console.error(`Markdown file not found: ${fullMdPath}`);
  process.exit(1);
}

const mdContent = fs.readFileSync(fullMdPath, 'utf8');

// Configure marked for clean HTML output
marked.setOptions({ gfm: true, breaks: false });

// Convert markdown → HTML (synchronous with marked v4+)
let bodyHtml = marked.parse(mdContent) as string;

// Inject cover image at the very top (before the h1 the MD already has)
const ext = path.extname(coverImage).replace('.', '');
const mimeMap: Record<string, string> = {
  webp: 'image/webp', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', avif: 'image/avif',
};
const coverMime = mimeMap[ext] || 'image/webp';
const bannerHtml = `<picture>
  <source media="(min-width: 1px)" srcset="${coverImage} 1x" type="${coverMime}" />
  <img src="${coverImage}" alt="${title}" style="width:100%; border-radius:12px; margin-bottom: 2rem;" loading="eager" width="1200" height="630" />
</picture>\n\n`;

// Remove the leading <h1> from MD so we don't duplicate it (the page renders it separately)
// Actually we keep contentHtml as the article body — the [slug].tsx page renders <h1> from post.title
// So strip the first <h1>...</h1> block if present
const htmlWithBanner = bannerHtml + bodyHtml.replace(/^<h1[^>]*>.*?<\/h1>\s*/i, '');

// ── 2. Write data/posts/<slug>.ts ────────────────────────────────────────────
const varName = `post_${slug.replace(/-/g, '_')}`;
const postsDir = path.join(ROOT, 'data', 'posts');
if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir, { recursive: true });

const postFileContent = `import type { BlogPost } from '../blogPosts';

const post: BlogPost = {
  slug: ${JSON.stringify(slug)},
  title: ${JSON.stringify(title)},
  description: ${JSON.stringify(description)},
  date: ${JSON.stringify(date)},
  readTime: ${JSON.stringify(readTime)},
  category: ${JSON.stringify(category)},
  tags: ${JSON.stringify(tags)},
  coverImage: ${JSON.stringify(coverImage)},
  contentHtml: ${JSON.stringify(htmlWithBanner)},
};

export default post;
`;

const postFilePath = path.join(postsDir, `${slug}.ts`);
if (fs.existsSync(postFilePath)) {
  console.error(`⚠️  data/posts/${slug}.ts already exists. Delete it first if you want to re-publish.`);
  process.exit(1);
}
fs.writeFileSync(postFilePath, postFileContent, 'utf8');
console.log(`✓ Created data/posts/${slug}.ts`);

// ── 3. Register in data/blogPosts.ts ────────────────────────────────────────
const indexPath = path.join(ROOT, 'data', 'blogPosts.ts');
let index = fs.readFileSync(indexPath, 'utf8');

// Add import after the last existing import line
const importLine = `import ${varName} from './posts/${slug}';`;
const lastImportIdx = index.lastIndexOf("\nimport ");
const insertImportAt = index.indexOf('\n', lastImportIdx + 1);
index = index.slice(0, insertImportAt) + '\n' + importLine + index.slice(insertImportAt);

// Add to the blogPosts array — insert at the TOP so newest post appears first
index = index.replace(
  'export const blogPosts: BlogPost[] = [',
  `export const blogPosts: BlogPost[] = [\n  ${varName},`
);

fs.writeFileSync(indexPath, index, 'utf8');
console.log(`✓ Registered ${varName} in data/blogPosts.ts (top of array)`);

console.log(`
✅ Done!
   Post slug : /blog/${slug}
   Cover img : ${coverImage}
   
Next steps:
  1. npm run build   →  verify no errors
  2. git add data/posts/${slug}.ts data/blogPosts.ts public/images/<banner>
  3. git commit & deploy
`);
