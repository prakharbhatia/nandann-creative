<?php
/**
 * Frontend WebP/AVIF image rewriter.
 *
 * Serves converted images to browsers WITHOUT relying on the HTTP Accept header.
 * Some hosts (WP Engine, Cloudflare, Varnish) normalise or strip the Accept
 * header before PHP sees it, which broke the previous Accept-based approach.
 *
 * Two complementary strategies:
 *
 * 1. WordPress filters — intercept URLs returned by core image functions
 *    (wp_get_attachment_image_src, wp_calculate_image_srcset) BEFORE they
 *    reach the HTML. These use <picture> source injection via wp_get_attachment_image_attributes.
 *
 * 2. Output buffer — wrap every <img> tag whose src resolves to a converted
 *    file in a <picture> element with typed <source> entries, keeping the
 *    original <img> as a universal fallback.
 *
 *    Result for an image with an .avif conversion:
 *      <picture>
 *        <source srcset="photo.avif" type="image/avif">
 *        <source srcset="photo.webp" type="image/webp">  ← only if .webp also exists
 *        <img src="photo.jpg" ...original attributes...>
 *      </picture>
 *
 * The <picture> approach is correct for all browsers:
 *   - Browsers that support AVIF load photo.avif.
 *   - Browsers that support WebP load photo.webp.
 *   - Older browsers fall back to the original photo.jpg.
 *   No Accept header check required.
 *
 * Filesystem existence checks are cached per-request to avoid redundant calls.
 */
defined( 'ABSPATH' ) || exit;

class Pixlify_Rewriter {

    /** @var bool  Serve .avif when the converted file exists. */
    private static $serve_avif = false;

    /** @var bool  Serve .webp when the converted file exists. */
    private static $serve_webp = false;

    /** @var string  Trailing-slash URL of the uploads base directory. */
    private static $upload_url = '';

    /** @var string  Trailing-slash filesystem path of the uploads base directory. */
    private static $upload_dir = '';

    /** @var array  Per-request cache: original URL => array( 'avif' => url|null, 'webp' => url|null ) */
    private static $cache = array();

    /** @var array  Per-request cache: CSS file path => override <style> block string (or '') */
    private static $css_cache = array();

    // -------------------------------------------------------------------------
    // Bootstrap
    // -------------------------------------------------------------------------

    /**
     * Initialise the rewriter.  Called once at plugins_loaded.
     */
    public static function init() {
        $settings = Pixlify_Settings::get();

        if ( empty( $settings['webp_redirect'] ) && empty( $settings['avif_redirect'] ) ) {
            return;
        }

        // Skip in admin, AJAX, and cron contexts — only rewrite frontend pages.
        if ( is_admin() || wp_doing_ajax() || wp_doing_cron() ) {
            return;
        }

        // License gate: WebP and AVIF serving requires a valid (non-expired) license.
        // Conversion to disk still runs so images are ready when the license is renewed.
        if ( ! Pixlify_License::is_licensed() ) {
            return;
        }

        self::$serve_avif = ! empty( $settings['avif_redirect'] );
        self::$serve_webp = ! empty( $settings['webp_redirect'] );

        $upload           = wp_upload_dir();
        self::$upload_url = trailingslashit( set_url_scheme( $upload['baseurl'] ) );
        self::$upload_dir = trailingslashit( $upload['basedir'] );

        // Strategy 1 — WordPress image filters (featured images, galleries, etc.)
        add_filter( 'wp_get_attachment_image_attributes', array( __CLASS__, 'filter_img_attributes' ), 20, 3 );
        add_filter( 'wp_calculate_image_srcset',          array( __CLASS__, 'filter_srcset' ),         20, 5 );

        // Strategy 2 — Output buffer catches everything else (page builders,
        // hard-coded HTML, theme templates, lazy-loaders, etc.)
        add_action( 'template_redirect', array( __CLASS__, 'start_buffer' ), 1 );

        // Strategy 3 — JS MutationObserver for background-image styles set dynamically
        // at runtime (e.g. Elementor Background Slideshow builds slide divs via JS).
        if ( ! empty( $settings['js_bg_rewrite'] ) ) {
            add_action( 'wp_footer', array( __CLASS__, 'print_js_rewriter' ), 99 );
        }
    }

    // -------------------------------------------------------------------------
    // Strategy 1 — WordPress image filters
    // -------------------------------------------------------------------------

    /**
     * Filter: wp_get_attachment_image_attributes
     * Rewrites the src (and srcset) to point to the best available converted file.
     *
     * @param array        $attr
     * @param WP_Post      $attachment
     * @param string|array $size
     * @return array
     */
    public static function filter_img_attributes( $attr, $attachment, $size ) {
        if ( ! empty( $attr['src'] ) ) {
            $best = self::best_url( $attr['src'] );
            if ( $best ) {
                $attr['src'] = $best;
            }
        }

        if ( ! empty( $attr['srcset'] ) ) {
            $attr['srcset'] = self::rewrite_srcset_string( $attr['srcset'] );
        }

        return $attr;
    }

    /**
     * Filter: wp_calculate_image_srcset
     *
     * @param array $sources  Keyed by width; each entry has 'url' and 'descriptor'.
     * @return array
     */
    public static function filter_srcset( $sources ) {
        if ( ! is_array( $sources ) ) {
            return $sources;
        }
        foreach ( $sources as $w => $src ) {
            if ( ! empty( $src['url'] ) ) {
                $best = self::best_url( $src['url'] );
                if ( $best ) {
                    $sources[ $w ]['url'] = $best;
                }
            }
        }
        return $sources;
    }

    // -------------------------------------------------------------------------
    // Strategy 2 — Output buffer
    // -------------------------------------------------------------------------

    /**
     * Strategy 3: inject a lightweight inline script that watches for
     * background-image inline styles added at runtime by JavaScript
     * (e.g. Elementor Background Slideshow, Swiper.js, etc.).
     *
     * The script:
     *  1. Uses MutationObserver to detect style attribute changes.
     *  2. For each upload image URL found in a background-image, does a
     *     single fetch(HEAD) to check whether the .avif / .webp version
     *     exists — AVIF first if enabled, then WebP.
     *  3. On success, rewrites el.style.backgroundImage in place.
     *  4. Caches results in sessionStorage so subsequent navigations or
     *     slideshow transitions never re-check the same URL.
     */
    public static function print_js_rewriter() {
        $upload = wp_upload_dir();
        $cfg    = array(
            'avif'    => self::$serve_avif ? 1 : 0,
            'webp'    => self::$serve_webp ? 1 : 0,
            'uploads' => esc_url( set_url_scheme( $upload['baseurl'] ) ),
        );
        ?>
<script id="pixlify-js-rewriter">
(function(){
var cfg=<?php echo wp_json_encode( $cfg ); ?>;
if(!cfg.avif&&!cfg.webp)return;
if(!cfg.uploads)return;
if(!window.MutationObserver||!window.fetch)return;

var CACHE_KEY='pixlify_url_cache';
var cache={};
try{var s=JSON.parse(sessionStorage.getItem(CACHE_KEY)||'{}');if(s&&typeof s==='object')cache=s;}catch(e){}
function saveCache(){try{sessionStorage.setItem(CACHE_KEY,JSON.stringify(cache));}catch(e){}}

function isUpload(url){
  return url&&url.indexOf(cfg.uploads)!==-1&&/\.(jpe?g|png|gif)(\?.*)?$/i.test(url);
}

function applyBest(el,orig){
  if(cache[orig]!==undefined){
    if(cache[orig]&&cache[orig]!==orig)el.style.backgroundImage="url('"+cache[orig]+"')";
    return;
  }
  var fmts=[];
  if(cfg.avif)fmts.push(orig.replace(/\.(jpe?g|png|gif)(\?.*)?$/i,'.avif'));
  if(cfg.webp)fmts.push(orig.replace(/\.(jpe?g|png|gif)(\?.*)?$/i,'.webp'));
  function tryNext(i){
    if(i>=fmts.length){cache[orig]=orig;saveCache();return;}
    fetch(fmts[i],{method:'HEAD'}).then(function(r){
      if(r.ok){cache[orig]=fmts[i];saveCache();el.style.backgroundImage="url('"+fmts[i]+"')";}
      else tryNext(i+1);
    }).catch(function(){tryNext(i+1);});
  }
  tryNext(0);
}

function processEl(el){
  if(!el||!el.style)return;
  var bg=el.style.backgroundImage;
  if(!bg)return;
  var m=bg.match(/url\s*\(\s*["']?([^"')]+)["']?\s*\)/i);
  if(!m)return;
  if(isUpload(m[1]))applyBest(el,m[1]);
}

function processTree(root){
  processEl(root);
  if(root.querySelectorAll){
    var els=root.querySelectorAll('[style*="background-image"]');
    for(var i=0;i<els.length;i++)processEl(els[i]);
  }
}

var obs=new MutationObserver(function(muts){
  for(var i=0;i<muts.length;i++){
    var m=muts[i];
    if(m.type==='attributes'&&m.attributeName==='style'){processEl(m.target);}
    else if(m.type==='childList'){
      for(var j=0;j<m.addedNodes.length;j++){
        var n=m.addedNodes[j];
        if(n.nodeType===1)processTree(n);
      }
    }
  }
});

function start(){
  processTree(document.body||document.documentElement);
  obs.observe(document.body||document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['style']});
}

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',start);}
else{start();}
})();
</script>
        <?php
    }

    /**
     * Start output buffering.  Fires on template_redirect (priority 1).
     */
    public static function start_buffer() {
        ob_start( array( __CLASS__, 'rewrite_html' ) );
    }

    /**
     * Output-buffer callback.
     * Two passes over the HTML:
     *
     * Pass 1 — Wraps <img> tags in <picture> elements with typed <source> entries.
     * Pass 2 — Rewrites CSS background-image: url(...) to use image-set() so that
     *           Elementor section/column backgrounds (and any other CSS backgrounds)
     *           are also served as AVIF/WebP without needing the Accept header.
     *
     * @param string $html
     * @return string
     */
    public static function rewrite_html( $html ) {
        if ( empty( $html ) ) {
            return $html;
        }

        // Pass 1 — <img> tags → <picture> wrappers.
        $html = preg_replace_callback(
            // Match <img ...> and <img ... /> — use 's' (DOTALL) for multi-line tags.
            '/<img(\s[^>]*)?\/?>/is',
            array( __CLASS__, 'wrap_img_tag' ),
            $html
        );

        // Pass 2 — CSS background-image: url(...) inside style="" attributes and
        // <style> blocks (Elementor, Avada, Divi, Beaver Builder, etc. all use this).
        // Skip if neither AVIF nor WebP is being served — nothing to rewrite.
        if ( self::$serve_avif || self::$serve_webp ) {
            $html = preg_replace_callback(
                // Matches all quote styles Elementor and page builders produce:
                //   url(image.jpg)               — no quotes
                //   url('image.jpg')             — single quotes
                //   url("image.jpg")             — double quotes (in <style> blocks)
                //   url(&quot;image.jpg&quot;)   — HTML-encoded double quotes
                //                                   (Elementor inline style="" attrs)
                // Non-capturing groups consume the surrounding quotes so only
                // the raw URL ends up in capture group 1.
                '/\bbackground-image\s*:\s*url\(\s*(?:&quot;|[\'"])?([^\'"\)\s&][^\'"\)\s]*)(?:&quot;|[\'"])?\s*\)/i',
                array( __CLASS__, 'rewrite_bg_url' ),
                $html
            );

            // Pass 3 — data-settings JSON attributes (Elementor Background Slideshow
            // and similar widgets build inline background-image styles at runtime via
            // JS reading data-settings JSON on the section/column element).  By the
            // time our output buffer sees the HTML the JS hasn't run yet, so the slide
            // <div> with style="background-image:url(...)" doesn't exist in the source.
            // Rewriting the URLs here — before JS reads them — makes Elementor use the
            // converted file when it creates those divs.
            //
            // Elementor outputs data-settings as a double-quoted HTML attribute whose
            // value is the JSON string with all " encoded as &quot;.  We HTML-decode,
            // JSON-decode, walk every string value, rewrite upload image URLs to best
            // available format, JSON-encode and re-escape for HTML.
            $html = preg_replace_callback(
                '/\bdata-settings="([^"]*)"/i',
                array( __CLASS__, 'rewrite_data_settings' ),
                $html
            );

            // Pass 5 — External CSS files from the uploads directory.
            // Elementor on WP Engine (and other hosts) uses "External File" CSS Print
            // Method, writing per-post CSS to /uploads/elementor/css/post-N.css and
            // including it via a <link> tag.  Our output buffer only sees HTML, so
            // Pass 2 above misses those files.  Here we find every <link> pointing
            // to a CSS file inside the uploads directory, read it from disk, rewrite
            // only the background-image rules that reference upload images, and inject
            // a compact override <style> block immediately after the original <link>.
            $html = preg_replace_callback(
                // Capture the entire <link ...> tag and the href value separately.
                // We require rel="stylesheet" anywhere in the tag and an href that
                // lives inside the uploads directory (/uploads/ path segment).
                '/<link(?=[^>]*\brel=[\'"]stylesheet[\'"])[^>]*\bhref=([\'"])([^\'"\s]+\/uploads\/[^\'"\s]+\.css(?:\?[^\'"\s]*)?)\1[^>]*\/?>/is',
                array( __CLASS__, 'inject_css_overrides' ),
                $html
            );
        }

        return $html;
    }

    /**
     * For a single <img> match, build the <picture> wrapper if converted files exist.
     *
     * @param array $m  preg_replace_callback matches.
     * @return string
     */
    private static function wrap_img_tag( $m ) {
        $attrs    = isset( $m[1] ) ? $m[1] : '';
        $orig_tag = $m[0];

        // Extract the primary src URL.
        if ( ! preg_match( '/\bsrc\s*=\s*(["\'])([^"\']+)\1/i', $attrs, $src_m ) ) {
            return $orig_tag; // No src attribute — skip.
        }

        $src_url = $src_m[2];

        // Find which converted versions exist.
        $avif_url = ( self::$serve_avif ) ? self::get_converted_url( $src_url, 'avif' ) : null;
        $webp_url = ( self::$serve_webp ) ? self::get_converted_url( $src_url, 'webp' ) : null;

        if ( ! $avif_url && ! $webp_url ) {
            return $orig_tag; // No converted version — leave untouched.
        }

        // Also rewrite srcset and data-srcset inside the img tag.
        $attrs = preg_replace_callback(
            '/\b(srcset|data-srcset)\s*=\s*(["\'])([^"\']*)\2/i',
            array( __CLASS__, 'cb_rewrite_srcset' ),
            $attrs
        );

        // Also rewrite data-src for lazy loaders.
        $attrs = preg_replace_callback(
            '/\b(data-src)\s*=\s*(["\'])([^"\']*)\2/i',
            array( __CLASS__, 'cb_rewrite_single' ),
            $attrs
        );

        // Preserve self-closing slash if original tag had it.
        $self_close = ( preg_match( '/\/\s*>$/i', $orig_tag ) ) ? ' /' : '';
        $img_tag    = '<img' . $attrs . $self_close . '>';

        // Build <picture> sources (AVIF first — better compression).
        $sources = '';
        if ( $avif_url ) {
            $sources .= '<source srcset="' . esc_url( $avif_url ) . '" type="image/avif">';
        }
        if ( $webp_url ) {
            $sources .= '<source srcset="' . esc_url( $webp_url ) . '" type="image/webp">';
        }

        // display:contents makes the <picture> wrapper transparent to CSS layout:
        // the <img> is laid out exactly as if it were a direct child of the original
        // parent element.  Carousels, grid layouts, and flex containers all see the
        // <img> unchanged — no collapsed heights, no broken float/flex axes.
        // The browser still reads the <source> elements to pick AVIF or WebP.
        return '<picture style="display:contents;">' . $sources . $img_tag . '</picture>';
    }

    /**
     * Callback for Pass 2: rewrite a single background-image: url(...) match.
     *
     * Emits a dual declaration so every browser gets the right format:
     *
     *   background-image: url('original.jpg');          ← legacy fallback (all browsers)
     *   background-image: image-set(                    ← modern browsers override
     *       url('image.avif') type('image/avif'),
     *       url('image.webp') type('image/webp'),
     *       url('original.jpg') type('image/jpeg'));
     *
     * CSS cascade: the last rule a browser understands wins.
     * Browsers without image-set() use the first declaration.
     * Browsers that understand image-set() use the second.
     *
     * Single quotes are used throughout so the output is safe inside both
     * HTML style="" attributes (no &quot; encoding needed) and <style> blocks.
     *
     * @param array $m  [0]=full match, [1]=raw URL (quotes already stripped by regex)
     * @return string
     */
    private static function rewrite_bg_url( $m ) {
        $orig = $m[0];
        $url  = $m[1]; // raw URL without surrounding quotes

        $avif_url = self::$serve_avif ? self::get_converted_url( $url, 'avif' ) : null;
        $webp_url = self::$serve_webp ? self::get_converted_url( $url, 'webp' ) : null;

        if ( ! $avif_url && ! $webp_url ) {
            return $orig; // No converted version available — leave untouched.
        }

        // Detect MIME type of the original for the image-set fallback entry.
        $orig_type = preg_match( '/\.png(\?.*)?$/i', $url ) ? 'image/png'
                   : ( preg_match( '/\.gif(\?.*)?$/i', $url ) ? 'image/gif' : 'image/jpeg' );

        // Build image-set() entries using single quotes — valid CSS, safe in HTML attrs.
        // AVIF first (best compression), WebP second, original last as universal fallback.
        $sets = array();
        if ( $avif_url ) {
            $sets[] = "url('" . esc_url( $avif_url ) . "') type('image/avif')";
        }
        if ( $webp_url ) {
            $sets[] = "url('" . esc_url( $webp_url ) . "') type('image/webp')";
        }
        $sets[] = "url('" . esc_url( $url ) . "') type('" . $orig_type . "')";

        $esc_orig  = esc_url( $url );
        $image_set = 'image-set(' . implode( ', ', $sets ) . ')';

        // Dual declaration: single-quoted fallback url() first, image-set() second.
        // Single quotes avoid &quot; encoding issues inside style="" attributes.
        return "background-image: url('" . $esc_orig . "'); background-image: " . $image_set;
    }

    /**
     * Pass 3 callback: rewrite image URLs inside a data-settings JSON attribute.
     *
     * Elementor outputs: data-settings="{&quot;background_slideshow_gallery&quot;:[{...&quot;url&quot;:&quot;photo.jpg&quot;...}]}"
     * We HTML-decode → JSON-decode → walk all string values → rewrite upload URLs
     * → JSON-encode → esc_attr (re-encodes " as &quot;) → return updated attribute.
     *
     * @param array $m  [0]=full attribute, [1]=attribute value (HTML-entity encoded JSON)
     * @return string
     */
    private static function rewrite_data_settings( $m ) {
        $raw      = $m[1]; // HTML-entity-encoded JSON, e.g. {&quot;url&quot;:&quot;photo.jpg&quot;}
        $json_str = html_entity_decode( $raw, ENT_QUOTES | ENT_HTML5, 'UTF-8' );

        $data = json_decode( $json_str, true );
        if ( ! is_array( $data ) ) {
            return $m[0]; // Not valid JSON — leave untouched.
        }

        $changed = false;
        self::walk_rewrite_urls( $data, $changed );

        if ( ! $changed ) {
            return $m[0];
        }

        // wp_json_encode preserves unicode and produces clean JSON.
        // esc_attr re-encodes " → &quot; so the value is safe inside the HTML attribute.
        return 'data-settings="' . esc_attr( wp_json_encode( $data ) ) . '"';
    }

    /**
     * Recursively walk a decoded JSON structure and replace any string value
     * that is an upload image URL with the best available converted URL.
     *
     * @param array $data     Decoded JSON array (passed by reference).
     * @param bool  $changed  Set to true if any URL was rewritten (passed by reference).
     */
    private static function walk_rewrite_urls( &$data, &$changed ) {
        foreach ( $data as &$value ) {
            if ( is_array( $value ) ) {
                self::walk_rewrite_urls( $value, $changed );
            } elseif ( is_string( $value ) && preg_match( '/\.(jpe?g|png|gif)(\?.*)?$/i', $value ) ) {
                $best = self::best_url( $value );
                if ( $best && $best !== $value ) {
                    $value   = $best;
                    $changed = true;
                }
            }
        }
        unset( $value );
    }

    /**
     * Pass 4 (external CSS) callback: for a <link rel="stylesheet"> pointing to a CSS file in
     * the uploads directory, read the file, extract and rewrite only the CSS rules
     * that contain background-image declarations referencing upload images, and
     * inject a compact override <style> block immediately after the original <link>.
     *
     * The override block only contains the rules that changed — typically a handful
     * of selectors from Elementor's per-post stylesheet.  The original <link> is
     * kept so browsers still load the full stylesheet; the injected <style> (which
     * comes later in the cascade) overrides only the background-image properties.
     *
     * Results are cached per CSS file path for the duration of the request.
     *
     * @param array $m  [0]=full <link> tag, [1]=quote char, [2]=href URL
     * @return string
     */
    private static function inject_css_overrides( $m ) {
        $link_tag = $m[0];
        $href     = $m[2]; // e.g. https://example.com/wp-content/uploads/elementor/css/post-16.css?ver=123

        // Map href → filesystem path.
        $href_clean = set_url_scheme( strtok( $href, '?' ) ); // strip query string, normalise scheme
        if ( 0 !== strpos( $href_clean, self::$upload_url ) ) {
            return $link_tag; // Not an uploads-dir file — skip.
        }

        $rel_path = substr( $href_clean, strlen( self::$upload_url ) );
        $abs_path = self::$upload_dir . $rel_path;

        // Per-request cache keyed by absolute path.
        if ( array_key_exists( $abs_path, self::$css_cache ) ) {
            $override = self::$css_cache[ $abs_path ];
            return $link_tag . ( $override ? "\n" . $override : '' );
        }

        if ( ! is_readable( $abs_path ) ) {
            return self::$css_cache[ $abs_path ] = $link_tag;
        }

        $css = file_get_contents( $abs_path ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
        if ( false === $css || '' === $css ) {
            return self::$css_cache[ $abs_path ] = $link_tag;
        }

        // Rewrite every background-image: url(...) in the CSS using the same
        // rewrite_bg_url callback used for inline styles and <style> blocks.
        $rewritten = preg_replace_callback(
            '/\bbackground-image\s*:\s*url\(\s*(?:&quot;|[\'"])?([^\'"\)\s&][^\'"\)\s]*)(?:&quot;|[\'"])?\s*\)/i',
            array( __CLASS__, 'rewrite_bg_url' ),
            $css
        );

        if ( $rewritten === $css ) {
            // Nothing changed — no converted images referenced.
            self::$css_cache[ $abs_path ] = '';
            return $link_tag;
        }

        // Extract only the CSS rules (selector + declarations block) that contain
        // a background-image we rewrote.  We don't want to re-emit the whole file.
        //
        // Strategy: split on rule boundaries using a simplified CSS block parser.
        // We walk character by character tracking brace depth so we can find
        // complete rule blocks that contain our rewritten background-image.
        $override_rules = self::extract_changed_rules( $css, $rewritten );

        if ( empty( $override_rules ) ) {
            self::$css_cache[ $abs_path ] = '';
            return $link_tag;
        }

        $style_block = '<style id="pixlify-css-override-' . sanitize_html_class( $rel_path ) . '">'
            . "\n" . implode( "\n", $override_rules ) . "\n"
            . '</style>';

        self::$css_cache[ $abs_path ] = $style_block;
        return $link_tag . "\n" . $style_block;
    }

    /**
     * Given the original CSS string and the rewritten version, return only the
     * complete rule blocks (selector + braces) that differ between the two.
     *
     * Uses a character-level brace-depth scanner to correctly handle nested
     * at-rules (@media, @supports, @keyframes) by tracking outer + inner blocks.
     *
     * @param string $original
     * @param string $rewritten
     * @return string[]  Array of complete changed rule strings.
     */
    private static function extract_changed_rules( $original, $rewritten ) {
        $orig_rules     = self::split_css_rules( $original );
        $rewritten_rules = self::split_css_rules( $rewritten );

        $changed = array();
        foreach ( $rewritten_rules as $i => $rule ) {
            if ( ! isset( $orig_rules[ $i ] ) || $rule !== $orig_rules[ $i ] ) {
                $changed[] = trim( $rule );
            }
        }
        return $changed;
    }

    /**
     * Split a CSS string into top-level rule blocks.
     * Each entry is the full text of one rule: selector + { declarations }.
     * At-rules with nested blocks (e.g. @media { .sel { } }) are kept as one entry.
     *
     * @param string $css
     * @return string[]
     */
    private static function split_css_rules( $css ) {
        $rules = array();
        $len   = strlen( $css );
        $depth = 0;
        $start = 0;

        for ( $i = 0; $i < $len; $i++ ) {
            $ch = $css[ $i ];
            if ( '{' === $ch ) {
                $depth++;
            } elseif ( '}' === $ch ) {
                $depth--;
                if ( 0 === $depth ) {
                    $rules[] = substr( $css, $start, $i - $start + 1 );
                    $start   = $i + 1;
                }
            }
        }

        // Any trailing content after the last closing brace (comments, whitespace).
        $tail = trim( substr( $css, $start ) );
        if ( '' !== $tail ) {
            $rules[] = $tail;
        }

        return $rules;
    }

    /** Callback: rewrite a srcset attribute value. */
    private static function cb_rewrite_srcset( $m ) {
        return $m[1] . '=' . $m[2] . self::rewrite_srcset_string( $m[3] ) . $m[2];
    }

    /** Callback: rewrite a single-URL attribute (data-src). */
    private static function cb_rewrite_single( $m ) {
        $best = self::best_url( $m[3] ) ?: $m[3];
        return $m[1] . '=' . $m[2] . $best . $m[2];
    }

    // -------------------------------------------------------------------------
    // Shared helpers
    // -------------------------------------------------------------------------

    /**
     * Rewrite all URLs inside a srcset string.
     *
     * @param string $srcset  e.g. "photo-800.jpg 800w, photo-1600.jpg 1600w"
     * @return string
     */
    private static function rewrite_srcset_string( $srcset ) {
        $parts = array_map( 'trim', explode( ',', $srcset ) );
        foreach ( $parts as &$entry ) {
            $space = strpos( $entry, ' ' );
            if ( false === $space ) {
                $best = self::best_url( $entry );
                if ( $best ) {
                    $entry = $best;
                }
            } else {
                $url        = substr( $entry, 0, $space );
                $descriptor = substr( $entry, $space );
                $best       = self::best_url( $url );
                $entry      = ( $best ?: $url ) . $descriptor;
            }
        }
        unset( $entry );
        return implode( ', ', $parts );
    }

    /**
     * Return the best available converted URL for a given original URL,
     * or null if no conversion exists.
     * Priority: AVIF > WebP > null.
     *
     * @param string $url
     * @return string|null
     */
    private static function best_url( $url ) {
        if ( self::$serve_avif ) {
            $avif = self::get_converted_url( $url, 'avif' );
            if ( $avif ) {
                return $avif;
            }
        }
        if ( self::$serve_webp ) {
            $webp = self::get_converted_url( $url, 'webp' );
            if ( $webp ) {
                return $webp;
            }
        }
        return null;
    }

    /**
     * Return the converted URL for a specific format if the file exists on disk,
     * or null if it does not.  Results are cached per request.
     *
     * @param string $url     Original image URL (jpg/png/gif).
     * @param string $format  'avif' or 'webp'.
     * @return string|null
     */
    private static function get_converted_url( $url, $format ) {
        if ( empty( $url ) ) {
            return null;
        }

        $cache_key = $url . '|' . $format;
        if ( array_key_exists( $cache_key, self::$cache ) ) {
            return self::$cache[ $cache_key ];
        }

        // Only process image extensions we convert.
        if ( ! preg_match( '/\.(jpe?g|png|gif)(\?.*)?$/i', $url ) ) {
            return self::$cache[ $cache_key ] = null;
        }

        // Only process URLs from this site's uploads directory.
        $normalized = set_url_scheme( strtok( $url, '?' ) );
        if ( 0 !== strpos( $normalized, self::$upload_url ) ) {
            return self::$cache[ $cache_key ] = null;
        }

        // Map URL → filesystem path (strip original extension, add converted extension).
        $rel      = substr( $normalized, strlen( self::$upload_url ) );
        $abs_base = self::$upload_dir . preg_replace( '/\.(jpe?g|png|gif)$/i', '', $rel );
        $abs_conv = $abs_base . '.' . $format;

        if ( ! file_exists( $abs_conv ) ) {
            return self::$cache[ $cache_key ] = null;
        }

        $url_base = preg_replace( '/\.(jpe?g|png|gif)(\?.*)?$/i', '', $url );
        return self::$cache[ $cache_key ] = $url_base . '.' . $format;
    }
}
