import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.CHAT__POSTGRES_URL,
  ssl: { rejectUnauthorized: false },
  max: 2,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// ── Schema init (call once via /api/pixlify/init-db or on first request) ─────

export async function ensureSchema(): Promise<void> {
  // Run each statement separately — node-postgres does not reliably execute
  // multiple statements in a single pool.query() call.
  await pool.query(`
    CREATE TABLE IF NOT EXISTS pixlify_verifications (
      id           SERIAL PRIMARY KEY,
      domain       VARCHAR(255)  NOT NULL,
      site_url     VARCHAR(500),
      wp_version   VARCHAR(20),
      plugin_ver   VARCHAR(20),
      key_masked   VARCHAR(50),
      key_type     VARCHAR(20),
      event_type   VARCHAR(20)   NOT NULL,
      success      BOOLEAN       NOT NULL,
      fail_reason  VARCHAR(150),
      ip           VARCHAR(45),
      created_at   TIMESTAMPTZ   NOT NULL DEFAULT NOW()
    )
  `);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_pxlf_domain     ON pixlify_verifications (domain, created_at)`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_pxlf_created_at ON pixlify_verifications (created_at)`);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS pixlify_domains (
      domain         VARCHAR(255)  PRIMARY KEY,
      site_url       VARCHAR(500),
      wp_version     VARCHAR(20),
      plugin_ver     VARCHAR(20),
      key_full       VARCHAR(100),             -- full raw key (admin-only, private page)
      key_masked     VARCHAR(50),
      key_type       VARCHAR(20),
      key_expires_at TIMESTAMPTZ  NULL,        -- NULL = never expires (unlimited)
      ip             VARCHAR(45),
      first_seen_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
      last_seen_at   TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
      total_events   INT           NOT NULL DEFAULT 1
    )
  `);
  // Add columns to existing tables that predate these
  await pool.query(`ALTER TABLE pixlify_domains ADD COLUMN IF NOT EXISTS key_full       VARCHAR(100) NULL`);
  await pool.query(`ALTER TABLE pixlify_domains ADD COLUMN IF NOT EXISTS key_expires_at TIMESTAMPTZ  NULL`);

  // Blacklist: block a key from being honoured server-side
  await pool.query(`
    CREATE TABLE IF NOT EXISTS pixlify_blacklist (
      key_masked  VARCHAR(50)   PRIMARY KEY,
      reason      VARCHAR(255)  NOT NULL DEFAULT '',
      added_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW()
    )
  `);
}

// ── Upsert active domain ──────────────────────────────────────────────────────

export async function upsertDomain(rec: VerificationRecord): Promise<boolean> {
  try {
    const expiresAt = rec.keyExpiresAt && rec.keyExpiresAt > 0
      ? new Date(rec.keyExpiresAt * 1000).toISOString()
      : null;

    const { rows } = await pool.query(
      `INSERT INTO pixlify_domains
         (domain, site_url, wp_version, plugin_ver,
          key_full, key_masked, key_type, key_expires_at, ip,
          first_seen_at, last_seen_at, total_events)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9, NOW(), NOW(), 1)
       ON CONFLICT (domain) DO UPDATE SET
         site_url       = EXCLUDED.site_url,
         wp_version     = EXCLUDED.wp_version,
         plugin_ver     = EXCLUDED.plugin_ver,
         key_full       = EXCLUDED.key_full,
         key_masked     = EXCLUDED.key_masked,
         key_type       = EXCLUDED.key_type,
         key_expires_at = EXCLUDED.key_expires_at,
         ip             = EXCLUDED.ip,
         last_seen_at   = NOW(),
         total_events   = pixlify_domains.total_events + 1
       RETURNING (xmax = 0) AS is_new`,
      [rec.domain, rec.siteUrl, rec.wpVersion, rec.pluginVer,
       rec.keyFull ?? null, rec.keyMasked, rec.keyType, expiresAt, rec.ip]
    );
    return rows[0]?.is_new === true;
  } catch (err) {
    console.error('[pixlify] upsertDomain error:', err);
    return false;
  }
}

// ── Domain stats ──────────────────────────────────────────────────────────────

export async function getDomains() {
  const { rows } = await pool.query(
    `SELECT domain, site_url, wp_version, plugin_ver,
            key_full, key_masked, key_type, key_expires_at,
            first_seen_at, last_seen_at, total_events
       FROM pixlify_domains
      ORDER BY last_seen_at DESC`
  );
  return rows;
}

// ── Blacklist ─────────────────────────────────────────────────────────────────

export async function isBlacklisted(keyMasked: string): Promise<boolean> {
  try {
    const { rowCount } = await pool.query(
      `SELECT 1 FROM pixlify_blacklist WHERE key_masked = $1`,
      [keyMasked]
    );
    return (rowCount ?? 0) > 0;
  } catch (err) {
    console.error('[pixlify] blacklist check failed:', err);
    return false; // fail open — don't block on DB error
  }
}

export async function addToBlacklist(keyMasked: string, reason: string): Promise<void> {
  await pool.query(
    `INSERT INTO pixlify_blacklist (key_masked, reason)
     VALUES ($1, $2)
     ON CONFLICT (key_masked) DO UPDATE SET reason = EXCLUDED.reason`,
    [keyMasked, reason]
  );
}

export async function removeFromBlacklist(keyMasked: string): Promise<void> {
  await pool.query(`DELETE FROM pixlify_blacklist WHERE key_masked = $1`, [keyMasked]);
}

export async function getBlacklist() {
  const { rows } = await pool.query(
    `SELECT key_masked, reason, added_at FROM pixlify_blacklist ORDER BY added_at DESC`
  );
  return rows;
}

// ── Log a verification event ─────────────────────────────────────────────────

export interface VerificationRecord {
  domain:         string;
  siteUrl:        string;
  wpVersion:      string;
  pluginVer:      string;
  keyMasked:      string;
  keyFull?:       string;   // raw key — stored in domains table + shown in admin email
  keyType:        string;
  keyExpiresAt?:  number;   // unix timestamp (0 = never), for sorting in admin
  eventType:      'activate' | 'download' | 'check';
  success:        boolean;
  failReason?:    string;
  ip:             string;
  isNewDomain?:   boolean;  // true on first-ever successful event for this domain
}

export async function logVerification(rec: VerificationRecord): Promise<void> {
  try {
    await pool.query(
      `INSERT INTO pixlify_verifications
         (domain, site_url, wp_version, plugin_ver, key_masked, key_type,
          event_type, success, fail_reason, ip)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      [
        rec.domain, rec.siteUrl, rec.wpVersion, rec.pluginVer,
        rec.keyMasked, rec.keyType, rec.eventType, rec.success,
        rec.failReason ?? null, rec.ip,
      ]
    );
  } catch (err) {
    console.error('[pixlify] DB log error:', err);
  }
}

// ── Rate limiting (sliding window, per domain) ────────────────────────────────
//
// Limits:
//   - 10 total requests  per domain per hour   (any event type)
//   - 5  failed attempts per domain per hour   (brute-force protection)

const WINDOW_SECONDS = 3600; // 1 hour
const MAX_TOTAL      = 10;
const MAX_FAILURES   = 5;

export interface RateLimitResult {
  allowed:        boolean;
  reason?:        string;
  totalInWindow:  number;
  failsInWindow:  number;
}

export async function checkRateLimit(domain: string): Promise<RateLimitResult> {
  try {
    const { rows } = await pool.query<{ total: string; failures: string }>(
      `SELECT
         COUNT(*)                                    AS total,
         COUNT(*) FILTER (WHERE success = false)    AS failures
       FROM pixlify_verifications
       WHERE domain = $1
         AND created_at > NOW() - INTERVAL '${WINDOW_SECONDS} seconds'`,
      [domain]
    );

    const total    = parseInt(rows[0]?.total    ?? '0', 10);
    const failures = parseInt(rows[0]?.failures ?? '0', 10);

    if (failures >= MAX_FAILURES) {
      return { allowed: false, reason: `Too many failed attempts for this domain (${failures}/${MAX_FAILURES} per hour)`, totalInWindow: total, failsInWindow: failures };
    }

    if (total >= MAX_TOTAL) {
      return { allowed: false, reason: `Rate limit exceeded for this domain (${total}/${MAX_TOTAL} per hour)`, totalInWindow: total, failsInWindow: failures };
    }

    return { allowed: true, totalInWindow: total, failsInWindow: failures };
  } catch (err) {
    // Fail open — don't block the request if DB is unreachable
    console.error('[pixlify] Rate limit check failed:', err);
    return { allowed: true, totalInWindow: 0, failsInWindow: 0 };
  }
}
