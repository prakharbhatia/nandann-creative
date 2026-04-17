<?php
/**
 * License page view.
 * Variables available: $status (array from Pixlify_License::get_status())
 */
defined( 'ABSPATH' ) || exit;

$pixlify_lic_active     = in_array( $status['status'], [ Pixlify_License::STATUS_VALID, Pixlify_License::STATUS_TRIAL ], true );
$pixlify_lic_expired    = Pixlify_License::STATUS_EXPIRED === $status['status'];
$pixlify_lic_stored_key = get_option( Pixlify_License::OPTION_KEY, '' );
$pixlify_lic_masked_key = $pixlify_lic_stored_key ? ( substr( $pixlify_lic_stored_key, 0, 9 ) . '••••••••-••••••••-••••••••' ) : '';
?>
<div class="wrap pxlf-wrap">

    <div class="pxlf-page-header">
        <div class="pxlf-page-header__icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
        </div>
        <div>
            <h1 class="pxlf-page-header__title"><?php esc_html_e( 'License', 'pixlify-image-optimizer' ); ?></h1>
            <p class="pxlf-page-header__sub"><?php esc_html_e( 'Activate your license to enable WebP & AVIF serving on the frontend.', 'pixlify-image-optimizer' ); ?></p>
        </div>
    </div>

    <!-- ── Status banner ───────────────────────────────────────────────────── -->
    <div class="pxlf-status-banner pxlf-status-banner--<?php echo esc_attr( $status['status'] ); ?>" id="pxlf-status-banner">
        <div class="pxlf-status-banner__left">
            <?php echo Pixlify_Page_License::badge_html( $status ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
            <span class="pxlf-status-banner__msg" id="pxlf-status-msg"><?php echo esc_html( $status['message'] ); ?></span>
        </div>
        <?php if ( $pixlify_lic_active ) : ?>
            <div class="pxlf-status-banner__right">
                <?php if ( $status['expires_at'] > 0 ) : ?>
                    <span class="pxlf-status-meta">
                        <?php
                        printf(
                            /* translators: %s: date string */
                            esc_html__( 'Expires %s', 'pixlify-image-optimizer' ),
                            esc_html( date_i18n( get_option( 'date_format' ), $status['expires_at'] ) )
                        );
                        ?>
                    </span>
                <?php endif; ?>
                <button type="button" class="pxlf-btn pxlf-btn--ghost pxlf-btn--sm" id="pxlf-check-updates-btn">
                    <?php esc_html_e( 'Check for Updates', 'pixlify-image-optimizer' ); ?>
                </button>
                <button type="button" class="pxlf-btn pxlf-btn--ghost pxlf-btn--sm" id="pxlf-deactivate-btn">
                    <?php esc_html_e( 'Remove key', 'pixlify-image-optimizer' ); ?>
                </button>
            </div>
        <?php endif; ?>
    </div>

    <div id="pxlf-update-notice" style="display:none;" class="pxlf-update-notice"></div>

    <div class="pxlf-license-grid">

        <!-- ── Left: key input ──────────────────────────────────────────────── -->
        <div class="pxlf-card">
            <h2 class="pxlf-card__title"><?php esc_html_e( 'Enter License Key', 'pixlify-image-optimizer' ); ?></h2>
            <p class="pxlf-card__desc">
                <?php
                printf(
                    /* translators: %s: link to nandann.com */
                    esc_html__( 'Get your free 15-day trial key or purchase an unlimited key at %s.', 'pixlify-image-optimizer' ),
                    '<a href="https://www.nandann.com/pixlify-image-optimizer" target="_blank" rel="noopener">nandann.com/pixlify-image-optimizer</a>'
                );
                ?>
            </p>

            <div class="pxlf-key-form" id="pxlf-key-form">
                <div class="pxlf-key-input-wrap">
                    <input
                        type="text"
                        id="pxlf-license-key-input"
                        class="pxlf-key-input"
                        placeholder="PXLF-XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX"
                        value="<?php echo esc_attr( $pixlify_lic_masked_key ); ?>"
                        autocomplete="off"
                        spellcheck="false"
                        <?php echo $pixlify_lic_active ? 'readonly' : ''; ?>
                    />
                    <?php if ( $pixlify_lic_active ) : ?>
                        <span class="pxlf-key-lock" title="<?php esc_attr_e( 'Key active', 'pixlify-image-optimizer' ); ?>">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        </span>
                    <?php endif; ?>
                </div>

                <?php if ( ! $pixlify_lic_active ) : ?>
                    <button type="button" class="pxlf-btn pxlf-btn--primary pxlf-btn--activate" id="pxlf-activate-btn">
                        <?php esc_html_e( 'Activate Key', 'pixlify-image-optimizer' ); ?>
                    </button>
                <?php endif; ?>

                <div class="pxlf-key-feedback" id="pxlf-key-feedback" style="display:none;"></div>
            </div>

            <?php if ( $pixlify_lic_expired || Pixlify_License::STATUS_UNLICENSED === $status['status'] ) : ?>
                <div class="pxlf-get-key-cta">
                    <a href="https://www.nandann.com/pixlify-image-optimizer" target="_blank" rel="noopener" class="pxlf-btn pxlf-btn--outline">
                        <?php esc_html_e( '→ Get a free 15-day trial key', 'pixlify-image-optimizer' ); ?>
                    </a>
                    <a href="https://www.nandann.com/pixlify-image-optimizer" target="_blank" rel="noopener" class="pxlf-btn pxlf-btn--outline pxlf-btn--sm">
                        <?php esc_html_e( 'View pricing', 'pixlify-image-optimizer' ); ?>
                    </a>
                </div>
            <?php endif; ?>
        </div>

        <!-- ── Right: feature comparison ────────────────────────────────────── -->
        <div class="pxlf-card pxlf-feature-card">
            <h2 class="pxlf-card__title"><?php esc_html_e( 'What\'s Included', 'pixlify-image-optimizer' ); ?></h2>

            <table class="pxlf-feature-table">
                <thead>
                    <tr>
                        <th><?php esc_html_e( 'Feature', 'pixlify-image-optimizer' ); ?></th>
                        <th><?php esc_html_e( 'No Key', 'pixlify-image-optimizer' ); ?></th>
                        <th class="pxlf-col--trial"><?php esc_html_e( 'Trial (15d)', 'pixlify-image-optimizer' ); ?></th>
                        <th class="pxlf-col--unlimited"><?php esc_html_e( 'Unlimited', 'pixlify-image-optimizer' ); ?></th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    $pixlify_lic_features = [
                        [ __( 'Convert images to WebP on upload', 'pixlify-image-optimizer' ),   true,  true,  true  ],
                        [ __( 'Convert images to AVIF on upload', 'pixlify-image-optimizer' ),   false, true,  true  ],
                        [ __( 'Serve WebP to visitors (frontend)', 'pixlify-image-optimizer' ),  false, true,  true  ],
                        [ __( 'Serve AVIF to visitors (frontend)', 'pixlify-image-optimizer' ),  false, true,  true  ],
                        [ __( 'Bulk optimizer (unlimited images)', 'pixlify-image-optimizer' ),  false, true,  true  ],
                        [ __( 'Auto-resize on upload', 'pixlify-image-optimizer' ),              false, true,  true  ],
                        [ __( 'Duplicate & unused image detector', 'pixlify-image-optimizer' ),  false, true,  true  ],
                        [ __( 'Original image backups', 'pixlify-image-optimizer' ),             true,  true,  true  ],
                        [ __( 'WP-CLI support', 'pixlify-image-optimizer' ),                     true,  true,  true  ],
                        [ __( 'Priority support', 'pixlify-image-optimizer' ),                   false, false, true  ],
                    ];
                    $pixlify_lic_check = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';
                    $pixlify_lic_cross = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>';
                    foreach ( $pixlify_lic_features as $pixlify_lic_row ) :
                    ?>
                        <tr>
                            <td><?php echo esc_html( $pixlify_lic_row[0] ); ?></td>
                            <td class="pxlf-feature-cell"><?php echo $pixlify_lic_row[1] ? $pixlify_lic_check : $pixlify_lic_cross; // phpcs:ignore ?></td>
                            <td class="pxlf-feature-cell pxlf-col--trial"><?php echo $pixlify_lic_row[2] ? $pixlify_lic_check : $pixlify_lic_cross; // phpcs:ignore ?></td>
                            <td class="pxlf-feature-cell pxlf-col--unlimited"><?php echo $pixlify_lic_row[3] ? $pixlify_lic_check : $pixlify_lic_cross; // phpcs:ignore ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>

    </div><!-- /.pxlf-license-grid -->

    <!-- ── How it works ────────────────────────────────────────────────────── -->
    <div class="pxlf-card pxlf-how-card">
        <h2 class="pxlf-card__title"><?php esc_html_e( 'How License Keys Work', 'pixlify-image-optimizer' ); ?></h2>
        <div class="pxlf-how-grid">
            <?php
            $pixlify_lic_steps = [
                [
                    '🎁',
                    __( 'Get a key', 'pixlify-image-optimizer' ),
                    __( 'Visit nandann.com/pixlify-image-optimizer to get a free 15-day trial key or purchase an unlimited key.', 'pixlify-image-optimizer' ),
                ],
                [
                    '🔑',
                    __( 'Paste & activate', 'pixlify-image-optimizer' ),
                    __( 'Paste the key into the field above and click Activate Key. Validation happens instantly — no phone-home required.', 'pixlify-image-optimizer' ),
                ],
                [
                    '⚡',
                    __( 'WebP & AVIF serving enabled', 'pixlify-image-optimizer' ),
                    __( 'Once active, Pixlify starts serving WebP and AVIF to supported browsers — no server config needed.', 'pixlify-image-optimizer' ),
                ],
                [
                    '⏱️',
                    __( 'Trial expiry', 'pixlify-image-optimizer' ),
                    __( 'Trial keys are valid for 15 days. When a key expires, frontend serving pauses automatically until you renew.', 'pixlify-image-optimizer' ),
                ],
            ];
            foreach ( $pixlify_lic_steps as $pixlify_lic_step ) :
            ?>
                <div class="pxlf-how-step">
                    <div class="pxlf-how-step__icon"><?php echo esc_html( $pixlify_lic_step[0] ); ?></div>
                    <div>
                        <strong><?php echo esc_html( $pixlify_lic_step[1] ); ?></strong>
                        <p><?php echo esc_html( $pixlify_lic_step[2] ); ?></p>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>

</div><!-- /.wrap -->

<style>
/* ── License page styles ─────────────────────────────────────────────────── */
.pxlf-wrap { max-width: 1000px; font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif; }

.pxlf-page-header { display:flex; align-items:center; gap:16px; margin:24px 0 20px; }
.pxlf-page-header__icon { width:52px; height:52px; border-radius:12px; background:#f0fdf4; color:#16a34a; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.pxlf-page-header__title { margin:0 0 4px; font-size:22px; font-weight:700; color:#111827; }
.pxlf-page-header__sub { margin:0; color:#6b7280; font-size:13px; }

/* Status banner */
.pxlf-status-banner { display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap; padding:14px 18px; border-radius:10px; margin-bottom:20px; border:1px solid; }
.pxlf-status-banner--valid      { background:#f0fdf4; border-color:#bbf7d0; }
.pxlf-status-banner--trial      { background:#fffbeb; border-color:#fde68a; }
.pxlf-status-banner--expired    { background:#fef2f2; border-color:#fecaca; }
.pxlf-status-banner--invalid    { background:#fef2f2; border-color:#fecaca; }
.pxlf-status-banner--unlicensed { background:#f8fafc; border-color:#e5e7eb; }
.pxlf-status-banner__left  { display:flex; align-items:center; gap:12px; flex-wrap:wrap; }
.pxlf-status-banner__right { display:flex; align-items:center; gap:10px; }
.pxlf-status-banner__msg { font-size:13px; color:#374151; }
.pxlf-status-meta { font-size:12px; color:#9ca3af; }

/* Badges */
.pxlf-badge { display:inline-flex; align-items:center; gap:5px; padding:4px 10px; border-radius:20px; font-size:11px; font-weight:600; white-space:nowrap; }
.pxlf-badge--active     { background:#dcfce7; color:#15803d; }
.pxlf-badge--trial      { background:#fef9c3; color:#854d0e; }
.pxlf-badge--expired    { background:#fee2e2; color:#b91c1c; }
.pxlf-badge--invalid    { background:#fee2e2; color:#b91c1c; }
.pxlf-badge--unlicensed { background:#f1f5f9; color:#64748b; }

/* Layout grid */
.pxlf-license-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:20px; }
@media (max-width:900px) { .pxlf-license-grid { grid-template-columns:1fr; } }

/* Cards */
.pxlf-card { background:#fff; border:1px solid #e5e7eb; border-radius:10px; padding:22px 24px; }
.pxlf-card__title { margin:0 0 6px; font-size:15px; font-weight:700; color:#111827; }
.pxlf-card__desc  { margin:0 0 18px; font-size:13px; color:#6b7280; line-height:1.6; }
.pxlf-card__desc a { color:#16a34a; }

/* Key form */
.pxlf-key-input-wrap { display:flex; align-items:center; gap:0; margin-bottom:12px; position:relative; }
.pxlf-key-input { flex:1; padding:10px 40px 10px 14px; border:1.5px solid #d1d5db; border-radius:8px; font-size:13px; font-family:monospace; letter-spacing:.04em; color:#111827; background:#fff; outline:none; transition:border-color .15s,box-shadow .15s; width:100%; box-sizing:border-box; }
.pxlf-key-input:focus { border-color:#16a34a; box-shadow:0 0 0 3px rgba(22,163,74,.1); }
.pxlf-key-input[readonly] { background:#f8fafc; color:#6b7280; cursor:default; }
.pxlf-key-lock { position:absolute; right:12px; display:flex; align-items:center; }

/* Buttons */
.pxlf-btn { display:inline-flex; align-items:center; gap:6px; padding:9px 18px; border-radius:7px; font-size:13px; font-weight:600; cursor:pointer; border:none; text-decoration:none; transition:background .15s,color .15s,opacity .15s; }
.pxlf-btn--primary  { background:#16a34a; color:#fff; }
.pxlf-btn--primary:hover { background:#15803d; color:#fff; }
.pxlf-btn--outline  { background:transparent; color:#374151; border:1px solid #d1d5db; }
.pxlf-btn--outline:hover { background:#f3f4f6; }
.pxlf-btn--ghost    { background:transparent; color:#6b7280; border:1px solid #e5e7eb; }
.pxlf-btn--ghost:hover { background:#f9fafb; color:#374151; }
.pxlf-btn--sm       { padding:6px 12px; font-size:12px; }
.pxlf-btn--activate { margin-bottom:8px; }
.pxlf-btn:disabled  { opacity:.6; cursor:not-allowed; }

.pxlf-get-key-cta { display:flex; flex-wrap:wrap; gap:10px; margin-top:18px; padding-top:18px; border-top:1px solid #f1f5f9; }

/* Feedback message */
.pxlf-key-feedback { padding:9px 13px; border-radius:6px; font-size:13px; margin-top:4px; }
.pxlf-key-feedback--success { background:#f0fdf4; color:#15803d; border:1px solid #bbf7d0; }
.pxlf-key-feedback--error   { background:#fef2f2; color:#b91c1c; border:1px solid #fecaca; }

/* Feature table */
.pxlf-feature-table { width:100%; border-collapse:collapse; font-size:12px; margin-top:12px; }
.pxlf-feature-table th { text-align:left; padding:8px 10px; font-size:11px; font-weight:600; color:#6b7280; text-transform:uppercase; letter-spacing:.04em; border-bottom:1px solid #e5e7eb; background:#f8fafc; }
.pxlf-feature-table td { padding:9px 10px; border-bottom:1px solid #f1f5f9; color:#374151; font-size:12px; }
.pxlf-feature-table tr:last-child td { border-bottom:none; }
.pxlf-feature-cell { text-align:center; }
.pxlf-col--trial     th, .pxlf-col--trial     td { background:#fffbeb; }
.pxlf-col--unlimited th, .pxlf-col--unlimited td { background:#f0fdf4; }
.pxlf-feature-table th.pxlf-col--trial     { color:#854d0e; }
.pxlf-feature-table th.pxlf-col--unlimited { color:#15803d; }

/* Update notice */
.pxlf-update-notice { padding:12px 16px; border-radius:8px; font-size:13px; margin-bottom:16px; display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; }
.pxlf-update-notice--available { background:#eff6ff; border:1px solid #bfdbfe; color:#1d4ed8; }
.pxlf-update-notice--latest    { background:#f0fdf4; border:1px solid #bbf7d0; color:#15803d; }
.pxlf-update-notice--error     { background:#fef2f2; border:1px solid #fecaca; color:#b91c1c; }
.pxlf-update-notice a { font-weight:600; color:inherit; }

/* How it works */
.pxlf-how-card { margin-bottom:24px; }
.pxlf-how-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:20px; margin-top:16px; }
.pxlf-how-step { display:flex; gap:14px; align-items:flex-start; }
.pxlf-how-step__icon { font-size:22px; flex-shrink:0; margin-top:2px; }
.pxlf-how-step strong { display:block; font-size:13px; color:#111827; margin-bottom:4px; }
.pxlf-how-step p { margin:0; font-size:12px; color:#6b7280; line-height:1.6; }
</style>

<script>
( function( $ ) {
    'use strict';

    var nonce    = <?php echo wp_json_encode( wp_create_nonce( 'pixlify_license_nonce' ) ); ?>;
    var ajaxUrl  = <?php echo wp_json_encode( admin_url( 'admin-ajax.php' ) ); ?>;

    var $feedback = $( '#pxlf-key-feedback' );

    function showFeedback( msg, isError ) {
        $feedback
            .text( msg )
            .removeClass( 'pxlf-key-feedback--success pxlf-key-feedback--error' )
            .addClass( isError ? 'pxlf-key-feedback--error' : 'pxlf-key-feedback--success' )
            .show();
    }

    /* ── Activate ─────────────────────────────────────────────────────────── */
    $( '#pxlf-activate-btn' ).on( 'click', function () {
        var $btn = $( this );
        var key  = $( '#pxlf-license-key-input' ).val().trim();

        if ( ! key ) {
            showFeedback( <?php echo wp_json_encode( __( 'Please paste your license key.', 'pixlify-image-optimizer' ) ); ?>, true );
            return;
        }

        $btn.text( <?php echo wp_json_encode( __( 'Activating…', 'pixlify-image-optimizer' ) ); ?> ).prop( 'disabled', true );
        $feedback.hide();

        $.post( ajaxUrl, {
            action:      'pixlify_activate_license',
            nonce:       nonce,
            license_key: key,
        } ).then( function ( res ) {
            if ( res.success ) {
                showFeedback( res.data.message, false );
                // Reload to show locked key input + remove activate button
                setTimeout( function () { location.reload(); }, 1200 );
            } else {
                showFeedback( ( res.data && res.data.message ) || <?php echo wp_json_encode( __( 'Activation failed.', 'pixlify-image-optimizer' ) ); ?>, true );
                $btn.text( <?php echo wp_json_encode( __( 'Activate Key', 'pixlify-image-optimizer' ) ); ?> ).prop( 'disabled', false );
            }
        } ).fail( function () {
            showFeedback( <?php echo wp_json_encode( __( 'Request failed. Please try again.', 'pixlify-image-optimizer' ) ); ?>, true );
            $btn.text( <?php echo wp_json_encode( __( 'Activate Key', 'pixlify-image-optimizer' ) ); ?> ).prop( 'disabled', false );
        } );
    } );

    /* ── Deactivate ───────────────────────────────────────────────────────── */
    $( '#pxlf-deactivate-btn' ).on( 'click', function () {
        if ( ! confirm( <?php echo wp_json_encode( __( 'Remove your license key? WebP & AVIF serving will pause immediately.', 'pixlify-image-optimizer' ) ); ?> ) ) {
            return;
        }

        var $btn = $( this );
        $btn.prop( 'disabled', true );

        $.post( ajaxUrl, {
            action: 'pixlify_deactivate_license',
            nonce:  nonce,
        } ).then( function ( res ) {
            if ( res.success ) {
                location.reload();
            } else {
                $btn.prop( 'disabled', false );
            }
        } );
    } );

    /* ── Check for Updates ───────────────────────────────────────────────── */
    $( '#pxlf-check-updates-btn' ).on( 'click', function () {
        var $btn    = $( this );
        var $notice = $( '#pxlf-update-notice' );

        $btn.text( <?php echo wp_json_encode( __( 'Checking…', 'pixlify-image-optimizer' ) ); ?> ).prop( 'disabled', true );
        $notice.hide();

        $.post( ajaxUrl, {
            action: 'pixlify_check_updates',
            nonce:  nonce,
        } ).then( function ( res ) {
            $btn.text( <?php echo wp_json_encode( __( 'Check for Updates', 'pixlify-image-optimizer' ) ); ?> ).prop( 'disabled', false );

            if ( res.success ) {
                var d = res.data;
                if ( d.update_available ) {
                    $notice
                        .removeClass( 'pxlf-update-notice--latest pxlf-update-notice--error' )
                        .addClass( 'pxlf-update-notice--available' )
                        .html(
                            '<span>' + d.message + ' <strong>(<?php echo esc_js( __( 'current:', 'pixlify-image-optimizer' ) ); ?> ' + d.current_version + ')</strong></span>' +
                            '<a href="<?php echo esc_js( network_admin_url( 'plugins.php?plugin_status=upgrade' ) ); ?>"><?php echo esc_js( __( 'Go to Updates →', 'pixlify-image-optimizer' ) ); ?></a>'
                        );
                } else {
                    $notice
                        .removeClass( 'pxlf-update-notice--available pxlf-update-notice--error' )
                        .addClass( 'pxlf-update-notice--latest' )
                        .text( d.message + ' (v' + d.current_version + ')' );
                }
            } else {
                $notice
                    .removeClass( 'pxlf-update-notice--available pxlf-update-notice--latest' )
                    .addClass( 'pxlf-update-notice--error' )
                    .text( ( res.data && res.data.message ) || <?php echo wp_json_encode( __( 'Update check failed. Please try again.', 'pixlify-image-optimizer' ) ); ?> );
            }

            $notice.show();
        } ).fail( function () {
            $btn.text( <?php echo wp_json_encode( __( 'Check for Updates', 'pixlify-image-optimizer' ) ); ?> ).prop( 'disabled', false );
            $notice
                .removeClass( 'pxlf-update-notice--available pxlf-update-notice--latest' )
                .addClass( 'pxlf-update-notice--error' )
                .text( <?php echo wp_json_encode( __( 'Network error. Please try again.', 'pixlify-image-optimizer' ) ); ?> )
                .show();
        } );
    } );

    /* ── Auto-format key input as user types ─────────────────────────────── */
    $( '#pxlf-license-key-input' ).on( 'input', function () {
        // Strip the PXLF- prefix first so the 'F' in PXLF is not counted as a hex char.
        var stripped = $( this ).val().replace( /^PXLF-?/i, '' );
        var raw      = stripped.replace( /[^A-Fa-f0-9]/g, '' ).toUpperCase();
        var capped   = raw.substring( 0, 32 );
        var chunks   = capped.match( /.{1,8}/g ) || [];
        var formatted = chunks.length ? ( 'PXLF-' + chunks.join( '-' ) ) : '';
        if ( formatted !== $( this ).val() ) {
            $( this ).val( formatted );
        }
    } );

} )( jQuery );
</script>
