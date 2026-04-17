<?php
/**
 * Self-hosted update checker.
 *
 * Hooks into WordPress's native update system via the update_plugins_{hostname}
 * filter (WP 5.8+). No third-party libraries required.
 *
 * Updates are only delivered to installations with a valid (non-expired) license.
 * The plugin header must include: Update URI: https://www.nandann.com/pixlify-image-optimizer
 */
defined( 'ABSPATH' ) || exit;

class Pixlify_Updater {

    const UPDATE_URL  = 'https://www.nandann.com/api/pixlify/update-info';
    const PLUGIN_SLUG = 'pixlify-image-optimizer/pixlify-image-optimizer.php';
    const CACHE_KEY   = 'pixlify_update_info';

    public static function init() {
        add_filter( 'update_plugins_www.nandann.com', array( __CLASS__, 'check_update' ), 10, 4 );
        add_filter( 'plugins_api',                    array( __CLASS__, 'plugin_info' ),  10, 3 );
    }

    /**
     * Called by WP when it checks for updates for plugins whose Update URI
     * hostname matches 'www.nandann.com'.
     *
     * @param array|false $update      Existing update data (false = no update).
     * @param array       $plugin_data Plugin header data.
     * @param string      $plugin_file Relative plugin path (e.g. pixlify-image-optimizer/pixlify-image-optimizer.php).
     * @param array       $locales     Requested locales.
     * @return array|false
     */
    public static function check_update( $update, array $plugin_data, string $plugin_file, $locales ) {
        if ( self::PLUGIN_SLUG !== $plugin_file ) {
            return $update;
        }

        // Updates are a licensed feature — unlicensed installs do not receive them.
        if ( ! Pixlify_License::is_licensed() ) {
            return $update;
        }

        $remote = self::fetch_remote_info();
        if ( ! $remote || empty( $remote->version ) ) {
            return $update;
        }

        // Only flag as update if remote version is strictly newer.
        if ( version_compare( $remote->version, PIXLIFY_VERSION, '<=' ) ) {
            return $update;
        }

        // Build an authenticated download URL — the key is passed so the server
        // can validate the license before streaming the zip.
        $license_key  = get_option( Pixlify_License::OPTION_KEY, '' );
        $download_url = add_query_arg( array(
            'key'     => rawurlencode( $license_key ),
            'version' => rawurlencode( $remote->version ),
        ), 'https://www.nandann.com/api/pixlify/download' );

        // WP's update_plugins_{hostname} filter uses 'version' for comparison
        // and stores it as 'new_version' in the update_plugins transient.
        // Include both to be compatible across WP versions.
        return (object) array(
            'id'           => self::PLUGIN_SLUG,
            'slug'         => 'pixlify-image-optimizer',
            'plugin'       => self::PLUGIN_SLUG,
            'version'      => $remote->version,
            'new_version'  => $remote->version,
            'url'          => $remote->homepage    ?? 'https://www.nandann.com/pixlify-image-optimizer',
            'package'      => $download_url,
            'icons'        => (array) ( $remote->icons    ?? array() ),
            'banners'      => (array) ( $remote->banners  ?? array() ),
            'requires'     => $remote->requires     ?? '5.8',
            'tested'       => $remote->tested       ?? '6.9',
            'requires_php' => $remote->requires_php ?? '7.4',
        );
    }

    /**
     * Powers the "View version X.X details" modal on the WP updates/plugins screen.
     *
     * @param false|object|array $result
     * @param string             $action
     * @param object             $args
     * @return false|object
     */
    public static function plugin_info( $result, string $action, $args ) {
        if ( 'plugin_information' !== $action ) {
            return $result;
        }
        if ( empty( $args->slug ) || 'pixlify-image-optimizer' !== $args->slug ) {
            return $result;
        }
        if ( ! Pixlify_License::is_licensed() ) {
            return $result;
        }

        $remote = self::fetch_remote_info();
        if ( ! $remote ) {
            return $result;
        }

        return (object) array(
            'name'          => $remote->name         ?? 'Pixlify - WebP & Image Optimizer',
            'slug'          => 'pixlify-image-optimizer',
            'version'       => $remote->version,
            'author'        => $remote->author       ?? '<a href="https://www.nandann.com">Nandann</a>',
            'homepage'      => $remote->homepage     ?? 'https://www.nandann.com/pixlify-image-optimizer',
            'requires'      => $remote->requires     ?? '5.8',
            'tested'        => $remote->tested       ?? '6.9',
            'requires_php'  => $remote->requires_php ?? '7.4',
            'download_link' => $remote->download_url,
            'sections'      => (array) ( $remote->sections ?? array() ),
            'banners'       => (array) ( $remote->banners  ?? array() ),
        );
    }

    // ── Helpers ────────────────────────────────────────────────────────────────

    /**
     * Fetch and cache the remote update manifest.
     * Successful responses cached for 12 hours; failures cached for 1 hour
     * to avoid hammering the server on every page load.
     *
     * @return object|null  Decoded JSON object, or null on failure.
     */
    private static function fetch_remote_info(): ?object {
        $cached = get_transient( self::CACHE_KEY );
        if ( false !== $cached ) {
            return $cached ?: null; // false stored on failure → null
        }

        $response = wp_remote_get( self::UPDATE_URL, array(
            'timeout'    => 10,
            'user-agent' => 'WordPress/' . get_bloginfo( 'version' ) . '; ' . home_url(),
        ) );

        if ( is_wp_error( $response ) || 200 !== (int) wp_remote_retrieve_response_code( $response ) ) {
            set_transient( self::CACHE_KEY, false, HOUR_IN_SECONDS );
            return null;
        }

        $data = json_decode( wp_remote_retrieve_body( $response ) );
        if ( empty( $data->version ) || empty( $data->download_url ) ) {
            set_transient( self::CACHE_KEY, false, HOUR_IN_SECONDS );
            return null;
        }

        set_transient( self::CACHE_KEY, $data, 12 * HOUR_IN_SECONDS );
        return $data;
    }
}
