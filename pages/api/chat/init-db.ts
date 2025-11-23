import type { NextApiRequest, NextApiResponse } from 'next';
import { initializeDatabase } from '@/lib/chat/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Database initialization timeout after 25 seconds')), 25000);
    });

    const initPromise = initializeDatabase();
    
    await Promise.race([initPromise, timeoutPromise]);
    
    return res.status(200).json({
      success: true,
      message: 'Database initialized successfully',
      tables: ['chat_customers', 'chat_messages', 'chat_sessions'],
    });
  } catch (error: any) {
    console.error('Error in init-db:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'Internal server error',
      code: error.code,
    });
  }
}

