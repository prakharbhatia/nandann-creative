<?php
/**
 * Duplicates & Unused page — prepares settings and renders the view.
 */
defined( 'ABSPATH' ) || exit;

class Pixlify_Page_Duplicates {

    public function render() {
        $settings = Pixlify_Settings::get();
        require PIXLIFY_DIR . 'admin/views/page-duplicates.php';
    }
}
