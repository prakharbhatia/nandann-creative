<?php
/**
 * Duplicate / unused image detection.
 * Pure domain logic — no AJAX hooks, no WordPress admin hooks.
 */
defined( 'ABSPATH' ) || exit;

class Pixlify_Duplicate_Detector {

    private $settings;

    public function __construct() {
        $this->settings = Pixlify_Settings::get();
    }

    // -------------------------------------------------------------------------
    // Public scanning API
    // -------------------------------------------------------------------------

    /**
     * Find images whose file content is identical (same MD5 hash).
     *
     * @return array[]  Each item: { hash, attachments[] }
     */
    public function find_duplicates() {
        $attachments = $this->get_all_image_attachments();
        $hash_map    = array();

        foreach ( $attachments as $att ) {
            $file = get_attached_file( $att->ID );
            if ( ! $file || ! file_exists( $file ) ) {
                continue;
            }
            $hash = md5_file( $file );
            if ( ! isset( $hash_map[ $hash ] ) ) {
                $hash_map[ $hash ] = array();
            }
            $hash_map[ $hash ][] = $this->attachment_info( $att->ID, $file );
        }

        $groups = array();
        foreach ( $hash_map as $hash => $group ) {
            if ( count( $group ) > 1 ) {
                $groups[] = array( 'hash' => $hash, 'attachments' => $group );
            }
        }
        return $groups;
    }

    /**
     * Find images that are not referenced anywhere in posts, meta, or options.
     *
     * @return array[]
     */
    public function find_unused() {
        $attachments = $this->get_all_image_attachments();
        $ignored     = $this->get_ignored_ids();
        $unused      = array();

        foreach ( $attachments as $att ) {
            if ( in_array( $att->ID, $ignored, true ) ) {
                continue;
            }
            if ( ! $this->is_used( $att->ID ) ) {
                $file    = get_attached_file( $att->ID );
                $unused[] = $this->attachment_info( $att->ID, $file );
            }
        }
        return $unused;
    }

    /**
     * Find images uploaded more than $days ago and never referenced.
     *
     * @param int|null $days  Defaults to plugin setting.
     * @return array[]
     */
    public function find_stale( $days = null ) {
        $days   = $days !== null ? (int) $days : (int) $this->settings['unused_days'];
        $cutoff = gmdate( 'Y-m-d H:i:s', strtotime( "-{$days} days" ) );

        $attachments = $this->get_all_image_attachments( $cutoff );
        $ignored     = $this->get_ignored_ids();
        $stale       = array();

        foreach ( $attachments as $att ) {
            if ( in_array( $att->ID, $ignored, true ) ) {
                continue;
            }
            if ( ! $this->is_used( $att->ID ) ) {
                $file    = get_attached_file( $att->ID );
                $stale[] = $this->attachment_info( $att->ID, $file );
            }
        }
        return $stale;
    }

    /**
     * Check whether an attachment is used anywhere on the site.
     *
     * @param int $attachment_id
     * @return bool
     */
    public function is_used( $attachment_id ) {
        global $wpdb;

        $attachment_id = (int) $attachment_id;

        // Cache result per attachment to avoid duplicate queries across find_unused / find_stale loops.
        $cache_key = 'pixlify_io_used_' . $attachment_id;
        $cached    = wp_cache_get( $cache_key, 'pixlify_io' );
        if ( false !== $cached ) {
            return (bool) $cached;
        }

        $result = $this->check_is_used( $attachment_id );
        wp_cache_set( $cache_key, $result, 'pixlify_io', 5 * MINUTE_IN_SECONDS );
        return $result;
    }

    /**
     * Inner logic for is_used() — separated so caching wrapper stays clean.
     *
     * @param int $attachment_id Already cast to int.
     * @return bool
     */
    private function check_is_used( $attachment_id ) {
        global $wpdb;

        // 1. Attached to a parent post via media uploader.
        $post = get_post( $attachment_id );
        if ( $post && (int) $post->post_parent > 0 ) {
            return true;
        }

        $url = wp_get_attachment_url( $attachment_id );

        // 2. Referenced in any post content by filename.
        if ( $url ) {
            $basename = basename( $url );
            $like     = '%' . $wpdb->esc_like( $basename ) . '%';

            $found = $wpdb->get_var( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
                $wpdb->prepare(
                    "SELECT ID FROM {$wpdb->posts}
                     WHERE post_status NOT IN ('trash','auto-draft')
                       AND post_type NOT IN ('attachment','revision')
                       AND post_content LIKE %s
                     LIMIT 1",
                    $like
                )
            );
            if ( $found ) {
                return true;
            }
        }

        // 3. Used as featured image (_thumbnail_id).
        $thumb = $wpdb->get_var( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
            $wpdb->prepare(
                "SELECT post_id FROM {$wpdb->postmeta}
                 WHERE meta_key = '_thumbnail_id' AND meta_value = %d
                 LIMIT 1",
                $attachment_id
            )
        );
        if ( $thumb ) {
            return true;
        }

        // 4. Referenced by ID in any post meta (ACF image fields store the ID).
        $meta_by_id = $wpdb->get_var( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
            $wpdb->prepare(
                "SELECT meta_id FROM {$wpdb->postmeta}
                 WHERE meta_value = %s AND meta_key != '_thumbnail_id'
                 LIMIT 1",
                (string) $attachment_id
            )
        );
        if ( $meta_by_id ) {
            return true;
        }

        // 5. Referenced by URL in any post meta.
        if ( $url ) {
            $like = '%' . $wpdb->esc_like( $url ) . '%';

            $meta_by_url = $wpdb->get_var( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
                $wpdb->prepare(
                    "SELECT meta_id FROM {$wpdb->postmeta}
                     WHERE meta_value LIKE %s
                     LIMIT 1",
                    $like
                )
            );
            if ( $meta_by_url ) {
                return true;
            }
        }

        // 6. Referenced in options (widgets, customizer, site settings).
        if ( $url ) {
            $like = '%' . $wpdb->esc_like( basename( $url ) ) . '%';

            $opt = $wpdb->get_var( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
                $wpdb->prepare(
                    "SELECT option_id FROM {$wpdb->options}
                     WHERE option_value LIKE %s
                       AND option_name NOT LIKE %s
                     LIMIT 1",
                    $like,
                    $wpdb->esc_like( '_' ) . '%'
                )
            );
            if ( $opt ) {
                return true;
            }
        }

        return false;
    }

    // -------------------------------------------------------------------------
    // Ignore list
    // -------------------------------------------------------------------------

    public function get_ignored_ids() {
        return (array) get_option( 'pixlify_ignored_attachments', array() );
    }

    public function add_ignored_id( $id ) {
        $ignored   = $this->get_ignored_ids();
        $ignored[] = (int) $id;
        update_option( 'pixlify_ignored_attachments', array_unique( $ignored ) );
    }

    // -------------------------------------------------------------------------
    // Private helpers
    // -------------------------------------------------------------------------

    private function get_all_image_attachments( $before_date = null ) {
        $args = array(
            'post_type'      => 'attachment',
            'post_mime_type' => 'image',
            'post_status'    => 'inherit',
            'posts_per_page' => -1,
            'orderby'        => 'date',
            'order'          => 'ASC',
        );

        if ( $before_date ) {
            $args['date_query'] = array( array( 'before' => $before_date ) );
        }

        return get_posts( $args );
    }

    private function attachment_info( $attachment_id, $file ) {
        $post      = get_post( $attachment_id );
        $file_size = ( $file && file_exists( $file ) ) ? (int) filesize( $file ) : 0;

        return array(
            'id'          => (int) $attachment_id,
            'title'       => $post ? esc_html( $post->post_title ) : '',
            'filename'    => $file ? esc_html( basename( $file ) ) : '',
            'file_path'   => $file ? esc_html( $file ) : '',
            'file_size'   => $file_size,
            'file_size_h' => size_format( $file_size ),
            'url'         => esc_url( (string) wp_get_attachment_url( $attachment_id ) ),
            'thumb_url'   => esc_url( (string) wp_get_attachment_image_url( $attachment_id, 'thumbnail' ) ),
            'date'        => $post ? esc_html( $post->post_date ) : '',
            'edit_url'    => esc_url( (string) get_edit_post_link( $attachment_id, 'raw' ) ),
        );
    }
}
