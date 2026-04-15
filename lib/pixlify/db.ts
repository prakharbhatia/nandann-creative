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
    );

    CREATE INDEX IF NOT EXISTS idx_pxlf_domain     ON pixlify_verifications (domain, created_at);
    CREATE INDEX IF NOT EXISTS idx_pxlf_created_at ON pixlify_verifications (created_at);

    -- Active domains registry: upserted on every successful verification
    CREATE TABLE IF NOT EXISTS pixlify_domains (
      domain        VARCHAR(255)  PRIMARY KEY,
      site_url      VARCHAR(500),
      wp_version    VARCHAR(20),
      plugin_ver    VARCHAR(20),
      key_masked    VARCHAR(50),
      key_type      VARCHAR(20),
      ip            VARCHAR(45),
      first_seen_at TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
      last_seen_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
      total_events  INT           NOT NULL DEFAULT 1
    );
  `);
}

// ── Upsert active domain ──────────────────────────────────────────────────────

export async function upsertDomain(rec: VerificationRecord): Promise<boolean> {
  try {
    const { rowCount } = await pool.query(
      `INSERT INTO pixlify_domains
         (domain, site_url, wp_version, plugin_ver, key_masked, key_type, ip,
          first_seen_at, last_seen_at, total_events)
       VALUES ($1,$2,$3,$4,$5,$6,$7, NOW(), NOW(), 1)
       ON CONFLICT (domain) DO UPDATE SET
         site_url     = EXCLUDED.site_url,
         wp_version   = EXCLUDED.wp_version,
         plugin_ver   = EXCLUDED.plugin_ver,
         key_masked   = EXCLUDED.key_masked,
         key_type     = EXCLUDED.key_type,
         ip           = EXCLUDED.ip,
         last_seen_at = NOW(),
         total_events = pixlify_domains.total_events + 1
       RETURNING (xmax = 0) AS is_new`,
      [rec.domain, rec.siteUrl, rec.wpVersion, rec.pluginVer,
       rec.keyMasked, rec.keyType, rec.ip]
    );
    // xmax = 0 means it was an INSERT (new domain), not an UPDATE
    return (rowCount ?? 0) > 0;
  } catch (err) {
    console.error('[pixlify] upsertDomain error:', err);
    return false;
  }
}

// ── Domain stats ──────────────────────────────────────────────────────────────

export async function getDomains() {
  const { rows } = await pool.query(
    `SELECT domain, site_url, wp_version, plugin_ver, key_type,
            first_seen_at, last_seen_at, total_events
       FROM pixlify_domains
      ORDER BY last_seen_at DESC`
  );
  return rows;
}

// ── Log a verification event ─────────────────────────────────────────────────

export interface VerificationRecord {
  domain:        string;
  siteUrl:       string;
  wpVersion:     string;
  pluginVer:     string;
  keyMasked:     string;
  keyType:       string;
  eventType:     'activate' | 'download' | 'check';
  success:       boolean;
  failReason?:   string;
  ip:            string;
  isNewDomain?:  boolean;  // true on first-ever successful event for this domain
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
