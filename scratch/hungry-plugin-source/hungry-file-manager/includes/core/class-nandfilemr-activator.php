<?php
/**
 * Fired during plugin activation
 *
 * @package HungryFileManager
 * @subpackage HungryFileManager/includes
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 */
class Nandfilemr_Activator
{

    /**
     * Short Description. (use period)
     *
     * Long Description.
     */
    public static function activate()
    {
        // Set default options if not exists.
        if (!get_option('nandfilemr_options')) {
            $defaults = array(
                'theme' => 'system',
                'root_path' => WP_CONTENT_DIR,
            );
            add_option('nandfilemr_options', $defaults);
        }

        // Flush rewrite rules in case we add custom endpoints/structures.
        flush_rewrite_rules();
    }
}
