import { validApiKey } from "@/lib/api-key";
import { articleInput } from "@/lib/article-input";
import { enqueueArticle } from "@/lib/article-queue";
import { failure, HttpError } from "@/lib/auth";
export const maxDuration = 60;
export async function POST(req: Request) {
  try {
    if (
      !validApiKey(
        req.headers.get("authorization"),
        process.env.WEBSITE_API_KEY,
      )
    )
      throw new HttpError(401, "Unauthorized");
    const body = await req.text();
    if (body.length > 16000)
      throw new HttpError(413, "Article payload is too large.");
    let value: unknown;
    try {
      value = JSON.parse(body);
    } catch {
      throw new HttpError(
        400,
        "Send a JSON object with title, url, and optional id and excerpt.",
      );
    }
    const parsed = articleInput.safeParse(value);
    if (!parsed.success)
      throw new HttpError(
        400,
        "Send a title (up to 300 characters), HTTPS article URL, optional stable id, and optional excerpt (up to 5,000 characters).",
      );
    const result = await enqueueArticle(parsed.data);
    return Response.json(result, {
      status: result.duplicate ? 200 : 201,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (e) {
    return failure(e);
  }
}
