import { useState } from 'react';

interface Domain {
  domain:        string;
  site_url:      string;
  wp_version:    string;
  plugin_ver:    string;
  key_type:      string;
  first_seen_at: string;
  last_seen_at:  string;
  total_events:  number;
}

export default function PixlifyAdmin() {
  const [secret, setSecret]   = useState('');
  const [domains, setDomains] = useState<Domain[]>([]);
  const [total, setTotal]     = useState<number | null>(null);
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  async function load() {
    if (!secret) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/pixlify/domains?secret=${encodeURIComponent(secret)}`);
      if (!res.ok) { setError('Invalid secret or server error.'); setLoading(false); return; }
      const data = await res.json();
      setDomains(data.domains ?? []);
      setTotal(data.total ?? 0);
    } catch {
      setError('Network error.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif', background: '#f1f5f9', minHeight: '100vh', padding: '32px 24px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
          <div style={{ width: 44, height: 44, background: '#16a34a', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>⚡</div>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#111827' }}>Pixlify — Active Domains</h1>
            <p style={{ margin: 0, fontSize: 13, color: '#6b7280' }}>Sites with a verified license key</p>
          </div>
        </div>

        {/* Auth */}
        {total === null && (
          <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #e5e7eb', padding: '24px', marginBottom: 24, display: 'flex', gap: 10 }}>
            <input
              type="password"
              placeholder="Admin secret"
              value={secret}
              onChange={e => setSecret(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && load()}
              style={{ flex: 1, padding: '9px 14px', border: '1.5px solid #d1d5db', borderRadius: 7, fontSize: 13, outline: 'none' }}
            />
            <button
              onClick={load}
              disabled={loading}
              style={{ padding: '9px 20px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: 7, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}
            >
              {loading ? 'Loading…' : 'Load Domains'}
            </button>
          </div>
        )}

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: 13 }}>
            {error}
          </div>
        )}

        {/* Stats bar */}
        {total !== null && (
          <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
            {[
              { label: 'Total Domains',    value: total },
              { label: 'Unlimited',        value: domains.filter(d => d.key_type === 'unlimited').length },
              { label: 'Trial',            value: domains.filter(d => d.key_type === 'trial').length },
            ].map(stat => (
              <div key={stat.label} style={{ flex: 1, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '16px 20px' }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#111827' }}>{stat.value}</div>
                <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>{stat.label}</div>
              </div>
            ))}
            <button
              onClick={load}
              style={{ padding: '0 18px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, fontSize: 12, color: '#6b7280', cursor: 'pointer' }}
            >
              ↻ Refresh
            </button>
          </div>
        )}

        {/* Table */}
        {domains.length > 0 && (
          <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e5e7eb' }}>
                  {['Domain', 'Site URL', 'WordPress', 'Plugin', 'License', 'First Seen', 'Last Seen', 'Events'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '.04em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {domains.map((d, i) => (
                  <tr key={d.domain} style={{ borderBottom: i < domains.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 600, color: '#111827' }}>{d.domain}</td>
                    <td style={{ padding: '10px 14px' }}>
                      {d.site_url && d.site_url !== 'Unknown'
                        ? <a href={d.site_url} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none' }}>{d.site_url}</a>
                        : <span style={{ color: '#9ca3af' }}>—</span>}
                    </td>
                    <td style={{ padding: '10px 14px', color: '#374151' }}>{d.wp_version || '—'}</td>
                    <td style={{ padding: '10px 14px', color: '#374151' }}>{d.plugin_ver || '—'}</td>
                    <td style={{ padding: '10px 14px' }}>
                      <span style={{
                        background: d.key_type === 'unlimited' ? '#dcfce7' : '#fef9c3',
                        color:      d.key_type === 'unlimited' ? '#15803d' : '#854d0e',
                        padding: '2px 8px', borderRadius: 12, fontSize: 11, fontWeight: 600
                      }}>
                        {d.key_type || '—'}
                      </span>
                    </td>
                    <td style={{ padding: '10px 14px', color: '#6b7280', whiteSpace: 'nowrap' }}>{new Date(d.first_seen_at).toLocaleDateString()}</td>
                    <td style={{ padding: '10px 14px', color: '#6b7280', whiteSpace: 'nowrap' }}>{new Date(d.last_seen_at).toLocaleDateString()}</td>
                    <td style={{ padding: '10px 14px', color: '#374151', textAlign: 'center' }}>{d.total_events}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {total !== null && domains.length === 0 && (
          <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #e5e7eb', padding: 40, textAlign: 'center', color: '#9ca3af', fontSize: 14 }}>
            No domains yet. They appear here after a first successful license verification.
          </div>
        )}

      </div>
    </div>
  );
}
