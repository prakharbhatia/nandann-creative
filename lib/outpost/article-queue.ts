import { db } from "./db";
import { defaultSettings, settingsSchema } from "./settings";
import { articleCopy, canonicalArticleUrl } from "./article-input";
import { nextArticleSlot, DEFAULT_TIME_ZONE } from "./article-schedule";
import { HttpError } from "./auth";
import type { z } from "zod";
import { articleInput } from "./article-input";
export async function enqueueArticle(input: z.infer<typeof articleInput>) {
  const hosts = (
    process.env.ARTICLE_ALLOWED_HOSTS || "nandann.com,www.nandann.com"
  )
    .split(",")
    .map((h) => h.trim().toLowerCase())
    .filter(Boolean);
  let url: string;
  try {
    url = canonicalArticleUrl(input.url, hosts);
  } catch (e) {
    throw new HttpError(400, (e as Error).message);
  }
  const sourceKey = input.id ? `article:${input.id}` : `url:${url}`;

  const sql = db();
  return sql.begin(async (tx) => {
    // One transaction-scoped lock serializes slot selection and deduplication.
    // Hash uses a fixed namespace, not untrusted input; separate API instances share it.
    await tx`select pg_advisory_xact_lock(187964025,1800)`;
    const [existing] =
      await tx`select id,post_id,canonical_url,scheduled_at,time_zone from article_queue where source_key=${sourceKey} or canonical_url=${url} order by created_at limit 1`;
    if (existing)
      return {
        duplicate: true,
        articleId: existing.id,
        postId: existing.post_id,
        url: existing.canonical_url,
        scheduledAt: new Date(existing.scheduled_at).toISOString(),
        timeZone: existing.time_zone,
        status: existing.post_id ? "already_queued" : "cancelled",
      };
    const [saved] = await tx`select value from publishing_settings where id=1`;
    const settings = settingsSchema.parse(
      saved?.value || {
        ...defaultSettings,
        timeZone: process.env.ARTICLE_TIME_ZONE || DEFAULT_TIME_ZONE,
      },
    );
    if (!settings.articleEnabled)
      throw new HttpError(
        409,
        "Automatic article scheduling is paused. Retry when it is enabled.",
      );
    const timeZone = settings.timeZone;
    const configuredIds = (process.env.AUTO_PUBLISH_ACCOUNT_IDS || "")
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);
    const all =
      await tx`select id,platform,connected,expires_at,refresh_token from accounts order by created_at`;
    const accounts = configuredIds.length
      ? all.filter((a) => configuredIds.includes(a.id))
      : all;
    if (
      !accounts.length ||
      (configuredIds.length && accounts.length !== new Set(configuredIds).size)
    )
      throw new HttpError(
        409,
        "Connect your publishing accounts and configure AUTO_PUBLISH_ACCOUNT_IDS before submitting articles.",
      );
    if (
      accounts.some(
        (a) =>
          !a.connected ||
          (a.expires_at &&
            new Date(a.expires_at).getTime() <= Date.now() &&
            !a.refresh_token),
      )
    )
      throw new HttpError(
        409,
        "A target channel needs reconnection. The article has not been queued; reconnect and retry this request.",
      );
    const occupied =
      await tx`select scheduled_at from article_queue where scheduled_at>now() union select p.scheduled_at from posts p where p.scheduled_at>now() and exists(select 1 from deliveries d where d.post_id=p.id and d.status<>'draft')`;
    const articleBookings =
      await tx`select scheduled_at from article_queue where scheduled_at>now()-interval '2 days'`;
    const at = nextArticleSlot(
      new Date(),
      occupied.map((r) => r.scheduled_at),
      timeZone,
      settings.articleTime,
      articleBookings.map((r) => r.scheduled_at),
    );
    const [post] =
      await tx`insert into posts(submission_key,text,scheduled_at,kind) values(${crypto.randomUUID()},${articleCopy(input.title, input.excerpt, url, "linkedin")},${at},'article') returning id`;
    for (const a of accounts)
      await tx`insert into deliveries(post_id,account_id,text,status,next_attempt_at) values(${post.id},${a.id},${articleCopy(input.title, input.excerpt, url, a.platform)},'scheduled',${at})`;
    const [article] =
      await tx`insert into article_queue(source_key,canonical_url,title,post_id,scheduled_at,time_zone) values(${sourceKey},${url},${input.title},${post.id},${at},${timeZone}) returning id`;
    return {
      duplicate: false,
      articleId: article.id,
      postId: post.id,
      url,
      scheduledAt: at.toISOString(),
      timeZone,
      status: "scheduled",
      channels: accounts.map((a) => ({ id: a.id, platform: a.platform })),
    };
  });
}
