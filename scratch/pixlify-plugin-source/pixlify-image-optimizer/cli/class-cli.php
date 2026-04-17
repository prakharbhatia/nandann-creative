<?php
/**
 * WP-CLI commands for Pixlify Image Optimizer.
 *
 * Register with: WP_CLI::add_command( 'pixlify', 'Pixlify_CLI' )
 *
 * Available commands:
 *
 *   wp pixlify status
 *   wp pixlify optimize [--batch-size=<n>] [--format=<webp|avif|both>] [--force] [--dry-run]
 *   wp pixlify queue build [--force]
 *   wp pixlify queue clear
 *   wp pixlify queue status
 *   wp pixlify reset [--attachment=<id>]
 *   wp pixlify settings get [<key>]
 *   wp pixlify settings set <key> <value>
 */
defined( 'ABSPATH' ) || exit;

/**
 * Optimize images, manage queues, and configure Pixlify from the command line.
 */
class Pixlify_CLI {

    // -------------------------------------------------------------------------
    // status
    // -------------------------------------------------------------------------

    /**
     * Show overall optimization statistics and server capabilities.
     *
     * ## EXAMPLES
     *
     *   wp pixlify status
     *
     * @when after_wp_load
     */
    public function status( $args, $assoc_args ) {
        $stats    = get_option( 'pixlify_stats', array( 'total_converted' => 0, 'total_saved_bytes' => 0 ) );
        $settings = Pixlify_Settings::get();
        $queue    = new Pixlify_Queue();
        $qs       = $queue->queue_status();
        $caps     = Pixlify_Converter::server_capabilities();

        WP_CLI::line( '' );
        WP_CLI\Utils\format_items( 'table', array(
            array( 'Key' => 'Total converted',   'Value' => number_format( (int) $stats['total_converted'] ) . ' images' ),
            array( 'Key' => 'Total saved',        'Value' => size_format( (int) $stats['total_saved_bytes'] ) ),
            array( 'Key' => 'Queue remaining',    'Value' => number_format( (int) $qs['remaining'] ) ),
            array( 'Key' => 'Queue total',        'Value' => number_format( (int) $qs['total'] ) ),
            array( 'Key' => 'Batch running',      'Value' => $qs['running'] ? 'YES (lock active)' : 'no' ),
            array( 'Key' => 'Output format',      'Value' => $settings['output_format'] ),
            array( 'Key' => 'Quality',            'Value' => $settings['quality'] . '  (' . $settings['compression_type'] . ')' ),
            array( 'Key' => 'WebP serve',         'Value' => $settings['webp_redirect'] ? 'enabled' : 'disabled' ),
            array( 'Key' => 'AVIF serve',         'Value' => $settings['avif_redirect'] ? 'enabled' : 'disabled' ),
            array( 'Key' => 'Cron',               'Value' => $settings['cron_enabled'] ? $settings['cron_interval'] : 'disabled' ),
        ), array( 'Key', 'Value' ) );

        WP_CLI::line( '' );
        WP_CLI::line( 'Server capabilities:' );
        WP_CLI\Utils\format_items( 'table', array(
            array( 'Library' => 'GD',            'WebP' => self::bool_str( $caps['webp_gd'] ),      'AVIF' => self::bool_str( $caps['avif_gd'] ) ),
            array( 'Library' => 'Imagick',       'WebP' => self::bool_str( $caps['webp_imagick'] ), 'AVIF' => self::bool_str( $caps['avif_imagick'] ) ),
        ), array( 'Library', 'WebP', 'AVIF' ) );
        WP_CLI::line( '' );
    }

    // -------------------------------------------------------------------------
    // optimize
    // -------------------------------------------------------------------------

    /**
     * Run the optimizer — processes all queued images (or builds + runs in one step).
     *
     * ## OPTIONS
     *
     * [--batch-size=<n>]
     * : How many images per batch iteration. Defaults to the saved setting.
     *
     * [--format=<format>]
     * : Override output format for this run: webp, avif, or both.
     *
     * [--force]
     * : Clear conversion history first and re-process ALL images, even those
     *   already converted. Useful after changing the output format.
     *
     * [--dry-run]
     * : Show how many images would be processed without actually converting.
     *
     * ## EXAMPLES
     *
     *   wp pixlify optimize
     *   wp pixlify optimize --force --format=both
     *   wp pixlify optimize --batch-size=20 --dry-run
     *
     * @when after_wp_load
     */
    public function optimize( $args, $assoc_args ) {
        $force    = \WP_CLI\Utils\get_flag_value( $assoc_args, 'force', false );
        $dry_run  = \WP_CLI\Utils\get_flag_value( $assoc_args, 'dry-run', false );
        $format   = \WP_CLI\Utils\get_flag_value( $assoc_args, 'format', null );

        // Temporarily override format if requested.
        if ( $format ) {
            $allowed = array( 'webp', 'avif', 'both' );
            if ( ! in_array( $format, $allowed, true ) ) {
                WP_CLI::error( 'Invalid format "' . $format . '". Use: webp, avif, or both.' );
            }
            Pixlify_Settings::update( array( 'output_format' => $format ) );
            WP_CLI::line( 'Output format set to: ' . $format );
        }

        $batch_size_override = isset( $assoc_args['batch-size'] ) ? (int) $assoc_args['batch-size'] : null;
        if ( $batch_size_override ) {
            if ( $batch_size_override < 1 || $batch_size_override > 500 ) {
                WP_CLI::error( '--batch-size must be between 1 and 500.' );
            }
            Pixlify_Settings::update( array( 'batch_size' => $batch_size_override ) );
        }

        $queue = new Pixlify_Queue();

        // --force: reset history so all images are eligible.
        if ( $force ) {
            WP_CLI::line( 'Force mode: clearing conversion history…' );
            $queue->reset_history();
            update_option( 'pixlify_stats', array( 'total_converted' => 0, 'total_saved_bytes' => 0 ) );
        }

        // Build queue.
        WP_CLI::line( 'Building queue…' );
        $total = $queue->build_queue( $force );
        update_option( 'pixlify_queue_total', $total );

        if ( $total === 0 ) {
            WP_CLI::success( 'No images to process. Queue is empty.' );
            WP_CLI::line( 'Tip: use --force to re-process already-converted images.' );
            return;
        }

        WP_CLI::line( sprintf( '%d image(s) queued.', $total ) );

        if ( $dry_run ) {
            WP_CLI::success( sprintf( 'Dry run: %d image(s) would be optimized.', $total ) );
            return;
        }

        // Run batches until queue is empty.
        $settings   = Pixlify_Settings::get();
        $batch_size = (int) $settings['batch_size'];
        $converter  = new Pixlify_Converter();

        $progress   = \WP_CLI\Utils\make_progress_bar( 'Optimizing', $total );
        $done       = 0;
        $errors     = 0;

        $current_queue = (array) get_option( Pixlify_Queue::QUEUE_OPTION, array() );

        while ( ! empty( $current_queue ) ) {
            $batch = array_splice( $current_queue, 0, $batch_size );
            update_option( Pixlify_Queue::QUEUE_OPTION, $current_queue, false );

            foreach ( $batch as $attachment_id ) {
                $result = $converter->convert_attachment( (int) $attachment_id );
                if ( $result['success'] ) {
                    $done++;
                    $progress->tick();
                } else {
                    $errors++;
                    $progress->tick();
                    WP_CLI::warning( sprintf(
                        'Failed #%d: %s',
                        $attachment_id,
                        isset( $result['error'] ) ? $result['error'] : 'unknown error'
                    ) );
                }
            }
        }

        $progress->finish();

        $stats = get_option( 'pixlify_stats', array( 'total_converted' => 0, 'total_saved_bytes' => 0 ) );
        WP_CLI::success( sprintf(
            'Done. %d converted, %d failed. Total saved: %s.',
            $done,
            $errors,
            size_format( (int) $stats['total_saved_bytes'] )
        ) );
    }

    // -------------------------------------------------------------------------
    // queue
    // -------------------------------------------------------------------------

    /**
     * Manage the image processing queue.
     *
     * ## SUBCOMMANDS
     *
     *   build   Build (or rebuild) the pending queue.
     *   clear   Empty the queue without processing.
     *   status  Show queue statistics.
     *
     * ## EXAMPLES
     *
     *   wp pixlify queue build
     *   wp pixlify queue build --force
     *   wp pixlify queue clear
     *   wp pixlify queue status
     *
     * @subcommand queue
     * @when after_wp_load
     */
    public function queue( $args, $assoc_args ) {
        $subcommand = isset( $args[0] ) ? $args[0] : 'status';

        switch ( $subcommand ) {
            case 'build':
                $force = \WP_CLI\Utils\get_flag_value( $assoc_args, 'force', false );
                $q     = new Pixlify_Queue();

                if ( $force ) {
                    WP_CLI::line( 'Force mode: clearing conversion history…' );
                    $q->reset_history();
                }

                $total = $q->build_queue( $force );
                update_option( 'pixlify_queue_total', $total );
                WP_CLI::success( sprintf( 'Queue built: %d image(s) queued.', $total ) );
                break;

            case 'clear':
                update_option( Pixlify_Queue::QUEUE_OPTION, array(), false );
                delete_transient( 'pixlify_batch_running' );
                WP_CLI::success( 'Queue cleared.' );
                break;

            case 'status':
                $q  = new Pixlify_Queue();
                $qs = $q->queue_status();
                WP_CLI\Utils\format_items( 'table', array(
                    array( 'Key' => 'Total queued',   'Value' => number_format( (int) $qs['total'] ) ),
                    array( 'Key' => 'Processed',      'Value' => number_format( (int) $qs['processed'] ) ),
                    array( 'Key' => 'Remaining',      'Value' => number_format( (int) $qs['remaining'] ) ),
                    array( 'Key' => 'Percent',        'Value' => $qs['percent'] . '%' ),
                    array( 'Key' => 'Batch running',  'Value' => $qs['running'] ? 'YES' : 'no' ),
                ), array( 'Key', 'Value' ) );
                break;

            default:
                WP_CLI::error( 'Unknown subcommand "' . $subcommand . '". Use: build, clear, status.' );
        }
    }

    // -------------------------------------------------------------------------
    // reset
    // -------------------------------------------------------------------------

    /**
     * Clear conversion history so images can be re-optimized.
     *
     * ## OPTIONS
     *
     * [--attachment=<id>]
     * : Reset only this specific attachment ID. If omitted, resets ALL records.
     *
     * [--yes]
     * : Skip the confirmation prompt when resetting all records.
     *
     * ## EXAMPLES
     *
     *   wp pixlify reset
     *   wp pixlify reset --yes
     *   wp pixlify reset --attachment=42
     *
     * @when after_wp_load
     */
    public function reset( $args, $assoc_args ) {
        $attachment_id = isset( $assoc_args['attachment'] ) ? (int) $assoc_args['attachment'] : null;
        $skip_confirm  = \WP_CLI\Utils\get_flag_value( $assoc_args, 'yes', false );

        if ( null === $attachment_id && ! $skip_confirm ) {
            WP_CLI::confirm( 'This will delete ALL conversion history. Images will be re-queued on the next build. Continue?' );
        }

        $queue   = new Pixlify_Queue();
        $deleted = $queue->reset_history( $attachment_id );

        if ( null !== $attachment_id ) {
            WP_CLI::success( sprintf( 'Conversion record cleared for attachment #%d.', $attachment_id ) );
        } else {
            update_option( 'pixlify_stats', array( 'total_converted' => 0, 'total_saved_bytes' => 0 ) );
            WP_CLI::success( 'All conversion history cleared. Run `wp pixlify queue build` to re-queue images.' );
        }
    }

    // -------------------------------------------------------------------------
    // settings
    // -------------------------------------------------------------------------

    /**
     * Read or update plugin settings.
     *
     * ## SUBCOMMANDS
     *
     *   get [<key>]          Print one or all settings.
     *   set <key> <value>    Update a single setting.
     *
     * ## EXAMPLES
     *
     *   wp pixlify settings get
     *   wp pixlify settings get output_format
     *   wp pixlify settings set output_format both
     *   wp pixlify settings set quality 85
     *   wp pixlify settings set webp_redirect true
     *   wp pixlify settings set avif_redirect true
     *
     * @subcommand settings
     * @when after_wp_load
     */
    public function settings( $args, $assoc_args ) {
        $subcommand = isset( $args[0] ) ? $args[0] : 'get';

        switch ( $subcommand ) {
            case 'get':
                $current = Pixlify_Settings::get();
                $key     = isset( $args[1] ) ? $args[1] : null;

                if ( $key ) {
                    if ( ! array_key_exists( $key, $current ) ) {
                        WP_CLI::error( 'Unknown setting "' . $key . '".' );
                    }
                    $val = $current[ $key ];
                    WP_CLI::line( is_bool( $val ) ? ( $val ? 'true' : 'false' ) : (string) $val );
                } else {
                    $rows = array();
                    foreach ( $current as $k => $v ) {
                        $rows[] = array(
                            'Key'   => $k,
                            'Value' => is_bool( $v ) ? ( $v ? 'true' : 'false' ) : (string) $v,
                        );
                    }
                    WP_CLI\Utils\format_items( 'table', $rows, array( 'Key', 'Value' ) );
                }
                break;

            case 'set':
                if ( ! isset( $args[1], $args[2] ) ) {
                    WP_CLI::error( 'Usage: wp pixlify settings set <key> <value>' );
                }
                $key      = $args[1];
                $raw_val  = $args[2];
                $current  = Pixlify_Settings::get();

                if ( ! array_key_exists( $key, $current ) ) {
                    WP_CLI::error( 'Unknown setting "' . $key . '". Run `wp pixlify settings get` to see all keys.' );
                }

                // Coerce booleans.
                $bool_vals = array( 'true' => true, '1' => true, 'yes' => true, 'false' => false, '0' => false, 'no' => false );
                if ( is_bool( $current[ $key ] ) ) {
                    $lower = strtolower( $raw_val );
                    if ( ! array_key_exists( $lower, $bool_vals ) ) {
                        WP_CLI::error( '"' . $key . '" is a boolean. Use: true/false, 1/0, yes/no.' );
                    }
                    $raw_val = $bool_vals[ $lower ];
                }

                $merged = Pixlify_Settings::update( array( $key => $raw_val ) );
                $saved  = $merged[ $key ];
                WP_CLI::success( sprintf( 'Setting "%s" updated to: %s', $key, is_bool( $saved ) ? ( $saved ? 'true' : 'false' ) : (string) $saved ) );
                break;

            default:
                WP_CLI::error( 'Unknown subcommand "' . $subcommand . '". Use: get, set.' );
        }
    }

    // -------------------------------------------------------------------------
    // Private helpers
    // -------------------------------------------------------------------------

    private static function bool_str( $val ) {
        return $val ? '✓ yes' : '✗ no';
    }
}
