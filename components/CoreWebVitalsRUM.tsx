import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FAQ from './FAQ';

export default function CoreWebVitalsRUM() {
    const faqs = [
        {
            question: "How does RUM differ from Google PageSpeed Insights?",
            answer: "PageSpeed Insights uses lab testing from Google's servers. RUM collects data from your actual visitors — their devices, networks, and locations. Google uses real user data in rankings, so RUM shows you what actually matters for SEO."
        },
        {
            question: "Will this affect my site's performance?",
            answer: "Minimal impact. The RUM script is only ~5KB gzipped, loads asynchronously, and sends a single API request per page. Zero blocking time. We've measured negligible difference in Core Web Vitals on sites using the plugin."
        },
        {
            question: "Is my data secure and GDPR compliant?",
            answer: "Yes. All data stays on YOUR server. IP addresses are anonymized (last octet removed). No cookies used. No PII collected. Configurable data retention periods. Full GDPR compliance documentation included."
        },
        {
            question: "Can I integrate with Google Analytics 4?",
            answer: "Absolutely! Enter your GA4 Measurement ID and API Secret, and the plugin sends web_vitals events directly to GA4 with LCP, INP, CLS, FCP, and TTFB values for each pageview."
        },
        {
            question: "What if I have a high-traffic site?",
            answer: "Use the sample rate control. Set it to 10% or 1% to collect meaningful data without overwhelming your database. Even 1% sampling on a high-traffic site gives statistically significant data."
        },
        {
            question: "How often is data collected?",
            answer: "Data is collected in real-time as visitors browse. The dashboard updates immediately. You can view trends over any time period and filter by device type, page, or browser."
        },
        {
            question: "What metrics are tracked?",
            answer: "All 5 Core Web Vitals: LCP (Largest Contentful Paint), INP (Interaction to Next Paint), CLS (Cumulative Layout Shift), FCP (First Contentful Paint), and TTFB (Time to First Byte). Plus device type and connection info."
        }
    ];

    return (
        <main className="bg-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-gray-900 via-green-900 to-teal-900">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <Image
                                src="/images/plugins/cwv-icon.webp"
                                alt="Core Web Vitals RUM Icon"
                                width={64}
                                height={64}
                                className="rounded-xl shadow-lg"
                            />
                            <span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                                Real User Data • Free
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Core Web Vitals RUM
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                            Stop guessing. Start measuring. Get Core Web Vitals data from <strong className="text-white">your actual visitors</strong>, not lab simulations.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            <div className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full">
                                <span className="text-green-400">📊</span>
                                <span className="text-white">5 Core Metrics</span>
                            </div>
                            <div className="flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-full">
                                <span className="text-blue-400">📈</span>
                                <span className="text-white">GA4 Integration</span>
                            </div>
                            <div className="flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-full">
                                <span className="text-purple-400">🔒</span>
                                <span className="text-white">Privacy-First</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Link
                                href="https://wordpress.org/plugins/core-web-vitals-real-user-monitoring-rum/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 group"
                            >
                                <span>Download Free Plugin</span>
                                <span className="group-hover:translate-x-1 transition-transform duration-200">↓</span>
                            </Link>
                            <Link
                                href="#metrics"
                                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
                            >
                                Explore Metrics
                            </Link>
                        </div>
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        <div className="glass rounded-3xl p-4 inline-block">
                            <Image
                                src="/images/plugins/cwv-banner.webp"
                                alt="Core Web Vitals RUM - Real User Monitoring for WordPress"
                                width={772}
                                height={250}
                                className="rounded-2xl"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Lab vs RUM */}
            <section className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-6">
                        The Problem with Lab Testing
                    </h2>
                    <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
                        Google PageSpeed Insights is useful, but it doesn't reflect reality.
                    </p>

                    <div className="overflow-x-auto mb-12">
                        <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
                            <thead>
                                <tr className="bg-gray-900 text-white">
                                    <th className="px-6 py-4 text-left font-semibold">Aspect</th>
                                    <th className="px-6 py-4 text-center font-semibold">Lab Testing (PageSpeed)</th>
                                    <th className="px-6 py-4 text-center font-semibold bg-green-600">Real User Monitoring (RUM)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">Test Location</td>
                                    <td className="px-6 py-4 text-center text-gray-600">One location (Google servers)</td>
                                    <td className="px-6 py-4 text-center bg-green-50 font-medium text-green-700">All visitor locations</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">Device Types</td>
                                    <td className="px-6 py-4 text-center text-gray-600">One simulated device</td>
                                    <td className="px-6 py-4 text-center bg-green-50 font-medium text-green-700">All real devices</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">Network</td>
                                    <td className="px-6 py-4 text-center text-gray-600">Controlled environment</td>
                                    <td className="px-6 py-4 text-center bg-green-50 font-medium text-green-700">Real networks (4G, WiFi, etc.)</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">Frequency</td>
                                    <td className="px-6 py-4 text-center text-gray-600">Single snapshot</td>
                                    <td className="px-6 py-4 text-center bg-green-50 font-medium text-green-700">Continuous monitoring</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">Results</td>
                                    <td className="px-6 py-4 text-center text-gray-600">Synthetic results</td>
                                    <td className="px-6 py-4 text-center bg-green-50 font-medium text-green-700">Actual user experience</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">Used by Google for rankings?</td>
                                    <td className="px-6 py-4 text-center text-red-600 font-bold">No</td>
                                    <td className="px-6 py-4 text-center bg-green-50 font-bold text-green-600">Yes ✓</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="text-center bg-green-50 rounded-2xl p-8">
                        <p className="text-xl text-gray-900">
                            <span className="font-semibold">Google uses Real User data in rankings</span>, not lab data. Shouldn't you measure what matters?
                        </p>
                    </div>
                </div>
            </section>

            {/* Real World Example */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                        Lab vs RUM: Real-World Example
                    </h2>
                    <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
                        Here's what we typically see when comparing lab tests to real user data.
                    </p>

                    <div className="overflow-x-auto mb-8">
                        <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
                            <thead>
                                <tr className="bg-gray-900 text-white">
                                    <th className="px-6 py-4 text-left font-semibold">Metric</th>
                                    <th className="px-6 py-4 text-center font-semibold">PageSpeed (Lab)</th>
                                    <th className="px-6 py-4 text-center font-semibold">RUM (Real)</th>
                                    <th className="px-6 py-4 text-center font-semibold">Difference</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">LCP</td>
                                    <td className="px-6 py-4 text-center text-green-600">1.8s</td>
                                    <td className="px-6 py-4 text-center text-red-600">3.2s</td>
                                    <td className="px-6 py-4 text-center text-red-600 font-bold">+78%</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">INP</td>
                                    <td className="px-6 py-4 text-center text-green-600">120ms</td>
                                    <td className="px-6 py-4 text-center text-red-600">280ms</td>
                                    <td className="px-6 py-4 text-center text-red-600 font-bold">+133%</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">CLS</td>
                                    <td className="px-6 py-4 text-center text-green-600">0.05</td>
                                    <td className="px-6 py-4 text-center text-red-600">0.18</td>
                                    <td className="px-6 py-4 text-center text-red-600 font-bold">+260%</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">FCP</td>
                                    <td className="px-6 py-4 text-center text-green-600">1.2s</td>
                                    <td className="px-6 py-4 text-center text-yellow-600">2.1s</td>
                                    <td className="px-6 py-4 text-center text-red-600 font-bold">+75%</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">TTFB</td>
                                    <td className="px-6 py-4 text-center text-green-600">200ms</td>
                                    <td className="px-6 py-4 text-center text-yellow-600">450ms</td>
                                    <td className="px-6 py-4 text-center text-red-600 font-bold">+125%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Why the difference?</h3>
                        <ul className="space-y-2 text-gray-600">
                            <li className="flex items-start gap-2">
                                <span className="text-green-600">•</span>
                                PageSpeed tests from Google's fast servers
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600">•</span>
                                Your visitors are on mobile 4G (slower)
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600">•</span>
                                Some visitors are in distant countries (higher latency)
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600">•</span>
                                Real devices are often slower than test devices
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Core Web Vitals Explained */}
            <section id="metrics" className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                        Core Web Vitals Explained
                    </h2>
                    <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
                        All 5 metrics that matter for user experience and SEO.
                    </p>

                    <div className="overflow-x-auto mb-12">
                        <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
                            <thead>
                                <tr className="bg-green-600 text-white">
                                    <th className="px-6 py-4 text-left font-semibold">Metric</th>
                                    <th className="px-6 py-4 text-left font-semibold">Full Name</th>
                                    <th className="px-6 py-4 text-left font-semibold">Measures</th>
                                    <th className="px-6 py-4 text-center font-semibold">Good Score</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-bold text-green-600">LCP</td>
                                    <td className="px-6 py-4 text-gray-900">Largest Contentful Paint</td>
                                    <td className="px-6 py-4 text-gray-600">Loading speed</td>
                                    <td className="px-6 py-4 text-center"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">&lt; 2.5s</span></td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-bold text-green-600">INP</td>
                                    <td className="px-6 py-4 text-gray-900">Interaction to Next Paint</td>
                                    <td className="px-6 py-4 text-gray-600">Interactivity</td>
                                    <td className="px-6 py-4 text-center"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">&lt; 200ms</span></td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-bold text-green-600">CLS</td>
                                    <td className="px-6 py-4 text-gray-900">Cumulative Layout Shift</td>
                                    <td className="px-6 py-4 text-gray-600">Visual stability</td>
                                    <td className="px-6 py-4 text-center"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">&lt; 0.1</span></td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-bold text-blue-600">FCP</td>
                                    <td className="px-6 py-4 text-gray-900">First Contentful Paint</td>
                                    <td className="px-6 py-4 text-gray-600">First render</td>
                                    <td className="px-6 py-4 text-center"><span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">&lt; 1.8s</span></td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-bold text-blue-600">TTFB</td>
                                    <td className="px-6 py-4 text-gray-900">Time to First Byte</td>
                                    <td className="px-6 py-4 text-gray-600">Server response</td>
                                    <td className="px-6 py-4 text-center"><span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">&lt; 800ms</span></td>
                                </tr>
                            </tbody>
                        </table>
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
                        Enterprise-grade performance monitoring. Zero cost.
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Comprehensive Dashboard",
                                desc: "Pass/fail status, trend charts, per-page analysis, device breakdown, and browser stats all in one place.",
                                icon: "📊"
                            },
                            {
                                title: "Smart Alerts",
                                desc: "Get notified when LCP, INP, or CLS exceeds your threshold. Immediate, daily, or weekly digest options.",
                                icon: "🔔"
                            },
                            {
                                title: "GA4 Integration",
                                desc: "Send web_vitals events directly to Google Analytics 4 with all metric values for advanced analysis.",
                                icon: "📈"
                            },
                            {
                                title: "Sample Rate Control",
                                desc: "Track 100%, 50%, 10%, or 1% of visitors. Perfect for high-traffic sites.",
                                icon: "🎚️"
                            },
                            {
                                title: "Privacy-First",
                                desc: "IP anonymization, no cookies, no PII. All data stays on YOUR server. Full GDPR compliance.",
                                icon: "🔒"
                            },
                            {
                                title: "Minimal Impact",
                                desc: "Only ~5KB gzipped, async loading, single API request. Zero impact on your Core Web Vitals.",
                                icon: "⚡"
                            }
                        ].map((feature) => (
                            <div key={feature.title} className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-green-200 hover:shadow-lg transition-all duration-300">
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
                        See why Core Web Vitals RUM is the smart choice for WordPress performance monitoring.
                    </p>

                    <div className="overflow-x-auto">
                        <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
                            <thead>
                                <tr className="bg-gray-900 text-white">
                                    <th className="px-6 py-4 text-left font-semibold">Feature</th>
                                    <th className="px-6 py-4 text-center font-semibold bg-green-600">CWV RUM</th>
                                    <th className="px-6 py-4 text-center font-semibold">Lighthouse</th>
                                    <th className="px-6 py-4 text-center font-semibold">Search Console</th>
                                    <th className="px-6 py-4 text-center font-semibold">Paid RUM Tools</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 font-medium text-gray-900">Price</td>
                                    <td className="px-6 py-4 text-center bg-green-50 font-bold text-green-600">Free</td>
                                    <td className="px-6 py-4 text-center text-gray-600">Free</td>
                                    <td className="px-6 py-4 text-center text-gray-600">Free</td>
                                    <td className="px-6 py-4 text-center text-gray-600">$50-500/mo</td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">Real User Data</td>
                                    <td className="px-6 py-4 text-center bg-green-50"><span className="text-green-600 font-bold">✓</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗ Lab only</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-yellow-600">✓ (28-day delay)</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-green-600">✓</span></td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-medium text-gray-900">Instant Data</td>
                                    <td className="px-6 py-4 text-center bg-green-50"><span className="text-green-600 font-bold">✓</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-green-600">✓</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗ 28+ days</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-green-600">✓</span></td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">Per-Page Analysis</td>
                                    <td className="px-6 py-4 text-center bg-green-50"><span className="text-green-600 font-bold">✓</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-green-600">✓</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-green-600">✓</span></td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-medium text-gray-900">Performance Alerts</td>
                                    <td className="px-6 py-4 text-center bg-green-50"><span className="text-green-600 font-bold">✓</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-green-600">✓</span></td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">GA4 Integration</td>
                                    <td className="px-6 py-4 text-center bg-green-50"><span className="text-green-600 font-bold">✓</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-yellow-600">⚠️ Some</span></td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-medium text-gray-900">Data on Your Server</td>
                                    <td className="px-6 py-4 text-center bg-green-50"><span className="text-green-600 font-bold">✓</span></td>
                                    <td className="px-6 py-4 text-center text-gray-400">N/A</td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗ Google</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗ Third party</span></td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">GDPR Compliant</td>
                                    <td className="px-6 py-4 text-center bg-green-50"><span className="text-green-600 font-bold">✓</span></td>
                                    <td className="px-6 py-4 text-center text-gray-400">N/A</td>
                                    <td className="px-6 py-4 text-center"><span className="text-yellow-600">⚠️</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-yellow-600">⚠️</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Privacy Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                        Privacy & GDPR Compliance
                    </h2>
                    <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
                        Your data stays on YOUR server. No third parties, no tracking.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Privacy Features</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <tbody className="divide-y divide-gray-200">
                                        <tr>
                                            <td className="py-3 text-gray-900 font-medium">IP Anonymization</td>
                                            <td className="py-3 text-gray-600">Last octet removed (IPv4)</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 text-gray-900 font-medium">Cookies</td>
                                            <td className="py-3 text-green-600 font-medium">None used</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 text-gray-900 font-medium">PII Collection</td>
                                            <td className="py-3 text-green-600 font-medium">None</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 text-gray-900 font-medium">Data Location</td>
                                            <td className="py-3 text-gray-600">Your server only</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 text-gray-900 font-medium">Data Retention</td>
                                            <td className="py-3 text-gray-600">Configurable 1-365 days</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">GDPR Compliance Checklist</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <span className="text-green-600 font-bold">✓</span>
                                    <span className="text-gray-600"><strong>Lawful basis:</strong> Legitimate interest (performance monitoring)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-green-600 font-bold">✓</span>
                                    <span className="text-gray-600"><strong>Data minimization:</strong> Only performance data collected</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-green-600 font-bold">✓</span>
                                    <span className="text-gray-600"><strong>Storage limitation:</strong> Configurable retention periods</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-green-600 font-bold">✓</span>
                                    <span className="text-gray-600"><strong>No third parties:</strong> Data stays on your server</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-green-600 font-bold">✓</span>
                                    <span className="text-gray-600"><strong>Opt-out option:</strong> Admin can disable collection</span>
                                </li>
                            </ul>
                        </div>
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
                        Simple setup. Immediate insights.
                    </p>

                    <div className="space-y-8">
                        {[
                            {
                                step: "1",
                                title: "Install the plugin",
                                desc: "Go to Plugins → Add New, search for 'Core Web Vitals RUM', click Install → Activate."
                            },
                            {
                                step: "2",
                                title: "Configure settings",
                                desc: "Go to Core Web Vitals in admin menu. Set your sample rate and alert thresholds."
                            },
                            {
                                step: "3",
                                title: "Optional: Connect GA4",
                                desc: "Add your GA4 Measurement ID and API Secret to send data to Google Analytics."
                            },
                            {
                                step: "4",
                                title: "Start monitoring",
                                desc: "Visit your website to begin collecting data. Check the dashboard for real-time insights."
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
                            href="https://wordpress.org/plugins/core-web-vitals-real-user-monitoring-rum/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25"
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
            <section className="py-20 bg-gradient-to-r from-green-600 to-teal-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Stop Guessing. Start Measuring.
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Join thousands of WordPress sites using real user data to improve performance and SEO.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="https://wordpress.org/plugins/core-web-vitals-real-user-monitoring-rum/"
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
