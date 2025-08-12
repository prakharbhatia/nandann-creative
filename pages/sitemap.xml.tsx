import { GetServerSideProps } from 'next';
import { blogPosts } from '../data/blogPosts';

function Sitemap() {
  // This component will never be rendered
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = 'https://www.nandann.com';
  
  // Static pages
  const staticPages = [
    '',
    '/about',
    '/services',
    '/blog',
    '/approach',
    '/portfolio',
    '/contact',
    '/rapid-delivery'
  ];

  // Generate sitemap XML
  const blogUrls = blogPosts.map((p) => `  <url>\n    <loc>${baseUrl}/blog/${p.slug}</loc>\n    <lastmod>${new Date(p.date).toISOString()}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.7</priority>\n  </url>`).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
    .map((page) => {
      const priority = page === '' ? '1.0' : '0.8';
      const changefreq = 'daily';
      
      return `  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join('\n')}
${blogUrls}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;