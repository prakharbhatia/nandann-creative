<?php
/**
 * Filesystem Service
 *
 * @package HungryFileManager
 * @subpackage HungryFileManager/includes/services
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class Nandfilemr_Filesystem
 *
 * Wrapper for WP_Filesystem interactions.
 */
class Nandfilemr_Filesystem
{

    /**
     * WP_Filesystem instance.
     *
     * @var object
     */
    private $fs;

    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->init_filesystem();
    }

    /**
     * Initialize WP_Filesystem.
     */
    private function init_filesystem()
    {
        global $wp_filesystem;
        if (empty($wp_filesystem)) {
            require_once ABSPATH . '/wp-admin/includes/file.php';
            WP_Filesystem();
        }
        $this->fs = $wp_filesystem;
    }

    /**
     * List files in a directory.
     *
     * @param string $path Absolute path to directory.
     * @return array|WP_Error List of files or error.
     */
    public function ls($path)
    {
        // Security service already validated the path and gave us the full absolute path
        if (!is_dir($path)) {
            return array();
        }

        $items = array();
        // Use scandir for simple listing
        $files = scandir($path);

        if ($files === false) {
            return array();
        }

        foreach ($files as $name) {
            if ('.' === $name || '..' === $name) {
                continue;
            }

            $full_path = $path . '/' . $name;

            // Basic data
            $is_dir = is_dir($full_path);
            $perms = substr(sprintf('%o', fileperms($full_path)), -4);
            $size = $is_dir ? 0 : filesize($full_path);
            $mtime = filemtime($full_path);

            $items[] = array(
                'name' => $name,
                'type' => $is_dir ? 'd' : 'f',
                'size' => $size,
                'perms' => $perms,
                'date' => gmdate('Y-m-d H:i:s', $mtime),
                'path' => $full_path,
            );
        }

        // Sort: Directories first, then files
        usort($items, function ($a, $b) {
            if ($a['type'] === $b['type']) {
                return strcasecmp($a['name'], $b['name']);
            }
            return $a['type'] === 'd' ? -1 : 1;
        });

        return $items;
    }

    /**
     * Read file content.
     *
     * @param string $path Absolute path.
     * @return string|WP_Error Content or error.
     */
    public function read($path)
    {
        $valid = Nandfilemr_Security::validate_path($path);
        if (is_wp_error($valid)) {
            return $valid;
        }

        if (!is_file($path)) {
            return new WP_Error('nandfilemr_not_file', __('Path is not a file.', 'hungry-file-manager'));
        }

        // Use native PHP function for reliability
        $content = file_get_contents($path);

        if ($content === false) {
            return new WP_Error('nandfilemr_read_error', __('Failed to read file content.', 'hungry-file-manager'));
        }

        return $content;
    }

    /**
     * Write content to file.
     *
     * @param string $path    Absolute path.
     * @param string $content new content.
     * @return bool|WP_Error True on success.
     */
    public function write($path, $content)
    {
        // For write, valid path checks parent dir if file doesn't exist?
        // Or we rely on existing check.
        // If file exists:
        $valid = Nandfilemr_Security::validate_path($path, false); // False = don't error if file missing (creating new)
        if (is_wp_error($valid)) {
            return $valid;
        }

        // Native write
        $result = file_put_contents($path, $content);

        if ($result === false) {
            return new WP_Error('nandfilemr_write_error', __('Failed to write file content.', 'hungry-file-manager'));
        }

        return true;
    }

    /**
     * Create Directory.
     *
     * @param string $path Absolute path.
     * @return bool|WP_Error
     */
    public function mkdir($path)
    {
        $valid = Nandfilemr_Security::validate_path(dirname($path));
        if (is_wp_error($valid)) {
            return $valid;
        }

        return $this->fs->mkdir($path);
    }

    /**
     * Delete file or directory.
     * 
     * @param string $path Absolute path.
     * @return bool|WP_Error
     */
    public function delete($path)
    {
        $valid = Nandfilemr_Security::validate_path($path);
        if (is_wp_error($valid)) {
            return $valid;
        }

        return $this->fs->delete($path, true); // recursive for folders
    }
}
