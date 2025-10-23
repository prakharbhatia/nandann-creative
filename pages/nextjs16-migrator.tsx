import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function NextJS16Migrator() {
  return (
    <>
      <Head>
        <title>Next.js 16 Migration Tool - Superior Migration Solution | Nandann Creative</title>
        <meta name="description" content="Professional Next.js 14/15 to 16 migration tool with automatic backups, interactive CLI, and comprehensive analysis. Safer than @next/codemod with enterprise features." />
        <meta name="keywords" content="nextjs migration, nextjs 16, migration tool, codemod, turbopack, cache components, proxy.ts, middleware migration, nextjs upgrade, automatic migration" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nandann Creative" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://nandann.com/nextjs16-migrator" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Next.js 16 Migration Tool - Superior Migration Solution" />
        <meta property="og:description" content="Professional Next.js 14/15 to 16 migration tool with automatic backups, interactive CLI, and comprehensive analysis." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nandann.com/nextjs16-migrator" />
        <meta property="og:image" content="https://nandann.com/images/nextjs16-migrator-og.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Next.js 16 Migration Tool - Superior Migration Solution" />
        <meta name="twitter:description" content="Professional Next.js 14/15 to 16 migration tool with automatic backups, interactive CLI, and comprehensive analysis." />
        <meta name="twitter:image" content="https://nandann.com/images/nextjs16-migrator-og.jpg" />
        
        {/* LinkedIn */}
        <meta property="linkedin:title" content="Next.js 16 Migration Tool - Superior Migration Solution" />
        <meta property="linkedin:description" content="Professional Next.js 14/15 to 16 migration tool with automatic backups, interactive CLI, and comprehensive analysis." />
        <meta property="linkedin:image" content="https://nandann.com/images/nextjs16-migrator-og.jpg" />
        
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Next.js 16 Migration Tool",
              "description": "Professional Next.js 14/15 to 16 migration tool with automatic backups, interactive CLI, and comprehensive analysis",
              "url": "https://nandann.com/nextjs16-migrator",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "Node.js",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "author": {
                "@type": "Organization",
                "name": "Nandann Creative",
                "url": "https://nandann.com"
              },
              "downloadUrl": "https://www.npmjs.com/package/nextjs16-migrator",
              "softwareVersion": "1.0.2"
            })
          }}
        />
        
        {/* FAQ JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is the Next.js 16 Migration Tool?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The Next.js 16 Migration Tool is a professional-grade CLI tool that safely migrates Next.js 14/15 projects to Next.js 16. It provides automatic backups, interactive guidance, and comprehensive analysis to ensure a smooth migration process."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How is this different from @next/codemod?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Unlike @next/codemod which only provides basic transformations, our tool offers automatic backups, dry-run previews, interactive CLI, comprehensive compatibility analysis, performance tracking, and one-command rollback capabilities."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is it safe to migrate my production project?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, the tool creates automatic git commits and file backups before any changes. You can preview all changes with dry-run mode and rollback instantly if needed. It's designed for production environments where safety is critical."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What Next.js features does it migrate?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The tool migrates middleware.ts to proxy.ts, updates cache APIs (revalidateTag with cacheLife profiles), converts async parameters (params, searchParams, cookies, headers), updates next/image components, and optimizes next.config.js configurations."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do I install and use the tool?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Install globally with 'npm install -g nextjs16-migrator' or use directly with 'npx nextjs16-migrator'. The tool provides an interactive wizard that guides you through the entire migration process."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Does it work with CI/CD pipelines?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, the tool includes GitHub Actions integration and batch processing capabilities for automated migrations in CI/CD environments. It supports non-interactive mode for automated deployments."
                  }
                }
              ]
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <Navigation />
        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-24 pb-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Next.js 16 Migration Tool
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              The safest, most comprehensive way to migrate from Next.js 14/15 to 16. 
              Built for developers who value safety, reliability, and professional-grade tooling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="https://www.npmjs.com/package/nextjs16-migrator" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Install from npm
              </Link>
              <Link 
                href="https://github.com/prakharbha/nextjs16-migrator" 
                className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </Link>
            </div>
          </div>

          {/* Quick Start */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">Quick Start</h2>
            <div className="bg-black/50 rounded-lg p-6 mb-6">
              <code className="text-green-400 text-lg">
                npx nextjs16-migrator
              </code>
            </div>
            <p className="text-gray-300 mb-4">
              That's it. The tool will guide you through the entire migration process with interactive prompts, 
              automatic backups, and detailed progress reporting.
            </p>
          </div>

          {/* Why Choose Our Tool */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Why Choose Our Migration Tool?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-2xl font-bold text-white mb-4">Safety First</h3>
                <p className="text-gray-300 mb-4">
                  Automatic git commits and file backups before any changes. One-command rollback if something goes wrong.
                </p>
                <ul className="text-gray-400 space-y-2">
                  <li>• Git commits before migration</li>
                  <li>• File-level backups</li>
                  <li>• Instant rollback capability</li>
                </ul>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-2xl font-bold text-white mb-4">Interactive Experience</h3>
                <p className="text-gray-300 mb-4">
                  Step-by-step guided migration with clear explanations, progress indicators, and smart suggestions.
                </p>
                <ul className="text-gray-400 space-y-2">
                  <li>• Guided migration wizard</li>
                  <li>• Real-time progress updates</li>
                  <li>• Context-aware recommendations</li>
                </ul>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-2xl font-bold text-white mb-4">Preview Changes</h3>
                <p className="text-gray-300 mb-4">
                  See exactly what will change before applying any transformations. No surprises, no broken code.
                </p>
                <ul className="text-gray-400 space-y-2">
                  <li>• Dry-run mode</li>
                  <li>• Detailed change preview</li>
                  <li>• File-by-file analysis</li>
                </ul>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-2xl font-bold text-white mb-4">Comprehensive Analysis</h3>
                <p className="text-gray-300 mb-4">
                  Deep project analysis with compatibility checks, performance metrics, and detailed reporting.
                </p>
                <ul className="text-gray-400 space-y-2">
                  <li>• Compatibility validation</li>
                  <li>• Performance tracking</li>
                  <li>• Detailed migration reports</li>
                </ul>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-2xl font-bold text-white mb-4">Enterprise Ready</h3>
                <p className="text-gray-300 mb-4">
                  Built for teams and organizations with CI/CD integration, batch processing, and professional support.
                </p>
                <ul className="text-gray-400 space-y-2">
                  <li>• GitHub Actions integration</li>
                  <li>• Batch processing</li>
                  <li>• Professional support</li>
                </ul>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-2xl font-bold text-white mb-4">Superior to @next/codemod</h3>
                <p className="text-gray-300 mb-4">
                  While @next/codemod provides basic transformations, our tool offers enterprise-grade features.
                </p>
                <ul className="text-gray-400 space-y-2">
                  <li>• Automatic backups</li>
                  <li>• Interactive CLI</li>
                  <li>• Comprehensive documentation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              How We Compare to @next/codemod
            </h2>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left py-4 px-4 font-semibold">Feature</th>
                    <th className="text-center py-4 px-4 font-semibold text-green-400">nextjs16-migrator</th>
                    <th className="text-center py-4 px-4 font-semibold text-red-400">@next/codemod</th>
                  </tr>
                </thead>
                <tbody className="space-y-4">
                  <tr className="border-b border-gray-700">
                    <td className="py-4 px-4">Automatic Backups</td>
                    <td className="text-center py-4 px-4 text-green-400">✓ Included</td>
                    <td className="text-center py-4 px-4 text-red-400">✗ None</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-4 px-4">Rollback Capability</td>
                    <td className="text-center py-4 px-4 text-green-400">✓ One command</td>
                    <td className="text-center py-4 px-4 text-red-400">✗ Manual only</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-4 px-4">Interactive CLI</td>
                    <td className="text-center py-4 px-4 text-green-400">✓ Guided wizard</td>
                    <td className="text-center py-4 px-4 text-red-400">✗ Basic commands</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-4 px-4">Preview Mode</td>
                    <td className="text-center py-4 px-4 text-green-400">✓ Dry-run available</td>
                    <td className="text-center py-4 px-4 text-red-400">✗ No preview</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-4 px-4">Progress Indicators</td>
                    <td className="text-center py-4 px-4 text-green-400">✓ Real-time updates</td>
                    <td className="text-center py-4 px-4 text-red-400">✗ None</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-4 px-4">Performance Analysis</td>
                    <td className="text-center py-4 px-4 text-green-400">✓ Built-in tracking</td>
                    <td className="text-center py-4 px-4 text-red-400">✗ No analysis</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-4 px-4">Migration Reports</td>
                    <td className="text-center py-4 px-4 text-green-400">✓ Detailed HTML reports</td>
                    <td className="text-center py-4 px-4 text-red-400">✗ No reporting</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-4 px-4">CI/CD Integration</td>
                    <td className="text-center py-4 px-4 text-green-400">✓ GitHub Actions ready</td>
                    <td className="text-center py-4 px-4 text-red-400">✗ Manual process</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-4 px-4">Documentation</td>
                    <td className="text-center py-4 px-4 text-green-400">✓ Comprehensive guides</td>
                    <td className="text-center py-4 px-4 text-red-400">✗ Basic README</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4">Professional Support</td>
                    <td className="text-center py-4 px-4 text-green-400">✓ Available</td>
                    <td className="text-center py-4 px-4 text-red-400">✗ Community only</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Features */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              What Gets Migrated
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-2xl font-bold text-white mb-4">Core Transformations</h3>
                <ul className="text-gray-300 space-y-3">
                  <li>• <strong>middleware.ts → proxy.ts:</strong> Automatic conversion with function renaming</li>
                  <li>• <strong>Cache API Updates:</strong> revalidateTag() with cacheLife profiles</li>
                  <li>• <strong>Async Parameters:</strong> params, searchParams, cookies(), headers()</li>
                  <li>• <strong>next/image Updates:</strong> Legacy image component replacements</li>
                  <li>• <strong>Configuration Updates:</strong> next.config.js optimizations</li>
                </ul>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-2xl font-bold text-white mb-4">Compatibility Checks</h3>
                <ul className="text-gray-300 space-y-3">
                  <li>• <strong>Node.js Version:</strong> Validates 20.9+ requirement</li>
                  <li>• <strong>Dependency Analysis:</strong> Checks for problematic packages</li>
                  <li>• <strong>AMP Detection:</strong> Identifies removed AMP usage</li>
                  <li>• <strong>Experimental Flags:</strong> Updates deprecated configurations</li>
                  <li>• <strong>Project Structure:</strong> Validates Next.js project format</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Installation Options */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Installation & Usage
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-2xl font-bold text-white mb-4">Global Installation</h3>
                <div className="bg-black/50 rounded-lg p-4 mb-4">
                  <code className="text-green-400">npm install -g nextjs16-migrator</code>
                </div>
                <p className="text-gray-300 mb-4">Install globally for use across all projects</p>
                <div className="bg-black/50 rounded-lg p-4">
                  <code className="text-green-400">nextjs16-migrator</code>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-2xl font-bold text-white mb-4">Direct Usage</h3>
                <div className="bg-black/50 rounded-lg p-4 mb-4">
                  <code className="text-green-400">npx nextjs16-migrator</code>
                </div>
                <p className="text-gray-300 mb-4">Use directly without installation</p>
                <div className="bg-black/50 rounded-lg p-4">
                  <code className="text-green-400">npx nextjs16-migrator analyze</code>
                </div>
              </div>
            </div>
          </div>

          {/* Commands */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Available Commands
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">Interactive Mode</h3>
                <div className="bg-black/50 rounded-lg p-3 mb-3">
                  <code className="text-green-400">nextjs16-migrator</code>
                </div>
                <p className="text-gray-300 text-sm">Start the guided migration wizard</p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">Analyze Project</h3>
                <div className="bg-black/50 rounded-lg p-3 mb-3">
                  <code className="text-green-400">nextjs16-migrator analyze</code>
                </div>
                <p className="text-gray-300 text-sm">Check compatibility and show what will change</p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">Preview Changes</h3>
                <div className="bg-black/50 rounded-lg p-3 mb-3">
                  <code className="text-green-400">nextjs16-migrator migrate --dry-run</code>
                </div>
                <p className="text-gray-300 text-sm">See changes without applying them</p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">Rollback</h3>
                <div className="bg-black/50 rounded-lg p-3 mb-3">
                  <code className="text-green-400">nextjs16-migrator rollback</code>
                </div>
                <p className="text-gray-300 text-sm">Restore to previous state</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Migrate to Next.js 16?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join hundreds of developers who have safely migrated their projects using our professional-grade tool. 
              Get started in minutes with automatic backups and comprehensive analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link 
                href="https://www.npmjs.com/package/nextjs16-migrator" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Install Now
              </Link>
              <Link 
                href="/contact" 
                className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Get Professional Help
              </Link>
            </div>
            <p className="text-gray-400 text-sm">
              Free to use • Open source • Professional support available
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
