import { describe, it, expect } from "vitest";
import { defaultSettings, settingsSchema } from "../lib/settings";
import { nextDailySlot, nextArticleSlot } from "../lib/article-schedule";
import { twoParagraphs, postInput } from "../lib/validation";
describe("admin scheduling settings", () => {
  it("defaults to two image posts and one separate article", () => {
    expect(defaultSettings.creativeTimes).toEqual(["10:00", "16:00"]);
    expect(defaultSettings.articleTime).toBe("18:00");
  });
  it("rejects invalid times, unknown timezones, and overlapping slots", () => {
    expect(
      settingsSchema.safeParse({ ...defaultSettings, articleTime: "25:00" })
        .success,
    ).toBe(false);
    expect(
      settingsSchema.safeParse({ ...defaultSettings, timeZone: "invalid" })
        .success,
    ).toBe(false);
    expect(
      settingsSchema.safeParse({
        ...defaultSettings,
        creativeTimes: ["10:00", "18:00"],
      }).success,
    ).toBe(false);
  });
  it("fills both daily slots before advancing to tomorrow", () => {
    const now = new Date("2026-09-06T03:00:00Z");
    const slots: string[] = [];
    for (let i = 0; i < 4; i++)
      slots.push(
        nextDailySlot(
          now,
          slots,
          "Asia/Kolkata",
          ["10:00", "16:00"],
          slots,
        ).toISOString(),
      );
    expect(slots).toEqual([
      "2026-09-06T04:30:00.000Z",
      "2026-09-06T10:30:00.000Z",
      "2026-09-07T04:30:00.000Z",
      "2026-09-07T10:30:00.000Z",
    ]);
  });
  it("does not exceed two posts on a day when the admin changes times", () => {
    const booked = ["2026-09-06T04:30:00Z", "2026-09-06T10:30:00Z"];
    expect(
      nextDailySlot(
        new Date("2026-09-06T03:00:00Z"),
        booked,
        "Asia/Kolkata",
        ["11:00", "17:00"],
        booked,
      ).toISOString(),
    ).toBe("2026-09-07T05:30:00.000Z");
  });
  it("does not add a second article after changing the article time", () => {
    const booked = ["2026-09-06T12:30:00Z"];
    expect(
      nextArticleSlot(
        new Date("2026-09-06T13:00:00Z"),
        booked,
        "Asia/Kolkata",
        "20:00",
        booked,
      ).toISOString(),
    ).toBe("2026-09-07T14:30:00.000Z");
  });
  it("skips a nonexistent daylight-saving slot", () => {
    expect(
      nextDailySlot(new Date("2026-03-08T05:00:00Z"), [], "America/New_York", [
        "02:30",
      ]).toISOString(),
    ).toBe("2026-03-09T06:30:00.000Z");
  });
  it("requires two nonempty paragraphs", () => {
    expect(twoParagraphs("First paragraph.\n\nSecond paragraph.")).toBe(true);
    expect(twoParagraphs("One paragraph")).toBe(false);
    expect(twoParagraphs("One\n\nTwo\n\nThree")).toBe(false);
  });
  it("accepts daily queue booking and optional comment as API inputs", () => {
    expect(
      postInput.safeParse({
        submissionKey: "11111111-1111-4111-8111-111111111111",
        text: "One\n\nTwo",
        action: "daily",
        kind: "creative",
        firstComment: "Useful extra context",
        destinations: [
          {
            accountId: "22222222-2222-4222-8222-222222222222",
            text: "One\n\nTwo",
          },
        ],
      }).success,
    ).toBe(true);
  });
});
