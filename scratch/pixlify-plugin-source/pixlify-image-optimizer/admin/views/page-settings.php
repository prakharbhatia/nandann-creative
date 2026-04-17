<?php
/**
 * Settings view template.
 * Variables provided by Pixlify_Page_Settings::render():
 *   $s    (array — current settings)
 *   $caps (array — server capabilities)
 */
defined( 'ABSPATH' ) || exit;
// Plugin prefix: pixlify_io (10 chars — Pixlify Image Optimizer)
?>
<div class="wrap pixlify-wrap">

    <!-- Header -->
    <div class="pixlify-header">
        <div class="pixlify-header-logo">
            <span class="dashicons dashicons-admin-settings"></span>
        </div>
        <div class="pixlify-header-text">
            <h1><?php esc_html_e( 'Pixlify Settings', 'pixlify-image-optimizer' ); ?></h1>
            <p><?php esc_html_e( 'Configure compression, resizing, cron scheduling and more.', 'pixlify-image-optimizer' ); ?></p>
        </div>
    </div>

    <form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
        <?php wp_nonce_field( 'pixlify_save_settings' ); ?>
        <input type="hidden" name="action" value="pixlify_save_settings">

        <!-- ================================================================
             Output Format
        ================================================================ -->
        <div class="pixlify-card">
            <h2>
                <span class="dashicons dashicons-images-alt"></span>
                <?php esc_html_e( 'Output Format', 'pixlify-image-optimizer' ); ?>
            </h2>
            <p style="margin:0 0 16px;color:var(--px-muted);font-size:.875rem;">
                <?php esc_html_e( 'Select what format your images will be converted to. WebP is universally supported. AVIF offers better compression but requires Imagick.', 'pixlify-image-optimizer' ); ?>
            </p>
            <div class="pixlify-format-cards">
                <?php
                $pixlify_io_formats = array(
                    'webp' => array(
                        'icon'  => '🌐',
                        'name'  => 'WebP',
                        'tag'   => __( 'Best compat', 'pixlify-image-optimizer' ),
                        'cls'   => 'best',
                    ),
                    'avif' => array(
                        'icon'  => '⚡',
                        'name'  => 'AVIF',
                        'tag'   => __( 'Smallest size', 'pixlify-image-optimizer' ),
                        'cls'   => 'new',
                    ),
                    'both' => array(
                        'icon'  => '🔀',
                        'name'  => __( 'Both', 'pixlify-image-optimizer' ),
                        'tag'   => 'WebP + AVIF',
                        'cls'   => 'both',
                    ),
                );
                foreach ( $pixlify_io_formats as $pixlify_io_fmt_key => $pixlify_io_fmt ) :
                    $pixlify_io_fmt_supported = ( 'webp' === $pixlify_io_fmt_key )
                        || ( 'avif' === $pixlify_io_fmt_key && ! empty( $caps['avif'] ) )
                        || ( 'both' === $pixlify_io_fmt_key && ! empty( $caps['webp'] ) );
                    $pixlify_io_tag_cls = $pixlify_io_fmt_supported
                        ? 'pixlify-format-tag pixlify-format-tag--' . $pixlify_io_fmt['cls']
                        : 'pixlify-format-tag pixlify-format-tag--no';
                    $pixlify_io_tag_label = $pixlify_io_fmt_supported
                        ? $pixlify_io_fmt['tag']
                        : __( 'Not available', 'pixlify-image-optimizer' );
                ?>
                <div class="pixlify-format-card">
                    <input type="radio"
                           id="pixlify-fmt-<?php echo esc_attr( $pixlify_io_fmt_key ); ?>"
                           name="pixlify[output_format]"
                           value="<?php echo esc_attr( $pixlify_io_fmt_key ); ?>"
                           <?php checked( $s['output_format'], $pixlify_io_fmt_key ); ?>
                           <?php disabled( $pixlify_io_fmt_supported, false ); ?>>
                    <label for="pixlify-fmt-<?php echo esc_attr( $pixlify_io_fmt_key ); ?>" class="pixlify-format-card-inner">
                        <span class="pixlify-format-icon"><?php echo esc_html( $pixlify_io_fmt['icon'] ); ?></span>
                        <span class="pixlify-format-name"><?php echo esc_html( $pixlify_io_fmt['name'] ); ?></span>
                        <span class="<?php echo esc_attr( $pixlify_io_tag_cls ); ?>"><?php echo esc_html( $pixlify_io_tag_label ); ?></span>
                    </label>
                </div>
                <?php endforeach; ?>
            </div>
        </div>

        <!-- ================================================================
             Compression
        ================================================================ -->
        <div class="pixlify-card">
            <h2>
                <span class="dashicons dashicons-editor-contract"></span>
                <?php esc_html_e( 'Compression', 'pixlify-image-optimizer' ); ?>
            </h2>
            <table class="form-table">

                <tr>
                    <th scope="row"><?php esc_html_e( 'Compression Type', 'pixlify-image-optimizer' ); ?></th>
                    <td>
                        <div style="display:flex;gap:16px;flex-wrap:wrap;">
                            <label style="display:flex;align-items:center;gap:8px;cursor:pointer;">
                                <input type="radio" name="pixlify[compression_type]" value="lossy"
                                       <?php checked( $s['compression_type'], 'lossy' ); ?>>
                                <span>
                                    <strong><?php esc_html_e( 'Lossy', 'pixlify-image-optimizer' ); ?></strong><br>
                                    <small style="color:var(--px-muted);"><?php esc_html_e( 'Smaller files, barely visible difference', 'pixlify-image-optimizer' ); ?></small>
                                </span>
                            </label>
                            <label style="display:flex;align-items:center;gap:8px;cursor:pointer;">
                                <input type="radio" name="pixlify[compression_type]" value="lossless"
                                       <?php checked( $s['compression_type'], 'lossless' ); ?>>
                                <span>
                                    <strong><?php esc_html_e( 'Lossless', 'pixlify-image-optimizer' ); ?></strong><br>
                                    <small style="color:var(--px-muted);"><?php esc_html_e( 'Pixel-perfect quality, larger files', 'pixlify-image-optimizer' ); ?></small>
                                </span>
                            </label>
                        </div>
                    </td>
                </tr>

                <tr>
                    <th scope="row">
                        <label for="pixlify-quality-range">
                            <?php esc_html_e( 'Quality (Lossy)', 'pixlify-image-optimizer' ); ?>
                        </label>
                    </th>
                    <td>
                        <div class="pixlify-quality-wrap">
                            <span style="font-size:.8rem;color:var(--px-muted);">1</span>
                            <input type="range" name="pixlify[quality]" id="pixlify-quality-range"
                                   min="1" max="100" value="<?php echo (int) $s['quality']; ?>">
                            <span style="font-size:.8rem;color:var(--px-muted);">100</span>
                            <span class="pixlify-quality-badge" id="pixlify-quality-val"><?php echo (int) $s['quality']; ?>%</span>
                        </div>
                        <p class="description"><?php esc_html_e( '80–85 is the sweet spot. Only applies to lossy mode.', 'pixlify-image-optimizer' ); ?></p>
                    </td>
                </tr>

            </table>
        </div>

        <!-- ================================================================
             Upload & Files
        ================================================================ -->
        <div class="pixlify-card">
            <h2>
                <span class="dashicons dashicons-upload"></span>
                <?php esc_html_e( 'Upload & Files', 'pixlify-image-optimizer' ); ?>
            </h2>
            <table class="form-table">

                <tr>
                    <th scope="row"><?php esc_html_e( 'Convert on Upload', 'pixlify-image-optimizer' ); ?></th>
                    <td>
                        <div class="pixlify-toggle-wrap">
                            <label class="pixlify-toggle">
                                <input type="checkbox" name="pixlify[convert_on_upload]" value="1"
                                       <?php checked( $s['convert_on_upload'] ); ?>>
                                <span class="pixlify-toggle-slider"></span>
                            </label>
                            <label class="pixlify-toggle-label">
                                <span class="pixlify-toggle-title"><?php esc_html_e( 'Auto-convert new uploads', 'pixlify-image-optimizer' ); ?></span>
                                <span class="pixlify-toggle-desc"><?php esc_html_e( 'Images are converted immediately when added to the Media Library.', 'pixlify-image-optimizer' ); ?></span>
                            </label>
                        </div>
                    </td>
                </tr>

                <tr>
                    <th scope="row"><?php esc_html_e( 'Convert Thumbnails', 'pixlify-image-optimizer' ); ?></th>
                    <td>
                        <div class="pixlify-toggle-wrap">
                            <label class="pixlify-toggle">
                                <input type="checkbox" name="pixlify[convert_thumbnails]" value="1"
                                       <?php checked( $s['convert_thumbnails'] ); ?>>
                                <span class="pixlify-toggle-slider"></span>
                            </label>
                            <label class="pixlify-toggle-label">
                                <span class="pixlify-toggle-title"><?php esc_html_e( 'Include all thumbnail sizes', 'pixlify-image-optimizer' ); ?></span>
                                <span class="pixlify-toggle-desc"><?php esc_html_e( 'Also convert every registered thumbnail size, not just the original file.', 'pixlify-image-optimizer' ); ?></span>
                            </label>
                        </div>
                    </td>
                </tr>

                <tr>
                    <th scope="row"><?php esc_html_e( 'Keep Original Files', 'pixlify-image-optimizer' ); ?></th>
                    <td>
                        <div class="pixlify-toggle-wrap">
                            <label class="pixlify-toggle">
                                <input type="checkbox" name="pixlify[keep_original]" value="1"
                                       <?php checked( $s['keep_original'] ); ?>>
                                <span class="pixlify-toggle-slider"></span>
                            </label>
                            <label class="pixlify-toggle-label">
                                <span class="pixlify-toggle-title"><?php esc_html_e( 'Keep JPEG/PNG alongside converted file', 'pixlify-image-optimizer' ); ?></span>
                                <span class="pixlify-toggle-desc"><?php esc_html_e( 'Recommended. Allows fallback for browsers that don\'t support the new format.', 'pixlify-image-optimizer' ); ?></span>
                            </label>
                        </div>
                    </td>
                </tr>

                <tr>
                    <th scope="row"><?php esc_html_e( 'Backup Originals', 'pixlify-image-optimizer' ); ?></th>
                    <td>
                        <div class="pixlify-toggle-wrap">
                            <label class="pixlify-toggle">
                                <input type="checkbox" name="pixlify[backup_original]" value="1"
                                       <?php checked( $s['backup_original'] ); ?>>
                                <span class="pixlify-toggle-slider"></span>
                            </label>
                            <label class="pixlify-toggle-label">
                                <span class="pixlify-toggle-title"><?php esc_html_e( 'Backup before converting', 'pixlify-image-optimizer' ); ?></span>
                                <span class="pixlify-toggle-desc"><?php esc_html_e( 'Saves a copy to /uploads/pixlify-backups/ — enables one-click restore from the Media Library.', 'pixlify-image-optimizer' ); ?></span>
                            </label>
                        </div>
                    </td>
                </tr>

            </table>
        </div>

        <!-- ================================================================
             WebP Serving (URL Rewriter)
        ================================================================ -->
        <div class="pixlify-card">
            <h2>
                <span class="dashicons dashicons-shield-alt"></span>
                <?php esc_html_e( 'Serve WebP / AVIF to Browsers', 'pixlify-image-optimizer' ); ?>
            </h2>
            <p style="margin:0 0 16px;color:var(--px-muted);font-size:.875rem;">
                <?php esc_html_e( 'Automatically serve .webp (or .avif) to browsers that support it — without changing any URLs in your content. Works on all hosts including WP Engine, Kinsta, Cloudways and any nginx server.', 'pixlify-image-optimizer' ); ?>
            </p>

            <?php
            // ---- Rewriter status diagnostic ----
            $pixlify_io_upload   = wp_upload_dir();
            $pixlify_io_base_dir = trailingslashit( $pixlify_io_upload['basedir'] );
            $pixlify_io_webp_ok  = ! empty( $s['webp_redirect'] );
            $pixlify_io_avif_ok  = ! empty( $s['avif_redirect'] );

            // Count converted files in the uploads directory (check subdirs one level deep).
            $pixlify_io_webp_files = array_merge(
                (array) glob( $pixlify_io_base_dir . '*.webp' ),
                (array) glob( $pixlify_io_base_dir . '*/*.webp' ),
                (array) glob( $pixlify_io_base_dir . '*/*/*.webp' )
            );
            $pixlify_io_avif_files = array_merge(
                (array) glob( $pixlify_io_base_dir . '*.avif' ),
                (array) glob( $pixlify_io_base_dir . '*/*.avif' ),
                (array) glob( $pixlify_io_base_dir . '*/*/*.avif' )
            );
            $pixlify_io_webp_count = count( array_filter( $pixlify_io_webp_files ) );
            $pixlify_io_avif_count = count( array_filter( $pixlify_io_avif_files ) );
            $pixlify_io_any_active = ( $pixlify_io_webp_ok && $pixlify_io_webp_count > 0 )
                                  || ( $pixlify_io_avif_ok && $pixlify_io_avif_count > 0 );

            // Sample file for display.
            $pixlify_io_sample = '';
            if ( $pixlify_io_avif_count > 0 ) {
                $pixlify_io_sample = basename( reset( $pixlify_io_avif_files ) );
            } elseif ( $pixlify_io_webp_count > 0 ) {
                $pixlify_io_sample = basename( reset( $pixlify_io_webp_files ) );
            }
            ?>

            <div class="pixlify-rewriter-status" style="background:var(--px-bg);border:1px solid var(--px-border);border-radius:var(--px-radius-sm);padding:12px 16px;margin-bottom:16px;font-size:.82rem;">
                <strong style="display:block;margin-bottom:8px;font-size:.85rem;">
                    <span class="dashicons dashicons-info" style="vertical-align:middle;margin-top:-2px;margin-right:4px;color:var(--px-primary);"></span>
                    <?php esc_html_e( 'Rewriter Status', 'pixlify-image-optimizer' ); ?>
                </strong>
                <table style="border-collapse:collapse;width:100%;">
                    <tr>
                        <td style="padding:3px 12px 3px 0;color:var(--px-muted);white-space:nowrap;"><?php esc_html_e( 'Serve WebP enabled:', 'pixlify-image-optimizer' ); ?></td>
                        <td><?php echo $pixlify_io_webp_ok
                            ? '<span style="color:var(--px-success);">✓ ' . esc_html__( 'Yes', 'pixlify-image-optimizer' ) . ( 0 === $pixlify_io_webp_count ? ' <em style="color:var(--px-warning);">— but no .webp files found</em>' : ' (' . absint( $pixlify_io_webp_count ) . ' files)' ) . '</span>'
                            : '<span style="color:var(--px-muted);">— ' . esc_html__( 'Off', 'pixlify-image-optimizer' ) . '</span>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                        ?></td>
                    </tr>
                    <tr>
                        <td style="padding:3px 12px 3px 0;color:var(--px-muted);white-space:nowrap;"><?php esc_html_e( 'Serve AVIF enabled:', 'pixlify-image-optimizer' ); ?></td>
                        <td><?php echo $pixlify_io_avif_ok
                            ? '<span style="color:var(--px-success);">✓ ' . esc_html__( 'Yes', 'pixlify-image-optimizer' ) . ( 0 === $pixlify_io_avif_count ? ' <em style="color:var(--px-warning);">— but no .avif files found</em>' : ' (' . absint( $pixlify_io_avif_count ) . ' files)' ) . '</span>'
                            : '<span style="color:var(--px-muted);">— ' . esc_html__( 'Off', 'pixlify-image-optimizer' ) . '</span>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                        ?></td>
                    </tr>
                    <?php if ( $pixlify_io_sample ) : ?>
                    <tr>
                        <td style="padding:3px 12px 3px 0;color:var(--px-muted);white-space:nowrap;"><?php esc_html_e( 'Sample file:', 'pixlify-image-optimizer' ); ?></td>
                        <td style="color:var(--px-success);">✓ <?php echo esc_html( $pixlify_io_sample ); ?></td>
                    </tr>
                    <?php endif; ?>
                    <tr>
                        <td style="padding:3px 12px 3px 0;color:var(--px-muted);white-space:nowrap;"><?php esc_html_e( 'Server type:', 'pixlify-image-optimizer' ); ?></td>
                        <td style="color:var(--px-muted);"><?php echo esc_html( isset( $_SERVER['SERVER_SOFTWARE'] ) ? substr( sanitize_text_field( wp_unslash( $_SERVER['SERVER_SOFTWARE'] ) ), 0, 60 ) : 'Unknown' ); ?></td>
                    </tr>
                    <tr>
                        <td style="padding:3px 12px 3px 0;color:var(--px-muted);white-space:nowrap;"><?php esc_html_e( 'Method:', 'pixlify-image-optimizer' ); ?></td>
                        <td style="color:var(--px-success);">✓ <?php esc_html_e( 'WordPress URL rewriter (works on all hosts)', 'pixlify-image-optimizer' ); ?></td>
                    </tr>
                </table>
                <?php if ( ! $pixlify_io_webp_count && ! $pixlify_io_avif_count ) : ?>
                <p style="margin:8px 0 0;color:var(--px-danger);font-size:.8rem;">
                    <span class="dashicons dashicons-warning" style="vertical-align:middle;margin-top:-2px;font-size:1rem;"></span>
                    <?php esc_html_e( 'No converted files found. Run the Bulk Optimizer first to create .webp or .avif files.', 'pixlify-image-optimizer' ); ?>
                </p>
                <?php elseif ( $pixlify_io_any_active ) : ?>
                <p style="margin:8px 0 0;color:var(--px-warning);font-size:.8rem;">
                    <span class="dashicons dashicons-warning" style="vertical-align:middle;margin-top:-2px;font-size:1rem;"></span>
                    <?php esc_html_e( 'On WP Engine: purge page cache after saving so browsers receive the rewritten URLs (WP Engine Dashboard → Caching → Purge All).', 'pixlify-image-optimizer' ); ?>
                </p>
                <?php endif; ?>
            </div>

            <table class="form-table">

                <tr>
                    <th scope="row"><?php esc_html_e( 'Serve WebP to Browsers', 'pixlify-image-optimizer' ); ?></th>
                    <td>
                        <div class="pixlify-toggle-wrap">
                            <label class="pixlify-toggle">
                                <input type="checkbox" name="pixlify[webp_redirect]" value="1"
                                       id="pixlify-webp-redirect" <?php checked( $s['webp_redirect'] ); ?>>
                                <span class="pixlify-toggle-slider"></span>
                            </label>
                            <label class="pixlify-toggle-label" for="pixlify-webp-redirect">
                                <span class="pixlify-toggle-title"><?php esc_html_e( 'Rewrite image URLs to .webp for browsers that support it', 'pixlify-image-optimizer' ); ?></span>
                                <span class="pixlify-toggle-desc"><?php esc_html_e( 'Works on WP Engine, Kinsta, nginx and Apache. No .htaccess changes needed.', 'pixlify-image-optimizer' ); ?></span>
                            </label>
                        </div>
                    </td>
                </tr>

                <tr>
                    <th scope="row"><?php esc_html_e( 'Also Serve AVIF', 'pixlify-image-optimizer' ); ?></th>
                    <td>
                        <div class="pixlify-toggle-wrap">
                            <label class="pixlify-toggle">
                                <input type="checkbox" name="pixlify[avif_redirect]" value="1"
                                       <?php checked( $s['avif_redirect'] ); ?>
                                       <?php disabled( empty( $caps['avif'] ) ); ?>>
                                <span class="pixlify-toggle-slider"></span>
                            </label>
                            <label class="pixlify-toggle-label">
                                <span class="pixlify-toggle-title"><?php esc_html_e( 'Serve .avif to browsers that support it (takes priority over WebP)', 'pixlify-image-optimizer' ); ?></span>
                                <span class="pixlify-toggle-desc">
                                    <?php if ( empty( $caps['avif'] ) ) : ?>
                                        <span style="color:var(--px-warning);"><?php esc_html_e( 'Requires Imagick with libavif. Not available on this server.', 'pixlify-image-optimizer' ); ?></span>
                                    <?php else : ?>
                                        <?php esc_html_e( 'AVIF is smaller than WebP. Only enable if you converted images to AVIF format.', 'pixlify-image-optimizer' ); ?>
                                    <?php endif; ?>
                                </span>
                            </label>
                        </div>
                    </td>
                </tr>

                <tr>
                    <th scope="row"><?php esc_html_e( 'JS Background Rewriter', 'pixlify-image-optimizer' ); ?></th>
                    <td>
                        <div class="pixlify-toggle-wrap">
                            <label class="pixlify-toggle">
                                <input type="checkbox" name="pixlify[js_bg_rewrite]" value="1"
                                       <?php checked( $s['js_bg_rewrite'] ); ?>>
                                <span class="pixlify-toggle-slider"></span>
                            </label>
                            <label class="pixlify-toggle-label">
                                <span class="pixlify-toggle-title"><?php esc_html_e( 'Intercept JS-set background images', 'pixlify-image-optimizer' ); ?></span>
                                <span class="pixlify-toggle-desc"><?php esc_html_e( 'Rewrites background-image URLs set dynamically by JavaScript (e.g. Elementor Background Slideshow). Uses a MutationObserver + HEAD request per unique image to serve AVIF/WebP. Results are cached in sessionStorage.', 'pixlify-image-optimizer' ); ?></span>
                            </label>
                        </div>
                    </td>
                </tr>

            </table>
        </div>

        <!-- ================================================================
             Resizing
        ================================================================ -->
        <div class="pixlify-card">
            <h2>
                <span class="dashicons dashicons-image-crop"></span>
                <?php esc_html_e( 'Image Resizing', 'pixlify-image-optimizer' ); ?>
            </h2>
            <table class="form-table">

                <tr>
                    <th scope="row"><?php esc_html_e( 'Enable Resizing', 'pixlify-image-optimizer' ); ?></th>
                    <td>
                        <div class="pixlify-toggle-wrap">
                            <label class="pixlify-toggle">
                                <input type="checkbox" name="pixlify[resize_enabled]" value="1"
                                       id="pixlify-resize-enabled" <?php checked( $s['resize_enabled'] ); ?>>
                                <span class="pixlify-toggle-slider"></span>
                            </label>
                            <label class="pixlify-toggle-label">
                                <span class="pixlify-toggle-title"><?php esc_html_e( 'Downscale oversized images', 'pixlify-image-optimizer' ); ?></span>
                                <span class="pixlify-toggle-desc"><?php esc_html_e( 'Images exceeding max dimensions will be proportionally scaled down.', 'pixlify-image-optimizer' ); ?></span>
                            </label>
                        </div>
                    </td>
                </tr>

                <?php $pixlify_io_resize_style = $s['resize_enabled'] ? '' : 'display:none;'; ?>
                <tr class="pixlify-resize-row" style="<?php echo esc_attr( $pixlify_io_resize_style ); ?>">
                    <th scope="row"><?php esc_html_e( 'Maximum Width', 'pixlify-image-optimizer' ); ?></th>
                    <td>
                        <input type="number" name="pixlify[max_width]" value="<?php echo (int) $s['max_width']; ?>"
                               min="100" max="9999" class="small-text"> px
                        <p class="description"><?php esc_html_e( 'Images wider than this will be scaled down proportionally. Set 0 to disable.', 'pixlify-image-optimizer' ); ?></p>
                    </td>
                </tr>

                <tr class="pixlify-resize-row" style="<?php echo esc_attr( $pixlify_io_resize_style ); ?>">
                    <th scope="row"><?php esc_html_e( 'Maximum Height', 'pixlify-image-optimizer' ); ?></th>
                    <td>
                        <input type="number" name="pixlify[max_height]" value="<?php echo (int) $s['max_height']; ?>"
                               min="100" max="9999" class="small-text"> px
                        <p class="description"><?php esc_html_e( 'Images taller than this will be scaled down proportionally. Set 0 to disable.', 'pixlify-image-optimizer' ); ?></p>
                    </td>
                </tr>

            </table>
        </div>

        <!-- ================================================================
             Batch Processing & Cron
        ================================================================ -->
        <div class="pixlify-card">
            <h2>
                <span class="dashicons dashicons-backup"></span>
                <?php esc_html_e( 'Batch Processing & Cron', 'pixlify-image-optimizer' ); ?>
            </h2>
            <table class="form-table">

                <tr>
                    <th scope="row"><?php esc_html_e( 'Enable Cron', 'pixlify-image-optimizer' ); ?></th>
                    <td>
                        <div class="pixlify-toggle-wrap">
                            <label class="pixlify-toggle">
                                <input type="checkbox" name="pixlify[cron_enabled]" value="1"
                                       <?php checked( $s['cron_enabled'] ); ?>>
                                <span class="pixlify-toggle-slider"></span>
                            </label>
                            <label class="pixlify-toggle-label">
                                <span class="pixlify-toggle-title"><?php esc_html_e( 'Run batches automatically in background', 'pixlify-image-optimizer' ); ?></span>
                                <span class="pixlify-toggle-desc"><?php esc_html_e( 'Recommended for large libraries. No manual action needed.', 'pixlify-image-optimizer' ); ?></span>
                            </label>
                        </div>
                    </td>
                </tr>

                <tr>
                    <th scope="row"><label for="pixlify-cron-interval"><?php esc_html_e( 'Cron Frequency', 'pixlify-image-optimizer' ); ?></label></th>
                    <td>
                        <select name="pixlify[cron_interval]" id="pixlify-cron-interval">
                            <?php
                            $pixlify_io_intervals = array(
                                'hourly'     => __( 'Hourly', 'pixlify-image-optimizer' ),
                                'twicedaily' => __( 'Twice Daily', 'pixlify-image-optimizer' ),
                                'daily'      => __( 'Daily', 'pixlify-image-optimizer' ),
                            );
                            foreach ( $pixlify_io_intervals as $pixlify_io_val => $pixlify_io_label ) :
                            ?>
                            <option value="<?php echo esc_attr( $pixlify_io_val ); ?>"
                                    <?php selected( $s['cron_interval'], $pixlify_io_val ); ?>>
                                <?php echo esc_html( $pixlify_io_label ); ?>
                            </option>
                            <?php endforeach; ?>
                        </select>
                    </td>
                </tr>

                <tr>
                    <th scope="row"><label for="pixlify-batch-size"><?php esc_html_e( 'Batch Size', 'pixlify-image-optimizer' ); ?></label></th>
                    <td>
                        <input type="number" name="pixlify[batch_size]" id="pixlify-batch-size"
                               value="<?php echo (int) $s['batch_size']; ?>"
                               min="1" max="100" class="small-text">
                        <p class="description"><?php esc_html_e( 'Images per cron run. Keep this low on shared/managed hosting (WP Engine, Kinsta, etc.) to avoid PHP timeout errors. Recommended: 3–10.', 'pixlify-image-optimizer' ); ?></p>
                    </td>
                </tr>

                <tr>
                    <th scope="row"><?php esc_html_e( 'Skip Already Converted', 'pixlify-image-optimizer' ); ?></th>
                    <td>
                        <div class="pixlify-toggle-wrap">
                            <label class="pixlify-toggle">
                                <input type="checkbox" name="pixlify[skip_converted]" value="1"
                                       <?php checked( $s['skip_converted'] ); ?>>
                                <span class="pixlify-toggle-slider"></span>
                            </label>
                            <label class="pixlify-toggle-label">
                                <span class="pixlify-toggle-title"><?php esc_html_e( 'Skip already-converted images', 'pixlify-image-optimizer' ); ?></span>
                                <span class="pixlify-toggle-desc"><?php esc_html_e( 'Images with a successful conversion record will not be re-queued.', 'pixlify-image-optimizer' ); ?></span>
                            </label>
                        </div>
                    </td>
                </tr>

            </table>
        </div>

        <!-- ================================================================
             Duplicate Detection
        ================================================================ -->
        <div class="pixlify-card">
            <h2>
                <span class="dashicons dashicons-search"></span>
                <?php esc_html_e( 'Duplicate & Unused Detection', 'pixlify-image-optimizer' ); ?>
            </h2>
            <table class="form-table">

                <tr>
                    <th scope="row"><?php esc_html_e( 'Hash-Based Duplicate Check', 'pixlify-image-optimizer' ); ?></th>
                    <td>
                        <div class="pixlify-toggle-wrap">
                            <label class="pixlify-toggle">
                                <input type="checkbox" name="pixlify[duplicate_check_hash]" value="1"
                                       <?php checked( $s['duplicate_check_hash'] ); ?>>
                                <span class="pixlify-toggle-slider"></span>
                            </label>
                            <label class="pixlify-toggle-label">
                                <span class="pixlify-toggle-title"><?php esc_html_e( 'Compare file content via MD5 hash', 'pixlify-image-optimizer' ); ?></span>
                                <span class="pixlify-toggle-desc"><?php esc_html_e( 'Detects identical images even when filenames differ.', 'pixlify-image-optimizer' ); ?></span>
                            </label>
                        </div>
                    </td>
                </tr>

                <tr>
                    <th scope="row"><label for="pixlify-unused-days"><?php esc_html_e( 'Stale Image Threshold', 'pixlify-image-optimizer' ); ?></label></th>
                    <td>
                        <input type="number" name="pixlify[unused_days]" id="pixlify-unused-days"
                               value="<?php echo (int) $s['unused_days']; ?>"
                               min="1" class="small-text"> <?php esc_html_e( 'days', 'pixlify-image-optimizer' ); ?>
                        <p class="description"><?php esc_html_e( 'Images uploaded more than this many days ago and never referenced in content are flagged as stale.', 'pixlify-image-optimizer' ); ?></p>
                    </td>
                </tr>

            </table>
        </div>

        <!-- ================================================================
             Miscellaneous
        ================================================================ -->
        <div class="pixlify-card">
            <h2>
                <span class="dashicons dashicons-admin-generic"></span>
                <?php esc_html_e( 'Miscellaneous', 'pixlify-image-optimizer' ); ?>
            </h2>
            <table class="form-table">
                <tr>
                    <th scope="row"><?php esc_html_e( 'Delete Data on Uninstall', 'pixlify-image-optimizer' ); ?></th>
                    <td>
                        <div class="pixlify-toggle-wrap">
                            <label class="pixlify-toggle">
                                <input type="checkbox" name="pixlify[delete_data_on_uninstall]" value="1"
                                       <?php checked( $s['delete_data_on_uninstall'] ); ?>>
                                <span class="pixlify-toggle-slider"></span>
                            </label>
                            <label class="pixlify-toggle-label">
                                <span class="pixlify-toggle-title"><?php esc_html_e( 'Remove all data when plugin is deleted', 'pixlify-image-optimizer' ); ?></span>
                                <span class="pixlify-toggle-desc"><?php esc_html_e( 'Deletes all plugin settings and database records on uninstall.', 'pixlify-image-optimizer' ); ?></span>
                            </label>
                        </div>
                    </td>
                </tr>
            </table>
        </div>

        <div style="margin-top:24px;">
            <?php submit_button( __( 'Save Settings', 'pixlify-image-optimizer' ) ); ?>
        </div>
    </form>
</div>
