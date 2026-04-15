import { createHmac, timingSafeEqual } from 'crypto';

const SECRET = process.env.PIXLIFY_LICENSE_SECRET ?? '';

export interface KeyInfo {
  valid:      boolean;
  reason?:    string;
  type?:      'trial' | 'unlimited';
  expiresAt?: number;  // Unix timestamp, 0 = never
  daysLeft?:  number;
}

/**
 * Validates a PXLF license key.
 * Mirrors PHP class-license.php validate_raw() exactly.
 *
 * Key structure (16 bytes → 32 hex chars):
 *   Byte 0    : type (0x01 trial, 0x02 unlimited)
 *   Bytes 1–4 : expiry big-endian uint32 (0 = no expiry)
 *   Bytes 5–7 : random nonce
 *   Bytes 8–15: first 8 bytes of HMAC-SHA256(bytes[0..7], secret)
 */
export function validateKey(rawKey: string): KeyInfo {
  if (!SECRET) return { valid: false, reason: 'Server misconfiguration — secret not set' };

  // Strip PXLF- prefix first (F in PXLF is a valid hex char)
  const stripped = rawKey.replace(/^PXLF-?/i, '');
  const hex      = stripped.replace(/[^A-Fa-f0-9]/g, '');

  if (hex.length !== 32) return { valid: false, reason: 'Invalid key format' };

  const bytes     = Buffer.from(hex, 'hex');
  const typeByte  = bytes[0];
  const expiresAt = bytes.readUInt32BE(1);
  const storedSig = bytes.slice(8, 16);

  const payload     = bytes.slice(0, 8);
  const expectedSig = createHmac('sha256', SECRET).update(payload).digest().slice(0, 8);

  if (!timingSafeEqual(storedSig, expectedSig)) {
    return { valid: false, reason: 'Invalid signature' };
  }

  if (typeByte !== 0x01 && typeByte !== 0x02) {
    return { valid: false, reason: 'Unknown key type' };
  }

  const now = Math.floor(Date.now() / 1000);
  if (expiresAt > 0 && now > expiresAt) {
    return { valid: false, reason: 'License expired' };
  }

  const type     = typeByte === 0x01 ? 'trial' : 'unlimited';
  const daysLeft = expiresAt > 0 ? Math.max(1, Math.ceil((expiresAt - now) / 86400)) : 0;

  return { valid: true, type, expiresAt, daysLeft };
}

/**
 * Returns the key as-is — masking removed since all storage is admin-only.
 * Kept as a function so call sites don't need changing.
 */
export function maskKey(rawKey: string): string {
  return rawKey;
}

/** Parse WordPress User-Agent: WordPress/6.9.1; https://example.com */
export function parseSiteInfo(userAgent: string) {
  const match = userAgent.match(/WordPress\/([\d.]+);\s*(https?:\/\/[^\s;]+)/i);
  const wpVersion = match?.[1] ?? 'Unknown';
  const siteUrl   = match?.[2] ?? 'Unknown';
  let   domain    = 'Unknown';

  try {
    if (siteUrl !== 'Unknown') domain = new URL(siteUrl).hostname;
  } catch { /* ignore */ }

  return { wpVersion, siteUrl, domain };
}

/** Extract the real client IP from Vercel/proxy headers */
export function getClientIp(headers: Record<string, string | string[] | undefined>): string {
  return String(headers['x-forwarded-for'] ?? headers['x-real-ip'] ?? 'Unknown')
    .split(',')[0]
    .trim();
}
