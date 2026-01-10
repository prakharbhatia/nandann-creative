import { useEffect, useState } from 'react';
import Link from 'next/link';

interface TocItem {
    id: string;
    text: string;
    level: number;
}

export default function BlogTableOfContents() {
    const [headings, setHeadings] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        // Extract headings from the article
        const article = document.querySelector('article');
        if (!article) return;

        const headingElements = article.querySelectorAll('h2, h3');
        const headingData: TocItem[] = Array.from(headingElements).map((heading) => {
            const id = heading.id || heading.textContent?.toLowerCase().replace(/[^\w]+/g, '-') || '';

            // Add ID to heading if it doesn't have one
            if (!heading.id) {
                heading.id = id;
            }

            return {
                id,
                text: heading.textContent || '',
                level: parseInt(heading.tagName.substring(1)),
            };
        });

        setHeadings(headingData);

        // Scroll spy with Intersection Observer
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-100px 0px -66%',
                threshold: 1,
            }
        );

        headingElements.forEach((heading) => {
            observer.observe(heading);
        });

        return () => {
            headingElements.forEach((heading) => {
                observer.unobserve(heading);
            });
        };
    }, []);

    const scrollToHeading = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100; // Account for fixed header
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
    };

    if (headings.length === 0) return null;

    return (
        <aside className="hidden xl:block">
            {/* Wrapper with sticky positioning - stays at top when scrolling */}
            <div className="sticky top-32 flex flex-col gap-4 max-h-[calc(100vh-10rem)]">
                {/* Scrollable TOC Section */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm overflow-y-auto flex-1">
                    <h3 className="text-lg font-bold text-white mb-4">Table of Contents</h3>

                    <nav className="space-y-1">
                        {headings.map((heading) => (
                            <button
                                key={heading.id}
                                onClick={() => scrollToHeading(heading.id)}
                                className={`
                  block w-full text-left text-sm transition-colors duration-200
                  ${heading.level === 2 ? 'font-medium' : 'pl-4 text-xs'}
                  ${activeId === heading.id
                                        ? 'text-blue-400 font-semibold'
                                        : 'text-gray-400 hover:text-blue-300'
                                    }
                `}
                                style={{
                                    paddingTop: '0.375rem',
                                    paddingBottom: '0.375rem',
                                }}
                            >
                                <span className={`
                  ${activeId === heading.id ? 'border-l-2 border-blue-400 pl-3' : 'pl-3'}
                  block
                `}>
                                    {heading.text}
                                </span>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Always Visible CTA Section */}
                <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-blue-400/30 rounded-xl p-6 backdrop-blur-sm shadow-lg flex-shrink-0">
                    <h4 className="text-sm font-semibold text-white mb-2">Need Development Help?</h4>
                    <p className="text-xs text-gray-300 mb-4">
                        Get expert assistance with your web development, migration, or modernization project.
                    </p>
                    <Link
                        href="/contact?service=development-consultation"
                        className="block w-full text-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                        Get Free Consultation →
                    </Link>
                    <p className="text-xs text-gray-400 mt-3 text-center">
                        Next.js, React, Rust, PHP, Node.js & more
                    </p>
                </div>
            </div>

            {/* Custom scrollbar styles */}
            <style jsx>{`
        aside div::-webkit-scrollbar {
          width: 6px;
        }
        aside div::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        aside div::-webkit-scrollbar-thumb {
          background: rgba(96, 165, 250, 0.5);
          border-radius: 3px;
        }
        aside div::-webkit-scrollbar-thumb:hover {
          background: rgba(96, 165, 250, 0.7);
        }
      `}</style>
        </aside>
    );
}
