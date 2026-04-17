<?php
/**
 * Bulk Optimizer page — prepares queue status and renders the view.
 */
defined( 'ABSPATH' ) || exit;

class Pixlify_Page_Bulk {

    public function render() {
        global $wpdb;

        $queue    = new Pixlify_Queue();
        $status   = $queue->queue_status();
        $settings = Pixlify_Settings::get();

        // Load failed images from the DB for the error log panel.
        // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.PreparedSQL.NotPrepared
        $error_rows = $wpdb->get_results(
            'SELECT attachment_id, error_message, converted_at
             FROM ' . $wpdb->prefix . 'pixlify_images
             WHERE status = \'error\'
             ORDER BY converted_at DESC
             LIMIT 100'
        );

        require PIXLIFY_DIR . 'admin/views/page-bulk.php';
    }
}
