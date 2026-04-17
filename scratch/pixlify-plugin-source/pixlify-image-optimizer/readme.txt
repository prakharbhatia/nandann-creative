=== Pixlify - WebP & Image Optimizer ===
Contributors: prakharb88
Donate link: https://nandann.com
Tags: webp, image optimization, compress images, avif, bulk optimize
Requires at least: 5.8
Tested up to: 6.9
Requires PHP: 7.4
Stable tag: 1.3.8
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Author: Prakhar Bhatia
Author URI: https://nandann.com

Convert images to WebP/AVIF, compress lossy/lossless, bulk batch via cron, detect duplicates. 100% free — no API keys, no quotas.

== Description ==

**Pixlify Image Optimizer** is a fully free, server-side image optimization plugin that requires no API keys, no monthly quotas, and no external services. Everything runs on your own server using PHP's GD or Imagick extensions.

= Core Features =

* **Auto-convert to WebP and/or AVIF** on upload — no manual steps required
* **Lossy or lossless compression** with a quality slider (1–100)
* **Max width / height resize** — automatically downscale oversized images on upload
* **Bulk batch processing** with adjustable batch size and WP-Cron automation
* **Force Re-optimize All** — clear conversion history and re-queue every image (use after changing output format)
* **Original backup** — keep a copy before conversion so you can restore at any time
* **Duplicate image detection** — find files with identical content via MD5 comparison
* **Unused image detection** — identify attachments not referenced in posts, meta, or options
* **Stale image detection** — flag uploads older than N days with no references
* **Media Library column** — see optimization status and savings % at a glance
* **Per-image restore** — roll back any image to its original from the admin
* **Frontend image serving via &lt;picture&gt;** — serves AVIF/WebP to supporting browsers with the original as fallback; works on all hosts including WP Engine (no Accept header required)
* **CSS background image serving** — rewrites Elementor, Divi, Avada, and any inline CSS `background-image: url(...)` to use `image-set()` for AVIF/WebP delivery
* **WP-CLI support** — optimize, reset, and configure from the command line for agent/automation workflows

= Why Pixlify? =

Most image optimization plugins charge for features like AVIF support, bulk processing, or duplicate detection. Pixlify gives you all of this for free, with zero external API calls — your images never leave your server.

= Requirements =

* PHP 7.4 or higher
* GD extension (WebP support) **or** Imagick extension (WebP + AVIF support)

= WP-CLI Commands =

    wp pixlify status
    wp pixlify optimize [--force] [--format=webp|avif|both] [--dry-run]
    wp pixlify queue build [--force]
    wp pixlify queue clear
    wp pixlify queue status
    wp pixlify reset [--attachment=<id>] [--yes]
    wp pixlify settings get [<key>]
    wp pixlify settings set <key> <value>

== Installation ==

1. Upload the `pixlify-image-optimizer` folder to `/wp-content/plugins/`
2. Activate the plugin through the **Plugins** screen in WordPress
3. Go to **Pixlify → Settings** to configure compression quality, output format, and batch size
4. Go to **Pixlify → Bulk Optimize** to process your existing image library

== Frequently Asked Questions ==

= Does this plugin require an API key? =

No. All processing happens on your server using PHP's GD or Imagick libraries.

= Will it work without Imagick? =

Yes. If Imagick is not available, the plugin falls back to GD for WebP conversion. AVIF requires Imagick.

= Can I restore my original images? =

Yes, if you enable "Backup originals" in Settings, each image is backed up before conversion and can be restored individually from the Bulk Optimize page.

= Does it convert existing images or only new uploads? =

Both. New images are converted automatically on upload (if enabled). Existing images can be processed via the Bulk Optimize page using batch processing.

= How does WebP/AVIF serving work? =

The plugin rewrites your frontend HTML on the fly. `<img>` tags are wrapped in `<picture>` elements with typed `<source>` entries — AVIF first, WebP second, original as fallback. CSS `background-image` declarations (used by Elementor, Divi, Avada, etc.) are rewritten to use CSS `image-set()` with the same fallback chain. No Accept header is required, so it works on all hosting environments including WP Engine, Cloudflare, and Varnish-cached hosts.

= I changed the output format — can I re-optimize already-converted images? =

Yes. Use the **Force Re-optimize All** button on the Bulk Optimize page. It clears all conversion history and re-queues every image so the new format is applied. You can also run `wp pixlify optimize --force --format=both` from WP-CLI.

= Is it compatible with page builders like Elementor? =

Yes. The output buffer rewriter handles all HTML, including Elementor's inline `style="background-image: url(...)"` attributes and its generated `<style>` blocks. Both `<img>` sources and CSS backgrounds are served in the best available format.

= Is it compatible with multisite? =

Yes, the plugin is network-activatable and each site stores its own settings and image records.

== Screenshots ==

1. Dashboard — server capabilities and optimization statistics at a glance
2. Bulk Optimize — live progress bar with batch-by-batch processing and session log
3. Settings — format, quality, resize, cron, and advanced options
4. Duplicates — scan for duplicate, unused, or stale images with one click
5. Media Library column — per-image status badge with savings percentage

== Changelog ==

= 1.3.3 =
* JS background rewriter — MutationObserver intercepts `background-image` styles set at runtime by JavaScript (Elementor Background Slideshow, Swiper.js, etc.); uses `fetch HEAD` to find the best available format and swaps in-place; cached in `sessionStorage`; on by default; can be toggled in Settings

= 1.3.2 =
* External CSS file rewriting — Elementor's "External File" CSS Print Method (WP Engine, Kinsta) now served as AVIF/WebP; injects a compact override `<style>` block after the original `<link>` without re-serving the whole stylesheet

= 1.3.1 =
* CSS background image rewriting — Elementor sections, Divi rows, Avada backgrounds, and any inline `background-image: url(...)` now served as AVIF/WebP via CSS `image-set()` with the original as fallback

= 1.3.0 =
* Force Re-optimize All — clear conversion history and re-queue every image; use after changing output format (e.g. AVIF → Both)
* WP-CLI commands — `wp pixlify optimize`, `queue`, `reset`, `status`, `settings`
* Auto-processing live ticker — shows elapsed seconds during long batches so the page never looks frozen
* `<picture>` elements use `display:contents` to be layout-transparent (fixes carousels, flex/grid containers)

= 1.2.2 =
* Frontend image serving via `<picture>` elements — works on all hosts without needing Accept header
* Removed dependency on `.htaccess` mod_rewrite for image serving
* Active Processes panel with per-process Kill buttons
* Background polling mode after gateway timeouts (WP Engine, Kinsta)
* Auto-release stale batch locks

= 1.0.0 =
* Initial release
* WebP and AVIF conversion via GD and Imagick adapters
* Lossy / lossless compression with quality control
* Max width / height resize on upload
* Cron-based batch processing
* Duplicate, unused, and stale image detection
* Per-image backup and restore
* Media Library optimization status column

== Upgrade Notice ==

= 1.3.3 =
Adds JS background rewriter for Elementor Background Slideshow and other JS-driven backgrounds. On by default. No migration needed.

= 1.3.2 =
Adds external CSS file rewriting for Elementor's "External File" mode (WP Engine, Kinsta). No migration needed.

= 1.3.1 =
Adds CSS background image rewriting for Elementor and other page builders. No migration needed.

= 1.3.0 =
Adds Force Re-optimize, WP-CLI commands, and live batch ticker. No migration needed.
