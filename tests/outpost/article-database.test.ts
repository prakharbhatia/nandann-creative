import { beforeAll, afterAll, describe, it, expect, vi } from "vitest";
import { PGlite } from "@electric-sql/pglite";
import { readFileSync } from "node:fs";
const shared = vi.hoisted(() => ({ sql: undefined as unknown }));
vi.mock("../../lib/outpost/db", () => ({ db: () => shared.sql }));
vi.mock("../../lib/outpost/providers", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../../lib/outpost/providers")>()),
  publish: vi.fn(),
  publishComment: vi.fn(),
}));
import { publish, publishComment, ProviderError } from "../../lib/outpost/providers";
import { runCommentQueue } from "../../lib/outpost/comment-queue";
import { runQueue } from "../../lib/outpost/queue";
import { enqueueArticle } from "../../lib/outpost/article-queue";
import { syncArticleFeed } from "../../lib/outpost/article-feed";
const pg = new PGlite();
// Exercise the actual SQL against PostgreSQL WASM. Its single-connection transaction
// queue serializes test transactions; the production advisory lock is also executed.
function adapter(client: {
  query: (sql: string, params?: unknown[]) => Promise<{ rows: unknown[] }>;
}) {
  const tag = async (strings: TemplateStringsArray, ...values: unknown[]) => {
    const text = strings.reduce(
      (sql, part, i) => sql + (i ? "$" + i : "") + part,
      "",
    );
    return (
      await client.query(
        text,
        values.map((v) => (v instanceof Date ? v.toISOString() : v)),
      )
    ).rows;
  };
  return Object.assign(tag, {
    json: (value: unknown) => JSON.stringify(value),
  });
}
beforeAll(async () => {
  await pg.exec(
    `create role anon; create role authenticated; create schema storage; create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);`,
  );
  for (const path of [
    "db/outpost/schema.sql",
    "db/outpost/002_article_queue.sql",
    "db/outpost/003_article_feed.sql",
    "db/outpost/004_admin_console.sql",
  ])
    await pg.exec(readFileSync(path, "utf8"));
  shared.sql = Object.assign(adapter(pg), {
    begin: (run: (tx: ReturnType<typeof adapter>) => Promise<unknown>) =>
      pg.transaction((tx) => run(adapter(tx))),
  });
  await pg.exec(
    `insert into accounts(id,platform,provider_id,name,token) values('11111111-1111-4111-8111-111111111111','linkedin','urn:li:person:test','Personal','test'),('22222222-2222-4222-8222-222222222222','x','123','X','test');`,
  );
}, 20000);
afterAll(async () => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  await pg.close();
});
const article = (id: string) => ({
  id,
  url: "https://nandann.com/blog/" + id,
  title: "Article " + id,
  excerpt: "A short description",
});
describe("transactional website scheduling", () => {
  it("reserves consecutive 6 PM India slots for simultaneous distinct articles", async () => {
    const results = await Promise.all([
      enqueueArticle(article("one")),
      enqueueArticle(article("two")),
      enqueueArticle(article("three")),
    ]);
    const slots = results.map((r) => Date.parse(r.scheduledAt)).sort();
    expect(new Set(slots).size).toBe(3);
    expect(slots[1] - slots[0]).toBe(86400000);
    expect(slots[2] - slots[1]).toBe(86400000);
    for (const r of results)
      expect(new Date(r.scheduledAt).toISOString().slice(11, 16)).toBe("12:30");
    const rows = await pg.query<{ count: number }>(
      "select count(*)::int as count from deliveries",
    );
    expect(rows.rows[0].count).toBe(6);
  });
  it("deduplicates concurrent retries by stable ID and canonical URL", async () => {
    const results = await Promise.all([
      enqueueArticle(article("one")),
      enqueueArticle({
        ...article("one"),
        url: "https://nandann.com/blog/renamed-one",
      }),
      enqueueArticle({
        ...article("one"),
        id: "different-id",
        url: "https://nandann.com/blog/one/?utm_source=x",
      }),
    ]);
    expect(results.every((r) => r.duplicate)).toBe(true);
    expect(new Set(results.map((r) => r.postId)).size).toBe(1);
    const rows = await pg.query<{ count: number }>(
      "select count(*)::int as count from article_queue",
    );
    expect(rows.rows[0].count).toBe(3);
  });
  it("does not reserve a slot or silently omit a disconnected target", async () => {
    await pg.exec("update accounts set connected=false where platform='x'");
    await expect(enqueueArticle(article("blocked"))).rejects.toMatchObject({
      status: 409,
    });
    const rows = await pg.query<{ count: number }>(
      "select count(*)::int as count from article_queue where source_key='article:blocked'",
    );
    expect(rows.rows[0].count).toBe(0);
    await pg.exec("update accounts set connected=true");
  });
  it("does not resurrect a canceled article on retry", async () => {
    const before = await enqueueArticle(article("cancelled"));
    await pg.query("delete from posts where id=$1", [before.postId]);
    const after = await enqueueArticle(article("cancelled"));
    expect(after).toMatchObject({
      duplicate: true,
      status: "cancelled",
      postId: null,
    });
    expect(after.scheduledAt).toBe(before.scheduledAt);
  });
  it("baselines existing website articles, then queues new ones exactly once", async () => {
    vi.stubEnv("ARTICLE_FEED_URL", "https://nandann.com/api/social/articles");
    let records = [{ ...article("old-website"), publishedAt: "2026-09-01" }];
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => Response.json({ version: 1, articles: records })),
    );
    expect(await syncArticleFeed()).toMatchObject({
      baselineCreated: true,
      scheduled: 0,
    });
    records = [
      ...records,
      { ...article("new-website"), publishedAt: "2026-09-06" },
    ];
    expect(await syncArticleFeed()).toMatchObject({
      baselineCreated: false,
      scheduled: 1,
    });
    expect(await syncArticleFeed()).toMatchObject({ scheduled: 0 });
    const rows = await pg.query<{ source_key: string }>(
      "select source_key from article_queue",
    );
    expect(rows.rows.some((r) => r.source_key === "article:old-website")).toBe(
      false,
    );
    expect(
      rows.rows.filter((r) => r.source_key === "article:new-website"),
    ).toHaveLength(1);
  });
});

async function duePost() {
  const post = await pg.query<{ id: string }>(
    "insert into posts(submission_key,text,scheduled_at) values(gen_random_uuid(),'Test',now()) returning id",
  );
  await pg.query(
    "insert into deliveries(post_id,account_id,text,status,next_attempt_at) values($1,'11111111-1111-4111-8111-111111111111','Test','scheduled',now())",
    [post.rows[0].id],
  );
  return post.rows[0].id;
}
describe("publication acknowledgement safety", () => {
  it("keeps successful and uncertain channels separate", async () => {
    const id = await duePost();
    await pg.query(
      "insert into deliveries(post_id,account_id,text,status,next_attempt_at) values($1,'22222222-2222-4222-8222-222222222222','Test','scheduled',now())",
      [id],
    );
    vi.mocked(publish)
      .mockResolvedValueOnce({
        id: "posted-1",
        url: "https://example.com/post/1",
      })
      .mockRejectedValueOnce(new ProviderError("No confirmation", 503, true));
    await runQueue();
    const statuses = await pg.query<{ status: string }>(
      "select status from deliveries where post_id=$1 order by status",
      [id],
    );
    expect(statuses.rows.map((r) => r.status)).toEqual([
      "published",
      "unknown",
    ]);
    const calls = vi.mocked(publish).mock.calls.length;
    await runQueue();
    expect(vi.mocked(publish).mock.calls.length).toBe(calls);
  });
  it("does not retry after publication succeeds but saving its acknowledgement fails", async () => {
    const id = await duePost();
    const original = shared.sql as ReturnType<typeof adapter>;
    const wrapped = async (
      strings: TemplateStringsArray,
      ...values: unknown[]
    ) => {
      if (strings.join("").includes("status='published'"))
        throw new Error("Database temporarily unavailable");
      return original(strings, ...values);
    };
    shared.sql = Object.assign(wrapped, original);
    vi.mocked(publish).mockResolvedValueOnce({
      id: "posted-2",
      url: "https://example.com/post/2",
    });
    await expect(runQueue()).rejects.toThrow(
      "Database temporarily unavailable",
    );
    shared.sql = original;
    const row = await pg.query<{ status: string }>(
      "select status from deliveries where post_id=$1",
      [id],
    );
    expect(row.rows[0].status).toBe("publishing");
    const calls = vi.mocked(publish).mock.calls.length;
    await runQueue();
    expect(vi.mocked(publish).mock.calls.length).toBe(calls);
  });
});

describe("first comment outbox", () => {
  it("creates a comment only after the parent post succeeds and retries it independently", async () => {
    const id = await duePost();
    await pg.query("update deliveries set first_comment=$1 where post_id=$2", [
      "Extra context",
      id,
    ]);
    vi.mocked(publish).mockResolvedValueOnce({
      id: "parent-comment-test",
      url: "https://example.com/post",
    });
    await runQueue();
    const rows = await pg.query<{ id: string; status: string }>(
      "select c.id,c.status from post_comments c join deliveries d on c.delivery_id=d.id where d.post_id=$1",
      [id],
    );
    expect(rows.rows).toHaveLength(1);
    expect(rows.rows[0].status).toBe("scheduled");
    const parentCalls = vi.mocked(publish).mock.calls.length;
    vi.mocked(publishComment).mockRejectedValueOnce(
      new ProviderError("Permission denied", 403),
    );
    await runCommentQueue();
    expect(
      (
        await pg.query<{ status: string }>(
          "select status from post_comments where id=$1",
          [rows.rows[0].id],
        )
      ).rows[0].status,
    ).toBe("failed");
    await pg.query(
      "update post_comments set status='scheduled',next_attempt_at=now() where id=$1",
      [rows.rows[0].id],
    );
    vi.mocked(publishComment).mockResolvedValueOnce("comment-id");
    await runCommentQueue();
    expect(vi.mocked(publish).mock.calls.length).toBe(parentCalls);
    const comments = vi.mocked(publishComment).mock.calls.length;
    await runCommentQueue();
    expect(vi.mocked(publishComment).mock.calls.length).toBe(comments);
  });
  it("does not create comments for failed parents", async () => {
    const id = await duePost();
    await pg.query("update deliveries set first_comment=$1 where post_id=$2", [
      "Extra context",
      id,
    ]);
    vi.mocked(publish).mockRejectedValueOnce(
      new ProviderError("Permission denied", 403),
    );
    await runQueue();
    const rows = await pg.query(
      "select c.id from post_comments c join deliveries d on c.delivery_id=d.id where d.post_id=$1",
      [id],
    );
    expect(rows.rows).toHaveLength(0);
  });
  it("does not automatically retry an ambiguous comment result", async () => {
    const id = await duePost();
    await pg.query("update deliveries set first_comment=$1 where post_id=$2", [
      "Extra context",
      id,
    ]);
    vi.mocked(publish).mockResolvedValueOnce({
      id: "parent-uncertain-comment",
      url: "https://example.com/post",
    });
    await runQueue();
    vi.mocked(publishComment).mockRejectedValueOnce(
      new ProviderError("Unknown result", 503, true),
    );
    await runCommentQueue();
    const rows = await pg.query<{ status: string }>(
      "select c.status from post_comments c join deliveries d on c.delivery_id=d.id where d.post_id=$1",
      [id],
    );
    expect(rows.rows[0].status).toBe("unknown");
    const calls = vi.mocked(publishComment).mock.calls.length;
    await runCommentQueue();
    expect(vi.mocked(publishComment).mock.calls.length).toBe(calls);
  });
});
