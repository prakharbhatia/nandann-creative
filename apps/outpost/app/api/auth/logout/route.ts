import { authClient, sameOrigin, failure } from "@/lib/auth";
export async function POST(req: Request) {
  try {
    sameOrigin(req);
    await (await authClient()).auth.signOut();
    return Response.json({ ok: true });
  } catch (e) {
    return failure(e);
  }
}
