import { requireUser, sameOrigin, failure, HttpError } from "@/lib/outpost/auth";
import { storage, mediaUrl } from "@/lib/outpost/storage";
import { db } from "@/lib/outpost/db";
export async function POST(req: Request) {
  try {
    sameOrigin(req);
    await requireUser();
    const form = await req.formData();
    const file = form.get("file");
    if (
      !(file instanceof File) ||
      file.size > 3 * 1024 * 1024 ||
      !["image/jpeg", "image/png"].includes(file.type)
    )
      throw new HttpError(400, "Choose a JPG or PNG under 3 MB.");
    const bytes = Buffer.from(await file.arrayBuffer());
    const valid =
      file.type === "image/png"
        ? bytes
            .subarray(0, 8)
            .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
        : bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
    if (!valid) throw new HttpError(400, "The file is not a valid JPG or PNG.");
    const path = `${crypto.randomUUID()}.${file.type === "image/png" ? "png" : "jpg"}`;
    const { error } = await storage().upload(path, bytes, {
      contentType: file.type,
      upsert: false,
    });
    if (error) throw error;
    const sql = db();
    await sql`insert into media(path,mime) values(${path},${file.type})`;
    return Response.json({ path, url: await mediaUrl(path) });
  } catch (e) {
    return failure(e);
  }
}
