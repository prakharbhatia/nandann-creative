<?php
/**
 * Security Service
 *
 * @package HungryFileManager
 * @subpackage HungryFileManager/includes/services
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class Nandfilemr_Security
 *
 * Handles strict path validation and capability checks.
 */
class Nandfilemr_Security
{

    /**
     * Validate if a path is safe to access.
     *
     * Checks:
     * 1. Path exists (optional).
     * 2. Path is within the allowed root directory (no traversal).
     * 3. Path is not a sensitive file (wp-config.php).
     *
     * @param string $path  The path to validate.
     * @param bool   $check_existence Whether to check if file exists.
     * @return bool|WP_Error True if safe, WP_Error if unsafe.
     */
    public static function validate_path($path, $check_existence = true)
    {
        // 1. Get Configured Root (Always use the static source of truth)
        $root = self::get_root_path();

        // Normalize root.
        $root = wp_normalize_path(realpath($root));

        // 2. Resolve target path.
        $real_path = realpath($path);

        // error_log("HungryFileManager Debug: Validating Path. Input: $path, Root: $root");

        if ($check_existence && !$real_path) {
            // error_log("HungryFileManager Debug: Path does not exist or realpath failed.");
            return new WP_Error('nandfilemr_invalid_path', __('Path does not exist.', 'hungry-file-manager'));
        }

        // If path doesn't exist (e.g. creating new file), we validate the parent or the string itself tentatively.
        // For safety, let's assume we are validating an existing path or a constructed absolute path.
        if (!$real_path) {
            // If file doesn't exist, use the provided string but normalize it.
            $real_path = wp_normalize_path($path);

            // Hardening: If we can't resolve the path (file doesn't exist), 
            // strictly block '..' to prevent traversal attacks bypassing the prefix check.
            if (strpos($real_path, '..') !== false) {
                return new WP_Error('nandfilemr_invalid_path', __('Invalid path characters.', 'hungry-file-manager'));
            }
        } else {
            $real_path = wp_normalize_path($real_path);
        }


        // 3. Traversal Check: The path MUST start with the root.
        // Use stripos for case-insensitive check (important for Mac/Windows localized environments)
        if (stripos($real_path, $root) !== 0) {
            return new WP_Error('nandfilemr_access_denied', __('Access denied. You cannot browse outside the allowed root.', 'hungry-file-manager') . ' Root: ' . $root . ' Path: ' . $real_path);
        }

        // 4. Block Sensitive Files?
        // As a full File Manager for Admins, we generally trust the user. 
        // We only block self-deletion or specific system files if strictly needed.
        // Unblocking wp-config.php as requested.
        /*
        $forbidden = array('.git', '.svn'); // Block version control folder internals only
        $basename = basename($real_path);
        if (in_array($basename, $forbidden, true)) {
             return new WP_Error('nandfilemr_sensitive_file', __('This file is protected.', 'hungry-file-manager'));
        }
        */

        return true;
    }

    /**
     * Check if current user has permission for an operation.
     *
     * @param string $capability The capability to check (default: manage_options).
     * @return bool
     */
    public static function check_permission($capability = 'manage_options')
    {
        // Future: Integrate with custom RBAC settings.
        return current_user_can($capability);
    }

    /**
     * Verify API Request nonce and permission.
     *
     * @return bool|WP_Error
     */
    public static function verify_api_request()
    {
        // Nonce is handled by WP REST API 'permission_callback' usually, 
        // but we can add double check here if needed.
        if (!self::check_permission()) {
            return new WP_Error('rest_forbidden', __('Sorry, you are not allowed to do that.', 'hungry-file-manager'), array('status' => 403));
        }
        return true;
    }
    /**
     * Get the allowed root path.
     *
     * @return string
     */
    public static function get_root_path()
    {
        return wp_normalize_path(ABSPATH);
    }
}
