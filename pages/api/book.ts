import type { NextApiRequest, NextApiResponse } from 'next';
import { initBookingsTable, bookSlot } from '../../lib/bookings/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { slotTime, name, email, topic } = req.body;

  if (!slotTime || !name || !email) {
    return res.status(400).json({ error: 'slotTime, name, and email are required' });
  }

  const slotDate = new Date(slotTime);
  if (isNaN(slotDate.getTime())) {
    return res.status(400).json({ error: 'Invalid slotTime' });
  }

  // Must not be in the past
  if (slotDate.getTime() <= Date.now()) {
    return res.status(400).json({ error: 'Cannot book a slot in the past' });
  }

  try {
    await initBookingsTable();
    const id = `booking_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    const result = await bookSlot(id, slotDate, name.trim(), email.trim().toLowerCase(), topic?.trim() || '');

    if (!result.success) {
      return res.status(409).json({ error: result.error });
    }

    // Optional: send Formspree notification
    try {
      await fetch('https://formspree.io/f/mrblqbgw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _subject: `New Call Booked: ${name} — ${new Date(slotTime).toUTCString()}`,
          name,
          email,
          topic: topic || '(not specified)',
          slot: new Date(slotTime).toLocaleString('en-US', { timeZone: 'America/New_York', dateStyle: 'full', timeStyle: 'short' }) + ' ET',
        }),
      });
    } catch (_) { /* email failure should not fail the booking */ }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Book API error:', err);
    return res.status(500).json({ error: 'Booking failed. Please try again.' });
  }
}
