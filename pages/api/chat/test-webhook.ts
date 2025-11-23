import type { NextApiRequest, NextApiResponse } from 'next';
import { getWebhookInfo } from '@/lib/chat/telegram';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const webhookInfo = await getWebhookInfo();
    
    const host = req.headers.host;
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const expectedWebhookUrl = `${protocol}://${host}/api/telegram/webhook`;

    return res.status(200).json({
      success: true,
      webhookInfo,
      expectedWebhookUrl,
      isConfigured: webhookInfo?.result?.url === expectedWebhookUrl,
      currentWebhookUrl: webhookInfo?.result?.url,
      pendingUpdates: webhookInfo?.result?.pending_update_count || 0,
      lastError: webhookInfo?.result?.last_error_message || null,
      lastErrorDate: webhookInfo?.result?.last_error_date || null,
    });
  } catch (error) {
    console.error('Error getting webhook info:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

