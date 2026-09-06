# Separate Outpost deployment

Import `prakharbhatia/nandann-creative` into your Vercel Pro team with **Root Directory: apps/outpost**. Keep the website project at the repository root. The website has no publishing cron.

The console URL is `https://YOUR-OUTPOST-PROJECT.vercel.app/admin`. Set Outpost's `APP_URL` to that origin without `/admin` and register OAuth callbacks under `/admin/api/oauth/{platform}/callback`. Configure the environment variables and database before connecting accounts.

To keep `https://www.nandann.com/admin`, set `OUTPOST_ORIGIN=https://YOUR-OUTPOST-PROJECT.vercel.app` on the WEBSITE project and redeploy it. Then set Outpost's `APP_URL=https://www.nandann.com` and update social callback URLs to that domain. The Outpost production origin must be reachable by the website proxy. Without OUTPOST_ORIGIN the website does not serve /admin.

Outpost checks the queue at 18:00, 19:00, 20:00 and 21:00 IST (`30 12,13,14,15 * * *` UTC). Fresh defaults schedule articles at 18:00 and the two image posts at 19:00 and 20:00. Existing settings and bookings remain; adjust earlier times in Automation. Posts, comments and retries wait until a check runs. These are four checks, not a four-post limit.

# Outpost

A private, single-workspace social publishing MVP for LinkedIn profiles, LinkedIn company pages, and X. Next.js on Vercel, Supabase for PostgreSQL, private image storage, and team authentication.

## What works

- Composer, per-account copy, JPG/PNG attachments (one image, up to 3 MB).
- Local preview drafts without credentials; preview data stays in that browser and cannot publish.
- Private email/password login backed by Supabase Auth and a server-side email allowlist.
- LinkedIn profile, LinkedIn company-page, and X OAuth connections. Multiple profiles are supported; all invited users share the same accounts and queue.
- Database drafts, publish-now (queued for the next cron tick), scheduled posts in the browser's timezone, and UTC persistence.
- Separate delivery state for each account, post links, failures, and manual retry.
- PostgreSQL atomic claims prevent concurrent cron invocations from publishing the same delivery.
- Rate limits retry with backoff, respecting Retry-After / X rate reset, up to five attempts. Other confirmed failures require manual retry.
- Ambiguous final-post responses and interrupted jobs become **Needs review**, never automatically retried. Check the social account, use Resolve, and mark the result. This avoids duplicates after a timeout.
- AES-256-GCM encryption for social tokens; OAuth state bound to the current user; X PKCE; private storage; server-only database access.

## Run locally

Requires Node.js 22.12+ and npm.

```sh
npm ci
npm run dev -- --hostname 127.0.0.1
```

Open http://127.0.0.1:3000/admin. With no service configuration, development runs in clearly marked preview mode. Drafts and small preview images (up to 1 MB) persist only in this browser. They are not migrated to production automatically. A production deployment **fails closed** until configuration is complete; it never falls back to demo storage.

## Configure Supabase

1. Create a Supabase project and run `db/outpost/schema.sql` in its SQL editor. This also creates the private `post-media` bucket. Run the schema as the project administrator.
2. In Authentication, disable public sign-ups. Create the initial team users with email and password in the dashboard. Configure Auth rate limits / protections for your organization.
3. Merge the values from `.env.example` into your existing `.env.local` and fill in the Supabase URL, anon/publishable key, service-role key, and database transaction-pooler URL. Use the pooler suitable for Vercel (typically port 6543). Prepared statements are disabled in the PostgreSQL client.
4. Add invited users' email addresses to `ALLOWED_EMAILS`. Each user sees the same workspace; this is not a multi-tenant SaaS.
5. Generate **different** values for `TOKEN_ENCRYPTION_KEY` and `CRON_SECRET` with `openssl rand -base64 32`. Keep the encryption key stable and backed up. Never put secrets in `NEXT_PUBLIC_*` variables or commit `.env.local`.
6. Set `APP_URL` to the exact origin used by the browser. Local default is `http://127.0.0.1:3000`.

The schema enables RLS and grants no browser access to these tables. All operations go through authenticated server endpoints. The service role can access private image storage; signed image URLs expire after an hour. Unused uploads are retained in the MVP; remove orphaned storage objects periodically.

## Connect LinkedIn

Create a LinkedIn developer app and enable:

- **Sign In with LinkedIn using OpenID Connect** (`openid`, `profile`).
- **Share on LinkedIn** (`w_member_social`) for personal posting.
- **Community Management API** approval for company pages (`w_organization_social`, `rw_organization_admin`). These scopes must actually be granted to your app. Personal connection does not request company-page permissions.

Set `LINKEDIN_CLIENT_ID` and `LINKEDIN_CLIENT_SECRET`. Register both exact callback URLs:

```text
https://nandann.com/admin/api/oauth/linkedin/callback
https://nandann.com/admin/api/oauth/linkedin-page/callback
```

Use the corresponding local URLs for local testing. `LINKEDIN_VERSION` defaults to `202608`; update it as LinkedIn versions sunset. In Channels, connect the personal profile and company pages separately. The page connection imports approved pages where the member is an administrator or content administrator (up to 1,000 ACL entries). The platform still enforces permissions when publishing.

LinkedIn does not issue refresh tokens to every developer app. Without one, reconnect when access expires; do not assume perpetual access. Image uploads may need processing time: if the provider rejects a not-yet-ready image, review the failure and retry later.

Official references:
- https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/share-on-linkedin
- https://learn.microsoft.com/en-us/linkedin/marketing/community-management-app-review
- https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/posts-api

## Connect X

Create a web app / confidential OAuth 2.0 client in the X developer console. Configure read/write access, enable the required scopes, and register:

```text
https://nandann.com/admin/api/oauth/x/callback
```

Set `X_CLIENT_ID` and `X_CLIENT_SECRET`, then connect X in Channels. Requested scopes: `tweet.read tweet.write users.read offline.access media.write`. Fund X API credits and set a spending cap in its console. API usage is billed by X, separately from Vercel. MVP posts use the standard 280-character weighted limit, including URL and emoji rules. Long Premium posts, threads, video, analytics, and automated engagement are out of scope.

Official references:
- https://docs.x.com/fundamentals/authentication/oauth-2-0/authorization-code
- https://docs.x.com/x-api/media/upload-media
- https://docs.x.com/x-api/getting-started/pricing

## Deploy to your Vercel Pro account

1. Import this repository into the Pro team with Root Directory `apps/outpost`.
2. Add the variables from `.env.example` in Vercel's **Production** environment. Set `APP_URL` to the stable production domain. Use a separate database/apps for Preview deployments if you enable live functionality there.
3. Deploy production. `vercel.json` runs `/admin/api/cron` at 18:00, 19:00, 20:00 and 21:00 IST daily. Vercel supplies `CRON_SECRET` as the bearer token. Verify the cron exists in the Vercel dashboard. Cron is not a guarantee of second-exact posting.
4. Add the stable production callback URLs to both developer apps, then sign in and connect accounts in the deployed app.
5. Schedule a single test post with approved copy and verify each platform's result before migrating your Buffer queue. No test content is posted automatically by the project setup or test suite.

No separate always-on server is required. Each cron invocation handles up to five deliveries within a 240-second function budget. Increase throughput only after load testing and reviewing provider limits. Expired/stuck claims move to Needs review after ten minutes. Keep previews from targeting the production database/cron.

## Validation and limitations

```sh
npm test
npx tsc --noEmit
npm run build
```

Tests cover post validation, weighted X limits, schedule boundaries, encryption tampering, provider uncertainty classification, and queue failure behavior. They mock social APIs and do not publish. Live OAuth, storage, database integration, and real publishing require your credentials and must be smoke-tested after configuration.

Drafts can be edited. Scheduled posts can be canceled by removing them from the workspace; published social posts are never deleted by that action. The UI shows the most recent 200 workspace posts. Roles/approvals, recurring posts, video, carousels, threads, analytics, and per-user workspaces are not included.

## Automatic nandann.com articles

The server-to-server article endpoint books one article per day at 6 PM India time across the connected accounts. Apply `db/outpost/002_article_queue.sql`, configure the website key, and connect the website publication event. See [the API contract and integration guide](docs/outpost/website-api.md). It deduplicates retries by stable article ID or canonical URL and reserves dates transactionally.

Website integration draft: https://github.com/prakharbhatia/nandann-creative/pull/12

The scheduler test suite also executes the SQL schema and scheduling service in embedded PostgreSQL (PGlite): distinct concurrent submissions, duplicate IDs/URLs, disconnected accounts, canceled bookings, feed baselining, per-channel outcomes, and a lost database acknowledgement after successful publication. This validates application behavior without production credentials; production OAuth, Supabase, Vercel cron, and real platform posts remain to be tested after configuration.

## Admin console and daily image posts

Apply `db/outpost/004_admin_console.sql` after the previous migrations. **Automation** now stores article time, publishing timezone, and two daily image-post times in PostgreSQL. Defaults are 19:00 and 20:00 for image posts, and 18:00 for articles, all in Asia/Kolkata. Changes apply only to new bookings. Disabling automatic booking does not cancel posts already scheduled. Existing bookings remain visible in Publishing and can be canceled there.

In **Daily image posts**, create one image post with exactly two paragraphs and use **Add to daily queue**. The next free daily slot is reserved when you approve it. Drafts do not enter the queue. If no approved content is available, nothing is fabricated or published. Automatic slot selection enforces at most two daily image bookings and one article booking per local date, including when times change. Nonexistent local times during daylight-saving transitions are skipped. The daily cap applies to automatic queue booking; manual scheduling remains an explicit override.

Preview mode can simulate daily bookings and settings changes in browser storage. It never sends anything to social platforms. Images are uploaded by the user; runtime AI text/image generation is not included.

### Optional first comments

Add comment text in the composer. On X it becomes a reply to your own post. On LinkedIn, use **Connect with comment access** after your developer app is approved for `w_member_social_feed` or `w_organization_social_feed`, as appropriate. Posting-only access is not assumed to include commenting.

The comment outbox is created atomically with the successful parent-post acknowledgement. Comment failures and retries are independent of the original post. Unknown outcomes require manual resolution; the original post is never resent to retry a comment. Delivery order is best-effort and cannot guarantee that this is chronologically the first comment. Comments are optional; article links remain in the main post. There is no claimed SEO or reach advantage. X API reply charges remain applicable.

Reference: https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/comments-api

