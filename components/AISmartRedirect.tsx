import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FAQ from './FAQ';

export default function AISmartRedirect() {
    const faqs = [
        {
            question: "How does the AI matching work?",
            answer: "The plugin uses multiple algorithms: keyword extraction from the broken URL, title matching against posts/pages, slug comparison, taxonomy matching, and content search. Each match receives a confidence score from 0-100%, and only scores above your threshold result in redirects."
        },
        {
            question: "What is the Levenshtein algorithm for typo detection?",
            answer: "Levenshtein distance measures how many character changes (insertions, deletions, substitutions) are needed to transform one string into another. If someone types '/contcat' instead of '/contact', the algorithm detects it's only 1 character off and redirects with high confidence."
        },
        {
            question: "Will this affect my site's performance?",
            answer: "Negligible impact. The plugin only runs on 404 pages, not every page load. Matching is done in memory using efficient PHP algorithms. Most redirects complete in under 50ms."
        },
        {
            question: "What redirect type should I use?",
            answer: "301 Permanent is recommended for most cases as it passes SEO value to the new URL. Use 302 Found for temporary redirects, or 307 if you need to preserve the HTTP request method."
        },
        {
            question: "Can I see which URLs are being redirected?",
            answer: "Yes! The plugin includes a comprehensive dashboard showing all 404 errors, successful redirects, match types (AI/Typo/Fallback), hit counts, referrers, and timestamps. Export logs to CSV anytime."
        },
        {
            question: "Does it work with custom post types?",
            answer: "Absolutely. The plugin searches all public post types including custom ones. You can configure which post types to include or exclude in settings."
        },
        {
            question: "What happens if no match is found?",
            answer: "You can configure a fallback URL (like your homepage or a custom 404 page). Alternatively, let WordPress show its normal 404 page. Either way, the 404 is logged for your review."
        }
    ];

    return (
        <main className="bg-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-gray-900 via-orange-900 to-red-900">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <div className="w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center">
                                <Image
                                    src="/images/plugins/ai404-icon.svg"
                                    alt="AI Smart 404 Redirect Icon"
                                    width={48}
                                    height={48}
                                />
                            </div>
                            <span className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium">
                                AI-Powered • Free
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            AI Smart 404 Redirect
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                            Stop losing visitors to broken links. AI-powered redirects that <strong className="text-white">actually understand your content</strong>.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            <div className="flex items-center gap-2 bg-orange-500/20 px-4 py-2 rounded-full">
                                <span className="text-orange-400">🧠</span>
                                <span className="text-white">AI Matching</span>
                            </div>
                            <div className="flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-full">
                                <span className="text-yellow-400">🔤</span>
                                <span className="text-white">Typo Detection</span>
                            </div>
                            <div className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full">
                                <span className="text-green-400">📊</span>
                                <span className="text-white">Analytics</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Link
                                href="https://wordpress.org/plugins/nandann-ai-smart-404-redirect/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25 group"
                            >
                                <span>Download Free Plugin</span>
                                <span className="group-hover:translate-x-1 transition-transform duration-200">↓</span>
                            </Link>
                            <Link
                                href="#how-it-works"
                                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
                            >
                                See How It Works
                            </Link>
                        </div>
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        <div className="glass rounded-3xl p-4 inline-block">
                            <Image
                                src="/images/plugins/ai404-banner.webp"
                                alt="AI Smart 404 Redirect - Intelligent broken link handler"
                                width={772}
                                height={250}
                                className="rounded-2xl"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem Statement */}
            <section className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-6">
                        The Hidden Cost of 404 Errors
                    </h2>
                    <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
                        Every 404 error is a lost opportunity. Most plugins "solve" this by redirecting everything to your homepage — but users hate that.
                    </p>

                    <div className="overflow-x-auto mb-12">
                        <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
                            <thead>
                                <tr className="bg-red-600 text-white">
                                    <th className="px-6 py-4 text-left font-semibold">Impact</th>
                                    <th className="px-6 py-4 text-left font-semibold">Research Statistic</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">Bounce rate from 404 pages</td>
                                    <td className="px-6 py-4 text-red-600 font-bold text-xl">88%</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">Visitors who never return after 404</td>
                                    <td className="px-6 py-4 text-red-600 font-bold text-xl">74%</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">SEO penalty for high 404 rates</td>
                                    <td className="px-6 py-4 text-red-600 font-bold text-xl">Significant</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">Average site 404 errors per month</td>
                                    <td className="px-6 py-4 text-red-600 font-bold text-xl">500+</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="text-center bg-orange-50 rounded-2xl p-8">
                        <p className="text-xl text-gray-900">
                            <span className="font-semibold">What if your 404 handler actually understood what visitors were looking for?</span>
                        </p>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-20 bg-gray-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                        How AI Matching Works
                    </h2>
                    <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-16">
                        When someone visits a broken link, the plugin intelligently finds the best match.
                    </p>

                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
                        <div className="text-center mb-8">
                            <p className="text-lg text-gray-600 mb-4">
                                When someone visits <code className="bg-gray-100 px-2 py-1 rounded">/best-wordpress-themes-2024</code> (which doesn't exist)
                            </p>
                        </div>

                        <div className="grid md:grid-cols-4 gap-6">
                            {[
                                { step: "1", title: "Extract Keywords", desc: '"wordpress", "themes", "2024"', icon: "🔤" },
                                { step: "2", title: "Search Content", desc: "Posts, pages, categories, tags", icon: "🔍" },
                                { step: "3", title: "Score Matches", desc: "Relevance based on title, slug, content", icon: "📊" },
                                { step: "4", title: "Redirect", desc: "/wordpress-themes-guide/ (95% match)", icon: "✅" }
                            ].map((item) => (
                                <div key={item.step} className="text-center">
                                    <div className="text-3xl mb-3">{item.icon}</div>
                                    <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
                                        {item.step}
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-gray-600 text-sm">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Algorithms */}
            <section className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                        Multiple Algorithms Working Together
                    </h2>
                    <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
                        Not just one matching method — a comprehensive approach for maximum accuracy.
                    </p>

                    <div className="overflow-x-auto mb-12">
                        <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
                            <thead>
                                <tr className="bg-orange-600 text-white">
                                    <th className="px-6 py-4 text-left font-semibold">Algorithm</th>
                                    <th className="px-6 py-4 text-left font-semibold">What It Does</th>
                                    <th className="px-6 py-4 text-left font-semibold">Best For</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">🔤 Keyword Extraction</td>
                                    <td className="px-6 py-4 text-gray-600">Pulls meaningful words from broken URL</td>
                                    <td className="px-6 py-4 text-gray-600">URL structure changes</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">📝 Title Matching</td>
                                    <td className="px-6 py-4 text-gray-600">Compares to post/page titles</td>
                                    <td className="px-6 py-4 text-gray-600">Content searches</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">🔗 Slug Matching</td>
                                    <td className="px-6 py-4 text-gray-600">Compares to URL slugs</td>
                                    <td className="px-6 py-4 text-gray-600">Similar URLs</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">🔍 Content Search</td>
                                    <td className="px-6 py-4 text-gray-600">Deep search within post content</td>
                                    <td className="px-6 py-4 text-gray-600">Deep matching</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">🏷️ Taxonomy Matching</td>
                                    <td className="px-6 py-4 text-gray-600">Checks categories and tags</td>
                                    <td className="px-6 py-4 text-gray-600">Categorized content</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-orange-50 rounded-2xl p-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                            🔤 Typo Detection with Levenshtein Algorithm
                        </h3>
                        <p className="text-gray-600 text-center mb-6">
                            Visitors make typos. The plugin catches them with configurable tolerance (1-5 character differences).
                        </p>

                        <div className="overflow-x-auto">
                            <table className="w-full bg-white rounded-xl overflow-hidden">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-6 py-3 text-left font-semibold text-gray-900">Visitor Types</th>
                                        <th className="px-6 py-3 text-left font-semibold text-gray-900">Correct URL</th>
                                        <th className="px-6 py-3 text-left font-semibold text-gray-900">Match Score</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-6 py-3 font-mono text-red-600">/contcat</td>
                                        <td className="px-6 py-3 font-mono text-green-600">/contact</td>
                                        <td className="px-6 py-3 text-green-600 font-bold">95% ✓</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-3 font-mono text-red-600">/abuot-us</td>
                                        <td className="px-6 py-3 font-mono text-green-600">/about-us</td>
                                        <td className="px-6 py-3 text-green-600 font-bold">92% ✓</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-3 font-mono text-red-600">/pricing-plnas</td>
                                        <td className="px-6 py-3 font-mono text-green-600">/pricing-plans</td>
                                        <td className="px-6 py-3 text-green-600 font-bold">90% ✓</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-3 font-mono text-red-600">/servces</td>
                                        <td className="px-6 py-3 font-mono text-green-600">/services</td>
                                        <td className="px-6 py-3 text-green-600 font-bold">94% ✓</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                        Key Features
                    </h2>
                    <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-16">
                        Everything you need to eliminate 404 errors and keep visitors on your site.
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "AI-Powered Matching",
                                desc: "Multiple algorithms analyze broken URLs and find the most relevant page on your site.",
                                icon: "🧠"
                            },
                            {
                                title: "Typo Correction",
                                desc: "Levenshtein algorithm catches common typos and redirects users to the correct page.",
                                icon: "🔤"
                            },
                            {
                                title: "Confidence Scoring",
                                desc: "Each match gets a 0-100% score. Set your threshold for automatic redirects.",
                                icon: "📊"
                            },
                            {
                                title: "Comprehensive Analytics",
                                desc: "Dashboard with 404 trends, redirect success rates, top broken URLs, and referrers.",
                                icon: "📈"
                            },
                            {
                                title: "Email Notifications",
                                desc: "Daily, weekly, or monthly reports with 404 stats and recommendations.",
                                icon: "📧"
                            },
                            {
                                title: "Custom Post Types",
                                desc: "Works with all public post types including WooCommerce products and custom types.",
                                icon: "📦"
                            }
                        ].map((feature) => (
                            <div key={feature.title} className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-orange-200 hover:shadow-lg transition-all duration-300">
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Section */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                        How Does It Compare?
                    </h2>
                    <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
                        See why AI Smart 404 Redirect is the smartest choice.
                    </p>

                    <div className="overflow-x-auto">
                        <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
                            <thead>
                                <tr className="bg-gray-900 text-white">
                                    <th className="px-6 py-4 text-left font-semibold">Feature</th>
                                    <th className="px-6 py-4 text-center font-semibold bg-orange-600">AI Smart 404</th>
                                    <th className="px-6 py-4 text-center font-semibold">Redirection</th>
                                    <th className="px-6 py-4 text-center font-semibold">Simple 404</th>
                                    <th className="px-6 py-4 text-center font-semibold">No Plugin</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 font-medium text-gray-900">Price</td>
                                    <td className="px-6 py-4 text-center bg-orange-50 font-bold text-green-600">Free</td>
                                    <td className="px-6 py-4 text-center text-gray-600">Free</td>
                                    <td className="px-6 py-4 text-center text-gray-600">Free</td>
                                    <td className="px-6 py-4 text-center text-gray-600">Free</td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">Intelligent Matching</td>
                                    <td className="px-6 py-4 text-center bg-orange-50"><span className="text-green-600 font-bold">✓ AI-powered</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗ Manual only</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-medium text-gray-900">Typo Correction</td>
                                    <td className="px-6 py-4 text-center bg-orange-50"><span className="text-green-600 font-bold">✓ Levenshtein</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">Confidence Scoring</td>
                                    <td className="px-6 py-4 text-center bg-orange-50"><span className="text-green-600 font-bold">✓ 0-100%</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-medium text-gray-900">404 Analytics</td>
                                    <td className="px-6 py-4 text-center bg-orange-50"><span className="text-green-600 font-bold">✓ Full Dashboard</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-green-600">✓</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-yellow-600">⚠️ Basic</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">Email Notifications</td>
                                    <td className="px-6 py-4 text-center bg-orange-50"><span className="text-green-600 font-bold">✓</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-medium text-gray-900">Custom Post Types</td>
                                    <td className="px-6 py-4 text-center bg-orange-50"><span className="text-green-600 font-bold">✓ All public</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-green-600">✓</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-yellow-600">⚠️ Posts only</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">Performance Impact</td>
                                    <td className="px-6 py-4 text-center bg-orange-50"><span className="text-green-600 font-bold">✓ Minimal</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-green-600">✓</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-green-600">✓</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-green-600">✓</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                        Common Use Cases
                    </h2>
                    <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
                        Real-world scenarios where AI Smart 404 Redirect saves the day.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                title: "🔄 URL Structure Changes",
                                scenario: "You change permalinks from /2024/01/post-name/ to /post-name/",
                                result: "Plugin automatically redirects old URLs to new structure based on content matching."
                            },
                            {
                                title: "🔤 User Typos",
                                scenario: "Visitor types /conact instead of /contact",
                                result: "Levenshtein algorithm detects 1-character difference, redirects with 95% confidence."
                            },
                            {
                                title: "🗑️ Deleted Content",
                                scenario: "You delete a product page but external links still point to it",
                                result: "Plugin finds the most similar product and redirects there."
                            },
                            {
                                title: "🔗 External Broken Links",
                                scenario: "Another site links to /services/web-development/ but you renamed it",
                                result: "AI matches keywords and redirects to /services/website-development/ correctly."
                            }
                        ].map((item) => (
                            <div key={item.title} className="bg-white rounded-2xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                                <p className="text-gray-600 mb-3"><strong>Scenario:</strong> {item.scenario}</p>
                                <p className="text-green-600"><strong>Result:</strong> {item.result}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Installation Section */}
            <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                        Get Started in 5 Minutes
                    </h2>
                    <p className="text-lg text-gray-300 text-center max-w-2xl mx-auto mb-12">
                        Simple setup. Immediate protection.
                    </p>

                    <div className="space-y-8">
                        {[
                            {
                                step: "1",
                                title: "Install the plugin",
                                desc: "Go to Plugins → Add New, search for 'AI Smart 404 Redirect', click Install → Activate."
                            },
                            {
                                step: "2",
                                title: "Configure settings",
                                desc: "Go to Settings → AI 404 Redirect. Enable AI Smart Matching and set your confidence threshold."
                            },
                            {
                                step: "3",
                                title: "Choose redirect type",
                                desc: "Select 301 (permanent), 302 (found), or 307 (temporary) based on your SEO strategy."
                            },
                            {
                                step: "4",
                                title: "Monitor & optimize",
                                desc: "Check the Dashboard and Logs tabs to see 404 errors and successful redirects."
                            }
                        ].map((item) => (
                            <div key={item.step} className="flex gap-6 items-start">
                                <div className="flex-shrink-0 w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-xl font-bold">
                                    {item.step}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                    <p className="text-gray-300">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            href="https://wordpress.org/plugins/nandann-ai-smart-404-redirect/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25"
                        >
                            <span>Download Free Plugin</span>
                            <span>↓</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FAQ
                        title="Frequently Asked Questions"
                        faqs={faqs}
                    />
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Stop Losing Visitors to Broken Links
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Join thousands of WordPress sites using AI-powered 404 handling to keep visitors engaged.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="https://wordpress.org/plugins/nandann-ai-smart-404-redirect/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg"
                        >
                            Download Free Plugin
                        </Link>
                        <Link
                            href="/plugin-support"
                            className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white/10"
                        >
                            Get Support
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
