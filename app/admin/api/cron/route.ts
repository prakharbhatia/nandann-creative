import { timingSafeEqual } from "node:crypto";
import { runQueue } from "@/lib/outpost/queue";
import { runCommentQueue } from "@/lib/outpost/comment-queue";
import { syncArticleFeed } from "@/lib/outpost/article-feed";
export const maxDuration = 240;
export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  const provided = Buffer.from(req.headers.get("authorization") || "");
  const expected = Buffer.from(`Bearer ${secret}`);
  if (
    !secret ||
    provided.length !== expected.length ||
    !timingSafeEqual(provided, expected)
  )
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const started = Date.now();
    let sync: unknown;
    let syncFailed = false;
    try {
      sync = await syncArticleFeed();
    } catch (e) {
      syncFailed = true;
      sync = { error: (e as Error).message };
    }
    const queue = await runQueue(Math.max(0, 140000 - (Date.now() - started)));
    const comments = await runCommentQueue(
      Math.max(0, 200000 - (Date.now() - started)),
    );
    return Response.json(
      { ...queue, ...comments, sync },
      { status: syncFailed ? 502 : 200 },
    );
  } catch {
    return Response.json(
      {
        error:
          "Queue processing failed. Check the database and deployment logs.",
      },
      { status: 500 },
    );
  }
}
