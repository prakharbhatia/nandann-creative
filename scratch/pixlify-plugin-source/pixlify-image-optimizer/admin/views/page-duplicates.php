<?php
/**
 * Duplicates & Unused view template.
 * Variables provided by Pixlify_Page_Duplicates::render():
 *   $settings (array)
 */
defined( 'ABSPATH' ) || exit;
// Plugin prefix: pixlify_io (10 chars — Pixlify Image Optimizer)
?>
<div class="wrap pixlify-wrap">

    <!-- Header -->
    <div class="pixlify-header">
        <div class="pixlify-header-logo" style="background:#5b5fc7;">
            <span class="dashicons dashicons-search"></span>
        </div>
        <div class="pixlify-header-text">
            <h1><?php esc_html_e( 'Duplicates & Unused Images', 'pixlify-image-optimizer' ); ?></h1>
            <p><?php esc_html_e( 'Find images that are duplicated, unattached, or never used — then delete them to reclaim disk space.', 'pixlify-image-optimizer' ); ?></p>
        </div>
    </div>

    <!-- Scan Tabs -->
    <div class="pixlify-card">
        <h2>
            <span class="dashicons dashicons-filter"></span>
            <?php esc_html_e( 'Scan Type', 'pixlify-image-optimizer' ); ?>
        </h2>
        <div class="pixlify-scan-tabs">
            <button class="pixlify-scan-tab is-active" data-type="unused">
                <span class="dashicons dashicons-image-crop"></span>
                <?php esc_html_e( 'Unused Images', 'pixlify-image-optimizer' ); ?>
            </button>
            <button class="pixlify-scan-tab" data-type="duplicates">
                <span class="dashicons dashicons-admin-page"></span>
                <?php esc_html_e( 'Duplicates', 'pixlify-image-optimizer' ); ?>
            </button>
            <button class="pixlify-scan-tab" data-type="stale">
                <span class="dashicons dashicons-calendar-alt"></span>
                <?php
                printf(
                    /* translators: %d: number of days */
                    esc_html__( 'Stale (%d+ days)', 'pixlify-image-optimizer' ),
                    (int) $settings['unused_days']
                );
                ?>
            </button>
        </div>

        <div style="margin-top:16px;display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
            <button id="pixlify-btn-scan" class="button button-primary pixlify-btn-primary">
                <span class="dashicons dashicons-search" style="vertical-align:middle;margin-top:-2px;margin-right:4px;"></span>
                <?php esc_html_e( 'Run Scan', 'pixlify-image-optimizer' ); ?>
            </button>
            <span style="font-size:.8rem;color:var(--px-muted);">
                <?php esc_html_e( 'Scanning large libraries may take a few seconds.', 'pixlify-image-optimizer' ); ?>
            </span>
        </div>

        <div id="pixlify-scan-status" class="pixlify-status-msg" style="margin-top:12px;"></div>
    </div>

    <!-- Results -->
    <div id="pixlify-dup-results" class="pixlify-card" style="display:none;">
        <div class="pixlify-results-header">
            <h2 id="pixlify-results-title" style="margin:0;border:none;padding:0;"></h2>
            <div class="pixlify-results-actions">
                <label style="display:flex;align-items:center;gap:6px;font-size:.875rem;cursor:pointer;">
                    <input type="checkbox" id="pixlify-select-all">
                    <?php esc_html_e( 'Select All', 'pixlify-image-optimizer' ); ?>
                </label>
                <button id="pixlify-bulk-delete" class="button button-link-delete" disabled>
                    <span class="dashicons dashicons-trash" style="vertical-align:middle;margin-top:-2px;margin-right:3px;font-size:.9rem;"></span>
                    <?php esc_html_e( 'Delete Selected', 'pixlify-image-optimizer' ); ?>
                </button>
            </div>
        </div>
        <div id="pixlify-results-list"></div>
    </div>

</div>

<!-- Underscore.js template: single attachment card -->
<script type="text/html" id="tmpl-pixlify-attachment-card">
    <div class="pixlify-attachment-card" data-id="{{ data.id }}">
        <label class="pixlify-attachment-select" style="flex-shrink:0;">
            <input type="checkbox" class="pixlify-attachment-cb" value="{{ data.id }}">
        </label>
        <div class="pixlify-attachment-thumb">
            <# if ( data.thumb_url ) { #>
                <img src="{{ data.thumb_url }}" alt="">
            <# } else { #>
                <span class="dashicons dashicons-format-image"></span>
            <# } #>
        </div>
        <div class="pixlify-attachment-meta">
            <strong>{{ data.filename }}</strong>
            <span>{{ data.file_size_h }}</span>
            <span>{{ data.date }}</span>
        </div>
        <div class="pixlify-attachment-actions">
            <a href="{{ data.edit_url }}" target="_blank" class="button button-small"><?php esc_html_e( 'Edit', 'pixlify-image-optimizer' ); ?></a>
            <button class="button button-small pixlify-btn-ignore" data-id="{{ data.id }}"><?php esc_html_e( 'Ignore', 'pixlify-image-optimizer' ); ?></button>
            <button class="button button-small button-link-delete pixlify-btn-delete-one" data-id="{{ data.id }}"><?php esc_html_e( 'Delete', 'pixlify-image-optimizer' ); ?></button>
        </div>
    </div>
</script>

<!-- Underscore.js template: duplicate group -->
<script type="text/html" id="tmpl-pixlify-duplicate-group">
    <div class="pixlify-dup-group">
        <div class="pixlify-dup-group-header">
            <span class="dashicons dashicons-admin-page" style="font-size:.9rem;vertical-align:middle;margin-top:-1px;"></span>
            <?php esc_html_e( 'Duplicate group', 'pixlify-image-optimizer' ); ?> &mdash;
            {{ data.attachments.length }} <?php esc_html_e( 'identical files', 'pixlify-image-optimizer' ); ?>
            <code style="font-size:.72rem;opacity:.7;margin-left:6px;">{{ data.hash }}</code>
        </div>
        <div class="pixlify-dup-group-files">
            <# _.each( data.attachments, function( att, i ) { #>
            <div class="pixlify-attachment-card pixlify-dup-item <# if ( i === 0 ) { #>pixlify-dup-original<# } #>" data-id="{{ att.id }}">
                <div style="flex-shrink:0;width:24px;">
                    <# if ( i === 0 ) { #>
                        <span class="pixlify-badge pixlify-badge--success" style="font-size:.65rem;padding:2px 5px;"><?php esc_html_e( 'Keep', 'pixlify-image-optimizer' ); ?></span>
                    <# } else { #>
                        <label><input type="checkbox" class="pixlify-attachment-cb" value="{{ att.id }}"></label>
                    <# } #>
                </div>
                <div class="pixlify-attachment-thumb">
                    <# if ( att.thumb_url ) { #><img src="{{ att.thumb_url }}" alt=""><# } #>
                </div>
                <div class="pixlify-attachment-meta">
                    <strong>{{ att.filename }}</strong>
                    <span>{{ att.file_size_h }}</span>
                    <span>{{ att.date }}</span>
                </div>
                <div class="pixlify-attachment-actions">
                    <# if ( i > 0 ) { #>
                    <a href="{{ att.edit_url }}" target="_blank" class="button button-small"><?php esc_html_e( 'Edit', 'pixlify-image-optimizer' ); ?></a>
                    <button class="button button-small button-link-delete pixlify-btn-delete-one" data-id="{{ att.id }}"><?php esc_html_e( 'Delete', 'pixlify-image-optimizer' ); ?></button>
                    <# } #>
                </div>
            </div>
            <# } ); #>
        </div>
    </div>
</script>
