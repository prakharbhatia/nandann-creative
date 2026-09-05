# nandann.com → Outpost API

Every newly published website article calls `POST /api/v1/articles` from the website's server. Do not call this from a browser or expose the key in public JavaScript.

The scheduler books the next unoccupied **18:00 Asia/Kolkata** slot and creates one delivery per target account. All channels share that article's date. Before 6 PM, the first article can go today. At or after 6 PM, it goes tomorrow. Each extra article moves to a following day. The server's own time zone does not affect this rule.

## Setup

- Apply `db/002_article_queue.sql` after `db/schema.sql`.
- On Outpost, configure `WEBSITE_API_KEY` with a new random secret of at least 32 characters.
- On nandann.com's server, store `OUTPOST_URL` (the deployed scheduler origin) and `OUTPOST_API_KEY` (the same key).
- `ARTICLE_ALLOWED_HOSTS` defaults to `nandann.com,www.nandann.com`.
- `ARTICLE_TIME_ZONE` defaults to `Asia/Kolkata`.
- Configure `AUTO_PUBLISH_ACCOUNT_IDS` if only specific connected accounts should receive articles. Otherwise all workspace accounts are targeted. If a target needs reconnection, the request returns 409 without reserving a slot; reconnect and retry.

## Request

```http
POST /api/v1/articles
Authorization: Bearer YOUR_WEBSITE_API_KEY
Content-Type: application/json
```

```json
{
  "id": "stable-website-article-id",
  "url": "https://nandann.com/blog/your-article",
  "title": "Your article title",
  "excerpt": "A brief introduction to the article."
}
```

`id` is optional but strongly recommended: it prevents reposting when an article's URL changes. `url` is also deduplicated. Use the website's canonical HTTPS URL consistently. Tracking parameters, fragments, and trailing slashes are normalized. The content must be published and public before making the call; the scheduler validates the hostname but does not fetch or verify the article's publication state.

A successful new booking returns HTTP 201:

```json
{
  "duplicate": false,
  "articleId": "uuid",
  "postId": "uuid",
  "url": "https://nandann.com/blog/your-article",
  "scheduledAt": "2026-09-06T12:30:00.000Z",
  "timeZone": "Asia/Kolkata",
  "status": "scheduled",
  "channels": [{ "id": "account-uuid", "platform": "linkedin" }]
}
```

12:30 UTC is 18:00 India time. Duplicate calls return HTTP 200 with the existing booking and `duplicate: true`; they do not edit the queued text or reserve another day. If a team member removed the post, the duplicate response has `status: "cancelled"`, a null `postId`, and the original reservation remains. This prevents a retry from resurrecting a canceled post. To reschedule canceled content, create a manual post in the workspace.

Authentication failures return 401, invalid input 400, unavailable target accounts 409, and service failures 500. Retry network errors / 5xx with the same `id` and `url`. Alert an operator on persistent failures or 4xx; do not silently drop the article.

Concurrent requests are serialized by a PostgreSQL transaction advisory lock, with unique source keys, canonical URLs, and schedule timestamps. A crash rolls back the whole booking, including deliveries. Database/API transactions are idempotent; the social APIs themselves do not provide a universal exactly-once guarantee. Ambiguous publication outcomes require manual review.

## Post content

LinkedIn uses the article title, excerpt, and canonical link. X uses a shortened version that respects weighted 280-character limits and preserves the link. Automated articles are text/link posts in this MVP; no remote image fetching is performed. Manual composer posts support image uploads.

## Trigger placement

Trigger when an article first becomes publicly published, not on every draft save. Call after the website commits the publication. Use a durable outbox or a scheduled reconciler to retry unsuccessful requests; a fire-and-forget fetch in a serverless function can be terminated before it finishes. Edits can safely send the same event again, but they will not schedule a duplicate or change existing copy.

For an initial launch, choose an explicit starting timestamp so historic website posts are not accidentally queued in bulk. Backfilling older posts should be a separate deliberate action.

## Deployed-file integration for nandann-creative

The actual website stores articles in `data/posts/*.ts` and exports them through `data/blogPosts.ts`. The integration adds a read-only **`GET https://nandann.com/api/social/articles`** endpoint. It exposes only metadata already public on the website, not article HTML or credentials.

Apply `db/003_article_feed.sql` and set `ARTICLE_FEED_URL` in Outpost after the website endpoint is deployed. Outpost's existing cron reads that endpoint before processing scheduled deliveries. The first successful read saves all current IDs as a baseline without backfilling. Future unseen articles are submitted through the same transactional scheduling service as `POST /api/v1/articles`, oldest first. Failed ingestion remains discoverable on the next scan; successful ingestion is durable and deduplicated. No additional website cron, API secret, or publish-time network request is needed.

The read-only feed endpoint is the website side of this integration; it does not by itself enable posting. Enable Outpost's feed URL only after configuring the database, account connections, and cron. Confirm the first scan reports `baselineCreated: true`, then deploy one new article and confirm it receives a slot. If you want to queue an existing article deliberately, use the authenticated POST API with its feed ID (`nandann:SLUG`). Do not delete the feed checkpoint to backfill; deleting it creates a fresh baseline instead.

Outpost scans up to 1,000 published feed records and ingests at most 20 new articles per cron invocation. A failed website sync is reported as a cron error while existing social deliveries still run. The initial version does not automatically cancel a queued post when its website article is later removed; cancel it in Outpost if needed.
