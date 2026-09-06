# Separate Outpost deployment

Import `prakharbhatia/nandann-creative` into your Vercel Pro team with **Root Directory: apps/outpost**. Keep the website project at the repository root. The website has no publishing cron.

The console URL is `https://YOUR-OUTPOST-PROJECT.vercel.app/admin`. Set Outpost's `APP_URL` to that origin without `/admin` and register OAuth callbacks under `/admin/api/oauth/{platform}/callback`. Configure the environment variables and database before connecting accounts.

To keep `https://www.nandann.com/admin`, set `OUTPOST_ORIGIN=https://YOUR-OUTPOST-PROJECT.vercel.app` on the WEBSITE project and redeploy it. Then set Outpost's `APP_URL=https://www.nandann.com` and update social callback URLs to that domain. The Outpost production origin must be reachable by the website proxy. Without OUTPOST_ORIGIN the website does not serve /admin.

Outpost checks the queue at 18:00, 19:00, 20:00 and 21:00 IST (`30 12,13,14,15 * * *` UTC). Fresh defaults schedule articles at 18:00 and the two image posts at 19:00 and 20:00. Existing settings and bookings remain; adjust earlier times in Automation. Posts, comments and retries wait until a check runs. These are four checks, not a four-post limit.

See [Outpost setup](apps/outpost/README.md) for database migrations and environment variables.
