import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
export async function authClient() {
  const jar = await cookies();
  return createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => jar.getAll(),
        setAll: (values) => {
          values.forEach(({ name, value, options }) =>
            jar.set(name, value, {
              ...options,
              httpOnly: true,
              sameSite: "lax",
              secure: process.env.NODE_ENV === "production",
            }),
          );
        },
      },
    },
  );
}
export function allowed(email?: string) {
  return (
    !!email &&
    (process.env.ALLOWED_EMAILS || "")
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .includes(email.toLowerCase())
  );
}
export async function requireUser() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY)
    throw new HttpError(503, "Workspace setup is incomplete");
  const supabase = await authClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user || !allowed(data.user.email))
    throw new HttpError(401, "Sign in required");
  return data.user;
}
export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (
    !origin ||
    origin !== new URL(process.env.APP_URL || "http://localhost:3000").origin
  )
    throw new HttpError(403, "Request origin is not allowed");
}
export function failure(error: unknown) {
  if (error instanceof HttpError)
    return Response.json({ error: error.message }, { status: error.status });
  console.error(
    "Request failed:",
    error instanceof Error ? error.name : "unknown",
  );
  return Response.json(
    {
      error:
        "The request could not be completed. Check workspace configuration and try again.",
    },
    { status: 500 },
  );
}
