import Link from 'next/link';
import { BlogPost } from '../data/blogPosts';

type Props = { posts: BlogPost[] };

export default function RelatedPosts({ posts }: Props) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-white mb-6">Related Articles</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            prefetch={false}
            className="block group bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors duration-200"
          >
            <p className="text-blue-300 text-xs font-medium mb-2">{post.category} • {post.readTime}</p>
            <h3 className="text-white font-semibold mb-2 group-hover:text-blue-200 transition-colors line-clamp-2 leading-snug">
              {post.title}
            </h3>
            <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">{post.description}</p>
            <p className="text-gray-500 text-xs mt-3">{new Date(post.date).toLocaleDateString()}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
