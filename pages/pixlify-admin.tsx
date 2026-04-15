import { useState, useMemo } from 'react';

interface Domain {
  domain:         string;
  site_url:       string;
  wp_version:     string;
  plugin_ver:     string;
  key_full:       string;
  key_masked:     string;
  key_type:       string;
  key_expires_at: string | null;
  first_seen_at:  string;
  last_seen_at:   string;
  total_events:   number;
}

interface KeyGroup {
  key_full:       string;
  key_masked:     string;
  key_type:       string;
  key_expires_at: string | null;
  domains:        Domain[];
  total_events:   number;
  last_seen_at:   string;
}

interface Blacklisted {
  key_masked: string;
  reason:     string;
  added_at:   string;
}

type Tab = 'domains' | 'keys' | 'generate' | 'blacklist';

// ── Helpers ───────────────────────────────────────────────────────────────────

const fmt = (iso: string) => new Date(iso).toLocaleDateString();

function expiryLabel(expiresAt: string | null, keyType?: string): string {
  if (!expiresAt) return keyType === 'unlimited' ? 'Never' : '—';
  const days = Math.ceil((new Date(expiresAt).getTime() - Date.now()) / 86400000);
  if (days < 0)   return 'Expired';
  if (days === 0) return 'Today';
  return `${days}d left`;
}

function expiryColor(expiresAt: string | null, keyType?: string): string {
  if (!expiresAt) return '#9ca3af';
  const days = Math.ceil((new Date(expiresAt).getTime() - Date.now()) / 86400000);
  if (days < 0)  return '#dc2626';
  if (days <= 7) return '#d97706';
  return '#16a34a';
}

function LicenseBadge({ type }: { type: string }) {
  return (
    <span style={{
      background: type === 'unlimited' ? '#dcfce7' : '#fef9c3',
      color:      type === 'unlimited' ? '#15803d' : '#854d0e',
      padding: '2px 8px', borderRadius: 12, fontSize: 11, fontWeight: 600,
    }}>
      {type || '—'}
    </span>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function PixlifyAdmin() {
  const [secret,      setSecret]      = useState('');
  const [domains,     setDomains]     = useState<Domain[]>([]);
  const [total,       setTotal]       = useState<number | null>(null);
  const [blacklist,   setBlacklist]   = useState<Blacklisted[]>([]);
  const [error,       setError]       = useState('');
  const [loading,     setLoading]     = useState(false);
  const [tab,         setTab]         = useState<Tab>('domains');
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  // Generator state
  const [genType,    setGenType]    = useState<'trial' | 'unlimited'>('trial');
  const [genDays,    setGenDays]    = useState('30');
  const [genResult,  setGenResult]  = useState<{ key: string; type: string; days_left: number | null } | null>(null);
  const [genLoading, setGenLoading] = useState(false);
  const [genError,   setGenError]   = useState('');
  const [copied,     setCopied]     = useState(false);

  async function load() {
    if (!secret) return;
    setLoading(true);
    setError('');
    try {
      const [dRes, bRes] = await Promise.all([
        fetch(`/api/pixlify/domains?secret=${encodeURIComponent(secret)}`),
        fetch(`/api/pixlify/blacklist?secret=${encodeURIComponent(secret)}`),
      ]);
      if (!dRes.ok) { setError('Invalid secret or server error.'); setLoading(false); return; }
      const dData = await dRes.json();
      setDomains(dData.domains ?? []);
      setTotal(dData.total ?? 0);
      if (bRes.ok) {
        const bData = await bRes.json();
        setBlacklist(bData.list ?? []);
      }
    } catch {
      setError('Network error.');
    } finally {
      setLoading(false);
    }
  }

  async function blacklistKey(keyMasked: string) {
    const reason = prompt('Reason for blacklisting (optional):') ?? '';
    const res = await fetch(`/api/pixlify/blacklist?secret=${encodeURIComponent(secret)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key_masked: keyMasked, reason }),
    });
    if (res.ok) {
      setBlacklist(prev => [...prev, { key_masked: keyMasked, reason, added_at: new Date().toISOString() }]);
      alert('Key blacklisted. It will be rejected on next use.');
    }
  }

  async function unblacklist(keyMasked: string) {
    const res = await fetch(`/api/pixlify/blacklist?secret=${encodeURIComponent(secret)}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key_masked: keyMasked }),
    });
    if (res.ok) setBlacklist(prev => prev.filter(b => b.key_masked !== keyMasked));
  }

  async function generateKey() {
    setGenLoading(true);
    setGenError('');
    setGenResult(null);
    try {
      const res = await fetch(`/api/pixlify/generate-key?secret=${encodeURIComponent(secret)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: genType, days: parseInt(genDays, 10) }),
      });
      const data = await res.json();
      if (!res.ok) { setGenError(data.error ?? 'Failed to generate key'); return; }
      setGenResult(data);
      setCopied(false);
    } catch {
      setGenError('Network error.');
    } finally {
      setGenLoading(false);
    }
  }

  async function copyKey() {
    if (!genResult) return;
    await navigator.clipboard.writeText(genResult.key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // Blacklist set — index by both key_masked values stored in the blacklist table
  const blacklistedKeys = useMemo(() => new Set(blacklist.map(b => b.key_masked)), [blacklist]);
  const isKeyBlacklisted = (g: KeyGroup) =>
    blacklistedKeys.has(g.key_masked) || blacklistedKeys.has(g.key_full || '');

  // Group domains by key — use key_full as the unique identifier when available.
  // Old records only have key_masked which shares the same first-9-char prefix
  // across different keys (e.g. all trial keys start PXLF-0169), causing false
  // grouping if we use key_masked alone.
  const keyGroups = useMemo<KeyGroup[]>(() => {
    const map = new Map<string, KeyGroup>();
    for (const d of domains) {
      const k = d.key_full || d.key_masked || 'Unknown';
      if (!map.has(k)) {
        map.set(k, {
          key_full:       d.key_full || d.key_masked,
          key_masked:     d.key_masked,
          key_type:       d.key_type,
          key_expires_at: d.key_expires_at,
          domains:        [],
          total_events:   0,
          last_seen_at:   d.last_seen_at,
        });
      }
      const g = map.get(k)!;
      g.domains.push(d);
      g.total_events += d.total_events;
      if (d.last_seen_at > g.last_seen_at) g.last_seen_at = d.last_seen_at;
    }
    return Array.from(map.values()).sort((a, b) => {
      // Expiring soon first, unlimited (null) last
      const aExp = a.key_expires_at ? new Date(a.key_expires_at).getTime() : Infinity;
      const bExp = b.key_expires_at ? new Date(b.key_expires_at).getTime() : Infinity;
      return aExp - bExp;
    });
  }, [domains]);

  // ── Styles ──────────────────────────────────────────────────────────────────

  const S = {
    page:  { fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif', background: '#f1f5f9', minHeight: '100vh', padding: '32px 24px' } as React.CSSProperties,
    wrap:  { maxWidth: 1100, margin: '0 auto' } as React.CSSProperties,
    card:  { background: '#fff', borderRadius: 10, border: '1px solid #e5e7eb', overflow: 'hidden' } as React.CSSProperties,
    th:    { padding: '10px 14px', textAlign: 'left' as const, fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' as const, letterSpacing: '.04em', whiteSpace: 'nowrap' as const },
    td:    { padding: '10px 14px', fontSize: 13 } as React.CSSProperties,
    mono:  { fontFamily: 'ui-monospace,SFMono-Regular,monospace', fontSize: 12, color: '#374151' } as React.CSSProperties,
    tab:   (active: boolean) => ({
      padding: '7px 16px', borderRadius: 7, border: active ? 'none' : '1px solid #e5e7eb',
      background: active ? '#16a34a' : '#fff', color: active ? '#fff' : '#374151',
      fontWeight: active ? 600 : 500, fontSize: 13, cursor: 'pointer',
    } as React.CSSProperties),
    btn:   { padding: '8px 16px', borderRadius: 7, border: 'none', background: '#16a34a', color: '#fff', fontWeight: 600, fontSize: 13, cursor: 'pointer' } as React.CSSProperties,
    btnSm: { padding: '3px 10px', borderRadius: 5, border: 'none', fontSize: 11, fontWeight: 600, cursor: 'pointer' } as React.CSSProperties,
  };

  return (
    <div style={S.page}>
      <div style={S.wrap}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
          <div style={{ width: 44, height: 44, background: '#16a34a', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>⚡</div>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#111827' }}>Pixlify — Admin</h1>
            <p style={{ margin: 0, fontSize: 13, color: '#6b7280' }}>License management &amp; active domains</p>
          </div>
        </div>

        {/* Auth */}
        {total === null && (
          <div style={{ ...S.card, padding: '24px', marginBottom: 24, display: 'flex', gap: 10 }}>
            <input
              type="password"
              placeholder="Admin secret"
              value={secret}
              onChange={e => setSecret(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && load()}
              style={{ flex: 1, padding: '9px 14px', border: '1.5px solid #d1d5db', borderRadius: 7, fontSize: 13, outline: 'none' }}
            />
            <button onClick={load} disabled={loading} style={S.btn}>
              {loading ? 'Loading…' : 'Unlock'}
            </button>
          </div>
        )}

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: 13 }}>
            {error}
          </div>
        )}

        {/* Stats + tabs */}
        {total !== null && (
          <>
            <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'stretch' }}>
              {[
                { label: 'Total Domains',   value: total },
                { label: 'Unique Keys',     value: keyGroups.length },
                { label: 'Unlimited',       value: domains.filter(d => d.key_type === 'unlimited').length },
                { label: 'Trial',           value: domains.filter(d => d.key_type === 'trial').length },
                { label: 'Blacklisted',     value: blacklist.length },
              ].map(stat => (
                <div key={stat.label} style={{ flex: 1, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '14px 18px' }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: '#111827' }}>{stat.value}</div>
                  <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>{stat.label}</div>
                </div>
              ))}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, justifyContent: 'center' }}>
                <button onClick={load} style={{ padding: '7px 16px', borderRadius: 7, border: '1px solid #e5e7eb', background: '#fff', color: '#6b7280', fontSize: 12, cursor: 'pointer' }}>
                  ↻ Refresh
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
              {(['domains', 'keys', 'generate', 'blacklist'] as Tab[]).map(t => (
                <button key={t} onClick={() => setTab(t)} style={S.tab(tab === t)}>
                  {{ domains: 'By Domain', keys: 'By Key', generate: '+ Generate Key', blacklist: `Blacklist (${blacklist.length})` }[t]}
                </button>
              ))}
            </div>
          </>
        )}

        {/* ── By Domain ── */}
        {total !== null && tab === 'domains' && domains.length > 0 && (
          <div style={S.card}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e5e7eb' }}>
                  {['Domain', 'Site URL', 'License Key', 'Type', 'Expires', 'WordPress', 'Plugin', 'First Seen', 'Last Seen', 'Events'].map(h => (
                    <th key={h} style={S.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {domains.map((d, i) => (
                  <tr key={d.domain} style={{ borderBottom: i < domains.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                    <td style={{ ...S.td, fontWeight: 600, color: '#111827' }}>{d.domain}</td>
                    <td style={S.td}>
                      {d.site_url && d.site_url !== 'Unknown'
                        ? <a href={d.site_url} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none' }}>{d.site_url}</a>
                        : <span style={{ color: '#9ca3af' }}>—</span>}
                    </td>
                    <td style={{ ...S.td, ...S.mono }}>{d.key_full || d.key_masked || '—'}</td>
                    <td style={S.td}><LicenseBadge type={d.key_type} /></td>
                    <td style={{ ...S.td, color: expiryColor(d.key_expires_at, d.key_type), fontWeight: 500 }}>{expiryLabel(d.key_expires_at, d.key_type)}</td>
                    <td style={{ ...S.td, color: '#374151' }}>{d.wp_version || '—'}</td>
                    <td style={{ ...S.td, color: '#374151' }}>{d.plugin_ver || '—'}</td>
                    <td style={{ ...S.td, color: '#6b7280', whiteSpace: 'nowrap' }}>{fmt(d.first_seen_at)}</td>
                    <td style={{ ...S.td, color: '#6b7280', whiteSpace: 'nowrap' }}>{fmt(d.last_seen_at)}</td>
                    <td style={{ ...S.td, color: '#374151', textAlign: 'center' }}>{d.total_events}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── By Key (sorted: expiring soonest first) ── */}
        {total !== null && tab === 'keys' && keyGroups.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {keyGroups.map(g => {
              const isBlacklisted = isKeyBlacklisted(g);
              return (
                <div key={g.key_masked} style={{ ...S.card, border: isBlacklisted ? '1.5px solid #fca5a5' : '1px solid #e5e7eb' }}>
                  <div
                    onClick={() => setExpandedKey(expandedKey === g.key_masked ? null : g.key_masked)}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', cursor: 'pointer', userSelect: 'none' }}
                  >
                    <span style={{ color: '#9ca3af' }}>{expandedKey === g.key_masked ? '▾' : '▸'}</span>
                    <code style={{ ...S.mono, fontSize: 13, flex: 1 }}>{g.key_full || g.key_masked}</code>
                    <LicenseBadge type={g.key_type} />
                    <span style={{ color: expiryColor(g.key_expires_at, g.key_type), fontSize: 12, fontWeight: 500 }}>
                      {expiryLabel(g.key_expires_at, g.key_type)}
                    </span>
                    <span style={{ background: '#e0f2fe', color: '#0369a1', borderRadius: 12, padding: '2px 10px', fontSize: 12, fontWeight: 700 }}>
                      {g.domains.length} {g.domains.length === 1 ? 'site' : 'sites'}
                    </span>
                    <span style={{ color: '#9ca3af', fontSize: 12 }}>{g.total_events} events</span>
                    {isBlacklisted
                      ? <button onClick={e => { e.stopPropagation(); unblacklist(g.key_masked); }} style={{ ...S.btnSm, background: '#fee2e2', color: '#dc2626' }}>🚫 Blacklisted — Unblock</button>
                      : <button onClick={e => { e.stopPropagation(); blacklistKey(g.key_masked); }} style={{ ...S.btnSm, background: '#f3f4f6', color: '#374151' }}>Blacklist</button>
                    }
                  </div>

                  {expandedKey === g.key_masked && (
                    <div style={{ borderTop: '1px solid #f1f5f9' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead>
                          <tr style={{ background: '#f8fafc' }}>
                            {['Domain', 'Site URL', 'WordPress', 'Plugin', 'First Seen', 'Last Seen', 'Events'].map(h => (
                              <th key={h} style={{ ...S.th, paddingLeft: 32 }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {g.domains.map(d => (
                            <tr key={d.domain} style={{ borderTop: '1px solid #f1f5f9' }}>
                              <td style={{ ...S.td, paddingLeft: 32, fontWeight: 600 }}>{d.domain}</td>
                              <td style={S.td}>
                                {d.site_url && d.site_url !== 'Unknown'
                                  ? <a href={d.site_url} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none' }}>{d.site_url}</a>
                                  : <span style={{ color: '#9ca3af' }}>—</span>}
                              </td>
                              <td style={S.td}>{d.wp_version || '—'}</td>
                              <td style={S.td}>{d.plugin_ver || '—'}</td>
                              <td style={{ ...S.td, color: '#6b7280' }}>{fmt(d.first_seen_at)}</td>
                              <td style={{ ...S.td, color: '#6b7280' }}>{fmt(d.last_seen_at)}</td>
                              <td style={{ ...S.td, textAlign: 'center' }}>{d.total_events}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── Generate Key ── */}
        {total !== null && tab === 'generate' && (
          <div style={{ ...S.card, padding: 28, maxWidth: 480 }}>
            <h2 style={{ margin: '0 0 20px', fontSize: 16, fontWeight: 700, color: '#111827' }}>Generate License Key</h2>

            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Key Type</label>
            <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
              {(['trial', 'unlimited'] as const).map(t => (
                <button key={t} onClick={() => setGenType(t)} style={{
                  ...S.tab(genType === t), textTransform: 'capitalize',
                }}>
                  {t}
                </button>
              ))}
            </div>

            {genType === 'trial' && (
              <>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Trial Days</label>
                <input
                  type="number"
                  min="1"
                  max="365"
                  value={genDays}
                  onChange={e => setGenDays(e.target.value)}
                  style={{ width: '100%', padding: '9px 14px', border: '1.5px solid #d1d5db', borderRadius: 7, fontSize: 13, outline: 'none', marginBottom: 18, boxSizing: 'border-box' }}
                />
              </>
            )}

            <button onClick={generateKey} disabled={genLoading} style={{ ...S.btn, width: '100%' }}>
              {genLoading ? 'Generating…' : 'Generate Key'}
            </button>

            {genError && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '10px 14px', borderRadius: 7, marginTop: 14, fontSize: 13 }}>
                {genError}
              </div>
            )}

            {genResult && (
              <div style={{ marginTop: 20, background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#15803d', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 8 }}>Generated Key</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <code style={{ ...S.mono, fontSize: 14, flex: 1, wordBreak: 'break-all' }}>{genResult.key}</code>
                  <button onClick={copyKey} style={{ ...S.btnSm, background: copied ? '#dcfce7' : '#e5e7eb', color: copied ? '#15803d' : '#374151', whiteSpace: 'nowrap' }}>
                    {copied ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
                <div style={{ marginTop: 10, fontSize: 12, color: '#374151', display: 'flex', gap: 16 }}>
                  <span><strong>Type:</strong> {genResult.type}</span>
                  <span><strong>Expires:</strong> {genResult.days_left ? `${genResult.days_left} days` : 'Never'}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Blacklist ── */}
        {total !== null && tab === 'blacklist' && (
          <div style={S.card}>
            {blacklist.length === 0
              ? <div style={{ padding: 40, textAlign: 'center', color: '#9ca3af', fontSize: 14 }}>No blacklisted keys. Use the "Blacklist" button in the By Key view.</div>
              : (
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e5e7eb' }}>
                      {['Key', 'Reason', 'Blacklisted On', ''].map(h => <th key={h} style={S.th}>{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {blacklist.map((b, i) => (
                      <tr key={b.key_masked} style={{ borderBottom: i < blacklist.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                        <td style={{ ...S.td, ...S.mono }}>{b.key_masked}</td>
                        <td style={{ ...S.td, color: '#374151' }}>{b.reason || '—'}</td>
                        <td style={{ ...S.td, color: '#6b7280' }}>{fmt(b.added_at)}</td>
                        <td style={S.td}>
                          <button onClick={() => unblacklist(b.key_masked)} style={{ ...S.btnSm, background: '#fee2e2', color: '#dc2626' }}>
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
            }
          </div>
        )}

        {total !== null && tab === 'domains' && domains.length === 0 && (
          <div style={{ ...S.card, padding: 40, textAlign: 'center', color: '#9ca3af', fontSize: 14 }}>
            No domains yet. They appear here after a first successful license verification.
          </div>
        )}

      </div>
    </div>
  );
}
