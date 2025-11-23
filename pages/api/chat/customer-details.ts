import type { NextApiRequest, NextApiResponse } from 'next';
import { getClientInfo } from '@/lib/chat/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const clientInfo = getClientInfo(req);
    return res.status(200).json({
      success: true,
      data: clientInfo,
    });
  } catch (error) {
    console.error('Error in customer details API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

