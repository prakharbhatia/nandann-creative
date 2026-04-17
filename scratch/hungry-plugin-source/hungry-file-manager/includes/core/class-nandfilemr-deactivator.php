<?php
/**
 * Fired during plugin deactivation
 *
 * @package HungryFileManager
 * @subpackage HungryFileManager/includes
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Fired during plugin deactivation.
 *
 * This class defines all code necessary to run during the plugin's deactivation.
 */
class Nandfilemr_Deactivator
{

    /**
     * Short Description. (use period)
     *
     * Long Description.
     */
    public static function deactivate()
    {
        flush_rewrite_rules();
    }
}
