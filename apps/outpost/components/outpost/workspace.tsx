"use client";
import { useEffect, useState, useRef } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Feather,
  ImagePlus,
  Layers3,
  Link2,
  Loader2,
  LogOut,
  Plus,
  Send,
  Settings2,
  Trash2,
  X,
  AlertCircle,
  FileText,
} from "lucide-react";
import { Account, Post, Platform, platformName } from "@/lib/outpost/types";
import AutomationSettings from "@/components/outpost/automation-settings";
import {
  defaultSettings,
  settingsSchema,
  PublishingSettings,
} from "@/lib/outpost/settings";
import { nextDailySlot } from "@/lib/outpost/article-schedule";
const previewAccounts: Account[] = [
  {
    id: "preview-personal",
    platform: "linkedin",
    name: "Personal profile",
    handle: "Your LinkedIn",
    connected: false,
  },
  {
    id: "preview-page",
    platform: "linkedin-page",
    name: "Company page",
    handle: "Your company",
    connected: false,
  },
  {
    id: "preview-x",
    platform: "x",
    name: "X profile",
    handle: "Your X account",
    connected: false,
  },
];
const symbol = (p: Platform) => (p === "x" ? "𝕏" : "in");
async function api(path: string, options?: RequestInit) {
  const res = await fetch("/admin/api/" + path, options);
  const data = await res.json();
  if (!res.ok)
    throw new Error(data.error || "Something went wrong. Please try again.");
  return data;
}
const json = (body: unknown, method = "POST") => ({
  method,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});
export default function Workspace() {
  const [browserZone, setBrowserZone] = useState("UTC");
  useEffect(
    () => setBrowserZone(Intl.DateTimeFormat().resolvedOptions().timeZone),
    [],
  );
  const [settings, setSettings] = useState<PublishingSettings>(defaultSettings);
  const [creativeMode, setCreativeMode] = useState(false);
  const [firstComment, setFirstComment] = useState("");
  const [view, setView] = useState("queue");
  const [filter, setFilter] = useState("all");
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [demo, setDemo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState(false);
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [composer, setComposer] = useState(false);
  const [text, setText] = useState("");
  const [variants, setVariants] = useState<Record<string, string>>({});
  const [customize, setCustomize] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [when, setWhen] = useState("");
  const [image, setImage] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [submissionKey, setSubmissionKey] = useState("");
  const [config, setConfig] = useState<Record<string, boolean>>({});
  const fileRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (composer) dialogRef.current?.showModal();
  }, [composer]);
  async function refresh() {
    const data = await api("workspace");
    setDemo(data.demo);
    setConfig(data.config || {});
    if (data.demo) {
      setAccounts(previewAccounts);
      const savedSettings = settingsSchema.safeParse(
        JSON.parse(localStorage.getItem("outpost-preview-settings") || "null"),
      );
      if (savedSettings.success) setSettings(savedSettings.data);
      try {
        setPosts(
          JSON.parse(localStorage.getItem("outpost-preview-drafts") || "[]"),
        );
      } catch {
        setPosts([]);
      }
    } else {
      setAccounts(data.accounts);
      setSettings(data.settings || defaultSettings);
      setPosts(data.posts);
    }
  }
  useEffect(() => {
    refresh()
      .catch((e) => {
        if (e.message === "Sign in required") setLogin(true);
        else setNotice(e.message);
      })
      .finally(() => setLoading(false));
    const q = new URLSearchParams(location.search);
    if (q.get("connected"))
      setNotice("Account connected. You’re ready to post.");
    if (q.get("error")) setNotice(q.get("error")!);
    if (q.size) history.replaceState({}, "", "/admin");
  }, []);
  useEffect(() => {
    if (demo || login || loading || composer || view === "automation") return;
    const timer = setInterval(() => {
      refresh().catch(() => {});
    }, 30000);
    return () => clearInterval(timer);
  }, [demo, login, loading, composer, view]);
  function localSave(next: Post[]) {
    localStorage.setItem("outpost-preview-drafts", JSON.stringify(next));
    setPosts(next);
  }
  function openComposer(post?: Post, creative = false) {
    setCreativeMode(post?.kind === "creative" || creative);
    setFirstComment(post?.deliveries[0]?.firstComment || "");
    setSubmissionKey(crypto.randomUUID());
    setEditing(post?.id || null);
    setText(post?.text || "");
    setSelected(
      post?.deliveries.map((d) => d.accountId) ||
        accounts.filter((a) => a.connected || demo).map((a) => a.id),
    );
    setVariants(
      Object.fromEntries(
        post?.deliveries
          .filter((d) => d.text !== post.text)
          .map((d) => [d.accountId, d.text]) || [],
      ),
    );
    setCustomize(!!post?.deliveries.some((d) => d.text !== post.text));
    setWhen(
      post?.scheduledAt
        ? new Date(
            new Date(post.scheduledAt).getTime() -
              new Date().getTimezoneOffset() * 60000,
          )
            .toISOString()
            .slice(0, 16)
        : "",
    );
    setImage(post?.image || "");
    setImagePath(post?.imagePath || "");
    setComposer(true);
  }
  async function save(action: "draft" | "schedule" | "publish" | "daily") {
    if (!text.trim() || !selected.length) {
      setNotice("Add your post and select at least one channel.");
      return;
    }
    if (
      action === "schedule" &&
      (!when || new Date(when).getTime() <= Date.now())
    ) {
      setNotice("Choose a future date and time.");
      return;
    }
    if (
      action === "daily" &&
      (!image ||
        text
          .trim()
          .split(/\n\s*\n/)
          .filter(Boolean).length !== 2 ||
        selected.some(
          (id) =>
            (variants[id] ?? text)
              .trim()
              .split(/\n\s*\n/)
              .filter(Boolean).length !== 2,
        ))
    ) {
      setNotice(
        "Add one image and exactly two paragraphs for each selected channel.",
      );
      return;
    }
    setBusy(true);
    try {
      if (demo) {
        if (action !== "draft" && action !== "daily")
          throw new Error(
            "Connect your services before scheduling or publishing. Preview mode supports local drafts.",
          );
        const slot =
          action === "daily"
            ? nextDailySlot(
                new Date(),
                posts
                  .filter((p) => p.id !== editing && p.scheduledAt)
                  .map((p) => p.scheduledAt!),
                settings.timeZone,
                settings.creativeTimes,
                posts
                  .filter(
                    (p) =>
                      p.kind === "creative" &&
                      p.scheduledAt &&
                      p.id !== editing,
                  )
                  .map((p) => p.scheduledAt!),
              ).toISOString()
            : null;
        if (action === "daily" && !settings.creativeEnabled)
          throw new Error("Enable the daily image queue in Automation first.");
        const post: Post = {
          kind: creativeMode ? "creative" : "manual",
          id: editing || crypto.randomUUID(),
          text,
          image,
          createdAt: new Date().toISOString(),
          scheduledAt: slot,
          deliveries: selected.map((id) => {
            const a = accounts.find((a) => a.id === id)!;
            return {
              id: crypto.randomUUID(),
              accountId: id,
              accountName: a.name,
              platform: a.platform,
              text: variants[id] ?? text,
              status: action === "daily" ? "scheduled" : "draft",
              firstComment,
            };
          }),
        };
        localSave([post, ...posts.filter((p) => p.id !== editing)]);
      } else {
        await api(
          "posts",
          json({
            id: editing,
            submissionKey,
            kind: creativeMode ? "creative" : "manual",
            firstComment,
            text,
            imagePath: imagePath || null,
            scheduledAt:
              action === "schedule" ? new Date(when).toISOString() : null,
            action,
            destinations: selected.map((accountId) => ({
              accountId,
              text: variants[accountId] ?? text,
            })),
          }),
        );
        await refresh();
      }
      setComposer(false);
      setNotice(
        action === "draft"
          ? "Draft saved."
          : action === "daily"
            ? demo
              ? "Preview booking added. Nothing will be published."
              : "Post booked into the next daily image slot."
            : action === "schedule"
              ? "Post added to the queue."
              : "Post queued for publishing. Status updates automatically.",
      );
    } catch (e) {
      setNotice((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function upload(file?: File) {
    if (!file) return;
    if (
      !["image/jpeg", "image/png"].includes(file.type) ||
      file.size > 3 * 1024 * 1024
    ) {
      setNotice("Choose a JPG or PNG under 3 MB.");
      return;
    }
    setBusy(true);
    try {
      if (demo) {
        if (file.size > 1024 * 1024)
          throw new Error(
            "Preview images must be under 1 MB. Connected storage supports 3 MB.",
          );
        const reader = new FileReader();
        reader.onload = () => {
          setImage(String(reader.result));
          setBusy(false);
        };
        reader.readAsDataURL(file);
        return;
      }
      const form = new FormData();
      form.append("file", file);
      const data = await api("media", { method: "POST", body: form });
      setImage(data.url);
      setImagePath(data.path);
    } catch (e) {
      setNotice((e as Error).message);
      setBusy(false);
    } finally {
      if (!demo) setBusy(false);
    }
  }
  async function remove(post: Post) {
    if (
      !confirm(
        "Delete this draft or cancel its remaining scheduled posts? Published posts stay on the social platform.",
      )
    )
      return;
    try {
      if (demo) localSave(posts.filter((p) => p.id !== post.id));
      else {
        await api("posts/" + post.id, { method: "DELETE" });
        await refresh();
      }
    } catch (e) {
      setNotice((e as Error).message);
    }
  }
  async function retry(id: string) {
    setBusy(true);
    try {
      await api("deliveries/" + id + "/retry", json({}));
      await refresh();
      setNotice("Retry queued.");
    } catch (e) {
      setNotice((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function resolveDelivery(id: string) {
    const outcome = prompt(
      "Check the social account first. Type PUBLISHED if the post exists, or NOT PUBLISHED if you have confirmed it does not.",
    );
    if (!outcome || !["PUBLISHED", "NOT PUBLISHED"].includes(outcome)) return;
    try {
      await api(
        "deliveries/" + id + "/resolve",
        json({ outcome: outcome === "PUBLISHED" ? "published" : "failed" }),
      );
      await refresh();
      setNotice("Delivery resolved. Confirmed failures can now be retried.");
    } catch (e) {
      setNotice((e as Error).message);
    }
  }
  const count = (status: string) =>
    posts.filter((p) => p.deliveries.some((d) => d.status === status)).length;
  const filtered = posts
    .filter((p) =>
      view === "creative"
        ? p.kind === "creative"
        : view === "drafts"
          ? p.deliveries.every((d) => d.status === "draft")
          : filter === "all"
            ? p.deliveries.some((d) => d.status !== "draft")
            : p.deliveries.some((d) => d.status === filter),
    )
    .sort((a, b) =>
      view === "drafts"
        ? b.createdAt.localeCompare(a.createdAt)
        : (a.scheduledAt || "9999").localeCompare(b.scheduledAt || "9999"),
    );
  if (login)
    return (
      <main className="login">
        <div className="login-card">
          <div className="brand">
            <span className="brand-icon">
              <Layers3 size={23} />
            </span>
            outpost<span className="brand-dot">.</span>
          </div>
          <h1>Your next post starts here.</h1>
          <p>Sign in to your team’s publishing workspace.</p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setBusy(true);
              const form = new FormData(e.currentTarget);
              try {
                await api(
                  "auth/login",
                  json({
                    email: form.get("email"),
                    password: form.get("password"),
                  }),
                );
                setLogin(false);
                await refresh();
              } catch (e) {
                setNotice((e as Error).message);
              } finally {
                setBusy(false);
              }
            }}
          >
            <label>
              Email
              <input
                name="email"
                type="email"
                required
                autoComplete="username"
              />
            </label>
            <label>
              Password
              <input
                name="password"
                type="password"
                required
                autoComplete="current-password"
              />
            </label>
            <button className="primary" disabled={busy}>
              {busy ? "Signing in…" : "Sign in"}
              <ArrowUpRight size={18} />
            </button>
          </form>
          {notice && <p role="alert">{notice}</p>}
        </div>
      </main>
    );
  return (
    <div className="shell">
      <aside className="sidebar">
        <a className="brand" href="/admin">
          <span className="brand-icon">
            <Layers3 size={23} />
          </span>
          outpost<span className="brand-dot">.</span>
        </a>
        <div className="workspace-switch">
          <span className="workspace-avatar">Y</span>
          <div>
            <strong>Your workspace</strong>
            <small>Team publishing</small>
          </div>
          <ChevronRight size={16} />
        </div>
        <div className="nav-label">WORKSPACE</div>
        <nav>
          {[
            ["queue", "Publishing", CalendarDays],
            ["drafts", "Drafts", FileText],
            ["creative", "Daily image posts", ImagePlus],
            ["automation", "Automation", Settings2],
            ["channels", "Channels", Link2],
          ].map(([id, label, Icon]) => (
            <button
              key={String(id)}
              className={view === id ? "nav-item active" : "nav-item"}
              onClick={() => setView(String(id))}
            >
              {typeof Icon !== "string" && <Icon size={19} />}
              <span>{String(label)}</span>
              {id === "drafts" && <small>{count("draft")}</small>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="small-note">
            <Feather size={20} />
            <strong>
              A little consistency.
              <br />A lot of possibility.
            </strong>
          </div>
          <button className="nav-item" onClick={() => setView("settings")}>
            <Settings2 size={19} />
            Workspace setup
          </button>
          {!demo && (
            <button
              className="nav-item"
              onClick={async () => {
                await api("auth/logout", { method: "POST" });
                setLogin(true);
              }}
            >
              <LogOut size={19} />
              Sign out
            </button>
          )}
          <div className="version">
            OUTPOST <span>MVP / 01</span>
          </div>
        </div>
      </aside>
      <div className="main">
        <header className="topbar">
          <span>
            Workspace <ChevronRight size={14} />{" "}
            <strong>
              {view === "queue"
                ? "Publishing"
                : view.charAt(0).toUpperCase() + view.slice(1)}
            </strong>
          </span>
          <span className="private-badge">
            <span />
            Private workspace
          </span>
        </header>
        <main className="content">
          {demo && (
            <div className="preview-banner">
              <span>
                <strong>Preview mode</strong> · Drafts are saved in this
                browser. Nothing will be published.
              </span>
              <button onClick={() => setView("settings")}>
                Set up workspace <ArrowUpRight size={14} />
              </button>
            </div>
          )}
          <div className="page-title">
            <div>
              <div className="eyebrow">MAKE YOURSELF HEARD</div>
              <h1>
                {view === "queue"
                  ? "Your publishing desk"
                  : view === "drafts"
                    ? "Room for your next idea"
                    : view === "creative"
                      ? "Your daily image queue"
                      : view === "automation"
                        ? "Set your publishing rhythm"
                        : view === "channels"
                          ? "Your channels, together"
                          : "Make it yours"}
              </h1>
              <p>
                {view === "queue"
                  ? "A clear view of what’s going out, and what’s next."
                  : view === "drafts"
                    ? "Start a thought. Come back when it’s ready."
                    : view === "creative"
                      ? "One image. Two paragraphs. Two posts a day."
                      : view === "automation"
                        ? "Choose the times for your approved content."
                        : view === "channels"
                          ? "Connect the profiles and pages you publish to."
                          : "Connect your services to start publishing."}
              </p>
            </div>
            {["queue", "drafts", "creative"].includes(view) && (
              <button
                className="primary"
                onClick={() => openComposer(undefined, view === "creative")}
              >
                <Plus size={18} />
                Create post
              </button>
            )}
          </div>
          {["queue", "drafts", "creative"].includes(view) && (
            <>
              <section className="automation-strip">
                <span className="automation-icon">
                  <Clock3 size={20} />
                </span>
                <div>
                  <strong>nandann.com → your social channels</strong>
                  <span>
                    Articles {settings.articleTime} · Image posts{" "}
                    {settings.creativeTimes.join(" & ")} · {settings.timeZone}
                  </span>
                </div>
                <button
                  className="text-button"
                  onClick={() => setView("automation")}
                >
                  Edit schedule
                  <ArrowUpRight size={15} />
                </button>
              </section>
              <section className="stats">
                <div>
                  <span className="stat-icon violet">
                    <CalendarDays size={21} />
                  </span>
                  <div>
                    <strong>{count("scheduled") + count("publishing")}</strong>
                    <span>In the queue</span>
                  </div>
                  <small>Ready for their moment</small>
                </div>
                <div>
                  <span className="stat-icon orange">
                    <FileText size={21} />
                  </span>
                  <div>
                    <strong>{count("draft")}</strong>
                    <span>Drafts in progress</span>
                  </div>
                  <small>Good ideas start here</small>
                </div>
                <div>
                  <span className="stat-icon green">
                    <CheckCircle2 size={21} />
                  </span>
                  <div>
                    <strong>{count("published")}</strong>
                    <span>Published posts</span>
                  </div>
                  <small>Out in the world</small>
                </div>
              </section>
              <div className="desk-grid">
                <section className="queue-panel">
                  <div className="panel-head">
                    <h2>
                      {view === "drafts" ? "Your drafts" : "Post queue"}{" "}
                      <span>{filtered.length}</span>
                    </h2>
                    <span className="timezone">
                      <Clock3 size={14} />
                      {browserZone.replaceAll("_", " ")}
                    </span>
                  </div>
                  {view === "queue" && (
                    <div className="tabs" aria-label="Filter posts">
                      {[
                        ["all", "All posts"],
                        ["scheduled", "Scheduled"],
                        ["published", "Published"],
                        ["failed", "Failed"],
                        ["unknown", "Needs review"],
                      ].map(([id, label]) => (
                        <button
                          className={filter === id ? "selected" : ""}
                          key={id}
                          onClick={() => setFilter(id)}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  )}
                  {loading ? (
                    <div className="empty">
                      <Loader2 className="spin" />
                      <p>Loading your workspace…</p>
                    </div>
                  ) : !filtered.length ? (
                    <div className="empty">
                      <div className="empty-illustration">
                        <Send size={33} />
                      </div>
                      <h3>
                        {view === "drafts"
                          ? "Your next idea belongs here"
                          : filter === "all"
                            ? "Your queue is a fresh page"
                            : "Nothing here yet"}
                      </h3>
                      <p>
                        {view === "drafts"
                          ? "Capture a thought and shape it into your next post."
                          : "Write once, make it yours for each channel, and choose the right moment."}
                      </p>
                      <button
                        className="secondary"
                        onClick={() =>
                          openComposer(undefined, view === "creative")
                        }
                      >
                        <Plus size={16} />
                        {view === "drafts"
                          ? "Write a draft"
                          : "Create your first post"}
                      </button>
                    </div>
                  ) : (
                    <div className="post-list">
                      {filtered.map((post) => (
                        <article className="post-card" key={post.id}>
                          <div className="post-meta">
                            <span>
                              <CalendarDays size={14} />
                              {post.scheduledAt
                                ? new Date(post.scheduledAt).toLocaleString(
                                    [],
                                    { dateStyle: "medium", timeStyle: "short" },
                                  )
                                : "Unscheduled draft"}
                            </span>
                            {post.deliveries.every(
                              (d) => d.status === "draft",
                            ) && (
                              <button
                                className="text-button"
                                onClick={() => openComposer(post)}
                              >
                                Edit draft
                              </button>
                            )}
                          </div>
                          <p className="post-text">{post.text}</p>
                          {post.image && (
                            <img
                              className="post-image"
                              src={post.image}
                              alt="Post attachment"
                            />
                          )}
                          <div className="deliveries">
                            {post.deliveries.map((d) => (
                              <div key={d.id} className="delivery">
                                <span className={"social-icon " + d.platform}>
                                  {symbol(d.platform)}
                                </span>
                                <span>{d.accountName}</span>
                                <span className={"status " + d.status}>
                                  {d.status === "unknown"
                                    ? "Needs review"
                                    : d.status}
                                </span>
                                {d.url && (
                                  <a
                                    href={d.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="View published post"
                                  >
                                    <ArrowUpRight size={16} />
                                  </a>
                                )}
                                {d.status === "failed" && (
                                  <button
                                    className="text-button"
                                    disabled={busy}
                                    onClick={() => retry(d.id)}
                                  >
                                    Retry
                                  </button>
                                )}
                                {d.status === "unknown" && (
                                  <button
                                    className="text-button"
                                    disabled={busy}
                                    onClick={() => resolveDelivery(d.id)}
                                  >
                                    Resolve
                                  </button>
                                )}
                                {d.comment && (
                                  <div className="comment-status">
                                    <span>
                                      First comment: {d.comment.status}
                                    </span>
                                    {d.comment.error && (
                                      <small>{d.comment.error}</small>
                                    )}
                                    {["failed", "unknown"].includes(
                                      d.comment.status,
                                    ) && (
                                      <button
                                        className="text-button"
                                        onClick={async () => {
                                          let action = "retry";
                                          if (d.comment!.status === "unknown") {
                                            const value = prompt(
                                              "Check the actual post. Type PUBLISHED or NOT PUBLISHED to resolve this comment.",
                                            );
                                            if (
                                              !value ||
                                              ![
                                                "PUBLISHED",
                                                "NOT PUBLISHED",
                                              ].includes(value)
                                            )
                                              return;
                                            action =
                                              value === "PUBLISHED"
                                                ? "confirm-published"
                                                : "confirm-failed";
                                          }
                                          try {
                                            await api(
                                              "comments/" + d.comment!.id,
                                              json({ action }),
                                            );
                                            await refresh();
                                          } catch (e) {
                                            setNotice((e as Error).message);
                                          }
                                        }}
                                      >
                                        {d.comment.status === "failed"
                                          ? "Retry comment"
                                          : "Resolve comment"}
                                      </button>
                                    )}
                                  </div>
                                )}
                                {d.error && (
                                  <p className="delivery-error">{d.error}</p>
                                )}
                              </div>
                            ))}
                          </div>
                          {post.deliveries.every(
                            (d) =>
                              !["publishing", "unknown"].includes(d.status),
                          ) && (
                            <button
                              className="delete-button"
                              onClick={() => remove(post)}
                            >
                              <Trash2 size={14} />
                              Remove from workspace
                            </button>
                          )}
                        </article>
                      ))}
                    </div>
                  )}
                </section>
                <aside className="right-rail">
                  <section className="channels-summary">
                    <div className="panel-head">
                      <h2>Your channels</h2>
                      <button
                        className="icon-button"
                        onClick={() => setView("channels")}
                        aria-label="Manage channels"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                    {accounts.map((a) => (
                      <div className="channel-row" key={a.id}>
                        <span className={"social-icon " + a.platform}>
                          {symbol(a.platform)}
                        </span>
                        <div>
                          <strong>{a.name}</strong>
                          <small>
                            {a.connected ? "Connected" : "Not connected"}
                          </small>
                        </div>
                        <span
                          className={a.connected ? "dot connected" : "dot"}
                        />
                      </div>
                    ))}
                    {!accounts.length && (
                      <p className="muted padded">
                        Connect your first channel to get started.
                      </p>
                    )}
                    <button
                      className="rail-link"
                      onClick={() => setView("channels")}
                    >
                      Manage channels
                      <ArrowUpRight size={15} />
                    </button>
                  </section>
                  <section className="tip-card">
                    <span className="eyebrow">A SMALL REMINDER</span>
                    <h3>
                      Same idea.
                      <br />
                      Your voice, everywhere.
                    </h3>
                    <p>
                      Give each channel its own version. A little context goes a
                      long way.
                    </p>
                    <div className="tip-line" />
                  </section>
                </aside>
              </div>
            </>
          )}
          {view === "automation" && (
            <AutomationSettings
              value={settings}
              demo={demo}
              onSave={async (value) => {
                if (demo)
                  localStorage.setItem(
                    "outpost-preview-settings",
                    JSON.stringify(value),
                  );
                else await api("settings", json(value, "PUT"));
                setSettings(value);
              }}
            />
          )}
          {view === "channels" && (
            <section className="connection-grid">
              {(["linkedin", "linkedin-page", "x"] as Platform[]).map((p) => (
                <article className="connection-card" key={p}>
                  <span className={"social-icon large " + p}>{symbol(p)}</span>
                  <h2>{platformName(p)}</h2>
                  <p>
                    {p === "linkedin-page"
                      ? "Publish as your company. Requires LinkedIn Community Management access."
                      : p === "x"
                        ? "Share updates with your audience. Uses your X API credit balance."
                        : "Share your perspective from your personal LinkedIn profile."}
                  </p>
                  {accounts
                    .filter((a) => a.platform === p && a.connected)
                    .map((a) => (
                      <div className="connected-account" key={a.id}>
                        <Check size={16} />
                        {a.name}
                        <small>
                          {a.commentCapable
                            ? " · Comment access"
                            : " · Post access"}
                        </small>
                      </div>
                    ))}
                  <button
                    className="secondary"
                    onClick={() => {
                      if (demo || !config[p === "x" ? "x" : "linkedin"]) {
                        setNotice(
                          "Add your social app credentials in Vercel first. See Workspace setup.",
                        );
                        setView("settings");
                      } else location.href = "/admin/api/oauth/" + p;
                    }}
                  >
                    <Link2 size={16} />
                    Connect {platformName(p)}
                  </button>
                  {p !== "x" && (
                    <button
                      className="text-button"
                      onClick={() => {
                        if (demo) {
                          setNotice(
                            "Connect the live workspace to request LinkedIn comment permissions.",
                          );
                          return;
                        }
                        location.href = "/admin/api/oauth/" + p + "?comments=1";
                      }}
                    >
                      Connect with comment access
                    </button>
                  )}
                </article>
              ))}
            </section>
          )}
          {view === "settings" && (
            <section className="setup-panel">
              <h2>Workspace setup</h2>
              <p>
                Complete these steps to move from drafts to live publishing.
              </p>
              {[
                [
                  "database",
                  "Database & private login",
                  "Create a Supabase project, apply db/schema.sql, and add the environment variables listed in the setup guide.",
                ],
                [
                  "storage",
                  "Image storage",
                  "Create a private post-media bucket in Supabase for JPG and PNG uploads.",
                ],
                [
                  "linkedin",
                  "LinkedIn developer app",
                  "Enable Sign In with OpenID Connect and Share on LinkedIn. Request Community Management access for company pages.",
                ],
                [
                  "x",
                  "X developer app",
                  "Enable OAuth 2.0 for a web app, add your callback URL, and fund API credits.",
                ],
                [
                  "website",
                  "nandann.com article API",
                  "New articles reserve the next free 6 PM slot, one article per day. Deploy the website article API and configure ARTICLE_FEED_URL.",
                ],
                [
                  "cron",
                  "Scheduled publishing",
                  "Set a strong CRON_SECRET in Vercel. The included configuration checks the queue every minute.",
                ],
              ].map(([key, title, desc], i) => (
                <div className="setup-step" key={key}>
                  <span className={config[key] ? "step done" : "step"}>
                    {config[key] ? <Check size={18} /> : i + 1}
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{desc}</p>
                  </div>
                  <small>{config[key] ? "Configured" : "To configure"}</small>
                </div>
              ))}
              <p className="setup-footer">
                Full setup instructions are included in the project’s README.
                Credentials stay on the server.
              </p>
            </section>
          )}
          <footer className="footer">
            <span>A quieter way to keep showing up.</span>
            <span>Made for your team.</span>
          </footer>
        </main>
      </div>
      {notice && (
        <div className="toast" role="status">
          <AlertCircle size={19} />
          <span>{notice}</span>
          <button
            aria-label="Dismiss notification"
            onClick={() => setNotice("")}
          >
            <X size={17} />
          </button>
        </div>
      )}
      {composer && (
        <dialog
          ref={dialogRef}
          className="modal-backdrop"
          onCancel={(e) => {
            if (busy) e.preventDefault();
            else setComposer(false);
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget && !busy) setComposer(false);
          }}
        >
          <section
            className="composer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="composer-title"
            onKeyDown={(e) => {
              if (e.key === "Escape" && !busy) setComposer(false);
            }}
          >
            <div className="composer-head">
              <div>
                <span className="eyebrow">FROM THOUGHT TO TIMELINE</span>
                <h2 id="composer-title">
                  {editing ? "Edit your draft" : "Create a post"}
                </h2>
              </div>
              <button
                className="icon-button"
                disabled={busy}
                aria-label="Close composer"
                onClick={() => setComposer(false)}
              >
                <X size={22} />
              </button>
            </div>
            <div className="composer-body">
              <label className="customize-toggle">
                <input
                  type="checkbox"
                  checked={creativeMode}
                  onChange={(e) => setCreativeMode(e.target.checked)}
                />
                Daily image post · one image and two paragraphs
              </label>
              <label className="field-label">Publish to</label>
              <div className="channel-pills">
                {accounts.map((a) => (
                  <button
                    key={a.id}
                    aria-pressed={selected.includes(a.id)}
                    className={
                      selected.includes(a.id)
                        ? "channel-pill chosen"
                        : "channel-pill"
                    }
                    onClick={() =>
                      setSelected(
                        selected.includes(a.id)
                          ? selected.filter((id) => id !== a.id)
                          : [...selected, a.id],
                      )
                    }
                  >
                    <span className={"social-icon " + a.platform}>
                      {symbol(a.platform)}
                    </span>
                    {a.name}
                    {selected.includes(a.id) && <Check size={14} />}
                  </button>
                ))}
              </div>
              {!accounts.length && (
                <p>Connect a channel before creating a post.</p>
              )}
              <label className="field-label" htmlFor="post-text">
                Your post
              </label>
              <textarea
                id="post-text"
                autoFocus
                placeholder={
                  creativeMode
                    ? "Paragraph 1: share one useful idea.\n\nParagraph 2: add an example or a question."
                    : "What would you like to share?"
                }
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={7}
              />
              <div className="editor-tools">
                <button
                  className="text-button"
                  disabled={busy}
                  onClick={() => fileRef.current?.click()}
                >
                  <ImagePlus size={18} />
                  Add image
                </button>
                <span>{text.length} characters</span>
                <input
                  hidden
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={(e) => {
                    upload(e.target.files?.[0]);
                    e.target.value = "";
                  }}
                />
              </div>
              {image && (
                <div className="attachment">
                  <img src={image} alt="Attached image preview" />
                  <button
                    aria-label="Remove image"
                    onClick={() => {
                      setImage("");
                      setImagePath("");
                    }}
                  >
                    <X size={17} />
                  </button>
                </div>
              )}
              <label className="customize-toggle">
                <input
                  type="checkbox"
                  checked={customize}
                  onChange={(e) => {
                    setCustomize(e.target.checked);
                    if (!e.target.checked) setVariants({});
                  }}
                />
                Customize text for each channel
              </label>
              {customize &&
                selected.map((id) => (
                  <label className="variant" key={id}>
                    {accounts.find((a) => a.id === id)?.name}
                    <textarea
                      rows={3}
                      value={variants[id] ?? text}
                      onChange={(e) =>
                        setVariants({ ...variants, [id]: e.target.value })
                      }
                    />
                  </label>
                ))}
              <label className="field-label" htmlFor="first-comment">
                First comment <small>(optional)</small>
              </label>
              <textarea
                id="first-comment"
                rows={2}
                maxLength={1250}
                value={firstComment}
                onChange={(e) => setFirstComment(e.target.value)}
                placeholder="Add useful context or a link after the post publishes."
              />
              <p className="composer-note">
                Requires comment access on each selected channel. X comments are
                replies and use the standard X text limit.
              </p>
              <label className="field-label" htmlFor="schedule">
                Schedule for <small>({browserZone})</small>
              </label>
              <input
                id="schedule"
                type="datetime-local"
                value={when}
                onChange={(e) => setWhen(e.target.value)}
              />
              {demo && (
                <p className="composer-note">
                  Preview drafts stay in this browser. Connect your services to
                  publish.
                </p>
              )}
            </div>
            <div className="composer-actions">
              <button
                className="secondary"
                disabled={busy}
                onClick={() => save("draft")}
              >
                Save draft
              </button>
              <button
                className="text-button"
                disabled={busy || demo}
                onClick={() => save("publish")}
              >
                Publish now
              </button>
              {creativeMode && (
                <button
                  className="primary"
                  disabled={busy}
                  onClick={() => save("daily")}
                >
                  <Clock3 size={17} />
                  Add to daily queue
                </button>
              )}
              <button
                className="primary"
                disabled={busy || demo}
                onClick={() => save("schedule")}
              >
                {busy ? (
                  <Loader2 size={17} className="spin" />
                ) : (
                  <CalendarDays size={17} />
                )}
                Schedule post
              </button>
            </div>
          </section>
        </dialog>
      )}
    </div>
  );
}
