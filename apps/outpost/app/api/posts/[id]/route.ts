import { requireUser, sameOrigin, failure, HttpError } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    sameOrigin(req);
    await requireUser();
    const { id } = await params;
    if (!z.string().uuid().safeParse(id).success)
      throw new HttpError(400, "Invalid post.");
    const sql = db();
    await sql.begin(async (tx) => {
      await tx`select id from posts where id=${id} for update`;
      const deliveries =
        await tx`select status from deliveries where post_id=${id} for update`;
      if (deliveries.some((d) => ["publishing", "unknown"].includes(d.status)))
        throw new HttpError(
          409,
          "A delivery is publishing or needs review. Check its status first.",
        );
      const comments =
        await tx`select c.status from post_comments c join deliveries d on d.id=c.delivery_id where d.post_id=${id} for update of c`;
      if (comments.some((c) => ["publishing", "unknown"].includes(c.status)))
        throw new HttpError(
          409,
          "A comment is publishing or needs review. Resolve it before removing the post.",
        );
      await tx`delete from posts where id=${id}`;
    });
    return Response.json({ ok: true });
  } catch (e) {
    return failure(e);
  }
}
