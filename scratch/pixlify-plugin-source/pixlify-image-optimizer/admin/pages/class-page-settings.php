<?php
/**
 * Settings page — handles the save POST and renders the view.
 */
defined( 'ABSPATH' ) || exit;

class Pixlify_Page_Settings {

    public function __construct() {
        add_action( 'admin_post_pixlify_save_settings', array( $this, 'save' ) );
    }

    public function save() {
        check_admin_referer( 'pixlify_save_settings' );

        if ( ! current_user_can( 'manage_options' ) ) {
            wp_die( esc_html__( 'You do not have permission to change these settings.', 'pixlify-image-optimizer') );
        }

        // Each individual field is sanitized inside Pixlify_Settings::update().
        $raw = array();
        if ( isset( $_POST['pixlify'] ) && is_array( $_POST['pixlify'] ) ) {
            $raw = wp_unslash( $_POST['pixlify'] ); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
        }
        $saved = Pixlify_Settings::update( $raw );
        Pixlify_Cron_Scheduler::reschedule();

        // Sync .htaccess redirect rules — only write if licensed; always allow removal.
        if ( ! empty( $saved['webp_redirect'] ) && Pixlify_License::is_licensed() ) {
            Pixlify_Htaccess::write_rules( true, ! empty( $saved['avif_redirect'] ) );
        } else {
            Pixlify_Htaccess::remove_rules();
        }

        wp_safe_redirect(
            add_query_arg( 'updated', '1', admin_url( 'admin.php?page=pixlify-settings' ) )
        );
        exit;
    }

    public function render() {
        $s    = Pixlify_Settings::get();
        $caps = Pixlify_Converter::server_capabilities();
        require PIXLIFY_DIR . 'admin/views/page-settings.php';
    }
}
