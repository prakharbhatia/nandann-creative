import { requireUser, sameOrigin, failure, HttpError } from "@/lib/outpost/auth";
import { readSettings } from "@/lib/outpost/settings-store";
import { settingsSchema } from "@/lib/outpost/settings";
import { db } from "@/lib/outpost/db";
export async function GET() {
  try {
    await requireUser();
    return Response.json(await readSettings(), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (e) {
    return failure(e);
  }
}
export async function PUT(req: Request) {
  try {
    sameOrigin(req);
    await requireUser();
    const input = settingsSchema.safeParse(await req.json());
    if (!input.success) throw new HttpError(400, input.error.issues[0].message);
    const sql = db();
    await sql.begin(async (tx) => {
      await tx`select pg_advisory_xact_lock(187964025,1800)`;
      await tx`insert into publishing_settings(id,value) values(1,${tx.json(input.data)}) on conflict(id) do update set value=excluded.value,updated_at=now()`;
    });
    return Response.json(input.data);
  } catch (e) {
    return failure(e);
  }
}
