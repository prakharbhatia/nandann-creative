<?php
/**
 * Loads all plugin classes in correct dependency order.
 * Single place to register new files.
 */
defined( 'ABSPATH' ) || exit;

class Pixlify_Loader {

    public static function init() {
        // 1. License — must be loaded first so all other classes can call Pixlify_License.
        require_once PIXLIFY_DIR . 'includes/class-license.php';
        // Register the server re-validation cron action on every load so the
        // callback is always available when WP cron fires the event.
        add_action( Pixlify_License::SERVER_CHECK_HOOK, array( 'Pixlify_License', 'run_server_check' ) );

        // 1b. Updater — depends on license class; hooks into WP update system.
        require_once PIXLIFY_DIR . 'includes/class-updater.php';
        add_action( 'init', array( 'Pixlify_Updater', 'init' ) );

        // 2. Settings — no plugin dependencies.
        require_once PIXLIFY_DIR . 'includes/class-settings.php';

        // 2. Converter adapters — no plugin dependencies.
        require_once PIXLIFY_DIR . 'includes/converter/class-adapter-gd.php';
        require_once PIXLIFY_DIR . 'includes/converter/class-adapter-imagick.php';
        require_once PIXLIFY_DIR . 'includes/converter/class-resizer.php';

        // 3. Converter orchestrator — depends on adapters + settings.
        require_once PIXLIFY_DIR . 'includes/converter/class-converter.php';

        // 4. Batch processing — depends on converter + settings.
        require_once PIXLIFY_DIR . 'includes/batch/class-queue.php';
        require_once PIXLIFY_DIR . 'includes/batch/class-cron-scheduler.php';

        // 5. Duplicate detector — depends on settings.
        require_once PIXLIFY_DIR . 'includes/duplicates/class-duplicate-detector.php';

        // 5b. .htaccess manager — no plugin dependencies.
        require_once PIXLIFY_DIR . 'includes/class-htaccess.php';

        // 5c. Frontend URL rewriter — works on any host (nginx, Apache, WP Engine, etc.).
        require_once PIXLIFY_DIR . 'includes/class-rewriter.php';

        // 6. AJAX handlers — depend on domain classes.
        // Loaded unconditionally: admin-ajax.php requests need them on non-admin context.
        require_once PIXLIFY_DIR . 'ajax/class-ajax-batch.php';
        require_once PIXLIFY_DIR . 'ajax/class-ajax-duplicates.php';

        // 7. Admin layer — only on dashboard requests.
        if ( is_admin() ) {
            require_once PIXLIFY_DIR . 'admin/class-media-column.php';
            require_once PIXLIFY_DIR . 'admin/pages/class-page-dashboard.php';
            require_once PIXLIFY_DIR . 'admin/pages/class-page-bulk.php';
            require_once PIXLIFY_DIR . 'admin/pages/class-page-duplicates.php';
            require_once PIXLIFY_DIR . 'admin/pages/class-page-settings.php';
            require_once PIXLIFY_DIR . 'admin/pages/class-page-license.php';
            require_once PIXLIFY_DIR . 'admin/class-admin.php';
        }

        // 8. Plugin singleton — depends on everything above.
        require_once PIXLIFY_DIR . 'includes/class-plugin.php';

        add_action( 'plugins_loaded', array( 'Pixlify_Plugin', 'get_instance' ) );

        // 9. WP-CLI commands — only when WP-CLI is running.
        if ( defined( 'WP_CLI' ) && WP_CLI ) {
            require_once PIXLIFY_DIR . 'cli/class-cli.php';
            WP_CLI::add_command( 'pixlify', 'Pixlify_CLI' );
        }
    }
}
