import { db } from "./db";
import { seal, unseal } from "./crypto";
import { mediaData } from "./storage";
export type TokenResponse = {
  scope?: string;
  access_token: string;
  refresh_token?: string;
  expires_in: number;
};
export class ProviderError extends Error {
  constructor(
    message: string,
    public status = 0,
    public uncertain = false,
    public retryAfter = 60,
  ) {
    super(message);
  }
}
export const linkedinHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  "LinkedIn-Version": process.env.LINKEDIN_VERSION || "202608",
  "X-Restli-Protocol-Version": "2.0.0",
  "Content-Type": "application/json",
});
export async function providerFetch(
  url: string,
  init: RequestInit = {},
  publishing = false,
) {
  let response: Response;
  try {
    response = await fetch(url, {
      ...init,
      signal: AbortSignal.timeout(20000),
      cache: "no-store",
    });
  } catch {
    throw new ProviderError(
      publishing
        ? "The platform did not confirm the result. Check the account before trying again."
        : "The platform could not be reached.",
      0,
      publishing,
    );
  }
  if (!response.ok) {
    const retry = response.headers.get("retry-after");
    const reset = response.headers.get("x-rate-limit-reset");
    const seconds = retry
      ? Number(retry) || Math.ceil((Date.parse(retry) - Date.now()) / 1000)
      : reset
        ? Math.ceil(Number(reset) - Date.now() / 1000)
        : 60;
    throw new ProviderError(
      response.status === 401
        ? "Account authorization expired. Reconnect this channel."
        : response.status === 403
          ? "The platform refused access. Check app permissions and account roles."
          : response.status === 402
            ? "Add credits to your X developer account."
            : response.status === 429
              ? "Platform rate limit reached. The queue will retry later."
              : `Platform request failed (${response.status}). Check the post and account permissions.`,
      response.status,
      publishing && response.status >= 500,
      Number.isFinite(seconds) ? Math.max(60, seconds) : 60,
    );
  }
  return response;
}
export async function tokenExchange(
  platform: string,
  params: URLSearchParams,
): Promise<TokenResponse> {
  if (platform === "x") {
    params.set("client_id", process.env.X_CLIENT_ID!);
    const r = await providerFetch("https://api.x.com/2/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.X_CLIENT_ID}:${process.env.X_CLIENT_SECRET}`,
          ).toString("base64"),
      },
      body: params,
    });
    return r.json();
  }
  params.set("client_id", process.env.LINKEDIN_CLIENT_ID!);
  params.set("client_secret", process.env.LINKEDIN_CLIENT_SECRET!);
  const r = await providerFetch(
    "https://www.linkedin.com/oauth/v2/accessToken",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    },
  );
  return r.json();
}
export async function accountToken(id: string) {
  const sql = db();
  return sql.begin(async (tx) => {
    const [a] = await tx`select * from accounts where id=${id} for update`;
    if (!a || !a.connected)
      throw new ProviderError("Reconnect this channel.", 401);
    if (a.expires_at && new Date(a.expires_at).getTime() < Date.now() + 60000) {
      if (!a.refresh_token)
        throw new ProviderError(
          "Account authorization expired. Reconnect this channel.",
          401,
        );
      const token = await tokenExchange(
        a.platform,
        new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: unseal(a.refresh_token),
        }),
      );
      await tx`update accounts set token=${seal(token.access_token)},refresh_token=${token.refresh_token ? seal(token.refresh_token) : a.refresh_token},expires_at=${new Date(Date.now() + token.expires_in * 1000)} where id=${id}`;
      return {
        ...a,
        platform: String(a.platform),
        provider_id: String(a.provider_id),
        accessToken: token.access_token,
      };
    }
    return {
      ...a,
      platform: String(a.platform),
      provider_id: String(a.provider_id),
      accessToken: unseal(a.token),
    };
  });
}
export async function publish(
  accountId: string,
  text: string,
  imagePath?: string | null,
) {
  const a = await accountToken(accountId);
  const token = a.accessToken;
  let mediaId: string | undefined;
  if (imagePath) {
    const { bytes, mime } = await mediaData(imagePath);
    if (a.platform === "x") {
      const r = await providerFetch("https://api.x.com/2/media/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          media: bytes.toString("base64"),
          media_category: "tweet_image",
          media_type: mime,
        }),
      });
      const data = await r.json();
      mediaId = data.data?.id;
      if (!mediaId)
        throw new ProviderError("Image upload did not return a media ID.");
      if (
        data.data.processing_info &&
        data.data.processing_info.state !== "succeeded"
      )
        throw new ProviderError(
          "The image is still processing. Try this post again shortly.",
        );
    } else {
      const r = await providerFetch(
        "https://api.linkedin.com/rest/images?action=initializeUpload",
        {
          method: "POST",
          headers: linkedinHeaders(token),
          body: JSON.stringify({
            initializeUploadRequest: { owner: a.provider_id },
          }),
        },
      );
      const data = await r.json();
      mediaId = data.value?.image;
      const uploadUrl = new URL(data.value.uploadUrl);
      if (
        uploadUrl.protocol !== "https:" ||
        !(
          uploadUrl.hostname === "linkedin.com" ||
          uploadUrl.hostname.endsWith(".linkedin.com")
        )
      )
        throw new ProviderError("Unexpected LinkedIn upload destination.");
      await providerFetch(uploadUrl.toString(), {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": mime },
        body: new Uint8Array(bytes),
      }); // Publishing will return a safe failure if the image is still processing.
    }
  }
  if (a.platform === "x") {
    const response = await providerFetch(
      "https://api.x.com/2/tweets",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          ...(mediaId ? { media: { media_ids: [mediaId] } } : {}),
        }),
      },
      true,
    );
    let data;
    try {
      data = await response.json();
    } catch {
      throw new ProviderError(
        "X accepted the request but returned an unreadable response. Check your profile.",
        0,
        true,
      );
    }
    if (!data.data?.id)
      throw new ProviderError(
        "X did not return a post ID. Check your profile before retrying.",
        0,
        true,
      );
    return {
      id: data.data.id,
      url: `https://x.com/i/web/status/${data.data.id}`,
    };
  }
  const response = await providerFetch(
    "https://api.linkedin.com/rest/posts",
    {
      method: "POST",
      headers: linkedinHeaders(token),
      body: JSON.stringify({
        author: a.provider_id,
        commentary: text,
        visibility: "PUBLIC",
        distribution: {
          feedDistribution: "MAIN_FEED",
          targetEntities: [],
          thirdPartyDistributionChannels: [],
        },
        lifecycleState: "PUBLISHED",
        isReshareDisabledByAuthor: false,
        ...(mediaId ? { content: { media: { id: mediaId } } } : {}),
      }),
    },
    true,
  );
  const id = response.headers.get("x-restli-id");
  if (!id)
    throw new ProviderError(
      "LinkedIn accepted the request without a post ID. Check your account before retrying.",
      0,
      true,
    );
  return {
    id,
    url: `https://www.linkedin.com/feed/update/${encodeURIComponent(id)}/`,
  };
}

export async function publishComment(
  accountId: string,
  parentId: string,
  text: string,
) {
  const sql = db();
  const [permission] =
    await sql`select comment_capable from accounts where id=${accountId}`;
  if (!permission?.comment_capable)
    throw new ProviderError("Reconnect this channel with comment access.", 403);
  const a = await accountToken(accountId);
  if (a.platform === "x") {
    const response = await providerFetch(
      "https://api.x.com/2/tweets",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${a.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          reply: { in_reply_to_tweet_id: parentId },
        }),
      },
      true,
    );
    try {
      const data = await response.json();
      if (!data.data?.id) throw new Error();
      return String(data.data.id);
    } catch {
      throw new ProviderError(
        "The comment result is unclear. Check the post before retrying.",
        0,
        true,
      );
    }
  }
  const response = await providerFetch(
    `https://api.linkedin.com/rest/socialActions/${encodeURIComponent(parentId)}/comments`,
    {
      method: "POST",
      headers: linkedinHeaders(a.accessToken),
      body: JSON.stringify({
        actor: a.provider_id,
        object: parentId,
        message: { text },
      }),
    },
    true,
  );
  const id = response.headers.get("x-restli-id");
  if (id) return id;
  try {
    const data = await response.json();
    if (!data.id) throw new Error();
    return String(data.id);
  } catch {
    throw new ProviderError(
      "The comment result is unclear. Check the post before retrying.",
      0,
      true,
    );
  }
}
