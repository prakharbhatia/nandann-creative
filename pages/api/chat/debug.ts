import type { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@/lib/chat/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get recent messages (last 50)
    const messagesResult = await sql`
      SELECT 
        id,
        customer_id,
        text,
        sender,
        timestamp,
        telegram_message_id
      FROM chat_messages
      ORDER BY timestamp DESC
      LIMIT 50
    `;

    // Get recent customers
    const customersResult = await sql`
      SELECT 
        id,
        name,
        email,
        phone,
        created_at
      FROM chat_customers
      ORDER BY created_at DESC
      LIMIT 20
    `;

    // Get recent admin messages specifically
    const adminMessagesResult = await sql`
      SELECT 
        id,
        customer_id,
        text,
        timestamp,
        telegram_message_id
      FROM chat_messages
      WHERE sender = 'admin'
      ORDER BY timestamp DESC
      LIMIT 20
    `;

    // Get webhook logs (if we had a table for that, but we don't, so just return what we have)
    const webhookInfo = {
      lastWebhookCall: 'Check server logs',
      note: 'Webhook calls are logged in server console'
    };

    return res.status(200).json({
      success: true,
      summary: {
        totalMessages: messagesResult.rows.length,
        adminMessages: adminMessagesResult.rows.length,
        customers: customersResult.rows.length,
      },
      recentMessages: messagesResult.rows.map(row => ({
        id: row.id,
        customerId: row.customer_id,
        text: row.text.substring(0, 100) + (row.text.length > 100 ? '...' : ''),
        sender: row.sender,
        timestamp: row.timestamp,
        telegramMessageId: row.telegram_message_id,
      })),
      adminMessages: adminMessagesResult.rows.map(row => ({
        id: row.id,
        customerId: row.customer_id,
        text: row.text.substring(0, 100) + (row.text.length > 100 ? '...' : ''),
        timestamp: row.timestamp,
        telegramMessageId: row.telegram_message_id,
      })),
      recentCustomers: customersResult.rows.map(row => ({
        id: row.id,
        name: row.name,
        email: row.email,
        phone: row.phone,
        createdAt: row.created_at,
      })),
      webhookInfo,
    });
  } catch (error) {
    console.error('Error querying database:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error instanceof Error ? error.stack : undefined,
    });
  }
}

