<?php
/**
 * Imagick image encoding adapter.
 * Single responsibility: encode a source file to WebP or AVIF using Imagick.
 */
defined( 'ABSPATH' ) || exit;

class Pixlify_Adapter_Imagick {

    /**
     * Whether the Imagick extension is loaded.
     */
    public static function available() {
        return extension_loaded( 'imagick' );
    }

    /**
     * Whether Imagick supports converting to $format.
     *
     * @param string $format  'webp' | 'avif'
     */
    public function supports( $format ) {
        if ( ! self::available() ) {
            return false;
        }
        $fmt_map = array(
            'webp' => 'WEBP',
            'avif' => 'AVIF',
        );
        if ( ! isset( $fmt_map[ $format ] ) ) {
            return false;
        }
        return ! empty( Imagick::queryFormats( $fmt_map[ $format ] ) );
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
        if ( ! self::available() ) {
            return false;
        }

        try {
            $imagick = new Imagick( $src );
            $imagick->stripImage(); // Remove EXIF for size + privacy.

            if ( 'webp' === $format ) {
                $imagick->setImageFormat( 'WEBP' );
                if ( $lossless ) {
                    $imagick->setOption( 'webp:lossless', 'true' );
                } else {
                    $imagick->setImageCompressionQuality( (int) $quality );
                }
            } elseif ( 'avif' === $format ) {
                $imagick->setImageFormat( 'AVIF' );
                if ( $lossless ) {
                    $imagick->setOption( 'heic:lossless', 'true' );
                } else {
                    $imagick->setImageCompressionQuality( (int) $quality );
                }
            } else {
                $imagick->destroy();
                return false;
            }

            $result = $imagick->writeImage( $dest );
            $imagick->destroy();

            return (bool) $result;
        } catch ( Exception $e ) {
            return false;
        }
    }
}
