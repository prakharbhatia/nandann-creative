import { beforeEach, afterEach, it, expect, vi } from "vitest";
const state = vi.hoisted(() => ({ account: {} as Record<string, unknown> }));
vi.mock("../../lib/outpost/db", () => {
  const tag = async () => [state.account];
  return {
    db: () =>
      Object.assign(tag, {
        begin: async (run: (fn: typeof tag) => unknown) => run(tag),
      }),
  };
});
import { publishComment } from "../../lib/outpost/providers";
import { seal } from "../../lib/outpost/crypto";
beforeEach(() => {
  vi.stubEnv("TOKEN_ENCRYPTION_KEY", Buffer.alloc(32, 1).toString("base64"));
  state.account = {
    connected: true,
    comment_capable: true,
    token: seal("test-token"),
    platform: "x",
    provider_id: "123",
  };
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});
it("sends an X reply to the confirmed parent ID", async () => {
  const fetch = vi
    .fn()
    .mockResolvedValue(Response.json({ data: { id: "reply-id" } }));
  vi.stubGlobal("fetch", fetch);
  expect(await publishComment("account", "parent-id", "Extra context")).toBe(
    "reply-id",
  );
  expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual({
    text: "Extra context",
    reply: { in_reply_to_tweet_id: "parent-id" },
  });
});
it("sends a LinkedIn comment with the original actor and post", async () => {
  state.account.platform = "linkedin";
  state.account.provider_id = "urn:li:person:123";
  const fetch = vi
    .fn()
    .mockResolvedValue(
      new Response("", {
        status: 201,
        headers: { "x-restli-id": "comment-id" },
      }),
    );
  vi.stubGlobal("fetch", fetch);
  expect(await publishComment("account", "urn:li:share:456", "Context")).toBe(
    "comment-id",
  );
  expect(fetch.mock.calls[0][0]).toBe(
    "https://api.linkedin.com/rest/socialActions/urn%3Ali%3Ashare%3A456/comments",
  );
  expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual({
    actor: "urn:li:person:123",
    object: "urn:li:share:456",
    message: { text: "Context" },
  });
});
it("refuses comment publication without the comment capability", async () => {
  state.account.comment_capable = false;
  const fetch = vi.fn();
  vi.stubGlobal("fetch", fetch);
  await expect(
    publishComment("account", "parent", "Context"),
  ).rejects.toMatchObject({ status: 403 });
  expect(fetch).not.toHaveBeenCalled();
});
it("treats malformed success responses as uncertain, not retryable failures", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue(new Response("bad-json", { status: 201 })),
  );
  await expect(
    publishComment("account", "parent", "Context"),
  ).rejects.toMatchObject({ uncertain: true });
});
