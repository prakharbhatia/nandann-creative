import type { NextApiRequest, NextApiResponse } from 'next';
import { TelegramWebhookUpdate } from '@/types/chat';
import { Message } from '@/types/chat';
import { getCustomer, getAllCustomersByEmail, saveMessage, createOrUpdateSession } from '@/lib/chat/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json({ status: 'ok' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const update: TelegramWebhookUpdate = req.body;

    if (update.callback_query) {
      const callbackData = update.callback_query.data;
      const message = update.callback_query.message;
      
      if (callbackData?.startsWith('reply_') && message?.text) {
        const originalText = message.text;
        
        let emailMatch = originalText.match(/\*Email:\*\s*([^\n]+)/);
        if (!emailMatch) {
          emailMatch = originalText.match(/Email:\s*([^\n]+)/);
        }
        if (!emailMatch) {
          emailMatch = originalText.match(/\(([^)]+@[^)]+)\)/);
        }
        
        const email = emailMatch ? emailMatch[1].trim() : null;
        const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        
        if (TELEGRAM_BOT_TOKEN) {
          const responseText = email 
            ? `Reply to this message to respond to ${email}`
            : 'Please reply to the message directly.';
          
          await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/answerCallbackQuery`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              callback_query_id: update.callback_query.id,
              text: responseText,
              show_alert: false,
            }),
          });
        }
      }
    }

    if (update.message && update.message.text) {
      const message = update.message;
      const replyToMessage = message.reply_to_message;

      if (replyToMessage && replyToMessage.text) {
        const originalText = replyToMessage.text;
        
        let emailMatch = originalText.match(/\*Email:\*\s*([^\n]+)/);
        if (!emailMatch) {
          emailMatch = originalText.match(/Email:\s*([^\n]+)/);
        }
        if (!emailMatch) {
          emailMatch = originalText.match(/\(([^)]+@[^)]+)\)/);
        }
        
        // Try multiple patterns to find Customer ID
        let customerIdMatch = originalText.match(/_Customer ID:\s*([^_\n]+)_/);
        if (!customerIdMatch) {
          customerIdMatch = originalText.match(/\*Customer ID:\*\s*([^\n*]+)/);
        }
        if (!customerIdMatch) {
          customerIdMatch = originalText.match(/Customer ID:\s*([^\n_*]+)/);
        }
        if (!customerIdMatch) {
          customerIdMatch = originalText.match(/Customer ID:.*?`([^`]+)`/);
        }
        // Also try to find customer_ pattern directly
        if (!customerIdMatch) {
          customerIdMatch = originalText.match(/(customer_\d+_\w+)/);
        }
        
        const email = emailMatch ? emailMatch[1].trim() : null;
        let customerId = customerIdMatch ? customerIdMatch[1].trim() : null;
        
        if (customerId && customerId.startsWith('customer') && !customerId.includes('_')) {
          const normalized = customerId.match(/^customer(\d{13})(\w+)$/);
          if (normalized) {
            customerId = `customer_${normalized[1]}_${normalized[2]}`;
          }
        }
        
        if ((email || customerId) && message.text) {
          let finalCustomerId = customerId;
          
          if (email) {
            const allCustomersWithEmail = await getAllCustomersByEmail(email);
            if (allCustomersWithEmail.length > 0) {
              finalCustomerId = allCustomersWithEmail[0].id;
            } else if (customerId) {
              finalCustomerId = customerId;
            }
          } else if (customerId) {
            const dbCustomer = await getCustomer(customerId);
            if (dbCustomer) {
              finalCustomerId = dbCustomer.id;
            } else {
              finalCustomerId = customerId;
            }
          }
          
          if (!finalCustomerId) {
            return res.status(400).json({
              ok: false,
              error: 'Could not determine customerId',
            });
          }
          
          const adminMessage: Message = {
            id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            customerId: finalCustomerId,
            text: message.text,
            sender: 'admin',
            timestamp: new Date(),
            telegramMessageId: message.message_id,
          };

          try {
            const saved = await saveMessage(adminMessage);
            if (!saved) {
              console.error('Failed to save admin message to database');
              return res.status(500).json({ 
                ok: false, 
                error: 'Failed to save message to database',
              });
            }
            await createOrUpdateSession(finalCustomerId);
            
            console.log('Admin message saved successfully:', {
              messageId: adminMessage.id,
              customerId: finalCustomerId,
              text: message.text.substring(0, 50),
            });
          } catch (error) {
            console.error('Error saving message to database:', error);
            return res.status(500).json({ 
              ok: false, 
              error: error instanceof Error ? error.message : 'Database error',
            });
          }

          return res.status(200).json({ 
            ok: true, 
            email, 
            customerId: finalCustomerId,
            messageId: adminMessage.id,
          });
        }
      }
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Error in Telegram webhook:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

