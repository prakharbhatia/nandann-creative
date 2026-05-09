import { GetServerSideProps } from 'next';
import { getAllPosts } from '../data/blogPosts';
import { getAllCategories, getAllTags } from '../data/blogPosts';
import { slugify } from '../lib/slugify';

function LLMsTxt() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const base = 'https://www.nandann.com';
  const posts = getAllPosts();
  const categories = getAllCategories();
  const tags = getAllTags();

  const postLines = posts
    .map((p) => `- ${base}/blog/${p.slug} — ${p.title}`)
    .join('\n');

  const categoryLines = categories
    .map((c) => `- ${base}/blog/category/${slugify(c)} — ${c} articles`)
    .join('\n');

  // Deduplicate tags by slug
  const seenTagSlugs = new Set<string>();
  const tagLines = tags
    .flatMap((t) => {
      const s = slugify(t);
      if (seenTagSlugs.has(s)) return [];
      seenTagSlugs.add(s);
      return [`- ${base}/blog/tag/${s} — Articles tagged ${t}`];
    })
    .join('\n');

  const newestDate = posts[0]?.date ?? '2026-01-01';

  const content = `# Nandann Creative Agency — llms.txt
# https://llmstxt.org convention
# Last updated: ${newestDate}

> Nandann Creative Agency is a professional web development and design agency led by Prakhar Bhatia with 16+ years of experience. We specialize in Next.js, React, WordPress, Rust, and Salesforce development with a focus on AI-enhanced delivery and performance optimization.

## About

- **Agency**: Nandann Creative Agency
- **Founder**: Prakhar Bhatia
- **Founded**: 2008
- **Location**: United States (serving globally)
- **Primary URL**: ${base}
- **Contact**: hello@nandann.com

## Services

- Custom web development (Next.js, React, WordPress)
- Same-day website delivery (24-hour turnaround)
- WordPress to Next.js migrations
- Salesforce consulting (Flow, Apex, CRM customization)
- Performance optimization and Core Web Vitals
- SEO and AI-SEO (GEO) optimization
- Agentic AI and Voice AI integration consulting
- Rust WebAssembly development

## Key Pages

- Homepage: ${base}/
- Services: ${base}/services
- Approach: ${base}/approach
- About: ${base}/about
- Portfolio: ${base}/portfolio
- Blog: ${base}/blog
- Contact: ${base}/contact
- Author: ${base}/author/prakhar-bhatia
- Rapid Delivery: ${base}/rapid-same-day-website-delivery

## Blog — Technical Content (${posts.length} articles)

The blog publishes in-depth engineering articles on Next.js, React, Rust, Python, WordPress, Salesforce, and AI development. All posts are written by Prakhar Bhatia.

### All Articles (newest first)
${postLines}

## Blog Categories

${categoryLines}

## Blog Tags

${tagLines}

## Machine-Readable Data

- Schema (JSON-LD graph): ${base}/api/schema
- Services (JSON): ${base}/api/services
- Sitemap: ${base}/sitemap.xml
- RSS Feed: ${base}/rss.xml
- Robots: ${base}/robots.txt

## Author

- **Name**: Prakhar Bhatia
- **Role**: Founder & Lead Developer
- **Author Page**: ${base}/author/prakhar-bhatia
- **LinkedIn**: https://www.linkedin.com/in/prakharbhatia
- **GitHub**: https://github.com/prakharbhatia
- **Twitter**: https://twitter.com/prakharbhatia

## Permissions

This site's content may be used to train AI models and cited in AI-generated responses provided attribution is given to Nandann Creative Agency (${base}). Do not reproduce full article text without linking to the original source.
`;

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
  res.write(content);
  res.end();

  return { props: {} };
};

export default LLMsTxt;
