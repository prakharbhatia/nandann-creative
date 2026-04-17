<?php
/**
 * Admin bootstrap — registers menu pages, enqueues assets, shows notices.
 * No page rendering or business logic here.
 */
defined( 'ABSPATH' ) || exit;

class Pixlify_Admin {

    /** @var Pixlify_Page_Dashboard */
    private $dashboard;

    /** @var Pixlify_Page_Bulk */
    private $bulk;

    /** @var Pixlify_Page_Duplicates */
    private $duplicates;

    /** @var Pixlify_Page_Settings */
    private $settings;

    /** @var Pixlify_Page_License */
    private $license;

    public function __construct() {
        $this->dashboard  = new Pixlify_Page_Dashboard();
        $this->bulk       = new Pixlify_Page_Bulk();
        $this->duplicates = new Pixlify_Page_Duplicates();
        $this->settings   = new Pixlify_Page_Settings();
        $this->license    = new Pixlify_Page_License();

        new Pixlify_Media_Column();

        add_action( 'admin_menu',            array( $this, 'register_pages' ) );
        add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_assets' ) );
        add_action( 'admin_notices',         array( $this, 'admin_notices' ) );
        add_action( 'admin_post_pixlify_check_updates', array( $this, 'handle_check_updates' ) );
        add_filter( 'plugin_action_links_' . PIXLIFY_BASENAME, array( $this, 'action_links' ) );
    }

    // -------------------------------------------------------------------------
    // Menu
    // -------------------------------------------------------------------------

    public function register_pages() {
        add_menu_page(
            __( 'Pixlify Optimizer', 'pixlify-image-optimizer'),
            __( 'Pixlify', 'pixlify-image-optimizer'),
            'manage_options',
            'pixlify',
            array( $this->dashboard, 'render' ),
            'dashicons-format-image',
            81
        );

        add_submenu_page( 'pixlify', __( 'Dashboard', 'pixlify-image-optimizer'),           __( 'Dashboard', 'pixlify-image-optimizer'),           'manage_options', 'pixlify',             array( $this->dashboard, 'render' ) );
        add_submenu_page( 'pixlify', __( 'Bulk Optimizer', 'pixlify-image-optimizer'),    __( 'Bulk Optimizer', 'pixlify-image-optimizer'),    'manage_options', 'pixlify-bulk',        array( $this->bulk, 'render' ) );
        add_submenu_page( 'pixlify', __( 'Duplicates & Unused', 'pixlify-image-optimizer'), __( 'Duplicates & Unused', 'pixlify-image-optimizer'), 'manage_options', 'pixlify-duplicates', array( $this->duplicates, 'render' ) );
        add_submenu_page( 'pixlify', __( 'Settings', 'pixlify-image-optimizer'),          __( 'Settings', 'pixlify-image-optimizer'),          'manage_options', 'pixlify-settings',    array( $this->settings, 'render' ) );

        // License page — highlighted in menu when unlicensed or expired.
        $license_status = Pixlify_License::get_status();
        $needs_key      = ! in_array( $license_status['status'], [ Pixlify_License::STATUS_VALID, Pixlify_License::STATUS_TRIAL ], true );
        $menu_label     = $needs_key
            ? __( 'License ⚠', 'pixlify-image-optimizer' )
            : __( 'License', 'pixlify-image-optimizer' );

        add_submenu_page( 'pixlify', __( 'License', 'pixlify-image-optimizer' ), $menu_label, 'manage_options', 'pixlify-license', array( $this->license, 'render' ) );
    }

    // -------------------------------------------------------------------------
    // Assets — enqueue only what each page needs
    // -------------------------------------------------------------------------

    public function enqueue_assets( $hook ) {
        $pixlify_pages = array(
            'toplevel_page_pixlify',
            'pixlify_page_pixlify-bulk',
            'pixlify_page_pixlify-duplicates',
            'pixlify_page_pixlify-settings',
            'pixlify_page_pixlify-license',
        );

        $is_pixlify_page = in_array( $hook, $pixlify_pages, true );
        $is_media_page   = 'upload.php' === $hook;

        if ( ! $is_pixlify_page && ! $is_media_page ) {
            return;
        }

        // Shared stylesheet — loaded on all Pixlify pages + media library.
        wp_enqueue_style(
            'pixlify-admin',
            PIXLIFY_URL . 'admin/css/admin.css',
            array(),
            PIXLIFY_VERSION
        );

        $settings = Pixlify_Settings::get();

        // Shared JS payload passed to every page-specific script.
        $js_data = array(
            'nonce'      => wp_create_nonce( 'pixlify_nonce' ),
            'ajax_url'   => admin_url( 'admin-ajax.php' ),
            'batch_size' => (int) $settings['batch_size'],
            'strings'    => array(
                'confirm_delete'     => __( 'Permanently delete the selected images? This cannot be undone.', 'pixlify-image-optimizer'),
                'confirm_delete_one' => __( 'Delete this image permanently?', 'pixlify-image-optimizer'),
                'scanning'           => __( 'Scanning…', 'pixlify-image-optimizer'),
                'processing'         => __( 'Processing…', 'pixlify-image-optimizer'),
                'complete'           => __( 'Complete!', 'pixlify-image-optimizer'),
                'no_results'         => __( 'No images found matching the criteria.', 'pixlify-image-optimizer'),
            ),
        );

        // Bulk optimizer page.
        if ( 'pixlify_page_pixlify-bulk' === $hook ) {
            wp_enqueue_script(
                'pixlify-bulk',
                PIXLIFY_URL . 'admin/js/bulk.js',
                array( 'jquery' ),
                PIXLIFY_VERSION,
                true
            );
            wp_localize_script( 'pixlify-bulk', 'pixlify', $js_data );
        }

        // Duplicates & unused page — also needs wp.template (underscore.js).
        if ( 'pixlify_page_pixlify-duplicates' === $hook ) {
            wp_enqueue_script( 'wp-util' ); // Provides wp.template.
            wp_enqueue_script(
                'pixlify-duplicates',
                PIXLIFY_URL . 'admin/js/duplicates.js',
                array( 'jquery', 'wp-util' ),
                PIXLIFY_VERSION,
                true
            );
            wp_localize_script( 'pixlify-duplicates', 'pixlify', $js_data );
        }

        // Settings page.
        if ( 'pixlify_page_pixlify-settings' === $hook ) {
            wp_enqueue_script(
                'pixlify-settings',
                PIXLIFY_URL . 'admin/js/settings.js',
                array( 'jquery' ),
                PIXLIFY_VERSION,
                true
            );
            wp_localize_script( 'pixlify-settings', 'pixlify', $js_data );
        }
    }

    // -------------------------------------------------------------------------
    // Notices
    // -------------------------------------------------------------------------

    public function admin_notices() {
        // These are read-only GET params used only for display after a POST→redirect→GET flow.
        // The originating POST (save_settings) is nonce-verified. No nonce is needed here.
        // phpcs:disable WordPress.Security.NonceVerification.Recommended
        $page         = isset( $_GET['page'] ) ? sanitize_key( wp_unslash( $_GET['page'] ) ) : '';
        $updated      = isset( $_GET['updated'] ) ? absint( $_GET['updated'] ) : 0;
        $current_file = isset( $GLOBALS['pagenow'] ) ? $GLOBALS['pagenow'] : '';
        // phpcs:enable WordPress.Security.NonceVerification.Recommended

        if ( $updated && 'pixlify-settings' === $page ) {
            echo '<div class="notice notice-success is-dismissible"><p>'
                . esc_html__( 'Settings saved.', 'pixlify-image-optimizer')
                . '</p></div>';
        }

        // Confirmation after "Check for Updates" from plugins list.
        // phpcs:ignore WordPress.Security.NonceVerification.Recommended
        if ( isset( $_GET['pixlify_update_checked'] ) && 'plugins.php' === $current_file ) {
            $update_data = get_site_transient( 'update_plugins' );
            $has_update  = isset( $update_data->response[ PIXLIFY_BASENAME ] );

            if ( $has_update ) {
                printf(
                    '<div class="notice notice-warning is-dismissible"><p><strong>%s</strong> %s <a href="%s">%s</a></p></div>',
                    esc_html__( 'Pixlify:', 'pixlify-image-optimizer' ),
                    esc_html__( 'A new version is available.', 'pixlify-image-optimizer' ),
                    esc_url( admin_url( 'plugins.php?plugin_status=upgrade' ) ),
                    esc_html__( 'View update →', 'pixlify-image-optimizer' )
                );
            } else {
                echo '<div class="notice notice-success is-dismissible"><p>'
                    . '<strong>' . esc_html__( 'Pixlify:', 'pixlify-image-optimizer' ) . '</strong> '
                    . esc_html__( 'You are running the latest version.', 'pixlify-image-optimizer' )
                    . '</p></div>';
            }
        }

        // License warning — shown on all Pixlify admin pages when not licensed.
        if ( str_starts_with( $page, 'pixlify' ) && 'pixlify-license' !== $page ) {
            $license_status = Pixlify_License::get_status();

            if ( Pixlify_License::STATUS_UNLICENSED === $license_status['status'] ) {
                printf(
                    '<div class="notice notice-warning"><p><strong>%s</strong> %s <a href="%s">%s</a></p></div>',
                    esc_html__( 'Pixlify:', 'pixlify-image-optimizer' ),
                    esc_html__( 'WebP & AVIF serving is paused — no license key is active.', 'pixlify-image-optimizer' ),
                    esc_url( admin_url( 'admin.php?page=pixlify-license' ) ),
                    esc_html__( 'Activate your key →', 'pixlify-image-optimizer' )
                );
            } elseif ( Pixlify_License::STATUS_EXPIRED === $license_status['status'] ) {
                printf(
                    '<div class="notice notice-error"><p><strong>%s</strong> %s <a href="%s">%s</a></p></div>',
                    esc_html__( 'Pixlify:', 'pixlify-image-optimizer' ),
                    esc_html__( 'Your license has expired. WebP & AVIF serving is paused.', 'pixlify-image-optimizer' ),
                    esc_url( admin_url( 'admin.php?page=pixlify-license' ) ),
                    esc_html__( 'Renew or enter a new key →', 'pixlify-image-optimizer' )
                );
            } elseif ( Pixlify_License::STATUS_TRIAL === $license_status['status'] && $license_status['days_left'] <= 3 ) {
                printf(
                    '<div class="notice notice-warning is-dismissible"><p><strong>%s</strong> %s <a href="%s">%s</a></p></div>',
                    esc_html__( 'Pixlify:', 'pixlify-image-optimizer' ),
                    sprintf(
                        /* translators: %d days left in trial */
                        esc_html( _n(
                            'Your trial expires in %d day.',
                            'Your trial expires in %d days.',
                            $license_status['days_left'],
                            'pixlify-image-optimizer'
                        ) ),
                        (int) $license_status['days_left']
                    ),
                    esc_url( 'https://www.nandann.com/pixlify-image-optimizer' ),
                    esc_html__( 'Get an unlimited key →', 'pixlify-image-optimizer' )
                );
            }
        }
    }

    // -------------------------------------------------------------------------
    // Plugin action links
    // -------------------------------------------------------------------------

    public function action_links( array $links ): array {
        $settings_link = '<a href="' . esc_url( admin_url( 'admin.php?page=pixlify-settings' ) ) . '">'
            . esc_html__( 'Settings', 'pixlify-image-optimizer' ) . '</a>';

        $license_link = '<a href="' . esc_url( admin_url( 'admin.php?page=pixlify-license' ) ) . '">'
            . esc_html__( 'License', 'pixlify-image-optimizer' ) . '</a>';

        $new_links = array( $settings_link, $license_link );

        if ( Pixlify_License::is_licensed() ) {
            $check_url    = wp_nonce_url(
                admin_url( 'admin-post.php?action=pixlify_check_updates' ),
                'pixlify_check_updates'
            );
            $new_links[] = '<a href="' . esc_url( $check_url ) . '">'
                . esc_html__( 'Check for Updates', 'pixlify-image-optimizer' ) . '</a>';
        }

        return array_merge( $new_links, $links );
    }

    // -------------------------------------------------------------------------
    // Check for updates handler (linked from plugins list)
    // -------------------------------------------------------------------------

    public function handle_check_updates(): void {
        check_admin_referer( 'pixlify_check_updates' );

        if ( ! current_user_can( 'manage_options' ) ) {
            wp_die( esc_html__( 'Permission denied.', 'pixlify-image-optimizer' ) );
        }

        // Clear our update manifest cache and WP's plugin update cache.
        delete_transient( Pixlify_Updater::CACHE_KEY );
        delete_site_transient( 'update_plugins' );

        // Force WordPress to re-check all plugins for updates immediately.
        wp_update_plugins();

        // Redirect back to plugins list — WP will now show the update row if available.
        wp_safe_redirect( add_query_arg(
            array( 'pixlify_update_checked' => '1' ),
            admin_url( 'plugins.php' )
        ) );
        exit;
    }
}
