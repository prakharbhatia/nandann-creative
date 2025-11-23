import type { NextApiRequest, NextApiResponse } from 'next';
import { TelegramWebhookUpdate } from '@/types/chat';
import { Message } from '@/types/chat';
import { getCustomer, getAllCustomersByEmail, saveMessage, createOrUpdateSession } from '@/lib/chat/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Always return 200 OK immediately to Telegram to acknowledge receipt
  // This prevents Telegram from retrying and marking as failed
  res.status(200).json({ ok: true });

  if (req.method === 'GET') {
    return;
  }

  if (req.method !== 'POST') {
    return;
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

      // Check if this is a reply to a message
      if (replyToMessage && replyToMessage.text) {
        const originalText = replyToMessage.text;
        
        
        // Try multiple email patterns
        let emailMatch = originalText.match(/\*Email:\*\s*([^\n*]+)/);
        if (!emailMatch) {
          emailMatch = originalText.match(/Email:\s*([^\n]+)/);
        }
        if (!emailMatch) {
          emailMatch = originalText.match(/\(([^)]+@[^)]+)\)/);
        }
        if (!emailMatch) {
          emailMatch = originalText.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
        }
        
        // Try multiple patterns to find Customer ID - try the most specific first
        let customerIdMatch = originalText.match(/(customer_\d+_\w+)/);
        if (!customerIdMatch) {
          customerIdMatch = originalText.match(/_Customer ID:\s*([^_\n]+)_/);
        }
        if (!customerIdMatch) {
          customerIdMatch = originalText.match(/\*Customer ID:\*\s*([^\n*]+)/);
        }
        if (!customerIdMatch) {
          customerIdMatch = originalText.match(/Customer ID:\s*([^\n_*]+)/);
        }
        if (!customerIdMatch) {
          customerIdMatch = originalText.match(/Customer ID:.*?`([^`]+)`/);
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
          
          // Priority: email lookup > customerId lookup > use customerId as-is
          if (email) {
            const allCustomersWithEmail = await getAllCustomersByEmail(email);
            if (allCustomersWithEmail.length > 0) {
              // Use the most recent customer with this email
              finalCustomerId = allCustomersWithEmail[0].id;
            } else if (customerId) {
              // Try to validate customerId exists
              const dbCustomer = await getCustomer(customerId);
              if (dbCustomer) {
                finalCustomerId = dbCustomer.id;
              } else {
                finalCustomerId = customerId;
              }
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
            console.error('Could not determine customerId from Telegram reply');
            return;
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
              return;
            }
            await createOrUpdateSession(finalCustomerId);
          } catch (error) {
            console.error('Error saving message to database:', error);
            return;
          }
          return;
        }
      }
    }

    // All done - we already sent 200 OK at the start
    return;
  } catch (error) {
    console.error('Error in Telegram webhook:', error);
    return;
  }
}

