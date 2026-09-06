import { describe, it, expect } from "vitest";
import { nextArticleSlot } from "../../lib/outpost/article-schedule";
import { articleCopy, canonicalArticleUrl } from "../../lib/outpost/article-input";
import { validApiKey } from "../../lib/outpost/api-key";
import twitter from "twitter-text";
describe("one article per day at 6 PM", () => {
  it("chooses today before 6 PM India time", () => {
    expect(
      nextArticleSlot(new Date("2026-09-06T10:00:00Z"), []).toISOString(),
    ).toBe("2026-09-06T12:30:00.000Z");
  });
  it("chooses tomorrow at or after 6 PM", () => {
    for (const at of ["2026-09-06T12:30:00Z", "2026-09-06T18:40:00Z"])
      expect(nextArticleSlot(new Date(at), []).toISOString()).toBe(
        "2026-09-07T12:30:00.000Z",
      );
  });
  it("moves every additional article to the next unoccupied day", () => {
    const slots: string[] = [];
    for (let i = 0; i < 4; i++)
      slots.push(
        nextArticleSlot(new Date("2026-09-06T10:00:00Z"), slots).toISOString(),
      );
    expect(slots).toEqual([
      "2026-09-06T12:30:00.000Z",
      "2026-09-07T12:30:00.000Z",
      "2026-09-08T12:30:00.000Z",
      "2026-09-09T12:30:00.000Z",
    ]);
  });
  it("handles month and year rollover", () => {
    expect(
      nextArticleSlot(new Date("2026-12-31T13:00:00Z"), []).toISOString(),
    ).toBe("2027-01-01T12:30:00.000Z");
  });
  it("uses calendar days across daylight saving changes", () => {
    expect(
      nextArticleSlot(
        new Date("2026-03-07T22:00:00Z"),
        ["2026-03-07T23:00:00Z"],
        "America/New_York",
      ).toISOString(),
    ).toBe("2026-03-08T22:00:00.000Z");
  });
  it("fails intentionally on invalid time zones", () => {
    expect(() => nextArticleSlot(new Date(), [], "invalid/zone")).toThrow();
  });
  it("does not let other hours consume the 6 PM slot", () => {
    expect(
      nextArticleSlot(new Date("2026-09-06T10:00:00Z"), [
        "2026-09-06T11:30:00Z",
      ]).toISOString(),
    ).toBe("2026-09-06T12:30:00.000Z");
  });
});
describe("website API input safety", () => {
  it("rejects missing, weak, or incorrect API keys", () => {
    expect(validApiKey(null, undefined)).toBe(false);
    expect(validApiKey("Bearer short", "short")).toBe(false);
    expect(validApiKey("Bearer " + "b".repeat(32), "a".repeat(32))).toBe(false);
    expect(validApiKey("Bearer " + "a".repeat(32), "a".repeat(32))).toBe(true);
  });
  it("deduplicates fragments, trailing slashes, and tracking URLs", () => {
    expect(
      canonicalArticleUrl(
        "https://nandann.com/blog/hello/?utm_source=linkedin#section",
        ["nandann.com"],
      ),
    ).toBe("https://nandann.com/blog/hello");
  });
  it("rejects off-site, credentialed, and insecure article URLs", () => {
    for (const url of [
      "http://nandann.com/a",
      "https://evil.com/a",
      "https://nandann.com.evil.com/a",
      "https://user:pass@nandann.com/a",
    ])
      expect(() => canonicalArticleUrl(url, ["nandann.com"])).toThrow();
  });
  it("fits channel limits and always preserves the article URL", () => {
    const url = "https://nandann.com/blog/article";
    for (const platform of ["x", "linkedin"]) {
      const copy = articleCopy(
        "A useful article",
        "🙂".repeat(2500),
        url,
        platform,
      );
      expect(copy.endsWith(url)).toBe(true);
      if (platform === "x") expect(twitter.parseTweet(copy).valid).toBe(true);
      else expect(copy.length).toBeLessThanOrEqual(3000);
    }
  });
});

describe("live website feed contract", () => {
  it("sorts articles oldest first with stable tie-breaking", async () => {
    const { parseArticleFeed } = await import("../../lib/outpost/article-feed");
    const article = (id: string, date: string) => ({
      id,
      title: "Title",
      excerpt: "Description",
      url: "https://nandann.com/blog/" + id,
      publishedAt: date,
    });
    expect(
      parseArticleFeed({
        version: 1,
        articles: [
          article("b", "2026-09-06"),
          article("a", "2026-09-06"),
          article("old", "2026-09-05"),
        ],
      }).map((a) => a.id),
    ).toEqual(["old", "a", "b"]);
  });
  it("rejects duplicate IDs and invalid dates before changing state", async () => {
    const { parseArticleFeed } = await import("../../lib/outpost/article-feed");
    const a = {
      id: "a",
      title: "Title",
      excerpt: "Description",
      url: "https://nandann.com/blog/a",
      publishedAt: "2026-09-06",
    };
    expect(() => parseArticleFeed({ version: 1, articles: [a, a] })).toThrow();
    expect(() =>
      parseArticleFeed({
        version: 1,
        articles: [{ ...a, publishedAt: "not a date" }],
      }),
    ).toThrow();
  });
});
