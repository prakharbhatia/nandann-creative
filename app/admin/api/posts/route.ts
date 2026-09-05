import { requireUser, sameOrigin, failure, HttpError } from "@/lib/outpost/auth";
import { db } from "@/lib/outpost/db";
import {
  postInput,
  validateText,
  scheduleTime,
  twoParagraphs,
} from "@/lib/outpost/validation";
import { defaultSettings, settingsSchema } from "@/lib/outpost/settings";
import { nextDailySlot } from "@/lib/outpost/article-schedule";
export async function POST(req: Request) {
  try {
    sameOrigin(req);
    await requireUser();
    const parsed = postInput.safeParse(await req.json());
    if (!parsed.success)
      throw new HttpError(400, "Check the post text and selected accounts.");
    const p = parsed.data;
    let at: Date | null;
    try {
      at = p.action === "daily" ? null : scheduleTime(p.action, p.scheduledAt);
    } catch (e) {
      throw new HttpError(400, (e as Error).message);
    }
    const sql = db();
    const result = await sql.begin(async (tx) => {
      await tx`select pg_advisory_xact_lock(187964025,1800)`;
      if (!p.id) {
        const [existing] =
          await tx`select id from posts where submission_key=${p.submissionKey}`;
        if (existing) return existing.id;
      }
      if (
        (p.kind === "creative" && p.action !== "draft") ||
        p.action === "daily"
      ) {
        if (
          !p.imagePath ||
          !twoParagraphs(p.text) ||
          p.destinations.some((d) => !twoParagraphs(d.text))
        )
          throw new HttpError(
            400,
            "Image posts need one image and two paragraphs for every selected channel.",
          );
      }
      if (p.action === "daily") {
        const [saved] =
          await tx`select value from publishing_settings where id=1`;
        const settings = settingsSchema.parse(saved?.value || defaultSettings);
        if (!settings.creativeEnabled)
          throw new HttpError(409, "The daily image queue is paused.");
        if (
          !p.imagePath ||
          !twoParagraphs(p.text) ||
          p.destinations.some((d) => !twoParagraphs(d.text))
        )
          throw new HttpError(
            400,
            "Daily image posts need one image and two paragraphs for every selected channel.",
          );
        const occupied =
          await tx`select scheduled_at from posts where scheduled_at>now() union select scheduled_at from article_queue where scheduled_at>now()`;
        const dailyBookings =
          await tx`select scheduled_at from posts where kind='creative' and scheduled_at>now()-interval '2 days'`;
        at = nextDailySlot(
          new Date(),
          occupied.map((r) => r.scheduled_at),
          settings.timeZone,
          settings.creativeTimes,
          dailyBookings.map((r) => r.scheduled_at),
        );
      }
      if (
        p.imagePath &&
        !(await tx`select path from media where path=${p.imagePath}`).length
      )
        throw new HttpError(
          400,
          "Attachment not found. Upload the image again.",
        );
      const ids = p.destinations.map((d) => d.accountId);
      if (new Set(ids).size !== ids.length)
        throw new HttpError(400, "Select each account only once.");
      const accounts =
        await tx`select id,platform,connected,comment_capable from accounts where id in ${tx(ids)}`;
      for (const d of p.destinations) {
        const a = accounts.find((a) => a.id === d.accountId);
        if (!a || !a.connected)
          throw new HttpError(400, "Reconnect all selected accounts first.");
        if (p.firstComment && p.action !== "draft") {
          if (!a.comment_capable)
            throw new HttpError(
              400,
              "Enable comment access for all selected channels, or remove the first comment.",
            );
          const commentError = validateText(p.firstComment, a.platform);
          if (commentError)
            throw new HttpError(400, "First comment: " + commentError);
        }
        const error = validateText(d.text, a.platform);
        if (error && p.action !== "draft") throw new HttpError(400, error);
      }
      let id = p.id;
      if (id) {
        const existing =
          await tx`select id from posts where id=${id} for update`;
        if (!existing.length) throw new HttpError(404, "Draft not found.");
        const ds =
          await tx`select status from deliveries where post_id=${id} for update`;
        if (ds.some((d) => d.status !== "draft"))
          throw new HttpError(409, "Only unpublished drafts can be edited.");
        await tx`update posts set text=${p.text},image_path=${p.imagePath || null},scheduled_at=${at},kind=${p.action === "daily" ? "creative" : p.kind} where id=${id}`;
        await tx`delete from deliveries where post_id=${id}`;
      } else {
        const rows =
          await tx`insert into posts(submission_key,text,image_path,scheduled_at,kind) values(${p.submissionKey},${p.text},${p.imagePath || null},${at},${p.action === "daily" ? "creative" : p.kind}) on conflict(submission_key) do nothing returning id`;
        if (!rows.length) {
          const [existing] =
            await tx`select id from posts where submission_key=${p.submissionKey}`;
          return existing.id;
        }
        id = rows[0].id;
      }
      for (const d of p.destinations)
        await tx`insert into deliveries(post_id,account_id,text,status,next_attempt_at,first_comment) values(${id!},${d.accountId},${d.text},${p.action === "draft" ? "draft" : "scheduled"},${at},${p.firstComment || null})`;
      return id;
    });
    return Response.json({ id: result });
  } catch (e) {
    return failure(e);
  }
}
