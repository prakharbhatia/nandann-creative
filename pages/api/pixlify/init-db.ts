import type { NextApiRequest, NextApiResponse } from 'next';
import { ensureSchema } from '../../../lib/pixlify/db';

/**
 * GET /api/pixlify/init-db?secret=YOUR_ADMIN_SECRET
 * One-time endpoint to create the pixlify_verifications table.
 * Protect with a simple secret param.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { secret } = req.query;
  if (secret !== process.env.PIXLIFY_ADMIN_SECRET) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  try {
    await ensureSchema();
    res.status(200).json({ ok: true, message: 'pixlify_verifications table ready' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
