<?php
/**
 * Converter orchestrator.
 * Delegates encoding to GD/Imagick adapters; handles file management + DB recording.
 */
defined( 'ABSPATH' ) || exit;

class Pixlify_Converter {

    /** @var Pixlify_Adapter_GD */
    private $gd;

    /** @var Pixlify_Adapter_Imagick */
    private $imagick;

    /** @var Pixlify_Resizer */
    private $resizer;

    /** @var array */
    private $settings;

    /** @var array */
    private $upload_dir;

    public function __construct() {
        $this->gd         = new Pixlify_Adapter_GD();
        $this->imagick    = new Pixlify_Adapter_Imagick();
        $this->resizer    = new Pixlify_Resizer();
        $this->settings   = Pixlify_Settings::get();
        $this->upload_dir = wp_upload_dir();
    }

    // -------------------------------------------------------------------------
    // Public API
    // -------------------------------------------------------------------------

    /**
     * Convert all sizes of a given attachment.
     *
     * @param int $attachment_id
     * @return array { success: bool, saved_bytes: int, error: string }
     */
    public function convert_attachment( $attachment_id ) {
        if ( ! wp_attachment_is_image( $attachment_id ) ) {
            return array( 'success' => false, 'error' => 'Not an image.' );
        }

        $file = get_attached_file( $attachment_id );
        if ( ! $file || ! file_exists( $file ) ) {
            return array( 'success' => false, 'error' => 'File not found: ' . esc_html( $file ) );
        }

        $mime = get_post_mime_type( $attachment_id );
        $allowed_mimes = array( 'image/jpeg', 'image/png', 'image/gif', 'image/webp' );
        if ( ! in_array( $mime, $allowed_mimes, true ) ) {
            return array( 'success' => false, 'error' => 'Unsupported mime type: ' . esc_html( $mime ) );
        }

        $total_original  = 0;
        $total_optimized = 0;
        $errors          = array();

        $files = $this->get_all_attachment_files( $attachment_id, $file );

        foreach ( $files as $src_path ) {
            $result = $this->convert_file( $src_path );
            if ( $result['success'] ) {
                $total_original  += $result['original_size'];
                $total_optimized += $result['optimized_size'];
            } else {
                $errors[] = $result['error'];
            }
        }

        $this->record_result( $attachment_id, $total_original, $total_optimized, $errors );

        if ( ! empty( $errors ) && 0 === $total_optimized ) {
            return array( 'success' => false, 'error' => implode( '; ', $errors ) );
        }

        return array(
            'success'        => true,
            'original_size'  => $total_original,
            'optimized_size' => $total_optimized,
            'saved_bytes'    => max( 0, $total_original - $total_optimized ),
        );
    }

    /**
     * Convert a single file to the configured output format(s).
     *
     * @param string $src_path
     * @return array
     */
    public function convert_file( $src_path ) {
        if ( ! file_exists( $src_path ) ) {
            return array( 'success' => false, 'error' => 'File missing: ' . esc_html( basename( $src_path ) ) );
        }

        $original_size = (int) filesize( $src_path );

        // Backup before any modification.
        if ( $this->settings['backup_original'] ) {
            $this->backup_file( $src_path );
        }

        // Resize in-place if configured.
        if ( $this->settings['resize_enabled'] ) {
            $this->resizer->maybe_resize(
                $src_path,
                (int) $this->settings['max_width'],
                (int) $this->settings['max_height']
            );
            clearstatcache( true, $src_path );
        }

        $formats      = $this->get_formats();
        $best_size    = $original_size;
        $any_success  = false;
        $lossless     = $this->settings['compression_type'] === 'lossless';
        $quality      = (int) $this->settings['quality'];

        foreach ( $formats as $format ) {
            $dest   = $this->get_converted_path( $src_path, $format );
            $result = $this->do_encode( $src_path, $dest, $format, $lossless, $quality );

            if ( $result && file_exists( $dest ) ) {
                $any_success = true;
                $conv_size   = (int) filesize( $dest );

                if ( ! $this->settings['keep_original'] && $format === $formats[0] ) {
                    $this->move_file( $dest, $src_path );
                    $best_size = $conv_size;
                } else {
                    $best_size = min( $best_size, $conv_size );
                }
            }
        }

        if ( ! $any_success ) {
            return array( 'success' => false, 'error' => 'Conversion failed for ' . esc_html( basename( $src_path ) ) );
        }

        return array(
            'success'        => true,
            'original_size'  => $original_size,
            'optimized_size' => $best_size,
        );
    }

    /**
     * Restore backed-up original for an attachment.
     *
     * @param int $attachment_id
     * @return true|WP_Error
     */
    public function restore_original( $attachment_id ) {
        $file        = get_attached_file( $attachment_id );
        $upload_base = wp_normalize_path( $this->upload_dir['basedir'] );
        $relative    = ltrim( str_replace( $upload_base, '', wp_normalize_path( $file ) ), '/\\' );
        $backup_path = wp_normalize_path( $upload_base . '/pixlify-backups/' . $relative );

        // Guard: backup path must stay within the uploads directory.
        if ( strpos( $backup_path, $upload_base ) !== 0 ) {
            return new WP_Error( 'invalid_path', __( 'Invalid backup path.', 'pixlify-image-optimizer') );
        }

        if ( ! file_exists( $backup_path ) ) {
            return new WP_Error( 'no_backup', __( 'No backup found for this image.', 'pixlify-image-optimizer') );
        }

        if ( ! copy( $backup_path, $file ) ) {
            return new WP_Error( 'copy_failed', __( 'Could not restore original file.', 'pixlify-image-optimizer') );
        }

        // Remove converted files.
        foreach ( array( 'webp', 'avif' ) as $fmt ) {
            $converted = $this->get_converted_path( $file, $fmt );
            if ( $converted !== $file && file_exists( $converted ) ) {
                wp_delete_file( $converted );
            }
        }

        // Remove DB record so image is re-queued.
        global $wpdb;
        $wpdb->delete( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
            $wpdb->prefix . 'pixlify_images',
            array( 'attachment_id' => $attachment_id ),
            array( '%d' )
        );
        wp_cache_delete( 'pixlify_io_col_' . $attachment_id, 'pixlify_io' );

        return true;
    }

    /**
     * Detect what formats the server supports.
     *
     * @return array
     */
    public static function server_capabilities() {
        $gd      = new Pixlify_Adapter_GD();
        $imagick = new Pixlify_Adapter_Imagick();

        return array(
            'gd'           => Pixlify_Adapter_GD::available(),
            'imagick'      => Pixlify_Adapter_Imagick::available(),
            'webp_gd'      => $gd->supports( 'webp' ),
            'avif_gd'      => $gd->supports( 'avif' ),
            'webp_imagick' => $imagick->supports( 'webp' ),
            'avif_imagick' => $imagick->supports( 'avif' ),
            'webp'         => $gd->supports( 'webp' ) || $imagick->supports( 'webp' ),
            'avif'         => $gd->supports( 'avif' ) || $imagick->supports( 'avif' ),
        );
    }

    /**
     * Derive the output path for a given format.
     *
     * @param string $src_path
     * @param string $format   'webp' | 'avif'
     * @return string
     */
    public function get_converted_path( $src_path, $format ) {
        $ext = strtolower( pathinfo( $src_path, PATHINFO_EXTENSION ) );
        if ( $ext === $format ) {
            return $src_path;
        }
        return substr( $src_path, 0, -strlen( $ext ) ) . $format;
    }

    // -------------------------------------------------------------------------
    // Private helpers
    // -------------------------------------------------------------------------

    /**
     * Select the best available adapter and encode.
     */
    private function do_encode( $src, $dest, $format, $lossless, $quality ) {
        // Imagick preferred — better quality and AVIF support.
        if ( $this->imagick->supports( $format ) ) {
            return $this->imagick->encode( $src, $dest, $format, $lossless, $quality );
        }
        if ( $this->gd->supports( $format ) ) {
            return $this->gd->encode( $src, $dest, $format, $lossless, $quality );
        }
        return false;
    }

    /**
     * List of formats to convert to based on settings.
     *
     * @return string[]
     */
    private function get_formats() {
        $setting = $this->settings['output_format'];
        if ( 'both' === $setting ) {
            return array( 'webp', 'avif' );
        }
        return array( $setting );
    }

    /**
     * Collect all physical files for an attachment (original + thumbnails).
     */
    private function get_all_attachment_files( $attachment_id, $original_file ) {
        $files = array( $original_file );

        if ( empty( $this->settings['convert_thumbnails'] ) ) {
            return $files;
        }

        $meta = wp_get_attachment_metadata( $attachment_id );
        $dir  = trailingslashit( dirname( $original_file ) );

        if ( ! empty( $meta['sizes'] ) && is_array( $meta['sizes'] ) ) {
            foreach ( $meta['sizes'] as $size_data ) {
                if ( empty( $size_data['file'] ) ) {
                    continue;
                }
                $thumb = $dir . $size_data['file'];
                if ( file_exists( $thumb ) ) {
                    $files[] = $thumb;
                }
            }
        }

        return array_unique( $files );
    }

    /**
     * Copy the original file to the backup directory (once only).
     */
    private function backup_file( $src_path ) {
        $upload_base = wp_normalize_path( $this->upload_dir['basedir'] );
        $norm_src    = wp_normalize_path( $src_path );
        $relative    = ltrim( str_replace( $upload_base, '', $norm_src ), '/\\' );
        $backup_dir  = wp_normalize_path( $upload_base . '/pixlify-backups/' . dirname( $relative ) );

        // Guard: backup directory must stay within the uploads directory.
        if ( strpos( $backup_dir, $upload_base ) !== 0 ) {
            return;
        }

        wp_mkdir_p( $backup_dir );
        $dest = trailingslashit( $backup_dir ) . basename( $src_path );

        if ( ! file_exists( $dest ) ) {
            copy( $src_path, $dest ); // Error intentionally ignored — backup is best-effort.
        }
    }

    /**
     * Move a file using WP_Filesystem (falls back to PHP rename on direct FS).
     *
     * @param string $source
     * @param string $destination
     * @return bool
     */
    private function move_file( $source, $destination ) {
        global $wp_filesystem;
        if ( ! function_exists( 'WP_Filesystem' ) ) {
            require_once ABSPATH . 'wp-admin/includes/file.php';
        }
        WP_Filesystem();
        if ( $wp_filesystem ) {
            return $wp_filesystem->move( $source, $destination, true );
        }
        // phpcs:ignore WordPress.WP.AlternativeFunctions.rename_rename
        return rename( $source, $destination );
    }

    /**
     * Write conversion result to DB and update running stats.
     */
    private function record_result( $attachment_id, $original_size, $optimized_size, $errors ) {
        global $wpdb;

        $status = empty( $errors ) ? 'converted' : 'error';
        $error_msg = ! empty( $errors ) ? implode( '; ', $errors ) : null;

        $wpdb->replace( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
            $wpdb->prefix . 'pixlify_images',
            array(
                'attachment_id'  => (int) $attachment_id,
                'original_size'  => (int) $original_size,
                'optimized_size' => (int) $optimized_size,
                'format'         => sanitize_key( $this->settings['output_format'] ),
                'status'         => $status,
                'error_message'  => $error_msg,
                'converted_at'   => current_time( 'mysql' ),
            ),
            array( '%d', '%d', '%d', '%s', '%s', '%s', '%s' )
        );

        // Update global stats.
        $stats = get_option( 'pixlify_stats', array( 'total_converted' => 0, 'total_saved_bytes' => 0 ) );
        if ( 'converted' === $status ) {
            $stats['total_converted']++;
            $stats['total_saved_bytes'] += max( 0, $original_size - $optimized_size );
        }
        update_option( 'pixlify_stats', $stats );
    }
}
