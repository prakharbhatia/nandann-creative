import type { NextApiRequest, NextApiResponse } from 'next';
import { getMessages, createOrUpdateSession } from '@/lib/chat/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const customerId = req.query.customerId as string;

    if (!customerId) {
      return res.status(400).json({ error: 'customerId is required' });
    }

    await createOrUpdateSession(customerId);
    const messages = await getMessages(customerId);

    return res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error('Error in get messages API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

