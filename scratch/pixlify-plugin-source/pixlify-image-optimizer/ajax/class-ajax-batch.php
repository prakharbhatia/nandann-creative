<?php
/**
 * AJAX handlers for batch / queue operations.
 * Thin layer: nonce + capability check → delegate to domain class.
 */
defined( 'ABSPATH' ) || exit;

class Pixlify_Ajax_Batch {

    public function __construct() {
        add_action( 'wp_ajax_pixlify_queue_all',          array( $this, 'queue_all' ) );
        add_action( 'wp_ajax_pixlify_run_batch',          array( $this, 'run_batch' ) );
        add_action( 'wp_ajax_pixlify_queue_status',       array( $this, 'queue_status' ) );
        add_action( 'wp_ajax_pixlify_cancel_queue',       array( $this, 'cancel_queue' ) );
        add_action( 'wp_ajax_pixlify_restore_image',      array( $this, 'restore_image' ) );
        add_action( 'wp_ajax_pixlify_retry_one',          array( $this, 'retry_one' ) );
        add_action( 'wp_ajax_pixlify_retry_all_errors',   array( $this, 'retry_all_errors' ) );
        add_action( 'wp_ajax_pixlify_release_lock',       array( $this, 'release_lock' ) );
        add_action( 'wp_ajax_pixlify_get_processes',      array( $this, 'get_processes' ) );
        add_action( 'wp_ajax_pixlify_kill_process',       array( $this, 'kill_process' ) );
        add_action( 'wp_ajax_pixlify_force_reoptimize',   array( $this, 'force_reoptimize' ) );
        add_action( 'wp_ajax_pixlify_reset_one',          array( $this, 'reset_one' ) );
    }

    // -------------------------------------------------------------------------
    // Handlers
    // -------------------------------------------------------------------------

    public function queue_all() {
        $this->verify( 'manage_options' );

        $queue = new Pixlify_Queue();
        $total = $queue->build_queue();
        update_option( 'pixlify_queue_total', $total );

        wp_send_json_success( array( 'total' => $total ) );
    }

    public function run_batch() {
        $this->verify( 'manage_options' );

        if ( ! Pixlify_License::is_licensed() ) {
            wp_send_json_error( __( 'A valid license is required to run batch optimization.', 'pixlify-image-optimizer' ), 403 );
        }

        // Buffer any stray PHP output (notices/warnings) that would corrupt the JSON response.
        ob_start();

        $queue  = new Pixlify_Queue();
        $result = $queue->run_batch();

        $stray_output = trim( (string) ob_get_clean() );

        $response = array_merge( $result, $queue->queue_status() );

        // Surface any PHP warnings/notices to the JS log so the user can diagnose them.
        if ( '' !== $stray_output ) {
            $response['php_output'] = wp_strip_all_tags( $stray_output );
        }

        wp_send_json_success( $response );
    }

    public function queue_status() {
        $this->verify( 'manage_options' );

        $queue = new Pixlify_Queue();
        wp_send_json_success( $queue->queue_status() );
    }

    public function cancel_queue() {
        $this->verify( 'manage_options' );

        update_option( Pixlify_Queue::QUEUE_OPTION, array() );
        delete_transient( 'pixlify_batch_running' );

        wp_send_json_success( array( 'message' => __( 'Queue cleared.', 'pixlify-image-optimizer') ) );
    }

    public function restore_image() {
        $this->verify( 'manage_options' );

        $attachment_id = absint( $_POST['attachment_id'] ?? 0 ); // phpcs:ignore WordPress.Security.NonceVerification.Missing -- nonce verified in $this->verify()
        if ( ! $attachment_id ) {
            wp_send_json_error( __( 'Invalid attachment ID.', 'pixlify-image-optimizer'), 400 );
        }

        $converter = new Pixlify_Converter();
        $result    = $converter->restore_original( $attachment_id );

        if ( is_wp_error( $result ) ) {
            wp_send_json_error( $result->get_error_message(), 400 );
        }

        wp_send_json_success( array( 'message' => __( 'Original restored successfully.', 'pixlify-image-optimizer') ) );
    }

    public function release_lock() {
        $this->verify( 'manage_options' );

        $queue = new Pixlify_Queue();
        $queue->release_lock();

        wp_send_json_success( array( 'message' => __( 'Batch lock released.', 'pixlify-image-optimizer' ) ) );
    }

    public function retry_one() {
        $this->verify( 'manage_options' );

        if ( ! Pixlify_License::is_licensed() ) {
            wp_send_json_error( __( 'A valid license is required to optimize images.', 'pixlify-image-optimizer' ), 403 );
        }

        $attachment_id = absint( $_POST['attachment_id'] ?? 0 ); // phpcs:ignore WordPress.Security.NonceVerification.Missing -- nonce verified in $this->verify()
        if ( ! $attachment_id ) {
            wp_send_json_error( __( 'Invalid attachment ID.', 'pixlify-image-optimizer' ), 400 );
        }

        $converter = new Pixlify_Converter();
        $result    = $converter->convert_attachment( $attachment_id );

        if ( ! $result['success'] ) {
            wp_send_json_error( $result['error'], 500 );
        }

        wp_send_json_success( array(
            'attachment_id' => $attachment_id,
            'saved_bytes'   => $result['saved_bytes'] ?? 0,
        ) );
    }

    public function retry_all_errors() {
        $this->verify( 'manage_options' );

        if ( ! Pixlify_License::is_licensed() ) {
            wp_send_json_error( __( 'A valid license is required to optimize images.', 'pixlify-image-optimizer' ), 403 );
        }

        global $wpdb;

        // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.PreparedSQL.NotPrepared
        $ids = $wpdb->get_col(
            'SELECT attachment_id FROM ' . $wpdb->prefix . 'pixlify_images WHERE status = \'error\''
        );

        if ( empty( $ids ) ) {
            wp_send_json_success( array( 'retried' => 0, 'message' => __( 'No failed images found.', 'pixlify-image-optimizer' ) ) );
        }

        $converter = new Pixlify_Converter();
        $retried   = 0;
        $errors    = 0;

        foreach ( $ids as $attachment_id ) {
            $result = $converter->convert_attachment( (int) $attachment_id );
            if ( $result['success'] ) {
                $retried++;
            } else {
                $errors++;
            }
        }

        wp_send_json_success( array(
            'retried' => $retried,
            'errors'  => $errors,
            /* translators: 1: success count, 2: fail count */
            'message' => sprintf( __( '%1$d succeeded, %2$d still failed.', 'pixlify-image-optimizer' ), $retried, $errors ),
        ) );
    }

    /**
     * Force re-optimize: reset all conversion history and rebuild the queue
     * including images that were already converted (ignores skip_converted).
     * Use this after changing the output format (e.g. AVIF → both WebP+AVIF).
     */
    public function force_reoptimize() {
        $this->verify( 'manage_options' );

        if ( ! Pixlify_License::is_licensed() ) {
            wp_send_json_error( __( 'A valid license is required to run batch optimization.', 'pixlify-image-optimizer' ), 403 );
        }

        // 1. Clear the batch lock so nothing is considered "running".
        delete_transient( 'pixlify_batch_running' );

        // 2. Reset all conversion records so every image is eligible again.
        $queue = new Pixlify_Queue();
        $queue->reset_history();

        // 3. Rebuild queue with $force=true (bypass skip_converted entirely).
        $total = $queue->build_queue( true );
        update_option( 'pixlify_queue_total', $total );

        // 4. Reset global stats so the dashboard shows fresh numbers.
        update_option( 'pixlify_stats', array( 'total_converted' => 0, 'total_saved_bytes' => 0 ) );

        wp_send_json_success( array(
            'total'   => $total,
            'message' => sprintf(
                /* translators: %d: number of images queued */
                __( 'Conversion history cleared. %d images queued for re-optimization.', 'pixlify-image-optimizer' ),
                $total
            ),
        ) );
    }

    /**
     * Reset conversion history for a single attachment so it can be re-queued.
     */
    public function reset_one() {
        $this->verify( 'manage_options' );

        $attachment_id = absint( $_POST['attachment_id'] ?? 0 ); // phpcs:ignore WordPress.Security.NonceVerification.Missing -- nonce verified in $this->verify()
        if ( ! $attachment_id ) {
            wp_send_json_error( __( 'Invalid attachment ID.', 'pixlify-image-optimizer' ), 400 );
        }

        $queue = new Pixlify_Queue();
        $queue->reset_history( $attachment_id );

        wp_send_json_success( array(
            'attachment_id' => $attachment_id,
            'message'       => __( 'Conversion record cleared. Image will be re-queued on next build.', 'pixlify-image-optimizer' ),
        ) );
    }

    /**
     * Return all plugin background processes and their status.
     */
    public function get_processes() {
        $this->verify( 'manage_options' );

        $lock_active  = (bool) get_transient( 'pixlify_batch_running' );
        // Read the raw transient timeout option to compute seconds remaining.
        $lock_timeout = (int) get_option( '_transient_timeout_pixlify_batch_running', 0 );
        $lock_expires = $lock_active ? max( 0, $lock_timeout - time() ) : 0;

        $cron_next     = wp_next_scheduled( 'pixlify_cron_batch' );
        $cron_in_secs  = $cron_next ? max( 0, $cron_next - time() ) : null;
        $settings      = Pixlify_Settings::get();

        $queue_count = count( (array) get_option( Pixlify_Queue::QUEUE_OPTION, array() ) );

        wp_send_json_success( array(
            'processes' => array(
                array(
                    'id'          => 'ajax_lock',
                    'label'       => __( 'AJAX Batch Lock', 'pixlify-image-optimizer' ),
                    'description' => __( 'Prevents concurrent AJAX batches from running simultaneously.', 'pixlify-image-optimizer' ),
                    'active'      => $lock_active,
                    'status'      => $lock_active
                        ? ( $lock_expires > 0
                            ? sprintf(
                                /* translators: %d: seconds until transient expires */
                                __( 'Running — lock expires in %ds', 'pixlify-image-optimizer' ),
                                $lock_expires
                              )
                            : __( 'Running — lock expiring…', 'pixlify-image-optimizer' )
                          )
                        : __( 'Idle', 'pixlify-image-optimizer' ),
                    'killable'    => $lock_active,
                ),
                array(
                    'id'          => 'cron_batch',
                    'label'       => __( 'Cron Batch Job', 'pixlify-image-optimizer' ),
                    'description' => sprintf(
                        /* translators: %s: cron interval (e.g. "hourly") */
                        __( 'Scheduled cron — interval: %s', 'pixlify-image-optimizer' ),
                        esc_html( $settings['cron_interval'] )
                    ),
                    'active'      => (bool) $cron_next,
                    'status'      => $cron_next
                        ? sprintf(
                            /* translators: %s: human-readable time (e.g. "3m 42s") */
                            __( 'Next run in %s', 'pixlify-image-optimizer' ),
                            human_time_diff( time(), $cron_next )
                          )
                        : __( 'Not scheduled', 'pixlify-image-optimizer' ),
                    'killable'    => (bool) $cron_next,
                ),
                array(
                    'id'          => 'queue',
                    'label'       => __( 'Pending Queue', 'pixlify-image-optimizer' ),
                    'description' => __( 'Images waiting to be optimized.', 'pixlify-image-optimizer' ),
                    'active'      => $queue_count > 0,
                    'status'      => $queue_count > 0
                        ? sprintf(
                            /* translators: %d: number of images in queue */
                            __( '%d images queued', 'pixlify-image-optimizer' ),
                            $queue_count
                          )
                        : __( 'Empty', 'pixlify-image-optimizer' ),
                    'killable'    => $queue_count > 0,
                ),
            ),
        ) );
    }

    /**
     * Kill a specific process (or all at once).
     * Accepts process_id: 'ajax_lock' | 'cron_batch' | 'queue' | 'all'
     */
    public function kill_process() {
        $this->verify( 'manage_options' );

        $process_id = sanitize_key( $_POST['process_id'] ?? '' ); // phpcs:ignore WordPress.Security.NonceVerification.Missing -- nonce verified in $this->verify()

        switch ( $process_id ) {
            case 'ajax_lock':
                delete_transient( 'pixlify_batch_running' );
                break;

            case 'cron_batch':
                $cron_ts = wp_next_scheduled( 'pixlify_cron_batch' );
                if ( $cron_ts ) {
                    wp_unschedule_event( $cron_ts, 'pixlify_cron_batch' );
                }
                break;

            case 'queue':
                update_option( Pixlify_Queue::QUEUE_OPTION, array(), false );
                break;

            case 'all':
                delete_transient( 'pixlify_batch_running' );
                $cron_all = wp_next_scheduled( 'pixlify_cron_batch' );
                if ( $cron_all ) {
                    wp_unschedule_event( $cron_all, 'pixlify_cron_batch' );
                }
                update_option( Pixlify_Queue::QUEUE_OPTION, array(), false );
                break;

            default:
                wp_send_json_error( __( 'Unknown process.', 'pixlify-image-optimizer' ), 400 );
        }

        wp_send_json_success( array( 'killed' => $process_id ) );
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
