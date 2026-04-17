<?php
/**
 * Main plugin singleton — composition root.
 * Wires all hooks; no business logic lives here.
 */
defined( 'ABSPATH' ) || exit;

class Pixlify_Plugin {

    private static $instance = null;

    public static function get_instance() {
        if ( null === self::$instance ) {
            self::$instance = new self();
            self::$instance->init();
        }
        return self::$instance;
    }

    private function init() {
        // Boot cron scheduler (registers the cron hook action).
        new Pixlify_Cron_Scheduler();

        // Boot AJAX handlers.
        new Pixlify_Ajax_Batch();
        new Pixlify_Ajax_Duplicates();

        // Boot frontend URL rewriter (serves WebP/AVIF to supported browsers).
        // Works on nginx/WP Engine — does not require .htaccess mod_rewrite.
        Pixlify_Rewriter::init();

        // Boot admin.
        if ( is_admin() ) {
            new Pixlify_Admin();
        }

        // Auto-convert on upload — requires a valid license.
        $settings = Pixlify_Settings::get();
        if ( ! empty( $settings['convert_on_upload'] ) && Pixlify_License::is_licensed() ) {
            add_filter( 'wp_generate_attachment_metadata', array( $this, 'on_upload' ), 20, 2 );
        }
    }

    public function on_upload( $metadata, $attachment_id ) {
        $converter = new Pixlify_Converter();
        $converter->convert_attachment( $attachment_id );
        return $metadata;
    }

    // -------------------------------------------------------------------------
    // Lifecycle
    // -------------------------------------------------------------------------

    public static function activate() {
        Pixlify_Settings::set_defaults();
        Pixlify_Cron_Scheduler::schedule();
        Pixlify_License::schedule_server_check();
        self::create_tables();
    }

    public static function deactivate() {
        Pixlify_Cron_Scheduler::unschedule();
        Pixlify_License::unschedule_server_check();
        Pixlify_Htaccess::remove_rules();
    }

    public static function uninstall() {
        if ( get_option( 'pixlify_delete_data_on_uninstall' ) ) {
            delete_option( 'pixlify_settings' );
            delete_option( 'pixlify_stats' );
            delete_option( Pixlify_Queue::QUEUE_OPTION );
            delete_option( 'pixlify_queue_total' );
            delete_option( 'pixlify_ignored_attachments' );
            delete_option( 'pixlify_delete_data_on_uninstall' );
            delete_transient( 'pixlify_batch_running' );
            self::drop_tables();
        }
    }

    // -------------------------------------------------------------------------
    // Database
    // -------------------------------------------------------------------------

    public static function create_tables() {
        global $wpdb;
        $charset_collate = $wpdb->get_charset_collate();
        $table           = $wpdb->prefix . 'pixlify_images';

        // dbDelta handles CREATE IF NOT EXISTS safely.
        $sql = "CREATE TABLE {$table} (
            id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            attachment_id BIGINT UNSIGNED NOT NULL,
            original_size BIGINT UNSIGNED NOT NULL DEFAULT 0,
            optimized_size BIGINT UNSIGNED NOT NULL DEFAULT 0,
            format        VARCHAR(10) NOT NULL DEFAULT '',
            status        VARCHAR(20) NOT NULL DEFAULT 'pending',
            error_message TEXT,
            converted_at  DATETIME,
            PRIMARY KEY  (id),
            UNIQUE KEY attachment_id (attachment_id)
        ) {$charset_collate};";

        require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        dbDelta( $sql );
    }

    public static function drop_tables() {
        global $wpdb;
        // Table name is a fixed prefix constant — no user input involved.
        // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared, WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.DirectDatabaseQuery.SchemaChange
        $wpdb->query( 'DROP TABLE IF EXISTS ' . $wpdb->prefix . 'pixlify_images' );
    }
}
