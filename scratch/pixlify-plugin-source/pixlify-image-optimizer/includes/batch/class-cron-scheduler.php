<?php
/**
 * WP-Cron scheduling for batch processing.
 * Single responsibility: schedule / unschedule the cron hook.
 */
defined( 'ABSPATH' ) || exit;

class Pixlify_Cron_Scheduler {

    const CRON_HOOK = 'pixlify_cron_batch';

    public function __construct() {
        // Wire the cron hook to the queue runner.
        add_action( self::CRON_HOOK, array( $this, 'run' ) );
    }

    public function run() {
        if ( ! Pixlify_License::is_licensed() ) {
            return;
        }
        $queue = new Pixlify_Queue();
        $queue->run_batch();
    }

    // -------------------------------------------------------------------------
    // Static scheduling helpers (called from Pixlify_Plugin)
    // -------------------------------------------------------------------------

    public static function schedule() {
        $settings = Pixlify_Settings::get();
        if ( empty( $settings['cron_enabled'] ) ) {
            return;
        }
        if ( ! wp_next_scheduled( self::CRON_HOOK ) ) {
            wp_schedule_event( time(), sanitize_key( $settings['cron_interval'] ), self::CRON_HOOK );
        }
    }

    public static function unschedule() {
        $timestamp = wp_next_scheduled( self::CRON_HOOK );
        if ( $timestamp ) {
            wp_unschedule_event( $timestamp, self::CRON_HOOK );
        }
    }

    public static function reschedule() {
        self::unschedule();
        self::schedule();
    }
}
