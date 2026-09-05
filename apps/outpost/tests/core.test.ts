import { describe, it, expect, vi, afterEach } from "vitest";
import { seal, unseal } from "../lib/crypto";
import { validateText, scheduleTime, postInput } from "../lib/validation";
import { ProviderError, providerFetch } from "../lib/providers";
import { failureState } from "../lib/queue";
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});
describe("publishing validation", () => {
  it("uses weighted X lengths, including emoji and shortened links", () => {
    expect(validateText("🙂".repeat(140), "x")).toBeNull();
    expect(validateText("🙂".repeat(141), "x")).toContain("280");
    expect(
      validateText("https://example.com/" + "a".repeat(400), "x"),
    ).toBeNull();
  });
  it("limits LinkedIn and rejects empty text", () => {
    expect(validateText("a".repeat(3000), "linkedin")).toBeNull();
    expect(validateText("a".repeat(3001), "linkedin-page")).toContain("3,000");
    expect(validateText("   ", "x")).not.toBeNull();
  });
  it("requires explicit future schedule and preserves instant across time zones", () => {
    const now = Date.parse("2026-09-05T10:00:00Z");
    expect(() => scheduleTime("schedule", null, now)).toThrow();
    expect(() =>
      scheduleTime("schedule", "2026-09-05T10:00:00Z", now),
    ).toThrow();
    expect(
      scheduleTime("schedule", "2026-09-05T16:00:00+05:30", now)?.toISOString(),
    ).toBe("2026-09-05T10:30:00.000Z");
    expect(scheduleTime("draft", null, now)).toBeNull();
    expect(scheduleTime("publish", null, now)?.getTime()).toBe(now);
  });
  it("requires an idempotency key and valid destinations", () => {
    expect(
      postInput.safeParse({ text: "hi", action: "publish", destinations: [] })
        .success,
    ).toBe(false);
  });
});
describe("credential encryption", () => {
  it("round trips tokens without plaintext and uses a fresh nonce", () => {
    vi.stubEnv("TOKEN_ENCRYPTION_KEY", Buffer.alloc(32, 7).toString("base64"));
    const a = seal("secret-token");
    expect(a).not.toContain("secret-token");
    expect(unseal(a)).toBe("secret-token");
    expect(seal("secret-token")).not.toBe(a);
  });
  it("rejects altered ciphertext and wrong keys", () => {
    vi.stubEnv("TOKEN_ENCRYPTION_KEY", Buffer.alloc(32, 7).toString("base64"));
    const a = seal("secret-token");
    const parts = a.split(".");
    parts[2] = (parts[2][0] === "A" ? "B" : "A") + parts[2].slice(1);
    expect(() => unseal(parts.join("."))).toThrow();
    vi.stubEnv("TOKEN_ENCRYPTION_KEY", Buffer.alloc(32, 8).toString("base64"));
    expect(() => unseal(a)).toThrow();
  });
  it("rejects invalid encryption keys", () => {
    vi.stubEnv("TOKEN_ENCRYPTION_KEY", "short");
    expect(() => seal("token")).toThrow();
  });
});
describe("safe publishing failures", () => {
  it("never retries an ambiguous post response", () => {
    expect(
      failureState(new ProviderError("unknown", 500, true), 1).status,
    ).toBe("unknown");
  });
  it("backs off on rate limits and stops after five attempts", () => {
    expect(
      failureState(new ProviderError("limited", 429, false, 900), 2),
    ).toMatchObject({ status: "scheduled", delay: 900 });
    expect(failureState(new ProviderError("limited", 429), 5).status).toBe(
      "failed",
    );
  });
  it("does not automatically retry permission or credit failures", () => {
    for (const code of [400, 401, 402, 403])
      expect(failureState(new ProviderError("denied", code), 1).status).toBe(
        "failed",
      );
  });
  it("treats network loss during a final post as uncertain", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("timeout")));
    await expect(
      providerFetch("https://api.x.com/2/tweets", {}, true),
    ).rejects.toMatchObject({ uncertain: true });
    await expect(
      providerFetch("https://api.x.com/2/users/me"),
    ).rejects.toMatchObject({ uncertain: false });
  });
  it("treats platform 5xx during publishing as uncertain", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("", { status: 503 })),
    );
    await expect(
      providerFetch("https://api.x.com/2/tweets", {}, true),
    ).rejects.toMatchObject({ uncertain: true, status: 503 });
  });
  it("honors rate-limit reset headers", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(
          new Response("", { status: 429, headers: { "retry-after": "900" } }),
        ),
    );
    await expect(
      providerFetch("https://api.x.com/2/tweets", {}, true),
    ).rejects.toMatchObject({ uncertain: false, retryAfter: 900 });
  });
});
