<?php
/**
 * Bulk Optimizer view template.
 * Variables provided by Pixlify_Page_Bulk::render():
 *   $status   (array: total, processed, remaining, percent, running)
 *   $settings (array)
 */
defined( 'ABSPATH' ) || exit;
// Plugin prefix: pixlify_io (10 chars — Pixlify Image Optimizer)

$pixlify_io_circumf  = 2 * M_PI * 44;
$pixlify_io_dash_off = $pixlify_io_circumf - ( $pixlify_io_circumf * (int) $status['percent'] / 100 );
$pixlify_io_ring_cls = (int) $status['percent'] >= 100 ? 'pixlify-ring-fill pixlify-ring-fill--success' : 'pixlify-ring-fill';
?>
<div class="wrap pixlify-wrap">

    <!-- Header -->
    <div class="pixlify-header">
        <div class="pixlify-header-logo">
            <span class="dashicons dashicons-update"></span>
        </div>
        <div class="pixlify-header-text">
            <h1><?php esc_html_e( 'Bulk Optimizer', 'pixlify-image-optimizer' ); ?></h1>
            <p><?php esc_html_e( 'Convert all existing images in your Media Library to WebP/AVIF in background batches.', 'pixlify-image-optimizer' ); ?></p>
        </div>
    </div>

    <!-- Progress Hero Card -->
    <div class="pixlify-card">
        <div class="pixlify-bulk-hero">
            <!-- Ring -->
            <div class="pixlify-bulk-ring-wrap">
                <svg class="pixlify-ring" width="96" height="96" viewBox="0 0 100 100" aria-hidden="true">
                    <circle class="pixlify-ring-bg"   cx="50" cy="50" r="44"/>
                    <circle class="<?php echo esc_attr( $pixlify_io_ring_cls ); ?>" cx="50" cy="50" r="44"
                        stroke-dasharray="<?php echo esc_attr( number_format( $pixlify_io_circumf, 2, '.', '' ) ); ?>"
                        stroke-dashoffset="<?php echo esc_attr( number_format( $pixlify_io_dash_off, 2, '.', '' ) ); ?>"/>
                </svg>
            </div>
            <!-- Stats -->
            <div class="pixlify-bulk-info">
                <div class="pixlify-bulk-pct">
                    <span id="pixlify-stat-percent"><?php echo (int) $status['percent']; ?></span>%
                </div>
                <div class="pixlify-bulk-sub">
                    <strong>
                        <span id="pixlify-stat-processed"><?php echo (int) $status['processed']; ?></span>
                        /
                        <span id="pixlify-stat-total"><?php echo (int) $status['total']; ?></span>
                    </strong>
                    <?php esc_html_e( 'images optimized', 'pixlify-image-optimizer' ); ?>
                    &mdash;
                    <span id="pixlify-stat-remaining"><?php echo (int) $status['remaining']; ?></span>
                    <?php esc_html_e( 'remaining', 'pixlify-image-optimizer' ); ?>
                </div>
                <div class="pixlify-progress-bar-wrap" style="max-width:400px;">
                    <div class="pixlify-progress-bar<?php echo (int) $status['percent'] >= 100 ? ' is-complete' : ''; ?>"
                         id="pixlify-progress-bar"
                         style="width:<?php echo (int) $status['percent']; ?>%"></div>
                </div>
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="pixlify-bulk-controls">
            <div class="pixlify-bulk-actions">
                <button id="pixlify-btn-queue-all" class="button button-primary pixlify-btn-primary">
                    <span class="dashicons dashicons-list-view" style="vertical-align:middle;margin-top:-2px;margin-right:4px;"></span>
                    <?php esc_html_e( 'Build Queue', 'pixlify-image-optimizer' ); ?>
                </button>
                <button id="pixlify-btn-run-all" class="button button-primary" <?php disabled( $status['remaining'], 0 ); ?>>
                    <span class="dashicons dashicons-controls-play" style="vertical-align:middle;margin-top:-2px;margin-right:4px;"></span>
                    <?php esc_html_e( 'Optimize All', 'pixlify-image-optimizer' ); ?>
                </button>
                <button id="pixlify-btn-run-batch" class="button" <?php disabled( $status['remaining'], 0 ); ?>>
                    <?php esc_html_e( 'One Batch', 'pixlify-image-optimizer' ); ?>
                </button>
                <button id="pixlify-btn-cancel" class="button" <?php disabled( $status['remaining'], 0 ); ?>>
                    <span class="dashicons dashicons-dismiss" style="vertical-align:middle;margin-top:-2px;margin-right:3px;"></span>
                    <?php esc_html_e( 'Cancel', 'pixlify-image-optimizer' ); ?>
                </button>
                <button id="pixlify-btn-release-lock" class="button" style="display:<?php echo $status['running'] ? 'inline-block' : 'none'; ?>;color:var(--px-warning);border-color:var(--px-warning);">
                    <span class="dashicons dashicons-unlock" style="vertical-align:middle;margin-top:-2px;margin-right:3px;"></span>
                    <?php esc_html_e( 'Release Lock', 'pixlify-image-optimizer' ); ?>
                </button>
            </div>
            <!-- Force Re-optimize row — shown when queue is empty (all converted) -->
            <div class="pixlify-force-reopt-row" style="margin-top:10px;padding-top:10px;border-top:1px solid var(--px-border,#e0e0e0);">
                <button id="pixlify-btn-force-reopt" class="button pixlify-btn-warning">
                    <span class="dashicons dashicons-image-rotate" style="vertical-align:middle;margin-top:-2px;margin-right:4px;"></span>
                    <?php esc_html_e( 'Force Re-optimize All', 'pixlify-image-optimizer' ); ?>
                </button>
                <span style="margin-left:8px;font-size:.8rem;color:var(--px-muted);">
                    <?php esc_html_e( 'Clears conversion history and re-queues every image — use after changing output format (e.g. AVIF → Both).', 'pixlify-image-optimizer' ); ?>
                </span>
            </div>
            <p class="description" style="margin-top:4px;">
                <?php
                printf(
                    /* translators: 1: batch size, 2: cron interval */
                    esc_html__( 'Batch size: %1$d images per run · Cron auto-runs: %2$s · You can leave this page while "Optimize All" is running.', 'pixlify-image-optimizer' ),
                    (int) $settings['batch_size'],
                    esc_html( $settings['cron_interval'] )
                );
                ?>
            </p>
        </div>

        <div id="pixlify-status-msg" class="pixlify-status-msg"></div>
    </div>

    <!-- Active Processes -->
    <div class="pixlify-card" id="pixlify-processes-card">
        <!-- Custom header row: overrides .pixlify-card h2 border/padding via inline style -->
        <div class="pixlify-processes-header">
            <h2 style="margin:0;padding-bottom:0;border-bottom:none;flex:1;">
                <span class="dashicons dashicons-performance"></span>
                <?php esc_html_e( 'Active Processes', 'pixlify-image-optimizer' ); ?>
            </h2>
            <div class="pixlify-processes-actions">
                <button id="pixlify-btn-refresh-processes" class="button button-small">
                    <span class="dashicons dashicons-update" style="vertical-align:middle;margin-top:-2px;"></span>
                    <?php esc_html_e( 'Refresh', 'pixlify-image-optimizer' ); ?>
                </button>
                <button id="pixlify-btn-kill-all" class="button button-small pixlify-btn-danger">
                    <span class="dashicons dashicons-trash" style="vertical-align:middle;margin-top:-2px;margin-right:3px;"></span>
                    <?php esc_html_e( 'Kill All & Clear Queue', 'pixlify-image-optimizer' ); ?>
                </button>
            </div>
        </div>
        <div id="pixlify-processes-list" style="margin-top:14px;">
            <p class="description" style="color:var(--px-muted);"><?php esc_html_e( 'Loading…', 'pixlify-image-optimizer' ); ?></p>
        </div>
    </div>

    <!-- Session Log -->
    <div class="pixlify-card">
        <h2>
            <span class="dashicons dashicons-editor-code"></span>
            <?php esc_html_e( 'Session Log', 'pixlify-image-optimizer' ); ?>
        </h2>
        <div id="pixlify-log" class="pixlify-log">
            <p class="pixlify-log-placeholder"><?php esc_html_e( 'Log output will appear here when processing starts.', 'pixlify-image-optimizer' ); ?></p>
        </div>
        <p style="margin-top:10px;">
            <button id="pixlify-clear-log" class="button button-small"><?php esc_html_e( 'Clear Log', 'pixlify-image-optimizer' ); ?></button>
        </p>
    </div>

    <!-- Persistent Error Log -->
    <?php if ( ! empty( $error_rows ) ) : ?>
    <div class="pixlify-card" id="pixlify-error-log-card">
        <h2>
            <span class="dashicons dashicons-warning" style="color:var(--px-danger);"></span>
            <?php
            printf(
                /* translators: %d: number of failed images */
                esc_html__( 'Failed Images (%d)', 'pixlify-image-optimizer' ),
                count( $error_rows )
            );
            ?>
        </h2>
        <p style="margin:0 0 14px;font-size:.875rem;color:var(--px-muted);">
            <?php esc_html_e( 'These images failed during a previous optimization run. Review the errors and retry individually.', 'pixlify-image-optimizer' ); ?>
        </p>
        <div style="overflow-x:auto;">
        <table class="wp-list-table widefat fixed striped" style="font-size:.82rem;">
            <thead>
                <tr>
                    <th style="width:60px;"><?php esc_html_e( 'ID', 'pixlify-image-optimizer' ); ?></th>
                    <th><?php esc_html_e( 'Filename', 'pixlify-image-optimizer' ); ?></th>
                    <th><?php esc_html_e( 'Error', 'pixlify-image-optimizer' ); ?></th>
                    <th style="width:130px;"><?php esc_html_e( 'Time', 'pixlify-image-optimizer' ); ?></th>
                    <th style="width:80px;"><?php esc_html_e( 'Action', 'pixlify-image-optimizer' ); ?></th>
                </tr>
            </thead>
            <tbody>
            <?php foreach ( $error_rows as $pixlify_io_err_row ) :
                $pixlify_io_err_id   = (int) $pixlify_io_err_row->attachment_id;
                $pixlify_io_err_file = get_attached_file( $pixlify_io_err_id );
                $pixlify_io_err_name = $pixlify_io_err_file ? esc_html( basename( $pixlify_io_err_file ) ) : esc_html__( '(file missing)', 'pixlify-image-optimizer' );
            ?>
            <tr id="pixlify-err-row-<?php echo absint( $pixlify_io_err_id ); ?>">
                <td><?php echo absint( $pixlify_io_err_id ); ?></td>
                <td>
                    <?php echo esc_html( $pixlify_io_err_name ); ?>
                    <?php
                    $pixlify_io_edit_link = get_edit_post_link( $pixlify_io_err_id );
                    if ( $pixlify_io_edit_link ) :
                    ?>
                    <a href="<?php echo esc_url( $pixlify_io_edit_link ); ?>" target="_blank"
                       style="font-size:.75rem;margin-left:6px;color:var(--px-muted);">↗</a>
                    <?php endif; ?>
                </td>
                <td style="color:var(--px-danger);">
                    <?php echo esc_html( $pixlify_io_err_row->error_message ?: __( 'Unknown error', 'pixlify-image-optimizer' ) ); ?>
                </td>
                <td style="color:var(--px-muted);">
                    <?php echo esc_html( mysql2date( get_option( 'date_format' ) . ' ' . get_option( 'time_format' ), $pixlify_io_err_row->converted_at ) ); ?>
                </td>
                <td>
                    <button class="button button-small pixlify-btn-retry"
                            data-id="<?php echo absint( $pixlify_io_err_id ); ?>">
                        <?php esc_html_e( 'Retry', 'pixlify-image-optimizer' ); ?>
                    </button>
                </td>
            </tr>
            <?php endforeach; ?>
            </tbody>
        </table>
        </div>
        <p style="margin-top:12px;">
            <button id="pixlify-retry-all-errors" class="button">
                <span class="dashicons dashicons-update" style="vertical-align:middle;margin-top:-2px;margin-right:4px;"></span>
                <?php esc_html_e( 'Retry All Failed', 'pixlify-image-optimizer' ); ?>
            </button>
        </p>
        <div id="pixlify-retry-status" class="pixlify-status-msg"></div>
    </div>
    <?php endif; ?>

</div>
