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
