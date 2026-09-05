import type { BlogPost } from "../../data/blogPosts";

/** Public metadata only. Inclusion in the deployed blog index means the article is live. */
export function createArticleManifest(posts: BlogPost[]) {
  const articles = posts.map((post) => {
    if (!post.slug || !post.title || !Number.isFinite(Date.parse(post.date))) {
      throw new Error(
        "An article is missing a slug, title, or valid publication date.",
      );
    }
    return {
      id: `nandann:${post.slug}`,
      url: `https://nandann.com/blog/${encodeURIComponent(post.slug)}`,
      title: post.title,
      excerpt: post.description,
      publishedAt: new Date(post.date).toISOString(),
    };
  });
  if (new Set(articles.map((article) => article.id)).size !== articles.length) {
    throw new Error("Duplicate article slugs in the blog index.");
  }
  articles.sort(
    (a, b) =>
      a.publishedAt.localeCompare(b.publishedAt) || a.id.localeCompare(b.id),
  );
  return { version: 1 as const, articles };
}
