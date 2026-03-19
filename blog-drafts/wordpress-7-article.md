---
title: "WordPress 7.0: The Complete Developer Guide to Every Breaking Change and New API"
slug: "wordpress-7-developer-guide"
date: "2026-03-19"
updatedDate: "2026-03-19"
category: "WordPress"
tags:
  - WordPress 7.0
  - WordPress developer guide
  - WP AI Client
  - Connectors API
  - Abilities API
  - MCP Adapter
  - Real-time collaboration
  - Block editor
  - Gutenberg
  - PHP 7.4
  - iframed editor
  - Interactivity API
  - DataViews
  - theme.json
  - WordPress breaking changes
keywords:
  - WordPress 7.0 developer guide
  - WordPress 7.0 breaking changes
  - WP AI Client tutorial
  - WordPress Abilities API
  - WordPress MCP Adapter
  - iframed editor WordPress
  - DataViews WordPress
  - WordPress real-time collaboration
  - WordPress 7 PHP minimum
  - Interactivity API state.navigation deprecated
  - WordPress Connectors API
  - WordPress 7 migration checklist
metaDescription: "WordPress 7.0 ships April 9, 2026 with the most changes since 5.0. This guide covers every breaking change, new API, and migration step developers need before the deadline. PHP 7.4 minimum, always-on iframed editor, WP AI Client, Connectors API, Abilities API, MCP Adapter, real-time collaboration, DataViews, and more."
readTime: "35 min"
coverImage: "/images/wordpress-7-developer-guide.jpg"
author: "nandann"
featured: true
---

## Introduction

WordPress 7.0 ships April 9, 2026. RC1 dropped today, March 19. If you have been following the release cycle, you already know this is not a typical dot release. The last time WordPress shipped a change this fundamental to how the editor works was WordPress 5.0 in 2018, when Gutenberg replaced the classic editor. This release is in that category.

For end users, 7.0 looks like a visual refresh. The admin gets a new color scheme, some screens look different, and real-time collaboration shows up in the editor. Most users will not notice anything else.

For developers, the picture is different. The block editor is now always iframed, which breaks a large number of CSS and JavaScript assumptions that themes and plugins have been making for years. PHP 7.2 and 7.3 are gone. The Interactivity API router changed in a way that requires code updates. DataViews replaces `WP_List_Table` on core admin screens. And three new API systems landed in core: WP AI Client, the Connectors API, and a stable Abilities API with a built-in MCP adapter.

None of these changes are optional. Your code will either be ready for April 9, or it will break. This post walks through each major change with working code examples so you know exactly what to update and why.

---

## What Changed in WordPress 7.0: A Quick Reference

Before diving into each area, here is a single-table overview you can use to triage your codebase. Scan the Developer Impact column and start with anything marked High.

| Feature/Change | Type | Developer Impact |
|---|---|---|
| Always-on iframed editor | Breaking change | High |
| PHP 7.4 minimum | Breaking change | High |
| WP AI Client in core | New API | High |
| Connectors API | New API | High |
| Abilities API stable | New API / Breaking | High |
| MCP Adapter | New API | Medium |
| Real-time collaboration | New feature | Medium |
| DataViews replaces WP_List_Table | Breaking change | High |
| Interactivity API router change (state.navigation deprecated) | Breaking change | High |
| theme.json pseudo-class support | Enhancement | Low |
| Block visibility controls | New feature | Low |
| Client-side media processing | New feature | Low |
| New "Modern" admin color scheme | UI change | Low |
| Pattern Overrides for custom blocks | Enhancement | Medium |

Work through anything in the High row first. If you maintain a plugin that touches the editor, the admin list tables, or the Interactivity API, those are your first three stops.

---

## Part 1: PHP 7.2 and 7.3 Are No Longer Supported

### PHP 7.4 Is Now the Minimum

WordPress 7.0 drops support for PHP 7.2 and 7.3. If a site is running either of those versions, the WordPress update system will not offer the 7.0 upgrade. Those sites will remain on the 6.9 branch and continue to receive security patches there for the foreseeable future.

The project dropped these versions because usage fell below 4% across the WordPress install base. That is the informal threshold the project has used historically when retiring PHP version support. It is not an arbitrary decision, but it is still a hard cutoff.

PHP 8.2 or 8.3 is what you should be targeting today. PHP 7.4 is the new floor, not the recommended target. If you are still on 7.4, you are one release cycle away from being in the same position as 7.2 users are right now.

### What PHP 7.4 Lets You Use

With PHP 7.4 as the minimum, you can now use four features in plugin and theme code without writing backwards-compatible fallbacks: typed class properties, arrow functions, the null coalescing assignment operator (`??=`), and array spread syntax in expressions.

These are not obscure language features. They are things developers coming from other modern languages expect to be able to use, and they make PHP code meaningfully easier to read and maintain. Here is the same code written for PHP 7.2 and then rewritten for 7.4.

```php
<?php
// Before (PHP 7.2-compatible)
class PostMeta {
    public $title;
    public $views;

    public function __construct( $title, $views ) {
        $this->title = $title;
        $this->views = $views;
    }

    public function getViews() {
        $result = isset( $this->views ) ? $this->views : 0;
        return $result;
    }
}

$tags = array_merge( ['php'], ['wordpress'] );

// After (PHP 7.4+)
class PostMeta {
    public string $title;
    public int $views = 0;

    public function getViews(): int {
        return $this->views;
    }
}

// Arrow function
$getLabel = fn( $post ) => strtoupper( $post->post_title );

// Null coalescing assignment
$meta = get_post_meta( $post_id, '_views', true );
$meta ??= 0;

// Array spread in function calls
$base_tags = ['php', 'wordpress'];
$extra_tags = ['7.4', 'plugin'];
$all_tags = [...$base_tags, ...$extra_tags];
```

What you need to do right now: check the PHP version on every environment you maintain. If anything is running 7.2 or 7.3, schedule the upgrade before April 9. PHP 8.2 or 8.3 is the better target. Then search your plugin and theme code for patterns that only exist because you were supporting PHP 7.2. A lot of that defensive code can come out.

---

## Part 2: WP AI Client Is Now Part of WordPress Core

### What It Is (and What It Is Not)

WP AI Client is infrastructure. It is not a chatbot, an AI writing assistant, or any kind of user-facing feature on its own. Think of it as the HTTP transport layer for AI, the same way WordPress handles database connections through `$wpdb` rather than leaving each plugin to open its own MySQL connection.

The API gives plugins a single, consistent way to call generative AI models regardless of which provider the site owner has set up. Whether the site is connected to OpenAI, Anthropic, or Google, your plugin code stays the same. WordPress handles authentication, HTTP transport, caching, and event hooks. You never touch an API key directly, and you never write provider-specific request formatting.

End users get nothing from this change on its own. No new menu item appears, no AI panel shows up in the editor. Features built on top of this API are what users will eventually see. If you are building a plugin that uses AI in any way, this is now the correct way to do it.

### How to Use It in PHP

You initialize the client once during the `init` hook, then call it from wherever your plugin needs it. The client returns either a response object or a `WP_Error`, so the error handling pattern will be familiar if you have written any REST API code before.

Here is a minimal example that registers a REST endpoint to summarize post content. This is the kind of thing you might wire up to a sidebar panel in the block editor.

```php
<?php
add_action( 'init', function() {
    WordPress\AI_Client\AI_Client::init();
} );

add_action( 'rest_api_init', function() {
    register_rest_route( 'myplugin/v1', '/summarize', [
        'methods'  => 'POST',
        'callback' => 'myplugin_summarize_content',
        'permission_callback' => function() {
            return current_user_can( 'edit_posts' );
        },
    ] );
} );

function myplugin_summarize_content( WP_REST_Request $request ) {
    $ai = WordPress\AI_Client\AI_Client::get_instance();

    $response = $ai->generate_text( [
        'prompt'      => 'Summarize the following in two sentences: ' . $request->get_param( 'content' ),
        'max_tokens'  => 150,
    ] );

    if ( is_wp_error( $response ) ) {
        return $response;
    }

    return rest_ensure_response( [ 'summary' => $response->get_text() ] );
}
```

### How to Use It in JavaScript

On the JavaScript side, you are just calling the REST endpoint you registered in PHP. There is no separate JS SDK to learn. Use `fetch` with a nonce header the same way you would call any other WordPress REST endpoint.

```js
import { useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { Button, Textarea } from '@wordpress/components';

export function SummarizeButton({ content }) {
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleClick() {
        setLoading(true);
        try {
            const response = await fetch('/wp-json/myplugin/v1/summarize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': wpApiSettings.nonce,
                },
                body: JSON.stringify({ content }),
            });
            const data = await response.json();
            setSummary(data.summary);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Button onClick={handleClick} isBusy={loading} variant="primary">
                Summarize with AI
            </Button>
            {summary && <Textarea value={summary} readOnly />}
        </>
    );
}
```

### The Three Official Provider Plugins

Three official provider plugins are available on WordPress.org: AI Provider for OpenAI, AI Provider for Anthropic, and AI Provider for Google. Install any of them and they automatically register with WP AI Client and expose every available model from that provider. You do not write any integration code. When a provider plugin is active, the corresponding connector appears in Settings > Connectors without any additional work on your end.

If your plugin currently depends on the standalone WP AI Client Composer package, migrate to the core API now. The PHP SDK infrastructure in the standalone package has been disabled. The REST API and JavaScript API from that package are still active for the moment, but that is temporary. A future release will end that support completely, and there will be no warning when it happens.

---

## Part 3: The Connectors API

### What It Does

The Connectors API is a new framework for registering and managing connections to external services. Before this existed, every plugin that called an external API had to build its own settings screen, store its own API keys, and handle its own credential logic. That meant users could end up with five different plugins each asking for the same OpenAI key in five different places.

Now there is one place: **Settings > Connectors** in wp-admin. You register your connector once, the user enters their credentials once, and every plugin using that connector shares the same stored key automatically.

The API follows a specific lookup order when resolving a key. It checks for an environment variable first, then a PHP constant, then falls back to the database. The database option name is auto-generated following the pattern `connectors_ai_{$id}_api_key`, so for an OpenAI connector the key would be stored as `connectors_ai_openai_api_key`.

### Setting Up API Keys

You have three ways to provide credentials. Pick the one that fits your deployment setup.

```php
<?php
// Option 1: environment variable (recommended for production)
// In your server config or .env file:
// CONNECTOR_OPENAI_API_KEY=sk-your-key-here

// Option 2: PHP constant in wp-config.php
define( 'CONNECTOR_ANTHROPIC_API_KEY', 'your-key-here' );

// Option 3: stored in the database (done via the Settings > Connectors UI)
// WordPress auto-generates the option name: connectors_ai_openai_api_key
```

Option 1 is the recommended approach for production environments. When you set the key as an environment variable, it never touches the database, which reduces the risk of it showing up in database backups or being exposed through a SQL injection.

### How to Register a Custom Connector

Plugins can register their own connector types, and the architecture is not limited to AI providers. You can register any external service your plugin needs to talk to, whether that is a CRM, a payment processor, or a third-party data source.

That said, the admin UI for non-AI connectors is limited in 7.0. The settings panel will display your registered fields, but the richer UI features are currently scoped to AI connectors. That is expected to expand in a future release.

```php
<?php
add_action( 'wp_register_connectors', function( $registry ) {
    $registry->register( [
        'id'          => 'my-crm',
        'label'       => 'My CRM Service',
        'description' => 'Connect to My CRM to sync contacts.',
        'auth_type'   => 'api_key',
        'fields'      => [
            [
                'key'         => 'api_key',
                'label'       => 'API Key',
                'type'        => 'password',
                'required'    => true,
            ],
            [
                'key'         => 'base_url',
                'label'       => 'Base URL',
                'type'        => 'url',
                'required'    => true,
                'default'     => 'https://api.mycrm.com/v2',
            ],
        ],
    ] );
} );
```

If your plugin currently has its own API key settings field, you should migrate it to the Connectors API. Users will appreciate having one place to manage all their external service credentials instead of hunting through individual plugin settings screens.

---

## Part 4: The Abilities API

### What the Abilities API Is

The Abilities API is a central registry where WordPress capabilities are declared in a way that PHP code, JavaScript code, and REST API clients can all read and use. Think of it as a capability contract. A plugin declares that it can do something, and any other plugin, AI agent, or external tool can discover and call that capability without knowing anything about the underlying implementation.

WordPress 7.0 brings the Abilities API out of experimental status. It is now stable and safe to build against. If you evaluated it during the 6.x cycle and held off because of the experimental tag, now is the time to revisit it.

The API also handles authentication, rate limiting, content sanitization, and context management automatically. You define what your ability does and what parameters it takes. WordPress handles the plumbing around it.

### Registering an Ability in PHP

Registering an ability happens on `init`. The first argument is a unique ID using a `namespace/action` pattern, which helps avoid collisions between plugins. The second argument is a configuration array that describes the ability, defines its parameters, and provides the callback that runs when it is invoked.

It is worth noting the guard check at the top. Because `wp_register_ability` is new in 7.0, wrapping your registration in a `function_exists` check keeps your plugin from throwing a fatal error on older WordPress versions.

```php
<?php
add_action( 'init', function() {
    if ( ! function_exists( 'wp_register_ability' ) ) {
        return;
    }

    wp_register_ability( 'myplugin/generate-alt-text', [
        'label'       => 'Generate Alt Text',
        'description' => 'Generates accessible alt text for an image using AI.',
        'parameters'  => [
            'attachment_id' => [
                'type'        => 'integer',
                'description' => 'The ID of the attachment to generate alt text for.',
                'required'    => true,
            ],
        ],
        'callback'    => function( array $params ) {
            $attachment_id = (int) $params['attachment_id'];
            $image_url = wp_get_attachment_url( $attachment_id );

            if ( ! $image_url ) {
                return new WP_Error( 'not_found', 'Attachment not found.' );
            }

            $ai = WordPress\AI_Client\AI_Client::get_instance();
            $result = $ai->generate_text( [
                'prompt' => 'Write a short, descriptive alt text for this image: ' . $image_url,
                'max_tokens' => 80,
            ] );

            if ( is_wp_error( $result ) ) {
                return $result;
            }

            return [ 'alt_text' => trim( $result->get_text() ) ];
        },
    ] );
} );
```

### Calling Abilities from JavaScript

The `@wordpress/abilities` package gives you three main functions to work with: `getAbilities()` to list everything registered, `getAbility()` to look up a single ability by ID, and `executeAbility()` to call it. The pattern below shows a practical use case where you check for the ability first and only render the UI if it is available.

```js
import { getAbility, executeAbility } from '@wordpress/abilities';
import { useState } from '@wordpress/element';
import { Button } from '@wordpress/components';

export function AltTextGenerator({ attachmentId, onGenerated }) {
    const [loading, setLoading] = useState(false);

    // Check if the ability exists before showing the button
    const ability = getAbility('myplugin/generate-alt-text');

    if (!ability) {
        return null;
    }

    async function generate() {
        setLoading(true);
        try {
            const result = await executeAbility('myplugin/generate-alt-text', {
                attachment_id: attachmentId,
            });
            onGenerated(result.alt_text);
        } catch (error) {
            console.error('Alt text generation failed:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Button onClick={generate} isBusy={loading} variant="secondary">
            Generate Alt Text
        </Button>
    );
}
```

### Hybrid Abilities

WordPress 7.0 introduces hybrid abilities, which let you combine multiple capabilities into a single multi-step workflow. Instead of calling three separate abilities in sequence from your client code, you define the workflow once on the server side. WordPress handles the orchestration, including error handling between steps and passing context from one step to the next.

This is particularly useful for AI workflows. A common pattern is fetching content, running it through an AI model, and saving the result. With hybrid abilities, you define that sequence once. Each step receives the output of the previous step automatically, and if any step fails, the whole workflow stops cleanly without you having to write that error handling yourself.

---

## Part 5: The MCP Adapter

### What It Does

The MCP Adapter bridges the Abilities API to the Model Context Protocol. That means external AI tools like Claude Desktop, Claude Code, Cursor, and VS Code can discover and invoke WordPress Abilities as if they were native tools. You connect your AI coding assistant to a WordPress 7.0 site, and it can call any registered Ability directly without any custom integration work.

This creates a genuinely bidirectional AI setup. WordPress calls AI models outward through WP AI Client. AI agents call WordPress inward through the MCP Adapter. Both directions use the same credential system and the same Abilities registry, so there is no separate configuration to maintain for each direction.

The practical result is that an AI agent with access to your WordPress site can do things like retrieve posts, generate content, update metadata, or trigger any custom Ability your plugins register. From the agent's perspective, these are just function calls. It does not need to know anything about WordPress internals.

### The Three MCP Primitives

MCP organizes interactions into three types: tools, resources, and prompts. In the WordPress context, each maps to something concrete. Registered Abilities become MCP tools. WordPress content like posts, pages, and media become MCP resources. Workflow templates become MCP prompts.

From the perspective of an AI agent connecting to the site, a WordPress Ability looks and behaves exactly like any other MCP tool. The agent does not need a WordPress-specific integration. It just needs the MCP endpoint and valid credentials, and then the entire Abilities registry is available to it.

### Connecting Claude Desktop to WordPress 7.0

To connect an MCP client to your WordPress site, add a server entry to its configuration file. Your WordPress site exposes an MCP endpoint at `/wp-json/mcp/v1/`, and you authenticate using a WordPress Application Password.

```json
{
  "mcpServers": {
    "my-wordpress-site": {
      "transport": "http",
      "url": "https://yoursite.com/wp-json/mcp/v1/",
      "headers": {
        "Authorization": "Bearer YOUR_APPLICATION_PASSWORD_HERE"
      }
    }
  }
}
```

Once connected, any AI agent using this config can list all available Abilities on the site, call them by name, and pass parameters just like calling a function. The AI never needs to know the WordPress implementation details. It just sees a list of tools and calls them.

One thing worth flagging: the old Automattic repo at `github.com/Automattic/wordpress-mcp` is deprecated. Use the official `github.com/WordPress/mcp-adapter` package if you are installing it separately. That said, the adapter ships as part of WordPress 7.0 core, so most sites will not need to install it manually at all.

---

## Part 6: Real-Time Collaboration in the Block Editor

### How It Works

Real-time co-editing is the most visible new feature in WordPress 7.0. Multiple users can edit the same post or page simultaneously and see each other's changes live, with presence cursors and user avatars showing who is active and where.

The underlying technology is Yjs, a CRDT (Conflict-free Replicated Data Type) implementation. CRDTs are designed to handle concurrent edits across multiple clients without producing data corruption or requiring a central lock on the document.

HTTP polling is the default sync mechanism that ships with core. It works out of the box with no server configuration needed. For teams that need lower latency (sub-100ms sync instead of the default polling interval), the sync layer is replaceable via a filter.

### Upgrading to WebSockets

The `sync_providers` filter lets hosts and plugins replace the default HTTP polling with a WebSocket provider. This is useful if your editorial team is large, edits frequently at the same time, and is noticing visible lag in cursor position updates.

Your WebSocket provider needs to implement the sync provider interface and be registered before the editor initializes. The filter receives the current array of registered providers and expects an updated array in return.

```php
<?php
add_filter( 'sync_providers', function( array $providers ) {
    // Register a custom WebSocket sync provider
    $providers['websocket'] = [
        'label'    => 'WebSocket Sync',
        'handler'  => 'MyPlugin\Sync\WebSocketProvider',
        'priority' => 10,
    ];
    return $providers;
} );
```

For most sites, HTTP polling is perfectly fine. WebSocket upgrades are worth considering only if your team is doing intensive real-time editing and notices lag in cursor updates.

### What Breaks Collaboration

Two things disable real-time collaboration for a post session. The first is the Classic block (`core/freeform`). If a post contains a Classic block, the editor falls back to standard post locking for that session instead of enabling collaboration.

The second is classic meta boxes. If a post type has classic meta boxes registered on its edit screen, WordPress disables collaboration for all posts of that type.

The fix is to migrate your meta boxes to registered post meta with `show_in_rest` set to `true`. This is covered in the iframed editor section below, and it is the same migration you need for the always-on iframe change. Doing it once fixes both issues.

### Notes and Visual Revisions

The Notes feature ships alongside collaboration and lets editors leave comments attached to specific parts of the content. Notes sync in real time and have keyboard shortcuts for quick access.

Visual Revisions is a separate but related addition that lets editors compare versions of a page visually inside the editor, not just as a text diff. You can step through revision history and see exactly what the page looked like at each save point. Both features work alongside the block editor and do not require any plugin or server configuration beyond standard WordPress.

---

## Part 7: The Iframed Editor Is Now Always On

The post editor has run inside an iframe for clean isolation between the editing context and the admin shell for several releases, but only when there were no classic meta boxes. That exception is gone in WordPress 7.0. The editor is now always iframed, regardless of whether meta boxes are present.

This is the highest-impact breaking change in 7.0 for plugin developers. If your plugin has any JavaScript that assumes it can reach the editor DOM from the admin top frame, that code will silently fail after this update. The rest of this section covers how to identify affected code and what to do about it.

### What This Means for Your Plugin

Any JavaScript that accesses the top-level `document` or `window` object from an editor script will stop working. Code like `document.querySelector('.my-plugin-panel')` or `window.myPluginGlobal` will no longer reach the editor context because that code runs in the top frame and the editor runs in an iframe below it.

Most React-based Gutenberg blocks are unaffected because they already run inside the editor context. The code that breaks is typically older admin JavaScript written before the iframe model existed, or plugins that inject UI into both the editor and the admin sidebar at the same time.

If you are not sure whether your plugin is affected, the quickest test is to install 7.0 in a local environment and open the browser console while editing a post. Any errors referencing null returns from `querySelector` calls or undefined globals are a strong signal that something is running in the wrong frame.

### The Fix: Use the Right Hook

Scripts that need to run inside the editor context need to be enqueued via the `enqueue_block_editor_assets` action, not `wp_enqueue_scripts` or `admin_enqueue_scripts`. The difference is straightforward: `enqueue_block_editor_assets` targets the editor iframe, and the other two target the admin top frame.

If your script legitimately needs to run in both places (for example, it controls a sidebar panel that is visible outside the editor), you need two separate enqueue calls with separate script handles. Trying to share one script across both contexts is what causes the hard-to-debug failures.

```php
<?php
// Wrong: script runs in the admin top frame, cannot reach the editor
add_action( 'admin_enqueue_scripts', function() {
    wp_enqueue_script(
        'myplugin-editor',
        plugins_url( 'js/editor.js', __FILE__ )
    );
} );

// Correct: script runs inside the block editor iframe
add_action( 'enqueue_block_editor_assets', function() {
    wp_enqueue_script(
        'myplugin-editor',
        plugins_url( 'js/editor.js', __FILE__ ),
        [ 'wp-blocks', 'wp-editor', 'wp-element' ],
        filemtime( plugin_dir_path( __FILE__ ) . 'js/editor.js' )
    );
} );
```

### Migrating Classic Meta Boxes

Classic meta boxes cannot be synced inside the iframed editor. The recommended migration is to convert meta box functionality to registered post meta using `register_post_meta()` with `show_in_rest` set to `true`. Once the meta is accessible via the REST API, you can use the `PluginSidebar` component from `@wordpress/edit-post` to build the same UI inside the editor without any iframe compatibility issues.

Here is a before and after showing a simple subtitle field. The PHP side handles registration. The JavaScript side handles the UI.

```php
<?php
// Before: classic meta box
add_action( 'add_meta_boxes', function() {
    add_meta_box(
        'myplugin_details',
        'Post Details',
        'myplugin_render_meta_box',
        'post',
        'side'
    );
} );

function myplugin_render_meta_box( WP_Post $post ) {
    $value = get_post_meta( $post->ID, '_myplugin_subtitle', true );
    echo '<input type="text" name="myplugin_subtitle" value="' . esc_attr( $value ) . '">';
}

add_action( 'save_post', function( int $post_id ) {
    if ( isset( $_POST['myplugin_subtitle'] ) ) {
        update_post_meta( $post_id, '_myplugin_subtitle', sanitize_text_field( $_POST['myplugin_subtitle'] ) );
    }
} );

// After: register_post_meta + block editor sidebar (PHP side)
add_action( 'init', function() {
    register_post_meta( 'post', '_myplugin_subtitle', [
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'auth_callback' => function() {
            return current_user_can( 'edit_posts' );
        },
    ] );
} );
```

```js
import { registerPlugin } from '@wordpress/plugins';
import { PluginSidebar } from '@wordpress/edit-post';
import { useEntityProp } from '@wordpress/core-data';
import { TextControl } from '@wordpress/components';

function MyPluginSidebar() {
    const [meta, setMeta] = useEntityProp('postType', 'post', 'meta');
    const subtitle = meta._myplugin_subtitle || '';

    return (
        <PluginSidebar name="myplugin-sidebar" title="Post Details">
            <TextControl
                label="Subtitle"
                value={subtitle}
                onChange={(value) =>
                    setMeta({ ...meta, _myplugin_subtitle: value })
                }
            />
        </PluginSidebar>
    );
}

registerPlugin('myplugin-sidebar', {
    render: MyPluginSidebar,
});
```

The advantage of this migration beyond iframe compatibility is that it also works with real-time collaboration. Classic meta boxes disable collaboration for the entire post type. Registered post meta with a block editor sidebar does not. One migration, two problems solved.

Before you ship anything, search your plugin for `add_meta_box` calls and plan which ones need to be migrated. Any meta box that appears on a post type edit screen needs attention, and it is better to find them now than after a user reports that collaboration stopped working on their site.

### Quick Audit Checklist for the Iframed Editor

Start by searching your editor-facing JavaScript for any `document.querySelector()` or `document.getElementById()` calls. Each one is a potential failure point if that code is enqueued via `admin_enqueue_scripts`. The fix is either to move the script to `enqueue_block_editor_assets` or to remove the DOM query entirely in favor of the block editor's data layer.

Next, look for `window.something` access patterns that assume top-frame globals. This includes custom globals set by your plugin's PHP code via `wp_localize_script` that get called later from editor JavaScript. If the variable is defined in the top frame and read from inside the iframe, it will be undefined.

Plugins that inject custom admin CSS targeting the editor toolbar or sidebar panels are at the highest risk of visual breakage. The iframe isolation means styles enqueued via `admin_enqueue_scripts` do not reach the editor UI at all. Flag each CSS file, check what it targets, and re-enqueue anything that styles editor elements via `enqueue_block_editor_assets` instead.

---

## Part 8: New Blocks in WordPress 7.0

WordPress 7.0 ships several new core blocks, but the more interesting story for developers is what is happening underneath. The Icons block introduces a new server-side registry pattern. The Navigation block has been refactored to eliminate hardcoded markup. Heading blocks now use variations instead of a level attribute. Each of these changes has implications for plugins and themes that interact with these blocks programmatically.

If you maintain a plugin that filters blocks, queries post content for specific block types, or registers custom block styles, you should treat this section as a checklist rather than a changelog summary.

### Icons Block

The Icons block (`core/icon`) lets editors insert SVG icons from a built-in library without touching code. The initial icon set is pulled from the `@wordpress/icons` package, so the icons are the same ones already used throughout the editor UI. For users this is a simple drag-and-drop feature, but the implementation introduces a new PHP class worth knowing about.

Under the hood, the block is powered by `WP_Icons_Registry`. The block saves only the icon name as a block attribute, and the registry resolves that name to an SVG on the server at render time. This means the actual SVG markup never ends up in post content, which keeps the stored HTML clean. There is also a REST API endpoint at `/wp/v2/icons` that you can query to get a list of registered icons.

External icon registration is not yet supported, but it is planned for a future release through `WP_Icons_Registry`. For now, here is how you can query the icons endpoint programmatically from PHP:

```php
<?php
// Query the icons REST endpoint programmatically
$response = wp_remote_get( rest_url( 'wp/v2/icons' ), [
    'headers' => [
        'X-WP-Nonce' => wp_create_nonce( 'wp_rest' ),
    ],
] );

if ( ! is_wp_error( $response ) ) {
    $icons = json_decode( wp_remote_retrieve_body( $response ), true );
    foreach ( $icons as $icon ) {
        echo esc_html( $icon['name'] ) . '<br>';
    }
}
```

### Breadcrumbs Block

Breadcrumbs are now a native core block. Before 7.0, every theme or plugin that wanted breadcrumbs had to either roll custom code or pull in a dependency. That inconsistency meant different sites ended up with different markup structures, different class names, and no standard way to style them across themes.

The new block supports `theme.json` styling, so you control colors, typography, and spacing the same way you would for any other core block. From an SEO angle, breadcrumbs help search engines map your site hierarchy, and they feed into breadcrumb rich snippets in search results, which can improve how your URLs appear in Google.

### Heading Block Variations

Heading levels H1 through H6 are now registered as block variations rather than a single `core/heading` block with a `level` attribute. In the editor this makes heading management faster and more consistent. Under the hood, each heading level is now its own addressable variation.

The part that matters for plugin developers: if your plugin queries for `core/heading` blocks by block type name, or uses block type filters to modify headings, test carefully. Variation-based headings may behave differently depending on how your code targets them. Check any `register_block_style` calls, block filters, or server-side block parsers that reference heading blocks.

### Grid Block Goes Responsive

The Grid block now handles responsive layout automatically across screen sizes without requiring any manual configuration from the editor. For most users this is just a convenience improvement. For theme developers, it is worth a closer look.

If your theme has custom CSS targeting `core/grid` blocks, or you built a custom responsive grid implementation because the native block did not support it before, test your theme against the new behavior. CSS Grid rules you defined to fill that gap may now conflict with what the block produces natively, and the result could be broken layouts at certain viewport widths.

### Navigation Block and Overlay Overhaul

The Navigation block received a significant workflow update in 7.0. Menu changes now require fewer steps to apply and preview, which is mostly a user-facing improvement. The more meaningful change for developers is how Navigation Overlays work now.

Overlays are now built entirely from blocks and patterns rather than hardcoded markup. A new Navigation Overlay Close block lets you place and style the close button anywhere inside the overlay. The mobile trigger breakpoint is also now configurable through the editor instead of being a hardcoded value. These are meaningful improvements, but they come with a migration requirement.

If your theme has custom Navigation overlay templates or hardcoded overlay markup, those need to be migrated to the new block-based overlay system. The old hardcoded approach will not work in 7.0. Here is a `theme.json` example for configuring the navigation overlay settings:

```json
{
  "version": 3,
  "settings": {
    "blocks": {
      "core/navigation": {
        "overlay": {
          "breakpoint": "768px",
          "backgroundColor": "base",
          "textColor": "contrast"
        }
      }
    }
  }
}
```

### Cover Block and Gallery Updates

The Cover block now accepts video embed URLs as full-section backgrounds, not just uploaded video files. You can paste a URL directly into the background field and WordPress renders it as a background video. This broadens what editors can do without needing a developer to configure anything.

The Gallery block adds lightbox support. Clicking an image opens an overlay that lets the user browse through all gallery images in sequence. Both changes are entirely user-facing. Unless your theme has custom CSS that targets Cover block video backgrounds or Gallery block markup specifically, no developer action is needed.

---

## Part 9: Block Visibility Controls

### Hiding and Showing Blocks by Screen Size

WordPress 7.0 adds block visibility controls that let editors show or hide any block based on screen size. The controls appear in three places: the block toolbar, the inspector sidebar, and the command palette. There is no new block type involved. This is a capability added to all existing blocks.

There are three viewport breakpoints: Mobile at 480 pixels and below, Tablet between 480 and 782 pixels, and Desktop above 782 pixels. These breakpoints are hardcoded in 7.0. If your theme uses non-standard breakpoints, the built-in visibility controls will not align with your layout breakpoints, so document that clearly for any editors using your theme.

Configurable breakpoints and `theme.json` integration for block visibility are deferred to WordPress 7.1. That is worth noting if you are planning a site build that depends on flexible breakpoint control. For now, plan around the fixed values or wait for 7.1 if precision matters.

### How It Is Serialized

Visibility settings are stored in block markup as metadata on the block, not as inline styles. This is an important distinction. The visibility is data, not CSS, which means WordPress has the information it needs to make rendering decisions at the framework level rather than relying on the browser to hide elements after they load.

```json
{
  "blockName": "core/paragraph",
  "attrs": {
    "metadata": {
      "blockVisibility": {
        "viewport": {
          "mobile": false,
          "tablet": true,
          "desktop": true
        }
      }
    }
  }
}
```

Setting `mobile` to false means this block will not render on mobile screens at all. It is not just visually hidden with CSS. The block is suppressed at the framework level, so the markup is never sent to the browser on mobile viewports.

---

## Part 10: Client-Side Media Processing

### What Changed

Previously, when you uploaded an image in WordPress, the server handled generating all the sub-sized versions: thumbnail, medium, large, and any custom sizes registered by your theme or plugins. In WordPress 7.0, capable browsers now do that work locally before the upload happens. The browser generates each sub-size from the original and uploads them all to WordPress alongside the original file.

The stored result is identical to what server-side processing would have produced. Same metadata, same sub-sizes, same database entries. From the perspective of any code reading the media library, nothing has changed. This is invisible to users. The only difference is which CPU did the work.

The projected benefit is a reduction of more than 80 percent in server-side image processing CPU load for sites where users are on capable devices. On shared hosting, image upload processing has historically been a common bottleneck. If a device does not support the required browser APIs, WordPress falls back to server-side processing automatically, so there is no degraded experience for older browsers.

If your plugin hooks into the media upload process using filters like `wp_handle_upload` or `intermediate_image_sizes_advanced`, test those hooks against WordPress 7.0. The final stored result should be the same, but the timing and origin of the processing has shifted. Hooks that expect sub-sizes to be generated server-side may fire at different points in the request lifecycle than they did before.

---

## Part 11: The New Admin Color Scheme

### Modern Is Now the Default

The new default admin color scheme in WordPress 7.0 is called "Modern." It is a cleaner, lighter design that brings the dashboard closer to the visual language of the Site Editor. The old default, previously called "Fresh" (the familiar blue and grey scheme), is still available. Users can switch back to it under Profile settings at Administration Color Scheme. Nothing is removed, just replaced as the default.

The admin refresh is evolutionary rather than a redesign. Spacing, typography, button styles, table layouts, and notice components have been updated for visual consistency, but the overall structure of wp-admin is unchanged. The main risk for plugin developers is any custom admin CSS you are injecting into wp-admin screens. Selectors that matched the old default scheme may produce visual conflicts with the new color palette, or may not match correctly at all. Test your admin UI on a fresh WordPress 7.0 install before the April 9 release.

WordPress 7.0 also adds smooth view transitions between admin screens. Navigating between dashboard pages now produces a brief CSS-powered transition animation instead of a hard page swap. This is purely visual and requires no developer action in most cases. The exception is plugins that use aggressive CSS overrides on `body` or main content wrapper elements that might interfere with transition properties. If your plugin does that, check whether the animation behaves as expected in wp-admin.

---

## Part 12: DataViews and DataForm

### What DataViews Replaces

DataViews replaces the classic WP_List_Table interface on the Posts, Pages, and Media screens. Instead of a static HTML table with server-rendered rows, you get a modern interface with list view, grid view, and table view. Filtering, sorting, and bulk operations happen without full page reloads.

For plugin developers who have been adding custom columns, custom filter dropdowns, or bulk actions, the compatibility picture is mixed. The hooks you have been using, `manage_posts_columns`, `manage_posts_custom_column`, and `bulk_actions`, are not fully integrated with DataViews in 7.0.

WordPress is working on DataViews integration for third-party content types, but that support has not landed yet. Plan to revisit your list table customizations once it does. For now, your existing hooks may still function in some contexts, but do not count on consistent behavior.

### Breaking Change: groupByField Is Gone

If your plugin or theme uses the DataViews component from `@wordpress/dataviews` and you are grouping records with the `groupByField` string property, that API has changed. The `groupByField` string is replaced by a `groupBy` object with `field`, `direction`, and `label` properties.

This is a straightforward find-and-replace in most cases. If you are building views dynamically, make sure any code that constructs or serializes a view object is updated, not just the static declarations.

```js
// Before (WordPress 6.x)
const view = {
    type: 'list',
    groupByField: 'status',
};

// After (WordPress 7.0)
const view = {
    type: 'list',
    groupBy: {
        field: 'status',
        direction: 'asc',
        label: { visibility: 'visible' },
    },
};
```

### New DataForm Controls and Validation

DataForm gains two new input controls in WordPress 7.0: `combobox` and `adaptiveSelect`. The `combobox` control works well for fields with a predefined list of options that you also want to allow free-text input for. The `adaptiveSelect` control switches between a native select element on mobile and a custom dropdown on desktop.

Validation support also expands in this release. Previously you could only mark a field as required. Now DataForm supports `pattern`, `minLength`, `maxLength`, `min`, and `max` validation rules directly in the field definition. All bundled layouts now respect the `validity` prop for displaying error states.

```js
import { DataForm } from '@wordpress/dataviews';

const fields = [
    {
        id: 'title',
        label: 'Title',
        type: 'text',
        Edit: 'text',
        validate: (value) => {
            if (!value || value.length < 3) {
                return 'Title must be at least 3 characters.';
            }
        },
    },
    {
        id: 'status',
        label: 'Status',
        type: 'text',
        Edit: 'combobox',
        elements: [
            { value: 'draft', label: 'Draft' },
            { value: 'publish', label: 'Published' },
            { value: 'private', label: 'Private' },
        ],
    },
];

function MyForm({ data, onChange }) {
    return (
        <DataForm
            data={data}
            fields={fields}
            form={{ type: 'regular', fields: ['title', 'status'] }}
            onChange={onChange}
        />
    );
}
```

---

## Part 13: Interactivity API Changes

### state.navigation Is Deprecated

The `core/router` store in the Interactivity API has a deprecated property in WordPress 7.0. Accessing `state.navigation` from that store will trigger a console warning when `SCRIPT_DEBUG` is enabled. It will stop working in a future version.

The replacement is not yet shipped in 7.0. WordPress 7.1 will bring an official replacement mechanism, so this is a deprecation with a gap before the full alternative arrives. That is worth noting if you are evaluating how much urgency to put on fixing this now.

For the time being, the recommended workaround is to use the new `watch()` function combined with `state.url` from the same store to track client-side navigation events. The pattern is a little more manual than what `state.navigation` offered, but it covers the common use cases.

### The Replacement Pattern

If you were using `state.navigation` to track page changes, such as for analytics or scroll position resets, here is how to do the same thing with `watch()` and `state.url`:

```js
import { store, getContext } from '@wordpress/interactivity';

const { state, actions } = store('my-plugin/router', {
    state: {
        previousUrl: '',
    },
    callbacks: {
        trackNavigation() {
            // watch() runs whenever the watched state changes
            watch(() => {
                const { url } = store('core/router').state;

                if (url !== state.previousUrl) {
                    // Track the navigation event
                    if (typeof window.gtag !== 'undefined') {
                        window.gtag('event', 'page_view', {
                            page_location: url,
                        });
                    }
                    state.previousUrl = url;
                }
            });
        },
    },
});
```

This pattern uses `watch()` from `@preact/signals`, which Gutenberg 22.6 (the version targeting WordPress 7.0) now exports directly. If your plugin was relying on the `effect` function from the same package for navigation tracking, you need to switch to `watch()`.

The behavioral difference is subtle but real. `effect` re-runs whenever any signal it reads changes, while `watch()` is specifically designed for observing a single reactive value and reacting to changes. Swapping one for the other without understanding that distinction can introduce unexpected side effects, so read through your tracking logic carefully before making the switch.

---

## Part 14: theme.json Updates

### Pseudo-Class Support for Blocks

WordPress 7.0 adds `:hover`, `:focus`, `:focus-visible`, and `:active` support directly in `theme.json` for blocks and their style variations. Before this, pseudo-class styles for blocks required writing raw CSS in your theme's stylesheet and working around specificity issues with block-generated styles.

Now you can define interactive states the same way you define base block styles in `theme.json`. The syntax sits inside the existing `styles.blocks` structure, so it fits naturally into a file you are already editing. This also means these styles are part of the global styles system and can be exported or imported along with the rest of your theme's design decisions.

Block-level and variation-level pseudo-selectors are independent. You can define a hover style on the block and a different hover style on a specific variation without them conflicting. WordPress generates scoped selectors for each case, so there is no extra specificity work on your end.

```json
{
  "version": 3,
  "styles": {
    "blocks": {
      "core/button": {
        "color": {
          "background": "var(--wp--preset--color--primary)",
          "text": "var(--wp--preset--color--base)"
        },
        "elements": {
          "link": {
            ":hover": {
              "color": {
                "background": "var(--wp--preset--color--primary-dark)"
              }
            },
            ":focus": {
              "outline": {
                "color": "var(--wp--preset--color--contrast)",
                "offset": "2px",
                "style": "solid",
                "width": "2px"
              }
            }
          }
        }
      }
    }
  }
}
```

Note that this is `theme.json` only in WordPress 7.0. There is no new UI in the Global Styles panel for interactive states. You have to define them in code.

### New Design Tools

WordPress 7.0 adds several new design tools accessible through `theme.json` and the block editor UI. Text line indent and text columns are new typography options. Aspect ratio controls are now available for wide and full-aligned images. Dimension width and height support with presets lets you define named size values that the editor exposes in the block inspector.

These additions give theme developers more control over layout without requiring custom CSS. If you have been using `additionalCss` in `theme.json` to fill these gaps, it is worth going through those overrides and replacing them with the proper design tool definitions. Keeping things in the structured format makes them easier for other developers and the editor UI to read and modify.

### Font Library Now Works for All Themes

The Font Library admin screen is now available for all themes: block themes, classic themes, and hybrid themes. Previously it was scoped to block themes only. Site owners can upload, preview, and apply custom fonts from any WordPress 7.0 site without a third-party plugin.

No code changes are required for this to work. If your classic theme previously used a font management plugin to work around this limitation, you can now remove that dependency.

---

## Part 15: Pattern Overrides and Block Bindings

### Pattern Overrides for Custom Blocks

Pattern Overrides let editors change specific block attributes within a synced pattern without detaching the pattern entirely. In previous versions, this only worked with a hardcoded set of core blocks: Paragraph, Heading, Image, and Button. WordPress 7.0 removes that restriction.

Any block attribute that supports Block Bindings can now participate in Pattern Overrides. This means your custom blocks can be included in synced patterns and still allow editors to override specific attributes on a per-instance basis. A button label, a heading, a custom field value: all of these can be made editable without breaking the sync relationship.

The practical result is that synced patterns become much more useful for real-world editorial workflows. Instead of editors being forced to detach a pattern just to change one label, they can make the targeted override you have set up for them. Less clutter in the patterns library, fewer accidental detachments.

### Registering a Custom Block Binding Source

To make a custom block attribute bindable, you register it using the Block Bindings API. Once registered, it appears as an option in the editor when a user tries to bind a block attribute in a pattern.

```php
<?php
add_action( 'init', function() {
    register_block_bindings_source( 'myplugin/post-field', [
        'label'              => 'Post Field',
        'get_value_callback' => function( array $source_args, WP_Block $block_instance ) {
            $field = $source_args['key'] ?? '';

            switch ( $field ) {
                case 'custom_subtitle':
                    return get_post_meta(
                        $block_instance->context['postId'],
                        '_myplugin_subtitle',
                        true
                    );
                case 'reading_time':
                    return myplugin_calculate_reading_time(
                        $block_instance->context['postId']
                    );
                default:
                    return '';
            }
        },
    ] );
} );
```

The `get_value_callback` receives the `source_args` array, which contains whatever key was set when the binding was created in the editor, along with the full `WP_Block` instance including its context. This means you have access to the post ID and any other context values the block provides when computing the bound value. If your block declares `"usesContext": ["postId"]` in its `block.json`, that value will be available here.

---

## Part 16: CodeMirror Update

### What Changed and Why It Matters

CodeMirror is the code editor library used by the Custom HTML block, the CSS editor in the Customizer, and various other code input fields across wp-admin. WordPress 7.0 updates it to version 5.65.40. This is primarily a maintenance update that adds more extensibility options and fixes several edge cases in syntax highlighting.

For most developers, this change is invisible. If your plugin integrates a custom code editing interface using CodeMirror within wp-admin, test it against version 5.65.40. Breaking changes between CodeMirror 5.x minor versions are rare but possible if you have been using internal APIs. Run through your plugin's code editing features after updating to confirm they work as expected. If you need to check the current loaded version during development, you can inspect `window.CodeMirror.version` in the browser console on any wp-admin page that loads the editor.

---

## Part 17: The Full Migration Checklist

Before April 9, 2026, work through these 14 items for every plugin or theme you maintain. Each one maps to a real breaking change or a risk area in 7.0.

**1. Confirm your host's PHP version**

Check your hosting control panel or run `php -v` on the server. PHP 7.4 is the hard minimum for WordPress 7.0, but you should be targeting 8.2 or 8.3. PHP 7.4 is already EOL and will be dropped in a future release cycle. If your host is still on 7.x, now is the time to push for an upgrade or move to a host that keeps current.

**2. Scan for classic meta boxes and plan migrations**

Search for all `add_meta_box` calls in your plugin. Classic meta boxes render inside an iframed editor context in 7.0, which means they are sandboxed and may lose access to parent window globals, stylesheets, and event listeners they previously relied on. The migration path is `register_post_meta` for data and a `PluginSidebar` component via `@wordpress/edit-post` for the UI.

**3. Audit JavaScript files enqueued via `admin_enqueue_scripts` for editor-targeting patterns**

Scripts loaded through `admin_enqueue_scripts` run in the outer admin frame, not inside the editor iframe. If those scripts use `document.querySelector`, `document.getElementById`, or `window.myGlobal` to reach editor UI elements, they will fail silently in 7.0.

**4. Move editor-targeting scripts to `enqueue_block_editor_assets`**

Any script that needs to interact with the editor, its toolbar, sidebar, or block controls belongs in `enqueue_block_editor_assets`. Scripts that only affect the outer admin shell stay on `admin_enqueue_scripts`.

**5. Find and update `groupByField` usage in DataViews**

If you use `@wordpress/dataviews` in any admin screen, the `groupByField` string property has been replaced with a `groupBy` object. A string value will not throw, but grouping will silently do nothing.

**6. Replace `state.navigation` in Interactivity API code**

The `state.navigation` shorthand in the Interactivity API router is deprecated in 7.0. Replace it with a `watch()` call that tracks `state.url` and reacts to changes explicitly.

**7. Test admin CSS against the new "Modern" color scheme**

WordPress 7.0 ships a new default admin color scheme. Any plugin that uses hardcoded hex colors, assumes specific background values, or overrides core admin CSS selectors may look broken. Load your plugin's admin pages with the Modern scheme active and visually check every screen.

**8. Audit Navigation block overlay templates**

If your theme ships a Navigation block with custom overlay markup baked in as hardcoded HTML, that markup may conflict with the block-based overlay system in 7.0. Replace any hardcoded overlay HTML with the appropriate block structure.

**9. Test `WP_List_Table` customizations on core screens**

The core Posts, Pages, and Media list screens are converted to DataViews in 7.0. Filters and action hooks that previously modified those screens may not fire consistently. Custom post type screens are not yet converted and still use `WP_List_Table`, so those are lower risk.

**10. Test upload and image processing hooks for timing changes**

WordPress 7.0 moves image processing partially to the client side before upload. This changes when `wp_handle_upload` and `intermediate_image_sizes_advanced` fire. Test the full upload flow and confirm your hook fires at the right moment with complete data.

**11. Test `DataForm` component changes if using `@wordpress/dataviews`**

The `DataForm` component has updated its field rendering API in 7.0. Check that field definitions still render correctly, especially for `select`, `radio`, and custom-type fields.

**12. Check CodeMirror integrations after the upgrade**

WordPress 7.0 bundles a newer version of CodeMirror. If your plugin relies on specific API methods from the bundled instance, verify those methods still exist after the update.

**13. Migrate away from the standalone WP AI Client Composer package**

If your plugin installed the WP AI Client via Composer as a standalone dependency, migrate to the core-provided API in 7.0. Remove the Composer dependency and update your code to use the core functions. Running both side by side will cause class conflicts.

**14. Test the full post editing workflow with collaboration enabled**

Enable collaboration on any post type your plugin supports. Open two browser sessions, edit the same post simultaneously, and walk through the full workflow. Any Classic block or classic meta box present in that session will cause collaboration sync issues.

### Quick Audit Commands

Run these grep commands from your plugin root to surface the most common problem spots before you start touching code:

```bash
# Find classic meta box registrations
grep -r "add_meta_box" ./wp-content/plugins/myplugin/

# Find potentially broken document queries in editor scripts
grep -r "document.querySelector\|document.getElementById" ./wp-content/plugins/myplugin/src/

# Find state.navigation usage
grep -r "state\.navigation" ./wp-content/plugins/myplugin/

# Find groupByField usage
grep -r "groupByField" ./wp-content/plugins/myplugin/
```

Pipe any of those into `| grep -v node_modules` if your plugin ships a `node_modules` directory and you do not want to wade through library code.

---

## Part 18: What WordPress 7.0 Means for the Next Two Years

WordPress has spent the last several releases building toward something, and 7.0 is where that trajectory becomes hard to ignore. The combination of WP AI Client, Connectors, Abilities, and the MCP Adapter is not a collection of features bolted onto a CMS. It is a coherent integration stack that treats AI as a first-class runtime target. Connectors give WordPress sites the ability to pull structured context from external services. Abilities let plugins register typed actions that AI agents can call. The MCP Adapter exposes the whole stack to any tool that speaks the Model Context Protocol. The result is a WordPress site that can participate as infrastructure inside an AI workflow, not just as a content source scraped by an LLM.

The MCP Adapter changes the threat model for WordPress sites in a meaningful way. A WordPress site that exposes MCP endpoints is now addressable by AI agents, which is a new attack surface. At the same time, it is a new capability surface. Developers who understand both sides, who know how to lock down Abilities with proper permission checks and who know how to build Connectors that expose useful context safely, are going to be ahead of the people who treat this as a plugin compatibility problem. Secure, well-typed Abilities with scoped permissions will be a differentiator.

Real-time collaboration puts WordPress in direct competition with tools like Notion, Linear, and Figma for team-based content workflows. The technical approach is sound. Yjs is a well-understood CRDT library with a proven track record in collaborative editing tools, and the HTTP polling fallback means no server infrastructure requirement for most sites. The question is not whether the implementation works. It is whether the ecosystem around it matures fast enough for teams to actually use it. That depends on plugin developers completing their migrations away from classic patterns. A post type that still has a classic meta box cannot participate in collaboration.

The iframed editor, the DataViews migration, and the continued investment in `theme.json` all point in the same direction: the block paradigm is the long-term bet, and the project is not hedging it. Plugin developers who have been deferring their migrations because classic patterns still mostly worked are running out of runway. Each release has narrowed the compatibility window, and 7.0 closes it further. Developers who complete the migration now will have less to do with each subsequent release.

---

## Frequently Asked Questions

**Q: My plugin uses `WP_List_Table` for a custom post type admin screen. Is it broken in 7.0?**

No. Custom post type list screens are not converted to DataViews in 7.0. Only the core Posts, Pages, and Media screens are converted. Your custom post type screen still uses `WP_List_Table`, and the hooks and column customizations work as before. Keep an eye on future releases, since the DataViews migration will continue, but for 7.0 you are not affected.

---

**Q: Does real-time collaboration work on self-hosted WordPress?**

Yes. HTTP polling is the default transport and works on any standard WordPress hosting setup with no server configuration. It does not require a paid plan, external service, or WebSocket support. WebSocket upgrade is available for lower latency if your host supports it, but it is optional and not required for collaboration to function.

---

**Q: Can I still use PHP 7.4 or do I have to upgrade to 8.x?**

PHP 7.4 is the minimum floor, not the recommended target. WordPress 7.0 will run on 7.4, but PHP 7.4 has been end-of-life since December 2022 and will be dropped in a future WordPress release. PHP 8.2 or 8.3 is where you should be running. If you are on 7.4, treat it as technical debt with a deadline, not a stable long-term position.

---

**Q: Will my existing block styles still work after the heading variations change?**

If you call `register_block_style` targeting `core/heading`, test carefully. Heading levels are now managed as block variations in 7.0, which changes how style selectors are matched against the block. Set up a 7.0 dev environment, activate your plugin, and visually confirm each heading level renders the style correctly.

---

**Q: The Abilities API was experimental in 6.x. Is the API surface stable now?**

Yes. The Abilities API is marked stable in WordPress 7.0. Function signatures and behavior are committed to backward compatibility. A breaking change to the Abilities API would require a formal deprecation cycle. It is safe to build production features against it now.

---

**Q: My theme injects custom fonts using a font management plugin. Do I need to remove it?**

You do not have to remove it immediately, but you can. The Font Library is now a stable, native WordPress feature available to block themes, classic themes, and hybrid themes. If your font management plugin's main job is adding and managing fonts, you can uninstall it and manage fonts directly through Appearance > Font Library. No code changes are needed.

---

## Wrapping Up

WordPress 7.0 is the most change-dense release since 5.0 introduced the block editor. The surface area of this release is wide: a new AI integration stack, real-time collaboration, a revamped routing system in the Interactivity API, a fully iframed editor, DataViews replacing classic list tables, and a new default admin color scheme. Most of these ship with hard cutoffs, not deprecation warnings you can ignore for another release cycle.

The breaking changes concentrate in three areas. The iframed editor is the biggest one for plugin developers, because anything that assumed access to the outer admin frame from inside the editor is now broken by design. The PHP version floor is the biggest one for hosts and site owners, because PHP 7.4 is genuinely end-of-life and running it is a security decision, not just a compatibility one. And the Interactivity API router changes are the most targeted, affecting only code that used `state.navigation`, but affecting it completely.

The new APIs, WP AI Client, Connectors, Abilities, and the MCP Adapter, are not optional extras that you can evaluate later. They represent the direction WordPress is heading. Sites and plugins that integrate with this stack will have capabilities that those relying on classic patterns simply will not. The developers who build fluency with `WP_AI_Ability`, typed Connectors, and secure MCP endpoints now will have a meaningful advantage over the next two years.

Start the audit today. Use the checklist and grep commands in Part 17. Stand up a staging environment running WordPress 7.0 before April 9. Test everything you ship: plugins, themes, custom post types, and any admin screens you maintain.
