import type { NextApiRequest, NextApiResponse } from 'next';
import { createHmac, randomBytes } from 'crypto';

const SECRET = process.env.PIXLIFY_LICENSE_SECRET ?? '';

/**
 * POST /api/pixlify/generate-key?secret=...
 * Body: { type: 'trial' | 'unlimited', days?: number }
 *
 * Mirrors the PHP generate_key() logic exactly.
 * Key structure (16 bytes → 32 hex → formatted with PXLF- prefix):
 *   Byte 0    : type  (0x01 trial, 0x02 unlimited)
 *   Bytes 1–4 : expiry big-endian uint32 (0 = no expiry)
 *   Bytes 5–7 : random nonce (3 bytes)
 *   Bytes 8–15: first 8 bytes of HMAC-SHA256(bytes[0..7], secret)
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (req.query.secret !== process.env.PIXLIFY_ADMIN_SECRET) return res.status(403).json({ error: 'Forbidden' });
  if (!SECRET) return res.status(500).json({ error: 'Server misconfiguration — secret not set' });

  const { type, days, hours } = req.body ?? {};

  const typeByte = type === 'unlimited' ? 0x02 : 0x01;

  let expiresAt: number;
  if (type === 'unlimited') {
    expiresAt = 0;
  } else if (hours !== undefined) {
    // hours can be negative to generate already-expired keys for testing
    expiresAt = Math.floor(Date.now() / 1000) + parseInt(String(hours), 10) * 3600;
  } else {
    const daysNum = Math.max(1, parseInt(String(days ?? 30), 10));
    expiresAt = Math.floor(Date.now() / 1000) + daysNum * 86400;
  }

  const daysNum = expiresAt > 0
    ? Math.max(0, Math.ceil((expiresAt - Date.now() / 1000) / 86400))
    : 0;

  const bytes = Buffer.alloc(16);
  bytes[0] = typeByte;
  bytes.writeUInt32BE(expiresAt, 1);
  randomBytes(3).copy(bytes, 5);   // bytes 5-7: nonce

  const hmac = createHmac('sha256', SECRET).update(bytes.slice(0, 8)).digest();
  hmac.copy(bytes, 8, 0, 8);       // bytes 8-15: first 8 bytes of HMAC

  const hex  = bytes.toString('hex').toUpperCase();
  const key  = `PXLF-${hex.slice(0,8)}-${hex.slice(8,16)}-${hex.slice(16,24)}-${hex.slice(24,32)}`;

  return res.status(200).json({
    key,
    type:       typeByte === 0x02 ? 'unlimited' : 'trial',
    expires_at: expiresAt,
    days_left:  daysNum > 0 ? daysNum : null,
  });
}
