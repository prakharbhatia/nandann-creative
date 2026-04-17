<?php
/**
 * Pixlify License — server-validated license keys.
 *
 * Validation is performed entirely by nandann.com/api/pixlify/verify.
 * The HMAC secret never ships in the plugin file.
 *
 * Flow:
 *   activate()    → blocking POST → nandann.com validates + logs + emails → cache 24h
 *   get_status()  → transient cache OR (admin/cron only) re-validate with server
 *   is_licensed() → convenience wrapper
 *   Daily cron    → clears cache + re-validates → blacklist takes effect within 24h
 */
defined( 'ABSPATH' ) || exit;

class Pixlify_License {

    // ── Keys ───────────────────────────────────────────────────────────────────
    const OPTION_KEY         = 'pixlify_license_key';
    const OPTION_LAST_KNOWN  = 'pixlify_license_last_known';  // persisted fallback
    const CACHE_TRANSIENT    = 'pixlify_license_status';
    const CACHE_TTL          = DAY_IN_SECONDS;
    const SERVER_CHECK_HOOK  = 'pixlify_server_license_check';
    const VERIFY_URL         = 'https://www.nandann.com/api/pixlify/verify';

    // ── Status codes ───────────────────────────────────────────────────────────
    const STATUS_VALID      = 'valid';
    const STATUS_TRIAL      = 'trial';
    const STATUS_EXPIRED    = 'expired';
    const STATUS_INVALID    = 'invalid';
    const STATUS_UNLICENSED = 'unlicensed';

    // ── Public API ─────────────────────────────────────────────────────────────

    /**
     * Return the current license status (cached 24h).
     *
     * On cache miss:
     *   - Admin / cron context  → re-validates with nandann.com (blocking)
     *   - Frontend              → returns last known good status to avoid slow page loads
     */
    public static function get_status(): array {
        $cached = get_transient( self::CACHE_TRANSIENT );
        if ( false !== $cached && is_array( $cached ) ) {
            return $cached;
        }

        $stored_key = get_option( self::OPTION_KEY, '' );
        if ( empty( $stored_key ) ) {
            return self::make_result( self::STATUS_UNLICENSED );
        }

        // Frontend: use last known good to avoid a blocking HTTP call on page load.
        if ( ! is_admin() && ! wp_doing_cron() ) {
            $last = get_option( self::OPTION_LAST_KNOWN, null );
            if ( $last && is_array( $last ) ) {
                // Briefly restore transient so we don't re-enter this path every request.
                set_transient( self::CACHE_TRANSIENT, $last, HOUR_IN_SECONDS );
                return $last;
            }
            return self::make_result( self::STATUS_UNLICENSED );
        }

        // Admin / cron: call the server.
        return self::revalidate( $stored_key );
    }

    /** Returns true when a non-expired license (trial or unlimited) is active. */
    public static function is_licensed(): bool {
        $s = self::get_status();
        return in_array( $s['status'], [ self::STATUS_VALID, self::STATUS_TRIAL ], true );
    }

    /**
     * Activate a license key.
     * Always calls nandann.com — if the server is unreachable, activation fails.
     */
    public static function activate( string $raw_key ): array {
        if ( empty( trim( $raw_key ) ) ) {
            return self::make_result(
                self::STATUS_INVALID, '', 0,
                __( 'Please enter a license key.', 'pixlify-image-optimizer' )
            );
        }

        $server = self::call_server( $raw_key, 'activate' );

        if ( null === $server ) {
            return self::make_result(
                self::STATUS_INVALID, '', 0,
                __( 'Could not reach the license server. Please check your internet connection and try again.', 'pixlify-image-optimizer' )
            );
        }

        if ( empty( $server['valid'] ) ) {
            return self::make_result(
                self::STATUS_INVALID, '', 0,
                $server['reason'] ?? __( 'This license key is not valid.', 'pixlify-image-optimizer' )
            );
        }

        $result = self::result_from_server( $server );

        update_option( self::OPTION_KEY, self::canonical( $raw_key ), false );
        update_option( self::OPTION_LAST_KNOWN, $result, false );
        delete_transient( self::CACHE_TRANSIENT );
        set_transient( self::CACHE_TRANSIENT, $result, self::CACHE_TTL );
        self::schedule_server_check();

        return $result;
    }

    /**
     * Remove the stored key, kill the cache, and remove .htaccess rules.
     */
    public static function deactivate(): void {
        delete_option( self::OPTION_KEY );
        delete_option( self::OPTION_LAST_KNOWN );
        delete_transient( self::CACHE_TRANSIENT );
        Pixlify_Htaccess::remove_rules();
    }

    // ── Cron ──────────────────────────────────────────────────────────────────

    public static function schedule_server_check(): void {
        if ( ! wp_next_scheduled( self::SERVER_CHECK_HOOK ) ) {
            wp_schedule_event( time() + HOUR_IN_SECONDS, 'daily', self::SERVER_CHECK_HOOK );
        }
    }

    public static function unschedule_server_check(): void {
        $ts = wp_next_scheduled( self::SERVER_CHECK_HOOK );
        if ( $ts ) {
            wp_unschedule_event( $ts, self::SERVER_CHECK_HOOK );
        }
    }

    /**
     * Cron callback — force a fresh server check.
     * Clears the transient so revalidate() calls the server.
     * If the server blacklists the key, deactivate() is called automatically.
     */
    public static function run_server_check(): void {
        $stored_key = get_option( self::OPTION_KEY, '' );
        if ( empty( $stored_key ) ) {
            return;
        }
        delete_transient( self::CACHE_TRANSIENT );
        self::revalidate( $stored_key );
    }

    // ── Private helpers ────────────────────────────────────────────────────────

    /**
     * Call nandann.com, update cache + last-known, deactivate if revoked.
     * Returns the resulting status array.
     */
    private static function revalidate( string $raw_key ): array {
        $server = self::call_server( $raw_key, 'check' );

        if ( null === $server ) {
            // Server unreachable — extend last known good so the site keeps working.
            $last = get_option( self::OPTION_LAST_KNOWN, null );
            if ( $last && is_array( $last ) ) {
                set_transient( self::CACHE_TRANSIENT, $last, self::CACHE_TTL );
                return $last;
            }
            return self::make_result(
                self::STATUS_UNLICENSED, '', 0,
                __( 'Could not reach the license server.', 'pixlify-image-optimizer' )
            );
        }

        if ( empty( $server['valid'] ) ) {
            // Server says invalid or blacklisted — kill the license immediately.
            self::deactivate();
            return self::make_result(
                self::STATUS_INVALID, '', 0,
                $server['reason'] ?? __( 'License key is not valid or has been revoked.', 'pixlify-image-optimizer' )
            );
        }

        $result = self::result_from_server( $server );
        set_transient( self::CACHE_TRANSIENT, $result, self::CACHE_TTL );
        update_option( self::OPTION_LAST_KNOWN, $result, false );

        return $result;
    }

    /**
     * POST to nandann.com/api/pixlify/verify (blocking).
     *
     * Returns the decoded JSON body on success/failure,
     * or null if the server was unreachable / returned an unexpected error.
     */
    private static function call_server( string $raw_key, string $event ): ?array {
        $response = wp_remote_post(
            self::VERIFY_URL,
            array(
                'timeout'   => 10,
                'blocking'  => true,
                'headers'   => array( 'Content-Type' => 'application/json' ),
                'body'      => wp_json_encode( array(
                    'key'            => $raw_key,
                    'event'          => $event,
                    'plugin_version' => PIXLIFY_VERSION,
                ) ),
                'sslverify' => true,
            )
        );

        if ( is_wp_error( $response ) ) {
            return null;
        }

        $code = (int) wp_remote_retrieve_response_code( $response );
        $body = json_decode( wp_remote_retrieve_body( $response ), true );

        if ( 200 === $code && ! empty( $body['valid'] ) ) {
            return $body;
        }

        if ( 403 === $code && is_array( $body ) ) {
            return array(
                'valid'  => false,
                'reason' => $body['reason'] ?? __( 'License key revoked.', 'pixlify-image-optimizer' ),
            );
        }

        // 429 rate limit, 500 server error, etc — treat as unreachable.
        return null;
    }

    /** Build a status array from a successful server response. */
    private static function result_from_server( array $server ): array {
        $type      = $server['type']       ?? 'unlimited';
        $expiresAt = (int) ( $server['expires_at'] ?? 0 );
        $daysLeft  = (int) ( $server['days_left']  ?? 0 );
        $status    = ( 'trial' === $type ) ? self::STATUS_TRIAL : self::STATUS_VALID;

        $message = ( 'trial' === $type )
            ? sprintf(
                /* translators: %d days left in trial */
                _n(
                    '%d day left in your trial — all features active.',
                    '%d days left in your trial — all features active.',
                    $daysLeft,
                    'pixlify-image-optimizer'
                ),
                $daysLeft
            )
            : __( 'License active. All features unlocked.', 'pixlify-image-optimizer' );

        return self::make_result( $status, $type, $expiresAt, $message, $daysLeft );
    }

    /** Format 32 hex chars as PXLF-XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX */
    public static function format_key( string $hex ): string {
        $hex = strtoupper( preg_replace( '/[^A-Fa-f0-9]/', '', $hex ) );
        return 'PXLF-' . implode( '-', str_split( $hex, 8 ) );
    }

    /** Normalise any key input to canonical format. */
    public static function canonical( string $raw ): string {
        $stripped = preg_replace( '/^PXLF-?/i', '', trim( $raw ) );
        $hex      = strtoupper( preg_replace( '/[^A-Fa-f0-9]/', '', $stripped ) );
        return self::format_key( $hex );
    }

    private static function make_result(
        string $status,
        string $type = '',
        int $expires_at = 0,
        string $message = '',
        int $days_left = 0
    ): array {
        if ( '' === $message ) {
            $message = self::default_message( $status );
        }
        return compact( 'status', 'type', 'expires_at', 'days_left', 'message' );
    }

    private static function default_message( string $status ): string {
        switch ( $status ) {
            case self::STATUS_UNLICENSED:
                return __( 'No license key entered. WebP & AVIF serving is paused.', 'pixlify-image-optimizer' );
            case self::STATUS_EXPIRED:
                return __( 'Your license has expired. Renew at nandann.com/pixlify-image-optimizer.', 'pixlify-image-optimizer' );
            case self::STATUS_INVALID:
                return __( 'License key is not valid.', 'pixlify-image-optimizer' );
            default:
                return '';
        }
    }
}
