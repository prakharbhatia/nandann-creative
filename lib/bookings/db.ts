import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.CHAT__POSTGRES_URL,
  ssl: { rejectUnauthorized: false },
  max: 1,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

const sql = (strings: TemplateStringsArray, ...values: any[]) => {
  let queryText = strings[0];
  const params: any[] = [];
  for (let i = 0; i < values.length; i++) {
    queryText += `$${i + 1}`;
    params.push(values[i]);
    queryText += strings[i + 1];
  }
  return pool.query(queryText, params);
};

export async function initBookingsTable(): Promise<void> {
  await sql`
    CREATE TABLE IF NOT EXISTS call_bookings (
      id VARCHAR(255) PRIMARY KEY,
      slot_time TIMESTAMPTZ NOT NULL,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      topic TEXT,
      status VARCHAR(50) DEFAULT 'confirmed',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(slot_time)
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_bookings_slot_time ON call_bookings(slot_time)`;
}

export async function getBookedSlotTimes(from: Date, to: Date): Promise<string[]> {
  const result = await sql`
    SELECT slot_time FROM call_bookings
    WHERE slot_time >= ${from.toISOString()}
      AND slot_time < ${to.toISOString()}
      AND status = 'confirmed'
  `;
  return result.rows.map((r: any) => new Date(r.slot_time).toISOString());
}

export async function bookSlot(
  id: string,
  slotTime: Date,
  name: string,
  email: string,
  topic: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await sql`
      INSERT INTO call_bookings (id, slot_time, name, email, topic)
      VALUES (${id}, ${slotTime.toISOString()}, ${name}, ${email}, ${topic})
    `;
    return { success: true };
  } catch (err: any) {
    if (err.code === '23505') {
      return { success: false, error: 'This slot was just taken. Please pick another time.' };
    }
    throw err;
  }
}
