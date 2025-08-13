import React, { useState } from 'react'
import Head from 'next/head'

export default function PageSpeedTool() {
  const [email, setEmail] = useState('')
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<any>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setData(null)
    setLoading(true)
    try {
      const res = await fetch('/api/pagespeed-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, url }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed')
      setData(json.result)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>PageSpeed Score Checker | Nandann</title>
        <meta name="description" content="Check your website’s PageSpeed scores for mobile and desktop. Get results emailed and see instant recommendations." />
      </Head>
      <main className="min-h-screen bg-gradient-to-b from-black via-[#0b0b14] to-black text-white py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">PageSpeed Score Checker</h1>
          <p className="text-gray-300 mb-8">Enter your email and URL. We’ll run a mobile and desktop audit, show your scores instantly, and email the report.</p>
          <form onSubmit={onSubmit} className="space-y-4 bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="grid md:grid-cols-2 gap-4">
              <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Your email" className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" type="email" required />
              <input value={url} onChange={(e)=>setUrl(e.target.value)} placeholder="https://example.com" className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" type="url" required />
            </div>
            <button disabled={loading} className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-lg font-medium disabled:opacity-60">{loading ? 'Running audit…' : 'Run Audit'}</button>
            {error && <p className="text-red-400">{error}</p>}
          </form>

          {data && (
            <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold mb-2">Results for {data.url}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <ResultCard title="Mobile" m={data.mobile} />
                <ResultCard title="Desktop" m={data.desktop} />
              </div>
              <p className="text-gray-400 mt-4">A detailed report has been sent to {email} if email is configured.</p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

function ResultCard({ title, m }: { title: string; m: any }) {
  return (
    <div className="rounded-xl bg-black/40 border border-white/10 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-semibold">{title}</h3>
        <span className="text-2xl font-bold">{m.performance}</span>
      </div>
      <dl className="grid grid-cols-2 gap-2 text-gray-300">
        <Metric label="FCP" value={m.fcp} />
        <Metric label="LCP" value={m.lcp} />
        <Metric label="CLS" value={m.cls} />
        <Metric label="TBT" value={m.tbt} />
      </dl>
    </div>
  )
}

function Metric({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <dt className="text-sm text-gray-400">{label}</dt>
      <dd className="font-medium">{value ?? '-'}</dd>
    </div>
  )
}

