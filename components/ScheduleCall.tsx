'use client'; // not needed for Pages Router but harmless
import React, { useState, useEffect, useMemo } from 'react';

interface ScheduleCallProps {
  onClose?: () => void;
}

export default function ScheduleCall({ onClose }: ScheduleCallProps) {
  const [slots, setSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState(''); // local date string YYYY-MM-DD
  const [selectedSlot, setSelectedSlot] = useState(''); // UTC ISO
  const [form, setForm] = useState({ name: '', email: '', topic: '' });
  const [submitting, setSubmitting] = useState(false);
  const [booked, setBooked] = useState(false);
  const [bookError, setBookError] = useState('');

  // Detect user timezone
  const userTz = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, []);
  const tzAbbr = useMemo(() => {
    const d = new Date();
    return d.toLocaleTimeString('en-US', { timeZone: userTz, timeZoneName: 'short' }).split(' ').pop() || '';
  }, [userTz]);

  useEffect(() => {
    fetch('/api/slots')
      .then(r => r.json())
      .then(data => {
        setSlots(data.slots || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load available times. Please try again.');
        setLoading(false);
      });
  }, []);

  // Group slots by local date
  const slotsByDate = useMemo(() => {
    const map: Record<string, string[]> = {};
    for (const iso of slots) {
      const localDate = new Date(iso).toLocaleDateString('en-CA', { timeZone: userTz }); // YYYY-MM-DD
      if (!map[localDate]) map[localDate] = [];
      map[localDate].push(iso);
    }
    return map;
  }, [slots, userTz]);

  const availableDates = useMemo(() => Object.keys(slotsByDate).sort(), [slotsByDate]);

  // Auto-select first available date
  useEffect(() => {
    if (availableDates.length > 0 && !selectedDate) {
      setSelectedDate(availableDates[0]);
    }
  }, [availableDates, selectedDate]);

  const slotsForDate = slotsByDate[selectedDate] || [];

  // Split into morning and evening based on local hour
  const morningSlots = slotsForDate.filter(iso => {
    const h = parseInt(new Date(iso).toLocaleTimeString('en-US', { timeZone: userTz, hour: 'numeric', hour12: false }));
    return h < 12;
  });
  const eveningSlots = slotsForDate.filter(iso => {
    const h = parseInt(new Date(iso).toLocaleTimeString('en-US', { timeZone: userTz, hour: 'numeric', hour12: false }));
    return h >= 12;
  });

  function formatTime(iso: string) {
    return new Date(iso).toLocaleTimeString('en-US', {
      timeZone: userTz,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }

  function formatDateLabel(dateStr: string) {
    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    if (date.toDateString() === today.toDateString()) return { day: 'Today', date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) };
    if (date.toDateString() === tomorrow.toDateString()) return { day: 'Tomorrow', date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) };
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };
  }

  async function handleBook(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedSlot || !form.name || !form.email) return;
    setSubmitting(true);
    setBookError('');
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slotTime: selectedSlot, ...form }),
      });
      const data = await res.json();
      if (res.ok) {
        setBooked(true);
      } else {
        setBookError(data.error || 'Booking failed. Please try another slot.');
        // Remove the slot from list if it was just taken
        if (res.status === 409) {
          setSlots(prev => prev.filter(s => s !== selectedSlot));
          setSelectedSlot('');
        }
      }
    } catch {
      setBookError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  // SUCCESS STATE
  if (booked) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500/50 flex items-center justify-center text-3xl mx-auto mb-4">✓</div>
        <h3 className="text-2xl font-bold text-white mb-2">You&apos;re booked!</h3>
        <p className="text-gray-300 mb-1">
          <span className="text-white font-semibold">{formatTime(selectedSlot)}</span>
          {' '}{tzAbbr}{' — '}
          {new Date(selectedSlot).toLocaleDateString('en-US', { timeZone: userTz, weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
        <p className="text-gray-400 text-sm mt-3 mb-6">We&apos;ll send a confirmation to <span className="text-blue-300">{form.email}</span></p>
        {onClose && (
          <button onClick={onClose} className="px-6 py-2 rounded-xl text-white font-semibold" style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}>
            Close
          </button>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-1">Schedule a Free 30-Min Call</h3>
        <p className="text-gray-400 text-sm">All times shown in your timezone: <span className="text-blue-300">{userTz} ({tzAbbr})</span></p>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {error && <p className="text-red-400 text-center py-8">{error}</p>}

      {!loading && !error && (
        <>
          {/* Date selector */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
            {availableDates.map(dateStr => {
              const label = formatDateLabel(dateStr);
              const isSelected = dateStr === selectedDate;
              return (
                <button
                  key={dateStr}
                  onClick={() => { setSelectedDate(dateStr); setSelectedSlot(''); }}
                  className={`shrink-0 flex flex-col items-center px-4 py-3 rounded-xl border transition-all duration-150 min-w-[72px] ${
                    isSelected
                      ? 'text-white border-blue-500'
                      : 'text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                  style={isSelected ? { background: 'rgba(59,130,246,0.15)' } : { background: 'rgba(255,255,255,0.03)' }}
                >
                  <span className="text-xs font-medium">{label.day}</span>
                  <span className="text-sm font-bold mt-0.5">{label.date}</span>
                </button>
              );
            })}
          </div>

          {/* Time slots */}
          {slotsForDate.length === 0 && <p className="text-gray-500 text-sm py-4">No slots available on this day.</p>}

          {morningSlots.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Morning</p>
              <div className="flex flex-wrap gap-2">
                {morningSlots.map(iso => (
                  <button
                    key={iso}
                    onClick={() => setSelectedSlot(iso === selectedSlot ? '' : iso)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-150 ${
                      iso === selectedSlot
                        ? 'text-white border-blue-500'
                        : 'text-gray-300 border-white/10 hover:border-white/30 hover:text-white'
                    }`}
                    style={iso === selectedSlot ? { background: 'rgba(59,130,246,0.2)' } : { background: 'rgba(255,255,255,0.04)' }}
                  >
                    {formatTime(iso)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {eveningSlots.length > 0 && (
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Evening</p>
              <div className="flex flex-wrap gap-2">
                {eveningSlots.map(iso => (
                  <button
                    key={iso}
                    onClick={() => setSelectedSlot(iso === selectedSlot ? '' : iso)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-150 ${
                      iso === selectedSlot
                        ? 'text-white border-blue-500'
                        : 'text-gray-300 border-white/10 hover:border-white/30 hover:text-white'
                    }`}
                    style={iso === selectedSlot ? { background: 'rgba(59,130,246,0.2)' } : { background: 'rgba(255,255,255,0.04)' }}
                  >
                    {formatTime(iso)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Booking form — shown when a slot is selected */}
          {selectedSlot && (
            <form onSubmit={handleBook} className="border-t border-white/10 pt-6 mt-2">
              <p className="text-sm text-blue-300 mb-4 font-medium">
                Selected: {formatTime(selectedSlot)} {tzAbbr} —{' '}
                {new Date(selectedSlot).toLocaleDateString('en-US', { timeZone: userTz, weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Jane Smith"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="jane@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">What would you like to discuss?</label>
                  <textarea
                    rows={3}
                    value={form.topic}
                    onChange={e => setForm(f => ({ ...f, topic: e.target.value }))}
                    placeholder="e.g. WordPress 7.0 migration, new website build, plugin development..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>
                {bookError && <p className="text-red-400 text-sm">{bookError}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)', boxShadow: '0 4px 15px rgba(59,130,246,0.35)' }}
                >
                  {submitting ? 'Booking...' : 'Confirm Booking'}
                </button>
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );
}
