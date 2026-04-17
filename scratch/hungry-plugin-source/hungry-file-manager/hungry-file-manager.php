<?php
/**
 * Plugin Name: Hungry File Manager
 * Plugin URI: https://nandann.com/hungry-file-manager
 * Description: The comprehensive, modern file manager for WordPress. Edit, upload, and manage files with a beautiful VS Code-like interface.
 * Version: 1.0.1
 * Author: Prakhar Bhatia
 * Author URI: https://nandann.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Update URI: https://www.nandann.com/hungry-file-manager
 * Text Domain: hungry-file-manager
 * Domain Path: /languages
 * Requires at least: 6.2
 * Tested up to: 6.9
 * Requires PHP: 7.4
 *
 * @package HungryFileManager
 * @author Prakhar Bhatia <prakhar@nandann.com>
 * @copyright 2026 Nandann Creative Agency
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

// Plugin Constants.
define('NANDFILEMR_VERSION', '1.0.1');
define('NANDFILEMR_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('NANDFILEMR_PLUGIN_URL', plugin_dir_url(__FILE__));
define('NANDFILEMR_PLUGIN_BASENAME', plugin_basename(__FILE__));
define('NANDFILEMR_NONCE_ACTION', 'nandfilemr_admin_nonce');

/**
 * The code that runs during plugin activation.
 */
function nandfilemr_activate()
{
    require_once NANDFILEMR_PLUGIN_DIR . 'includes/core/class-nandfilemr-activator.php';
    Nandfilemr_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 */
function nandfilemr_deactivate()
{
    require_once NANDFILEMR_PLUGIN_DIR . 'includes/core/class-nandfilemr-deactivator.php';
    Nandfilemr_Deactivator::deactivate();
}

register_activation_hook(__FILE__, 'nandfilemr_activate');
register_deactivation_hook(__FILE__, 'nandfilemr_deactivate');

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require_once NANDFILEMR_PLUGIN_DIR . 'includes/core/class-nandfilemr-plugin.php';

/**
 * Begins execution of the plugin.
 */
function nandfilemr_run()
{
    $plugin = new Nandfilemr_Plugin();
    $plugin->run();
}

nandfilemr_run();
