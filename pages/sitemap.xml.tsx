import { GetServerSideProps } from 'next';
import { blogPosts, getAllCategories, getAllTags } from '../data/blogPosts';
import { slugify } from '../lib/slugify';

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
    '/author/prakhar-bhatia',
    '/nextjs',
    '/nextjs/wordpress-to-nextjs-migration-cost',
    '/nextjs/wordpress-to-nextjs-migration-service',
    '/nextjs/wordpress-to-nextjs-seo-migration',
    '/nextjs/how-to-migrate-wordpress-to-nextjs',
    '/nextjs/nextjs-vs-wordpress-performance-benchmark',
    '/nextjs/nextjs-image-optimization-techniques',
    '/approach',
    '/portfolio',
    '/reset-file-and-folder-permissions',
    '/contact',
    '/rapid-same-day-website-delivery',
    '/web-development-new-york',
    '/web-development-california',
    '/web-development-florida',
    '/web-development-texas',
    '/web-development-illinois',
    '/web-development-pennsylvania',
    '/web-development-ohio',
    '/web-development-georgia',
    '/web-development-washington',
    '/web-development-new-jersey',
    '/web-development-north-carolina',
    '/web-development-massachusetts',
    '/web-development-virginia',
    '/web-development-michigan',
    '/web-development-colorado',
    '/web-development-arizona',
    // Plugin Pages
    '/bhairav-cloud-backup',
    '/ai-smart-404-redirect',
    '/core-web-vitals-rum',
    '/tg-live-chat',
    // Additional State Pages
    '/web-development-tennessee',
    '/web-development-maryland',
    '/web-development-louisiana',
    '/web-development-hawaii',
    '/web-development-oregon',
    '/web-development-utah',
    '/web-development-nevada',
    '/web-development-connecticut',
    '/web-development-south-carolina',
    '/web-development-kentucky',
    '/web-development-indiana',
    '/web-development-minnesota',
    '/web-development-wisconsin',
    '/web-development-missouri',
    '/web-development-alabama',
    '/web-development-oklahoma',
    '/web-development-iowa',
    '/web-development-kansas',
    '/web-development-arkansas',
    '/web-development-nebraska',
    '/web-development-mississippi',
    '/web-development-new-mexico',
    '/web-development-idaho',
    '/web-development-new-hampshire',
    '/web-development-west-virginia',
    '/web-development-delaware',
    '/web-development-maine',
    '/web-development-rhode-island',
    '/web-development-montana',
    '/web-development-north-dakota',
    '/web-development-south-dakota',
    '/web-development-alaska',
    '/web-development-wyoming',
    '/web-development-vermont',
    '/web-development-district-of-columbia',
    '/web-development-new-york/manhattan',
    '/web-development-new-york/brooklyn',
    '/web-development-new-york/queens',
    '/web-development-new-york/bronx',
    '/web-development-new-york/staten-island',
    // California County Pages
    '/california/web-development-los-angeles',
    '/california/web-development-san-diego',
    '/california/web-development-orange',
    '/california/web-development-riverside',
    '/california/web-development-san-bernardino',
    '/california/web-development-santa-clara',
    '/california/web-development-alameda',
    '/california/web-development-sacramento',
    '/california/web-development-contra-costa',
    '/california/web-development-fresno',
    '/california/web-development-kern',
    '/california/web-development-san-francisco',
    '/california/web-development-ventura',
    '/california/web-development-san-mateo',
    '/california/web-development-san-joaquin',
    '/california/web-development-stanislaus',
    '/california/web-development-sonoma',
    '/california/web-development-tulare',
    '/california/web-development-santa-barbara',
    '/california/web-development-monterey',
    '/california/web-development-placer',
    '/california/web-development-merced',
    '/california/web-development-santa-cruz',
    '/california/web-development-marin',
    '/california/web-development-solano',
    '/california/web-development-butte',
    '/california/web-development-yolo',
    '/california/web-development-el-dorado',
    '/california/web-development-imperial',
    '/california/web-development-shasta',
    '/california/web-development-madera',
    '/california/web-development-kings',
    '/california/web-development-napa',
    '/california/web-development-humboldt',
    '/california/web-development-nevada',
    '/california/web-development-sutter',
    '/california/web-development-mendocino',
    '/california/web-development-yuba',
    '/california/web-development-lake',
    '/california/web-development-san-luis-obispo',
    '/california/web-development-tehama',
    '/california/web-development-tuolumne',
    '/california/web-development-calaveras',
    '/california/web-development-san-benito',
    '/california/web-development-siskiyou',
    '/california/web-development-amador',
    '/california/web-development-lassen',
    '/california/web-development-glenn',
    '/california/web-development-del-norte',
    '/california/web-development-colusa'
  ];

  // Blog posts: real lastmod from post's lastUpdated or date
  const blogUrls = blogPosts.map((p) => {
    const lastmod = new Date(p.lastUpdated || p.date).toISOString().split('T')[0];
    return `  <url>\n    <loc>${baseUrl}/blog/${p.slug}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`;
  }).join('\n');

  // Category pages — lastmod = date of newest post in that category
  const categories = getAllCategories();
  const categoryUrls = categories.map((cat) => {
    const newest = blogPosts
      .filter((p) => p.category === cat)
      .map((p) => p.lastUpdated || p.date)
      .sort()
      .reverse()[0] ?? '2025-01-01';
    const lastmod = new Date(newest).toISOString().split('T')[0];
    return `  <url>\n    <loc>${baseUrl}/blog/category/${slugify(cat)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.6</priority>\n  </url>`;
  }).join('\n');

  // Tag pages — lastmod = date of newest post with that tag
  const tags = getAllTags();
  const seenTagSlugs = new Set<string>();
  const tagUrls = tags.flatMap((tag) => {
    const s = slugify(tag);
    if (seenTagSlugs.has(s)) return [];
    seenTagSlugs.add(s);
    const newest = blogPosts
      .filter((p) => p.tags.includes(tag))
      .map((p) => p.lastUpdated || p.date)
      .sort()
      .reverse()[0] ?? '2025-01-01';
    const lastmod = new Date(newest).toISOString().split('T')[0];
    return [`  <url>\n    <loc>${baseUrl}/blog/tag/${s}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.5</priority>\n  </url>`];
  }).join('\n');

  // Priority + changefreq by page type
  // lastmod uses a fixed content-accurate date per page type instead of today
  const getPageMeta = (page: string): { priority: string; changefreq: string; lastmod: string } => {
    const recentPost = new Date(blogPosts[0]?.date ?? '2025-01-01').toISOString().split('T')[0];
    if (page === '') return { priority: '1.0', changefreq: 'weekly', lastmod: recentPost };
    if (page === '/blog') return { priority: '0.9', changefreq: 'daily', lastmod: recentPost };
    if (page === '/author/prakhar-bhatia')
      return { priority: '0.7', changefreq: 'monthly', lastmod: recentPost };
    if (['/services', '/approach', '/about', '/portfolio'].includes(page))
      return { priority: '0.9', changefreq: 'monthly', lastmod: '2025-10-01' };
    if (['/contact', '/rapid-same-day-website-delivery'].includes(page))
      return { priority: '0.8', changefreq: 'monthly', lastmod: '2025-08-01' };
    if (page.startsWith('/nextjs')) return { priority: '0.7', changefreq: 'monthly', lastmod: '2025-11-01' };
    if (page.startsWith('/web-development') || page.startsWith('/california') || page.startsWith('/newyork'))
      return { priority: '0.5', changefreq: 'monthly', lastmod: '2025-08-01' };
    return { priority: '0.6', changefreq: 'monthly', lastmod: '2025-08-01' };
  };

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
      .map((page) => {
        const { priority, changefreq, lastmod } = getPageMeta(page);
        return `  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
      })
      .join('\n')}
${blogUrls}
${categoryUrls}
${tagUrls}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;