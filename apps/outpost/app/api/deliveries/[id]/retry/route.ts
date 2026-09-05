import { requireUser, sameOrigin, failure, HttpError } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    sameOrigin(req);
    await requireUser();
    const { id } = await params;
    if (!z.string().uuid().safeParse(id).success)
      throw new HttpError(400, "Invalid delivery.");
    const sql = db();
    const rows =
      await sql`update deliveries set status='scheduled',next_attempt_at=now(),error=null,attempts=0 where id=${id} and status='failed' returning id`;
    if (!rows.length)
      throw new HttpError(
        409,
        "Only confirmed failed deliveries can be retried.",
      );
    return Response.json({ ok: true });
  } catch (e) {
    return failure(e);
  }
}
