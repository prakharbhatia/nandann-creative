import type { NextApiRequest, NextApiResponse } from 'next'

type Strategy = 'mobile' | 'desktop'

type MetricSummary = {
  performance: number
  fcp?: string
  lcp?: string
  cls?: string
  tbt?: string
  inp?: string
}

type AuditResult = {
  url: string
  mobile: MetricSummary
  desktop: MetricSummary
}

// Simple in-memory cache for 24h to protect API quota
const cache = new Map<string, { expiry: number; value: MetricSummary }>()
const ONE_DAY_MS = 24 * 60 * 60 * 1000

function makeCacheKey(url: string, strategy: Strategy): string {
  return `${strategy}|${url}`
}

function formatMs(ms?: number): string | undefined {
  if (ms == null) return undefined
  return `${Math.round(ms)} ms`
}

function formatSec(ms?: number): string | undefined {
  if (ms == null) return undefined
  return `${(ms / 1000).toFixed(2)} s`
}

async function fetchPSI(url: string, strategy: Strategy): Promise<MetricSummary> {
  const key = makeCacheKey(url, strategy)
  const now = Date.now()
  const cached = cache.get(key)
  if (cached && cached.expiry > now) return cached.value

  const params = new URLSearchParams({ url, strategy })
  if (process.env.PSI_API_KEY) params.set('key', process.env.PSI_API_KEY)

  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params.toString()}`
  const res = await fetch(apiUrl)
  if (!res.ok) throw new Error(`PageSpeed API error (${strategy}): ${res.status}`)
  const data = await res.json()

  const lr = data?.lighthouseResult
  const audits = lr?.audits
  const perfScore = Math.round((lr?.categories?.performance?.score ?? 0) * 100)

  const summary: MetricSummary = {
    performance: perfScore,
    fcp: formatSec(audits?.['first-contentful-paint']?.numericValue),
    lcp: formatSec(audits?.['largest-contentful-paint']?.numericValue),
    cls: audits?.['cumulative-layout-shift']?.displayValue,
    tbt: formatMs(audits?.['total-blocking-time']?.numericValue),
    inp: audits?.['interactive']?.displayValue,
  }

  cache.set(key, { expiry: now + ONE_DAY_MS, value: summary })
  return summary
}

async function maybeSendEmail(to: string, result: AuditResult) {
  const host = process.env.SMTP_HOST
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const from = process.env.MAIL_FROM || 'reports@nandann.com'
  if (!host || !user || !pass) return // email not configured

  // @ts-ignore - defer type resolution; module exists at runtime
  const nodemailer = (await import('nodemailer')).default as any
  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: { user, pass },
  })

  const html = `
    <div style="font-family:system-ui,Segoe UI,Helvetica,Arial,sans-serif;line-height:1.6">
      <h2 style="margin:0 0 12px">Your PageSpeed Audit</h2>
      <p><strong>URL:</strong> ${result.url}</p>
      <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;border:1px solid #eee">
        <thead>
          <tr style="background:#f6f7f9"><th></th><th>Performance</th><th>FCP</th><th>LCP</th><th>CLS</th><th>TBT</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Mobile</strong></td><td>${result.mobile.performance}</td><td>${result.mobile.fcp ?? '-'}</td><td>${result.mobile.lcp ?? '-'}</td><td>${result.mobile.cls ?? '-'}</td><td>${result.mobile.tbt ?? '-'}</td></tr>
          <tr><td><strong>Desktop</strong></td><td>${result.desktop.performance}</td><td>${result.desktop.fcp ?? '-'}</td><td>${result.desktop.lcp ?? '-'}</td><td>${result.desktop.cls ?? '-'}</td><td>${result.desktop.tbt ?? '-'}</td></tr>
        </tbody>
      </table>
      <p style="margin-top:16px">Thanks for using Nandann’s PageSpeed checker.</p>
    </div>
  `

  await transporter.sendMail({ to, from, subject: 'Your PageSpeed Audit Results', html })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { url, email } = req.body as { url?: string; email?: string }

  if (!url || !/^https?:\/\//i.test(url)) return res.status(400).json({ error: 'Valid URL (https://...) required' })
  if (!email || !/.+@.+\..+/.test(email)) return res.status(400).json({ error: 'Valid email required' })

  try {
    const [mobile, desktop] = await Promise.all([
      fetchPSI(url, 'mobile'),
      fetchPSI(url, 'desktop'),
    ])

    const result: AuditResult = { url, mobile, desktop }

    // Fire and forget email (do not block response)
    maybeSendEmail(email, result).catch(() => {})

    return res.status(200).json({ ok: true, result })
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || 'Unexpected error' })
  }
}

