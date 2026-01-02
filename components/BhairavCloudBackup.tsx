import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FAQ from './FAQ';

export default function BhairavCloudBackup() {
    const faqs = [
        {
            question: "Is there a backup size limit?",
            answer: "No! Bhairav Scheduled Cloud Backup has zero file size limits. It uses chunked uploads to handle backups of any size, making it perfect for large WooCommerce stores, media-heavy sites, and enterprise installations."
        },
        {
            question: "Can I backup to multiple cloud providers simultaneously?",
            answer: "Yes! The plugin supports multi-cloud redundancy. You can upload the same backup to AWS S3, Google Drive, Dropbox, and more at the same time. If one provider fails, your backup is still safe on the others."
        },
        {
            question: "What cloud storage providers are supported?",
            answer: "The plugin supports S3-compatible storage (AWS, DigitalOcean, Wasabi), Google Drive, Dropbox, OneDrive, and any service that uses OAuth 2.0 or token-based authentication."
        },
        {
            question: "Will backups slow down my site?",
            answer: "No. Backups run in the background using WordPress cron. The plugin uses batch processing and chunked uploads to minimize server load. Your visitors won't notice any performance impact."
        },
        {
            question: "Can I restore from a backup?",
            answer: "Yes. Each backup includes download links valid for 24-48 hours. You can restore by uploading files via FTP and importing the database SQL file through phpMyAdmin or your host's database tools."
        },
        {
            question: "Is the plugin really 100% free?",
            answer: "Absolutely! No premium version, no feature locks, no upsells. All features including multi-cloud support, scheduling, auto-cleanup, and email notifications are completely free."
        },
        {
            question: "Does it work with multisite?",
            answer: "Currently the plugin is designed for single-site installations. Multisite support is on the roadmap for a future release."
        }
    ];

    return (
        <main className="bg-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <Image
                                src="/images/plugins/bhairav-icon.gif"
                                alt="Bhairav Scheduled Cloud Backup Icon"
                                width={64}
                                height={64}
                                className="rounded-xl shadow-lg"
                                unoptimized
                            />
                            <span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                                100% Free • No Limits
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Bhairav Scheduled Cloud Backup
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                            Never lose your WordPress site again. Automated backups to multiple cloud providers with <strong className="text-white">zero file size limits</strong>.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            <div className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full">
                                <span className="text-green-400">☁️</span>
                                <span className="text-white">Multi-Cloud</span>
                            </div>
                            <div className="flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-full">
                                <span className="text-blue-400">📅</span>
                                <span className="text-white">Auto-Scheduled</span>
                            </div>
                            <div className="flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-full">
                                <span className="text-purple-400">🧹</span>
                                <span className="text-white">Auto-Cleanup</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Link
                                href="https://wordpress.org/plugins/bhairav-scheduled-cloud-backup/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 group"
                            >
                                <span>Download Free Plugin</span>
                                <span className="group-hover:translate-x-1 transition-transform duration-200">↓</span>
                            </Link>
                            <Link
                                href="#features"
                                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
                            >
                                Explore Features
                            </Link>
                        </div>
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        <div className="glass rounded-3xl p-4 inline-block">
                            <Image
                                src="/images/plugins/bhairav-banner.webp"
                                alt="Bhairav Scheduled Cloud Backup - Multi-cloud WordPress backups"
                                width={1024}
                                height={332}
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
                        Why Most Backup Solutions Fall Short
                    </h2>
                    <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
                        Common problems with existing backup plugins that leave your site vulnerable.
                    </p>

                    <div className="overflow-x-auto mb-12">
                        <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
                            <thead>
                                <tr className="bg-red-600 text-white">
                                    <th className="px-6 py-4 text-left font-semibold">Common Problem</th>
                                    <th className="px-6 py-4 text-left font-semibold">Impact on Your Site</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">File size limits</td>
                                    <td className="px-6 py-4 text-gray-600">Large sites can't backup completely</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">Single cloud storage</td>
                                    <td className="px-6 py-4 text-gray-600">Single point of failure = total loss</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">Manual-only backups</td>
                                    <td className="px-6 py-4 text-gray-600">Human error = forgotten backups</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">No cleanup policy</td>
                                    <td className="px-6 py-4 text-gray-600">Storage costs explode over time</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">Complex setup</td>
                                    <td className="px-6 py-4 text-gray-600">Hours wasted on configuration</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="text-center">
                        <p className="text-xl text-gray-900 font-semibold">
                            Bhairav Scheduled Cloud Backup <span className="text-green-600">solves all of these</span>.
                        </p>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="features" className="py-20 bg-gray-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                        How It Works
                    </h2>
                    <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-16">
                        Set it and forget it. Your backups run automatically on schedule.
                    </p>

                    <div className="grid md:grid-cols-4 gap-8 mb-16">
                        {[
                            { step: "1", title: "Schedule", desc: "Set daily, weekly, fortnightly, or monthly backups", icon: "⏰" },
                            { step: "2", title: "Create", desc: "Plugin creates archive of files, database, or both", icon: "📦" },
                            { step: "3", title: "Upload", desc: "Backup uploads to your cloud storage providers", icon: "☁️" },
                            { step: "4", title: "Cleanup", desc: "Old backups auto-deleted per your retention policy", icon: "🧹" }
                        ].map((item) => (
                            <div key={item.step} className="text-center bg-white rounded-2xl p-6 shadow-lg">
                                <div className="text-4xl mb-4">{item.icon}</div>
                                <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                                    {item.step}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Backup Types */}
            <section className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                        Backup Types
                    </h2>
                    <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
                        Choose the right backup type for your needs.
                    </p>

                    <div className="overflow-x-auto mb-12">
                        <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
                            <thead>
                                <tr className="bg-indigo-600 text-white">
                                    <th className="px-6 py-4 text-left font-semibold">Type</th>
                                    <th className="px-6 py-4 text-left font-semibold">What's Included</th>
                                    <th className="px-6 py-4 text-left font-semibold">Best For</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        <span className="inline-flex items-center gap-2">📁 Files Only</span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">Themes, plugins, uploads, core files</td>
                                    <td className="px-6 py-4 text-gray-600">Quick file recovery</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        <span className="inline-flex items-center gap-2">🗄️ Database Only</span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">All MySQL tables as SQL export</td>
                                    <td className="px-6 py-4 text-gray-600">Content/settings recovery</td>
                                </tr>
                                <tr className="hover:bg-gray-50 bg-green-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        <span className="inline-flex items-center gap-2">📦 Both</span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">Complete site (files + database)</td>
                                    <td className="px-6 py-4 text-green-700 font-semibold">Full disaster recovery ✓</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">Scheduling Options</h3>

                    <div className="overflow-x-auto">
                        <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
                            <thead>
                                <tr className="bg-gray-900 text-white">
                                    <th className="px-6 py-4 text-left font-semibold">Frequency</th>
                                    <th className="px-6 py-4 text-left font-semibold">When It Runs</th>
                                    <th className="px-6 py-4 text-left font-semibold">Best For</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">Daily</td>
                                    <td className="px-6 py-4 text-gray-600">Every day at your specified time</td>
                                    <td className="px-6 py-4 text-gray-600">High-traffic sites, e-commerce</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">Weekly</td>
                                    <td className="px-6 py-4 text-gray-600">Once per week</td>
                                    <td className="px-6 py-4 text-gray-600">Content sites, blogs</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">Fortnightly</td>
                                    <td className="px-6 py-4 text-gray-600">Every 15 days</td>
                                    <td className="px-6 py-4 text-gray-600">Low-change sites</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">Monthly</td>
                                    <td className="px-6 py-4 text-gray-600">Once per month</td>
                                    <td className="px-6 py-4 text-gray-600">Archive sites</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Cloud Storage Support */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                        Multi-Cloud Storage Support
                    </h2>
                    <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
                        Upload to multiple providers simultaneously. True redundancy.
                    </p>

                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-4 flex-wrap justify-center">
                                <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-semibold">AWS S3</span>
                                <span className="text-gray-400">+</span>
                                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">Google Drive</span>
                                <span className="text-gray-400">+</span>
                                <span className="bg-sky-100 text-sky-700 px-4 py-2 rounded-full font-semibold">Dropbox</span>
                                <span className="text-gray-400">+</span>
                                <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-semibold">OneDrive</span>
                            </div>
                            <p className="text-gray-600 mt-4">If one provider fails, your backup is safe on the others.</p>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
                            <thead>
                                <tr className="bg-indigo-600 text-white">
                                    <th className="px-6 py-4 text-left font-semibold">Storage Type</th>
                                    <th className="px-6 py-4 text-left font-semibold">Authentication</th>
                                    <th className="px-6 py-4 text-left font-semibold">Setup Difficulty</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">S3-Compatible (AWS, DO, Wasabi)</td>
                                    <td className="px-6 py-4 text-gray-600">Access Key + Secret Key</td>
                                    <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">Easy</span></td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">Azure Blob Storage</td>
                                    <td className="px-6 py-4 text-gray-600">Account Name + Key</td>
                                    <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">Easy</span></td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">OAuth 2.0 Services (Google, Dropbox)</td>
                                    <td className="px-6 py-4 text-gray-600">Client ID + Secret + OAuth</td>
                                    <td className="px-6 py-4"><span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">Medium</span></td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">Token-Based</td>
                                    <td className="px-6 py-4 text-gray-600">Access Token</td>
                                    <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">Easy</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Key Features */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                        Key Features
                    </h2>
                    <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-16">
                        Enterprise-grade backup capabilities. Zero cost.
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "No File Size Limits",
                                desc: "Chunked uploads handle backups of any size. Large WooCommerce stores? No problem.",
                                icon: "📦"
                            },
                            {
                                title: "Multi-Cloud Redundancy",
                                desc: "Upload to AWS, Google Drive, Dropbox, and more simultaneously. True disaster protection.",
                                icon: "☁️"
                            },
                            {
                                title: "Flexible Scheduling",
                                desc: "Daily, weekly, fortnightly, or monthly. Plus manual backups anytime from admin.",
                                icon: "📅"
                            },
                            {
                                title: "Auto-Cleanup",
                                desc: "Set retention policies. Old backups auto-deleted from local storage and cloud.",
                                icon: "🧹"
                            },
                            {
                                title: "Email Notifications",
                                desc: "Get notified when backups complete with status, size, and download links.",
                                icon: "📧"
                            },
                            {
                                title: "Secure by Design",
                                desc: "OAuth 2.0 support, encrypted storage, .htaccess protection, SQL injection prevention.",
                                icon: "🔒"
                            }
                        ].map((feature) => (
                            <div key={feature.title} className="p-6 rounded-2xl border border-gray-200 hover:border-indigo-200 hover:shadow-lg transition-all duration-300">
                                <div className="text-4xl mb-4">{feature.icon}</div>
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
                        See how Bhairav Backup stacks up against popular backup solutions.
                    </p>

                    <div className="overflow-x-auto">
                        <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
                            <thead>
                                <tr className="bg-gray-900 text-white">
                                    <th className="px-6 py-4 text-left font-semibold">Feature</th>
                                    <th className="px-6 py-4 text-center font-semibold bg-indigo-600">Bhairav Backup</th>
                                    <th className="px-6 py-4 text-center font-semibold">UpdraftPlus</th>
                                    <th className="px-6 py-4 text-center font-semibold">BackupBuddy</th>
                                    <th className="px-6 py-4 text-center font-semibold">VaultPress</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 font-medium text-gray-900">Price</td>
                                    <td className="px-6 py-4 text-center bg-indigo-50 font-bold text-green-600">Free Forever</td>
                                    <td className="px-6 py-4 text-center text-gray-600">Free/$70/yr</td>
                                    <td className="px-6 py-4 text-center text-gray-600">$80/yr</td>
                                    <td className="px-6 py-4 text-center text-gray-600">$120/yr</td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">File Size Limit</td>
                                    <td className="px-6 py-4 text-center bg-indigo-50"><span className="text-green-600 font-bold">✓ None</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-yellow-600">⚠️ 512MB free</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-green-600">✓</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-green-600">✓</span></td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-medium text-gray-900">Multi-Cloud Simultaneous</td>
                                    <td className="px-6 py-4 text-center bg-indigo-50"><span className="text-green-600 font-bold">✓</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-yellow-600">⚠️ One at a time</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">Scheduling</td>
                                    <td className="px-6 py-4 text-center bg-indigo-50"><span className="text-green-600 font-bold">✓ 4 options</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-green-600">✓</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-green-600">✓</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-green-600">✓</span></td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-medium text-gray-900">Auto-Cleanup</td>
                                    <td className="px-6 py-4 text-center bg-indigo-50"><span className="text-green-600 font-bold">✓</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-yellow-600">⚠️ Premium</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-green-600">✓</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-green-600">✓</span></td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">Email Notifications</td>
                                    <td className="px-6 py-4 text-center bg-indigo-50"><span className="text-green-600 font-bold">✓</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-yellow-600">⚠️ Premium</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-green-600">✓</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-green-600">✓</span></td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-medium text-gray-900">OAuth Support</td>
                                    <td className="px-6 py-4 text-center bg-indigo-50"><span className="text-green-600 font-bold">✓</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                                    <td className="px-6 py-4 text-center"><span className="text-red-500">✗</span></td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">Chunked Uploads</td>
                                    <td className="px-6 py-4 text-center bg-indigo-50"><span className="text-green-600 font-bold">✓</span></td>
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
                        Clean admin interface with everything you need to manage backups.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="group">
                            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 transition-all duration-300 group-hover:shadow-xl group-hover:border-indigo-200">
                                <Image
                                    src="/images/plugins/bhairav-ss-1.webp"
                                    alt="Bhairav Backup Dashboard"
                                    width={400}
                                    height={300}
                                    className="w-full h-auto"
                                />
                            </div>
                            <p className="text-center text-gray-600 mt-4 text-sm">Dashboard & Scheduling</p>
                        </div>
                        <div className="group">
                            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 transition-all duration-300 group-hover:shadow-xl group-hover:border-indigo-200">
                                <Image
                                    src="/images/plugins/bhairav-ss-2.webp"
                                    alt="Cloud Storage Settings"
                                    width={400}
                                    height={300}
                                    className="w-full h-auto"
                                />
                            </div>
                            <p className="text-center text-gray-600 mt-4 text-sm">Cloud Storage Settings</p>
                        </div>
                        <div className="group">
                            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 transition-all duration-300 group-hover:shadow-xl group-hover:border-indigo-200">
                                <Image
                                    src="/images/plugins/bhairav-ss-3.webp"
                                    alt="Backup List"
                                    width={400}
                                    height={300}
                                    className="w-full h-auto"
                                />
                            </div>
                            <p className="text-center text-gray-600 mt-4 text-sm">Backup Creation</p>
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
                        Simple setup with no complicated configuration.
                    </p>

                    <div className="space-y-8">
                        {[
                            {
                                step: "1",
                                title: "Install the plugin",
                                desc: "Go to Plugins → Add New, search for 'Bhairav Scheduled Cloud Backup', click Install → Activate."
                            },
                            {
                                step: "2",
                                title: "Configure cloud storage",
                                desc: "Go to Bhairav Backup in admin menu, add your cloud storage credentials (S3, Google Drive, Dropbox, etc.)."
                            },
                            {
                                step: "3",
                                title: "Set your schedule",
                                desc: "Choose daily, weekly, fortnightly, or monthly backups. Set the time that works best for your site."
                            },
                            {
                                step: "4",
                                title: "Set retention policy",
                                desc: "Configure how long to keep backups. Old ones are automatically deleted from local and cloud storage."
                            }
                        ].map((item) => (
                            <div key={item.step} className="flex gap-6 items-start">
                                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-xl font-bold">
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
                            href="https://wordpress.org/plugins/bhairav-scheduled-cloud-backup/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25"
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
            <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Never lose your WordPress site again
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Join thousands of WordPress site owners who sleep better knowing their sites are backed up to the cloud.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="https://wordpress.org/plugins/bhairav-scheduled-cloud-backup/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg"
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
