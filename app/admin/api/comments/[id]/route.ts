import { requireUser, sameOrigin, failure, HttpError } from "@/lib/outpost/auth";
import { db } from "@/lib/outpost/db";
import { z } from "zod";
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    sameOrigin(req);
    await requireUser();
    const { id } = await params;
    const parsed = z
      .object({
        action: z.enum(["retry", "confirm-published", "confirm-failed"]),
      })
      .safeParse(await req.json());
    if (!z.string().uuid().safeParse(id).success || !parsed.success)
      throw new HttpError(400, "Invalid comment action.");
    const action = parsed.data.action;
    const sql = db();
    let rows;
    if (action === "retry")
      rows =
        await sql`update post_comments set status='scheduled',attempts=0,next_attempt_at=now(),error=null where id=${id} and status='failed' returning id`;
    else
      rows =
        await sql`update post_comments set status=${action === "confirm-published" ? "published" : "failed"},error=${action === "confirm-failed" ? "A team member confirmed the comment was not published." : null},published_at=${action === "confirm-published" ? new Date() : null} where id=${id} and status='unknown' returning id`;
    if (!rows.length)
      throw new HttpError(
        409,
        "The comment state has changed. Refresh and try again.",
      );
    return Response.json({ ok: true });
  } catch (e) {
    return failure(e);
  }
}
