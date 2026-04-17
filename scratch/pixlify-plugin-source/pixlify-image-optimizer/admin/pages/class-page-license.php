<?php
/**
 * License page — controller.
 * Handles page render + AJAX activate / deactivate.
 */
defined( 'ABSPATH' ) || exit;

class Pixlify_Page_License {

    public function __construct() {
        add_action( 'wp_ajax_pixlify_activate_license',   [ $this, 'ajax_activate'      ] );
        add_action( 'wp_ajax_pixlify_deactivate_license', [ $this, 'ajax_deactivate'    ] );
        add_action( 'wp_ajax_pixlify_check_updates',      [ $this, 'ajax_check_updates' ] );
    }

    // ── Page render ────────────────────────────────────────────────────────────

    public function render(): void {
        $status = Pixlify_License::get_status();
        require PIXLIFY_DIR . 'admin/views/page-license.php';
    }

    // ── AJAX: activate ─────────────────────────────────────────────────────────

    public function ajax_activate(): void {
        check_ajax_referer( 'pixlify_license_nonce', 'nonce' );

        if ( ! current_user_can( 'manage_options' ) ) {
            wp_send_json_error( [ 'message' => __( 'Permission denied.', 'pixlify-image-optimizer' ) ] );
        }

        $raw_key = isset( $_POST['license_key'] ) ? sanitize_text_field( wp_unslash( $_POST['license_key'] ) ) : '';

        if ( empty( $raw_key ) ) {
            wp_send_json_error( [ 'message' => __( 'Please enter a license key.', 'pixlify-image-optimizer' ) ] );
        }

        // activate() calls nandann.com directly — it is the source of truth.
        $result = Pixlify_License::activate( $raw_key );

        if ( in_array( $result['status'], [ Pixlify_License::STATUS_VALID, Pixlify_License::STATUS_TRIAL ], true ) ) {
            wp_send_json_success( [
                'message'    => $result['message'],
                'status'     => $result['status'],
                'type'       => $result['type'],
                'days_left'  => $result['days_left'],
                'expires_at' => $result['expires_at'],
                'badge_html' => self::badge_html( $result ),
            ] );
        } else {
            wp_send_json_error( [ 'message' => $result['message'] ] );
        }
    }

    // ── AJAX: deactivate ───────────────────────────────────────────────────────

    public function ajax_deactivate(): void {
        check_ajax_referer( 'pixlify_license_nonce', 'nonce' );

        if ( ! current_user_can( 'manage_options' ) ) {
            wp_send_json_error( [ 'message' => __( 'Permission denied.', 'pixlify-image-optimizer' ) ] );
        }

        Pixlify_License::deactivate();

        wp_send_json_success( [
            'message' => __( 'License removed. WebP & AVIF serving is now paused.', 'pixlify-image-optimizer' ),
        ] );
    }

    // ── AJAX: check for updates ────────────────────────────────────────────────

    public function ajax_check_updates(): void {
        check_ajax_referer( 'pixlify_license_nonce', 'nonce' );

        if ( ! current_user_can( 'manage_options' ) ) {
            wp_send_json_error( [ 'message' => __( 'Permission denied.', 'pixlify-image-optimizer' ) ] );
        }

        if ( ! Pixlify_License::is_licensed() ) {
            wp_send_json_error( [ 'message' => __( 'A valid license is required to check for updates.', 'pixlify-image-optimizer' ) ] );
        }

        // Clear both our cache and WordPress's plugin update cache.
        delete_transient( Pixlify_Updater::CACHE_KEY );
        delete_site_transient( 'update_plugins' );

        // Force a fresh fetch from the update endpoint.
        $response = wp_remote_get( Pixlify_Updater::UPDATE_URL, [
            'timeout'    => 10,
            'user-agent' => 'WordPress/' . get_bloginfo( 'version' ) . '; ' . home_url(),
        ] );

        if ( is_wp_error( $response ) || 200 !== (int) wp_remote_retrieve_response_code( $response ) ) {
            wp_send_json_error( [ 'message' => __( 'Could not reach the update server. Please try again later.', 'pixlify-image-optimizer' ) ] );
        }

        $remote = json_decode( wp_remote_retrieve_body( $response ) );

        if ( empty( $remote->version ) ) {
            wp_send_json_error( [ 'message' => __( 'Invalid response from update server.', 'pixlify-image-optimizer' ) ] );
        }

        // Cache the fresh result.
        set_transient( Pixlify_Updater::CACHE_KEY, $remote, 12 * HOUR_IN_SECONDS );

        $update_available = version_compare( $remote->version, PIXLIFY_VERSION, '>' );

        wp_send_json_success( [
            'update_available' => $update_available,
            'current_version'  => PIXLIFY_VERSION,
            'remote_version'   => $remote->version,
            'message'          => $update_available
                ? sprintf(
                    /* translators: %s: new version number */
                    __( 'Version %s is available.', 'pixlify-image-optimizer' ),
                    $remote->version
                )
                : __( 'You are running the latest version.', 'pixlify-image-optimizer' ),
        ] );
    }

    // ── Static helper: render the status badge HTML (shared with view) ─────────

    public static function badge_html( array $status ): string {
        switch ( $status['status'] ) {
            case Pixlify_License::STATUS_VALID:
                return '<span class="pxlf-badge pxlf-badge--active">'
                    . '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>'
                    . esc_html__( 'Active — Unlimited', 'pixlify-image-optimizer' )
                    . '</span>';

            case Pixlify_License::STATUS_TRIAL:
                return '<span class="pxlf-badge pxlf-badge--trial">'
                    . '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>'
                    . sprintf(
                        /* translators: %d days remaining */
                        esc_html( _n( 'Trial — %d day left', 'Trial — %d days left', $status['days_left'], 'pixlify-image-optimizer' ) ),
                        (int) $status['days_left']
                    )
                    . '</span>';

            case Pixlify_License::STATUS_EXPIRED:
                return '<span class="pxlf-badge pxlf-badge--expired">'
                    . '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>'
                    . esc_html__( 'Expired', 'pixlify-image-optimizer' )
                    . '</span>';

            case Pixlify_License::STATUS_INVALID:
                return '<span class="pxlf-badge pxlf-badge--invalid">'
                    . esc_html__( 'Invalid key', 'pixlify-image-optimizer' )
                    . '</span>';

            default: // unlicensed
                return '<span class="pxlf-badge pxlf-badge--unlicensed">'
                    . esc_html__( 'No license', 'pixlify-image-optimizer' )
                    . '</span>';
        }
    }
}
