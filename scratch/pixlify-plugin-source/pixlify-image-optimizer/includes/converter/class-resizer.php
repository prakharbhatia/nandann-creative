<?php
/**
 * Image resizer.
 * Single responsibility: resize a file in-place when it exceeds max dimensions.
 */
defined( 'ABSPATH' ) || exit;

class Pixlify_Resizer {

    /**
     * Resize $file_path in-place if it exceeds the given max dimensions.
     * Aspect ratio is always preserved.
     *
     * @param string $file_path  Absolute path to the image file.
     * @param int    $max_w      Maximum width in pixels (0 = no limit).
     * @param int    $max_h      Maximum height in pixels (0 = no limit).
     * @return bool  True if resized, false if already within limits or error.
     */
    public function maybe_resize( $file_path, $max_w, $max_h ) {
        if ( ! file_exists( $file_path ) ) {
            return false;
        }

        list( $width, $height ) = $this->get_dimensions( $file_path );

        $within_w = ( $max_w <= 0 || $width <= $max_w );
        $within_h = ( $max_h <= 0 || $height <= $max_h );

        if ( $within_w && $within_h ) {
            return false; // Already within limits — no resize needed.
        }

        $editor = wp_get_image_editor( $file_path );
        if ( is_wp_error( $editor ) ) {
            return false;
        }

        $editor->resize( $max_w > 0 ? $max_w : null, $max_h > 0 ? $max_h : null, false );
        $saved = $editor->save( $file_path );

        return ! is_wp_error( $saved );
    }

    /**
     * Return the pixel dimensions of an image file.
     *
     * @param string $file_path
     * @return int[]  [ $width, $height ]
     */
    public function get_dimensions( $file_path ) {
        $size = @getimagesize( $file_path ); // phpcs:ignore WordPress.PHP.NoSilencedErrors
        if ( false === $size ) {
            return array( 0, 0 );
        }
        return array( (int) $size[0], (int) $size[1] );
    }
}
