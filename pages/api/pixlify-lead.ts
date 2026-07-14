import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend     = new Resend(process.env.RESEND_API_KEY ?? '');
const FROM_EMAIL = process.env.PIXLIFY_NOTIFY_FROM ?? 'Pixlify <updates@nandann.com>';
const NOTIFY_TO  = process.env.PIXLIFY_NOTIFY_TO  ?? 'prakharb88@gmail.com';

const SOURCE_LABELS: Record<string, string> = {
    hero:    'Hero section',
    pricing: 'Pricing section',
    cta:     'Bottom CTA',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).end();

    const { name, email, source } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'name and email are required' });
    }

    const sourceLabel = SOURCE_LABELS[source] ?? source ?? 'Unknown';
    const timestamp = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'full',
        timeStyle: 'short',
    }) + ' IST';

    // Send email and surface any errors in the response for debugging
    if (process.env.RESEND_API_KEY) {
        const { data, error } = await resend.emails.send({
            from:    FROM_EMAIL,
            to:      NOTIFY_TO,
            subject: `💰 Pixlify Purchase Intent — ${name} <${email}>`,
            html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f1f5f9;margin:0;padding:32px;">
  <div style="max-width:500px;margin:0 auto;background:#fff;border-radius:12px;border:1px solid #e5e7eb;overflow:hidden;">

    <!-- Header -->
    <div style="background:#111827;padding:18px 26px;display:flex;align-items:center;gap:12px;">
      <div style="width:36px;height:36px;background:#16a34a;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:20px;">💰</div>
      <div>
        <div style="color:#fff;font-weight:700;font-size:15px;">Pixlify — Purchase Intent</div>
        <div style="color:#9ca3af;font-size:12px;">${timestamp}</div>
      </div>
      <div style="margin-left:auto;">
        <span style="background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0;padding:3px 10px;border-radius:12px;font-size:11px;font-weight:700;letter-spacing:.05em;">
          LEAD
        </span>
      </div>
    </div>

    <!-- Body -->
    <div style="padding:22px 26px;">
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:9px 0;color:#6b7280;width:120px;">Name</td>
          <td style="padding:9px 0;color:#111827;font-weight:600;">${name}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:9px 0;color:#6b7280;">Email</td>
          <td style="padding:9px 0;">
            <a href="mailto:${email}" style="color:#2563eb;font-weight:600;">${email}</a>
          </td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:9px 0;color:#6b7280;">Form location</td>
          <td style="padding:9px 0;color:#111827;">${sourceLabel}</td>
        </tr>
        <tr>
          <td style="padding:9px 0;color:#6b7280;">PayPal link</td>
          <td style="padding:9px 0;">
            <a href="https://paypal.me/NANDANNC/240usd" style="color:#2563eb;">paypal.me/NANDANNC/240usd</a>
          </td>
        </tr>
      </table>

      <div style="margin-top:20px;padding:12px 16px;background:#fefce8;border:1px solid #fde68a;border-radius:8px;font-size:12px;color:#92400e;">
        ⚠️ This lead was captured <strong>before</strong> the PayPal redirect. Payment may or may not be complete.
        Follow up if you don't see a PayPal notification within a few minutes.
      </div>
    </div>

    <div style="padding:12px 26px;background:#f8fafc;border-top:1px solid #e5e7eb;">
      <p style="margin:0;font-size:11px;color:#9ca3af;">
        Pixlify sales · <a href="https://www.nandann.com/pixlify-image-optimizer" style="color:#9ca3af;">nandann.com</a>
      </p>
    </div>

  </div>
</body>
</html>`,
        });
        if (error) {
            console.error('Resend lead email failed:', error);
            return res.status(200).json({ success: true, emailSent: false, emailError: error });
        }
        return res.status(200).json({ success: true, emailSent: true, emailId: data?.id });
    }

    return res.status(200).json({ success: true, emailSent: false, reason: 'RESEND_API_KEY not set' });
}
