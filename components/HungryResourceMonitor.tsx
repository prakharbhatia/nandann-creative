import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FAQ from './FAQ';

export default function HungryResourceMonitor() {
    const faqs = [
        {
            question: "Does this plugin slow down my site?",
            answer: "No. The plugin uses minimal resources and only tracks data on page load. The tracking overhead is negligible and designed to have virtually no impact on your site's performance. Tracking can be completely disabled in settings if needed."
        },
        {
            question: "How long is data stored?",
            answer: "By default, 30 days. This is configurable in Settings. You can increase or decrease the retention period based on your needs and database size considerations."
        },
        {
            question: "Is this compatible with caching plugins?",
            answer: "Yes. Resource tracking happens at the PHP level before output caching, so it works seamlessly with all major caching plugins including WP Super Cache, W3 Total Cache, LiteSpeed Cache, and others."
        },
        {
            question: "Will the cleanup tools break my site?",
            answer: "No. The cleanup tools only remove data that is safe to delete (revisions, drafts, spam, trash, expired transients, orphaned metadata). However, as with any database operation, we recommend backing up your site before performing cleanup operations."
        },
        {
            question: "Does this work on multisite installations?",
            answer: "Yes, the plugin works on both single-site and multisite WordPress installations. On multisite, monitoring is performed per-site."
        },
        {
            question: "Can I customize the email report schedule?",
            answer: "Yes! You can configure reports to be sent daily, weekly, or monthly. Simply adjust the settings in the plugin's Settings tab."
        },
        {
            question: "Does this plugin collect any data externally?",
            answer: "No. All data is stored locally in your WordPress database. No data is sent to external servers or third-party services."
        }
    ];

    return (
        <main className="bg-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-gray-900 via-green-900 to-blue-900">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                                100% Free
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Hungry Resource Monitor
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                            Monitor memory, CPU, and resource usage. Detect bloat from plugins, themes, and database. Weekly reports and optimization tips.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            <div className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full">
                                <span className="text-green-400">✓</span>
                                <span className="text-white">100% Free</span>
                            </div>
                            <div className="flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-full">
                                <span className="text-blue-400">📊</span>
                                <span className="text-white">Real-time Monitoring</span>
                            </div>
                            <div className="flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-full">
                                <span className="text-purple-400">🧹</span>
                                <span className="text-white">Database Cleanup</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Link
                                href="https://wordpress.org/plugins/hungry-resource-monitor/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 group"
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
                                src="/images/hungry-resource-monitor-banner.webp"
                                alt="Hungry Resource Monitor - WordPress Performance Plugin"
                                width={1024}
                                height={538}
                                className="rounded-2xl"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Use It Section */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-6">
                        Why Monitor Your Resources?
                    </h2>
                    <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
                        WordPress sites can slow down over time. Plugins, themes, and database bloat consume resources silently. Take control with real data.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Identify Resource Hogs</h3>
                            <p className="text-gray-600">Find out which plugins and themes consume the most memory and queries.</p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Clean Database Bloat</h3>
                            <p className="text-gray-600">Remove revisions, drafts, spam, transients, and orphaned data safely.</p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Automated Reports</h3>
                            <p className="text-gray-600">Receive daily, weekly, or monthly performance reports via email.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-20 bg-gray-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                        How It Works
                    </h2>
                    <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-16">
                        Simple setup, powerful insights.
                    </p>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { step: "1", title: "Activate", desc: "Install and activate — tracking begins immediately" },
                            { step: "2", title: "Monitor", desc: "Each page load is analyzed for memory, queries, and time" },
                            { step: "3", title: "Analyze", desc: "View top resource consumers in your dashboard" },
                            { step: "4", title: "Optimize", desc: "Use cleanup tools and reports to improve performance" }
                        ].map((item) => (
                            <div key={item.step} className="text-center">
                                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                    {item.step}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                        Key Features
                    </h2>
                    <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-16">
                        Everything you need to keep WordPress running fast.
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Dashboard & Monitoring",
                                desc: "View top 5 resource consumers at a glance. Real-time memory and query statistics with per-request tracking.",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                )
                            },
                            {
                                title: "Server Limits Display",
                                desc: "PHP memory limits, max execution time, upload limits, and complete server environment overview.",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                                    </svg>
                                )
                            },
                            {
                                title: "Database Cleanup Tools",
                                desc: "Remove revisions, drafts, trashed posts, spam comments, expired transients, and orphaned postmeta.",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                                    </svg>
                                )
                            },
                            {
                                title: "Cron Management",
                                desc: "View all scheduled WordPress cron jobs, identify orphaned crons, and one-click removal of stale events.",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )
                            },
                            {
                                title: "Email Reports",
                                desc: "Configurable daily, weekly, or monthly reports with performance summaries and optimization tips.",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                )
                            },
                            {
                                title: "Unused Asset Detection",
                                desc: "Find and delete inactive plugins and unused themes consuming server space safely.",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                )
                            }
                        ].map((feature) => (
                            <div key={feature.title} className="p-6 rounded-2xl border border-gray-200 hover:border-green-200 hover:shadow-lg transition-all duration-300">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 text-green-600">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                        Perfect For
                    </h2>
                    <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
                        Whether you manage one site or many, resource monitoring helps you stay ahead.
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: "Performance Debugging", desc: "Identify which plugins or themes consume the most resources" },
                            { title: "Database Optimization", desc: "Clean up bloat from revisions, drafts, spam, and orphaned data" },
                            { title: "Server Monitoring", desc: "Keep track of server limits and resource availability" },
                            { title: "Proactive Maintenance", desc: "Receive regular reports before performance issues become critical" },
                            { title: "Site Auditing", desc: "Evaluate resource usage before and after installing new plugins" },
                            { title: "Hosting Optimization", desc: "Make informed decisions about hosting resources based on actual usage" }
                        ].map((useCase) => (
                            <div key={useCase.title} className="bg-white p-6 rounded-xl border border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                                <p className="text-gray-600 text-sm">{useCase.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Installation Section */}
            <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                        Get Started in 2 Minutes
                    </h2>
                    <p className="text-lg text-gray-300 text-center max-w-2xl mx-auto mb-12">
                        No configuration required. Just install, activate, and start monitoring.
                    </p>

                    <div className="space-y-8">
                        {[
                            {
                                step: "1",
                                title: "Install the plugin",
                                desc: "Go to Plugins → Add New in WordPress, search for 'Hungry Resource Monitor', click Install → Activate."
                            },
                            {
                                step: "2",
                                title: "View your dashboard",
                                desc: "Navigate to 'Resource Monitor' in your admin menu to see real-time stats."
                            },
                            {
                                step: "3",
                                title: "Configure settings (optional)",
                                desc: "Set up email reports, configure data retention, and customize to your needs."
                            },
                            {
                                step: "4",
                                title: "Clean up & optimize",
                                desc: "Use the cleanup tools to remove bloat and improve your site's performance."
                            }
                        ].map((item) => (
                            <div key={item.step} className="flex gap-6 items-start">
                                <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-xl font-bold">
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
                            href="https://wordpress.org/plugins/hungry-resource-monitor/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            Download Free Plugin
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
            <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready to optimize your WordPress site?
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Join site owners who proactively monitor and optimize their WordPress performance.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="https://wordpress.org/plugins/hungry-resource-monitor/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg"
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
