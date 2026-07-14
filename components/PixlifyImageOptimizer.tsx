import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FAQ from './FAQ';

const PAYPAL_URL = 'https://paypal.me/NANDANNC/240usd';

function PurchaseForm({ idPrefix, dark }: { idPrefix: string; dark?: boolean }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!name.trim() || !email.trim() || loading) return;
        setLoading(true);
        try {
            // Capture lead before redirect — fires even for abandoned checkouts
            await fetch('/api/pixlify-lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase(), source: idPrefix }),
            });
        } catch (_) {
            // Never block the user on a network error
        }
        window.open(PAYPAL_URL, '_blank', 'noopener,noreferrer');
        setLoading(false);
    }

    const inputClass = dark
        ? 'w-full px-4 py-3 rounded-xl bg-white/10 border border-white/25 text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:bg-white/15 transition-all text-sm'
        : 'w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-500 transition-all text-sm bg-white';

    return (
        <form id={`${idPrefix}-form`} onSubmit={handleSubmit} className="space-y-3 w-full">
            <input
                id={`${idPrefix}-name`}
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={inputClass}
            />
            <input
                id={`${idPrefix}-email`}
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={inputClass}
            />
            <button
                id={`${idPrefix}-submit`}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 disabled:opacity-70 disabled:cursor-not-allowed text-white px-8 py-3.5 rounded-xl font-bold text-base transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 flex items-center justify-center gap-2"
            >
                {loading ? 'Redirecting to PayPal…' : 'Buy Now via PayPal →'}
            </button>
            <p className={`text-center text-xs ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                Secure payment via PayPal · Plugin access within 24&nbsp;hours
            </p>
        </form>
    );
}

export default function PixlifyImageOptimizer() {
    const faqs = [
        {
            question: "Does it work on WP Engine and Kinsta?",
            answer: "Yes. That's actually the main reason we built it. WP Engine and Kinsta don't let you modify .htaccess or nginx config, so the usual WebP rewrite rules don't work there. Pixlify rewrites image URLs at the PHP level using WordPress's output buffer — no server config changes needed at all."
        },
        {
            question: "Does it handle Elementor background images?",
            answer: "Yes, all three layers. Inline CSS in style= attributes, external CSS files (Elementor's External File print method), and backgrounds set dynamically by JavaScript at runtime. The last one is the hard one — Elementor's Background Slideshow widget creates inline styles via JS, which means most plugins never touch it. We use a MutationObserver for that."
        },
        {
            question: "What image formats does it convert to?",
            answer: "WebP, AVIF, or both. WebP works in every modern browser and has since 2020. AVIF gives better compression but requires Imagick with libavif on your server. If your server supports it, we recommend serving both — AVIF for browsers that support it, WebP as fallback, original as last resort."
        },
        {
            question: "Will it break my existing image URLs?",
            answer: "No. The plugin rewrites URLs in the HTML output buffer — it never touches your database, your media files, or your content. The original JPEG and PNG files stay in place. You can disable the plugin and everything goes back to normal."
        },
        {
            question: "What happens to my original files?",
            answer: "They stay. The plugin creates .webp and/or .avif copies alongside your originals. It does not delete or replace anything unless you explicitly ask it to. You can also enable backups before conversion."
        },
        {
            question: "Does it work with caching plugins?",
            answer: "Yes. Just purge your page cache after enabling URL rewriting so browsers receive the updated HTML. Works with WP Rocket, W3 Total Cache, WP Super Cache, and WP Engine's built-in cache."
        },
        {
            question: "Can I use it with WP-CLI?",
            answer: "Yes. The plugin comes with full WP-CLI support. You can run wp pixlify optimize, check status, build or clear the queue, reset conversion history, and update settings — all from the command line. Useful for scheduled tasks and deployments."
        },
        {
            question: "Is this available on WordPress.org?",
            answer: "No. This plugin is not listed on WordPress.org. It's available directly from us at $20/month (billed yearly) for unlimited sites and unlimited image credits. You can start a free trial — reach out through the contact page and we'll get you set up."
        }
    ];

    return (
        <main>

            {/* Hero */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-gray-900 via-green-900 to-purple-900">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center mb-12">
                        <div className="inline-block px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-medium mb-6">
                            Works on all major hosting
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Pixlify Image Optimizer
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-4 leading-relaxed">
                            Converts your WordPress images to AVIF and WebP. Serves them to every browser. On every host.
                        </p>
                        <p className="text-base text-gray-400 max-w-2xl mx-auto mb-10">
                            Including the ones where .htaccess rules are off the table.
                        </p>

                        {/* Hero purchase form */}
                        <div className="mb-14 max-w-md mx-auto w-full">
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                                <p className="text-white font-bold text-lg text-center mb-1">Get Pixlify — 1&nbsp;Year</p>
                                <p className="text-green-300 text-sm text-center mb-4">$240/yr · Unlimited sites · All features</p>
                                <PurchaseForm idPrefix="hero" dark />
                            </div>
                            <div className="mt-4 text-center">
                                <Link
                                    href="#how-it-works"
                                    className="text-white/60 hover:text-white text-sm transition-colors"
                                >
                                    See how it works ↓
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        <div className="glass rounded-3xl p-4 inline-block w-full">
                            <Image
                                src="/images/pixlify-image-optimizer-banner.webp"
                                alt="Pixlify Image Optimizer — WordPress plugin dashboard"
                                width={1500}
                                height={486}
                                className="rounded-2xl w-full h-auto"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="py-16 bg-gray-950">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-10">

                        {/* Price block */}
                        <div className="text-center md:text-left">
                            <p className="text-sm text-green-400 font-semibold uppercase tracking-widest mb-2">Simple pricing</p>
                            <div className="flex items-end gap-2 justify-center md:justify-start">
                                <span className="text-6xl font-black text-white">$20</span>
                                <div className="mb-2">
                                    <span className="text-gray-400 text-lg">/month</span>
                                    <p className="text-xs text-gray-500">billed yearly — $240/yr</p>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="hidden md:block w-px h-24 bg-white/10"></div>

                        {/* What you get */}
                        <div className="flex flex-col gap-3 flex-1">
                            {[
                                'Unlimited sites',
                                'Unlimited image credits',
                                'All features included — no tiers',
                                'AVIF + WebP conversion',
                                'WP-CLI access',
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-3">
                                    <span className="text-green-400 font-bold text-sm">✓</span>
                                    <span className="text-gray-300 text-sm">{item}</span>
                                </div>
                            ))}
                        </div>

                        {/* Pricing purchase form */}
                        <div className="w-full max-w-[220px]">
                            <PurchaseForm idPrefix="pricing" />
                        </div>

                    </div>
                </div>
            </section>

            {/* Comparison Table — moved up, just below banner */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                        How it compares
                    </h2>
                    <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-4">
                        There are good image optimizer plugins out there. Here&apos;s an honest look at where the differences actually matter.
                    </p>
                    <p className="text-sm text-gray-500 text-center max-w-2xl mx-auto mb-12">
                        We built Pixlify so we&apos;re obviously biased. No affiliate links. No paid placements. Data based on public documentation and our own testing. Read it with that context.
                    </p>

                    <div className="overflow-x-auto">
                        <table className="w-full bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200">
                            <thead>
                                <tr className="bg-gray-900 text-white">
                                    <th className="px-6 py-4 text-left font-semibold text-sm">Feature</th>
                                    <th className="px-6 py-4 text-center font-semibold text-sm bg-green-800">Pixlify</th>
                                    <th className="px-6 py-4 text-center font-semibold text-sm">Smush</th>
                                    <th className="px-6 py-4 text-center font-semibold text-sm">ShortPixel</th>
                                    <th className="px-6 py-4 text-center font-semibold text-sm">Imagify</th>
                                    <th className="px-6 py-4 text-center font-semibold text-sm">EWWW</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                <tr>
                                    <td className="px-6 py-4 font-medium text-gray-900">Works on WP Engine / Kinsta (no .htaccess)</td>
                                    <td className="px-6 py-4 text-center bg-green-50 font-semibold text-green-700">Yes</td>
                                    <td className="px-6 py-4 text-center text-gray-500">Partial</td>
                                    <td className="px-6 py-4 text-center text-gray-500">Partial</td>
                                    <td className="px-6 py-4 text-center text-gray-500">Partial</td>
                                    <td className="px-6 py-4 text-center text-gray-500">Partial</td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">Handles Elementor JS-set backgrounds</td>
                                    <td className="px-6 py-4 text-center bg-green-50 font-semibold text-green-700">Yes</td>
                                    <td className="px-6 py-4 text-center text-red-500">No</td>
                                    <td className="px-6 py-4 text-center text-red-500">No</td>
                                    <td className="px-6 py-4 text-center text-red-500">No</td>
                                    <td className="px-6 py-4 text-center text-red-500">No</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-medium text-gray-900">External CSS file rewriting</td>
                                    <td className="px-6 py-4 text-center bg-green-50 font-semibold text-green-700">Yes</td>
                                    <td className="px-6 py-4 text-center text-red-500">No</td>
                                    <td className="px-6 py-4 text-center text-red-500">No</td>
                                    <td className="px-6 py-4 text-center text-red-500">No</td>
                                    <td className="px-6 py-4 text-center text-red-500">No</td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">WP-CLI support</td>
                                    <td className="px-6 py-4 text-center bg-green-50 font-semibold text-green-700">Yes</td>
                                    <td className="px-6 py-4 text-center text-gray-500">Limited</td>
                                    <td className="px-6 py-4 text-center text-gray-500">Limited</td>
                                    <td className="px-6 py-4 text-center text-red-500">No</td>
                                    <td className="px-6 py-4 text-center text-green-600">Yes</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-medium text-gray-900">Local conversion (no upload to cloud)</td>
                                    <td className="px-6 py-4 text-center bg-green-50 font-semibold text-green-700">Yes</td>
                                    <td className="px-6 py-4 text-center text-yellow-600">Optional</td>
                                    <td className="px-6 py-4 text-center text-red-500">Cloud only</td>
                                    <td className="px-6 py-4 text-center text-red-500">Cloud only</td>
                                    <td className="px-6 py-4 text-center text-green-600">Yes</td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">AVIF output</td>
                                    <td className="px-6 py-4 text-center bg-green-50 font-semibold text-green-700">Yes</td>
                                    <td className="px-6 py-4 text-center text-yellow-600">Paid only</td>
                                    <td className="px-6 py-4 text-center text-green-600">Yes</td>
                                    <td className="px-6 py-4 text-center text-yellow-600">Paid only</td>
                                    <td className="px-6 py-4 text-center text-green-600">Yes</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-medium text-gray-900">picture element wrapping for img tags</td>
                                    <td className="px-6 py-4 text-center bg-green-50 font-semibold text-green-700">Yes</td>
                                    <td className="px-6 py-4 text-center text-yellow-600">Paid only</td>
                                    <td className="px-6 py-4 text-center text-green-600">Yes</td>
                                    <td className="px-6 py-4 text-center text-yellow-600">Paid only</td>
                                    <td className="px-6 py-4 text-center text-green-600">Yes</td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">Unlimited image credits</td>
                                    <td className="px-6 py-4 text-center bg-green-50 font-semibold text-green-700">Yes</td>
                                    <td className="px-6 py-4 text-center text-red-500">No — credit limits</td>
                                    <td className="px-6 py-4 text-center text-red-500">No — pay-per-image</td>
                                    <td className="px-6 py-4 text-center text-red-500">No — credit limits</td>
                                    <td className="px-6 py-4 text-center text-yellow-600">Paid plan only</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="text-xs text-gray-400 text-center mt-4">
                        &ldquo;Partial&rdquo; for WP Engine/Kinsta means the plugin converts images but URL rewriting may require .htaccess or CDN config that isn&apos;t available on those hosts.
                    </p>
                </div>
            </section>

            {/* Feature Highlights */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                        What&apos;s inside
                    </h2>
                    <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-16">
                        Built for sites that have run into the edge cases other plugins don&apos;t handle.
                    </p>

                    {/* Spotlight: Elementor + Builders */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="flex-1">
                                <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-2">Page Builder Support</p>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Elementor, Divi, Avada, Beaver Builder, WPBakery, Bricks, Enfold</h3>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Page builders set background images in three different ways — inline <code className="bg-gray-100 px-1 rounded text-xs">style=</code> attributes, <code className="bg-gray-100 px-1 rounded text-xs">&lt;style&gt;</code> blocks injected into the HTML, and external CSS files linked via <code className="bg-gray-100 px-1 rounded text-xs">&lt;link&gt;</code> tags. Pixlify rewrites all three.
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    <strong>Elementor goes further.</strong> Its Background Slideshow widget sets inline styles via JavaScript at runtime — the PHP buffer never sees those. We handle that with a MutationObserver that watches for style changes after page load and swaps the URL. No other plugin does this.
                                </p>
                            </div>
                            <div className="md:w-64 flex-shrink-0">
                                <div className="bg-gray-900 rounded-xl overflow-hidden">
                                    <div className="px-4 py-3 border-b border-white/10">
                                        <p className="text-xs text-gray-400 font-medium">Tested builders</p>
                                    </div>
                                    {[
                                        { name: "Elementor", note: "All 3 layers" },
                                        { name: "Divi", note: "Inline + style blocks" },
                                        { name: "Avada", note: "Inline + style blocks" },
                                        { name: "Beaver Builder", note: "Inline styles" },
                                        { name: "WPBakery", note: "Inline styles" },
                                        { name: "Bricks", note: "Inline + style blocks" },
                                        { name: "Enfold (Avia)", note: "Inline + style blocks" },
                                    ].map((b) => (
                                        <div key={b.name} className="px-4 py-2.5 flex items-center justify-between border-b border-white/5 last:border-0">
                                            <span className="text-sm text-white font-medium">{b.name}</span>
                                            <span className="text-xs text-green-400">{b.note}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Spotlight: WP-CLI */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="flex-1">
                                <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-2">WP-CLI Support</p>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Full command-line control</h3>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Run the bulk optimizer, check conversion status, reset history, manage the queue, and update settings — all from the terminal. Useful for deployment pipelines, staging-to-production workflows, and cron jobs that run outside of WP-Cron.
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    The <code className="bg-gray-100 px-1 rounded text-xs">--force</code> flag re-processes everything from scratch. The <code className="bg-gray-100 px-1 rounded text-xs">--dry-run</code> flag tells you what would happen without touching anything.
                                </p>
                            </div>
                            <div className="md:w-72 flex-shrink-0">
                                <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-gray-300 space-y-1.5">
                                    <div><span className="text-green-400">$</span> wp pixlify status</div>
                                    <div><span className="text-green-400">$</span> wp pixlify optimize <span className="text-blue-400">--format=both</span></div>
                                    <div><span className="text-green-400">$</span> wp pixlify optimize <span className="text-blue-400">--force</span></div>
                                    <div><span className="text-green-400">$</span> wp pixlify optimize <span className="text-blue-400">--dry-run</span></div>
                                    <div><span className="text-green-400">$</span> wp pixlify queue build</div>
                                    <div><span className="text-green-400">$</span> wp pixlify reset <span className="text-blue-400">--yes</span></div>
                                    <div><span className="text-green-400">$</span> wp pixlify settings set <span className="text-yellow-400">output_format both</span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Spotlight: Cron */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="flex-1">
                                <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-2">Background Processing</p>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Cron-based bulk optimizer</h3>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    New uploads are converted immediately. For your existing media library, the bulk optimizer runs in configurable batches — hourly, twice daily, or daily via WP-Cron. You set the batch size based on what your host can handle without timing out.
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    A live elapsed-time counter shows progress during each batch so you&apos;re not staring at a frozen screen. If you switch output formats later, <strong>Force Re-Optimize</strong> clears the history and rebuilds the queue without any manual database editing.
                                </p>
                            </div>
                            <div className="md:w-64 flex-shrink-0 space-y-3">
                                {[
                                    { label: "Convert on upload", val: "Instant" },
                                    { label: "Cron frequency", val: "Hourly / Daily" },
                                    { label: "Batch size", val: "Configurable" },
                                    { label: "Force re-optimize", val: "One click" },
                                    { label: "Auto-skip converted", val: "Toggle on/off" },
                                ].map((row) => (
                                    <div key={row.label} className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
                                        <span className="text-sm text-gray-600">{row.label}</span>
                                        <span className="text-sm font-semibold text-green-700">{row.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Remaining features — 3 column grid */}
                    <div className="grid md:grid-cols-3 gap-6 mt-2">
                        {[
                            {
                                title: "Works without .htaccess",
                                desc: "PHP output buffer rewriting. No server config changes. Works on WP Engine, Kinsta, Cloudways, nginx, Apache — anything."
                            },
                            {
                                title: "AVIF + WebP, your server decides",
                                desc: "The plugin detects if your server supports AVIF via Imagick + libavif. If not, it disables AVIF automatically and falls back to WebP."
                            },
                            {
                                title: "Original files untouched",
                                desc: "Converted files sit alongside originals. Nothing is deleted or replaced. Disable the plugin and the site goes back to normal."
                            },
                            {
                                title: "picture element wrapping",
                                desc: "Every img tag gets a picture wrapper with typed source elements. Browsers pick AVIF first, WebP second, original last — no JavaScript needed."
                            },
                            {
                                title: "image-set() for backgrounds",
                                desc: "CSS backgrounds get a dual declaration — fallback url() first, then image-set() — so modern browsers serve the best format without breaking older ones."
                            },
                            {
                                title: "Optional backups",
                                desc: "Enable pre-conversion backups to /uploads/pixlify-backups/. One-click restore from the Media Library if anything goes wrong."
                            },
                        ].map((feature) => (
                            <div key={feature.title} className="p-6 bg-white rounded-2xl border border-gray-200 hover:border-green-200 hover:shadow-sm transition-all duration-300">
                                <h3 className="text-base font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Real Problem */}
            <section className="py-20 bg-green-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-6">
                        The problem most plugins skip over
                    </h2>

                    <div className="space-y-8 mt-12">
                        <div className="p-8 rounded-2xl bg-white border border-gray-200">
                            <p className="text-lg text-gray-700 leading-relaxed">
                                WordPress has been sending JPEGs and PNGs to Chrome, Firefox, and Safari for years.
                                Those browsers have supported WebP since 2020. AVIF since 2022.
                                <strong> Your server just keeps sending the old formats anyway.</strong>
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl bg-white border border-gray-200">
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Most image optimizer plugins compress your JPEGs. That&apos;s useful. But you still sent a JPEG.
                                The real problem is <strong>format</strong>, not just file size.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl bg-white border border-gray-200">
                            <p className="text-lg text-gray-700 leading-relaxed">
                                WP Engine, Kinsta, Cloudways — they don&apos;t let you touch .htaccess or nginx config.
                                <strong> Every guide that says "just add this rewrite rule" doesn&apos;t apply to you.</strong>
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl bg-white border border-gray-200">
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Elementor sets section background images via JavaScript at runtime.
                                The PHP output buffer never sees those style attributes being written.
                                <strong> No plugin handled that. We built one that does.</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-20 bg-gray-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                        How it works
                    </h2>
                    <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-16">
                        Four passes over your page. Covers every way WordPress, Elementor, Divi, Avada, Beaver Builder, WPBakery, Bricks, and Enfold can put an image URL into the browser.
                    </p>

                    <div className="space-y-6">
                        {[
                            {
                                step: "1",
                                title: "img tags get wrapped in picture elements",
                                desc: "Every <img> on the page gets a <picture> wrapper with <source> elements for AVIF and WebP. Browsers pick the best format they support. The original <img> stays as the fallback."
                            },
                            {
                                step: "2",
                                title: "CSS background-image rules get rewritten",
                                desc: "Inline style attributes and <style> blocks are scanned for background-image: url(...). Elementor uses HTML-encoded quotes (&quot;) in style attributes — we handle that too. Each one gets a dual declaration: original URL first, then image-set() for modern browsers."
                            },
                            {
                                step: "3",
                                title: "External CSS files get overrides injected",
                                desc: "Elementor on WP Engine uses an 'External File' CSS method — it writes your styles to /uploads/elementor/css/post-N.css and links it with a <link> tag. The output buffer never sees that file. We read it from disk, extract only the background-image rules that changed, and inject a compact override <style> block right after the <link>."
                            },
                            {
                                step: "4",
                                title: "JS-set backgrounds get swapped at runtime",
                                desc: "Elementor's Background Slideshow widget builds slide divs via JavaScript. The inline styles it writes never appear in the HTML source — they're added after page load. A small MutationObserver script watches for background-image style changes and swaps the URL to AVIF or WebP using a HEAD fetch to check if the converted file exists. Result is cached in sessionStorage."
                            }
                        ].map((item) => (
                            <div key={item.step} className="flex gap-6 items-start p-6 bg-white rounded-2xl border border-gray-200">
                                <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
                                    {item.step}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technical Details */}
            <section className="py-20 bg-green-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                        Technical requirements
                    </h2>
                    <p className="text-lg text-gray-600 text-center mb-12">
                        Nothing unusual. Most WordPress hosting setups already meet these.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="p-6 rounded-2xl border border-gray-200">
                            <h3 className="font-semibold text-gray-900 mb-4 text-lg">Minimum requirements</h3>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex gap-3"><span className="text-green-600 font-bold mt-0.5">—</span><span>WordPress 5.8 or higher</span></li>
                                <li className="flex gap-3"><span className="text-green-600 font-bold mt-0.5">—</span><span>PHP 7.4 or higher</span></li>
                                <li className="flex gap-3"><span className="text-green-600 font-bold mt-0.5">—</span><span>GD or Imagick PHP extension (for WebP)</span></li>
                            </ul>
                        </div>

                        <div className="p-6 rounded-2xl border border-gray-200">
                            <h3 className="font-semibold text-gray-900 mb-4 text-lg">For AVIF support</h3>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex gap-3"><span className="text-green-600 font-bold mt-0.5">—</span><span>Imagick PHP extension</span></li>
                                <li className="flex gap-3"><span className="text-green-600 font-bold mt-0.5">—</span><span>ImageMagick compiled with libavif</span></li>
                                <li className="flex gap-3"><span className="text-yellow-500 font-bold mt-0.5">—</span><span>Not available on all hosts — the plugin detects this and disables AVIF automatically if unsupported</span></li>
                            </ul>
                        </div>

                        <div className="p-6 rounded-2xl border border-gray-200 md:col-span-2">
                            <h3 className="font-semibold text-gray-900 mb-4 text-lg">WP-CLI commands</h3>
                            <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-gray-300 space-y-1">
                                <div><span className="text-green-400">$</span> wp pixlify status</div>
                                <div><span className="text-green-400">$</span> wp pixlify optimize --format=both</div>
                                <div><span className="text-green-400">$</span> wp pixlify optimize --force</div>
                                <div><span className="text-green-400">$</span> wp pixlify queue build</div>
                                <div><span className="text-green-400">$</span> wp pixlify reset --yes</div>
                                <div><span className="text-green-400">$</span> wp pixlify settings set output_format both</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Setup Steps */}
            <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                        Setup
                    </h2>
                    <p className="text-lg text-gray-300 text-center max-w-2xl mx-auto mb-12">
                        Four steps. No server config. No API keys.
                    </p>

                    <div className="space-y-6">
                        {[
                            {
                                step: "1",
                                title: "Install and activate",
                                desc: "Upload the plugin zip to wp-content/plugins, activate from the Plugins screen. The database table for tracking conversions is created on activation."
                            },
                            {
                                step: "2",
                                title: "Choose output format",
                                desc: "Go to Pixlify Settings. Pick WebP, AVIF, or both. The plugin checks your server for Imagick + libavif and disables AVIF automatically if it's not available."
                            },
                            {
                                step: "3",
                                title: "Run the bulk optimizer",
                                desc: "Go to Pixlify Bulk Optimizer. Click Start Auto-Processing. It works through your media library in batches. A live counter shows elapsed time per batch — no more staring at a frozen screen wondering if it crashed."
                            },
                            {
                                step: "4",
                                title: "Enable serving and purge cache",
                                desc: "Toggle on Serve WebP and/or Serve AVIF in Settings. Purge your page cache (WP Engine Dashboard → Caching → Purge All, or your caching plugin). Done."
                            }
                        ].map((item) => (
                            <div key={item.step} className="flex gap-6 items-start">
                                <div className="flex-shrink-0 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-lg font-bold">
                                    {item.step}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                    <p className="text-gray-300 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FAQ
                        title="Frequently Asked Questions"
                        faqs={faqs}
                    />
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gradient-to-br from-green-900 to-gray-900 text-white">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to get started?
                    </h2>
                    <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
                        Pixlify isn&apos;t on WordPress.org. Purchase directly — get instant access.
                    </p>
                    <p className="text-green-300 font-semibold text-lg mb-8">
                        $240/yr · Unlimited sites · No credit limits · All features included
                    </p>

                    {/* Bottom CTA purchase form */}
                    <div className="max-w-sm mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-8">
                        <PurchaseForm idPrefix="cta" dark />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/30 hover:border-white/60 text-white/80 hover:text-white px-6 py-3 rounded-xl font-medium text-base transition-all duration-300"
                        >
                            Have questions? Talk to us
                        </Link>
                        <Link
                            href="/plugin-support"
                            className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/30 hover:border-white/60 text-white/80 hover:text-white px-6 py-3 rounded-xl font-medium text-base transition-all duration-300"
                        >
                            Plugin Support
                        </Link>
                    </div>
                </div>
            </section>

        </main>
    );
}
