const fs = require('fs');
const marked = require('marked');

function processPost(markdownPath, postInfo, tsPath) {
  const markdownContent = fs.readFileSync(markdownPath, 'utf8');

  // Find the title and the first paragraph
  const lines = markdownContent.split('\n');
  let title = lines.find(line => line.startsWith('# ')).replace('# ', '').trim();
  
  // We want to add an image banner to the top
  const newIntroMarkdown = `<picture>
  <source media="(min-width: 1px)" srcset="/images/${postInfo.imageName} 1x" type="image/png" />
  <img src="/images/${postInfo.imageName}" alt="${title}" style="width:100%; border-radius:12px; margin-bottom: 2rem;" loading="eager" width="1200" height="630" />
</picture>\n\n`;

  // Remove the H1 title since it will be manually placed just under the image
  const contentWithoutH1 = markdownContent.replace(/^# .*$/m, `# ${title}`);

  const combinedMarkdown = newIntroMarkdown + contentWithoutH1;

  // Reset marked to default to avoid previous custom renderer bugs
  marked.use({ renderer: new marked.Renderer() });

  let finalHtml = marked.parse(combinedMarkdown);

  const post = {
    slug: postInfo.slug,
    title: title,
    description: postInfo.description,
    date: '2026-04-11',
    readTime: postInfo.readTime,
    category: postInfo.category,
    tags: postInfo.tags,
    coverImage: "/images/" + postInfo.imageName,
    contentHtml: finalHtml
  };

  const tsPostStr = "  {\n" +
    "    slug: " + JSON.stringify(post.slug) + ",\n" +
    "    title: " + JSON.stringify(post.title) + ",\n" +
    "    description: " + JSON.stringify(post.description) + ",\n" +
    "    date: " + JSON.stringify(post.date) + ",\n" +
    "    readTime: " + JSON.stringify(post.readTime) + ",\n" +
    "    category: " + JSON.stringify(post.category) + ",\n" +
    "    tags: " + JSON.stringify(post.tags) + ",\n" +
    "    coverImage: " + JSON.stringify(post.coverImage) + ",\n" +
    "    contentHtml: " + JSON.stringify(post.contentHtml) + "\n" +
    "  },";


  let tsContent = fs.readFileSync(tsPath, 'utf8');

  const targetLine = "export const blogPosts: BlogPost[] = [";
  if (tsContent.includes(targetLine)) {
    tsContent = tsContent.replace(targetLine, targetLine + '\\n' + tsPostStr);
    fs.writeFileSync(tsPath, tsContent);
    console.log("Successfully injected blog post: " + post.slug);
  } else {
    console.error("Could not find the export const blogPosts array.");
  }
}

const TS_PATH = '/Users/prakharbhatia/nandann-creative/data/blogPosts.ts';

const filesToProcess = [
  {
    path: '/Users/prakharbhatia/nandann-creative/blog-drafts/python-free-threading-2026.md',
    postInfo: {
      slug: 'python-free-threading-2026',
      description: "Python 3.13 shipped with something people argued about for two decades: the ability to disable the GIL. Python 3.14 made it officially supported. But officially supported doesn't mean deploy it on Friday. And it definitely doesn't mean it's fast.",
      readTime: '12 min',
      category: 'Engineering',
      tags: ['Python', 'Engineering', 'Concurrency'],
      imageName: 'python_freethreading_banner.png'
    }
  },
  {
    path: '/Users/prakharbhatia/nandann-creative/blog-drafts/rust-wasm-production-2026.md',
    postInfo: {
      slug: 'rust-wasm-production-2026',
      description: "Rust-to-WASM is shipping in products people actually use. The tooling has caught up. The browsers have caught up. And the production evidence is piling up. From Figma to Shopify, here are the numbers and patterns to know about WebAssembly in 2026.",
      readTime: '14 min',
      category: 'Engineering',
      tags: ['Rust', 'WebAssembly', 'Performance'],
      imageName: 'rust_wasm_banner.png'
    }
  },
  {
    path: '/Users/prakharbhatia/nandann-creative/blog-drafts/salesforce-flow-vs-apex-2026.md',
    postInfo: {
      slug: 'salesforce-flow-vs-apex-2026',
      description: "Every Salesforce team hits the same wall. You've got a requirement. It could be a Flow. It could be Apex. Nobody can give you a straight answer on which one to pick. This isn't a religious debate. It's a tooling decision. And the landscape shifted.",
      readTime: '11 min',
      category: 'Salesforce',
      tags: ['Salesforce', 'Flow', 'Apex', 'Architecture'],
      imageName: 'salesforce_flow_apex_banner.png'
    }
  }
];

filesToProcess.forEach(item => {
  processPost(item.path, item.postInfo, TS_PATH);
});
