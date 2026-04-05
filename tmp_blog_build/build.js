const fs = require('fs');
const marked = require('marked');

const markdownPath = '/Users/prakharbhatia/nandann-creative/blog-drafts/typescript-deno-bun-blog-post.md';
const tsPath = '/Users/prakharbhatia/nandann-creative/data/blogPosts.ts';

const markdownContent = fs.readFileSync(markdownPath, 'utf8');

const targetSectionIndex = markdownContent.indexOf('## Quick Comparison Table');
const restOfMarkdown = markdownContent.slice(targetSectionIndex);

const newIntroMarkdown = '<picture>\n' +
  '  <source media="(min-width: 1px)" srcset="/images/typescript-bun-deno-nandann-creative.webp 1x" type="image/webp" />\n' +
  '  <img src="/images/typescript-bun-deno-nandann-creative.webp" alt="TypeScript vs Deno vs Bun performance comparison" style="width:100%; border-radius:12px; margin-bottom: 2rem;" loading="eager" width="1200" height="630" />\n' +
  '</picture>\n' +
  '<h1 style="font-size: 2.25rem; font-weight: 700; color: #f8fafc; margin-bottom: 1rem; line-height: 1.2;">TypeScript vs Deno vs Bun (2026): Performance, Features, and When to Use Each</h1>\n' +
  '<p style="color: #94a3b8; font-size: 0.875rem; margin-bottom: 2rem;"><strong>Published:</strong> April 2026 | <strong>Read time:</strong> ~12 minutes</p>\n' +
  '\n' +
  '<hr style="border: none; border-top: 1px solid #334155; margin: 2.5rem 0;">\n' +
  '\n' +
  "If you're building scalable web applications, choosing the right runtime is crucial. Let's look at **TypeScript vs Deno vs Bun** to see which modern JavaScript ecosystem actually delivers. This isn't just about syntactical quirks — we're doing a deep dive into real-world **performance**, native capabilities, and overall latency. In this comprehensive **comparison**, we'll analyze the trade-offs of each platform in 2026 so you know exactly which tool to adopt.\n\n" +
  "TypeScript 6.0 just dropped in March 2026. It's the last release built on JavaScript. The next one is being rewritten in Go. Deno 2.7 shipped in February with Temporal API support, Windows ARM builds, and full npm compatibility. Bun 1.3 is now the runtime powering Anthropic's Claude Code after being acquired earlier this year.\n\n" +
  "All three shipped major updates within months of each other. All three are being used in production right now. And all three make different trade-offs that matter depending on what you're building.\n\n" +
  "This article covers performance benchmarks, developer experience, security, ecosystem compatibility, and real-world use cases. We're not declaring a winner. There isn't one. The right answer depends on your team, your codebase, and what you're actually trying to ship.\n\n" +
  "**The only honest answer to \"which should I use?\" is: it depends. But we'll tell you exactly what it depends on.**\n\n" +
  '<hr style="border: none; border-top: 1px solid #334155; margin: 2.5rem 0;">\n';

const combinedMarkdown = newIntroMarkdown + '\n' + restOfMarkdown;

marked.use({
  renderer: {
    heading(info) {
      const text = info.text || info;
      const level = info.depth || info.level || 2;
      if (level === 2) {
        return '\n<h2 style="font-size: 1.5rem; font-weight: 600; color: #f8fafc; margin-top: 2rem; margin-bottom: 1rem;">' + text + '</h2>\n';
      }
      if (level === 3) {
        return '\n<h3 style="font-size: 1.25rem; font-weight: 600; color: #e2e8f0; margin-top: 1.5rem; margin-bottom: 0.75rem;">' + text + '</h3>\n';
      }
      return '<h' + level + '>' + text + '</h' + level + '>';
    },
    code(info) {
      const code = info.text || info.code || info;
      const lang = info.lang || 'text';
      return '\n<p style="font-size: 0.75rem; color: #64748b; margin-bottom: 0.25rem; font-family: monospace;">' + lang + '</p><div style="background: #0f172a; border: 1px solid #1e293b; border-radius: 8px; padding: 1.5rem; margin: 1.5rem 0; overflow-x: auto;"><pre style="margin:0; color: #e2e8f0; font-family: monospace; font-size: 0.875rem; line-height: 1.7;"><code>' + String(code).replace(/</g, "&lt;").replace(/>/g, "&gt;") + '</code></pre></div>\n';
    },
    codespan(info) {
      const text = info.text || info;
      return '<code style="background:#1e293b; padding: 2px 6px; border-radius:4px; font-family: monospace; color: #e2e8f0;">' + text + '</code>';
    },
    paragraph(info) {
      const text = String(info.text || info);
      if (text.startsWith('<picture>') || text.startsWith('<h1') || text.startsWith('<hr') || text.startsWith('<p ')) {
        return text + '\n';
      }
      if (text.startsWith('If you') || text.startsWith('TypeScript') || text.startsWith('All three') || text.startsWith('This article') || text.startsWith('**The only')) {
        return '<p style="margin-bottom: 1rem; color: #cbd5e1; line-height: 1.7;">' + marked.parseInline(text) + '</p>\n';
      }
      return '<p style="margin-bottom: 1rem; color: #cbd5e1; line-height: 1.7;">' + text + '</p>\n';
    },
    list(info) {
      const body = info.body || info;
      const ordered = info.ordered;
      const type = ordered ? 'ol' : 'ul';
      return '\n<' + type + ' style="list-style-type: ' + (ordered ? 'decimal' : 'disc') + '; margin-left: 1.5rem; margin-bottom: 1.5rem; color: #cbd5e1; line-height: 1.7;">\n' + body + '</' + type + '>\n';
    },
    listitem(info) {
      const text = info.text || info;
      return '  <li style="margin-bottom: 0.5rem;">' + text + '</li>\n';
    },
    table(info) {
      const header = info.header || '';
      const body = info.body || '';
      return '\n<div style="overflow-x: auto; margin: 2rem 0;">\n  <table style="width: 100%; border-collapse: collapse; text-align: left;">\n    <thead>' + header + '</thead>\n    <tbody>' + body + '</tbody>\n  </table>\n</div>\n';
    },
    tablerow(info) {
      const content = info.text || info;
      return '    <tr style="border-bottom: 1px solid #334155;">' + content + '</tr>\n';
    },
    tablecell(info) {
      const content = info.text || info;
      const flags = info.flags || {};
      const type = flags.header ? 'th' : 'td';
      const style = 'padding: 1rem; ' + (flags.header ? 'color: #f8fafc; font-weight: 600;' : 'color: #cbd5e1;');
      return '      <' + type + ' style="' + style + '">' + content + '</' + type + '>\n';
    }
  }
});

let finalHtml = marked.parse(combinedMarkdown);

// Wrap HTML content securely without backticks inside template literal payload
finalHtml = finalHtml.replace(/`/g, '\\`');
finalHtml = finalHtml.replace(/\$/g, '\\$');

const newPostStr = "  {\n" +
"    slug: 'typescript-vs-deno-vs-bun-2026-performance-comparison',\n" +
"    title: \"TypeScript vs Deno vs Bun (2026): Performance, Features, and When to Use Each\",\n" +
"    description: \"If you're building scalable web applications, choosing the right runtime is crucial. Let's look at TypeScript vs Deno vs Bun to see which modern JavaScript ecosystem actually delivers. This isn't just about syntactical quirks — we're doing a deep dive into real-world performance, native capabilities, and overall latency. In this comprehensive comparison, we'll analyze the trade-offs of each platform in 2026 so you know exactly which tool to adopt.\",\n" +
"    date: '2026-04-05',\n" +
"    readTime: '12 min',\n" +
"    category: 'Engineering',\n" +
"    tags: [\"TypeScript\", \"Deno\", \"Bun\", \"JavaScript Runtime\", \"Performance\", \"Comparison\"],\n" +
"    coverImage: '/images/typescript-bun-deno-nandann-creative.webp',\n" +
"    contentHtml: `" + finalHtml.trim() + "`\n" +
"  },";

let tsContent = fs.readFileSync(tsPath, 'utf8');

const targetLine = "export const blogPosts: BlogPost[] = [";
if (tsContent.includes(targetLine)) {
  tsContent = tsContent.replace(targetLine, targetLine + '\\n' + newPostStr);
  fs.writeFileSync(tsPath, tsContent);
  console.log("Successfully injected blog post!");
} else {
  console.error("Could not find the export const blogPosts array.");
}
