/** Calendar-day scheduling in an IANA time zone, independent of the server time zone. */
export const ARTICLE_HOUR = 18;
export const DEFAULT_TIME_ZONE = "Asia/Kolkata";
function parts(at: Date, timeZone: string) {
  const values = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(at);
  return Object.fromEntries(
    values
      .filter((p) => p.type !== "literal")
      .map((p) => [p.type, Number(p.value)]),
  );
}
function atTime(
  year: number,
  month: number,
  day: number,
  timeZone: string,
  time: string,
) {
  const [hour, minute] = time.split(":").map(Number);
  const wall = Date.UTC(year, month - 1, day, hour, minute, 0);
  let guess = wall;
  for (let i = 0; i < 4; i++) {
    const p = parts(new Date(guess), timeZone);
    const represented = Date.UTC(
      p.year,
      p.month - 1,
      p.day,
      p.hour,
      p.minute,
      p.second,
    );
    const next = guess + (wall - represented);
    if (next === guess) return new Date(guess);
    guess = next;
  }
  const p = parts(new Date(guess), timeZone);
  if (
    p.year !== year ||
    p.month !== month ||
    p.day !== day ||
    p.hour !== hour ||
    p.minute !== minute
  )
    throw new Error("Could not resolve the publishing time in this time zone.");
  return new Date(guess);
}
export function nextDailySlot(
  now: Date,
  occupied: Iterable<string | Date>,
  timeZone = DEFAULT_TIME_ZONE,
  times: string[] = ["18:00"],
  dailyBookings: Iterable<string | Date> = [],
): Date {
  if (!times.length || times.some((t) => !/^([01]\d|2[0-3]):[0-5]\d$/.test(t)))
    throw new Error("Choose valid daily times.");
  const busy = new Set(Array.from(occupied, (v) => new Date(v).getTime()));
  const dayKey = (p: Record<string, number>) => `${p.year}-${p.month}-${p.day}`;
  const counts = new Map<string, number>();
  for (const value of dailyBookings) {
    const key = dayKey(parts(new Date(value), timeZone));
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  const local = parts(now, timeZone); // also validates the configured IANA time zone
  for (let dayOffset = 0; dayOffset < 3660; dayOffset++) {
    const day = new Date(
      Date.UTC(local.year, local.month - 1, local.day + dayOffset),
    );
    if (
      (counts.get(
        `${day.getUTCFullYear()}-${day.getUTCMonth() + 1}-${day.getUTCDate()}`,
      ) || 0) >= times.length
    )
      continue;
    for (const time of [...times].sort()) {
      let candidate: Date;
      try {
        candidate = atTime(
          day.getUTCFullYear(),
          day.getUTCMonth() + 1,
          day.getUTCDate(),
          timeZone,
          time,
        );
      } catch {
        continue;
      }
      if (candidate.getTime() > now.getTime() && !busy.has(candidate.getTime()))
        return candidate;
    }
  }
  throw new Error("The automatic publishing queue is full.");
}

export function nextArticleSlot(
  now: Date,
  occupied: Iterable<string | Date>,
  timeZone = DEFAULT_TIME_ZONE,
  time = "18:00",
  dailyBookings: Iterable<string | Date> = [],
) {
  return nextDailySlot(now, occupied, timeZone, [time], dailyBookings);
}
