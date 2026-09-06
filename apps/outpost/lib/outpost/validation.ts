import { z } from "zod";
import twitter from "twitter-text";
export const postInput = z.object({
  id: z.string().uuid().nullable().optional(),
  submissionKey: z.string().uuid(),
  text: z.string().trim().min(1).max(10000),
  imagePath: z.string().max(200).nullable().optional(),
  scheduledAt: z.string().datetime().nullable().optional(),
  action: z.enum(["draft", "schedule", "publish", "daily"]),
  kind: z.enum(["manual", "creative"]).default("manual"),
  firstComment: z.string().trim().max(1250).default(""),
  destinations: z
    .array(
      z.object({
        accountId: z.string().uuid(),
        text: z.string().trim().min(1).max(10000),
      }),
    )
    .min(1)
    .max(20),
});
export function validateText(text: string, platform: string) {
  if (!text.trim()) return "Post text cannot be empty.";
  if (platform === "x" && !twitter.parseTweet(text).valid)
    return "X posts must fit the standard 280-character limit (links and emoji have weighted lengths).";
  if (platform !== "x" && text.length > 3000)
    return "LinkedIn posts must be 3,000 characters or fewer.";
  return null;
}
export function scheduleTime(
  action: string,
  date?: string | null,
  now = Date.now(),
) {
  if (action === "draft") return null;
  if (action === "publish") return new Date(now);
  const time = date ? new Date(date).getTime() : NaN;
  if (!Number.isFinite(time) || time <= now)
    throw new Error("Choose a future date and time.");
  return new Date(time);
}

export function twoParagraphs(text: string) {
  return (
    text
      .trim()
      .split(/\n\s*\n/)
      .filter((p) => p.trim()).length === 2
  );
}
