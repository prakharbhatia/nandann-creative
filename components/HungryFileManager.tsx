import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FAQ from './FAQ';

export default function HungryFileManager() {
    const faqs = [
        {
            question: "Is Hungry File Manager secure?",
            answer: "Yes, security is our top priority. We use strict WordPress nonces for every action, implement Role-Based Access Control (RBAC) so only authorized users can touch files, and have built-in path validation to prevent directory traversal attacks."
        },
        {
            question: "Does it replace my FTP client?",
            answer: "For 99% of tasks, yes. You can upload, download, edit, rename, move, and even zip/unzip files directly from your browser. It's much faster than opening an FTP client for quick code changes or asset management."
        },
        {
            question: "What makes the editor special?",
            answer: "We use the Monaco Editor, which is the same engine that powers VS Code. This means you get full syntax highlighting, bracket matching, multiple cursors, a minimap, and powerful search/replace features right inside WordPress."
        },
        {
            question: "Can I use it in dark mode?",
            answer: "Absolutely. The interface is designed with a premium dark theme by default to reduce eye strain during long coding sessions, but it also respects your dashboard preferences."
        },
        {
            question: "Is it really free?",
            answer: "Yes, Hungry File Manager is 100% free and open source. We built it because we needed a better way to manage files on our own projects, and we wanted to share it with the community."
        },
        {
            question: "Does it support Zip/Unzip?",
            answer: "Yes. You can select folders or multiple files and compress them into a zip archive, or extract existing zip files directly on your server. Perfect for migrations or backups."
        }
    ];

    return (
        <main className="bg-[#0d1117] text-gray-300 min-h-screen">

            {/* Hero */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#010409]">
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>
                </div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center mb-16">
                        <div className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-6">
                            Free WordPress Plugin
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
                            Hungry <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">File Manager</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
                            The VS Code experience, built for <span className="text-white font-semibold">WordPress</span>. Edit files, manage assets, and deploy code without touching FTP.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/api/hungry-file-manager/download"
                                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Download Free
                            </Link>
                            <Link
                                href="#features"
                                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
                            >
                                Explore Features
                            </Link>
                        </div>
                    </div>

                    {/* Mockup Container */}
                    <div className="relative max-w-5xl mx-auto">
                        <div className="p-[1px] rounded-3xl bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-transparent">
                            <div className="bg-[#161b22] rounded-[calc(1.5rem-1px)] p-2 shadow-2xl">
                                <div className="bg-[#0d1117] rounded-2xl overflow-hidden border border-[#30363d] relative">
                                    {/* Mac-style title bar */}
                                    <div className="bg-[#161b22] px-4 py-3 border-b border-[#30363d] flex items-center gap-2">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                                            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                                        </div>
                                        <div className="flex-1 text-center text-xs text-gray-500 font-medium font-mono">
                                            wp-content/themes/nandann/functions.php — Hungry File Manager
                                        </div>
                                    </div>
                                    <div className="relative aspect-video">
                                        <Image
                                            src="/images/hungry-file-manager-banner.png"
                                            alt="Hungry File Manager Interface"
                                            fill
                                            className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                                            priority
                                        />
                                    </div>
                                    
                                    {/* Premium Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent opacity-40"></div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Status indicators floating */}
                        <div className="absolute -bottom-6 -right-6 hidden lg:block p-4 bg-[#161b22] border border-[#30363d] rounded-2xl shadow-xl animate-bounce-slow">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-sm font-mono text-gray-400">System Ready: No FTP Required</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Stats */}
            <section className="py-12 border-y border-[#30363d] bg-[#010409]">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold text-white mb-1">0ms</div>
                            <div className="text-sm text-gray-500 uppercase tracking-widest">Latency</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white mb-1">Monaco</div>
                            <div className="text-sm text-gray-500 uppercase tracking-widest">Pro Editor</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white mb-1">RBAC</div>
                            <div className="text-sm text-gray-500 uppercase tracking-widest">Security</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white mb-1">Free</div>
                            <div className="text-sm text-gray-500 uppercase tracking-widest">Lifetime</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-24 relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">WordPress Powered. Zero Bloat.</h2>
                        <p className="text-gray-400 text-lg">Everything you need to manage your WordPress site's files with precision.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Monaco Editor Support",
                                desc: "The same engine that powers VS Code. Syntax highlighting for PHP, JS, CSS, JSON, and more.",
                                icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                            },
                            {
                                title: "Full File Operations",
                                desc: "Upload, Create, Rename, Delete, Copy, and Move. Manage your entire wp-content effortlessly.",
                                icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                            },
                            {
                                title: "Zip & Unzip",
                                desc: "Extract archives or compress multiple files into a single zip directly on your server.",
                                icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                            },
                            {
                                title: "Role-Based Access",
                                desc: "Restrict access to specific user roles. Ensure only the right developers touch the code.",
                                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            },
                            {
                                title: "Dark Mode UI",
                                desc: "A premium, distraction-free dark interface that fits perfectly into modern development workflows.",
                                icon: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                            },
                            {
                                title: "Instant Search",
                                desc: "Quickly find files or search through code with high-performance filtering and indexing.",
                                icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            }
                        ].map((feature, i) => (
                            <div key={i} className="group p-8 rounded-2xl bg-[#161b22] border border-[#30363d] hover:border-blue-500/50 transition-all duration-300">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Real Dashboard Screenshot */}
            <section className="py-24 bg-[#0d1117] border-y border-[#30363d]/50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Real-world production interface.</h2>
                            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                                This isn't just a mockup. This is the actual Hungry File Manager running in a production WordPress environment. 
                                Designed to feel familiar to VS Code users while staying integrated into your existing dashboard.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Native Monaco Editor integration",
                                    "Clean, clutter-free file tree explorer",
                                    "Tabbed editing for multiple files",
                                    "Integrated terminal-like status updates"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-300">
                                        <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs">✓</div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex-1 relative">
                            <div className="p-1 rounded-2xl bg-gradient-to-br from-[#30363d] to-transparent shadow-2xl overflow-hidden group">
                                <Image
                                    src="/images/hungry-file-manager-screenshot.png"
                                    alt="Actual Hungry File Manager Screenshot"
                                    width={1200}
                                    height={800}
                                    className="rounded-xl shadow-inner border border-[#30363d] group-hover:scale-[1.02] transition-transform duration-700"
                                />
                                {/* Glass shine effect */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>
                            </div>
                            <div className="absolute -top-4 -right-4 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-full shadow-lg transform rotate-3">
                                LIVE DASHBOARD VIEW
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Comparison Section */}
            <section className="py-24 bg-[#0d1117] relative overflow-hidden">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-3xl p-12 border border-blue-500/20">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-white mb-4">Why use it?</h2>
                            <p className="text-gray-400">Designed for developers who are tired of clunky FTP clients.</p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <h4 className="text-lg font-bold text-red-400 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    Old Way (FTP)
                                </h4>
                                <ul className="space-y-4 text-gray-500">
                                    <li className="flex gap-3"><span>—</span><span>Slow connection and authentication</span></li>
                                    <li className="flex gap-3"><span>—</span><span>Manual upload/download for every edit</span></li>
                                    <li className="flex gap-3"><span>—</span><span>No syntax highlighting in remote editor</span></li>
                                    <li className="flex gap-3"><span>—</span><span>Fragmented workflow across multiple apps</span></li>
                                </ul>
                            </div>
                            <div className="space-y-6">
                                <h4 className="text-lg font-bold text-green-400 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Hungry Way
                                </h4>
                                <ul className="space-y-4 text-gray-300">
                                    <li className="flex gap-3"><span className="text-green-500 font-bold">✓</span><span>Instant access in your dashboard</span></li>
                                    <li className="flex gap-3"><span className="text-green-500 font-bold">✓</span><span>Edit and save directly to the server</span></li>
                                    <li className="flex gap-3"><span className="text-green-500 font-bold">✓</span><span>Professional Monaco Editor included</span></li>
                                    <li className="flex gap-3"><span className="text-green-500 font-bold">✓</span><span>All-in-one developer workspace</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-[#010409]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white">Common Questions</h2>
                    </div>
                    {/* Note: I'm using the global FAQ component but it might need dark theme styles */}
                    <div className="hungry-faq">
                        <FAQ
                            faqs={faqs}
                        />
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 relative overflow-hidden text-center">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-blue-600/20 to-transparent"></div>
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">Ready to stop using FTP?</h2>
                    <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                        Download the <span className="text-white font-semibold">Hungry File Manager plugin</span> for free today and experience the future of WordPress file management.
                    </p>
                    <Link
                        href="/api/hungry-file-manager/download"
                        className="inline-flex items-center justify-center gap-2 bg-white text-black px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-300 hover:bg-gray-200 hover:shadow-2xl hover:shadow-white/10 active:scale-95"
                    >
                        Get it for FREE
                    </Link>
                    <p className="mt-6 text-gray-500 flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                        No keys. No subscriptions. Just code.
                    </p>
                </div>
            </section>

            <style jsx>{`
                .animate-bounce-slow {
                    animation: bounce 3s infinite;
                }
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                :global(.hungry-faq .faq-question) {
                    color: white !important;
                }
                :global(.hungry-faq .faq-answer) {
                    color: #9ca3af !important;
                }
            `}</style>
        </main>
    );
}
