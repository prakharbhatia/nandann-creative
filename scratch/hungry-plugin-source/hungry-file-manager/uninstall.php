<?php
/**
 * Fired when the plugin is uninstalled.
 *
 * @package HungryFileManager
 */

// If uninstall not called from WordPress, then exit.
if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

// Delete options.
delete_option('nandfilemr_options');

// Drop tables if custom tables exist (not yet, but good practice).
global $wpdb;
// $wpdb->query( "DROP TABLE IF EXISTS {$wpdb->prefix}nandfilemr_logs" );
