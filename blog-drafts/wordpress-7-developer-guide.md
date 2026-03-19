# WordPress 7.0 Is the Biggest Release Since Gutenberg — And It Will Break Your Plugin

> **Status:** Skeleton / Outline — content to be written
> **Target Audience:** WordPress plugin/theme developers, agency developers, WordPress engineers
> **Tone:** Developer-first, direct, code-heavy, honest about breaking changes
> **Slug:** `wordpress-7-developer-guide`
> **Category:** WordPress
> **Tags:** WordPress 7.0, WordPress, WP AI Client, Connectors API, Abilities API, MCP, Real-Time Collaboration, Block Editor, Gutenberg, PHP 7.4, iframed editor, Interactivity API
> **Est. Read Time:** 30–35 min
> **Release Date:** April 9, 2026 (RC1: March 19, 2026)
> **Sources Researched:** 35+ articles — Make WordPress Core dev notes, WordPress.org news, WPBeginner, InstaWP, DEV Community, WPDeveloper, GitHub, AnthemCreation, 365i, The Repository

---

## Introduction

_Hook: WordPress 7.0 ships April 9, 2026 — 3 weeks away. It's the most impactful major release since WordPress 5.0 brought Gutenberg. For end users it looks like a polish release. For developers, it is a breaking change event: the editor is now always iframed, PHP 7.2/7.3 are dead, the Interactivity API router changed, DataViews replaces WP_List_Table on core screens, and three entirely new API systems (WP AI Client, Connectors API, Abilities API + MCP) just landed in core. This post is everything a plugin or theme developer needs to know before April 9._

---

## What's New at a Glance

_Quick-reference table: every major feature and breaking change, sorted by developer impact (High / Medium / Low). At-a-glance status: what's new, what's deprecated, what's removed. Links to each section below._

---

## Part 1: PHP 7.2 and 7.3 Are Gone

### The New PHP Minimum: 7.4

_PHP 7.4.0 is the new minimum for WordPress 7.0. Sites running PHP 7.2 or 7.3 will be blocked from updating — they stay on the WordPress 6.9 branch. Recommended version remains PHP 8.2 or 8.3. Usage dropped below the 4% retirement threshold._

### What PHP 7.4 Unlocks for Your Code

_Plugin and theme developers targeting WordPress 7.0+ can now safely use typed properties, arrow functions (`fn() =>`), null coalescing assignment (`??=`), and array spread operators. Show before/after examples of each._

```php
// Code example placeholder: PHP 7.4 features now safe to use in plugins
// typed properties, arrow functions, null coalescing assignment
```

### What You Need to Do

_Upgrade your server to PHP 7.4 minimum. Audit custom code written for PHP 7.2 syntax assumptions. Test against PHP 8.2+ before going live. Links to Trac ticket #62622._

---

## Part 2: WP AI Client — AI Infrastructure Lands in Core

### What the WP AI Client Actually Is

_It is developer infrastructure, not an end-user feature. A uniform PHP + JavaScript API layer for calling any generative AI model (OpenAI, Anthropic, Google, or any future provider). The same API call works across all providers — WordPress handles HTTP transport, caching, credentials, and event management._

### How to Initialize and Call It in PHP

_Initialize on the `init` hook. Show a basic example calling the AI Client from a plugin._

```php
// Code example placeholder: WordPress\AI_Client\AI_Client::init() and a basic generation call
```

### JavaScript API

_The JS layer mirrors the PHP API. Show how to call the AI Client from a block's JavaScript._

```js
// Code example placeholder: JS AI Client call from a Gutenberg block
```

### The Three Official Provider Plugins

_OpenAI, Anthropic (Claude), and Google provider plugins on WordPress.org. Each auto-registers with WP AI Client and exposes dynamically discovered models. If an AI provider plugin already registers, a Connector is created automatically — no extra code needed._

### The Standalone Package Is Deprecated

_If your plugin depends on the standalone WP AI Client Composer package — audit now. The PHP SDK infrastructure is disabled in the standalone package; REST API and JS API remain active temporarily. Migrate to the core API._

### No Built-In AI Features for End Users

_WP AI Client is plumbing. End users get AI features only via plugins that use the API. This is intentional — Automattic is avoiding vendor lock-in._

---

## Part 3: Connectors API — Centralized External Service Management

### What the Connectors API Is

_A new framework in WordPress 7.0 for registering and managing connections to external services. Replaces per-plugin credential management. One API key entry shared across all plugins on the site._

### Settings > Connectors: The New Admin Page

_New wp-admin page. Extensible route-based UI — plugins can hook in to add their own connector types. Built-in connectors: Anthropic, Google, OpenAI registered with hardcoded defaults._

### How Authentication Works

_API keys checked in priority order: environment variable → PHP constant → database. Auto-generated database key pattern: `connectors_ai_{$id}_api_key`. Show how to set each._

```php
// Code example placeholder: environment variable, PHP constant, and database key patterns
```

### How to Register a Custom Connector

_PHP registration for custom connector types. Custom frontend UI for non-standard types requires client-side JavaScript registration. Non-AI connector types can be registered in 7.0 but lack full UI support until a future release._

```php
// Code example placeholder: registering a custom connector type in PHP
```

### Why This Matters for Plugin Developers

_If your plugin calls an AI service today, you should migrate to the Connectors API. Users get a unified settings page. Your plugin gets shared credentials. You get automatic compatibility with WP AI Client._

---

## Part 4: Abilities API — Stable and Discoverable Capabilities

### What the Abilities API Does

_Central registry where WordPress capabilities are declared in a machine-readable and human-readable format. Discoverable from three layers: PHP, JavaScript (`@wordpress/abilities`), and REST API. Built for AI agents, inter-plugin communication, and MCP._

### Hybrid Abilities: Composing Multi-Step Workflows

_WordPress 7.0 expands the API with hybrid abilities — combining multiple capabilities into complex workflows. Handle authentication, rate limiting, content sanitization, and context management automatically._

### Registering an Ability in PHP

_How a plugin declares it has a capability (e.g., "generate alt text"). Any AI agent or other plugin can then discover and call it without knowing its internals._

```php
// Code example placeholder: registering an ability with PHP — name, description, callback
```

### Calling Abilities in JavaScript

_`@wordpress/abilities` package: `getAbilities()`, `getAbility()`, `executeAbility()`. Show calling a registered ability from a block._

```js
// Code example placeholder: getAbility() and executeAbility() in a React block component
```

### Abilities as the Foundation for MCP

_The Abilities API is what makes the MCP Adapter work. Every registered Ability becomes a discoverable MCP tool._

---

## Part 5: MCP Adapter — WordPress Talks to AI Agents

### What the MCP Adapter Does

_Bridges the Abilities API to the Model Context Protocol. External AI tools — Claude Desktop, Claude Code, Cursor, VS Code — can now discover and invoke WordPress Abilities as MCP tools. Supports HTTP and STDIO transport._

### The Three MCP Primitives in WordPress

_Tools (executable Abilities), Resources (readable WordPress data), Prompts (workflow templates). WordPress Abilities map to MCP tools._

### Bidirectional AI Communication

_WordPress calls AI via WP AI Client. AI calls WordPress via MCP Adapter. Show the full bidirectional flow diagram in text._

### Setting Up the MCP Adapter

_How to connect Claude Desktop or Claude Code to a WordPress 7.0 site via MCP. Show the configuration._

```json
// Code example placeholder: MCP client config pointing to a WordPress 7.0 site endpoint
```

### The Deprecated Automattic Repo

_`github.com/Automattic/wordpress-mcp` is deprecated. Use the official `github.com/WordPress/mcp-adapter` instead._

---

## Part 6: Real-Time Collaboration — Co-Editing in the Block Editor

### How It Works Under the Hood

_Built on Yjs CRDT (Conflict-free Replicated Data Type) technology for concurrent editing. HTTP polling is the default sync provider. Plugins and hosts can swap in WebSockets via the `sync.providers` filter for lower latency._

### What Editors See

_Multiple users see each other's cursors and presence avatars in real time. Notes feature with keyboard shortcuts. Visual Revisions — compare page versions visually inside the editor (not just text diffs). Offline editing with auto-sync on reconnect._

### The WebSocket Upgrade Path

_Show how to replace HTTP polling with WebSockets using the `sync.providers` filter. What hosting infrastructure is required._

```php
// Code example placeholder: add_filter('sync.providers', ...) to register a WebSocket provider
```

### What Breaks Collaboration

_Classic block (core/freeform) is incompatible — falls back to standard post locking. Classic meta boxes registered on a post type disable collaboration for that post. Action item: migrate meta boxes to registered post meta._

### JavaScript APIs for Custom Collaboration Workflows

_Exposed APIs for building custom notification systems, approval workflows, or PM tool integrations. Overview of what's exposed._

### Open Questions Going Into RC1

_Per The Repository: collaboration status still has open technical questions as of RC1 date. What they are and how to track resolutions._

---

## Part 7: The Iframed Editor — The Biggest Breaking Change

### What Changed

_As of WordPress 7.0, the post editor runs inside an iframe regardless of a block's `apiVersion`. This is a hard, unconditional change. Previously, the iframe was only enforced when no meta boxes were present — that exception is removed._

### What Breaks

_Any JavaScript that accesses `document` or `window` directly from editor scripts will stop working. Most React-based blocks are fine. The break targets code that assumes top-window DOM access. Plugins that inject custom admin CSS or hook into the Classic editor block carry the highest risk._

### How to Fix It: `enqueue_block_editor_assets`

_Use the `enqueue_block_editor_assets` action to reach the iframe context. Not `wp_enqueue_scripts` — that targets the admin top frame, not the editor iframe._

```php
// Code example placeholder: correct use of enqueue_block_editor_assets for editor scripts
```

### Migrating Meta Boxes

_Classic meta boxes cannot be synced in the iframed editor. Migrate meta box functionality to registered post meta with `show_in_rest: true`. Show a full before/after migration example._

```php
// Code example placeholder: converting a classic meta box to register_post_meta with show_in_rest
```

### Audit Checklist for the Iframed Editor

_Step-by-step: identify all `document.querySelector()` calls in editor scripts, identify `window.*` access patterns, identify admin-level CSS injections, identify Classic block integrations. Flag each for migration._

---

## Part 8: New Blocks — What Developers Need to Know

### Icons Block (`core/icon`)

_Scalable SVG icons from a pre-selected library without code. Backed by the new `WP_Icons_Registry` class. REST endpoint: `/wp/v2/icons`. Saves icon name as attribute; renders server-side via icon registry. Current limitation: external icon registration not yet supported (planned for a future version)._

```php
// Code example placeholder: querying /wp/v2/icons REST endpoint and displaying results
```

### Breadcrumbs Block

_Previously required a plugin — now native. Supports theme.json styling. SEO implications and how to customize the output._

### Heading Block Variations

_H1–H6 now registered as block variations — faster and more consistent heading management. How this affects plugins that interact with heading blocks._

### Grid Block — Now Responsive

_Grid layouts adapt automatically across screen sizes. What this changes for custom grid implementations._

### Navigation Block Overhaul

_Menu changes require fewer steps. Customisable Navigation Overlays — now built from blocks and patterns, not hardcoded markup. New Navigation Overlay Close block. Custom breakpoint controls for mobile overlay trigger (previously hardcoded)._

```json
// Code example placeholder: theme.json navigation overlay configuration
```

### Cover Block: Video Embed Backgrounds

_Embed a video URL as a full-section background. Show the block markup and relevant attributes._

### Gallery Block: Lightbox

_Clicking an image opens an overlay for browsing all gallery images. How to style and customize the lightbox._

---

## Part 9: Block Visibility — Responsive Display Controls

### How Block Visibility Works

_Show/hide any block based on screen size. Three hardcoded viewport breakpoints: Mobile (≤480px), Tablet (480px–782px), Desktop (>782px). Controls available in block toolbar, inspector sidebar, and command palette._

### The Serialization Format

_Serialized as `metadata.blockVisibility.viewport` in block markup. Show the JSON structure._

```json
// Code example placeholder: block markup with metadata.blockVisibility.viewport
```

### What's Not in 7.0 (Coming in 7.1)

_Configurable breakpoints and theme.json integration for block visibility are deferred to WordPress 7.1. Plan for this if your theme needs custom breakpoints._

---

## Part 10: Client-Side Media Processing

### How It Works

_Image resizing and compression now happen in the browser before upload. Browser creates sub-sized images; both original and each sub-size are uploaded to WordPress. Stored result is identical to server-side approach — same metadata, same sub-sizes._

### Performance Impact

_Server-side image processing CPU usage projected to drop over 80% on capable user devices. Benefits for resource-limited shared hosting. Falls back to server processing if device is not capable — fully transparent to the user._

### What Plugin Developers Need to Check

_If your plugin hooks into media upload processing or image sub-size generation, audit for compatibility with client-side media processing. Link to Gutenberg issue #74333._

---

## Part 11: Admin Interface — New Default Color Scheme

### The "Modern" Scheme Is Now Default

_The "Modern" color scheme becomes the new admin default. Users can revert to "Fresh" (old default blue) via Profile > Administration Color Scheme. View transitions added for smooth cross-document transitions in wp-admin._

### Plugin CSS Compatibility Risk

_Plugins injecting custom admin CSS are at higher risk of visual conflicts. Audit your admin stylesheets. Show how to test against the new scheme._

### What Changed Visually

_Spacing, typography, buttons, tables, notices — evolutionary not ground-up. Brings older screens closer to the Gutenberg/Site Editor design system._

---

## Part 12: DataViews & DataForm — Modern Admin Tables

### What DataViews Replaces

_The traditional WP_List_Table on Posts, Pages, and Media screens replaced with a modern app-like interface. List view, grid view, table view all supported with filtering, sorting, and bulk operations without page reloads._

### Breaking API Change: `groupByField` → `groupBy` Object

_`groupByField` string in DataViews view config replaced by a `groupBy` object supporting `field`, `direction`, and `label` visibility. Show the migration._

```js
// Code example placeholder: before (groupByField: 'status') vs after (groupBy: { field: 'status', direction: 'asc' })
```

### New DataForm Controls and Validation

_New controls: `combobox`, `adaptiveSelect`. New validation rules: `pattern`, `minLength`, `maxLength`, `min`, `max`. New activity layout and details layout. `validity` prop on all bundled layouts for error states._

### What Custom Plugin Code Needs to Update

_Plugins that hook into `manage_posts_columns`, `manage_pages_columns`, or similar filter hooks need DataViews-compatible updates. Custom post type plugins with custom list table columns or filters need rewrites. Foundation for registering third-party content types into DataViews is being laid in 7.0 — full support in a future release._

---

## Part 13: Interactivity API Changes

### `state.navigation` Is Deprecated

_Accessing `state.navigation` from the `core/router` store triggers a console warning in `SCRIPT_DEBUG` mode. It will stop working in a future version. Official replacement is coming in WordPress 7.1._

### The Replacement Pattern: `watch()` + `state.url`

_New `watch()` function in `@wordpress/interactivity`. Use `watch()` combined with `state.url` to track client-side navigations — for analytics on virtual page views, scroll position resets, etc._

```js
// Code example placeholder: watch() + state.url for tracking client-side navigation events
```

### The `effect` → `watch` Signal Change

_Gutenberg 22.6 switched from `effect` to exporting `watch` from `@preact/signals`. Teams with pinned assumptions about router update behavior need to revalidate hydration and navigation logic._

---

## Part 14: theme.json — Pseudo-Classes and New Design Tools

### Pseudo-Class Selectors for Blocks (New)

_`:hover`, `:focus`, `:focus-visible`, `:active` now supported in theme.json for blocks and their style variations. Previously only available for HTML elements under `styles.elements`. Block-level and variation-level pseudo-selectors are independent and non-conflicting._

```json
// Code example placeholder: theme.json block pseudo-class hover/focus styles
```

### This Is theme.json Only

_No new Global Styles UI for interactive states in 7.0. Configuration is code-only for now._

### New Design Tools

_text line indent, text columns, aspect ratios for wide/full images, dimension width/height support, dimension presets. Show theme.json examples for each._

### Font Library Universally Enabled

_Font Library admin screen now works for all themes — block, classic, and hybrid. Previously scoped to block themes only. No code changes required to benefit._

---

## Part 15: Pattern Overrides and Block Bindings

### Pattern Overrides Now Work on Any Block

_Previously limited to a hardcoded set of core blocks (Paragraph, Heading, Image, Button). Now supported for any block attribute that supports Block Bindings. Custom blocks can fully use Pattern Overrides._

### Block Bindings API: Server-Side + JavaScript Registration

_PHP server-side registration still supported. JavaScript registration in the editor also supported. Server-side registration enables a frontend callback for bound attributes._

```php
// Code example placeholder: registering a custom block binding source server-side
```

---

## Part 16: CodeMirror 5.65.40

### What Changed

_CodeMirror updated to 5.65.40. More flexible extensibility for code editing interfaces within wp-admin._

### Plugin Compatibility Check

_If your plugin integrates custom code editing using CodeMirror within wp-admin, test against 5.65.40. Show how to check the currently loaded CodeMirror version._

---

## Part 17: Your Pre-Migration Checklist (14 Steps)

_Numbered checklist — every step a developer must take before upgrading to WordPress 7.0. Each step is a single actionable item with a brief explanation._

### Step 1 — Upgrade PHP to 7.4 Minimum (8.2+ Recommended)

_Verify your server runs PHP 7.4+. Sites on 7.2/7.3 cannot upgrade to WordPress 7.0._

### Step 2 — Back Up Everything

_Full backup: files + database. Do this before touching any update._

### Step 3 — Test on a Staging Environment First

_Clone production to staging. Install WordPress 7.0 Beta/RC. Never upgrade production first._

### Step 4 — Run the Plugin Compatibility Audit

_Use the WordPress 7.0 Compatibility Checker plugin. Flag: iframe dependencies, `document`/`window` top-level access, WP_List_Table hooks, Classic editor integrations._

### Step 5 — Audit Admin CSS Injections

_Check for stylesheets that may visually break against the new "Modern" color scheme._

### Step 6 — Check Deprecated Functions

_Review the 7.0 Field Guide on Make/Core for all deprecated functions. Search your codebase for each._

### Step 7 — Fix Interactivity API: Remove `state.navigation`

_Replace any `state.navigation` from `core/router` with `watch()` + `state.url`._

```js
// Code example placeholder: before/after navigation tracking migration
```

### Step 8 — Update DataViews: Fix `groupByField`

_Migrate `groupByField` string to `groupBy` object. Plan DataViews-compatible rewrites for custom list table hooks._

### Step 9 — Migrate Meta Boxes to Registered Post Meta

_Migrate all meta box functionality to `register_post_meta()` with `show_in_rest: true`. Required for iframed editor compatibility AND real-time collaboration._

```php
// Code example placeholder: register_post_meta() with show_in_rest: true replacing a meta box
```

### Step 10 — Fix Editor JavaScript (Iframe Scope)

_Replace top-window DOM selectors with `enqueue_block_editor_assets`-based, iframe-scoped code._

### Step 11 — Audit Classic Editor Dependencies

_Check if your site or workflow depends on the Classic Editor plugin or Classic block. These sessions will not get collaboration features and carry higher iframe-related risk._

### Step 12 — Record Pre-Update Performance Baseline

_Log SEO rankings, Core Web Vitals, and page speed scores before updating — so regressions are detectable post-update._

### Step 13 — Wait for Major Plugin Compatibility Updates

_WooCommerce, Yoast SEO, Gravity Forms, WPML, ACF typically release compatibility updates within the first week post-launch. Consider waiting 1–2 weeks before updating production._

### Step 14 — Confirm Hosting PHP and WebSocket Support

_Confirm host supports PHP 7.4+. If you want WebSocket-based real-time collaboration, confirm host supports persistent connections or plan to install a WebSocket sync plugin._

---

## Part 18: WordPress 7.0 and the AI-Native Future

### The Bidirectional AI Architecture

_WP AI Client (WordPress calls AI) + Abilities API (capabilities are discoverable) + MCP Adapter (AI calls WordPress) = a closed bidirectional loop. Explain how these three systems compose._

### Provider-Agnostic by Design

_No vendor lock-in. Any AI provider can be registered. WordPress handles the abstraction layer._

### What This Means for Plugin Developers

_Every plugin that uses AI today should migrate to WP AI Client + Connectors API. Users get centralized credential management. You get automatic provider compatibility. Future-proof your AI integration now._

### The Bigger Picture: Where WordPress Is Going

_7.0 is the culmination of Phase 3 (real-time collaboration) of the Gutenberg roadmap. Phase 4 (multilingual) is ongoing. DataViews is a permanent replacement for WP_List_Table — treat the transition as final. Classic Editor plugin users face increasing friction with every major release._

---

## FAQs for Developers

_10–12 FAQs: "Will my plugin break?", "Can I still use PHP 7.4 features?", "Is the Classic Editor plugin still supported?", "How do I test real-time collaboration locally?", "Do I need to register with all three AI providers?", "What happens to my existing WP AI Client (standalone) integration?", "Is the Abilities API required for using WP AI Client?", "When do I need to migrate from `state.navigation`?", "Does my theme need theme.json updates?", "What if my host doesn't support WebSockets?"_

---

## Conclusion

_Summarize the 5 things every developer must do before April 9: upgrade PHP, audit iframe-breaking scripts, migrate meta boxes, fix Interactivity API navigation tracking, and test on staging. Frame WordPress 7.0 as the platform's most ambitious release since Gutenberg — one that positions WordPress as an AI-native CMS for the next decade. CTA: link to official Field Guide on Make/Core, link to related posts (Next.js 16.2, WP AI Client GitHub)._

---

> **Writing Notes:**
> - Every code example should be a real, runnable PHP/JS/JSON snippet
> - Include ⚠️ breaking change callout boxes at the start of every breaking change section
> - Include a "Before" vs "After" block for every deprecated or changed API
> - Real-time collaboration, iframed editor, and Interactivity API sections are highest developer impact — prioritize depth there
> - Aim for 7,000–9,000 words of actual content
> - Publish ideally 1–2 weeks before April 9, 2026 for maximum SEO timing
