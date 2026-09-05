import { configured, db, preview } from "@/lib/db";
import { requireUser, failure, HttpError } from "@/lib/auth";
import { mediaUrl } from "@/lib/storage";
import { readSettings } from "@/lib/settings-store";
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    if (preview())
      return Response.json({ demo: true, config: {}, accounts: [], posts: [] });
    if (!configured())
      throw new HttpError(
        503,
        "Workspace setup is incomplete. Add the required environment variables before using this deployment.",
      );
    await requireUser();
    const sql = db();
    const [accounts, posts, deliveries, comments, settings] = await Promise.all(
      [
        sql`select id,platform,name,handle,connected,comment_capable as "commentCapable",expires_at as "expiresAt" from accounts order by created_at`,
        sql`select id,kind,text,image_path as "imagePath",scheduled_at as "scheduledAt",created_at as "createdAt" from posts order by created_at desc limit 200`,
        sql`select d.id,d.post_id,d.account_id as "accountId",a.name as "accountName",a.platform,d.text,d.first_comment as "firstComment",d.status,d.error,d.url,d.attempts from deliveries d join accounts a on a.id=d.account_id where d.post_id in (select id from posts order by created_at desc limit 200)`,
        sql`select c.id,c.delivery_id,c.text,c.status,c.error from post_comments c join deliveries d on d.id=c.delivery_id where d.post_id in (select id from posts order by created_at desc limit 200)`,
        readSettings(),
      ],
    );
    return Response.json(
      {
        demo: false,
        accounts,
        settings,
        posts: await Promise.all(
          posts.map(async (p) => ({
            ...p,
            image: p.imagePath
              ? await mediaUrl(p.imagePath).catch(() => undefined)
              : undefined,
            deliveries: deliveries
              .filter((d) => d.post_id === p.id)
              .map((d) => ({
                ...d,
                comment: comments.find((c) => c.delivery_id === d.id),
              })),
          })),
        ),
        config: {
          website: !!process.env.ARTICLE_FEED_URL,
          database: true,
          storage: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
          linkedin: !!(
            process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_SECRET
          ),
          x: !!(process.env.X_CLIENT_ID && process.env.X_CLIENT_SECRET),
          cron: !!process.env.CRON_SECRET,
        },
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (e) {
    return failure(e);
  }
}
