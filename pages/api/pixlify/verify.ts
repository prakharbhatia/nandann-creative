import type { NextApiRequest, NextApiResponse } from 'next';
import { validateKey, maskKey, parseSiteInfo, getClientIp } from '../../../lib/pixlify/license';
import { checkRateLimit, logVerification, upsertDomain, isBlacklisted } from '../../../lib/pixlify/db';
import { sendVerificationEmail } from '../../../lib/pixlify/email';

/**
 * POST /api/pixlify/verify
 *
 * Called by the WordPress plugin when a license key is activated.
 * Validates the key server-side, logs the event, sends an email notification,
 * and enforces per-domain rate limiting.
 *
 * Body (JSON or form):
 *   key            string  — the PXLF license key
 *   plugin_version string  — installed plugin version (optional)
 *   event          string  — 'activate' | 'check' (default: 'activate')
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body      = req.body ?? {};
  const rawKey    = String(body.key ?? '').trim();
  const pluginVer = String(body.plugin_version ?? '').trim();
  const eventType = body.event === 'check' ? 'check' : 'activate';

  if (!rawKey) {
    return res.status(400).json({ valid: false, reason: 'Missing license key' });
  }

  const userAgent = String(req.headers['user-agent'] ?? '');
  const site      = parseSiteInfo(userAgent);
  const ip        = getClientIp(req.headers);

  // ── Rate limit by domain ─────────────────────────────────────────────────
  const rl = await checkRateLimit(site.domain);
  if (!rl.allowed) {
    await logVerification({
      domain: site.domain, siteUrl: site.siteUrl, wpVersion: site.wpVersion,
      pluginVer, keyMasked: maskKey(rawKey), keyType: '', eventType,
      success: false, failReason: rl.reason, ip,
    }).catch(console.error);
    return res.status(429).json({ valid: false, reason: rl.reason });
  }

  // ── Validate key ──────────────────────────────────────────────────────────
  const keyInfo   = validateKey(rawKey);
  const masked    = maskKey(rawKey);

  // Check blacklist (after local validation so we have the masked form)
  if (keyInfo.valid && await isBlacklisted(masked)) {
    return res.status(403).json({ valid: false, reason: 'License key has been revoked' });
  }

  const rec = {
    domain:        site.domain,
    siteUrl:       site.siteUrl,
    wpVersion:     site.wpVersion,
    pluginVer,
    keyMasked:     masked,
    keyFull:       rawKey,
    keyType:       keyInfo.type ?? '',
    keyExpiresAt:  keyInfo.expiresAt,
    eventType:     eventType as 'activate' | 'check',
    success:       keyInfo.valid,
    failReason:    keyInfo.valid ? undefined : keyInfo.reason,
    ip,
  };

  // ── Log + upsert domain + email — awaited so Vercel doesn't kill them ────
  // Each step is wrapped in its own catch so one failure never silences the rest.
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
    return res.status(403).json({ valid: false, reason: keyInfo.reason });
  }

  return res.status(200).json({
    valid:      true,
    type:       keyInfo.type,
    expires_at: keyInfo.expiresAt ?? 0,
    days_left:  keyInfo.daysLeft  ?? 0,
  });
}
