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
  '\n' +
  "If you're building scalable web applications, choosing the right runtime is crucial. Let's look at **TypeScript vs Deno vs Bun** to see which modern JavaScript ecosystem actually delivers. This isn't just about syntactical quirks — we're doing a deep dive into real-world **performance**, native capabilities, and overall latency. In this comprehensive **comparison**, we'll analyze the trade-offs of each platform in 2026 so you know exactly which tool to adopt.\n\n" +
  "TypeScript 6.0 just dropped in March 2026. It's the last release built on JavaScript. The next one is being rewritten in Go. Deno 2.7 shipped in February with Temporal API support, Windows ARM builds, and full npm compatibility. Bun 1.3 is now the runtime powering Anthropic's Claude Code after being acquired earlier this year.\n\n" +
  "All three shipped major updates within months of each other. All three are being used in production right now. And all three make different trade-offs that matter depending on what you're building.\n\n" +
  "This article covers performance benchmarks, developer experience, security, ecosystem compatibility, and real-world use cases. We're not declaring a winner. There isn't one. The right answer depends on your team, your codebase, and what you're actually trying to ship.\n\n" +
  "**The only honest answer to \"which should I use?\" is: it depends. But we'll tell you exactly what it depends on.**\n\n" +
  '<hr style="border: none; border-top: 1px solid #334155; margin: 2.5rem 0;">\n';

const combinedMarkdown = newIntroMarkdown + '\n\n' + restOfMarkdown;

// Reset marked to default to avoid previous custom renderer bugs
marked.use({ renderer: new marked.Renderer() });

let finalHtml = marked.parse(combinedMarkdown);

const post = {
  slug: 'typescript-vs-deno-vs-bun-2026-performance-comparison',
  title: "TypeScript vs Deno vs Bun (2026): Performance, Features, and When to Use Each",
  description: "If you're building scalable web applications, choosing the right runtime is crucial. Let's look at TypeScript vs Deno vs Bun to see which modern JavaScript ecosystem actually delivers. This isn't just about syntactical quirks — we're doing a deep dive into real-world performance, native capabilities, and overall latency. In this comprehensive comparison, we'll analyze the trade-offs of each platform in 2026 so you know exactly which tool to adopt.",
  date: '2026-04-05',
  readTime: '12 min read',
  category: 'Engineering',
  tags: ["TypeScript", "Deno", "Bun", "JavaScript Runtime", "Performance", "Comparison"],
  coverImage: '/images/typescript-bun-deno-nandann-creative.webp',
  faqs: [
    {
      question: "Which JavaScript runtime is the fastest in 2026?",
      answer: "Bun is generally the fastest for startup times and package installation, but V8 (used by Deno and Node) still excels in complex, long-running server workloads."
    },
    {
      question: "Does Bun support TypeScript out of the box?",
      answer: "Yes, Bun supports TypeScript natively and transpiles it extremely fast. However, it does not perform type-checking during runtime, so you still need tsc or a separate type-checking tool in your pipeline."
    },
    {
      question: "What is the key advantage of Deno 2.7?",
      answer: "Deno 2.7 emphasizes a 'secure-by-default' architecture where file and network access require explicit permissions. It also offers excellent npm compatibility and a stabilized Temporal API."
    },
    {
      question: "Is TypeScript 6.0 considered a runtime environment?",
      answer: "No, TypeScript is a type-checking layer that compiles to JavaScript. TypeScript 6.0 is the final version built on JavaScript, with version 7.0 being rewritten entirely in Go for a dramatic performance boost."
    }
  ],
  contentHtml: finalHtml
};

const tsPostStr = `  {
    slug: ${JSON.stringify(post.slug)},
    title: ${JSON.stringify(post.title)},
    description: ${JSON.stringify(post.description)},
    date: ${JSON.stringify(post.date)},
    readTime: ${JSON.stringify(post.readTime)},
    category: ${JSON.stringify(post.category)},
    tags: ${JSON.stringify(post.tags)},
    coverImage: ${JSON.stringify(post.coverImage)},
    faqs: ${JSON.stringify(post.faqs, null, 4).replace(/\\n/g, '\n      ').replace(/\]$/, '  ]')},
    contentHtml: ${JSON.stringify(post.contentHtml)}
  },`;

let tsContent = fs.readFileSync(tsPath, 'utf8');

const targetLine = "export const blogPosts: BlogPost[] = [";
if (tsContent.includes(targetLine)) {
  tsContent = tsContent.replace(targetLine, targetLine + '\n' + tsPostStr);
  fs.writeFileSync(tsPath, tsContent);
  console.log("Successfully injected blog post!");
} else {
  console.error("Could not find the export const blogPosts array.");
}
