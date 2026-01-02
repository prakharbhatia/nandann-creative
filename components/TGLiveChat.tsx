import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FAQ from './FAQ';

export default function TGLiveChat() {
    const faqs = [
        {
            question: "Is TG Live Chat really free?",
            answer: "Yes, completely free. The plugin is free, Telegram's Bot API is free, and there are no hidden costs or premium tiers. You get all features at no charge."
        },
        {
            question: "Do I need to keep WordPress admin open to reply?",
            answer: "No! That's the beauty of it. You reply directly from your Telegram app on your phone or desktop. No need to log into WordPress at all."
        },
        {
            question: "Can customers see my personal Telegram ID?",
            answer: "No. Customers only communicate with your bot. Your personal Telegram account and ID remain completely private."
        },
        {
            question: "Does it work with caching plugins?",
            answer: "Yes! The chat widget loads via JavaScript and doesn't interfere with page caching. Works perfectly with WP Rocket, W3 Total Cache, and others."
        },
        {
            question: "Can I have multiple support agents?",
            answer: "Absolutely. Enter multiple Telegram chat IDs (comma-separated), and all agents receive customer messages simultaneously. Anyone can reply."
        },
        {
            question: "What happens to customer data?",
            answer: "You're in control. Customer data stays on YOUR server (not ours). You can disable storage entirely, or set auto-delete after a configurable number of days."
        },
        {
            question: "Does it slow down my website?",
            answer: "Negligible impact. The plugin adds only ~30KB (minified CSS + JS) and loads asynchronously. We measured 0ms difference in Core Web Vitals."
        }
    ];

    return (
        <main className="bg-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <Image
                                src="/images/tg-live-chat-icon.jpg"
                                alt="TG Live Chat Icon"
                                width={64}
                                height={64}
                                className="rounded-xl shadow-lg"
                            />
                            <span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                                100% Free
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            TG Live Chat
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                            Instant customer support via Telegram. Your visitors chat on your website — you reply from your phone.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            <div className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full">
                                <span className="text-green-400">✓</span>
                                <span className="text-white">100% Free</span>
                            </div>
                            <div className="flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-full">
                                <span className="text-blue-400">📱</span>
                                <span className="text-white">Reply from Phone</span>
                            </div>
                            <div className="flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-full">
                                <span className="text-purple-400">🔒</span>
                                <span className="text-white">Privacy-First</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Link
                                href="https://wordpress.org/plugins/tg-live-chat/"
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
                                src="/images/tg-live-chat-banner.png"
                                alt="TG Live Chat - Customer support via Telegram"
                                width={1024}
                                height={300}
                                className="rounded-2xl"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Telegram Section */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-6">
                        Why Telegram?
                    </h2>
                    <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
                        Telegram has <strong>800+ million monthly active users</strong>. Chances are, you already use it for team communication, client discussions, and business bots. Why not use it for customer support too?
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-[#0088cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Reply from anywhere</h3>
                            <p className="text-gray-600">Your phone, tablet, or desktop. Telegram works everywhere.</p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Completely free</h3>
                            <p className="text-gray-600">Telegram's Bot API is free with no message limits for typical business use.</p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant delivery</h3>
                            <p className="text-gray-600">Messages arrive in real-time via webhooks. No delays.</p>
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
                        Simple, straightforward, and it just works.
                    </p>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { step: "1", title: "Customer starts chat", desc: "Visitor fills in their name and email on your website" },
                            { step: "2", title: "Message to Telegram", desc: "Their message is sent instantly to your Telegram app" },
                            { step: "3", title: "You reply", desc: "Reply directly from Telegram — no need to open WordPress" },
                            { step: "4", title: "Customer receives", desc: "Your reply appears in the website chat widget" }
                        ].map((item) => (
                            <div key={item.step} className="text-center">
                                <div className="w-12 h-12 bg-[#0088cc] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
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
                        Everything you need. Nothing you don't.
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Privacy-First",
                                desc: "Your data stays on YOUR server. We never see it. No external tracking, no third-party analytics.",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                )
                            },
                            {
                                title: "Multi-Admin Support",
                                desc: "Running a team? Enter multiple chat IDs and everyone receives messages simultaneously.",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                )
                            },
                            {
                                title: "Customizable Widget",
                                desc: "3 beautiful skins (Default, Dark, Light). Custom name, avatar, welcome message, and position.",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                    </svg>
                                )
                            },
                            {
                                title: "Auto-Delete Data",
                                desc: "Set customer data to automatically delete after X days. GDPR-friendly by default.",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                )
                            },
                            {
                                title: "Page Exclusions",
                                desc: "Don't want the chat on certain pages? Exclude them with a simple comma-separated list.",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                    </svg>
                                )
                            },
                            {
                                title: "Lightweight",
                                desc: "Just ~30KB total. Loads asynchronously. Zero impact on your Core Web Vitals.",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                )
                            }
                        ].map((feature) => (
                            <div key={feature.title} className="p-6 rounded-2xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 text-[#0088cc]">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                        How Does It Compare?
                    </h2>
                    <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
                        See how TG Live Chat stacks up against popular live chat solutions.
                    </p>

                    <div className="overflow-x-auto">
                        <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
                            <thead>
                                <tr className="bg-gray-900 text-white">
                                    <th className="px-6 py-4 text-left font-semibold">Feature</th>
                                    <th className="px-6 py-4 text-center font-semibold bg-[#0088cc]">TG Live Chat</th>
                                    <th className="px-6 py-4 text-center font-semibold">LiveChat</th>
                                    <th className="px-6 py-4 text-center font-semibold">Tidio</th>
                                    <th className="px-6 py-4 text-center font-semibold">Zendesk</th>
                                    <th className="px-6 py-4 text-center font-semibold">Crisp</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 font-medium text-gray-900">Monthly Cost</td>
                                    <td className="px-6 py-4 text-center bg-blue-50 font-semibold text-green-600">Free</td>
                                    <td className="px-6 py-4 text-center text-gray-600">$20+/agent</td>
                                    <td className="px-6 py-4 text-center text-gray-600">$29+/month</td>
                                    <td className="px-6 py-4 text-center text-gray-600">$49+/agent</td>
                                    <td className="px-6 py-4 text-center text-gray-600">$25+/month</td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">Reply from phone</td>
                                    <td className="px-6 py-4 text-center bg-blue-50"><span className="text-green-600 font-bold">✓</span> Telegram</td>
                                    <td className="px-6 py-4 text-center"><span className="text-green-600">✓</span> App</td>
                                    <td className="px-6 py-4 text-center"><span className="text-green-600">✓</span> App</td>
                                    <td className="px-6 py-4 text-center"><span className="text-green-600">✓</span> App</td>
                                    <td className="px-6 py-4 text-center"><span className="text-green-600">✓</span> App</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-medium text-gray-900">No separate app needed</td>
                                    <td className="px-6 py-4 text-center bg-blue-50"><span className="text-green-600 font-bold">✓</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">Data stays on your server</td>
                                    <td className="px-6 py-4 text-center bg-blue-50"><span className="text-green-600 font-bold">✓</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-medium text-gray-900">GDPR compliant by default</td>
                                    <td className="px-6 py-4 text-center bg-blue-50"><span className="text-green-600 font-bold">✓</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-yellow-500">⚠️</span> Config</td>
                                    <td className="px-6 py-4 text-center"><span className="text-yellow-500">⚠️</span> Config</td>
                                    <td className="px-6 py-4 text-center"><span className="text-yellow-500">⚠️</span> Config</td>
                                    <td className="px-6 py-4 text-center"><span className="text-yellow-500">⚠️</span> Config</td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">Auto-delete customer data</td>
                                    <td className="px-6 py-4 text-center bg-blue-50"><span className="text-green-600 font-bold">✓</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-medium text-gray-900">No external tracking</td>
                                    <td className="px-6 py-4 text-center bg-blue-50"><span className="text-green-600 font-bold">✓</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">Multiple admin support</td>
                                    <td className="px-6 py-4 text-center bg-blue-50"><span className="text-green-600 font-bold">✓</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-green-600">✓</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-green-600">✓</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-green-600">✓</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-green-600">✓</span></td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-medium text-gray-900">Customizable widget</td>
                                    <td className="px-6 py-4 text-center bg-blue-50"><span className="text-green-600 font-bold">✓</span> 3 skins</td>
                                    <td className="px-6 py-4 text-center"><span className="text-green-600">✓</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-green-600">✓</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-green-600">✓</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-green-600">✓</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Screenshots Section */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                        See It In Action
                    </h2>
                    <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
                        Clean admin interface, organized chat history, and seamless Telegram integration.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="group">
                            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 transition-all duration-300 group-hover:shadow-xl group-hover:border-blue-200">
                                <Image
                                    src="/images/tg-live-chat-screenshot-1.png"
                                    alt="TG Live Chat Settings Page"
                                    width={400}
                                    height={300}
                                    className="w-full h-auto"
                                />
                            </div>
                            <p className="text-center text-gray-600 mt-4 text-sm">Settings & Configuration</p>
                        </div>
                        <div className="group">
                            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 transition-all duration-300 group-hover:shadow-xl group-hover:border-blue-200">
                                <Image
                                    src="/images/tg-live-chat-screenshot-2.png"
                                    alt="TG Live Chat History"
                                    width={400}
                                    height={300}
                                    className="w-full h-auto"
                                />
                            </div>
                            <p className="text-center text-gray-600 mt-4 text-sm">Chat History Dashboard</p>
                        </div>
                        <div className="group">
                            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 transition-all duration-300 group-hover:shadow-xl group-hover:border-blue-200">
                                <Image
                                    src="/images/tg-live-chat-screenshot-3.png"
                                    alt="TG Live Chat Telegram App"
                                    width={400}
                                    height={300}
                                    className="w-full h-auto"
                                />
                            </div>
                            <p className="text-center text-gray-600 mt-4 text-sm">Reply from Telegram App</p>
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
                        No complicated setup. No API keys to purchase. Just follow these simple steps.
                    </p>

                    <div className="space-y-8">
                        {[
                            {
                                step: "1",
                                title: "Create your Telegram Bot",
                                desc: "Open Telegram, search for @BotFather, send /newbot, follow the prompts, and copy your API token."
                            },
                            {
                                step: "2",
                                title: "Get your Chat ID",
                                desc: "Search for @userinfobot in Telegram, start a conversation, and copy your Chat ID."
                            },
                            {
                                step: "3",
                                title: "Install the plugin",
                                desc: "Go to Plugins → Add New in WordPress, search for 'TG Live Chat', click Install → Activate."
                            },
                            {
                                step: "4",
                                title: "Configure & go live",
                                desc: "Go to TG Live Chat in admin menu, paste your Bot API Key and Chat ID, click Save. Done!"
                            }
                        ].map((item) => (
                            <div key={item.step} className="flex gap-6 items-start">
                                <div className="flex-shrink-0 w-12 h-12 bg-[#0088cc] rounded-full flex items-center justify-center text-xl font-bold">
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
                            href="https://wordpress.org/plugins/tg-live-chat/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-[#0088cc] hover:bg-[#0077b5] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
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
            <section className="py-20 bg-gradient-to-r from-[#0088cc] to-[#0077b5]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready to simplify your customer support?
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Join thousands of WordPress site owners who reply to customers from their favorite messaging app.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="https://wordpress.org/plugins/tg-live-chat/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-white text-[#0088cc] px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg"
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
