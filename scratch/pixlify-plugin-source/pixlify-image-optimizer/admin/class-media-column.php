<?php
/**
 * Adds an "Pixlify" status column to the Media Library list view.
 */
defined( 'ABSPATH' ) || exit;

class Pixlify_Media_Column {

    public function __construct() {
        add_filter( 'manage_media_columns',       array( $this, 'add_column' ) );
        add_action( 'manage_media_custom_column', array( $this, 'render_column' ), 10, 2 );
    }

    public function add_column( $columns ) {
        $columns['pixlify_status'] = esc_html__( 'Pixlify', 'pixlify-image-optimizer');
        return $columns;
    }

    public function render_column( $column, $post_id ) {
        if ( 'pixlify_status' !== $column ) {
            return;
        }

        global $wpdb;

        $cache_key = 'pixlify_io_col_' . (int) $post_id;
        $row       = wp_cache_get( $cache_key, 'pixlify_io' );

        if ( false === $row ) {
            $row = $wpdb->get_row( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
                $wpdb->prepare(
                    'SELECT original_size, optimized_size, status, format
                     FROM ' . $wpdb->prefix . 'pixlify_images
                     WHERE attachment_id = %d',
                    (int) $post_id
                )
            );
            wp_cache_set( $cache_key, $row, 'pixlify_io', HOUR_IN_SECONDS );
        }

        if ( ! $row ) {
            echo '<span class="pixlify-badge pixlify-badge--pending">' . esc_html__( 'Pending', 'pixlify-image-optimizer') . '</span>';
            return;
        }

        if ( 'converted' === $row->status ) {
            $saved   = max( 0, (int) $row->original_size - (int) $row->optimized_size );
            $percent = $row->original_size > 0
                ? (int) round( ( $saved / (int) $row->original_size ) * 100 )
                : 0;

            printf(
                '<span class="pixlify-badge pixlify-badge--success">-%d%%</span><br><small>%s</small>',
                absint( $percent ),
                esc_html( strtoupper( $row->format ) )
            );
        } else {
            echo '<span class="pixlify-badge pixlify-badge--error">' . esc_html__( 'Error', 'pixlify-image-optimizer') . '</span>';
        }
    }
}
