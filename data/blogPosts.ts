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
    readTime: '12 min read',
    category: 'Performance',
    tags: ['Performance', 'Core Web Vitals', 'Next.js'],
    contentHtml: `
      <h2>Focus on What Google Measures</h2>
      <p>Performance is not one toggle—it is a system. Core Web Vitals (LCP, CLS, INP) are the most reliable north stars for building fast experiences that also rank. In this guide we show the exact, low‑risk changes that reliably move those numbers in the right direction on a modern Next.js stack.</p>

      <h3>Core Web Vitals at a Glance</h3>
      <ul>
        <li><strong>LCP (Largest Contentful Paint):</strong> how quickly the main content appears. Target ≤ 2.5s (we aim for ≤ 2.0s).
        </li>
        <li><strong>CLS (Cumulative Layout Shift):</strong> visual stability. Target &lt; 0.1.
        </li>
        <li><strong>INP (Interaction to Next Paint):</strong> responsiveness. Target &lt; 200ms.</li>
      </ul>

      <h2>Images: Biggest Wins in the Fewest Steps</h2>
      <p>Images are the most common bottleneck. Use the Next.js <code>&lt;Image /&gt;</code> component, ship modern formats, and size correctly:</p>
      <ul>
        <li>Serve <strong>AVIF/WEBP</strong> where supported; keep originals as fallbacks.</li>
        <li>Use <strong>responsive sizes</strong> and <strong>priority</strong> only for above‑the‑fold hero media.</li>
        <li><strong>Lazy‑load</strong> below‑the‑fold assets and avoid CSS background images for critical hero content.</li>
        <li>Compress aggressively (lossy) for decorative imagery; lossless for brand assets.</li>
      </ul>

      <h2>Fonts: Beautiful Without Blocking</h2>
      <p>Fonts often delay LCP. Treat them like code:</p>
      <ul>
        <li>Prefer <strong>system fonts</strong> or a single <strong>variable font</strong>.</li>
        <li><strong>Preload</strong> the one critical font file used in the hero; use <code>font-display: swap</code>.</li>
        <li>Subset character ranges; keep weights/styles to the minimum that supports your brand.</li>
      </ul>

      <h2>JavaScript: Load Less, Later</h2>
      <p>Large bundles hurt both LCP and INP. The playbook:</p>
      <ul>
        <li><strong>Code-split</strong> by route and component; avoid shipping admin/editor code to public pages.</li>
        <li>Audit dependencies; remove or <strong>tree‑shake</strong> heavy UI libraries; prefer native or tiny utilities.</li>
        <li><strong>Defer third‑party scripts</strong> (analytics, chat, A/B) until interaction or idle. Load only on routes that need them.</li>
      </ul>

      <h2>Rendering Strategy: SSR/SSG/ISR</h2>
      <p>Choose the rendering mode that matches the page. Marketing pages usually benefit from SSG (fast, cacheable); data that changes often can use ISR so your CDN stays hot while content updates on a schedule.</p>

      <h2>Caching & CDN Strategy</h2>
      <ul>
        <li>Set <strong>immutable, 1‑year cache</strong> for hashed static assets (JS/CSS/images/fonts).</li>
        <li>Use a <strong>stale‑while‑revalidate</strong> policy for HTML where appropriate.</li>
        <li>Always serve from a CDN close to your audience; validate cache behavior after deploys.</li>
      </ul>

      <h2>Monitoring & Tooling</h2>
      <ul>
        <li>Lighthouse CI for budgets on PRs.</li>
        <li>Real‑user monitoring (RUM) for Web Vitals in production.</li>
        <li>WebPageTest for network waterfalls and filmstrips when you need deeper analysis.</li>
      </ul>

      <h2>Deployment Checklist</h2>
      <ol>
        <li>Hero image sized, compressed, and marked <code>priority</code>; all below‑the‑fold images lazy.</li>
        <li>Fonts preloaded (one file), display‑swap, subset; no CLS from font swaps.</li>
        <li>Third‑party scripts deferred to interaction/idle; route‑scoped where possible.</li>
        <li>Static assets cached for 1 year; HTML strategy defined (SSG/ISR/SSR).</li>
        <li>Vitals verified on staging and after first prod deploy.</li>
      </ol>

      <p>We include a performance audit in our <a href="${internalLinks.approach}">Approach</a> and <a href="${internalLinks.rapid}">Same‑Day Delivery</a> offerings. Every engagement ships with a short, actionable report you can keep improving against.</p>
    `,
    faqs: [
      { question: 'What is a good LCP target?', answer: 'Under 2.5s is considered good; we aim for ≤ 2.0s on median devices and networks.' },
      { question: 'How do you reduce unused JS?', answer: 'Code‑split by route, tree‑shake dependencies, remove unused UI libs, and defer third‑party scripts until user interaction or idle.' },
      { question: 'Do CDNs fix everything?', answer: 'They help, but you still need correct caching headers, optimized assets, and minimal JavaScript to see big wins.' },
      { question: 'Are Web Vitals enough?', answer: 'They are a great baseline. We complement them with RUM, waterfalls, and user journey timings for a full picture.' }
    ],
  },
  {
    slug: 'react-vs-nextjs-which-to-choose',
    title: 'React vs Next.js: Which Should You Choose in 2025?',
    description:
      'Understand when to use vanilla React and when a framework like Next.js unlocks speed and SEO wins.',
    date: '2025-01-03',
    readTime: '11 min read',
    category: 'Architecture',
    tags: ['React', 'Next.js', 'SSR', 'SEO'],
    contentHtml: `
      <h2>Choose Based on Outcomes</h2>
      <p><strong>React</strong> is a UI library. <strong>Next.js</strong> is a full‑stack framework that layers routing, data‑fetching, rendering strategies (SSR/SSG/ISR), asset optimization, and edge execution on top of React. The right choice depends on your product’s constraints—SEO, performance, deployment model, and team skills.</p>

      <h2>Rendering & Data‑Fetching</h2>
      <p>Next.js supports <em>Server Components</em>, Route Handlers/API routes, and multiple rendering modes. This lets you push heavy data work to the server and ship less JavaScript, improving INP and LCP out of the box.</p>

      <h3>When React (SPA) Makes Sense</h3>
      <ul>
        <li>Private dashboards behind auth where SEO is irrelevant.</li>
        <li>Embeddable widgets or micro‑frontends inside an existing host app.</li>
        <li>Highly bespoke build tooling that a framework might constrain.</li>
      </ul>

      <h3>When Next.js Shines</h3>
      <ul>
        <li>Marketing sites, blogs, and documentation that must rank on Google.</li>
        <li>E‑commerce where image optimization, caching, and edge routing matter.</li>
        <li>Apps that benefit from hybrid rendering or edge‑cached dynamic pages.</li>
      </ul>

      <h2>Operational Considerations</h2>
      <ul>
        <li>Image optimization (AVIF/WEBP), font controls, and Script strategies are built‑in.</li>
        <li>ISR lets you rebuild pages incrementally—great for catalogs and news.</li>
        <li>Route groups and layouts simplify code organization at scale.</li>
      </ul>

      <p>Still unsure? Explore our <a href="${internalLinks.services}">Services</a> or <a href="${internalLinks.contact}">talk to us</a>—we’ll recommend the leanest solution for your goals.</p>
    `,
    faqs: [
      { question: 'Can I migrate from CRA to Next.js?', answer: 'Yes. We migrate gradually by route, preserving business logic and enabling SSR/SSG/ISR where it helps SEO and performance.' },
      { question: 'Does Next.js help with SEO?', answer: 'Server rendering, metadata handling, image optimization, and hybrid caching give Next.js a strong SEO advantage over SPAs.' },
      { question: 'Is Next.js overkill for small sites?', answer: 'Not necessarily—SSG with a few routes is simple and fast. The framework scales with you when the site grows.' }
    ],
  },
  {
    slug: 'website-security-essentials',
    title: 'Website Security Essentials Every Business Should Implement',
    description:
      'Practical, high‑impact security steps that protect your brand and your customers.',
    date: '2025-01-02',
    readTime: '10 min read',
    category: 'Security',
    tags: ['Security', 'Best Practices', 'Headers'],
    contentHtml: `
      <h2>High‑Impact Basics</h2>
      <p>Security is a process, not a checkbox. We start with a hardened baseline: HTTPS everywhere, HSTS, strict TLS, and security headers. Dependencies are scanned automatically in CI and patched on a schedule.</p>
      <h3>Headers That Actually Help</h3>
      <ul>
        <li><strong>Content‑Security‑Policy:</strong> restricts where scripts, styles, and frames can load from.</li>
        <li><strong>X‑Frame‑Options / frame‑ancestors:</strong> prevent clickjacking.</li>
        <li><strong>X‑Content‑Type‑Options:</strong> stop MIME sniffing.</li>
        <li><strong>Referrer‑Policy:</strong> control what referrer data is sent.</li>
      </ul>
      <h3>Secrets & Access</h3>
      <ul>
        <li>Store tokens in a <strong>managed secret store</strong>, never in code.</li>
        <li>Use <strong>least privilege</strong> IAM; audit access and rotate keys.</li>
      </ul>
      <h3>App‑Layer Practices</h3>
      <ul>
        <li>Validate input on server and client; sanitize output.</li>
        <li>Use prepared statements/ORMs to avoid injection risks.</li>
        <li>Rate‑limit public endpoints and monitor anomalies.</li>
      </ul>
      <p>Security is part of our delivery workflow—learn more in our <a href="${internalLinks.approach}">Approach</a>.</p>
    `,
    faqs: [
      { question: 'Do you implement CSP?', answer: 'Yes. We start in report‑only mode, collect violations, whitelist legitimate sources, and then enforce CSP.' },
      { question: 'How do you handle secrets?', answer: 'Secrets live in managed stores (e.g., AWS Secrets Manager). Access is scoped per service and rotated regularly.' },
      { question: 'What about 3rd‑party scripts?', answer: 'We allowlist domains via CSP and load non‑critical scripts after interaction/idle to reduce both risk and performance impact.' }
    ],
  },
  {
    slug: 'mobile-first-design-principles',
    title: 'Mobile‑First Design Principles That Convert',
    description:
      'Design for the smallest screen first to create faster, more focused experiences that convert.',
    date: '2024-12-28',
    readTime: '9 min read',
    category: 'Design',
    tags: ['Design', 'UX', 'Mobile'],
    contentHtml: `
      <h2>Clarity and Speed</h2>
      <p>Designing for mobile first clarifies hierarchy, reduces bloat, and aligns teams around the essentials. We begin with real content, then expand to larger breakpoints without losing the focus that drives conversions.</p>
      <h3>Principles</h3>
      <ul>
        <li><strong>Single primary action</strong> per screen; everything else supports it.</li>
        <li><strong>Readable typography</strong> and generous spacing; no cramped UIs.</li>
        <li><strong>Touch‑friendly targets</strong> and gestures; motion that respects reduced‑motion preferences.</li>
      </ul>
      <h3>Performance by Design</h3>
      <p>Mobile‑first encourages smaller images, fewer fonts, and less JavaScript. Those choices pay dividends on desktop too.</p>
      <p>See how this flows into our <a href="${internalLinks.services}">Services</a> and <a href="${internalLinks.rapid}">Same‑Day Delivery</a>.</p>
    `,
    faqs: [
      { question: 'Will desktop suffer?', answer: 'No. Progressive enhancement ensures desktop gains clarity and speed from the same disciplined foundation.' },
      { question: 'How do you validate tap targets?', answer: 'We test on real devices and use accessibility tooling to ensure adequate target sizes and spacing.' }
    ],
  },
  {
    slug: 'seo-for-web-developers',
    title: 'SEO for Web Developers: What Actually Moves the Needle',
    description:
      'A developer‑first checklist: rendering, schema, performance, internal links, and sitemaps.',
    date: '2024-12-22',
    readTime: '10 min read',
    category: 'SEO',
    tags: ['SEO', 'Schema', 'Sitemaps', 'Performance'],
    contentHtml: `
      <h2>Developer SEO Checklist</h2>
      <p>Developers control the most durable SEO levers: rendering, schema, performance, and internal links. This checklist keeps the focus on outcomes rather than hacks.</p>
      <h3>Rendering & Canonicals</h3>
      <ul>
        <li>Serve correct HTTP status codes (200/301/404/410) and set <code>rel=canonical</code> to prevent duplication.</li>
        <li>Prefer SSG/ISR for content pages; SSR where personalization or freshness truly matters.</li>
      </ul>
      <h3>Structured Data</h3>
      <ul>
        <li>Use Organization/LocalBusiness site‑wide and Article for posts.</li>
        <li>Keep JSON‑LD minimal and valid; test with Google’s Rich Results tool.</li>
      </ul>
      <h3>Performance as SEO</h3>
      <ul>
        <li>Reduce JavaScript; defer third‑party scripts until interaction/idle.</li>
        <li>Optimize images, fonts, and caching; monitor real‑user Web Vitals.</li>
      </ul>
      <h3>Internal Links</h3>
      <ul>
        <li>Link descriptively between related pages (e.g., our <a href="${internalLinks.approach}">Approach</a> and services pages).</li>
        <li>Keep sitemaps and RSS current for discovery.</li>
      </ul>
      <p>We monitor via Search Console, refresh sitemaps/RSS automatically, and keep a change log of on‑page improvements.</p>
    `,
    faqs: [
      { question: 'Do FAQs help SEO?', answer: 'Yes—when they answer real questions uniquely. We limit them to high‑value pages and keep answers concise and original.' },
      { question: 'Are backlinks still important?', answer: 'Quality links from relevant sites help, but technical health and content usefulness come first.' }
    ],
  },
  {
    slug: 'ecommerce-development-best-practices',
    title: 'E‑commerce Development Best Practices for 2025',
    description:
      'From product data and search to checkout and performance—what matters most in modern e‑commerce.',
    date: '2024-12-18',
    readTime: '12 min read',
    category: 'E‑commerce',
    tags: ['E‑commerce', 'Checkout', 'Search', 'Performance'],
    contentHtml: `
      <h2>Build for Trust and Speed</h2>
      <p>High‑performing storefronts minimize friction from discovery to checkout. We structure catalogs for search, keep interfaces fast, and reinforce trust at every step with clear messaging and policies.</p>
      <h3>Catalog & Search</h3>
      <ul>
        <li>Structured product data with consistent attributes and filters that matter.</li>
        <li>Faceted search with sensible defaults and zero‑results safeguards.</li>
      </ul>
      <h3>Checkout UX</h3>
      <ul>
        <li>One clear path to purchase; remove distractions and doubts.</li>
        <li>Up‑front shipping/returns info and strong payment reassurance.</li>
      </ul>
      <h3>Performance & Media</h3>
      <ul>
        <li>Strict image governance (variants, AVIF/WEBP, responsive sizes, CDN rules).</li>
        <li>JavaScript budgets for third‑party scripts; defer non‑critical tags.</li>
      </ul>
      <p>We build scalable storefronts—see our <a href="${internalLinks.services}">Services</a> or <a href="${internalLinks.contact}">contact us</a>.</p>
    `,
    faqs: [
      { question: 'Which platform do you recommend?', answer: 'We pick the simplest platform that meets requirements—Shopify for speed to market, WooCommerce for WP ecosystems, or headless for complex catalogs/teams.' },
      { question: 'How do you handle many images?', answer: 'We enforce image governance: CDN transformations, modern formats, responsive sizes, and automated compression in the CMS pipeline.' },
      { question: 'How do you reduce cart abandonment?', answer: 'Speed, transparent costs, guest checkout, and clear reassurance (policies, badges) have the largest impact.' }
    ],
  },
];

export const getAllPosts = (): BlogPost[] =>
  blogPosts.sort((a, b) => (a.date < b.date ? 1 : -1));

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((p) => p.slug === slug);

