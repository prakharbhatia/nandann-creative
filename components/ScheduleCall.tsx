'use client';
import React, { useState, useEffect, useMemo } from 'react';

interface ScheduleCallProps {
  onClose?: () => void;
}

export default function ScheduleCall({ onClose }: ScheduleCallProps) {
  const [slots, setSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [booked, setBooked] = useState(false);
  const [bookError, setBookError] = useState('');
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });

  // Detect user timezone
  const userTz = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, []);

  const tzDisplay = useMemo(() => {
    const abbr = new Date()
      .toLocaleTimeString('en-US', { timeZone: userTz, timeZoneName: 'short' })
      .split(' ')
      .pop() || '';
    const fullName =
      new Intl.DateTimeFormat('en-US', { timeZone: userTz, timeZoneName: 'long' })
        .formatToParts(new Date())
        .find(p => p.type === 'timeZoneName')?.value || userTz;
    return { abbr, fullName };
  }, [userTz]);

  useEffect(() => {
    fetch('/api/slots')
      .then(r => r.json())
      .then(data => {
        const incoming: string[] = data.slots || [];
        setSlots(incoming);
        setLoading(false);

        // Auto-select today if it has slots, otherwise first available date
        if (incoming.length > 0) {
          const todayStr = new Date().toLocaleDateString('en-CA', {
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          });
          const map: Record<string, boolean> = {};
          for (const iso of incoming) {
            const d = new Date(iso).toLocaleDateString('en-CA', {
              timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            });
            map[d] = true;
          }
          const firstDate = map[todayStr]
            ? todayStr
            : Object.keys(map).sort()[0];
          if (firstDate) {
            const [y, m, d] = firstDate.split('-').map(Number);
            setSelectedDate(new Date(y, m - 1, d));
          }
        }
      })
      .catch(() => {
        setError('Could not load available times. Please try again.');
        setLoading(false);
      });
  }, []);

  // Group slots by local date YYYY-MM-DD
  const slotsByDate = useMemo(() => {
    const map: Record<string, string[]> = {};
    for (const iso of slots) {
      const localDate = new Date(iso).toLocaleDateString('en-CA', { timeZone: userTz });
      if (!map[localDate]) map[localDate] = [];
      map[localDate].push(iso);
    }
    return map;
  }, [slots, userTz]);

  const availableDateSet = useMemo(() => new Set(Object.keys(slotsByDate)), [slotsByDate]);

  // Calendar grid helpers
  const calYear = calendarMonth.getFullYear();
  const calMonth = calendarMonth.getMonth();
  const firstDayOfWeek = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();

  const calCells: (number | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (calCells.length % 7 !== 0) calCells.push(null);

  function getDateStr(day: number) {
    return `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  function isPast(day: number) {
    const d = new Date(calYear, calMonth, day);
    d.setHours(23, 59, 59, 999);
    return d < new Date();
  }

  function isToday(day: number) {
    const d = new Date(calYear, calMonth, day);
    return d.toDateString() === new Date().toDateString();
  }

  function isSelected(day: number) {
    if (!selectedDate) return false;
    return (
      selectedDate.getFullYear() === calYear &&
      selectedDate.getMonth() === calMonth &&
      selectedDate.getDate() === day
    );
  }

  function isAvailable(day: number) {
    return availableDateSet.has(getDateStr(day));
  }

  function selectDay(day: number) {
    if (isPast(day) || !isAvailable(day)) return;
    setSelectedDate(new Date(calYear, calMonth, day));
    setSelectedSlot('');
  }

  // Slots for the selected date
  const selectedDateStr = selectedDate
    ? selectedDate.toLocaleDateString('en-CA', { timeZone: userTz })
    : '';
  const slotsForDate = slotsByDate[selectedDateStr] || [];

  function formatTime(iso: string) {
    return (
      new Date(iso).toLocaleTimeString('en-US', {
        timeZone: userTz,
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }) +
      ' ' +
      tzDisplay.abbr
    );
  }

  function formatSelectedDateHeader() {
    if (!selectedDate) return '';
    return selectedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  }

  function canGoToPrevMonth() {
    const now = new Date();
    return calYear > now.getFullYear() || calMonth > now.getMonth();
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
        body: JSON.stringify({
          slotTime: selectedSlot,
          name: form.name,
          email: form.email,
          topic: form.phone ? `Phone: ${form.phone}` : '',
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setBooked(true);
      } else {
        setBookError(data.error || 'Booking failed. Please try another slot.');
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

  // Success screen
  if (booked) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-5"
          style={{ background: '#f0fdf4', color: '#16a34a', fontSize: '1.5rem' }}
        >
          ✓
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">You&apos;re booked!</h3>
        <p className="text-gray-600 mb-1">
          <span className="font-semibold text-gray-900">{formatSelectedDateHeader()}</span>
          {' at '}
          <span className="font-semibold text-gray-900">{formatTime(selectedSlot)}</span>
        </p>
        <p className="text-sm text-gray-500 mt-1 mb-8">
          Confirmation sent to{' '}
          <span className="text-blue-600 font-medium">{form.email}</span>
        </p>
        {onClose && (
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-700 transition-colors text-sm"
          >
            Done
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row min-h-[520px]">
      {/* LEFT PANEL — Calendar */}
      <div className="sm:w-72 shrink-0 p-7 border-b sm:border-b-0 sm:border-r border-gray-200">
        <h2 className="text-lg font-bold text-gray-900 mb-1">Book a Strategy Call</h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-1">
          Select a date to view our availability.
        </p>
        <p className="text-xs text-gray-400 mb-6">
          All times shown in{' '}
          <span className="font-medium text-gray-600">{tzDisplay.fullName}</span>
        </p>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-6 h-6 border-2 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
          </div>
        ) : error ? (
          <p className="text-red-500 text-sm">{error}</p>
        ) : (
          <>
            {/* Month navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() =>
                  setCalendarMonth(m => new Date(m.getFullYear(), m.getMonth() - 1, 1))
                }
                disabled={!canGoToPrevMonth()}
                className="w-7 h-7 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-lg leading-none"
                aria-label="Previous month"
              >
                ‹
              </button>
              <span className="text-sm font-semibold text-gray-900">
                {calendarMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
              <button
                onClick={() =>
                  setCalendarMonth(m => new Date(m.getFullYear(), m.getMonth() + 1, 1))
                }
                className="w-7 h-7 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-colors text-lg leading-none"
                aria-label="Next month"
              >
                ›
              </button>
            </div>

            {/* Day-of-week headers */}
            <div className="grid grid-cols-7 mb-1">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                <div
                  key={d}
                  className="text-center text-xs text-gray-400 font-medium py-1"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Date grid */}
            <div className="grid grid-cols-7 gap-y-1">
              {calCells.map((day, i) => {
                if (!day) return <div key={`e-${i}`} />;
                const past = isPast(day);
                const avail = isAvailable(day);
                const sel = isSelected(day);
                const tod = isToday(day);
                const clickable = !past && avail;
                return (
                  <button
                    key={day}
                    onClick={() => clickable && selectDay(day)}
                    disabled={!clickable}
                    className={[
                      'aspect-square w-full flex items-center justify-center text-xs rounded-full transition-colors',
                      sel
                        ? 'bg-gray-900 text-white font-bold'
                        : tod
                        ? 'bg-gray-100 text-gray-900 font-semibold'
                        : clickable
                        ? 'text-gray-900 hover:bg-gray-100 cursor-pointer font-medium'
                        : 'text-gray-300 cursor-not-allowed',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* RIGHT PANEL — Time slots + form */}
      <div className="flex-1 p-7 overflow-y-auto">
        {!selectedDate ? (
          <div className="flex items-center justify-center h-full min-h-[200px]">
            <p className="text-gray-400 text-sm">
              Select a date on the left to see available times
            </p>
          </div>
        ) : (
          <>
            {/* Date header */}
            <h3 className="text-xl font-bold text-gray-900 mb-0.5">
              {formatSelectedDateHeader()}
            </h3>
            <p className="text-sm text-gray-500 mb-5">
              {tzDisplay.fullName}{' '}
              <span className="font-semibold text-gray-700">({tzDisplay.abbr})</span>
            </p>

            {slotsForDate.length === 0 ? (
              <p className="text-gray-400 text-sm">No available slots on this day.</p>
            ) : (
              <div className="grid grid-cols-2 gap-2.5 mb-6">
                {slotsForDate.map(iso => (
                  <button
                    key={iso}
                    onClick={() => setSelectedSlot(iso === selectedSlot ? '' : iso)}
                    className={[
                      'py-3 px-3 rounded-2xl border text-sm font-medium transition-all duration-150',
                      iso === selectedSlot
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-800 border-gray-200 hover:border-gray-400',
                    ].join(' ')}
                  >
                    {formatTime(iso)}
                  </button>
                ))}
              </div>
            )}

            {/* Booking form — appears after selecting a slot */}
            {selectedSlot && (
              <form
                onSubmit={handleBook}
                className="space-y-3 border-t border-gray-100 pt-5"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Jane Smith"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number{' '}
                    <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                  />
                </div>

                {bookError && <p className="text-red-500 text-sm">{bookError}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-xl bg-gray-900 hover:bg-gray-700 text-white font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Booking...' : 'Confirm Booking'}
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
