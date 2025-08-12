export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  readTime: string;
  category: string;
  tags: string[];
  coverImage?: string;
  contentHtml: string; // pre-rendered HTML string
};

// Helper for internal links used in multiple posts
const internalLinks = {
  approach: '/approach',
  services: '/services',
  rapid: '/rapid-delivery',
  contact: '/contact',
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'ai-web-development-2024',
    title: 'How AI Is Transforming Web Development in 2025',
    description:
      'Practical ways we use AI to accelerate delivery, improve quality, and ship better websites faster.',
    date: '2025-01-15',
    readTime: '5 min read',
    category: 'AI & Tech',
    tags: ['AI', 'Automation', 'Developer Productivity', 'Code Quality'],
    coverImage: '/images/Nandann-logo-new.png',
    contentHtml: `
      <h2>From Idea to Launch—Faster</h2>
      <p>AI copilots now help with boilerplate, pattern recognition, and code reviews—cutting delivery timelines by 20–40%. At Nandann, we combine AI-assisted coding with strict human review to ensure reliability and security.</p>
      <h3>Where AI Helps</h3>
      <ul>
        <li>Generate accessible UI variants and test states</li>
        <li>Audit performance and suggest fixes for Core Web Vitals</li>
        <li>Detect security misconfigurations early</li>
      </ul>
      <p>Want a rapid turnaround? See our <a href="${internalLinks.rapid}">Same‑Day Website Delivery</a> service and our <a href="${internalLinks.approach}">Approach</a> for how we keep quality high.</p>
    `,
  },
  {
    slug: 'same-day-website-delivery',
    title: 'Same‑Day Website Delivery: Our Exact Process',
    description:
      'A transparent look at how we launch production‑ready sites within 24 hours—without sacrificing quality.',
    date: '2025-01-10',
    readTime: '4 min read',
    category: 'Process',
    tags: ['Process', 'Delivery', 'Operations'],
    coverImage: '/images/Nandann-logo-new.png',
    contentHtml: `
      <h2>What Makes Same‑Day Possible</h2>
      <ol>
        <li>Discovery sprint and content prep (1 hour)</li>
        <li>Design system + sections library selection</li>
        <li>Implementation with AI‑assisted checklists</li>
        <li>Performance audit + accessibility checks</li>
        <li>Launch with DNS/SSL and analytics</li>
      </ol>
      <p>Looking to move fast? Start here: <a href="${internalLinks.rapid}">Same‑Day Delivery</a> or review our <a href="${internalLinks.services}">Services</a>.</p>
    `,
  },
  {
    slug: 'web-performance-optimization-guide',
    title: 'Complete Guide to Web Performance Optimization',
    description:
      'Actionable steps to hit green Core Web Vitals on modern stacks: Next.js, images, fonts, and caching.',
    date: '2025-01-05',
    readTime: '7 min read',
    category: 'Performance',
    tags: ['Performance', 'Core Web Vitals', 'Next.js'],
    contentHtml: `
      <h2>Focus on What Google Measures</h2>
      <ul>
        <li>Use Next.js image optimization (AVIF/WEBP, responsive sizes)</li>
        <li>Defer non‑critical scripts and use <code>afterInteractive</code> strategy</li>
        <li>Preload critical fonts, use display‑swap, subset where possible</li>
        <li>Cache‑control headers for static assets</li>
      </ul>
      <p>We include a performance audit in our <a href="${internalLinks.approach}">Approach</a> and <a href="${internalLinks.rapid}">Same‑Day Delivery</a> offerings.</p>
    `,
  },
  {
    slug: 'react-vs-nextjs-which-to-choose',
    title: 'React vs Next.js: Which Should You Choose in 2025?',
    description:
      'Understand when to use vanilla React and when a framework like Next.js unlocks speed and SEO wins.',
    date: '2025-01-03',
    readTime: '6 min read',
    category: 'Architecture',
    tags: ['React', 'Next.js', 'SSR', 'SEO'],
    contentHtml: `
      <h2>Choose Based on Outcomes</h2>
      <p>If SEO, routing, and performance matter, <strong>Next.js</strong> wins thanks to SSR/SSG and built‑in optimizations. For app‑like experiences without SEO needs, React SPA can be enough.</p>
      <p>Need help deciding? Explore our <a href="${internalLinks.services}">Services</a> or <a href="${internalLinks.contact}">talk to us</a>.</p>
    `,
  },
  {
    slug: 'website-security-essentials',
    title: 'Website Security Essentials Every Business Should Implement',
    description:
      'Practical, high‑impact security steps that protect your brand and your customers.',
    date: '2025-01-02',
    readTime: '5 min read',
    category: 'Security',
    tags: ['Security', 'Best Practices', 'Headers'],
    contentHtml: `
      <h2>High‑Impact Basics</h2>
      <ul>
        <li>Strict HTTPS and HSTS</li>
        <li>Security headers (X‑Frame‑Options, X‑Content‑Type‑Options, CSP)</li>
        <li>Dependency scanning and updates</li>
        <li>Principle of least privilege in cloud</li>
      </ul>
      <p>Security is part of our delivery workflow—learn more in our <a href="${internalLinks.approach}">Approach</a>.</p>
    `,
  },
  {
    slug: 'mobile-first-design-principles',
    title: 'Mobile‑First Design Principles That Convert',
    description:
      'Design for the smallest screen first to create faster, more focused experiences that convert.',
    date: '2024-12-28',
    readTime: '4 min read',
    category: 'Design',
    tags: ['Design', 'UX', 'Mobile'],
    contentHtml: `
      <h2>Clarity and Speed</h2>
      <p>Designing mobile‑first clarifies priorities, reduces bloat, and improves conversions. Keep copy tight, interactions obvious, and performance high.</p>
      <p>See how this flows into our <a href="${internalLinks.services}">Services</a> and <a href="${internalLinks.rapid}">Same‑Day Delivery</a>.</p>
    `,
  },
  {
    slug: 'seo-for-web-developers',
    title: 'SEO for Web Developers: What Actually Moves the Needle',
    description:
      'A developer‑first checklist: rendering, schema, performance, internal links, and sitemaps.',
    date: '2024-12-22',
    readTime: '6 min read',
    category: 'SEO',
    tags: ['SEO', 'Schema', 'Sitemaps', 'Performance'],
    contentHtml: `
      <h2>Developer SEO Checklist</h2>
      <ul>
        <li>Correct HTTP status codes and <code>rel=canonical</code></li>
        <li>Article schema on posts, Organization on site</li>
        <li>Fast LCP/INP; defer non‑critical JS</li>
        <li>Descriptive internal links—see our <a href="${internalLinks.approach}">Approach</a></li>
      </ul>
    `,
  },
  {
    slug: 'ecommerce-development-best-practices',
    title: 'E‑commerce Development Best Practices for 2025',
    description:
      'From product data and search to checkout and performance—what matters most in modern e‑commerce.',
    date: '2024-12-18',
    readTime: '7 min read',
    category: 'E‑commerce',
    tags: ['E‑commerce', 'Checkout', 'Search', 'Performance'],
    contentHtml: `
      <h2>Build for Trust and Speed</h2>
      <ul>
        <li>Clear product data and filters</li>
        <li>Fast, distraction‑free checkout</li>
        <li>Search and merchandising that learns</li>
        <li>Performance budgets and image discipline</li>
      </ul>
      <p>We build scalable storefronts—explore our <a href="${internalLinks.services}">Services</a> or <a href="${internalLinks.contact}">contact us</a>.</p>
    `,
  },
];

export const getAllPosts = (): BlogPost[] =>
  blogPosts.sort((a, b) => (a.date < b.date ? 1 : -1));

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((p) => p.slug === slug);

