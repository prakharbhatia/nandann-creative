import type { NextApiRequest, NextApiResponse } from 'next';

const BASE = 'https://www.nandann.com';

const services = {
  organization: {
    name: 'Nandann Creative Agency',
    url: BASE,
    contact: 'hello@nandann.com',
    founded: 2008,
    founder: 'Prakhar Bhatia',
    description: 'Professional web development and design agency specializing in Next.js, React, WordPress, Rust, and Salesforce with 16+ years of experience.',
  },
  services: [
    {
      id: 'custom-web-development',
      name: 'Custom Web Development',
      description: 'Bespoke web applications and websites built with modern frameworks including Next.js, React, and TypeScript.',
      technologies: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Rust'],
      priceRange: { min: 2500, max: 15000, currency: 'USD' },
      deliveryTime: '2–6 weeks',
      url: `${BASE}/services`,
    },
    {
      id: 'same-day-website-delivery',
      name: 'Same-Day Website Delivery',
      description: 'Express website development and launch within 24 hours. Ideal for landing pages, MVPs, and urgent business needs.',
      technologies: ['Next.js', 'React', 'Vercel'],
      priceRange: { min: 2500, max: 5000, currency: 'USD' },
      deliveryTime: '24 hours',
      url: `${BASE}/rapid-same-day-website-delivery`,
    },
    {
      id: 'wordpress-development',
      name: 'WordPress Development',
      description: 'Custom WordPress themes, plugins, and migrations. Specializing in WordPress to Next.js migrations for performance gains.',
      technologies: ['WordPress', 'PHP', 'Next.js', 'WooCommerce'],
      priceRange: { min: 1500, max: 8000, currency: 'USD' },
      deliveryTime: '1–4 weeks',
      url: `${BASE}/services`,
    },
    {
      id: 'wordpress-to-nextjs-migration',
      name: 'WordPress to Next.js Migration',
      description: 'Full migration service from WordPress to Next.js including SEO preservation, content transfer, and performance optimization.',
      technologies: ['Next.js', 'WordPress REST API', 'Vercel'],
      priceRange: { min: 3000, max: 12000, currency: 'USD' },
      deliveryTime: '2–5 weeks',
      url: `${BASE}/nextjs/wordpress-to-nextjs-migration-service`,
    },
    {
      id: 'salesforce-consulting',
      name: 'Salesforce Consulting',
      description: 'Salesforce Flow design, Apex development, CRM customization, and Agentforce integration.',
      technologies: ['Salesforce', 'Apex', 'Flow', 'Agentforce', 'LWC'],
      priceRange: { min: 2000, max: 10000, currency: 'USD' },
      deliveryTime: '1–4 weeks',
      url: `${BASE}/services`,
    },
    {
      id: 'performance-optimization',
      name: 'Performance Optimization',
      description: 'Core Web Vitals improvement, LCP/CLS/INP optimization, image optimization, and Lighthouse score enhancement.',
      technologies: ['Next.js', 'Vercel', 'CDN', 'WebP', 'AVIF'],
      priceRange: { min: 1000, max: 5000, currency: 'USD' },
      deliveryTime: '1–2 weeks',
      url: `${BASE}/services`,
    },
    {
      id: 'seo-optimization',
      name: 'SEO & AI-SEO Optimization',
      description: 'Technical SEO, structured data (JSON-LD), AI-SEO for ChatGPT/Gemini/Perplexity visibility, and ongoing SEO management.',
      technologies: ['JSON-LD', 'Next.js', 'Schema.org', 'Google Search Console'],
      priceRange: { min: 500, max: 3000, currency: 'USD' },
      deliveryTime: '1–3 weeks',
      url: `${BASE}/services`,
    },
    {
      id: 'website-maintenance',
      name: 'Website Maintenance',
      description: 'Ongoing maintenance including security updates, content updates, performance monitoring, and technical support.',
      technologies: ['WordPress', 'Next.js', 'Vercel', 'GitHub'],
      priceRange: { min: 99, max: 500, currency: 'USD', billingCycle: 'monthly' },
      deliveryTime: 'Ongoing',
      url: `${BASE}/services`,
    },
  ],
  _meta: {
    generated: new Date().toISOString(),
    version: '1.0.0',
    endpoint: `${BASE}/api/services`,
    schema: `${BASE}/api/schema`,
    contact: `${BASE}/contact`,
  },
};

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  res.status(200).json(services);
}
