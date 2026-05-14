import type { NextApiRequest, NextApiResponse } from 'next';
import {
  addToNoUpdates,
  removeFromNoUpdates,
  getNoUpdatesList,
} from '../../../lib/pixlify/db';

/**
 * Admin endpoint for the per-key "no updates" list.
 *
 * GET    /api/pixlify/no-updates?secret=...   — list keys
 * POST   /api/pixlify/no-updates?secret=...   — add    { key_masked, reason }
 * DELETE /api/pixlify/no-updates?secret=...   — remove { key_masked }
 *
 * Keys on this list keep working (frontend serving, downloads, etc.) but the
 * /api/pixlify/update-info endpoint returns an empty manifest when called
 * with their key, so the WordPress update screen never shows a new version.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.secret !== process.env.PIXLIFY_ADMIN_SECRET) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  if (req.method === 'GET') {
    const list = await getNoUpdatesList();
    return res.status(200).json({ list });
  }

  if (req.method === 'POST') {
    const { key_masked, reason } = req.body ?? {};
    if (!key_masked) return res.status(400).json({ error: 'key_masked required' });
    await addToNoUpdates(String(key_masked), String(reason ?? ''));
    return res.status(200).json({ ok: true });
  }

  if (req.method === 'DELETE') {
    const { key_masked } = req.body ?? {};
    if (!key_masked) return res.status(400).json({ error: 'key_masked required' });
    await removeFromNoUpdates(String(key_masked));
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
