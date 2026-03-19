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
