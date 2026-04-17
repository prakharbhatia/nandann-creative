<?php
/**
 * API Base Controller
 *
 * @package HungryFileManager
 * @subpackage HungryFileManager/includes/api
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class Nandfilemr_Api_Base
 */
abstract class Nandfilemr_Api_Base
{

    /**
     * API Namespace.
     *
     * @var string
     */
    protected $namespace = 'nandfilemr/v1';

    /**
     * Register routes.
     */
    abstract public function register_routes();

    /**
     * Check if user allowed.
     *
     * @param WP_REST_Request $request Request object.
     * @return bool|WP_Error
     */
    public function check_permission($request)
    {
        $nonce = $request->get_header('X-WP-Nonce');
        if (!wp_verify_nonce($nonce, 'wp_rest')) {
            return new WP_Error('rest_forbidden', __('Invalid nonce.', 'hungry-file-manager'), array('status' => 403));
        }

        if (!current_user_can('manage_options')) {
            return new WP_Error('rest_forbidden', __('Permission denied.', 'hungry-file-manager'), array('status' => 403));
        }

        return Nandfilemr_Security::verify_api_request();
    }
}
