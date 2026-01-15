import Head from 'next/head';
import Navigation from '../components/Navigation';
import TGLiveChat from '../components/TGLiveChat';
import Footer from '../components/Footer';

export default function TGLiveChatPage() {
    const pageTitle = "TG Live Chat - Free WordPress Live Chat Plugin via Telegram | Nandann";
    const pageDescription = "Chat with website visitors via Telegram. 100% free WordPress live chat plugin. Reply from your phone, no separate app needed. Privacy-first, GDPR compliant, zero monthly fees.";
    const pageUrl = "https://www.nandann.com/tg-live-chat";
    const pageImage = "https://www.nandann.com/images/tg-live-chat-banner.webp";

    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": `${pageUrl}#webpage`,
                "url": pageUrl,
                "name": pageTitle,
                "description": pageDescription,
                "inLanguage": "en-US",
                "isPartOf": {
                    "@id": "https://www.nandann.com/#website"
                },
                "breadcrumb": {
                    "@id": `${pageUrl}#breadcrumb`
                },
                "about": {
                    "@id": `${pageUrl}#software`
                },
                "mainEntity": {
                    "@id": `${pageUrl}#software`
                }
            },
            {
                "@type": "BreadcrumbList",
                "@id": `${pageUrl}#breadcrumb`,
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://www.nandann.com/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Portfolio",
                        "item": "https://www.nandann.com/portfolio"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": "TG Live Chat"
                    }
                ]
            },
            {
                "@type": "SoftwareApplication",
                "@id": `${pageUrl}#software`,
                "name": "TG Live Chat",
                "description": pageDescription,
                "url": "https://wordpress.org/plugins/tg-live-chat/",
                "applicationCategory": "WordPress Plugin",
                "operatingSystem": "Web",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD",
                    "availability": "https://schema.org/InStock"
                },
                "author": {
                    "@type": "Person",
                    "name": "Prakhar Bhatia",
                    "url": "https://www.nandann.com/about"
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "Nandann Creative Agency",
                    "url": "https://www.nandann.com/"
                },
                "softwareVersion": "1.0.0",
                "datePublished": "2026-01-01",
                "dateModified": "2026-01-02",
                "downloadUrl": "https://wordpress.org/plugins/tg-live-chat/",
                "screenshot": pageImage,
                "softwareRequirements": [
                    "WordPress 6.0 or higher",
                    "PHP 7.4 or higher",
                    "Telegram Bot API Token"
                ],
                "featureList": [
                    "Real-time chat via Telegram",
                    "Reply from phone without WordPress admin",
                    "Multiple admin support",
                    "Customizable widget with 3 skins",
                    "Privacy-first architecture",
                    "Auto-delete customer data",
                    "GDPR compliant",
                    "Page exclusions",
                    "Lightweight (~30KB)"
                ],
                "keywords": "wordpress live chat, telegram chat plugin, free live chat, customer support, telegram bot, privacy chat plugin"
            },
            {
                "@type": "FAQPage",
                "@id": `${pageUrl}#faq`,
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "Is TG Live Chat really free?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes, 100% free forever. No premium tiers, no hidden costs. The plugin uses Telegram's free Bot API."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Do I need to keep WordPress open to reply?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "No. You reply directly from Telegram on your phone or desktop. No need to access WordPress admin."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Is it GDPR compliant?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes. Messages are stored on your server and can be auto-deleted. No third-party analytics or tracking."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can multiple team members receive chats?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes. Add multiple Telegram Chat IDs to receive notifications. All team members can reply."
                        }
                    }
                ]
            },
            {
                "@type": "HowTo",
                "@id": `${pageUrl}#howto`,
                "name": "How to Set Up TG Live Chat",
                "description": "Install and configure TG Live Chat in 5 minutes",
                "step": [
                    {
                        "@type": "HowToStep",
                        "position": 1,
                        "name": "Install the Plugin",
                        "text": "Download from WordPress.org or search 'TG Live Chat' in your WordPress plugins."
                    },
                    {
                        "@type": "HowToStep",
                        "position": 2,
                        "name": "Create a Telegram Bot",
                        "text": "Message @BotFather on Telegram and use /newbot to create a bot. Copy the API token."
                    },
                    {
                        "@type": "HowToStep",
                        "position": 3,
                        "name": "Get Your Chat ID",
                        "text": "Message @userinfobot or @RawDataBot on Telegram to get your Chat ID."
                    },
                    {
                        "@type": "HowToStep",
                        "position": 4,
                        "name": "Configure the Plugin",
                        "text": "Enter your Bot Token and Chat ID in the plugin settings. Customize widget appearance."
                    },
                    {
                        "@type": "HowToStep",
                        "position": 5,
                        "name": "Start Chatting",
                        "text": "The widget appears on your site. Visitors can chat and you reply via Telegram."
                    }
                ]
            }
        ]
    };

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="keywords" content="wordpress live chat, telegram chat plugin, free live chat, customer support telegram, telegram bot wordpress, privacy chat plugin, gdpr live chat, free customer support" />
                <meta name="author" content="Prakhar Bhatia" />
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="last-modified" content="2026-01-02T12:00:00Z" />
                <meta httpEquiv="last-modified" content="Thu, 02 Jan 2026 12:00:00 GMT" />
                <link rel="canonical" href={pageUrl} />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:image" content={pageImage} />
                <meta property="og:image:secure_url" content={pageImage} />
                <meta property="og:image:alt" content="TG Live Chat - WordPress Live Chat Plugin via Telegram" />
                <meta property="og:image:width" content="1024" />
                <meta property="og:image:height" content="300" />
                <meta property="og:site_name" content="Nandann Creative Agency" />
                <meta property="og:locale" content="en_US" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={pageImage} />
                <meta name="twitter:image:alt" content="TG Live Chat - WordPress Live Chat Plugin via Telegram" />
                <meta name="twitter:creator" content="@nandann" />
                <meta name="twitter:site" content="@nandann" />

                {/* Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
            </Head>

            <div className="min-h-screen">
                <Navigation />
                <TGLiveChat />
                <Footer />
            </div>
        </>
    );
}
