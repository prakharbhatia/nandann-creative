<?php
/**
 * Plugin Name:       Pixlify - WebP & Image Optimizer
 * Plugin URI:        https://www.nandann.com/pixlify-image-optimizer
 * Update URI:        https://www.nandann.com/pixlify-image-optimizer
 * Description:       Convert images to WebP/AVIF, resize, compress lossy/lossless, batch process via cron, and detect duplicate or unused images. 100% free, no API keys, no quotas.
 * Version:           1.3.8
 * Requires at least: 5.8
 * Requires PHP:      7.4
 * Author:            Prakhar Bhatia
 * Author URI:        https://www.nandann.com
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       pixlify-image-optimizer
 */

defined('ABSPATH') || exit;

define('PIXLIFY_VERSION', '1.3.8');
define('PIXLIFY_FILE', __FILE__);
define('PIXLIFY_DIR', plugin_dir_path(__FILE__));
define('PIXLIFY_URL', plugin_dir_url(__FILE__));
define('PIXLIFY_BASENAME', plugin_basename(__FILE__));

require_once PIXLIFY_DIR . 'includes/class-loader.php';
Pixlify_Loader::init();

register_activation_hook(__FILE__, array('Pixlify_Plugin', 'activate'));
register_deactivation_hook(__FILE__, array('Pixlify_Plugin', 'deactivate'));
register_uninstall_hook(__FILE__, 'pixlify_uninstall_hook');

function pixlify_uninstall_hook()
{
    Pixlify_Plugin::uninstall();
}

