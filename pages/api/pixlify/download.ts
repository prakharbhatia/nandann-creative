import type { NextApiRequest, NextApiResponse } from 'next';
import { validateKey, maskKey, parseSiteInfo, getClientIp } from '../../../lib/pixlify/license';
import { checkRateLimit, logVerification, upsertDomain, isBlacklisted } from '../../../lib/pixlify/db';
import { sendVerificationEmail } from '../../../lib/pixlify/email';

/**
 * GET /api/pixlify/download?key=PXLF-...&version=1.3.6
 *
 * Authenticated download gate for Pixlify plugin zip files.
 * Called automatically by WordPress when applying a plugin update.
 *
 * Flow:
 *   1. Rate-limit check by domain
 *   2. Validate PXLF license key (HMAC-SHA256)
 *   3. Log event + send email notification
 *   4. Redirect to the static zip file
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { key, version } = req.query;

  if (!key || typeof key !== 'string' || !version || typeof version !== 'string') {
    return res.status(400).json({ error: 'Missing key or version' });
  }

  // Prevent path traversal — only allow semver strings
  if (!/^\d+\.\d+\.\d+$/.test(version)) {
    return res.status(400).json({ error: 'Invalid version format' });
  }

  const userAgent = String(req.headers['user-agent'] ?? '');
  const site      = parseSiteInfo(userAgent);
  const ip        = getClientIp(req.headers);

  // ── Rate limit by domain ─────────────────────────────────────────────────
  const rl = await checkRateLimit(site.domain);
  if (!rl.allowed) {
    await logVerification({
      domain: site.domain, siteUrl: site.siteUrl, wpVersion: site.wpVersion,
      pluginVer: version, keyMasked: maskKey(key), keyType: '', eventType: 'download',
      success: false, failReason: rl.reason, ip,
    });
    return res.status(429).json({ error: rl.reason });
  }

  // ── Validate key ──────────────────────────────────────────────────────────
  const keyInfo = validateKey(key);
  const masked  = maskKey(key);

  if (keyInfo.valid && await isBlacklisted(masked)) {
    return res.status(403).json({ error: 'License key has been revoked' });
  }

  const rec = {
    domain:       site.domain,
    siteUrl:      site.siteUrl,
    wpVersion:    site.wpVersion,
    pluginVer:    version,
    keyMasked:    masked,
    keyFull:      key,
    keyType:      keyInfo.type ?? '',
    keyExpiresAt: keyInfo.expiresAt,
    eventType:    'download' as const,
    success:      keyInfo.valid,
    failReason:   keyInfo.valid ? undefined : keyInfo.reason,
    ip,
  };

  // Log, upsert domain, email — awaited so Vercel doesn't kill them on redirect
  if (keyInfo.valid) {
    const isNew = await upsertDomain(rec).catch((err) => {
      console.error('[pixlify] upsertDomain failed:', err);
      return false;
    });
    await Promise.all([
      logVerification(rec).catch(console.error),
      sendVerificationEmail({ ...rec, isNewDomain: isNew }, keyInfo).catch(console.error),
    ]);
  } else {
    await Promise.all([
      logVerification(rec).catch(console.error),
      sendVerificationEmail(rec, keyInfo).catch(console.error),
    ]);
  }

  if (!keyInfo.valid) {
    return res.status(403).json({ error: `License validation failed: ${keyInfo.reason}` });
  }

  // ── Redirect to static zip ────────────────────────────────────────────────
  const zipUrl = `https://www.nandann.com/downloads/pixlify-image-optimizer-${version}.zip`;
  res.redirect(302, zipUrl);
}
