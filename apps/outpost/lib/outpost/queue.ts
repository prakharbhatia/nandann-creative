import { db } from "./db";
import { publish, ProviderError } from "./providers";
export function failureState(error: unknown, attempts: number) {
  if (error instanceof ProviderError) {
    if (error.uncertain)
      return { status: "unknown", message: error.message, delay: 0 };
    if (error.status === 429 && attempts < 5)
      return {
        status: "scheduled",
        message: error.message,
        delay: Math.max(error.retryAfter, 60 * 2 ** attempts),
      };
    return { status: "failed", message: error.message, delay: 0 };
  }
  return {
    status: "failed",
    message:
      "Publishing preparation failed. Check your services before retrying.",
    delay: 0,
  };
}
export async function runQueue(budgetMs = 180000) {
  const sql = db();
  await sql`update deliveries set status='unknown',error='Publishing was interrupted. Check the social account before resolving this delivery.' where status='publishing' and claimed_at<now()-interval '10 minutes'`;
  let processed = 0;
  const started = Date.now();
  while (processed < 5 && Date.now() - started < budgetMs) {
    const [job] =
      await sql`update deliveries set status='publishing',claimed_at=now(),attempts=attempts+1 where id=(select id from deliveries where status='scheduled' and next_attempt_at<=now() order by next_attempt_at for update skip locked limit 1) returning *`;
    if (!job) break;
    let result: { id: string; url: string };
    try {
      const [post] =
        await sql`select image_path from posts where id=${job.post_id}`;
      result = await publish(job.account_id, job.text, post?.image_path);
    } catch (e) {
      const state = failureState(e, job.attempts);
      await sql`update deliveries set status=${state.status},error=${state.message},next_attempt_at=${state.delay ? new Date(Date.now() + state.delay * 1000) : null} where id=${job.id} and status='publishing'`;
      if (e instanceof ProviderError && e.status === 401)
        await sql`update accounts set connected=false where id=${job.account_id}`;
      processed++;
      continue;
    }
    // Never turn a database failure after successful publication into a retryable failure.
    // A lost acknowledgement stays publishing, then becomes unknown for human reconciliation.
    await sql`with published as (update deliveries set status='published',provider_post_id=${result.id},url=${result.url},published_at=now(),error=null where id=${job.id} and status='publishing' returning id,first_comment) insert into post_comments(delivery_id,text) select id,first_comment from published where first_comment is not null and first_comment<>'' on conflict(delivery_id) do nothing`;
    processed++;
  }
  return { processed };
}
