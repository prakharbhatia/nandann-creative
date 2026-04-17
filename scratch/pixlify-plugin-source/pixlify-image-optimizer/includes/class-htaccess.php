<?php
/**
 * Manages WebP/AVIF serving rules in the uploads .htaccess file.
 *
 * Writes mod_rewrite rules that transparently serve .webp (or .avif) to
 * browsers that advertise support via the Accept header, without changing
 * any image URLs. Works only on Apache with mod_rewrite.
 *
 * Rule block is bracketed by marker comments so it can be safely replaced
 * or removed without disturbing any other .htaccess content.
 */
defined( 'ABSPATH' ) || exit;

class Pixlify_Htaccess {

    /** Marker used to locate our rule block inside .htaccess. */
    const MARKER = 'Pixlify Image Optimizer';

    // -------------------------------------------------------------------------
    // Public API
    // -------------------------------------------------------------------------

    /**
     * Write (or update) the rewrite rules to the uploads .htaccess.
     *
     * @param bool $webp  Include WebP redirect rule.
     * @param bool $avif  Include AVIF redirect rule (higher priority than WebP).
     * @return true|WP_Error
     */
    public static function write_rules( $webp = true, $avif = false ) {
        $htaccess = self::get_htaccess_path();
        if ( is_wp_error( $htaccess ) ) {
            return $htaccess;
        }

        $rules = self::build_rules( $webp, $avif );
        $result = insert_with_markers( $htaccess, self::MARKER, $rules );

        if ( ! $result ) {
            return new WP_Error(
                'htaccess_write_failed',
                __( 'Could not write to uploads/.htaccess. Check file permissions.', 'pixlify-image-optimizer' )
            );
        }

        return true;
    }

    /**
     * Remove the Pixlify rule block from uploads .htaccess.
     *
     * @return true|WP_Error
     */
    public static function remove_rules() {
        $htaccess = self::get_htaccess_path();
        if ( is_wp_error( $htaccess ) ) {
            return $htaccess;
        }

        $result = insert_with_markers( $htaccess, self::MARKER, array() );

        if ( ! $result ) {
            return new WP_Error(
                'htaccess_write_failed',
                __( 'Could not update uploads/.htaccess. Check file permissions.', 'pixlify-image-optimizer' )
            );
        }

        return true;
    }

    /**
     * Whether Apache mod_rewrite rules are currently in the uploads .htaccess.
     *
     * @return bool
     */
    public static function rules_active() {
        $htaccess = self::get_htaccess_path();
        if ( is_wp_error( $htaccess ) || ! file_exists( $htaccess ) ) {
            return false;
        }

        $content = file_get_contents( $htaccess ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
        return false !== $content && strpos( $content, '# BEGIN ' . self::MARKER ) !== false;
    }

    // -------------------------------------------------------------------------
    // Private helpers
    // -------------------------------------------------------------------------

    /**
     * Resolve the path to the uploads .htaccess file.
     *
     * @return string|WP_Error
     */
    private static function get_htaccess_path() {
        $upload_dir = wp_upload_dir();
        if ( ! empty( $upload_dir['error'] ) ) {
            return new WP_Error( 'uploads_error', $upload_dir['error'] );
        }

        $base = wp_normalize_path( $upload_dir['basedir'] );
        wp_mkdir_p( $base );

        return trailingslashit( $base ) . '.htaccess';
    }

    /**
     * Build the array of rewrite rule lines.
     *
     * @param bool $webp
     * @param bool $avif
     * @return string[]
     */
    private static function build_rules( $webp, $avif ) {
        $lines = array(
            '<IfModule mod_rewrite.c>',
            '  RewriteEngine On',
        );

        // AVIF rules go first — they have a smaller file size advantage.
        if ( $avif ) {
            $lines[] = '';
            $lines[] = '  # Serve .avif to browsers that support it';
            $lines[] = '  RewriteCond %{HTTP_ACCEPT} image/avif';
            $lines[] = '  RewriteCond %{REQUEST_FILENAME} (.*)\.(jpe?g|png|gif)$';
            $lines[] = '  RewriteCond %1.avif -f';
            $lines[] = '  RewriteRule ^ %1.avif [L,T=image/avif]';
        }

        if ( $webp ) {
            $lines[] = '';
            $lines[] = '  # Serve .webp to browsers that support it';
            $lines[] = '  RewriteCond %{HTTP_ACCEPT} image/webp';
            $lines[] = '  RewriteCond %{REQUEST_FILENAME} (.*)\.(jpe?g|png|gif)$';
            $lines[] = '  RewriteCond %1.webp -f';
            $lines[] = '  RewriteRule ^ %1.webp [L,T=image/webp]';
        }

        $lines[] = '</IfModule>';

        // Ensure correct Vary header so CDNs cache both variants separately.
        $lines[] = '';
        $lines[] = '<IfModule mod_headers.c>';
        $lines[] = '  <FilesMatch "\.(jpe?g|png|gif)$">';
        $lines[] = '    Header append Vary Accept';
        $lines[] = '  </FilesMatch>';
        $lines[] = '</IfModule>';

        return $lines;
    }
}
