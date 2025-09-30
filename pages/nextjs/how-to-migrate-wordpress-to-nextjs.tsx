import Head from 'next/head';
import Link from 'next/link';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import FAQ from '../../components/FAQ';
import StructuredData from '../../components/StructuredData';

export default function HowToMigrateWordPressToNextJS() {
  const faqs = [
    {
      question: "How long does it take to migrate WordPress to Next.js?",
      answer: "Migration timeline depends on site complexity: simple blogs (1-2 weeks), medium business sites (3-6 weeks), complex e-commerce (2-4 months). Factors include content volume, custom functionality, design complexity, and third-party integrations. Our rapid delivery service can complete basic migrations in 7 days."
    },
    {
      question: "What are the main challenges when migrating WordPress to Next.js?",
      answer: "Common challenges include: content migration complexity, preserving SEO rankings, maintaining functionality, handling custom post types, migrating media files, preserving URL structure, and ensuring zero downtime. Our expert team addresses all these challenges with proven strategies and tools."
    },
    {
      question: "Do I need to know React or Next.js to migrate my site?",
      answer: "No technical knowledge is required for our migration service. We handle all technical aspects including content migration, design recreation, functionality preservation, and deployment. However, if you want to manage the site afterward, basic knowledge of React/Next.js can be helpful."
    },
    {
      question: "What happens to my WordPress plugins during migration?",
      answer: "WordPress plugins don't work directly in Next.js. We recreate the functionality using modern web technologies. For essential plugins, we either find Next.js equivalents, build custom solutions, or integrate with third-party services. We provide a detailed plugin migration plan during consultation."
    },
    {
      question: "Can I keep my existing design during migration?",
      answer: "Yes, we can recreate your existing design using modern Next.js components and responsive layouts. We can also enhance the design with modern web practices, animations, and improved user experience while maintaining your brand identity and visual style."
    },
    {
      question: "What about my WordPress themes and customizations?",
      answer: "We analyze your current theme and customizations to recreate them in Next.js. This includes layout structure, styling, custom post types, taxonomies, and any theme-specific functionality. We ensure the new site looks and functions identically to your WordPress site."
    },
    {
      question: "How do you handle e-commerce migration from WooCommerce?",
      answer: "E-commerce migration involves recreating product catalogs, shopping cart functionality, payment processing, user accounts, and order management. We can integrate with modern e-commerce solutions like Shopify, Stripe, or build custom e-commerce functionality using Next.js and modern APIs."
    },
    {
      question: "What's the difference between manual and automated migration?",
      answer: "Manual migration involves recreating content and functionality from scratch, ensuring optimal quality and customization. Automated migration uses tools to transfer content but may require significant cleanup. We use a hybrid approach: automated content transfer with manual optimization and customization."
    }
  ];

  return (
    <>
      <Head>
        <title>How to Migrate WordPress to Next.js 2025 | Complete Guide | Nandann Creative</title>
        <meta name="description" content="Complete step-by-step guide to migrate WordPress to Next.js in 2025. Learn best practices, tools, and strategies for successful migration with code examples and expert tips." />
        <meta name="keywords" content="how to migrate WordPress to Next.js, WordPress migration guide, Next.js migration tutorial, WordPress to Next.js steps, migration best practices" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.nandann.com/nextjs/how-to-migrate-wordpress-to-nextjs" />
        
        {/* Open Graph */}
        <meta property="og:title" content="How to Migrate WordPress to Next.js 2025 | Complete Guide" />
        <meta property="og:description" content="Complete step-by-step guide to migrate WordPress to Next.js in 2025. Learn best practices, tools, and strategies for successful migration with code examples and expert tips." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.nandann.com/nextjs/how-to-migrate-wordpress-to-nextjs" />
        <meta property="og:image" content="https://www.nandann.com/api/og?title=How%20to%20Migrate%20WordPress%20to%20Next.js%202025&subtitle=Complete%20Step-by-Step%20Guide" />
        <meta property="og:site_name" content="Nandann Creative" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="How to Migrate WordPress to Next.js 2025 | Complete Guide" />
        <meta name="twitter:description" content="Complete step-by-step guide to migrate WordPress to Next.js in 2025. Learn best practices, tools, and strategies for successful migration with code examples and expert tips." />
        <meta name="twitter:image" content="https://www.nandann.com/api/og?title=How%20to%20Migrate%20WordPress%20to%20Next.js%202025&subtitle=Complete%20Step-by-Step%20Guide" />
        
        {/* Additional SEO */}
        <meta name="author" content="Nandann Creative" />
        <meta name="publisher" content="Nandann Creative" />
        <meta name="language" content="en-US" />
        <meta name="article:published_time" content="2025-01-27T00:00:00Z" />
        <meta name="article:modified_time" content="2025-01-27T00:00:00Z" />
        <meta name="article:section" content="Tutorial" />
        <meta name="article:tag" content="WordPress, Next.js, Migration, Tutorial, Guide" />
      </Head>

      <StructuredData 
        type="website"
        pageUrl="https://www.nandann.com/nextjs/how-to-migrate-wordpress-to-nextjs"
        pageTitle="How to Migrate WordPress to Next.js 2025 | Complete Guide"
        pageDescription="Complete step-by-step guide to migrate WordPress to Next.js in 2025. Learn best practices, tools, and strategies for successful migration with code examples and expert tips."
      />

      <Navigation />
      
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
                How to Migrate <span className="text-gradient">WordPress to Next.js</span> 2025
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Complete step-by-step guide to migrate WordPress to Next.js in 2025. 
                Learn best practices, tools, and strategies for successful migration with code examples and expert tips.
              </p>
            </div>

            {/* Migration Steps */}
            <div className="glass rounded-2xl p-8 mb-16">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Migration Steps Overview</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/5 rounded-xl p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">1</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">Planning & Analysis</h3>
                  <p className="text-gray-300 text-sm">Audit your WordPress site, inventory content, and plan the migration strategy.</p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">2</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">Content Migration</h3>
                  <p className="text-gray-300 text-sm">Export and migrate all content, media files, and data to Next.js format.</p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">3</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">Development & Design</h3>
                  <p className="text-gray-300 text-sm">Recreate design and functionality using Next.js components and modern practices.</p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">4</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">Testing & Launch</h3>
                  <p className="text-gray-300 text-sm">Test thoroughly, optimize performance, and deploy with zero downtime.</p>
                </div>
              </div>
            </div>

            {/* Detailed Steps */}
            <div className="space-y-12 mb-16">
              {/* Step 1 */}
              <div className="glass rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-white text-xl font-bold">1</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white">Planning & Analysis</h2>
                </div>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Site Audit</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start space-x-3">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Inventory all pages, posts, and custom post types</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Document all plugins and their functionality</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Analyze current SEO performance and rankings</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Identify custom themes and modifications</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Map out URL structure and internal linking</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Migration Strategy</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start space-x-3">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Choose Next.js rendering strategy (SSG/SSR/ISR)</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Plan content management approach</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Design URL structure and redirects</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Select hosting and deployment platform</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Create project timeline and milestones</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="glass rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-white text-xl font-bold">2</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white">Content Migration</h2>
                </div>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Content Export</h3>
                    <div className="bg-white/5 rounded-xl p-6 mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3">WordPress REST API</h4>
                      <pre className="text-gray-300 text-sm overflow-x-auto">
{`// Export posts via REST API
const response = await fetch(
  'https://yoursite.com/wp-json/wp/v2/posts'
);
const posts = await response.json();

// Export pages
const pages = await fetch(
  'https://yoursite.com/wp-json/wp/v2/pages'
);`}
                      </pre>
                    </div>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start space-x-3">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Export all posts, pages, and custom post types</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Download all media files and images</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Export user data and comments</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Content Processing</h3>
                    <div className="bg-white/5 rounded-xl p-6 mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3">Content Transformation</h4>
                      <pre className="text-gray-300 text-sm overflow-x-auto">
{`// Transform WordPress content to Next.js
function transformPost(wpPost) {
  return {
    id: wpPost.id,
    title: wpPost.title.rendered,
    content: wpPost.content.rendered,
    excerpt: wpPost.excerpt.rendered,
    slug: wpPost.slug,
    date: wpPost.date,
    featuredImage: wpPost.featured_media
  };
}`}
                      </pre>
                    </div>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start space-x-3">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Clean and format content for Next.js</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Optimize images and media files</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Create proper file structure</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="glass rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-white text-xl font-bold">3</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white">Development & Design</h2>
                </div>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Next.js Setup</h3>
                    <div className="bg-white/5 rounded-xl p-6 mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3">Project Initialization</h4>
                      <pre className="text-gray-300 text-sm overflow-x-auto">
{`# Create Next.js project
npx create-next-app@latest my-site
cd my-site

# Install additional dependencies
npm install @next/mdx gray-matter
npm install -D @types/node`}
                      </pre>
                    </div>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start space-x-3">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Set up Next.js project with TypeScript</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Configure build and deployment settings</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Set up content management system</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Component Development</h3>
                    <div className="bg-white/5 rounded-xl p-6 mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3">Post Component</h4>
                      <pre className="text-gray-300 text-sm overflow-x-auto">
{`// components/Post.tsx
interface Post {
  title: string;
  content: string;
  date: string;
  slug: string;
}

export default function Post({ post }: { post: Post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <time>{post.date}</time>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}`}
                      </pre>
                    </div>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start space-x-3">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Create reusable React components</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Implement responsive design</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Add interactive features and animations</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="glass rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-white text-xl font-bold">4</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white">Testing & Launch</h2>
                </div>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Quality Assurance</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start space-x-3">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Test all functionality and user interactions</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Verify content accuracy and formatting</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Check responsive design on all devices</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Validate SEO elements and meta tags</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Performance testing and optimization</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Deployment</h3>
                    <div className="bg-white/5 rounded-xl p-6 mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3">Vercel Deployment</h4>
                      <pre className="text-gray-300 text-sm overflow-x-auto">
{`# Deploy to Vercel
npm install -g vercel
vercel --prod

# Or use GitHub integration
# Connect your repo to Vercel
# Automatic deployments on push`}
                      </pre>
                    </div>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start space-x-3">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Deploy to staging environment first</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Set up domain and SSL certificates</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Configure redirects and DNS settings</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Best Practices */}
            <div className="glass rounded-2xl p-8 mb-16">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Migration Best Practices</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white/5 rounded-xl p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-white text-xl">🔍</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">SEO Preservation</h3>
                  <p className="text-gray-300 text-sm">Maintain URL structure, implement 301 redirects, and preserve all meta tags and structured data.</p>
                </div>

                <div className="bg-white/5 rounded-xl p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-white text-xl">⚡</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">Performance Optimization</h3>
                  <p className="text-gray-300 text-sm">Use Next.js Image component, implement proper caching, and optimize Core Web Vitals.</p>
                </div>

                <div className="bg-white/5 rounded-xl p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-white text-xl">🛡️</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">Zero Downtime</h3>
                  <p className="text-gray-300 text-sm">Use staging environment and perform seamless DNS switch during off-peak hours.</p>
                </div>

                <div className="bg-white/5 rounded-xl p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-white text-xl">📱</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">Mobile-First Design</h3>
                  <p className="text-gray-300 text-sm">Implement responsive design and optimize for mobile performance and user experience.</p>
                </div>

                <div className="bg-white/5 rounded-xl p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-white text-xl">🔧</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">Functionality Preservation</h3>
                  <p className="text-gray-300 text-sm">Recreate all existing functionality using modern web technologies and best practices.</p>
                </div>

                <div className="bg-white/5 rounded-xl p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-white text-xl">📊</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">Monitoring & Analytics</h3>
                  <p className="text-gray-300 text-sm">Set up comprehensive monitoring, analytics, and error tracking for post-launch optimization.</p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <div className="glass rounded-2xl p-12">
                <h2 className="text-4xl font-bold text-white mb-6">
                  Need Help with Your Migration?
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Get expert assistance with your WordPress to Next.js migration. 
                  Professional migration services with zero downtime and SEO preservation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-full text-white font-semibold text-lg hover-lift hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                  >
                    Get Migration Help
                  </Link>
                  <Link
                    href="/nextjs/wordpress-to-nextjs-migration-service"
                    className="border border-white/20 hover:border-white/40 px-8 py-4 rounded-full text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300"
                  >
                    View Migration Services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ 
          title="Migration Guide FAQ"
          faqs={faqs}
        />
      </main>

      <Footer />
    </>
  );
}
