import { requireUser } from "@/lib/outpost/auth";
import { seal, unseal } from "@/lib/outpost/crypto";
import { cookies } from "next/headers";
import {
  tokenExchange,
  providerFetch,
  linkedinHeaders,
  ProviderError,
} from "@/lib/outpost/providers";
import { db } from "@/lib/outpost/db";
export async function GET(
  req: Request,
  { params }: { params: Promise<{ platform: string }> },
) {
  const home = new URL("/admin", process.env.APP_URL || "http://localhost:3000");
  try {
    const user = await requireUser();
    const { platform } = await params;
    const query = new URL(req.url).searchParams;
    const jar = await cookies();
    const saved = jar.get("outpost_oauth")?.value;
    jar.set("outpost_oauth", "", { maxAge: 0, path: "/admin/api/oauth" });
    if (!saved) throw new Error("Connection expired. Please try again.");
    const context = JSON.parse(unseal(saved));
    if (
      context.platform !== platform ||
      context.userId !== user.id ||
      context.state !== query.get("state") ||
      context.expires < Date.now()
    )
      throw new Error("Connection expired. Please try again.");
    if (query.has("error"))
      throw new Error(
        "Authorization was declined or the requested permissions are unavailable.",
      );
    const code = query.get("code");
    if (!code) throw new Error("No authorization code was returned.");
    const tokenParams = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: new URL(`/admin/api/oauth/${platform}/callback`, home).toString(),
    });
    if (platform === "x") tokenParams.set("code_verifier", context.verifier);
    const token = await tokenExchange(platform, tokenParams);
    if (!token.access_token) throw new Error("No access token was returned.");
    const identities: { id: string; name: string; handle: string }[] = [];
    if (platform === "x") {
      const r = await providerFetch("https://api.x.com/2/users/me", {
        headers: { Authorization: `Bearer ${token.access_token}` },
      });
      const { data } = await r.json();
      identities.push({
        id: data.id,
        name: data.name,
        handle: "@" + data.username,
      });
    } else if (platform === "linkedin") {
      const r = await providerFetch("https://api.linkedin.com/v2/userinfo", {
        headers: { Authorization: `Bearer ${token.access_token}` },
      });
      const data = await r.json();
      if (!data.sub) throw new Error("LinkedIn profile ID was not returned.");
      identities.push({
        id: `urn:li:person:${data.sub}`,
        name: data.name || "LinkedIn profile",
        handle: "Personal profile",
      });
    } else {
      for (let start = 0; start < 1000; start += 100) {
        const r = await providerFetch(
          `https://api.linkedin.com/rest/organizationAcls?q=roleAssignee&state=APPROVED&start=${start}&count=100`,
          { headers: linkedinHeaders(token.access_token) },
        );
        const data = await r.json();
        for (const item of data.elements || []) {
          if (!["ADMINISTRATOR", "CONTENT_ADMIN"].includes(item.role)) continue;
          const id = item.organization;
          if (!id || identities.some((i) => i.id === id)) continue;
          const orgId = String(id).split(":").pop();
          const org = await (
            await providerFetch(
              `https://api.linkedin.com/rest/organizations/${orgId}`,
              { headers: linkedinHeaders(token.access_token) },
            )
          ).json();
          identities.push({
            id,
            name: org.localizedName || "Company page",
            handle: org.vanityName || "Company page",
          });
        }
        if ((data.elements || []).length < 100) break;
      }
      if (!identities.length)
        throw new Error(
          "No eligible company pages found. Check your LinkedIn admin role and app permissions.",
        );
    }
    const commentScope =
      platform === "linkedin-page"
        ? "w_organization_social_feed"
        : "w_member_social_feed";
    const commentCapable =
      platform === "x" ||
      (context.comments &&
        (!token.scope || token.scope.split(/[, ]+/).includes(commentScope)));
    const sql = db();
    await sql.begin(async (tx) => {
      for (const i of identities)
        await tx`insert into accounts(platform,provider_id,name,handle,token,refresh_token,expires_at,comment_capable) values(${platform},${i.id},${i.name},${i.handle},${seal(token.access_token)},${token.refresh_token ? seal(token.refresh_token) : null},${new Date(Date.now() + (token.expires_in || 3600) * 1000)},${!!commentCapable}) on conflict(platform,provider_id) do update set name=excluded.name,handle=excluded.handle,token=excluded.token,refresh_token=excluded.refresh_token,expires_at=excluded.expires_at,connected=true,comment_capable=excluded.comment_capable`;
    });
    home.searchParams.set("connected", platform);
  } catch (e) {
    home.searchParams.set(
      "error",
      e instanceof ProviderError
        ? e.message
        : e instanceof Error &&
            [
              "Connection expired. Please try again.",
              "Authorization was declined or the requested permissions are unavailable.",
              "No eligible company pages found. Check your LinkedIn admin role and app permissions.",
            ].includes(e.message)
          ? e.message
          : "Could not connect the account. Check your callback URL, app permissions, and workspace setup.",
    );
  }
  return Response.redirect(home);
}
