<?php
defined( 'ABSPATH' ) || exit;

class Pixlify_Settings {

    const OPTION_KEY = 'pixlify_settings';

    public static function defaults() {
        return [
            // Conversion
            'convert_on_upload'    => true,
            'output_format'        => 'webp',        // webp | avif | both
            'compression_type'     => 'lossy',       // lossy | lossless
            'quality'              => 82,            // 0-100 (lossy)
            'keep_original'        => true,          // keep original file alongside converted
            'backup_original'      => true,          // backup to /pixlify-backups/ subfolder

            // Resize
            'resize_enabled'       => false,
            'max_width'            => 1920,
            'max_height'           => 1920,
            'resize_existing'      => false,

            // Batch / Cron
            'cron_enabled'         => true,
            'cron_interval'        => 'hourly',      // hourly | twicedaily | daily
            'batch_size'           => 5,             // images per cron run (conservative for shared hosting)
            'skip_converted'       => true,

            // Duplicates
            'duplicate_check_hash' => true,          // file hash comparison
            'unused_days'          => 180,           // days not referenced = unused candidate

            // WebP/AVIF serving (WordPress-level rewriter — works on nginx/WP Engine too)
            'webp_redirect'        => true,          // rewrite img URLs to .webp for supported browsers
            'avif_redirect'        => false,         // also rewrite to .avif when available (priority over webp)
            'js_bg_rewrite'        => true,          // JS MutationObserver for dynamically-set background-image styles (e.g. Elementor slideshow)

            // Misc
            'delete_data_on_uninstall' => false,
            'convert_thumbnails'   => true,
            'convert_existing'     => true,          // queue all existing media on activation
        ];
    }

    public static function get() {
        $saved    = get_option( self::OPTION_KEY, [] );
        $defaults = self::defaults();
        return wp_parse_args( $saved, $defaults );
    }

    public static function update( array $new ) {
        $current = self::get();
        $merged  = wp_parse_args( $new, $current );

        // Sanitize
        $merged['quality']        = absint( $merged['quality'] );
        $merged['quality']        = max( 1, min( 100, $merged['quality'] ) );
        $merged['max_width']      = absint( $merged['max_width'] );
        $merged['max_height']     = absint( $merged['max_height'] );
        $merged['batch_size']     = absint( $merged['batch_size'] );
        $merged['batch_size']     = max( 1, min( 100, $merged['batch_size'] ) );
        $merged['unused_days']    = absint( $merged['unused_days'] );

        $bools = [
            'convert_on_upload', 'keep_original', 'backup_original',
            'resize_enabled', 'resize_existing', 'cron_enabled',
            'skip_converted', 'duplicate_check_hash',
            'delete_data_on_uninstall', 'convert_thumbnails', 'convert_existing',
            'webp_redirect', 'avif_redirect', 'js_bg_rewrite',
        ];
        foreach ( $bools as $key ) {
            $merged[ $key ] = ! empty( $merged[ $key ] );
        }

        $merged['output_format']    = in_array( $merged['output_format'], [ 'webp', 'avif', 'both' ], true )
            ? $merged['output_format'] : 'webp';
        $merged['compression_type'] = in_array( $merged['compression_type'], [ 'lossy', 'lossless' ], true )
            ? $merged['compression_type'] : 'lossy';
        $merged['cron_interval']    = in_array( $merged['cron_interval'], [ 'hourly', 'twicedaily', 'daily' ], true )
            ? $merged['cron_interval'] : 'hourly';

        update_option( self::OPTION_KEY, $merged );
        update_option( 'pixlify_delete_data_on_uninstall', $merged['delete_data_on_uninstall'] );

        return $merged;
    }

    public static function set_defaults() {
        if ( ! get_option( self::OPTION_KEY ) ) {
            update_option( self::OPTION_KEY, self::defaults() );
        }
    }
}
