<?php
/**
 * GD library image encoding adapter.
 * Single responsibility: encode a source file to WebP or AVIF using GD.
 */
defined( 'ABSPATH' ) || exit;

class Pixlify_Adapter_GD {

    /**
     * Whether GD is loaded on this server.
     */
    public static function available() {
        return function_exists( 'imagecreatefromjpeg' );
    }

    /**
     * Whether this adapter supports converting to $format.
     *
     * @param string $format  'webp' | 'avif'
     */
    public function supports( $format ) {
        if ( ! self::available() ) {
            return false;
        }
        if ( 'webp' === $format ) {
            return function_exists( 'imagewebp' );
        }
        if ( 'avif' === $format ) {
            return function_exists( 'imageavif' );
        }
        return false;
    }

    /**
     * Encode $src to $dest in $format.
     *
     * @param string $src       Absolute path to source file.
     * @param string $dest      Absolute path for output file.
     * @param string $format    'webp' | 'avif'
     * @param bool   $lossless  True = lossless, false = lossy.
     * @param int    $quality   1–100 (lossy only).
     * @return bool
     */
    public function encode( $src, $dest, $format, $lossless, $quality ) {
        $mime  = $this->get_mime( $src );
        $image = $this->create_image_resource( $mime, $src );

        if ( false === $image ) {
            return false;
        }

        // Preserve transparency for PNG / GIF.
        imagepalettetotruecolor( $image );
        imagealphablending( $image, false );
        imagesavealpha( $image, true );

        // GD encodes lossless as quality = -1.
        $gd_quality = $lossless ? -1 : (int) $quality;
        $result     = false;

        if ( 'webp' === $format && function_exists( 'imagewebp' ) ) {
            $result = imagewebp( $image, $dest, $gd_quality );
        } elseif ( 'avif' === $format && function_exists( 'imageavif' ) ) {
            $result = imageavif( $image, $dest, $gd_quality );
        }

        imagedestroy( $image );
        return (bool) $result;
    }

    // -------------------------------------------------------------------------
    // Private helpers
    // -------------------------------------------------------------------------

    /**
     * Load a GD image resource from a file path.
     * Uses explicit function calls instead of match() for PHP 7.4 compatibility.
     *
     * @param string $mime  MIME type of the source file.
     * @param string $src   Absolute path.
     * @return resource|GdImage|false
     */
    private function create_image_resource( $mime, $src ) {
        if ( 'image/jpeg' === $mime ) {
            return imagecreatefromjpeg( $src );
        }
        if ( 'image/png' === $mime ) {
            return imagecreatefrompng( $src );
        }
        if ( 'image/gif' === $mime ) {
            return imagecreatefromgif( $src );
        }
        if ( 'image/webp' === $mime ) {
            return imagecreatefromwebp( $src );
        }
        return false;
    }

    /**
     * Detect MIME type of a file.
     */
    private function get_mime( $path ) {
        if ( function_exists( 'mime_content_type' ) ) {
            return mime_content_type( $path );
        }
        // Fallback: derive from extension.
        $ext_map = array(
            'jpg'  => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'png'  => 'image/png',
            'gif'  => 'image/gif',
            'webp' => 'image/webp',
        );
        $ext = strtolower( pathinfo( $path, PATHINFO_EXTENSION ) );
        return isset( $ext_map[ $ext ] ) ? $ext_map[ $ext ] : 'application/octet-stream';
    }
}
