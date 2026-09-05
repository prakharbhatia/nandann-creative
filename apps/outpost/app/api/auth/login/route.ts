import {
  allowed,
  authClient,
  sameOrigin,
  failure,
  HttpError,
} from "@/lib/auth";
export async function POST(req: Request) {
  try {
    sameOrigin(req);
    const { email, password } = await req.json();
    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !allowed(email)
    )
      throw new HttpError(401, "Email or password is incorrect.");
    const client = await authClient();
    const { error } = await client.auth.signInWithPassword({ email, password });
    if (error) throw new HttpError(401, "Email or password is incorrect.");
    return Response.json({ ok: true });
  } catch (e) {
    return failure(e);
  }
}
