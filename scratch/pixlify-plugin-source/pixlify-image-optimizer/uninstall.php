<?php
/**
 * Runs only when the plugin is deleted (not deactivated).
 */
defined( 'WP_UNINSTALL_PLUGIN' ) || exit;

if ( get_option( 'pixlify_delete_data_on_uninstall' ) ) {
    delete_option( 'pixlify_settings' );
    delete_option( 'pixlify_stats' );
    delete_option( 'pixlify_pending_queue' );
    delete_option( 'pixlify_queue_total' );
    delete_option( 'pixlify_ignored_attachments' );
    delete_option( 'pixlify_delete_data_on_uninstall' );
    delete_transient( 'pixlify_batch_running' );

    global $wpdb;
    // Table name is constructed from a trusted constant ($wpdb->prefix) — no user input.
    // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared, WordPress.DB.DirectDatabaseQuery
    $wpdb->query( 'DROP TABLE IF EXISTS ' . $wpdb->prefix . 'pixlify_images' );
}
