---
title: "Next.js 16.2: Everything You Need to Know About use cache, Turbopack, and the New Proxy API"
slug: "nextjs-16-2-complete-guide"
date: "2026-03-19"
category: "Next.js"
tags:
  - Next.js 16.2
  - use cache
  - Turbopack
  - React 19.2
  - Next.js proxy
  - Next.js performance
  - App Router
  - Server Components
keywords:
  - Next.js 16.2 features
  - use cache directive Next.js
  - Next.js 16 Turbopack default
  - Next.js proxy.ts middleware replacement
  - React 19.2 Next.js
  - Next.js 16 migration guide
  - Next.js 16 breaking changes
  - Turbopack Next.js production
metaDescription: "Next.js 16.2 ships with the use cache directive, proxy.ts replacing middleware.ts, Turbopack as default bundler, and React 19.2. This guide covers every change with working code examples and a migration checklist."
readTime: "25 min"
author: "nandann"
featured: true
---

Next.js 16.2 is the most disruptive release since the App Router landed in Next.js 13. That sounds like hype, but it's structural: the release reverses the framework's default stance on caching, replaces the default bundler, renames and repurposes the middleware layer, and ships with React 19.2. Any of those four changes alone would require a migration guide. All four at once means you need to understand what changed and why before touching your `next.config.ts`.

The short version: caching is now fully opt-in. Everything is dynamic by default. Turbopack runs your builds. `middleware.ts` is being replaced by `proxy.ts`. And React 19.2 brings `useEffectEvent`, the `<Activity>` component, and View Transitions directly into the framework.

This guide covers every major change with working code examples, explains the reasoning behind each decision, and gives you a concrete migration path from Next.js 15.

## What Changed in Next.js 16.2: Quick Reference

| Feature | Status in 16.2 | Impact |
|---|---|---|
| `use cache` directive | Stable (opt-in via `cacheComponents`) | High |
| `cacheLife()` and `cacheTag()` | Stable (no `unstable_` prefix) | High |
| Turbopack | Default bundler for `dev` and `build` | High |
| `proxy.ts` | New pattern, replaces `middleware.ts` | High |
| React 19.2 | Bundled | Medium |
| React Compiler 1.0 | Stable, opt-in | Medium |
| `after()` API | Stable | Medium |
| Async `cookies()` / `headers()` | Strictly enforced | High |
| `serverRuntimeConfig` / `publicRuntimeConfig` | Removed | High |
| AMP support | Removed | Low for most apps |
| `next lint` command | Removed | Low |
| Node.js 18 support | Dropped | Medium |
| Parallel routes `default.js` | Required | Medium |

---

## Part 1: The `use cache` Directive

### Why the Old Caching Model Failed

If you built anything with the App Router in Next.js 13 or 14, you hit the caching confusion wall. `fetch()` calls were cached by default. Routes were statically optimized unless they called certain APIs. Route segment config options like `export const revalidate = 60` let you opt into ISR, but the semantics of `revalidate: 0` versus `dynamic = 'force-dynamic'` were never obvious. Adding a single `cookies()` call to a layout could silently make your entire route tree dynamic.

The model was implicit. The framework made decisions for you, and when those decisions were wrong, the error messages pointed you in the wrong direction.

Next.js 16 reverses this. Dynamic is the default. Caching is explicit. If something is cached, it's because you said so.

### How `use cache` Works

`"use cache"` is a directive, same as `"use client"` and `"use server"`. You place it at the top of a file, a function body, or a component body. The compiler picks it up at build time and generates a cache key automatically from the function's arguments and any variables it closes over.

Different inputs produce different cache entries. If you call `getProduct(1)` and `getProduct(2)`, those are two separate cache entries. If the function closes over a variable, that variable is part of the key too. Arguments must be serializable, which means no class instances, no functions, no non-plain objects.

To use `use cache`, enable it in `next.config.ts`:

```ts
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
};

export default nextConfig;
```

Setting `cacheComponents: true` replaces both `experimental.dynamicIO` and `experimental.ppr` from Next.js 15. Enabling it changes the default behavior of the entire app, so test thoroughly before deploying.

### Three Ways to Use `use cache`

#### File-Level Caching

Place `"use cache"` at the top of a file, before any imports. Every exported async function and async Server Component in that file becomes cached. Use this for fully static pages where all the data is known at build time.

```ts
// app/blog/[slug]/page.tsx
'use cache';

import { cacheLife } from 'next/cache';
import { getBlogPost } from '@/lib/blog';

cacheLife('days');

export default async function BlogPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
```

#### Function-Level Caching

Place `"use cache"` inside an async function body. This is the most granular option and the one you will use most often. Each unique set of arguments gets its own cache entry.

```ts
// lib/products.ts
import { cacheLife, cacheTag } from 'next/cache';

export async function getProduct(id: string) {
  'use cache';
  cacheLife('hours');
  cacheTag(`product:${id}`);

  const product = await db.query('SELECT * FROM products WHERE id = $1', [id]);
  return product;
}

export async function getProductsByCategory(category: string, page: number) {
  'use cache';
  cacheLife('minutes');
  cacheTag(`category:${category}`);

  const products = await db.query(
    'SELECT * FROM products WHERE category = $1 LIMIT 20 OFFSET $2',
    [category, (page - 1) * 20]
  );
  return products;
}
```

#### Component-Level Caching

Place `"use cache"` at the top of an async Server Component body. The framework caches the rendered output, not just the data. This works with Partial Prerendering to produce a static shell that streams in.

```tsx
// components/ProductCard.tsx
import { cacheLife, cacheTag } from 'next/cache';
import { getProduct } from '@/lib/products';

export async function ProductCard({ id }: { id: string }) {
  'use cache';
  cacheLife('hours');
  cacheTag(`product:${id}`);

  const product = await getProduct(id);

  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <span>${product.price}</span>
    </div>
  );
}
```

### Controlling Cache Duration with `cacheLife()`

`cacheLife()` takes either a named profile or an inline object with three timing properties: `stale`, `revalidate`, and `expire`, all in seconds.

- `stale`: how long a client can hold the cached response before revalidating
- `revalidate`: how often the server regenerates the cache entry in the background
- `expire`: the hard maximum age. After this, the cache entry is deleted and rebuilt on next request.

Named profiles:

| Profile | stale | revalidate | expire |
|---|---|---|---|
| `'seconds'` | 0 | 1 | 60 |
| `'minutes'` | 0 | 60 | 3600 |
| `'hours'` | 0 | 3600 | 86400 |
| `'days'` | 0 | 86400 | 604800 |
| `'weeks'` | 0 | 604800 | 2592000 |
| `'max'` | 0 | 2592000 | Infinity |

For custom timing:

```ts
export async function getInventoryCount(productId: string) {
  'use cache';
  // Inventory can go stale for 30 seconds, regenerates every 2 minutes,
  // hard expires after 10 minutes.
  cacheLife({ stale: 30, revalidate: 120, expire: 600 });
  cacheTag(`inventory:${productId}`);

  const count = await db.query(
    'SELECT stock_count FROM inventory WHERE product_id = $1',
    [productId]
  );
  return count;
}
```

### Cache Invalidation with `cacheTag()`, `revalidateTag()`, and `updateTag()`

`cacheTag()` assigns one or more string tags to a cache entry. You can then invalidate entries by tag without clearing unrelated data.

`revalidateTag()` marks entries as stale. The next request to those entries will trigger a background regeneration. Use this in webhooks and cron jobs.

`updateTag()` is designed for Server Actions where the user needs to see their change immediately after submitting a form (read-your-writes consistency). It invalidates the tag synchronously within the same request lifecycle.

```ts
// app/actions/product.ts
'use server';

import { revalidateTag, updateTag } from 'next/cache';

// Use in a Server Action where the user submitted a form
export async function updateProductPrice(productId: string, newPrice: number) {
  await db.query(
    'UPDATE products SET price = $1 WHERE id = $2',
    [newPrice, productId]
  );

  // User sees the updated price immediately
  updateTag(`product:${productId}`);

  // Also invalidate any category pages that list this product
  revalidateTag(`category:electronics`);
}

// Use in a webhook handler
export async function POST(request: Request) {
  const { type, productId } = await request.json();

  if (type === 'product.updated') {
    revalidateTag(`product:${productId}`);
  }

  return Response.json({ ok: true });
}
```

### Passing Runtime Values to Cached Functions

This is a pattern that trips people up. You cannot call `cookies()`, `headers()`, or read `params` directly inside a `"use cache"` function. Those are runtime APIs that return dynamic data, which defeats the purpose of caching.

The correct pattern is to extract runtime values in an uncached parent component and pass them as arguments to your cached functions:

```tsx
// app/dashboard/page.tsx
// No 'use cache' here - this component reads runtime APIs
import { cookies } from 'next/headers';
import { CachedDashboard } from './CachedDashboard';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;

  if (!userId) {
    redirect('/login');
  }

  // Pass the extracted value as an argument to the cached component
  return <CachedDashboard userId={userId} />;
}

// components/CachedDashboard.tsx
import { cacheLife, cacheTag } from 'next/cache';
import { getUserData } from '@/lib/user';

export async function CachedDashboard({ userId }: { userId: string }) {
  'use cache';
  cacheLife('minutes');
  cacheTag(`dashboard:${userId}`);

  const data = await getUserData(userId);

  return (
    <div>
      <h1>Welcome, {data.name}</h1>
      {/* ... */}
    </div>
  );
}
```

The cache key for `CachedDashboard` includes `userId` as an argument, so each user gets their own cache entry.

### Partial Prerendering and `use cache`

When `cacheComponents: true` is set, PPR becomes the default rendering model. The framework splits your page into a static shell (anything covered by `"use cache"`) and dynamic holes (anything inside `<Suspense>` that reads runtime APIs).

The static shell is sent immediately. Dynamic content streams in as it resolves. This is different from server-side rendering, where the entire page waits for all data before sending any HTML.

One rule: non-deterministic operations like `Math.random()` and `Date.now()` must be placed either inside a `"use cache"` function (where they run once and are stored) or inside a `<Suspense>` boundary. The framework enforces this at build time.

```tsx
// app/product/[id]/page.tsx
import { Suspense } from 'react';
import { ProductDetails } from '@/components/ProductDetails';  // has 'use cache'
import { InventoryBadge } from '@/components/InventoryBadge';  // reads live data
import { RecommendationsSkeleton } from '@/components/skeletons';

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div>
      {/* Static shell - served from cache immediately */}
      <ProductDetails id={params.id} />

      {/* Dynamic hole - streams in after page load */}
      <Suspense fallback={<span>Checking stock...</span>}>
        <InventoryBadge productId={params.id} />
      </Suspense>
    </div>
  );
}
```

---

## Part 2: Turbopack Is Now the Default

### What Changed

Starting with Next.js 16, Turbopack is the default bundler for both `next dev` and `next build`. You do not need any flags to use it. If you were already using Turbopack via `next dev --turbo` in Next.js 15, nothing changes. If you were on webpack, your next `npm install` is going to change your bundler.

By the time 16.0 shipped, 50% of Next.js dev sessions were already on Turbopack. The production build support was the missing piece that held it back from being default.

### Performance Numbers

These are the numbers Vercel published alongside the 16.2 release:

| Metric | Webpack | Turbopack | Improvement |
|---|---|---|---|
| Cold dev startup (large app) | ~22s | ~2.9s | ~87% faster |
| Fast Refresh (code change) | ~3.2s | ~0.8s | ~75% faster |
| Server Fast Refresh (16.2) | ~59ms | ~12.4ms | ~79% faster |
| Production build (react.dev) | baseline | 2.5x faster | 60% reduction |
| Dev restart with FS cache (16.1) | baseline | 10x faster | 90% reduction |

Server Fast Refresh in 16.2 is the most notable new addition. Instead of reloading the entire module chain when a server file changes, Turbopack reloads only the affected module and its direct dependents. On a file change to a deeply nested utility, the difference between 59ms and 12ms is meaningful during rapid iteration.

### Opting Back to Webpack

If you have a webpack configuration that you cannot migrate immediately, use the explicit webpack flags:

```bash
# Development with webpack
next dev --webpack

# Production build with webpack
next build --webpack
```

If you try to run `next build` (without the flag) with a `webpack` key in your `next.config.ts`, the build will fail with an explicit error telling you to either remove the webpack config or use `--webpack`. This is intentional, not a bug.

### Migrating Your Webpack Config to Turbopack

The `experimental.turbopack` key moves to a top-level `turbopack` key. `resolve.fallback` becomes `turbopack.resolveAlias`. Tilde (`~`) prefixes in Sass imports need to be removed.

```ts
// next.config.ts - Before (Next.js 15)
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    turbopack: {
      resolveAlias: {
        'old-package': 'new-package',
      },
    },
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
};

export default nextConfig;
```

```ts
// next.config.ts - After (Next.js 16)
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      'old-package': 'new-package',
      // Node.js polyfills (replaces resolve.fallback)
      fs: { browser: './shims/fs-browser.ts' },
      path: { browser: 'path-browserify' },
    },
  },
};

export default nextConfig;
```

For Sass, update your imports:

```scss
/* Before */
@import '~bootstrap/scss/bootstrap';

/* After */
@import 'bootstrap/scss/bootstrap';
```

### Suppressing Third-Party Warnings

Third-party packages sometimes emit Turbopack warnings you cannot fix. Use `turbopack.ignoreIssue` to filter them:

```ts
// next.config.ts
const nextConfig: NextConfig = {
  turbopack: {
    ignoreIssue: [
      {
        // Suppress warnings from a specific package
        path: /node_modules\/some-package/,
        severity: 'warning',
      },
    ],
  },
};
```

---

## Part 3: `proxy.ts` Replaces `middleware.ts`

### Why the Change

"Middleware" is overloaded. In Express, middleware is a function in the request handling chain. In Next.js, `middleware.ts` ran on the network edge, before routing, and had access to only the Edge Runtime. The names collided and the mental model was constantly confused.

`proxy.ts` is the replacement. The name reflects what it actually does: it proxies requests, intercepts them at the network boundary, and decides what to do before they reach your application code. More importantly, `proxy.ts` drops the Edge Runtime and runs on Node.js only.

### The Three-Step Migration

1. Rename `middleware.ts` to `proxy.ts`
2. Rename the `middleware` export to `proxy`
3. Rename config flags: `skipMiddlewareUrlNormalize` becomes `skipProxyUrlNormalize`, `skipTrailingSlashRedirect` stays the same

The codemod handles all of this:

```bash
npx @next/codemod@canary upgrade latest
```

Side-by-side comparison:

```ts
// middleware.ts (old)
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/protected/:path*'],
  skipMiddlewareUrlNormalize: true,
};
```

```ts
// proxy.ts (new)
import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('auth-token');
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/protected/:path*'],
  skipProxyUrlNormalize: true,
};
```

### The Critical Runtime Change

`middleware.ts` ran on the Edge Runtime: a stripped-down V8 environment with no Node.js APIs, no file system, no native modules. This was fast but severely limiting.

`proxy.ts` runs on the Node.js runtime. You can use `fs`, `crypto`, native Node.js modules, and any npm package that does not require a browser environment.

If you were relying on Edge Runtime for geographic routing or low-latency auth at the CDN level, you need to keep `middleware.ts` for now. It still works, it is deprecated, but it is not removed. Vercel has said Edge Runtime guidance for `proxy.ts` is coming in a future minor release.

### A Real-World `proxy.ts` with JWT Auth

```ts
// proxy.ts
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

const PROTECTED_PATHS = ['/dashboard', '/settings', '/api/user'];
const PUBLIC_PATHS = ['/login', '/signup', '/api/auth'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Pass through public paths immediately
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Check if this path needs protection
  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p));
  if (!isProtected) {
    return NextResponse.next();
  }

  const token = request.cookies.get('auth-token')?.value;

  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);

    // Add user ID to request headers so route handlers can read it
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', payload.sub as string);
    requestHeaders.set('x-user-role', payload.role as string);

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  } catch {
    // Token is invalid or expired
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete('auth-token');
    return response;
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
```

### Where Business Logic Belongs

Keep `proxy.ts` narrow. It should intercept, inspect, redirect, or rewrite. It should not run database queries or call third-party APIs on every request.

- `proxy.ts`: auth checks, locale detection, A/B test cookie assignment, request rewrites
- Route Handlers: business logic APIs, third-party integrations
- Server Actions: mutations, form submissions

---

## Part 4: React 19.2 Integration

### What's New in React 19.2

React 19.2 shipped on October 1, 2025 and is bundled into Next.js 16. It adds `useEffectEvent`, the `<Activity>` component, View Transitions support, performance tracking in Chrome DevTools, and a 3.5x speedup in RSC payload deserialization.

### `useEffectEvent`: Solve the Stale Closure Problem

`useEffectEvent` creates a stable function reference that always reads the latest props and state, without being listed in the effect's dependency array. This solves a class of stale closure bugs that previously required `useRef` workarounds.

```tsx
// Before React 19.2: stale closure hack with useRef
function AnalyticsTracker({ pageId, userId }: { pageId: string; userId: string }) {
  const userIdRef = useRef(userId);
  useEffect(() => {
    userIdRef.current = userId;
  }, [userId]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Had to use ref to avoid stale closure
      sendAnalytics({ pageId, userId: userIdRef.current });
    }, 30000);
    return () => clearInterval(interval);
  }, [pageId]); // userId intentionally excluded, fragile
}

// After React 19.2: useEffectEvent
function AnalyticsTracker({ pageId, userId }: { pageId: string; userId: string }) {
  const logEvent = useEffectEvent((event: string) => {
    // Always reads the latest userId, no refs needed
    sendAnalytics({ pageId, userId, event });
  });

  useEffect(() => {
    const interval = setInterval(() => {
      logEvent('heartbeat');
    }, 30000);
    return () => clearInterval(interval);
  }, [pageId]); // Only re-runs when pageId changes
}
```

### `<Activity>`: Background Tabs Without Unmounting

`<Activity>` hides its children with `display: none` while keeping them mounted. Effects are paused while the activity is hidden and resume when it becomes visible again. State is preserved.

This is ideal for tab-based navigation where you want to preserve form state and scroll position without re-fetching data:

```tsx
import { Activity } from 'react';

function TabContainer() {
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'settings'>('overview');

  return (
    <div>
      <nav>
        <button onClick={() => setActiveTab('overview')}>Overview</button>
        <button onClick={() => setActiveTab('analytics')}>Analytics</button>
        <button onClick={() => setActiveTab('settings')}>Settings</button>
      </nav>

      {/* Each tab is mounted but hidden when not active */}
      {/* Form state, scroll position, and fetched data are all preserved */}
      <Activity mode={activeTab === 'overview' ? 'visible' : 'hidden'}>
        <OverviewTab />
      </Activity>

      <Activity mode={activeTab === 'analytics' ? 'visible' : 'hidden'}>
        <AnalyticsTab />
      </Activity>

      <Activity mode={activeTab === 'settings' ? 'visible' : 'hidden'}>
        <SettingsTab />
      </Activity>
    </div>
  );
}
```

Versus conditional rendering, which unmounts components on tab switch and loses all state:

```tsx
// Conditional rendering - loses state on switch
{activeTab === 'settings' && <SettingsTab />}
```

### View Transitions

React 19.2 coordinates with the browser View Transitions API. Enable it in `next.config.ts`:

```ts
// next.config.ts
const nextConfig: NextConfig = {
  viewTransition: true,
};
```

In Next.js 16.2, the `<Link>` component gains a `transitionTypes` prop:

```tsx
import Link from 'next/link';

export function BlogCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      transitionTypes={['slide-in-from-right']}
    >
      <h2>{post.title}</h2>
    </Link>
  );
}
```

Add the CSS for your transitions:

```css
/* app/globals.css */
@view-transition {
  navigation: auto;
}

::view-transition-old(root) {
  animation: 200ms ease-out slide-out;
}

::view-transition-new(root) {
  animation: 200ms ease-in slide-in;
}

@keyframes slide-out {
  to { transform: translateX(-100%); opacity: 0; }
}

@keyframes slide-in {
  from { transform: translateX(100%); opacity: 0; }
}
```

One note: the default prefix for `useId` changed in React 19.2 for View Transitions compatibility. If you have snapshot tests that assert on the exact output of `useId`, they will fail after upgrading.

### Server Actions Improvements

`useFormState` is renamed to `useActionState` and moves from `react-dom` to `react`. The old import still works but produces a deprecation warning.

```tsx
// Before (Next.js 15 / React 18)
import { useFormState } from 'react-dom';

function ContactForm() {
  const [state, formAction] = useFormState(submitContact, { error: null });
  return (
    <form action={formAction}>
      {state.error && <p>{state.error}</p>}
      <input name="email" type="email" />
      <button type="submit">Submit</button>
    </form>
  );
}

// After (Next.js 16 / React 19.2)
import { useActionState } from 'react';

function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContact, { error: null });
  return (
    <form action={formAction}>
      {state.error && <p>{state.error}</p>}
      <input name="email" type="email" />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
```

`useActionState` adds a `isPending` third return value, which replaces the need for a separate `useTransition` call in most form patterns.

Server Actions also get better error boundaries in 16.2. Unhandled errors in Server Actions no longer crash the entire page; they surface in the nearest error boundary or are caught by `useActionState`.

---

## Part 5: The `after()` API

### What `after()` Does

`after()` schedules a callback to run after the response has been sent to the client. The route handler returns normally, the response is sent, and then your callback runs.

The use case is secondary work that should not block the response: logging, analytics, cache warming, sending notifications.

```ts
// app/api/products/[id]/view/route.ts
import { after } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const productId = params.id;

  // This runs before the response is sent
  const product = await db.query('SELECT * FROM products WHERE id = $1', [productId]);

  // Response is sent immediately
  const response = Response.json({ product });

  // after() runs after the response is sent
  after(async () => {
    await db.query(
      'INSERT INTO product_views (product_id, viewed_at) VALUES ($1, NOW())',
      [productId]
    );
    await analytics.track('product_viewed', { productId });
  });

  return response;
}
```

### `after()` vs Running Code After `return`

You might wonder why you cannot just run code after the `return` statement. You can't, because `return` ends the function's execution. Even if you use `Promise` callbacks, they may not complete if the serverless function's execution context is torn down after the response is sent.

`after()` tells the runtime to keep the execution context alive until the callback completes. On Vercel, this uses `waitUntil` under the hood. On self-hosted Node.js, it keeps the event loop alive for the duration of the callback.

```ts
// This does NOT work - code after return never runs
export async function GET() {
  const data = await fetchData();
  return Response.json(data);
  await logRequest(); // unreachable
}

// This DOES work
export async function GET() {
  const data = await fetchData();
  after(() => logRequest()); // runs after response is sent
  return Response.json(data);
}
```

---

## Part 6: Image Component Updates

### New Props in Next.js 16.2

The `next/image` component gets two new props: `overrideSrc` and `fetchPriority`.

`overrideSrc` lets you override the `src` used in the `<img>` tag while keeping the original `src` for optimization. This is useful when you need the rendered HTML to point to a specific URL (for social sharing metadata, for example) while still using Next.js image optimization.

```tsx
import Image from 'next/image';

export function ShareableProductImage({ product }: { product: Product }) {
  return (
    <Image
      src={product.imageUrl}
      overrideSrc={product.canonicalImageUrl}  // used in rendered <img> src
      alt={product.name}
      width={800}
      height={600}
    />
  );
}
```

`fetchPriority` maps directly to the browser's `fetchpriority` attribute:

```tsx
// Above-the-fold hero image
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  fetchPriority="high"
  priority
/>

// Below-the-fold images
<Image
  src="/product.jpg"
  alt="Product"
  width={400}
  height={400}
  fetchPriority="low"
/>
```

### `next.config.ts` Image Configuration Changes

Several image defaults changed in Next.js 16:

```ts
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    // Minimum cache time raised from 60 seconds to 4 hours (14400)
    minimumCacheTTL: 14400,

    // Use remotePatterns instead of deprecated domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.example.com',
        pathname: '/uploads/**',
      },
    ],

    // For local images with query strings (new in 16)
    localPatterns: [
      {
        pathname: '/assets/**',
        search: '?version=*',
      },
    ],

    // qualities narrowed to [75] by default. Specify explicitly if you need others.
    qualities: [40, 75, 90],
  },
};
```

---

## Part 7: React Compiler 1.0

### What It Does

React Compiler 1.0 is now stable and ships with Next.js 16. It automatically memoizes components and hooks at compile time. The output is equivalent to manually applying `useMemo`, `useCallback`, and `React.memo` across your entire codebase, but done by the compiler rather than by you.

You get better performance with zero code changes. The compiler only transforms code that follows the Rules of React, so it is safe to enable on most codebases.

### Enabling It

```bash
npm install babel-plugin-react-compiler@latest
```

```ts
// next.config.ts
const nextConfig: NextConfig = {
  reactCompiler: true,
};
```

Next.js 16 optimizes the compiler to run only on files that would benefit. It analyzes your project first, then applies the Babel transform selectively. This limits the compile time overhead.

### The Tradeoff

React Compiler uses Babel, not SWC. Next.js uses SWC by default for transforms. Enabling the compiler adds a Babel pass to your build pipeline, which increases compile time. For large apps with significant component-level re-render problems, this is worth it. For small apps, it probably is not.

Benchmark your build times before and after enabling it. If the compile time increase is more than 10-15%, evaluate whether the runtime improvement justifies it for your specific traffic patterns.

---

## Part 8: Developer Experience Improvements

### Hydration Diff Indicator

The error overlay now shows a `+ Client` / `- Server` diff on hydration mismatches, similar to a git diff. Instead of a generic error message, you see exactly what the server rendered versus what the client expected.

Common mismatch example:

```
Hydration failed because the server rendered HTML didn't match the client.

- Server: <time datetime="2026-03-19">March 19, 2026</time>
+ Client: <time datetime="2026-03-19">Today</time>
```

This tells you exactly where the mismatch happened and what the discrepancy was.

### Server Function Logging

Every Server Action and Server Function execution is logged to the terminal by default:

```
▶ POST /dashboard/settings [Server Action: updateUserProfile]
  args: { name: "Alex", email: "alex@example.com" }
  duration: 142ms
  source: app/dashboard/settings/actions.ts:23
```

You can configure this in `next.config.ts`:

```ts
const nextConfig: NextConfig = {
  logging: {
    serverFunctions: {
      args: false,    // hide arguments (for sensitive data)
      duration: true,
    },
    browserToTerminal: true,  // forward browser errors to terminal
  },
};
```

### Debugging Production Servers with `--inspect`

```bash
# Attach a Node.js debugger to the dev server
next dev --inspect

# Attach to a production server locally
next start --inspect
```

After running either command, open `chrome://inspect` in Chrome, click "Open dedicated DevTools for Node", and connect. You can set breakpoints in server-side code, inspect variables, and profile production code paths without `console.log` chains.

### Bundle Analyzer

```bash
npx next experimental-analyze
```

This opens an interactive UI that shows your production bundle broken down by route, with import chain visualization, server-to-client component boundary mapping, and CSS sizes. Use it to find components that are accidentally shipped to the client or large dependencies that should be lazy loaded.

---

## Part 9: Breaking Changes and Migration

### Async Request APIs Are Now Strictly Enforced

In Next.js 14 and 15, `cookies()`, `headers()`, `draftMode()`, `params`, and `searchParams` returned synchronous values but warned about upcoming deprecation. In Next.js 16, synchronous access is removed. Every call must be awaited.

```tsx
// Before (Next.js 15 and earlier)
import { cookies, headers } from 'next/headers';

export default function Layout({ children, params }: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const cookieStore = cookies(); // synchronous - no longer works
  const theme = cookieStore.get('theme')?.value ?? 'light';
  const locale = params.locale; // synchronous - no longer works

  return <div data-theme={theme} lang={locale}>{children}</div>;
}

// After (Next.js 16)
import { cookies } from 'next/headers';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value ?? 'light';
  const { locale } = await params;

  return <div data-theme={theme} lang={locale}>{children}</div>;
}
```

Run the codemod to handle most of these automatically:

```bash
npx @next/codemod@canary migrate-to-async-dynamic-apis
```

After running the codemod, use `next typegen` to generate type-safe `PageProps` and `LayoutProps`:

```bash
npx next typegen
```

This generates a `__generated__` directory with accurate types for `params` and `searchParams` based on your file system structure.

### `serverRuntimeConfig` and `publicRuntimeConfig` Removed

```ts
// Before (no longer works)
import getConfig from 'next/config';
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const dbUrl = serverRuntimeConfig.DATABASE_URL;
const apiUrl = publicRuntimeConfig.API_URL;
```

```ts
// After
// Server-only values: use process.env directly
const dbUrl = process.env.DATABASE_URL;

// Client-visible values: NEXT_PUBLIC_ prefix
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Runtime-only access (not baked at build time): use connection()
import { connection } from 'next/server';

export async function getServerSideValue() {
  await connection(); // tells Next.js this is dynamic
  return process.env.RUNTIME_ONLY_VALUE;
}
```

### Removed Features

**AMP support** is gone. `useAmp`, `export const config = { amp: true }`, and `next/amp` are all removed. Most AMP use cases are covered by Next.js's default Core Web Vitals optimizations and the `<Image>` component.

**`next lint` command** is removed from the Next.js CLI. Update your CI pipeline:

```bash
# Before
next lint

# After - use ESLint directly
eslint .

# Or Biome
biome check .
```

`@next/eslint-plugin-next` now uses ESLint Flat Config format. Update your `eslint.config.mjs`:

```js
// eslint.config.mjs
import nextPlugin from '@next/eslint-plugin-next';

export default [
  {
    plugins: { next: nextPlugin },
    rules: nextPlugin.configs.recommended.rules,
  },
];
```

### Parallel Routes Now Require `default.js`

Every parallel route slot directory needs an explicit `default.js` file. Builds fail without one.

```tsx
// app/@sidebar/default.js
export default function DefaultSidebar() {
  return null;
}

// app/@modal/default.js
import { notFound } from 'next/navigation';

export default function DefaultModal() {
  return notFound();
}
```

### `experimental` Keys Moved

| Old (Next.js 15) | New (Next.js 16) |
|---|---|
| `experimental.dynamicIO` | `cacheComponents` |
| `experimental.ppr` | removed (use `cacheComponents`) |
| `experimental.turbopack` | `turbopack` |
| `experimental.adapterPath` | `adapterPath` |
| `reactCompiler` (in experimental) | `reactCompiler` (top-level) |

---

## Part 10: Full Migration Checklist

### Step 0: Run the Automated Codemod

```bash
npx @next/codemod@canary upgrade latest
```

This handles: Turbopack config move, `next lint` removal, `middleware` to `proxy` rename, `unstable_` prefix removal from `cacheTag` and `cacheLife`, `experimental_ppr` segment config removal. Run this first, commit the result, then do the manual steps.

### Step 1: Update Node.js and TypeScript

Next.js 16 requires Node.js 20.9.0 minimum (Node.js 18 is dropped). TypeScript minimum is 5.1.0.

```json
// package.json
{
  "engines": {
    "node": ">=20.9.0"
  }
}
```

### Step 2: Fix Async Request APIs

```bash
npx @next/codemod@canary migrate-to-async-dynamic-apis
npx next typegen
```

Review the codemod output. It handles most cases, but manually verify any complex layouts or middleware that read request data.

### Step 3: Test Turbopack Compatibility

Start with `next build --webpack` to confirm your app builds correctly with the known-good bundler. Then run `next build` without the flag. If the Turbopack build fails, the error message will tell you exactly what configuration is incompatible.

Common issues:
- Custom webpack loaders without Turbopack equivalents
- `~` prefix in Sass imports
- `experimental.turbopack` key still in config (must move to top-level `turbopack`)

### Step 4: Replace `serverRuntimeConfig` and `publicRuntimeConfig`

Search your codebase for `getConfig()` and `next/config`:

```bash
grep -r "next/config" --include="*.ts" --include="*.tsx" .
grep -r "serverRuntimeConfig\|publicRuntimeConfig" --include="*.ts" --include="*.tsx" .
```

Migrate each occurrence to `process.env` or `NEXT_PUBLIC_`.

### Step 5: Rename `middleware.ts` to `proxy.ts`

If the codemod did not handle this:

1. Rename `middleware.ts` to `proxy.ts`
2. Rename `export function middleware` to `export function proxy`
3. Update config flag: `skipMiddlewareUrlNormalize` to `skipProxyUrlNormalize`
4. Test all auth flows and redirects

If your `middleware.ts` used Edge Runtime features (like `EdgeRuntime` APIs or Geolocation from the request), assess whether you need to keep a `middleware.ts` alongside the new `proxy.ts` temporarily.

### Step 6: Update `next/image` Configuration

```ts
// Checklist for next.config.ts images key:
// [ ] Remove deprecated `domains`, replace with `remotePatterns`
// [ ] Add `localPatterns.search` if using query strings on local images
// [ ] Review `minimumCacheTTL` (default raised to 14400)
// [ ] Check `qualities` (default narrowed to [75])
// [ ] Verify `imageSizes` if you had custom values
```

### Step 7: Add `default.js` to Parallel Routes

Find all parallel route slot directories:

```bash
find . -type d -name "@*" -not -path "*/node_modules/*"
```

Add a `default.js` to each one that does not already have one.

### Step 8: Fix CI Pipeline for `next lint` Removal

Replace `next lint` in your CI scripts with `eslint .` or `biome check .`. Update ESLint config to Flat Config format.

### Step 9: Opt Into `cacheComponents` (Optional)

This is the most involved step and entirely optional. Your app will run without it. When you are ready:

1. Set `cacheComponents: true` in `next.config.ts`
2. Run `next build` and look for non-determinism errors
3. Add `"use cache"` to data-fetching functions, starting with the most expensive ones
4. Wrap runtime API reads (`cookies()`, `headers()`, `params`) in `<Suspense>` or extract them in parent components and pass as arguments
5. Add `cacheTag()` to every cached function so you can invalidate precisely
6. Add `cacheLife()` to set appropriate TTLs

### Step 10: Verify

```bash
# Confirm webpack build still works
next build --webpack

# Confirm Turbopack build works
next build

# Run your test suite
npm test

# Check Core Web Vitals with Lighthouse or WebPageTest
```

---

## Performance Benchmarks Summary

| Metric | Before (Webpack / Next.js 15) | After (Turbopack / Next.js 16.2) |
|---|---|---|
| Cold dev startup (large app) | ~22s | ~2.9s |
| Fast Refresh (component change) | ~3.2s | ~0.8s |
| Server Fast Refresh (server file change) | ~59ms | ~12.4ms |
| Production build (react.dev) | baseline | 2.5x faster |
| Dev restart with FS cache | baseline | 10x faster (16.1) |
| RSC payload deserialization | baseline | 3.5x faster (React 19.2) |
| `ImageResponse` rendering | baseline | 3.7x faster (16.0) |

These numbers come from Vercel's published benchmarks and the Next.js 16.x release notes. Your results will vary based on project size, module count, and hardware. The cold start improvement is the most consistently reported win across community benchmarks.

---

## Frequently Asked Questions

**Do I have to rewrite my app to use Next.js 16?**

No. The major features (`use cache`, `proxy.ts`, `cacheComponents`) are all opt-in. The breaking changes (async APIs, removed configs) require code changes, but the codemod handles most of them automatically. A typical migration from Next.js 15 takes a few hours for a medium-sized app.

**Can I still use the Pages Router?**

Yes. Pages Router support is unchanged. None of the new features in 16.2 apply to the Pages Router.

**Is Edge Runtime gone entirely?**

No. Edge Runtime is still available for Route Handlers via the `runtime = 'edge'` export. What changed is that `proxy.ts` (the replacement for `middleware.ts`) runs on Node.js only. `middleware.ts` still works and still uses Edge Runtime, it is just deprecated.

**Does `use cache` replace SWR or React Query?**

No. `use cache` runs on the server and caches server-side data. SWR and React Query run on the client and manage client-side cache state, optimistic updates, refetch on focus, and similar client behaviors. They solve different problems. You can use both.

**Is Webpack still supported?**

Yes, via `next dev --webpack` and `next build --webpack`. Webpack support is not being removed, but it is no longer the default. Turbopack is.

**What happens to my existing ISR setup?**

If you used `export const revalidate = 60` in route segment files, that still works in Next.js 16 without enabling `cacheComponents`. If you enable `cacheComponents`, you should migrate to `"use cache"` with `cacheLife()`, because route segment config for revalidation is deprecated under the new model.

**Is the React Compiler safe to enable on my production app?**

React Compiler 1.0 is stable, not experimental. It transforms valid React code that follows the Rules of React. If your components have side effects in render, mutate state directly, or break other React rules, the compiler will skip those components with a warning rather than transform them incorrectly. Enable it on a branch, run your full test suite, and measure the build time impact before shipping.

---

## Conclusion

Next.js 16.2 makes three structural changes that shift how you think about building with the framework.

Caching is now opt-in. If data is dynamic by default and you cache explicitly with `"use cache"`, you will spend less time debugging why pages are stale and more time making deliberate decisions about what data can be shared across requests. The `cacheTag` and `cacheLife` primitives give you enough control to be precise without requiring a separate CDN configuration.

Turbopack is the bundler. The performance numbers are real. If your Webpack config is straightforward, the migration is a few config key renames and one Sass import search-and-replace. If your config is complex, the `--webpack` flag gives you a safe fallback while you work through the migration.

`proxy.ts` replaces `middleware.ts` for Node.js-based request interception. For most teams, the rename is mechanical. The meaningful change is that you can now use full Node.js APIs in your request interceptor, which opens up JWT verification with native crypto, database session lookups, and any other operation that previously required Edge-compatible implementations.

Start the migration with the codemod. It handles the mechanical changes in minutes. Then work through the checklist above section by section. The optional steps (`cacheComponents`, React Compiler) are worth evaluating once the required migration is stable.

The official upgrade guide lives at [nextjs.org/docs/app/building-your-application/upgrading/version-16](https://nextjs.org/docs/app/building-your-application/upgrading/version-16).
