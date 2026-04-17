<?php
/**
 * Settings API Controller
 *
 * @package HungryFileManager
 * @subpackage HungryFileManager/includes/api
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class Nandfilemr_Api_Settings
 */
class Nandfilemr_Api_Settings extends Nandfilemr_Api_Base
{

    /**
     * Register routes.
     */
    public function register_routes()
    {
        // GET /settings - Get options
        register_rest_route(
            $this->namespace,
            '/settings',
            array(
                'methods' => WP_REST_Server::READABLE,
                'callback' => array($this, 'get_settings'),
                'permission_callback' => array($this, 'check_permission'),
            )
        );

        // POST /settings - Update options
        register_rest_route(
            $this->namespace,
            '/settings',
            array(
                'methods' => WP_REST_Server::EDITABLE,
                'callback' => array($this, 'update_settings'),
                'permission_callback' => array($this, 'check_permission'),
                'args' => array(
                    'theme' => array(
                        'type' => 'string',
                        'sanitize_callback' => 'sanitize_key',
                    ),
                    'root_path' => array(
                        'type' => 'string',
                        'sanitize_callback' => 'sanitize_text_field',
                    ),
                ),
            )
        );
    }

    /**
     * Get settings.
     *
     * @param WP_REST_Request $request Request.
     * @return WP_REST_Response
     */
    public function get_settings($request)
    {
        $options = get_option('nandfilemr_options', array());
        return rest_ensure_response($options);
    }

    /**
     * Update settings.
     *
     * @param WP_REST_Request $request Request.
     * @return WP_REST_Response
     */
    public function update_settings($request)
    {
        $options = get_option('nandfilemr_options', array());
        $params = $request->get_params();

        if (isset($params['theme'])) {
            $options['theme'] = $params['theme'];
        }

        if (isset($params['root_path'])) {
            // Validate path exists before saving?
            // Maybe just ensure it's a string for now.
            $options['root_path'] = wp_normalize_path($params['root_path']);
        }

        update_option('nandfilemr_options', $options);

        return rest_ensure_response(array('success' => true, 'settings' => $options));
    }
}
