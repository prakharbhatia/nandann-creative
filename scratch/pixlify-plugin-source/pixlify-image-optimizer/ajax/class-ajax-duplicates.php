<?php
/**
 * AJAX handlers for duplicate / unused image operations.
 * Thin layer: nonce + capability check → delegate to Pixlify_Duplicate_Detector.
 */
defined( 'ABSPATH' ) || exit;

class Pixlify_Ajax_Duplicates {

    public function __construct() {
        add_action( 'wp_ajax_pixlify_scan_duplicates',        array( $this, 'scan' ) );
        add_action( 'wp_ajax_pixlify_delete_attachment',      array( $this, 'delete_one' ) );
        add_action( 'wp_ajax_pixlify_bulk_delete_attachments', array( $this, 'bulk_delete' ) );
        add_action( 'wp_ajax_pixlify_ignore_attachment',      array( $this, 'ignore' ) );
    }

    // -------------------------------------------------------------------------
    // Handlers
    // -------------------------------------------------------------------------

    public function scan() {
        $this->verify( 'manage_options' );

        $detector  = new Pixlify_Duplicate_Detector();
        $type      = sanitize_key( $_POST['scan_type'] ?? 'unused' ); // phpcs:ignore WordPress.Security.NonceVerification.Missing -- nonce verified in $this->verify()
        $settings  = Pixlify_Settings::get();

        switch ( $type ) {
            case 'duplicates':
                $results = $detector->find_duplicates();
                break;
            case 'stale':
                $days    = absint( $_POST['days'] ?? $settings['unused_days'] ); // phpcs:ignore WordPress.Security.NonceVerification.Missing
                $results = $detector->find_stale( $days );
                break;
            default:
                $results = $detector->find_unused();
        }

        wp_send_json_success( array(
            'type'    => $type,
            'results' => $results,
            'count'   => count( $results ),
        ) );
    }

    public function delete_one() {
        $this->verify( 'delete_posts' );

        $id = absint( $_POST['attachment_id'] ?? 0 ); // phpcs:ignore WordPress.Security.NonceVerification.Missing -- nonce verified in $this->verify()
        if ( ! $id ) {
            wp_send_json_error( __( 'Invalid ID.', 'pixlify-image-optimizer'), 400 );
        }

        if ( ! wp_delete_attachment( $id, true ) ) {
            wp_send_json_error( __( 'Could not delete attachment.', 'pixlify-image-optimizer'), 500 );
        }

        wp_send_json_success( array( 'deleted' => $id ) );
    }

    public function bulk_delete() {
        $this->verify( 'delete_posts' );

        // Sanitize: cast every element to a positive integer. absint() sanitizes each value.
        // phpcs:ignore WordPress.Security.NonceVerification.Missing, WordPress.Security.ValidatedSanitizedInput.MissingUnslash, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized -- nonce verified in $this->verify(); absint() used on every element
        $raw_ids = isset( $_POST['attachment_ids'] ) ? (array) wp_unslash( $_POST['attachment_ids'] ) : array();
        $ids     = array_filter( array_map( 'absint', $raw_ids ) );

        if ( empty( $ids ) ) {
            wp_send_json_error( __( 'No valid IDs provided.', 'pixlify-image-optimizer'), 400 );
        }

        $deleted = array();
        $errors  = array();

        foreach ( $ids as $id ) {
            if ( wp_delete_attachment( $id, true ) ) {
                $deleted[] = $id;
            } else {
                $errors[] = $id;
            }
        }

        wp_send_json_success( array( 'deleted' => $deleted, 'errors' => $errors ) );
    }

    public function ignore() {
        $this->verify( 'manage_options' );

        $id = absint( $_POST['attachment_id'] ?? 0 ); // phpcs:ignore WordPress.Security.NonceVerification.Missing -- nonce verified in $this->verify()
        if ( ! $id ) {
            wp_send_json_error( __( 'Invalid ID.', 'pixlify-image-optimizer'), 400 );
        }

        $detector = new Pixlify_Duplicate_Detector();
        $detector->add_ignored_id( $id );

        wp_send_json_success( array( 'ignored' => $id ) );
    }

    // -------------------------------------------------------------------------
    // Security helper
    // -------------------------------------------------------------------------

    private function verify( $capability ) {
        check_ajax_referer( 'pixlify_nonce', 'nonce' );
        if ( ! current_user_can( $capability ) ) {
            wp_send_json_error( __( 'Unauthorized.', 'pixlify-image-optimizer'), 403 );
        }
    }
}
