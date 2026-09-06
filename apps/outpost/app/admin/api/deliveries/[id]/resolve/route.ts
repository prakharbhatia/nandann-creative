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
    const input = z
      .object({ outcome: z.enum(["published", "failed"]) })
      .safeParse(await req.json());
    if (!z.string().uuid().safeParse(id).success || !input.success)
      throw new HttpError(400, "Invalid resolution.");
    const sql = db();
    const rows =
      await sql`update deliveries set status=${input.data.outcome},error=${input.data.outcome === "failed" ? "A team member confirmed this post was not published." : null},published_at=${input.data.outcome === "published" ? new Date() : null} where id=${id} and status='unknown' returning id`;
    if (!rows.length)
      throw new HttpError(409, "Only uncertain deliveries need resolution.");
    return Response.json({ ok: true });
  } catch (e) {
    return failure(e);
  }
}
