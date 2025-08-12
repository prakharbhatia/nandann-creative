import { GetServerSideProps } from 'next';
import { getAllPosts } from '../data/blogPosts';

function RSS() { return null; }

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const site = 'https://www.nandann.com';
  const posts = getAllPosts();

  const items = posts.map((p) => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${site}/blog/${p.slug}</link>
      <guid>${site}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description><![CDATA[${p.description}]]></description>
    </item>
  `).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>Nandann Creative Blog</title>
      <link>${site}/blog</link>
      <description>Insights on AI‑enhanced development, performance, and SEO</description>
      ${items}
    </channel>
  </rss>`;

  res.setHeader('Content-Type', 'application/rss+xml');
  res.write(xml);
  res.end();

  return { props: {} };
}

export default RSS;

