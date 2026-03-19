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
