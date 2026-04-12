import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllPosts } from '../../data/blogPosts';

const BASE = 'https://www.nandann.com';
const AUTHOR_ID = `${BASE}/#/schema/person/1`;
const ORG_ID = `${BASE}/#organization`;
const WEBSITE_ID = `${BASE}/#website`;

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  const posts = getAllPosts();
  const now = new Date().toISOString();

  // ── Core nodes ──────────────────────────────────────────────────────────
  const websiteNode = {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${BASE}/`,
    name: 'Nandann Creative Agency',
    description: 'Professional web development and design agency specializing in Next.js, React, WordPress, Rust, and Salesforce.',
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const organizationNode = {
    '@type': ['Organization', 'LocalBusiness'],
    '@id': ORG_ID,
    name: 'Nandann Creative Agency',
    alternateName: 'Nandann Creative',
    url: `${BASE}/`,
    logo: `${BASE}/images/Nandann-logo-new.png`,
    image: `${BASE}/images/prakhar.jpg`,
    priceRange: '$2,500 - $15,000+',
    description: 'Professional web development and creative design agency specializing in AI-enhanced development, same-day delivery, and performance optimization. Led by Prakhar Bhatia with 16+ years of experience.',
    foundingDate: '2008',
    founder: { '@id': AUTHOR_ID },
    areaServed: ['United States', 'Canada', 'United Kingdom', 'Australia', 'India'],
    address: { '@type': 'PostalAddress', addressCountry: 'US' },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'hello@nandann.com',
      url: `${BASE}/contact`,
      availableLanguage: ['English'],
    },
    sameAs: [
      'https://github.com/prakharbhatia',
      'https://www.linkedin.com/company/nandann-creative',
    ],
  };

  const authorPersonNode = {
    '@type': 'Person',
    '@id': AUTHOR_ID,
    name: 'Prakhar Bhatia',
    url: `${BASE}/about`,
    image: {
      '@type': 'ImageObject',
      '@id': `${AUTHOR_ID}/image`,
      url: `${BASE}/images/prakhar.jpg`,
      width: 400,
      height: 400,
    },
    jobTitle: 'Founder & Lead Developer',
    sameAs: [
      'https://www.linkedin.com/in/prakharbhatia',
      'https://github.com/prakharbhatia',
    ],
    worksFor: { '@id': ORG_ID },
  };

  // ── Static WebPage + BreadcrumbList nodes ──────────────────────────────
  const staticPages = [
    { path: '', name: 'Home', description: 'Professional web development and design agency.' },
    { path: '/services', name: 'Services', description: 'Next.js, React, WordPress, Rust, and Salesforce development services.' },
    { path: '/approach', name: 'Our Approach', description: 'Our 4-step development approach: Discovery, Strategy, Build, Launch.' },
    { path: '/portfolio', name: 'Portfolio', description: 'Previous work and case studies from Nandann Creative Agency.' },
    { path: '/contact', name: 'Contact', description: 'Get in touch with Nandann Creative Agency.' },
    { path: '/blog', name: 'Blog', description: 'Technical articles on web development, AI, Rust, Python, and Salesforce.' },
    { path: '/rapid-same-day-website-delivery', name: 'Same-Day Website Delivery', description: 'Express website development delivered within 24 hours.' },
  ];

  const staticPageNodes = staticPages.flatMap(({ path, name, description }) => {
    const url = `${BASE}${path}/`;
    const id = `${BASE}${path}/#webpage`;
    const breadId = `${BASE}${path}/#breadcrumb`;
    const isHome = path === '';

    const webpage = {
      '@type': 'WebPage',
      '@id': id,
      url,
      name,
      description,
      inLanguage: 'en-US',
      isPartOf: { '@id': WEBSITE_ID },
    };

    const breadcrumb = {
      '@type': 'BreadcrumbList',
      '@id': breadId,
      itemListElement: isHome
        ? [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` }]
        : [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
            { '@type': 'ListItem', position: 2, name, item: url },
          ],
    };

    return [webpage, breadcrumb];
  });

  // ── Blog post nodes (WebPage + BreadcrumbList + Article per post) ───────
  const blogPostNodes = posts.flatMap((p) => {
    const url = `${BASE}/blog/${p.slug}/`;
    const webpageId = `${BASE}/blog/${p.slug}/#webpage`;
    const breadId = `${BASE}/blog/${p.slug}/#breadcrumb`;
    const articleId = `${BASE}/blog/${p.slug}/#article`;
    const imageId = p.coverImage ? `${BASE}/blog/${p.slug}/#primaryimage` : undefined;
    const wordCount = p.contentHtml
      ? p.contentHtml.replace(/<[^>]*>/g, '').split(/\s+/).length
      : 0;

    const webpageNode: Record<string, unknown> = {
      '@type': 'WebPage',
      '@id': webpageId,
      url,
      name: p.title,
      description: p.description,
      inLanguage: 'en-US',
      isPartOf: { '@id': WEBSITE_ID },
      datePublished: `${p.date}T00:00:00Z`,
      dateModified: `${p.lastUpdated || p.date}T00:00:00Z`,
    };
    if (imageId && p.coverImage) webpageNode.primaryImageOfPage = { '@id': imageId };

    const nodes: Record<string, unknown>[] = [webpageNode];

    if (imageId && p.coverImage) {
      nodes.push({
        '@type': 'ImageObject',
        '@id': imageId,
        url: `${BASE}${p.coverImage}`,
        contentUrl: `${BASE}${p.coverImage}`,
        width: 1200,
        height: 630,
      });
    }

    nodes.push({
      '@type': 'BreadcrumbList',
      '@id': breadId,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE}/blog/` },
        { '@type': 'ListItem', position: 3, name: p.title, item: url },
      ],
    });

    const articleNode: Record<string, unknown> = {
      '@type': 'Article',
      '@id': articleId,
      headline: p.title,
      description: p.description,
      datePublished: `${p.date}T00:00:00Z`,
      dateModified: `${p.lastUpdated || p.date}T00:00:00Z`,
      mainEntityOfPage: { '@id': webpageId },
      isPartOf: { '@id': webpageId },
      author: { '@id': AUTHOR_ID },
      publisher: { '@id': ORG_ID },
      wordCount,
      articleSection: p.category,
      keywords: p.tags.join(', '),
    };
    if (imageId) articleNode.image = { '@id': imageId };

    nodes.push(articleNode);
    return nodes;
  });

  const graph = [
    websiteNode,
    organizationNode,
    authorPersonNode,
    ...staticPageNodes,
    ...blogPostNodes,
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@graph': graph,
    _meta: {
      total: graph.length,
      page: 1,
      per_page: 1000,
      total_pages: 1,
      generated: now,
      plugin: 'Nandann Creative Next.js 1.0.0',
    },
  };

  res.setHeader('Content-Type', 'application/ld+json');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  res.status(200).json(schema);
}
