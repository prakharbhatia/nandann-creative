import { z } from "zod";
import twitter from "twitter-text";
export const articleInput = z
  .object({
    id: z.string().trim().min(1).max(200).optional(),
    url: z.string().url().max(2000),
    title: z.string().trim().min(1).max(300),
    excerpt: z.string().trim().max(5000).default(""),
  })
  .strict();
export function canonicalArticleUrl(value: string, allowedHosts: string[]) {
  const url = new URL(value);
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.port ||
    !allowedHosts.includes(url.hostname.toLowerCase())
  )
    throw new Error(
      "Article URL must use HTTPS on an allowed website hostname.",
    );
  url.hash = "";
  // Tracking parameters don't turn the same article into a new queue entry.
  for (const key of [...url.searchParams.keys()])
    if (key.startsWith("utm_") || ["fbclid", "gclid"].includes(key))
      url.searchParams.delete(key);
  url.searchParams.sort();
  if (url.pathname.length > 1) url.pathname = url.pathname.replace(/\/+$/, "");
  return url.toString();
}
export function articleCopy(
  title: string,
  excerpt: string,
  url: string,
  platform: string,
) {
  const body = [title, excerpt].filter(Boolean).join("\n\n");
  const suffix = "\n\n" + url;
  if (platform !== "x") {
    const allowance = 3000 - suffix.length;
    const content =
      body.length <= allowance
        ? body
        : body
            .slice(0, allowance - 1)
            .replace(/[\uD800-\uDBFF]$/, "")
            .trimEnd() + "…";
    return content + suffix;
  }
  if (twitter.parseTweet(body + suffix).valid) return body + suffix;
  const chars = Array.from(body);
  let low = 0,
    high = chars.length;
  while (low < high) {
    const mid = Math.ceil((low + high) / 2);
    if (
      twitter.parseTweet(chars.slice(0, mid).join("").trimEnd() + "…" + suffix)
        .valid
    )
      low = mid;
    else high = mid - 1;
  }
  const text = chars.slice(0, low).join("").trimEnd() + "…" + suffix;
  if (!twitter.parseTweet(text).valid)
    throw new Error("Article URL cannot fit into an X post.");
  return text;
}
