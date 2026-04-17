<?php
/**
 * Dashboard view template.
 * Variables provided by Pixlify_Page_Dashboard::render():
 *   $settings, $caps, $stats, $total_images, $converted_count, $pending_count, $next_cron
 */
defined( 'ABSPATH' ) || exit;
// Plugin prefix: pixlify_io (10 chars — Pixlify Image Optimizer)

$pixlify_io_pct        = $total_images > 0 ? (int) round( ( $converted_count / $total_images ) * 100 ) : 0;
$pixlify_io_circumf    = 2 * M_PI * 44; // radius = 44, SVG viewBox 100x100
$pixlify_io_dash_off   = $pixlify_io_circumf - ( $pixlify_io_circumf * $pixlify_io_pct / 100 );
$pixlify_io_ring_cls   = $pixlify_io_pct >= 100 ? 'pixlify-ring-fill pixlify-ring-fill--success' : 'pixlify-ring-fill';
$pixlify_io_redirect   = ! empty( $settings['webp_redirect'] );
?>
<div class="wrap pixlify-wrap">

    <!-- Header -->
    <div class="pixlify-header">
        <div class="pixlify-header-logo">
            <span class="dashicons dashicons-images-alt2"></span>
        </div>
        <div class="pixlify-header-text">
            <h1><?php esc_html_e( 'Pixlify Image Optimizer', 'pixlify-image-optimizer' ); ?></h1>
            <p><?php esc_html_e( '100% free · No API keys · No quotas · Runs on your server', 'pixlify-image-optimizer' ); ?></p>
        </div>
    </div>

    <?php if ( ! $caps['webp'] && ! $caps['avif'] ) : ?>
    <div class="pixlify-alert pixlify-alert--error">
        <span class="dashicons dashicons-warning"></span>
        <span><?php esc_html_e( 'Neither GD nor Imagick support WebP/AVIF on this server. Please enable Imagick or compile PHP GD with WebP support.', 'pixlify-image-optimizer' ); ?></span>
    </div>
    <?php endif; ?>

    <!-- Stat Cards -->
    <div class="pixlify-stat-cards">
        <div class="pixlify-stat-card">
            <div class="pixlify-stat-icon pixlify-stat-icon--total">
                <span class="dashicons dashicons-format-gallery"></span>
            </div>
            <div class="pixlify-stat-body">
                <span class="pixlify-stat-number"><?php echo esc_html( number_format_i18n( $total_images ) ); ?></span>
                <span class="pixlify-stat-label"><?php esc_html_e( 'Total Images', 'pixlify-image-optimizer' ); ?></span>
            </div>
        </div>
        <div class="pixlify-stat-card">
            <div class="pixlify-stat-icon pixlify-stat-icon--success">
                <span class="dashicons dashicons-yes-alt"></span>
            </div>
            <div class="pixlify-stat-body">
                <span class="pixlify-stat-number"><?php echo esc_html( number_format_i18n( $converted_count ) ); ?></span>
                <span class="pixlify-stat-label"><?php esc_html_e( 'Optimized', 'pixlify-image-optimizer' ); ?></span>
            </div>
        </div>
        <div class="pixlify-stat-card">
            <div class="pixlify-stat-icon pixlify-stat-icon--warning">
                <span class="dashicons dashicons-clock"></span>
            </div>
            <div class="pixlify-stat-body">
                <span class="pixlify-stat-number"><?php echo esc_html( number_format_i18n( $pending_count ) ); ?></span>
                <span class="pixlify-stat-label"><?php esc_html_e( 'Pending', 'pixlify-image-optimizer' ); ?></span>
            </div>
        </div>
        <div class="pixlify-stat-card">
            <div class="pixlify-stat-icon pixlify-stat-icon--saved">
                <span class="dashicons dashicons-chart-area"></span>
            </div>
            <div class="pixlify-stat-body">
                <span class="pixlify-stat-number"><?php echo esc_html( size_format( $stats['total_saved_bytes'] ) ); ?></span>
                <span class="pixlify-stat-label"><?php esc_html_e( 'Space Saved', 'pixlify-image-optimizer' ); ?></span>
            </div>
        </div>
    </div>

    <div class="pixlify-dashboard-grid">

        <!-- Left column: progress ring + capabilities -->
        <div style="display:flex;flex-direction:column;gap:0;">

            <!-- Optimization Progress -->
            <div class="pixlify-card">
                <h2>
                    <span class="dashicons dashicons-performance"></span>
                    <?php esc_html_e( 'Optimization Progress', 'pixlify-image-optimizer' ); ?>
                </h2>
                <div class="pixlify-ring-wrap">
                    <svg class="pixlify-ring" width="88" height="88" viewBox="0 0 100 100" aria-hidden="true">
                        <circle class="pixlify-ring-bg"   cx="50" cy="50" r="44"/>
                        <circle class="<?php echo esc_attr( $pixlify_io_ring_cls ); ?>" cx="50" cy="50" r="44"
                            stroke-dasharray="<?php echo esc_attr( number_format( $pixlify_io_circumf, 2, '.', '' ) ); ?>"
                            stroke-dashoffset="<?php echo esc_attr( number_format( $pixlify_io_dash_off, 2, '.', '' ) ); ?>"/>
                    </svg>
                    <div class="pixlify-ring-label">
                        <span class="pixlify-ring-pct"><?php echo (int) $pixlify_io_pct; ?>%</span>
                        <span class="pixlify-ring-sub">
                            <?php
                            printf(
                                /* translators: 1: converted count, 2: total count */
                                esc_html__( '%1$s of %2$s images optimized', 'pixlify-image-optimizer' ),
                                '<strong>' . esc_html( number_format_i18n( $converted_count ) ) . '</strong>',
                                esc_html( number_format_i18n( $total_images ) )
                            );
                            ?>
                        </span>
                        <?php if ( $pending_count > 0 ) : ?>
                        <div style="margin-top:10px;">
                            <a href="<?php echo esc_url( admin_url( 'admin.php?page=pixlify-bulk' ) ); ?>" class="button pixlify-btn-primary">
                                <?php esc_html_e( 'Optimize Now →', 'pixlify-image-optimizer' ); ?>
                            </a>
                        </div>
                        <?php else : ?>
                        <span class="pixlify-badge pixlify-badge--success" style="margin-top:8px;">
                            ✓ <?php esc_html_e( 'All done!', 'pixlify-image-optimizer' ); ?>
                        </span>
                        <?php endif; ?>
                    </div>
                </div>
            </div>

            <!-- Server Capabilities -->
            <div class="pixlify-card">
                <h2>
                    <span class="dashicons dashicons-admin-tools"></span>
                    <?php esc_html_e( 'Server Capabilities', 'pixlify-image-optimizer' ); ?>
                </h2>
                <div class="pixlify-cap-pills">
                    <?php
                    $pixlify_io_cap_list = array(
                        'GD'    => $caps['gd'],
                        'Imagick' => $caps['imagick'],
                        'WebP'  => $caps['webp'],
                        'AVIF'  => $caps['avif'],
                    );
                    foreach ( $pixlify_io_cap_list as $pixlify_io_cap_name => $pixlify_io_cap_ok ) :
                        $pixlify_io_pill_cls = $pixlify_io_cap_ok ? 'pixlify-cap-pill--ok' : 'pixlify-cap-pill--no';
                        $pixlify_io_icon     = $pixlify_io_cap_ok ? '✓' : '✗';
                    ?>
                    <span class="pixlify-cap-pill <?php echo esc_attr( $pixlify_io_pill_cls ); ?>">
                        <?php echo esc_html( $pixlify_io_icon . ' ' . $pixlify_io_cap_name ); ?>
                    </span>
                    <?php endforeach; ?>
                </div>

                <!-- WebP redirect status -->
                <div class="pixlify-redirect-status <?php echo $pixlify_io_redirect ? 'pixlify-redirect-status--on' : 'pixlify-redirect-status--off'; ?>" style="margin-top:14px;">
                    <span class="dashicons <?php echo $pixlify_io_redirect ? 'dashicons-shield-alt' : 'dashicons-minus'; ?>"></span>
                    <?php if ( $pixlify_io_redirect ) : ?>
                        <?php esc_html_e( 'WebP redirect active — browsers receive .webp automatically', 'pixlify-image-optimizer' ); ?>
                    <?php else : ?>
                        <?php esc_html_e( 'WebP redirect inactive — enable in Settings for automatic serving', 'pixlify-image-optimizer' ); ?>
                    <?php endif; ?>
                </div>
            </div>

        </div>

        <!-- Right column: active settings + quick actions -->
        <div class="pixlify-card" style="display:flex;flex-direction:column;">
            <h2>
                <span class="dashicons dashicons-admin-settings"></span>
                <?php esc_html_e( 'Active Configuration', 'pixlify-image-optimizer' ); ?>
            </h2>

            <dl class="pixlify-summary-list">
                <div class="pixlify-summary-row">
                    <dt><?php esc_html_e( 'Output Format', 'pixlify-image-optimizer' ); ?></dt>
                    <dd><span class="pixlify-badge pixlify-badge--info"><?php echo esc_html( strtoupper( $settings['output_format'] ) ); ?></span></dd>
                </div>
                <div class="pixlify-summary-row">
                    <dt><?php esc_html_e( 'Compression', 'pixlify-image-optimizer' ); ?></dt>
                    <dd>
                        <?php
                        printf(
                            '%s — %d%%',
                            esc_html( ucfirst( $settings['compression_type'] ) ),
                            (int) $settings['quality']
                        );
                        ?>
                    </dd>
                </div>
                <div class="pixlify-summary-row">
                    <dt><?php esc_html_e( 'Max Dimensions', 'pixlify-image-optimizer' ); ?></dt>
                    <dd>
                        <?php if ( $settings['resize_enabled'] ) :
                            printf( '%d × %d px', (int) $settings['max_width'], (int) $settings['max_height'] );
                        else :
                            esc_html_e( 'Disabled', 'pixlify-image-optimizer' );
                        endif; ?>
                    </dd>
                </div>
                <div class="pixlify-summary-row">
                    <dt><?php esc_html_e( 'Auto-Convert on Upload', 'pixlify-image-optimizer' ); ?></dt>
                    <dd>
                        <?php if ( ! empty( $settings['convert_on_upload'] ) ) : ?>
                            <span class="pixlify-badge pixlify-badge--success"><?php esc_html_e( 'On', 'pixlify-image-optimizer' ); ?></span>
                        <?php else : ?>
                            <span class="pixlify-badge pixlify-badge--pending"><?php esc_html_e( 'Off', 'pixlify-image-optimizer' ); ?></span>
                        <?php endif; ?>
                    </dd>
                </div>
                <div class="pixlify-summary-row">
                    <dt><?php esc_html_e( 'Backup Originals', 'pixlify-image-optimizer' ); ?></dt>
                    <dd>
                        <?php if ( ! empty( $settings['backup_original'] ) ) : ?>
                            <span class="pixlify-badge pixlify-badge--success"><?php esc_html_e( 'On', 'pixlify-image-optimizer' ); ?></span>
                        <?php else : ?>
                            <span class="pixlify-badge pixlify-badge--pending"><?php esc_html_e( 'Off', 'pixlify-image-optimizer' ); ?></span>
                        <?php endif; ?>
                    </dd>
                </div>
                <div class="pixlify-summary-row">
                    <dt><?php esc_html_e( 'Cron Auto-Batch', 'pixlify-image-optimizer' ); ?></dt>
                    <dd>
                        <?php if ( $settings['cron_enabled'] && $next_cron ) :
                            printf(
                                /* translators: %s: human-readable time diff */
                                esc_html__( 'Next run in %s', 'pixlify-image-optimizer' ),
                                esc_html( human_time_diff( $next_cron ) )
                            );
                        elseif ( $settings['cron_enabled'] ) :
                            esc_html_e( 'Scheduled', 'pixlify-image-optimizer' );
                        else :
                            esc_html_e( 'Disabled', 'pixlify-image-optimizer' );
                        endif; ?>
                    </dd>
                </div>
            </dl>

            <div style="flex:1;"></div>

            <!-- Quick Actions -->
            <div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--px-border);">
                <p style="font-size:.75rem;text-transform:uppercase;letter-spacing:.06em;color:var(--px-muted);font-weight:600;margin:0 0 10px;">
                    <?php esc_html_e( 'Quick Actions', 'pixlify-image-optimizer' ); ?>
                </p>
                <div style="display:flex;flex-direction:column;gap:8px;">
                    <a href="<?php echo esc_url( admin_url( 'admin.php?page=pixlify-bulk' ) ); ?>" class="button button-primary" style="text-align:center;">
                        <span class="dashicons dashicons-update" style="vertical-align:middle;margin-top:-2px;"></span>
                        <?php esc_html_e( 'Bulk Optimize', 'pixlify-image-optimizer' ); ?>
                    </a>
                    <a href="<?php echo esc_url( admin_url( 'admin.php?page=pixlify-duplicates' ) ); ?>" class="button" style="text-align:center;">
                        <span class="dashicons dashicons-search" style="vertical-align:middle;margin-top:-2px;"></span>
                        <?php esc_html_e( 'Find Duplicates', 'pixlify-image-optimizer' ); ?>
                    </a>
                    <a href="<?php echo esc_url( admin_url( 'admin.php?page=pixlify-settings' ) ); ?>" class="button" style="text-align:center;">
                        <span class="dashicons dashicons-admin-settings" style="vertical-align:middle;margin-top:-2px;"></span>
                        <?php esc_html_e( 'Settings', 'pixlify-image-optimizer' ); ?>
                    </a>
                </div>
            </div>
        </div>

    </div><!-- .pixlify-dashboard-grid -->
</div>
