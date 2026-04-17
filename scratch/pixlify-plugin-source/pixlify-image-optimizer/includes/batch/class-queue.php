<?php
/**
 * Batch queue management.
 * Builds the pending queue, tracks progress, runs one batch of conversions.
 */
defined( 'ABSPATH' ) || exit;

class Pixlify_Queue {

    const QUEUE_OPTION = 'pixlify_pending_queue';

    // -------------------------------------------------------------------------
    // Queue management
    // -------------------------------------------------------------------------

    /**
     * Build (or rebuild) the queue with all unprocessed image attachments.
     *
     * @param bool $force  When true, ignore skip_converted and queue ALL images
     *                     (used after format changes to re-process already-converted images).
     * @return int  Number of images queued.
     */
    public function build_queue( $force = false ) {
        global $wpdb;

        $settings = Pixlify_Settings::get();
        $exclude  = array();

        if ( ! $force && ! empty( $settings['skip_converted'] ) ) {
            $cache_key = 'pixlify_io_converted_ids';
            $exclude   = wp_cache_get( $cache_key, 'pixlify_io' );
            if ( false === $exclude ) {
                // Table name built from trusted $wpdb->prefix — no user input.
                // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.PreparedSQL.NotPrepared
                $exclude = $wpdb->get_col( 'SELECT attachment_id FROM ' . $wpdb->prefix . 'pixlify_images WHERE status = \'converted\'' );
                $exclude = array_map( 'intval', (array) $exclude );
                wp_cache_set( $cache_key, $exclude, 'pixlify_io', MINUTE_IN_SECONDS );
            }
        }

        $args = array(
            'post_type'      => 'attachment',
            'post_mime_type' => array( 'image/jpeg', 'image/png', 'image/gif' ),
            'post_status'    => 'inherit',
            'posts_per_page' => -1,
            'fields'         => 'ids',
        );

        if ( ! empty( $exclude ) ) {
            // phpcs:ignore WordPressVIPMinimum.Performance.WPQueryParams.PostNotIn_post__not_in -- intentionally limited to already-converted IDs only
            $args['post__not_in'] = $exclude;
        }

        $ids = get_posts( $args );
        update_option( self::QUEUE_OPTION, $ids, false );

        return count( $ids );
    }

    /**
     * Reset conversion history for all (or specific) attachment(s) so they
     * can be re-processed by the next queue build.
     *
     * @param int|null $attachment_id  If provided, reset only this attachment.
     *                                  If null, reset ALL records.
     * @return int  Number of rows deleted.
     */
    public function reset_history( $attachment_id = null ) {
        global $wpdb;

        if ( null !== $attachment_id ) {
            $deleted = $wpdb->delete( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
                $wpdb->prefix . 'pixlify_images',
                array( 'attachment_id' => (int) $attachment_id ),
                array( '%d' )
            );
            wp_cache_delete( 'pixlify_io_col_' . (int) $attachment_id, 'pixlify_io' );
        } else {
            // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.PreparedSQL.NotPrepared
            $deleted = $wpdb->query( 'TRUNCATE TABLE ' . $wpdb->prefix . 'pixlify_images' );
            wp_cache_delete( 'pixlify_io_converted_ids', 'pixlify_io' );
        }

        return (int) $deleted;
    }

    /**
     * Get current queue progress statistics.
     *
     * @return array { total, remaining, processed, percent, running }
     */
    public function queue_status() {
        $queue     = (array) get_option( self::QUEUE_OPTION, array() );
        $total     = (int) get_option( 'pixlify_queue_total', count( $queue ) );
        $remaining = count( $queue );
        $processed = max( 0, $total - $remaining );

        return array(
            'total'     => $total,
            'remaining' => $remaining,
            'processed' => $processed,
            'percent'   => $total > 0 ? (int) round( ( $processed / $total ) * 100 ) : 0,
            'running'   => (bool) get_transient( 'pixlify_batch_running' ),
        );
    }

    // -------------------------------------------------------------------------
    // Batch execution
    // -------------------------------------------------------------------------

    /**
     * Process one batch of images.
     * Uses a transient lock to prevent concurrent runs.
     *
     * Resilience notes:
     * - ignore_user_abort: PHP keeps running even if the AJAX request disconnects.
     * - Time guard: stops before PHP max_execution_time is hit so the lock is
     *   always released and partial progress is never lost.
     * - Per-image queue save: every converted image is removed from the stored
     *   queue immediately, so a PHP fatal mid-batch doesn't re-queue work already done.
     *
     * @return array { processed, remaining, skipped? }
     */
    public function run_batch() {
        if ( get_transient( 'pixlify_batch_running' ) ) {
            return array( 'processed' => 0, 'remaining' => 0, 'skipped' => true );
        }

        // Keep running even if the browser disconnects; try to extend the time limit.
        ignore_user_abort( true );
        @set_time_limit( 120 ); // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged, Squiz.PHP.DiscouragedFunctions.Discouraged -- may be disabled by host; failure is non-fatal, time-limit extension is intentional for long-running batch jobs

        // Lock TTL: long enough to survive the full batch, short enough to auto-unlock after a fatal crash.
        set_transient( 'pixlify_batch_running', 1, 150 );

        $settings   = Pixlify_Settings::get();
        $batch_size = max( 1, (int) $settings['batch_size'] );
        $queue      = (array) get_option( self::QUEUE_OPTION, array() );

        if ( empty( $queue ) ) {
            delete_transient( 'pixlify_batch_running' );
            return array( 'processed' => 0, 'remaining' => 0 );
        }

        $converter   = new Pixlify_Converter();
        $processed   = 0;
        $results     = array();
        $time_start  = microtime( true );

        // Dynamic time guard: use 75 % of PHP's max_execution_time so we stop
        // well before the hard kill, yet take full advantage of the server limit.
        // @set_time_limit(120) above may raise it; read the value after that call.
        $max_exec   = (int) ini_get( 'max_execution_time' );
        $time_limit = ( $max_exec > 0 ) ? min( 55.0, (float) $max_exec * 0.75 ) : 50.0;

        while ( $processed < $batch_size && ! empty( $queue ) ) {
            $elapsed = microtime( true ) - $time_start;

            // Abort early if we are approaching the execution time limit.
            if ( $elapsed > $time_limit ) {
                $results[] = array(
                    'id'      => 0,
                    'name'    => '',
                    'success' => false,
                    'error'   => sprintf( 'Time limit reached after %.1f s — batch stopped early to avoid server timeout. Next batch will continue.', $elapsed ),
                    'saved'   => '',
                    'elapsed' => round( $elapsed, 2 ),
                );
                break;
            }

            $attachment_id = (int) array_shift( $queue );
            $file          = get_attached_file( $attachment_id );
            $name          = $file ? basename( $file ) : "ID #{$attachment_id}";
            $img_start     = microtime( true );

            $result = $converter->convert_attachment( $attachment_id );

            $img_elapsed = round( microtime( true ) - $img_start, 2 );
            $processed++;

            if ( $result['success'] ) {
                $results[] = array(
                    'id'      => $attachment_id,
                    'name'    => $name,
                    'success' => true,
                    'saved'   => isset( $result['saved_bytes'] ) ? size_format( (int) $result['saved_bytes'] ) : '0 B',
                    'elapsed' => $img_elapsed,
                );
            } else {
                $results[] = array(
                    'id'      => $attachment_id,
                    'name'    => $name,
                    'success' => false,
                    'error'   => isset( $result['error'] ) ? $result['error'] : 'Unknown error',
                    'saved'   => '',
                    'elapsed' => $img_elapsed,
                );
            }

            // Persist remaining queue after every image so a crash never
            // re-queues already-converted work.
            update_option( self::QUEUE_OPTION, $queue, false );
        }

        $total_elapsed = round( microtime( true ) - $time_start, 2 );
        delete_transient( 'pixlify_batch_running' );

        return array(
            'processed'     => $processed,
            'remaining'     => count( $queue ),
            'results'       => $results,
            'total_elapsed' => $total_elapsed,
        );
    }

    /**
     * Force-release the batch lock (use when a PHP crash left it stuck).
     */
    public function release_lock() {
        delete_transient( 'pixlify_batch_running' );
    }
}
