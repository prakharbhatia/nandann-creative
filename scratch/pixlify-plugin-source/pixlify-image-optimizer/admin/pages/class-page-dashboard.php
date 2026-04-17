<?php
/**
 * Dashboard page — prepares data and renders the view.
 */
defined( 'ABSPATH' ) || exit;

class Pixlify_Page_Dashboard {

    public function render() {
        global $wpdb;

        $settings = Pixlify_Settings::get();
        $caps     = Pixlify_Converter::server_capabilities();
        $stats    = (array) get_option( 'pixlify_stats', array( 'total_converted' => 0, 'total_saved_bytes' => 0 ) );

        $cache_key   = 'pixlify_io_dash_counts';
        $dash_counts = wp_cache_get( $cache_key, 'pixlify_io' );

        if ( false === $dash_counts ) {
            $total_images = (int) $wpdb->get_var( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
                $wpdb->prepare(
                    "SELECT COUNT(*)
                     FROM {$wpdb->posts}
                     WHERE post_type = %s
                       AND post_mime_type LIKE %s
                       AND post_status = %s",
                    'attachment',
                    'image/%',
                    'inherit'
                )
            );

            $converted_count = (int) $wpdb->get_var( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.PreparedSQL.NotPrepared
                'SELECT COUNT(*) FROM ' . $wpdb->prefix . 'pixlify_images WHERE status = \'converted\''
            );

            wp_cache_set( $cache_key, array( $total_images, $converted_count ), 'pixlify_io', 5 * MINUTE_IN_SECONDS );
        } else {
            list( $total_images, $converted_count ) = $dash_counts;
        }

        $pending_count = max( 0, $total_images - $converted_count );
        $next_cron     = wp_next_scheduled( Pixlify_Cron_Scheduler::CRON_HOOK );

        require PIXLIFY_DIR . 'admin/views/page-dashboard.php';
    }
}
