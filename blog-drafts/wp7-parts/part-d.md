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
