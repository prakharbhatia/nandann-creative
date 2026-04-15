import type { NextApiRequest, NextApiResponse } from 'next';
import { validateKey, maskKey, parseSiteInfo, getClientIp } from '../../../lib/pixlify/license';
import { checkRateLimit, logVerification, upsertDomain } from '../../../lib/pixlify/db';
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

  const body         = req.body ?? {};
  const rawKey       = String(body.key ?? '').trim();
  const pluginVer    = String(body.plugin_version ?? '').trim();
  const eventType    = body.event === 'check' ? 'check' : 'activate';

  if (!rawKey) {
    return res.status(400).json({ valid: false, reason: 'Missing license key' });
  }

  const userAgent = String(req.headers['user-agent'] ?? '');
  const site      = parseSiteInfo(userAgent);
  const ip        = getClientIp(req.headers);

  // ── Rate limit by domain ─────────────────────────────────────────────────
  const rl = await checkRateLimit(site.domain);
  if (!rl.allowed) {
    // Still log the blocked attempt
    await logVerification({
      domain: site.domain, siteUrl: site.siteUrl, wpVersion: site.wpVersion,
      pluginVer, keyMasked: maskKey(rawKey), keyType: '', eventType,
      success: false, failReason: rl.reason, ip,
    });
    return res.status(429).json({ valid: false, reason: rl.reason });
  }

  // ── Validate key ──────────────────────────────────────────────────────────
  const keyInfo = validateKey(rawKey);
  const rec = {
    domain:     site.domain,
    siteUrl:    site.siteUrl,
    wpVersion:  site.wpVersion,
    pluginVer,
    keyMasked:  maskKey(rawKey),
    keyType:    keyInfo.type ?? '',
    eventType:  eventType as 'activate' | 'check',
    success:    keyInfo.valid,
    failReason: keyInfo.valid ? undefined : keyInfo.reason,
    ip,
  };

  // Log, upsert domain, email — all non-blocking
  Promise.all([
    logVerification(rec),
    keyInfo.valid
      ? upsertDomain(rec).then(isNew =>
          sendVerificationEmail({ ...rec, isNewDomain: isNew }, keyInfo)
        )
      : sendVerificationEmail(rec, keyInfo),
  ]).catch(console.error);

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
