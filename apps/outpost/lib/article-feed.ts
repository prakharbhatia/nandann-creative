import { z } from "zod";
import { readSettings } from "./settings-store";
import { db } from "./db";
import { enqueueArticle } from "./article-queue";
import { canonicalArticleUrl } from "./article-input";
const manifestSchema = z.object({
  version: z.literal(1),
  articles: z
    .array(
      z.object({
        id: z.string().min(1).max(200),
        url: z.string().url().max(2000),
        title: z.string().trim().min(1).max(300),
        excerpt: z.string().max(5000),
        publishedAt: z
          .string()
          .refine(
            (s) => Number.isFinite(Date.parse(s)),
            "Invalid publication date",
          ),
      }),
    )
    .max(1000),
});
export function parseArticleFeed(value: unknown) {
  const manifest = manifestSchema.parse(value);
  if (
    new Set(manifest.articles.map((a) => a.id)).size !==
    manifest.articles.length
  )
    throw new Error("Website returned duplicate article IDs.");
  return manifest.articles.sort(
    (a, b) =>
      Date.parse(a.publishedAt) - Date.parse(b.publishedAt) ||
      a.id.localeCompare(b.id),
  );
}
export async function syncArticleFeed() {
  const feedUrl = process.env.ARTICLE_FEED_URL;
  if (!feedUrl) return { enabled: false };
  const sql = db();
  try {
    const hosts = (
      process.env.ARTICLE_ALLOWED_HOSTS || "nandann.com,www.nandann.com"
    )
      .split(",")
      .map((h) => h.trim().toLowerCase());
    canonicalArticleUrl(feedUrl, hosts);
    const response = await fetch(feedUrl, {
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(10000),
      headers: { Accept: "application/json" },
    });
    if (!response.ok)
      throw new Error(`Website article API returned ${response.status}.`);
    const body = await response.text();
    if (body.length > 1000000)
      throw new Error("Website article API response is too large.");
    const articles = parseArticleFeed(JSON.parse(body));
    for (const a of articles) canonicalArticleUrl(a.url, hosts);
    const baseline = await sql.begin(async (tx) => {
      await tx`select pg_advisory_xact_lock(187964025,1800)`;
      const [state] =
        await tx`select baseline_ids from article_feed_state where feed_url=${feedUrl} for update`;
      if (state)
        return { initialized: false, ids: state.baseline_ids as string[] };
      // A new feed must not automatically backfill an existing site's entire archive.
      const ids = articles.map((a) => a.id);
      await tx`insert into article_feed_state(feed_url,baseline_ids) values(${feedUrl},${tx.json(ids)})`;
      return { initialized: true, ids };
    });
    const queued =
      await sql`select source_key,canonical_url from article_queue`;
    const seen = new Set([
      ...baseline.ids,
      ...queued.map((r) => String(r.source_key).replace(/^article:/, "")),
    ]);
    const seenUrls = new Set(queued.map((r) => String(r.canonical_url)));
    const pending = articles.filter(
      (a) =>
        !seen.has(a.id) && !seenUrls.has(canonicalArticleUrl(a.url, hosts)),
    );
    const settings = await readSettings();
    if (!settings.articleEnabled) {
      await sql`update article_feed_state set last_checked_at=now(),last_error=null where feed_url=${feedUrl}`;
      return {
        enabled: true,
        paused: true,
        scheduled: 0,
        remaining: pending.length,
      };
    }
    let scheduled = 0;
    let attempted = 0;
    const started = Date.now();
    for (const article of pending.slice(0, 20)) {
      if (Date.now() - started > 45000) break;
      attempted++;
      const { publishedAt, ...input } = article;
      void publishedAt;
      const result = await enqueueArticle(input);
      if (!result.duplicate) scheduled++;
    }
    await sql`update article_feed_state set last_checked_at=now(),last_error=null where feed_url=${feedUrl}`;
    return {
      enabled: true,
      baselineCreated: baseline.initialized,
      scheduled,
      remaining: Math.max(0, pending.length - attempted),
    };
  } catch (e) {
    // Store a bounded, non-secret operator message; do not log API keys or provider payloads.
    const message =
      e instanceof Error && e.message.startsWith("Website article API")
        ? e.message
        : "Article sync failed. Check the website API, migrations, and channel connections.";
    await sql`update article_feed_state set last_checked_at=now(),last_error=${message} where feed_url=${feedUrl}`.catch(
      () => {},
    );
    throw new Error(message);
  }
}
