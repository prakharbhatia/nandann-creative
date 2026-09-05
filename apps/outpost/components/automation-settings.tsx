"use client";
import { useState } from "react";
import { CalendarDays, ImagePlus, Save } from "lucide-react";
import { PublishingSettings, settingsSchema } from "@/lib/settings";
export default function AutomationSettings({
  value,
  onSave,
  demo,
}: {
  value: PublishingSettings;
  onSave: (settings: PublishingSettings) => Promise<void>;
  demo: boolean;
}) {
  const [draft, setDraft] = useState(value);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  return (
    <form
      className="automation-settings"
      onSubmit={async (e) => {
        e.preventDefault();
        const parsed = settingsSchema.safeParse(draft);
        if (!parsed.success) {
          setMessage(parsed.error.issues[0].message);
          return;
        }
        setBusy(true);
        try {
          await onSave(parsed.data);
          setMessage(
            demo
              ? "Preview settings saved in this browser."
              : "Settings saved. New bookings will use these times.",
          );
        } catch (e) {
          setMessage((e as Error).message);
        } finally {
          setBusy(false);
        }
      }}
    >
      <section className="setup-panel">
        <h2>Publishing timezone</h2>
        <p>
          All automatic slots follow this timezone, including daylight-saving
          changes.
        </p>
        <label className="field-label" htmlFor="publishing-zone">
          Timezone
        </label>
        <input
          id="publishing-zone"
          list="timezones"
          value={draft.timeZone}
          onChange={(e) => setDraft({ ...draft, timeZone: e.target.value })}
        />
        <datalist id="timezones">
          {[
            "Asia/Kolkata",
            "Europe/London",
            "America/New_York",
            "America/Los_Angeles",
            "Asia/Dubai",
            "Australia/Sydney",
            "UTC",
          ].map((v) => (
            <option key={v} value={v} />
          ))}
        </datalist>
      </section>
      <section className="setup-panel">
        <div className="automation-heading">
          <CalendarDays size={22} />
          <h2>Website articles</h2>
        </div>
        <p>
          One article per day. Additional articles roll into the next available
          day.
        </p>
        <label className="customize-toggle">
          <input
            type="checkbox"
            checked={draft.articleEnabled}
            onChange={(e) =>
              setDraft({ ...draft, articleEnabled: e.target.checked })
            }
          />
          Automatically book new articles
        </label>
        <label className="field-label" htmlFor="article-time">
          Daily article time
        </label>
        <input
          id="article-time"
          type="time"
          required
          value={draft.articleTime}
          onChange={(e) => setDraft({ ...draft, articleTime: e.target.value })}
        />
      </section>
      <section className="setup-panel">
        <div className="automation-heading">
          <ImagePlus size={22} />
          <h2>Daily image posts</h2>
        </div>
        <p>
          Two separate posts daily, each with one image and two paragraphs.
          Approved posts fill the next available slot; an empty queue stays
          empty.
        </p>
        <label className="customize-toggle">
          <input
            type="checkbox"
            checked={draft.creativeEnabled}
            onChange={(e) =>
              setDraft({ ...draft, creativeEnabled: e.target.checked })
            }
          />
          Enable booking into the daily image queue
        </label>
        <div className="time-pair">
          {draft.creativeTimes.map((time, i) => (
            <label key={i} className="field-label">
              Post {i + 1}
              <input
                type="time"
                required
                value={time}
                onChange={(e) => {
                  const times: [string, string] = [...draft.creativeTimes];
                  times[i] = e.target.value;
                  setDraft({ ...draft, creativeTimes: times });
                }}
              />
            </label>
          ))}
        </div>
      </section>
      <section className="setup-panel">
        <h2>First-comment approach</h2>
        <p>
          Keep website links in the article post by default. Add an optional
          comment in the composer when extra context is useful. On X, this is a
          reply to your own post.
        </p>
        <p>
          Comments are sent only after the post succeeds. LinkedIn requires
          additional permission. Delivery order is best-effort: someone else may
          comment before the automated comment arrives.
        </p>
      </section>
      <div className="settings-save">
        <p>
          Changes apply to new bookings. Existing scheduled posts keep their
          times and will still publish. To stop an existing booking, cancel it
          from Publishing.
        </p>
        <button className="primary" disabled={busy}>
          <Save size={17} />
          {busy ? "Saving…" : "Save settings"}
        </button>
      </div>
      {message && (
        <p role="status" className="settings-message">
          {message}
        </p>
      )}
    </form>
  );
}
