# WordPress 7.0 Developer Guide — Part F

---

## Part 17: The Full Migration Checklist

Before April 9, 2026, work through these 14 items for every plugin or theme you maintain. Each one maps to a real breaking change or a risk area in 7.0.

**1. Confirm your host's PHP version**

Check your hosting control panel or run `php -v` on the server. PHP 7.4 is the hard minimum for WordPress 7.0, but you should be targeting 8.2 or 8.3. PHP 7.4 is already EOL and will be dropped in a future release cycle. If your host is still on 7.x, now is the time to push for an upgrade or move to a host that keeps current.

**2. Scan for classic meta boxes and plan migrations**

Search for all `add_meta_box` calls in your plugin. Classic meta boxes render inside an iframed editor context in 7.0, which means they are sandboxed and may lose access to parent window globals, stylesheets, and event listeners they previously relied on. The migration path is `register_post_meta` for data and a `PluginSidebar` component via `@wordpress/edit-post` for the UI. You do not have to migrate everything at once, but any meta box that touches the editor DOM directly needs to move.

**3. Audit JavaScript files enqueued via `admin_enqueue_scripts` for editor-targeting patterns**

Scripts loaded through `admin_enqueue_scripts` run in the outer admin frame, not inside the editor iframe. If those scripts use `document.querySelector`, `document.getElementById`, or `window.myGlobal` to reach editor UI elements, they will fail silently in 7.0. Open each JS file and grep for these patterns.

**4. Move editor-targeting scripts to `enqueue_block_editor_assets`**

Any script that needs to interact with the editor, its toolbar, sidebar, or block controls belongs in `enqueue_block_editor_assets`. This hook loads scripts inside the editor iframe context. Scripts that only affect the outer admin shell (notices, admin menus, dashboard widgets) stay on `admin_enqueue_scripts`.

**5. Find and update `groupByField` usage in DataViews**

If you use `@wordpress/dataviews` in any admin screen, the `groupByField` string property on view configuration objects has been replaced with a `groupBy` object. A string value will not throw, but grouping will silently do nothing. Search your code and update.

Old:
```js
const view = {
  type: 'list',
  groupByField: 'status',
};
```

New:
```js
const view = {
  type: 'list',
  groupBy: {
    field: 'status',
  },
};
```

**6. Replace `state.navigation` in Interactivity API code**

The `state.navigation` shorthand in the Interactivity API router is removed in 7.0. Replace it with a `watch()` call that tracks `state.url` and reacts to changes explicitly. This pattern gives you the same behavior with more control over timing.

```js
// Before
const { state } = store( 'my-plugin/router', {
  state: {
    navigation: '/page-2',
  },
} );

// After
const { state, watch } = store( 'my-plugin/router', {
  state: {
    url: window.location.pathname,
  },
  callbacks: {
    init() {
      watch( () => state.url, ( newUrl ) => {
        // react to URL change
        console.log( 'Navigated to:', newUrl );
      } );
    },
  },
} );
```

**7. Test admin CSS against the new "Modern" color scheme**

WordPress 7.0 ships a new default admin color scheme called Modern. It changes background tones, border radii, and button styles across the admin. Any plugin that uses hardcoded hex colors, assumes specific background values, or overrides core admin CSS selectors may look broken. Load your plugin's admin pages with the Modern scheme active in Appearance > Admin Color Scheme and visually check every screen.

**8. Audit Navigation block overlay templates**

If your theme ships a Navigation block with custom overlay markup baked in as hardcoded HTML, that markup may conflict with the block-based overlay system in 7.0. The Navigation block now manages overlays through a dedicated inner block. Pull your theme's Navigation templates and compare them against the 7.0 default markup. Replace any hardcoded overlay HTML with the appropriate block structure.

**9. Test `WP_List_Table` customizations on core screens**

The core Posts, Pages, and Media list screens are converted to DataViews in 7.0. Filters and action hooks that previously modified those screens via `WP_List_Table` will not fire consistently on the converted screens. Test each hook your plugin uses. Hooks like `manage_posts_columns`, `manage_posts_custom_column`, and `bulk_actions-edit-post` may behave differently or be ignored. Custom post type screens are not yet converted and still use `WP_List_Table`, so those are lower risk.

**10. Test upload and image processing hooks for timing changes**

WordPress 7.0 moves image processing partially to the client side before upload. This changes when `wp_handle_upload` and `intermediate_image_sizes_advanced` fire relative to when the file data is available. If your plugin hooks into the upload pipeline to process, watermark, or redirect images, test the full upload flow and confirm your hook fires at the right moment with complete data.

**11. Test `DataForm` component changes if using `@wordpress/dataviews`**

The `DataForm` component has updated its field rendering API in 7.0. If you built custom admin interfaces using `DataForm`, check that field definitions still render correctly, especially for `select`, `radio`, and custom-type fields. Render a form with your existing field config on a 7.0 dev environment and step through each field type.

**12. Check CodeMirror integrations after the upgrade**

WordPress 7.0 bundles a newer version of CodeMirror. If your plugin reads `window.CodeMirror.version` or relies on specific API methods from the bundled instance, verify those methods still exist after the update. The instance is available under the same global, but internal APIs between CodeMirror major versions differ significantly.

**13. Migrate away from the standalone WP AI Client Composer package**

If your plugin installed the WP AI Client via Composer as a standalone dependency, migrate to the core-provided API in 7.0. The `wp_ai_client()` function is available in core and the `WP_AI_Ability` class replaces the package-level equivalents. Remove the Composer dependency and update your code to use the core functions. Running both side by side will cause class conflicts.

**14. Test the full post editing workflow with collaboration enabled**

Enable collaboration on any post type your plugin supports. Open two browser sessions, edit the same post simultaneously, and walk through the full workflow: typing, saving, meta changes, and publishing. Any Classic block or classic meta box present in that session will cause collaboration sync issues. Confirm your post type's edit screen is clean of classic patterns before April 9.

---

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

The MCP Adapter changes the threat model for WordPress sites in a meaningful way. A WordPress site that exposes MCP endpoints is now addressable by AI agents, which is a new attack surface. At the same time, it is a new capability surface. Developers who understand both sides, who know how to lock down Abilities with proper permission checks and who know how to build Connectors that expose useful context safely, are going to be ahead of the people who treat this as a plugin compatibility problem. Secure, well-typed Abilities with scoped permissions will be a differentiator. Poorly secured ones will be a liability.

Real-time collaboration puts WordPress in direct competition with tools like Notion, Linear, and Figma for team-based content workflows. The technical approach is sound. Yjs is a well-understood CRDT library with a proven track record in collaborative editing tools, and the HTTP polling fallback means no server infrastructure requirement for most sites. The question is not whether the implementation works. It is whether the ecosystem around it, the plugins, the post types, the editorial workflows, matures fast enough for teams to actually use it. That depends on plugin developers completing their migrations away from classic patterns. A post type that still has a classic meta box cannot participate in collaboration.

The iframed editor, the DataViews migration, and the continued investment in `theme.json` all point in the same direction: the block paradigm is the long-term bet, and the project is not hedging it. Plugin developers who have been deferring their migrations because classic patterns still mostly worked are running out of runway. Each release has narrowed the compatibility window, and 7.0 closes it further. Developers who complete the migration now will have less to do with each subsequent release. Developers who wait will face more work under more time pressure.

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

If you call `register_block_style` targeting `core/heading`, test carefully. Heading levels are now managed as block variations in 7.0, which changes how style selectors are matched against the block. A style that worked across all heading levels before may not apply consistently to variation-based headings. Set up a 7.0 dev environment, activate your plugin, and visually confirm each heading level renders the style correctly.

---

**Q: The Abilities API was experimental in 6.x. Is the API surface stable now?**

Yes. The Abilities API is marked stable in WordPress 7.0. Function signatures and behavior are committed to backward compatibility. A breaking change to the Abilities API would require a formal deprecation cycle. It is safe to build production features against it now.

---

**Q: My theme injects custom fonts using a font management plugin. Do I need to remove it?**

You do not have to remove it immediately, but you can. The Font Library is now a stable, native WordPress feature available to block themes, classic themes, and hybrid themes. If your font management plugin's main job is adding and managing fonts, you can uninstall it and manage fonts directly through Appearance > Font Library. No code changes are needed. If the plugin does other things beyond font management, evaluate those features separately.

---

## Wrapping Up

WordPress 7.0 is the most change-dense release since 5.0 introduced the block editor. The surface area of this release is wide: a new AI integration stack, real-time collaboration, a revamped routing system in the Interactivity API, a fully iframed editor, DataViews replacing classic list tables, and a new default admin color scheme. Most of these ship with hard cutoffs, not deprecation warnings you can ignore for another release cycle.

The breaking changes concentrate in three areas. The iframed editor is the biggest one for plugin developers, because anything that assumed access to the outer admin frame from inside the editor is now broken by design. The PHP version floor is the biggest one for hosts and site owners, because PHP 7.4 is genuinely end-of-life and running it is a security decision, not just a compatibility one. And the Interactivity API router changes are the most targeted, affecting only code that used `state.navigation`, but affecting it completely.

The new APIs, WP AI Client, Connectors, Abilities, and the MCP Adapter, are not optional extras that you can evaluate later. They represent the direction WordPress is heading. Sites and plugins that integrate with this stack will have capabilities that those relying on classic patterns simply will not. The developers who build fluency with `WP_AI_Ability`, typed Connectors, and secure MCP endpoints now will have a meaningful advantage over the next two years.

Start the audit today. Use the checklist and grep commands in Part 17. Stand up a staging environment running WordPress 7.0 before April 9. Test everything you ship: plugins, themes, custom post types, and any admin screens you maintain. If anything in the RC process shifts before release, the specifics in this guide will be updated. The fundamentals will not change.
