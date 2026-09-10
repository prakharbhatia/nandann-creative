import type { BlogPost } from '../data/blogPosts';

export type BlogPostSummary = Pick<
  BlogPost,
  'slug' | 'title' | 'description' | 'date' | 'readTime' | 'category' | 'coverImage'
>;

export function toBlogPostSummary(post: BlogPost): BlogPostSummary {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    readTime: post.readTime,
    category: post.category,
    coverImage: post.coverImage,
  };
}
