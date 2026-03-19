import type { NextApiRequest, NextApiResponse } from 'next';
import { initBookingsTable, getBookedSlotTimes } from '../../lib/bookings/db';

const MORNING_SLOTS = [
  { hour: 7, minute: 30 },
  { hour: 8, minute: 0 },
  { hour: 8, minute: 30 },
  { hour: 9, minute: 0 },
  { hour: 9, minute: 30 },
  { hour: 10, minute: 0 },
];
const EVENING_SLOTS = [
  { hour: 18, minute: 0 },
  { hour: 18, minute: 30 },
  { hour: 19, minute: 0 },
  { hour: 19, minute: 30 },
];
const ALL_SLOT_TIMES = [...MORNING_SLOTS, ...EVENING_SLOTS];

// Convert a local New York time to UTC Date
// Works correctly across DST boundaries using Intl
function nyLocalToUTC(dateStr: string, hour: number, minute: number): Date {
  // dateStr = 'YYYY-MM-DD' in New York date
  // Strategy: try EDT offset (-4) first since we're in spring/summer, then EST (-5)
  for (const offsetHours of [4, 5]) {
    const utcHour = hour + offsetHours;
    const [y, m, d] = dateStr.split('-').map(Number);
    const candidate = new Date(Date.UTC(y, m - 1, d, utcHour, minute, 0, 0));
    // Verify: does New York show the right local time for this UTC?
    const nyStr = candidate.toLocaleString('en-US', {
      timeZone: 'America/New_York',
      hour: 'numeric',
      minute: '2-digit',
      hour12: false,
    });
    const [nyH, nyM] = nyStr.split(':').map(Number);
    if (nyH === hour && nyM === minute) return candidate;
  }
  // Fallback
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d, hour + 5, minute, 0, 0));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    await initBookingsTable();

    const now = new Date();
    const twoWeeksOut = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

    const booked = new Set(await getBookedSlotTimes(now, twoWeeksOut));

    const available: string[] = [];

    for (let dayOffset = 0; dayOffset < 14; dayOffset++) {
      const dayUTC = new Date(now.getTime() + dayOffset * 24 * 60 * 60 * 1000);
      // Get date string in New York timezone (YYYY-MM-DD)
      const dateStr = dayUTC.toLocaleDateString('en-CA', { timeZone: 'America/New_York' });

      for (const { hour, minute } of ALL_SLOT_TIMES) {
        const slotUTC = nyLocalToUTC(dateStr, hour, minute);
        // Skip past or current slots (add 1 hour buffer so you can't book within 1 hour)
        if (slotUTC.getTime() <= now.getTime() + 60 * 60 * 1000) continue;
        if (booked.has(slotUTC.toISOString())) continue;
        available.push(slotUTC.toISOString());
      }
    }

    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({ slots: available });
  } catch (err) {
    console.error('Slots API error:', err);
    res.status(500).json({ error: 'Failed to load slots' });
  }
}
