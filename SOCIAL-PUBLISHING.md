# Automatic social scheduling

`GET /api/social/articles` exposes the deployed blog index as public article metadata for the Outpost scheduler. It includes stable IDs (`nandann:SLUG`), canonical links, titles, descriptions, and publication dates. It does not expose HTML, credentials, or administrative actions.

Deploy this change to nandann.com, then configure Outpost:

1. Apply its database migrations (`schema.sql`, `002_article_queue.sql`, `003_article_feed.sql`).
2. Connect LinkedIn personal profiles, company pages, and X.
3. Set `ARTICLE_FEED_URL=https://nandann.com/api/social/articles`.
4. Set `ARTICLE_TIME_ZONE=Asia/Kolkata` and enable Outpost's Vercel cron.
5. Confirm the first successful sync creates the archive baseline. Existing articles are deliberately not scheduled in bulk.

After that, continue using the normal workflow: add the article to `data/posts`, register it in the blog index, and deploy. Outpost discovers it from the live API and schedules it at the next available 6 PM India-time slot. Additional articles get following days. Outpost creates one delivery per channel on the same date. Its cron retries missed ingestion without duplicate bookings. Editing an article does not create a new booking as long as its slug stays the same.

No website environment variables, cron, build hook, or outbound publishing request is required. An unsuccessful website build cannot publish social posts because the scheduler only reads the production API. Removing an article from the website does not automatically cancel an existing Outpost booking; cancel it in Outpost when needed.

The scheduler must be separately deployed and configured before the feature is active. The endpoint alone does not post anything to social accounts.

Validate this change with `node --test tests/social-articles.test.cjs` after installing the project's normal dependencies.
