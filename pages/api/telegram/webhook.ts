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

    // Log the full update for debugging
    console.log('=== Telegram Webhook Received ===');
    console.log('Update ID:', update.update_id);
    console.log('Has Message:', !!update.message);
    console.log('Has Callback Query:', !!update.callback_query);
    console.log('Message Text:', update.message?.text);
    console.log('Is Reply:', !!update.message?.reply_to_message);
    console.log('Reply To Message Text:', update.message?.reply_to_message?.text?.substring(0, 200));
    console.log('Full Update:', JSON.stringify(update, null, 2));
    console.log('================================');

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
        
        console.log('Processing reply to message:', {
          replyText: message.text ? message.text.substring(0, 50) : 'No text',
          originalTextPreview: originalText.substring(0, 500),
          fullOriginalText: originalText,
        });
        
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
        
        console.log('Extracted from message:', {
          email,
          customerId,
          emailMatch: emailMatch ? emailMatch[0] : null,
          customerIdMatch: customerIdMatch ? customerIdMatch[0] : null,
        });
        
        if (customerId && customerId.startsWith('customer') && !customerId.includes('_')) {
          const normalized = customerId.match(/^customer(\d{13})(\w+)$/);
          if (normalized) {
            customerId = `customer_${normalized[1]}_${normalized[2]}`;
            console.log('Normalized customerId:', customerId);
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
              console.log(`Found customer by email: ${email} -> ${finalCustomerId}`);
            } else if (customerId) {
              // Try to validate customerId exists
              const dbCustomer = await getCustomer(customerId);
              if (dbCustomer) {
                finalCustomerId = dbCustomer.id;
                console.log(`Found customer by ID: ${customerId}`);
              } else {
                finalCustomerId = customerId;
                console.log(`Using provided customerId (not validated): ${customerId}`);
              }
            }
          } else if (customerId) {
            const dbCustomer = await getCustomer(customerId);
            if (dbCustomer) {
              finalCustomerId = dbCustomer.id;
              console.log(`Found customer by ID: ${customerId}`);
            } else {
              finalCustomerId = customerId;
              console.log(`Using provided customerId (not validated): ${customerId}`);
            }
          }
          
          if (!finalCustomerId) {
            console.error('Could not determine customerId:', {
              email,
              customerId,
              emailCustomers: email ? (await getAllCustomersByEmail(email)).length : 0,
              originalTextPreview: originalText.substring(0, 300),
            });
            return res.status(400).json({
              ok: false,
              error: 'Could not determine customerId',
            });
          }
          
          console.log('Final customerId determined:', finalCustomerId);
          
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
            
            console.log('✅ Admin message saved successfully:', {
              messageId: adminMessage.id,
              customerId: finalCustomerId,
              text: message.text.substring(0, 50),
              timestamp: adminMessage.timestamp,
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
        } else {
          console.log('⚠️ Reply detected but missing email/customerId or message text:', {
            hasEmail: !!email,
            hasCustomerId: !!customerId,
            hasMessageText: !!message.text,
            originalTextPreview: replyToMessage.text.substring(0, 500),
            fullOriginalText: replyToMessage.text,
          });
        }
      } else {
        console.log('ℹ️ Message received but not a reply to another message');
        console.log('Message text:', message.text);
        console.log('Has reply_to_message:', !!message.reply_to_message);
      }
    } else {
      console.log('ℹ️ Update received but no message text');
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Error in Telegram webhook:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

