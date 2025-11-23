import type { NextApiRequest, NextApiResponse } from 'next';

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

    // Get pending updates
    const updatesResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`);
    const updatesData = await updatesResponse.json();

    if (!updatesData.ok) {
      return res.status(500).json({
        success: false,
        error: updatesData.description || 'Failed to get updates',
      });
    }

    const pendingUpdates = updatesData.result || [];
    
    // Process each update by forwarding to our webhook
    const host = req.headers.host;
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const webhookUrl = `${protocol}://${host}/api/telegram/webhook`;

    const processed = [];
    for (const update of pendingUpdates) {
      try {
        const webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(update),
        });
        const webhookResult = await webhookResponse.json();
        processed.push({
          updateId: update.update_id,
          success: webhookResponse.ok,
          result: webhookResult,
        });
      } catch (error) {
        processed.push({
          updateId: update.update_id,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    return res.status(200).json({
      success: true,
      totalPending: pendingUpdates.length,
      processed: processed.length,
      results: processed,
    });
  } catch (error) {
    console.error('Error processing pending updates:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

