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
