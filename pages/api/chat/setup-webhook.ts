import type { NextApiRequest, NextApiResponse } from 'next';
import { setWebhook, getWebhookInfo } from '@/lib/chat/telegram';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    
    if (!TELEGRAM_BOT_TOKEN) {
      return res.status(500).json({
        error: 'TELEGRAM_BOT_TOKEN not configured',
        success: false,
      });
    }

    const host = req.headers.host;
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const webhookUrl = `${protocol}://${host}/api/telegram/webhook`;

    const success = await setWebhook(webhookUrl);

    if (success) {
      const webhookInfo = await getWebhookInfo();
      
      return res.status(200).json({
        success: true,
        message: 'Webhook configured successfully',
        webhookUrl,
        webhookInfo,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Failed to set webhook',
        webhookUrl,
      });
    }
  } catch (error) {
    console.error('Error setting up webhook:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

