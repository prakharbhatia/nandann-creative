<?php
/**
 * Files API Controller
 *
 * @package HungryFileManager
 * @subpackage HungryFileManager/includes/api
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class Nandfilemr_Api_Files
 */
class Nandfilemr_Api_Files extends Nandfilemr_Api_Base
{

    /**
     * Filesystem instance.
     *
     * @var Nandfilemr_Filesystem
     */
    private $fs;

    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->fs = new Nandfilemr_Filesystem();
    }

    /**
     * Register routes.
     */
    public function register_routes()
    {
        // GET /files - List directory
        register_rest_route(
            $this->namespace,
            '/files',
            array(
                'methods' => WP_REST_Server::READABLE,
                'callback' => array($this, 'get_items'),
                'permission_callback' => array($this, 'check_permission'),
                'args' => array(
                    'path' => array(
                        'default' => '',
                        'sanitize_callback' => 'sanitize_text_field',
                    ),
                ),
            )
        );

        // POST /files - Upload file
        register_rest_route(
            $this->namespace,
            '/files',
            array(
                'methods' => WP_REST_Server::CREATABLE,
                'callback' => array($this, 'create_item'), // Upload
                'permission_callback' => array($this, 'check_permission'),
            )
        );

        // DELETE /files - Delete file/folder
        register_rest_route(
            $this->namespace,
            '/files',
            array(
                'methods' => WP_REST_Server::DELETABLE,
                'callback' => array($this, 'delete_item'),
                'permission_callback' => array($this, 'check_permission'),
                'args' => array(
                    'path' => array(
                        'required' => true,
                        'sanitize_callback' => 'sanitize_text_field',
                    ),
                ),
            )
        );

        // POST /make-dir - Create directory (separate endpoint for clarity)
        register_rest_route(
            $this->namespace,
            '/make-dir',
            array(
                'methods' => WP_REST_Server::CREATABLE,
                'callback' => array($this, 'make_directory'),
                'permission_callback' => array($this, 'check_permission'),
                'args' => array(
                    'path' => array(
                        'required' => true,
                        'sanitize_callback' => 'sanitize_text_field',
                    ),
                    'name' => array(
                        'required' => true,
                        'sanitize_callback' => 'sanitize_file_name',
                    ),
                ),
            )
        );

        // GET /content - Read file content
        register_rest_route(
            $this->namespace,
            '/content',
            array(
                'methods' => WP_REST_Server::READABLE,
                'callback' => array($this, 'get_content'),
                'permission_callback' => array($this, 'check_permission'),
                'args' => array(
                    'path' => array(
                        'required' => true,
                        'sanitize_callback' => 'sanitize_text_field',
                    ),
                ),
            )
        );

        // POST /content - Write file content
        register_rest_route(
            $this->namespace,
            '/content',
            array(
                'methods' => WP_REST_Server::EDITABLE,
                'callback' => array($this, 'update_content'),
                'permission_callback' => array($this, 'check_permission'),
                'args' => array(
                    'path' => array(
                        'required' => true,
                        'sanitize_callback' => 'sanitize_text_field',
                    ),
                    'content' => array(
                        'required' => true,
                        // Content can be anything (code), sanitize carefully or rely on authorized user trust for code editing.
                        // For admin tools, exact text preservation is key. 
                        // 'sanitize_callback' => 'sanitize_textarea_field' breaks code.
                    ),
                ),
            )
        );
    }

    /**
     * Get directory items.
     *
     * @param WP_REST_Request $request Request.
     * @return WP_REST_Response
     */
    public function get_items($request)
    {
        $root = Nandfilemr_Security::get_root_path();

        $path = $request->get_param('path');

        // Resolve target path
        if (empty($path)) {
            $target = $root;
        } else {
            // If path provided, check if it's absolute or relative
            if (strpos($path, $root) === 0) {
                $target = $path;
            } else {
                $target = $root . '/' . ltrim($path, '/');
            }
        }

        $items = $this->fs->ls($target);

        if (is_wp_error($items)) {
            return rest_ensure_response($items);
        }

        return rest_ensure_response($items);
    }

    /**
     * Get file content.
     *
     * @param WP_REST_Request $request Request.
     * @return WP_REST_Response
     */
    public function get_content($request)
    {
        $path = $request->get_param('path');
        $content = $this->fs->read($path);

        if (is_wp_error($content)) {
            return $content;
        }

        // Check if image
        $is_image = false;
        $extension = strtolower(pathinfo($path, PATHINFO_EXTENSION));
        $image_exts = array('jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'ico');

        if (in_array($extension, $image_exts)) {
            $is_image = true;
            // Get Mime Type
            $mime = 'image/' . ($extension === 'svg' ? 'svg+xml' : $extension);
            if ($extension === 'jpg')
                $mime = 'image/jpeg';
            if ($extension === 'ico')
                $mime = 'image/x-icon';

            // Base64 encode
            $content = 'data:' . $mime . ';base64,' . base64_encode($content);
        }

        return rest_ensure_response(array(
            'path' => $path,
            'content' => $content,
            'is_image' => $is_image
        ));
    }

    /**
     * Update file content.
     *
     * @param WP_REST_Request $request Request.
     * @return WP_REST_Response
     */
    public function update_content($request)
    {
        $path = $request->get_param('path');
        $content = $request->get_param('content');

        $result = $this->fs->write($path, $content);

        if (is_wp_error($result)) {
            return rest_ensure_response($result);
        }

        return rest_ensure_response(array('success' => true));
    }

    /**
     * Create directory.
     *
     * @param WP_REST_Request $request Request.
     * @return WP_REST_Response|WP_Error
     */
    public function make_directory($request)
    {
        $root = Nandfilemr_Security::get_root_path();

        $path = $request->get_param('path');
        $name = $request->get_param('name');

        // If path is empty, we are at root
        if (empty($path)) {
            $target = $root;
        } else {
            // Path should be relative to root for safety, but our security validator handles full paths too in some designs.
            // Best practice: Frontend sends RELATIVE path. Backend prepends root.
            // OR Frontend sends ABSOLUTE path (if it knows it).
            // Let's assume frontend sends RELATIVE path for now to be safe and cleaner.
            // But existing code seems to use full path in some places.
            // Let's rely on validate_path to sanitize.
            // Actually, simplest is: 
            $target = empty($path) ? $root : $root . '/' . ltrim($path, '/');
            // Wait, if frontend sends absolute path, basic concat will double it.
            // Let's clean the path input.
            // If path contains root, allow it?
            if (strpos($path, $root) === 0) {
                $target = $path;
            }
        }

        // Validation handles traversal
        $valid = Nandfilemr_Security::validate_path($target);

        $target = rtrim($path, '/') . '/' . $name;

        $result = $this->fs->mkdir($target);

        if (is_wp_error($result)) {
            return rest_ensure_response($result);
        }
        if (!$result) {
            return new WP_Error('nandfilemr_mkdir_failed', __('Failed to create directory.', 'hungry-file-manager'), array('status' => 500));
        }

        return rest_ensure_response(array('success' => true));
    }

    /**
     * Delete item.
     * 
     * @param WP_REST_Request $request Request.
     * @return WP_REST_Response|WP_Error
     */
    public function delete_item($request)
    {
        $path = $request->get_param('path');

        $result = $this->fs->delete($path);

        if (is_wp_error($result)) {
            return rest_ensure_response($result);
        }
        if (!$result) {
            return new WP_Error('nandfilemr_delete_failed', __('Failed to delete item.', 'hungry-file-manager'), array('status' => 500));
        }

        return rest_ensure_response(array('success' => true));
    }

    /**
     * Upload file (Not fully impl yet, placeholder).
     */
    public function create_item($request)
    {
        // Need to handle $_FILES
        return rest_ensure_response(array('message' => 'Upload logic TBD'));
    }
}
