import type { NextApiRequest, NextApiResponse } from 'next';
import { addToBlacklist, removeFromBlacklist, getBlacklist } from '../../../lib/pixlify/db';

/**
 * GET  /api/pixlify/blacklist?secret=...          — list blacklisted keys
 * POST /api/pixlify/blacklist?secret=...          — add key  { key_masked, reason }
 * DELETE /api/pixlify/blacklist?secret=...        — remove   { key_masked }
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.secret !== process.env.PIXLIFY_ADMIN_SECRET) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  if (req.method === 'GET') {
    const list = await getBlacklist();
    return res.status(200).json({ list });
  }

  if (req.method === 'POST') {
    const { key_masked, reason } = req.body ?? {};
    if (!key_masked) return res.status(400).json({ error: 'key_masked required' });
    await addToBlacklist(String(key_masked), String(reason ?? ''));
    return res.status(200).json({ ok: true });
  }

  if (req.method === 'DELETE') {
    const { key_masked } = req.body ?? {};
    if (!key_masked) return res.status(400).json({ error: 'key_masked required' });
    await removeFromBlacklist(String(key_masked));
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
