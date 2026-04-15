import type { NextApiRequest, NextApiResponse } from 'next';
import { getDomains } from '../../../lib/pixlify/db';

/**
 * GET /api/pixlify/domains?secret=YOUR_ADMIN_SECRET
 * Returns the list of all active domains with their stats.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.secret !== process.env.PIXLIFY_ADMIN_SECRET) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  try {
    const domains = await getDomains();
    res.status(200).json({ total: domains.length, domains });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
