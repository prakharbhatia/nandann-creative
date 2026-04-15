import { Resend } from 'resend';
import type { KeyInfo } from './license';
import type { VerificationRecord } from './db';

const resend      = new Resend(process.env.RESEND_API_KEY ?? '');
const FROM_EMAIL  = process.env.PIXLIFY_NOTIFY_FROM ?? 'Pixlify <updates@nandann.com>';
const NOTIFY_TO   = process.env.PIXLIFY_NOTIFY_TO   ?? 'prakharb88@gmail.com';

const EVENT_LABELS: Record<string, string> = {
  activate: 'License Activated',
  download: 'Update Downloaded',
  check:    'License Checked',
};

export async function sendVerificationEmail(
  rec:     VerificationRecord,
  keyInfo: KeyInfo,
): Promise<void> {
  if (!process.env.RESEND_API_KEY) return;

  const eventLabel  = EVENT_LABELS[rec.eventType] ?? rec.eventType;
  const statusColor = rec.success ? '#16a34a' : '#dc2626';
  const statusBg    = rec.success ? '#f0fdf4' : '#fef2f2';
  const statusBdr   = rec.success ? '#bbf7d0' : '#fecaca';
  const statusText  = rec.success ? 'SUCCESS' : 'FAILED';

  const licMeta = !rec.success
    ? `<span style="color:#dc2626;">${keyInfo.reason ?? 'Unknown'}</span>`
    : keyInfo.type === 'trial'
      ? `Trial — ${keyInfo.daysLeft} day(s) remaining`
      : 'Unlimited';

  const subject = rec.success
    ? `${rec.isNewDomain ? '🆕 NEW DOMAIN — ' : ''}✅ Pixlify ${rec.eventType}: ${rec.domain} — ${rec.pluginVer}`
    : `❌ Pixlify ${rec.eventType} FAILED: ${rec.domain}`;

  await resend.emails.send({
    from:    FROM_EMAIL,
    to:      NOTIFY_TO,
    subject,
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f1f5f9;margin:0;padding:32px;">
        <div style="max-width:540px;margin:0 auto;background:#fff;border-radius:12px;border:1px solid #e5e7eb;overflow:hidden;">

          <!-- Header -->
          <div style="background:#111827;padding:18px 26px;display:flex;align-items:center;gap:12px;">
            <div style="width:36px;height:36px;background:${statusColor};border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px;">
              ${rec.success ? '⚡' : '🚫'}
            </div>
            <div>
              <div style="color:#fff;font-weight:700;font-size:15px;">Pixlify — ${eventLabel}</div>
              <div style="color:#9ca3af;font-size:12px;">${new Date().toUTCString()}</div>
            </div>
            <div style="margin-left:auto;">
              <span style="background:${statusBg};color:${statusColor};border:1px solid ${statusBdr};padding:3px 10px;border-radius:12px;font-size:11px;font-weight:700;letter-spacing:.05em;">
                ${statusText}
              </span>
            </div>
          </div>

          <!-- New domain banner -->
          ${rec.isNewDomain ? `
          <div style="padding:10px 26px;background:#eff6ff;border-bottom:1px solid #bfdbfe;font-size:12px;color:#1d4ed8;font-weight:600;">
            🆕 First time seeing this domain — new install or new license activation
          </div>` : ''}

          <!-- Body -->
          <div style="padding:22px 26px;">
            <table style="width:100%;border-collapse:collapse;font-size:13px;">
              <tr style="border-bottom:1px solid #f1f5f9;">
                <td style="padding:9px 0;color:#6b7280;width:130px;">Site URL</td>
                <td style="padding:9px 0;color:#111827;font-weight:600;">
                  ${rec.siteUrl !== 'Unknown'
                    ? `<a href="${rec.siteUrl}" style="color:#2563eb;">${rec.siteUrl}</a>`
                    : 'Unknown'}
                </td>
              </tr>
              <tr style="border-bottom:1px solid #f1f5f9;">
                <td style="padding:9px 0;color:#6b7280;">Domain</td>
                <td style="padding:9px 0;color:#111827;font-weight:600;">${rec.domain}</td>
              </tr>
              <tr style="border-bottom:1px solid #f1f5f9;">
                <td style="padding:9px 0;color:#6b7280;">WordPress</td>
                <td style="padding:9px 0;color:#111827;">${rec.wpVersion}</td>
              </tr>
              <tr style="border-bottom:1px solid #f1f5f9;">
                <td style="padding:9px 0;color:#6b7280;">Plugin Version</td>
                <td style="padding:9px 0;color:#111827;">${rec.pluginVer || '—'}</td>
              </tr>
              <tr style="border-bottom:1px solid #f1f5f9;">
                <td style="padding:9px 0;color:#6b7280;">License</td>
                <td style="padding:9px 0;">${licMeta}</td>
              </tr>
              <tr style="border-bottom:1px solid #f1f5f9;">
                <td style="padding:9px 0;color:#6b7280;">Key</td>
                <td style="padding:9px 0;color:#111827;font-family:monospace;font-size:12px;">${rec.keyFull ?? rec.keyMasked}</td>
              </tr>
              <tr style="border-bottom:1px solid #f1f5f9;">
                <td style="padding:9px 0;color:#6b7280;">Event</td>
                <td style="padding:9px 0;color:#111827;">${eventLabel}</td>
              </tr>
              <tr style="border-bottom:1px solid #f1f5f9;">
                <td style="padding:9px 0;color:#6b7280;">IP Address</td>
                <td style="padding:9px 0;color:#111827;">${rec.ip}</td>
              </tr>
              ${!rec.success ? `
              <tr>
                <td style="padding:9px 0;color:#6b7280;">Fail Reason</td>
                <td style="padding:9px 0;color:#dc2626;font-weight:600;">${rec.failReason ?? 'Unknown'}</td>
              </tr>` : ''}
            </table>
          </div>

          <div style="padding:12px 26px;background:#f8fafc;border-top:1px solid #e5e7eb;">
            <p style="margin:0;font-size:11px;color:#9ca3af;">
              Pixlify license server · <a href="https://www.nandann.com" style="color:#9ca3af;">nandann.com</a>
            </p>
          </div>

        </div>
      </body>
      </html>
    `,
  });
}
