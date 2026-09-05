import { db } from "./db";
import { publishComment } from "./providers";
import { failureState } from "./queue";
export async function runCommentQueue(budgetMs = 30000) {
  const sql = db();
  await sql`update post_comments set status='unknown',error='Comment publishing was interrupted. Check the post before resolving.' where status='publishing' and claimed_at<now()-interval '10 minutes'`;
  let processed = 0;
  const started = Date.now();
  while (processed < 5 && Date.now() - started < budgetMs) {
    const [job] =
      await sql`update post_comments set status='publishing',claimed_at=now(),attempts=attempts+1 where id=(select c.id from post_comments c join deliveries d on d.id=c.delivery_id where c.status='scheduled' and c.next_attempt_at<=now() and d.status='published' and d.provider_post_id is not null order by c.next_attempt_at for update of c skip locked limit 1) returning *`;
    if (!job) break;
    let id: string;
    try {
      const [parent] =
        await sql`select account_id,provider_post_id from deliveries where id=${job.delivery_id}`;
      id = await publishComment(
        parent.account_id,
        parent.provider_post_id,
        job.text,
      );
    } catch (e) {
      const state = failureState(e, job.attempts);
      await sql`update post_comments set status=${state.status},error=${state.message},next_attempt_at=${state.delay ? new Date(Date.now() + state.delay * 1000) : null} where id=${job.id} and status='publishing'`;
      processed++;
      continue;
    }
    // A failed database acknowledgement must never retry a comment already sent.
    await sql`update post_comments set status='published',provider_comment_id=${id},published_at=now(),error=null where id=${job.id} and status='publishing'`;
    processed++;
  }
  return { commentsProcessed: processed };
}
