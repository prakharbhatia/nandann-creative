<?php
/**
 * Self-hosted update checker for Hungry File Manager.
 *
 * Hooks into WordPress's native update system via the update_plugins_{hostname}
 * filter (WP 5.8+). No third-party libraries required.
 *
 * The plugin header must include: Update URI: https://www.nandann.com/hungry-file-manager
 */
defined('ABSPATH') || exit;

class Nandfilemr_Updater
{

    const UPDATE_URL  = 'https://www.nandann.com/api/hungry-file-manager/update-info';
    const PLUGIN_SLUG = 'hungry-file-manager/hungry-file-manager.php';
    const CACHE_KEY   = 'nandfilemr_update_info';

    public static function init()
    {
        add_filter('update_plugins_www.nandann.com', array(__CLASS__, 'check_update'), 10, 4);
        add_filter('plugins_api',                    array(__CLASS__, 'plugin_info'),  10, 3);
    }

    /**
     * Called by WP when it checks for updates for plugins whose Update URI
     * hostname matches 'www.nandann.com'.
     *
     * @param array|false $update      Existing update data (false = no update).
     * @param array       $plugin_data Plugin header data.
     * @param string      $plugin_file Relative plugin path.
     * @param array       $locales     Requested locales.
     * @return array|false
     */
    public static function check_update($update, array $plugin_data, string $plugin_file, $locales)
    {
        if (self::PLUGIN_SLUG !== $plugin_file) {
            return $update;
        }

        $remote = self::fetch_remote_info();
        if (!$remote || empty($remote->version)) {
            return $update;
        }

        // Only flag as update if remote version is strictly newer.
        if (version_compare($remote->version, NANDFILEMR_VERSION, '<=')) {
            return $update;
        }

        // Free plugin - direct download URL.
        $download_url = $remote->download_url ?? 'https://www.nandann.com/api/hungry-file-manager/download';

        return (object) array(
            'id'           => self::PLUGIN_SLUG,
            'slug'         => 'hungry-file-manager',
            'plugin'       => self::PLUGIN_SLUG,
            'version'      => $remote->version,
            'new_version'  => $remote->version,
            'url'          => $remote->homepage    ?? 'https://www.nandann.com/hungry-file-manager',
            'package'      => $download_url,
            'icons'        => (array) ($remote->icons    ?? array()),
            'banners'      => (array) ($remote->banners  ?? array()),
            'requires'     => $remote->requires     ?? '6.2',
            'tested'       => $remote->tested       ?? '6.9',
            'requires_php' => $remote->requires_php ?? '7.4',
        );
    }

    /**
     * Powers the "View details" modal on the WP updates/plugins screen.
     *
     * @param false|object|array $result
     * @param string             $action
     * @param object             $args
     * @return false|object
     */
    public static function plugin_info($result, string $action, $args)
    {
        if ('plugin_information' !== $action) {
            return $result;
        }
        if (empty($args->slug) || 'hungry-file-manager' !== $args->slug) {
            return $result;
        }

        $remote = self::fetch_remote_info();
        if (!$remote) {
            return $result;
        }

        return (object) array(
            'name'          => $remote->name         ?? 'Hungry File Manager',
            'slug'          => 'hungry-file-manager',
            'version'       => $remote->version,
            'author'        => $remote->author       ?? '<a href="https://www.nandann.com">Nandann</a>',
            'homepage'      => $remote->homepage     ?? 'https://www.nandann.com/hungry-file-manager',
            'requires'      => $remote->requires     ?? '6.2',
            'tested'        => $remote->tested       ?? '6.9',
            'requires_php'  => $remote->requires_php ?? '7.4',
            'download_link' => $remote->download_url,
            'sections'      => (array) ($remote->sections ?? array()),
            'banners'       => (array) ($remote->banners  ?? array()),
        );
    }

    /**
     * Fetch and cache the remote update manifest.
     */
    private static function fetch_remote_info(): ?object
    {
        $cached = get_transient(self::CACHE_KEY);
        if (false !== $cached) {
            return $cached ?: null;
        }

        $response = wp_remote_get(self::UPDATE_URL, array(
            'timeout'    => 10,
            'user-agent' => 'WordPress/' . get_bloginfo('version') . '; ' . home_url(),
        ));

        if (is_wp_error($response) || 200 !== (int) wp_remote_retrieve_response_code($response)) {
            set_transient(self::CACHE_KEY, false, HOUR_IN_SECONDS);
            return null;
        }

        $data = json_decode(wp_remote_retrieve_body($response));
        if (empty($data->version) || empty($data->download_url)) {
            set_transient(self::CACHE_KEY, false, HOUR_IN_SECONDS);
            return null;
        }

        set_transient(self::CACHE_KEY, $data, 12 * HOUR_IN_SECONDS);
        return $data;
    }
}
