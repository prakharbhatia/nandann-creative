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
  faqs?: { question: string; answer: string }[];
};

// Helper for internal links used in multiple posts
const internalLinks = {
  approach: '/approach',
  services: '/services',
  rapid: '/rapid-same-day-website-delivery',
  contact: '/contact',
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'ai-web-development-2025',
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
      <p>AI copilots now assist with boilerplate, pattern recognition, code reviews, and even writing high‑coverage test cases. In our delivery pipeline, AI reduces repetitive work so senior engineers spend more time on architecture, integrations, and performance.</p>
      <p>We pair AI generation with human review, static analysis, and CI checks. Every change passes linting, type‑checks, unit tests, and visual review on staging. This hybrid workflow has consistently cut delivery timelines by 20–40% while improving quality.</p>
      <h3>Where AI Helps Most</h3>
      <ul>
        <li><strong>UI variants:</strong> rapidly generate accessible component states across themes and breakpoints.</li>
        <li><strong>Performance audits:</strong> surface unused JavaScript, image bottlenecks, and render blocking resources.</li>
        <li><strong>Security checks:</strong> catch dependency risks and insecure headers before release.</li>
      </ul>
      <p>For urgent timelines, our <a href="${internalLinks.rapid}">Same‑Day Website Delivery</a> uses the same AI‑assisted pipeline. Learn more about how we work in our <a href="${internalLinks.approach}">Approach</a>.</p>
    `,
    faqs: [
      {
        question: 'Does AI replace developers?',
        answer: 'No. We use AI to remove grunt work. Senior engineers still own architecture, security, performance, and final delivery.'
      },
      {
        question: 'Will quality suffer with AI?',
        answer: 'We combine AI with human review, automated tests, and performance budgets. This raises—rather than lowers—quality.'
      }
    ],
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
      <p>We launch production‑ready marketing sites in 24 hours by constraining scope, front‑loading content, and using a proven sections library. You still get a custom look—without the custom lead time.</p>
      <ol>
        <li><strong>Discovery (1 hour):</strong> goals, sitemap, content handoff, success metrics.</li>
        <li><strong>Design System:</strong> select a foundation and lock typography, color, and spacing scales.</li>
        <li><strong>Implementation:</strong> assemble sections, connect forms/analytics, and wire internal links.</li>
        <li><strong>Quality:</strong> performance budget, accessibility pass, responsive checks, cross‑browser sanity.</li>
        <li><strong>Launch:</strong> DNS/SSL, uptime monitoring, and deployment notes.</li>
      </ol>
      <p>Need a fast launch? Start with <a href="${internalLinks.rapid}">Same‑Day Delivery</a> or explore our <a href="${internalLinks.services}">Services</a>.</p>
    `,
    faqs: [
      { question: 'What qualifies for same‑day?', answer: 'Marketing sites up to ~6 sections with standard integrations (forms, analytics, basic CMS). E‑commerce or custom apps usually need more time.' },
      { question: 'Is it mobile‑ready?', answer: 'Yes. We design mobile‑first and validate across common breakpoints before launch.' }
    ],
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
      <p>Core Web Vitals—LCP, CLS, and INP—drive both user experience and rankings. We optimize server render, reduce JS, and compress media to hit green scores.</p>
      <ul>
        <li>Optimize images: AVIF/WEBP, correct sizes, lazy‑loading below the fold.</li>
        <li>Trim JavaScript: split routes, remove unused code, defer third‑party scripts.</li>
        <li>Fonts: preload critical files, use display‑swap, and subset.</li>
        <li>Caching: aggressive Cache‑Control for static assets and CDN placement.</li>
      </ul>
      <p>Every build includes a Lighthouse pass and WebPageTest where appropriate. We document before/after metrics and ship a short report.</p>
      <p>We include a performance audit in our <a href="${internalLinks.approach}">Approach</a> and <a href="${internalLinks.rapid}">Same‑Day Delivery</a> offerings.</p>
    `,
    faqs: [
      { question: 'What is a good LCP target?', answer: 'Under 2.5s is considered good; we aim for <= 2.0s on median devices.' },
      { question: 'How do you reduce unused JS?', answer: 'Code‑split by route, tree‑shake dependencies, and defer third‑party scripts until interaction.' }
    ],
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
      <p><strong>React</strong> is a UI library; <strong>Next.js</strong> is a batteries‑included framework with routing, rendering strategies (SSR/SSG/ISR), image optimization, and edge‑ready builds. If SEO and performance matter, Next.js usually wins.</p>
      <h3>When React (SPA) Makes Sense</h3>
      <ul>
        <li>Private dashboards without SEO requirements</li>
        <li>Embedded widgets/micro‑frontends</li>
      </ul>
      <h3>When Next.js Shines</h3>
      <ul>
        <li>Marketing sites and blogs that must rank</li>
        <li>E‑commerce with dynamic rendering and image/CDN optimization</li>
      </ul>
      <p>Need help deciding? Explore our <a href="${internalLinks.services}">Services</a> or <a href="${internalLinks.contact}">talk to us</a>.</p>
    `,
    faqs: [
      { question: 'Can I migrate from CRA to Next.js?', answer: 'Yes. We migrate by route, preserving functionality while enabling SSR/SSG where it helps.' },
      { question: 'Does Next.js help with SEO?', answer: 'Yes. Server rendering, metadata handling, and image optimization improve discoverability and vitals.' }
    ],
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
      <p>Security starts with the platform. We enforce HTTPS everywhere, add HSTS, and ship with sane defaults at the CDN and application layers. Every dependency is scanned in CI.</p>
      <ul>
        <li>Strict HTTPS/HSTS and TLS configuration</li>
        <li>Security headers: X‑Frame‑Options, X‑Content‑Type‑Options, CSP</li>
        <li>Automated dependency scanning and patch strategy</li>
        <li>Least privilege IAM for cloud resources</li>
      </ul>
      <p>Security is part of our delivery workflow—learn more in our <a href="${internalLinks.approach}">Approach</a>.</p>
    `,
    faqs: [
      { question: 'Do you implement CSP?', answer: 'Yes. We roll out CSP with report‑only first, then enforce after validating third‑party domains.' },
      { question: 'How do you handle secrets?', answer: 'Secrets are stored in managed secret stores; never committed. Access is scoped and audited.' }
    ],
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
      <p>Mobile‑first forces clarity. We start with the most constrained layout, then progressively enhance. The result is focused content, simpler navigation, and faster pages across all devices.</p>
      <ul>
        <li>Prioritize primary actions and remove distractions</li>
        <li>Use system fonts or well‑tuned variable fonts</li>
        <li>Adopt touch‑friendly targets and motion that respects the user</li>
      </ul>
      <p>See how this flows into our <a href="${internalLinks.services}">Services</a> and <a href="${internalLinks.rapid}">Same‑Day Delivery</a>.</p>
    `,
    faqs: [
      { question: 'Will desktop suffer?', answer: 'No. We progressively enhance layouts; desktop gains clarity and performance from mobile‑first constraints.' }
    ],
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
      <p>SEO is not just keywords. Rendering strategy, schema, performance, and internal links are the major levers developers control. Here’s a pragmatic checklist that actually moves the needle.</p>
      <ul>
        <li>Send the right status codes and add <code>rel=canonical</code> where needed</li>
        <li>Use Article schema for posts and Organization/LocalBusiness for the site</li>
        <li>Improve LCP and INP by reducing JavaScript and optimizing media</li>
        <li>Link descriptively between related pages (e.g., our <a href="${internalLinks.approach}">Approach</a>)</li>
      </ul>
      <p>We monitor via Search Console and refresh sitemaps/RSS automatically.</p>
    `,
    faqs: [
      { question: 'Do FAQs help SEO?', answer: 'Yes. They can generate rich results and answer intent clearly—when they are unique and genuinely helpful.' }
    ],
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
      <p>Great storefronts feel instant and obvious. We design product discovery for speed, invest in image discipline, and keep checkout focused on conversion. Analytics informs iteration—not guesswork.</p>
      <ul>
        <li>Structured product data and filters that actually help</li>
        <li>Fast, distraction‑free checkout with clear reassurance</li>
        <li>Search/merchandising tuned by real user behavior</li>
        <li>Performance budgets to keep pages lean as catalogs grow</li>
      </ul>
      <p>We build scalable storefronts—explore our <a href="${internalLinks.services}">Services</a> or <a href="${internalLinks.contact}">contact us</a>.</p>
    `,
    faqs: [
      { question: 'Which platform do you recommend?', answer: 'We choose based on requirements—Shopify for speed to market, WooCommerce for WP ecosystems, or custom headless for complex needs.' },
      { question: 'How do you handle performance with many images?', answer: 'CDN variants, AVIF/WEBP, responsive sizes, and strict image governance in the CMS.' }
    ],
  },
];

export const getAllPosts = (): BlogPost[] =>
  blogPosts.sort((a, b) => (a.date < b.date ? 1 : -1));

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((p) => p.slug === slug);

