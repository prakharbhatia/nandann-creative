import type { BlogPost } from '../blogPosts';

const post: BlogPost = {
  slug: "web-performance-optimization-guide",
  title: "Complete Guide to Web Performance Optimization",
  description: "Actionable steps to hit green Core Web Vitals on modern stacks: Next.js, images, fonts, and caching.",
  date: "2025-08-13",
  lastUpdated: "2026-05-09",
  readTime: "18 min read",
  category: "Performance",
  tags: [
    "Performance",
    "Core Web Vitals",
    "Next.js"
  ],
  coverImage: "/api/og?title=Web%20Performance%20Optimization%20Guide&subtitle=Hit%20green%20Core%20Web%20Vitals",
  contentHtml: "\n      <img src=\"/api/og?title=Web%20Performance%20Optimization%20Guide&subtitle=Hit%20green%20Core%20Web%20Vitals\" alt=\"Web performance optimization banner\" />\n      <h2>Focus on What Google Measures</h2>\n      <p>Performance is not one toggle—it is a system. Core Web Vitals (LCP, CLS, INP) are the most reliable north stars for building fast experiences that also rank. In this guide we show the exact, low‑risk changes that reliably move those numbers in the right direction on a modern Next.js stack.</p>\n\n      <h3>Core Web Vitals at a Glance</h3>\n      <ul>\n        <li><strong>LCP (Largest Contentful Paint):</strong> how quickly the main content appears. Target ≤ 2.5s (we aim for ≤ 2.0s).</li>\n        <li><strong>CLS (Cumulative Layout Shift):</strong> visual stability. Target &lt; 0.1.</li>\n        <li><strong>INP (Interaction to Next Paint):</strong> responsiveness. Target &lt; 200ms.</li>\n      </ul>\n\n      <h2>Images: Biggest Wins in the Fewest Steps</h2>\n      <p>Images are the most common bottleneck. Use the Next.js <code>&lt;Image /&gt;</code> component, ship modern formats, and size correctly:</p>\n      <ul>\n        <li>Serve <strong>AVIF/WEBP</strong> where supported; keep originals as fallbacks.</li>\n        <li>Use <strong>responsive sizes</strong> and <strong>priority</strong> only for above‑the‑fold hero media.</li>\n        <li><strong>Lazy‑load</strong> below‑the‑fold assets and avoid CSS background images for critical hero content.</li>\n        <li>Compress aggressively (lossy) for decorative imagery; lossless for brand assets.</li>\n        <li>Generate multiple breakpoints and use <code>sizes</code> to avoid overserving large images to small screens.</li>\n      </ul>\n      <p>For galleries and PLPs, defer non‑critical thumbnails until scroll and consider blurred placeholders to guide perception without blocking layout. For hero video, prefer short, muted, inline MP4/WEBM and only when it truly clarifies value.</p>\n\n      <h2>Fonts: Beautiful Without Blocking</h2>\n      <p>Fonts often delay LCP. Treat them like code:</p>\n      <ul>\n        <li>Prefer <strong>system fonts</strong> or a single <strong>variable font</strong>.</li>\n        <li><strong>Preload</strong> the one critical font file used in the hero; use <code>font-display: swap</code>.</li>\n        <li>Subset character ranges; keep weights/styles to the minimum that supports your brand.</li>\n        <li>Host fonts locally to avoid third‑party latency and to simplify CSP.</li>\n      </ul>\n      <p>Audit CLS from late font swaps. If you cannot avoid a large web font, ship a tuned fallback stack that closely matches metrics to minimize reflow.</p>\n\n      <h2>JavaScript: Load Less, Later</h2>\n      <p>Large bundles hurt both LCP and INP. The playbook:</p>\n      <ul>\n        <li><strong>Code‑split</strong> by route and component; avoid shipping admin/editor code to public pages.</li>\n        <li>Audit dependencies; remove or <strong>tree‑shake</strong> heavy UI libraries; prefer native or tiny utilities.</li>\n        <li><strong>Defer third‑party scripts</strong> (analytics, chat, A/B) until interaction or idle. Load only on routes that need them.</li>\n        <li>Convert client components to <strong>Server Components</strong> where possible to ship fewer bytes.</li>\n        <li>Isolate expensive components with <code>dynamic(..., { ssr: false })</code> when they are purely client‑side and not above the fold.</li>\n      </ul>\n      <p>Measure interaction latency with the INP field in your RUM solution. An 80/20 fix is to reduce long tasks by breaking up heavy work (e.g., virtualization for large lists, Web Workers for CPU‑intensive processing).</p>\n\n      <h2>Rendering Strategy: SSR/SSG/ISR</h2>\n      <p>Choose the rendering mode that matches the page. Marketing pages usually benefit from SSG (fast, cacheable); data that changes often can use ISR so your CDN stays hot while content updates on a schedule. Use SSR for truly dynamic or personalized pages. Stream SSR where the shell can render immediately and data fills in progressively.</p>\n      <ul>\n        <li>Move data fetching to the server to reduce client JavaScript and improve INP.</li>\n        <li>Use <strong>edge caching</strong> for static/ISR pages to reduce TTFB.</li>\n        <li>Cache API responses with short TTLs or SWR to avoid refetching on every request.</li>\n      </ul>\n\n      <h2>Caching & CDN Strategy</h2>\n      <ul>\n        <li>Set <strong>immutable, 1‑year cache</strong> for hashed static assets (JS/CSS/images/fonts).</li>\n        <li>Use <strong>stale‑while‑revalidate</strong> for HTML where appropriate.</li>\n        <li>Prefer <strong>HTTP/2 or HTTP/3</strong> and consolidate domains to improve multiplexing.</li>\n        <li>Always serve from a CDN close to your audience; validate cache behavior after deploys.</li>\n      </ul>\n      <p>Make caching rules explicit in code, not tribal knowledge. Log cache headers in staging and verify with a cold/warm runbook so regressions are caught early.</p>\n\n      <h2>Third‑Party Scripts: Handle With Care</h2>\n      <p>Tags for analytics, chat, and A/B testing are frequent performance and privacy regressions. Reduce, defer, and sandbox:</p>\n      <ul>\n        <li>Load non‑critical scripts on interaction or after a short idle timeout.</li>\n        <li>Scope scripts to routes that need them instead of site‑wide.</li>\n        <li>Prefer server‑side tagging where possible; it reduces client overhead and leakage.</li>\n        <li>Guard with Consent Management so scripts do not load before permission.</li>\n      </ul>\n\n      <h2>Accessibility and Perceived Performance</h2>\n      <p>Perceived speed matters as much as stopwatch speed. Provide skeletons or content‑aware placeholders that hint at structure without jank. Keep focus states visible, ensure keyboard navigation works during loading, and avoid spinners that block interaction unnecessarily.</p>\n\n      <h2>Monitoring & Tooling</h2>\n      <ul>\n        <li>Lighthouse CI for budgets on PRs.</li>\n        <li>Real‑user monitoring (RUM) for Web Vitals in production.</li>\n        <li>WebPageTest for network waterfalls and filmstrips when you need deeper analysis.</li>\n        <li>Record <strong>TTFB, LCP, CLS, INP</strong> by route template; alert on regressions.</li>\n      </ul>\n      <p>Build a weekly performance review. Track the heaviest pages, long tasks over 200ms, and the worst‑case devices. Assign ownership to a specific person so fixes ship rather than linger in dashboards.</p>\n\n      <h2>Edge and Network Choices</h2>\n      <p>Latency is physics. Minimize round trips and move work closer to the user:</p>\n      <ul>\n        <li>Deploy static assets to a global CDN with HTTP/2/3 and TLS 1.3.</li>\n        <li>Co‑locate serverless/edge functions near your primary audience.</li>\n        <li>Batch requests; avoid chatty APIs; use compression (Brotli) everywhere.</li>\n      </ul>\n\n      <h2>Design Decisions That Affect Speed</h2>\n      <p>Design is a performance tool. Strong hierarchy, concise copy, and fewer competing modules reduce both cognitive load and code. Reserve complex animations for moments that truly help comprehension; prefer CSS transforms and opacity; respect reduced‑motion preferences.</p>\n\n      <h2>Case Study (Composite)</h2>\n      <p>A marketing site with a heavy JS bundle and non‑optimized images averaged ~3.2s LCP and poor INP. We migrated hero media to AVIF with proper <code>sizes</code>, reduced total JS by 35% through Server Components and dep pruning, deferred analytics until interaction, and added route‑scoped loading. LCP dropped to ~1.8s, CLS stabilized at 0.03, and INP improved under 180ms on midrange devices. Organic traffic and conversions both increased without copy or design changes.</p>\n\n      <h2>Deployment Checklist</h2>\n      <ol>\n        <li>Hero image sized, compressed, and marked <code>priority</code>; all below‑the‑fold images lazy.</li>\n        <li>Fonts preloaded (one file), display‑swap, subset; no CLS from font swaps.</li>\n        <li>Third‑party scripts deferred to interaction/idle; route‑scoped where possible.</li>\n        <li>Static assets cached for 1 year; HTML strategy defined (SSG/ISR/SSR).</li>\n        <li>Vitals verified on staging and after first prod deploy.</li>\n      </ol>\n\n      <h2>Ongoing Maintenance</h2>\n      <ul>\n        <li>Review the bundle report monthly; remove unused code and polyfills.</li>\n        <li>Re‑compress legacy images added by editors; enforce CMS upload limits.</li>\n        <li>Audit third‑party scripts quarterly; remove stale tags.</li>\n        <li>Track Web Vitals with RUM; fix regressions like incidents.</li>\n      </ul>\n\n      <p>We include a performance audit in our <a href=\"/approach\">Approach</a> and <a href=\"/rapid-same-day-website-delivery\">Same‑Day Delivery</a> offerings. Every engagement ships with a short, actionable report you can keep improving against.</p>\n    ",
  faqs: [
    {
      question: "What is a good LCP target?",
      answer: "Under 2.5s is considered good; we aim for ≤ 2.0s on median devices and networks."
    },
    {
      question: "How do you reduce unused JS?",
      answer: "Code‑split by route, tree‑shake dependencies, remove unused UI libs, and defer third‑party scripts until user interaction or idle."
    },
    {
      question: "Do CDNs fix everything?",
      answer: "They help, but you still need correct caching headers, optimized assets, and minimal JavaScript to see big wins."
    },
    {
      question: "Are Web Vitals enough?",
      answer: "They are a great baseline. We complement them with RUM, waterfalls, and user journey timings for a full picture."
    }
  ],
  howTo: {
    name: "How to Optimize Web Performance",
    description: "Hit green Core Web Vitals scores on modern stacks",
    steps: [
      {
        name: "Optimize Images",
        text: "Convert to AVIF/WebP, use responsive sizes, and preload hero images with the priority flag."
      },
      {
        name: "Speed Up Fonts",
        text: "Preload one critical font file, use font-display: swap, and subset character ranges."
      },
      {
        name: "Reduce JavaScript",
        text: "Code-split by route, tree-shake dependencies, use Server Components, and defer third-party scripts."
      },
      {
        name: "Choose Rendering Strategy",
        text: "Use SSG for marketing pages, ISR for frequently updating content, and SSR only for truly dynamic pages."
      },
      {
        name: "Set Up Caching",
        text: "Configure immutable 1-year cache for hashed assets and stale-while-revalidate for HTML."
      },
      {
        name: "Monitor Performance",
        text: "Set up RUM for Core Web Vitals, run Lighthouse CI on PRs, and alert on regressions."
      }
    ]
  }
};

export default post;
