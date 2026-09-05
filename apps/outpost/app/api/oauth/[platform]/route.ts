import { requireUser, failure, HttpError } from "@/lib/auth";
import { seal } from "@/lib/crypto";
import { randomBytes, createHash } from "node:crypto";
import { cookies } from "next/headers";
export async function GET(
  req: Request,
  { params }: { params: Promise<{ platform: string }> },
) {
  try {
    const user = await requireUser();
    const { platform } = await params;
    if (!["linkedin", "linkedin-page", "x"].includes(platform))
      throw new HttpError(404, "Unknown platform.");
    const comments = new URL(req.url).searchParams.get("comments") === "1";
    const clientId =
      platform === "x"
        ? process.env.X_CLIENT_ID
        : process.env.LINKEDIN_CLIENT_ID;
    if (!clientId || !process.env.APP_URL)
      throw new HttpError(503, "Configure the social app credentials first.");
    const state = randomBytes(24).toString("base64url");
    const verifier = randomBytes(32).toString("base64url");
    const callback = new URL(
      `/api/oauth/${platform}/callback`,
      process.env.APP_URL,
    ).toString();
    const jar = await cookies();
    jar.set(
      "outpost_oauth",
      seal(
        JSON.stringify({
          state,
          verifier,
          platform,
          comments,
          userId: user.id,
          expires: Date.now() + 600000,
        }),
      ),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 600,
        path: "/api/oauth",
      },
    );
    const url = new URL(
      platform === "x"
        ? "https://x.com/i/oauth2/authorize"
        : "https://www.linkedin.com/oauth/v2/authorization",
    );
    url.searchParams.set("client_id", clientId);
    url.searchParams.set("redirect_uri", callback);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("state", state);
    url.searchParams.set(
      "scope",
      platform === "x"
        ? "tweet.read tweet.write users.read offline.access media.write"
        : platform === "linkedin-page"
          ? "openid profile w_organization_social rw_organization_admin"
          : "openid profile w_member_social",
    );
    if (comments && platform !== "x")
      url.searchParams.set(
        "scope",
        url.searchParams.get("scope") +
          " " +
          (platform === "linkedin-page"
            ? "w_organization_social_feed"
            : "w_member_social_feed"),
      );
    if (platform === "x") {
      url.searchParams.set(
        "code_challenge",
        createHash("sha256").update(verifier).digest("base64url"),
      );
      url.searchParams.set("code_challenge_method", "S256");
    }
    return Response.redirect(url);
  } catch (e) {
    return failure(e);
  }
}
