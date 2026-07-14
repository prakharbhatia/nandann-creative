import type { NextApiRequest, NextApiResponse } from 'next';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mrblqbgw';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).end();

    const { name, email, source } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'name and email are required' });
    }

    const timestamp = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'full',
        timeStyle: 'short',
    });

    try {
        await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                _subject: `💰 Pixlify Purchase Intent — ${name} <${email}>`,
                name,
                email,
                source: source || 'unknown',
                time: timestamp,
                note: 'This lead was captured before the PayPal redirect. May or may not have completed payment.',
            }),
        });

        return res.status(200).json({ success: true });
    } catch (err) {
        console.error('Pixlify lead capture error:', err);
        // Don't block the user — still return success so the PayPal redirect happens
        return res.status(200).json({ success: true });
    }
}
