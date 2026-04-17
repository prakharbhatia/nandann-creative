import React from 'react';
import { Mail, Star, ExternalLink, Heart } from 'lucide-react';

const SupportPage = () => {
    return (
        <div className="h-full overflow-auto bg-card text-card-foreground p-8 flex flex-col items-center">
            <div className="max-w-3xl w-full space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                        Hungry File Manager
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Professional file management for WordPress professionals.
                    </p>
                </div>

                {/* Ads / Upsell Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Pro Feature Ad */}
                    <div className="p-6 rounded-xl border border-border bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                            <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                            <h3 className="text-lg font-semibold">Hungry REST API Monitor</h3>
                        </div>
                        <p className="text-muted-foreground mb-4">
                            Debug and monitor your WordPress REST API endpoints in real-time. The ultimate tool for WP developers.
                        </p>
                        <a href="#" className="text-primary font-medium inline-flex items-center hover:underline">
                            Check it out <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                    </div>

                    {/* Support / Contact */}
                    <div className="p-6 rounded-xl border border-border bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                            <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                            <h3 className="text-lg font-semibold">Support Development</h3>
                        </div>
                        <p className="text-muted-foreground mb-4">
                            We build open source tools for the community. Your support keeps us hungry regarding code quality!
                        </p>
                        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                            Donate / Support
                        </button>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="rounded-xl border border-border bg-card shadow-sm p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Mail className="w-6 h-6 text-primary" />
                        <h2 className="text-2xl font-bold">Contact Support</h2>
                    </div>

                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Name</label>
                                <input type="text" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="Your name" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email</label>
                                <input type="email" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="john@example.com" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Subject</label>
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                                <option>Bug Report</option>
                                <option>Feature Request</option>
                                <option>General Inquiry</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Message</label>
                            <textarea className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="How can we help you?" />
                        </div>

                        <div className="pt-2">
                            <button className="w-full bg-primary text-primary-foreground h-10 px-4 py-2 rounded-md hover:bg-primary/90 transition-colors font-medium">
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SupportPage;
