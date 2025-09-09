import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FAQ from './FAQ';

export default function WordPressPlugin() {
  const pluginFAQs = [
    {
      question: "Is this plugin safe to use?",
      answer: "Yes, the plugin includes multiple safety measures: requires administrator privileges, shows confirmation dialogs before processing, validates all paths to ensure they're within WordPress, processes files in batches to prevent timeouts, and provides detailed error reporting."
    },
    {
      question: "Will this break my WordPress site?",
      answer: "The permissions set by this plugin (0644 for files, 0755 for directories) are the WordPress recommended standards. However, some special files or custom configurations might require different permissions. Always backup your site before making changes."
    },
    {
      question: "Can I undo the permission changes?",
      answer: "No, permission changes cannot be automatically undone. This is why it's important to have a backup before running the tool. However, the plugin sets standard WordPress permissions that should work for most installations."
    },
    {
      question: "What happens if the process is interrupted?",
      answer: "The plugin processes files in batches, so if interrupted, only the current batch might be affected. You can safely restart the process, and it will continue from where it left off."
    },
    {
      question: "Does this work on shared hosting?",
      answer: "Yes, as long as your hosting provider allows the PHP chmod() function and you have sufficient file system permissions. The plugin will display an error if chmod() is not available."
    },
    {
      question: "Can I process only specific directories?",
      answer: "Yes, you can choose to process: Entire WordPress installation, WP Content directory only, Plugins directory only, Themes directory only, or Uploads directory only."
    },
    {
      question: "Who can use this plugin?",
      answer: "Only WordPress administrators can access and use this plugin. This ensures that only trusted users with proper permissions can modify file and folder permissions on your site."
    },
    {
      question: "How long does the process take?",
      answer: "The processing time depends on the number of files in your WordPress installation. The plugin uses batch processing to handle large sites efficiently, with real-time progress tracking so you can monitor the process."
    }
  ];

  const features = [
    {
      title: "Batch Processing",
      description: "Handles large directory structures efficiently with configurable batch sizes to prevent server timeouts.",
      icon: "⚡"
    },
    {
      title: "Real-time Progress",
      description: "Visual progress bar with detailed statistics during processing keeps you informed.",
      icon: "📊"
    },
    {
      title: "Safety First",
      description: "Multiple security checks and confirmations before making any changes to your files.",
      icon: "🛡️"
    },
    {
      title: "Selective Processing",
      description: "Choose specific directories to process: entire site, wp-content, plugins, themes, or uploads.",
      icon: "🎯"
    },
    {
      title: "Error Handling",
      description: "Comprehensive error logging and reporting for troubleshooting and transparency.",
      icon: "🔍"
    },
    {
      title: "Responsive Interface",
      description: "Works seamlessly on desktop and mobile devices with a modern admin interface.",
      icon: "📱"
    }
  ];

  const useCases = [
    "After migrating your WordPress site to a new server",
    "When files have incorrect permissions causing functionality issues",
    "For security hardening when permissions are too permissive",
    "When troubleshooting file access problems",
    "During routine maintenance to ensure proper permissions"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <div className="glass rounded-3xl p-8 inline-block">
                <Image
                  src="/images/plugin-banner.webp"
                  alt="Reset File and Folder Permissions Plugin"
                  width={772}
                  height={250}
                  className="rounded-2xl"
                />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Fix WordPress Permission <span className="text-gradient">Errors Instantly</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
              <strong className="text-white">Struggling with WordPress file permission errors?</strong> Download our FREE plugin that fixes permission issues in seconds. Used by <strong className="text-green-400">10,000+ sites</strong> worldwide.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12 text-lg">
              <div className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full">
                <span className="text-green-400">✓</span>
                <span className="text-white">100% Free</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-full">
                <span className="text-blue-400">⚡</span>
                <span className="text-white">Fixes in Seconds</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-full">
                <span className="text-purple-400">🛡️</span>
                <span className="text-white">Safe & Secure</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="https://wordpress.org/plugins/reset-file-and-folder-permissions/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-8 py-4 rounded-full text-white font-bold hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 group inline-flex items-center gap-3 text-lg"
              >
                <span>Download FREE Plugin</span>
                <span className="group-hover:translate-x-1 transition-transform duration-200">↓</span>
              </a>
              
              <div className="flex items-center gap-4 text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                  <span className="font-semibold">5.0 Rating (127 reviews)</span>
                </div>
                <div className="text-sm">
                  <span className="text-green-400 font-semibold">10,000+</span> active installs
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Stop Losing <span className="text-gradient">Sleep Over Permission Errors</span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                <strong className="text-white">Permission errors are killing your WordPress site.</strong> Upload failures, plugin issues, theme problems - all because of incorrect file permissions. Don't waste hours manually fixing files one by one.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-400 text-sm">✗</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Hours of Manual Work</h4>
                    <p className="text-gray-400">Spending hours fixing permissions file by file through FTP or cPanel</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-400 text-sm">✗</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Site Breaking Errors</h4>
                    <p className="text-gray-400">White screen of death, plugin failures, upload errors ruining your site</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-400 text-sm">✗</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Security Vulnerabilities</h4>
                    <p className="text-gray-400">Wrong permissions expose your site to hackers and malware attacks</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Standard WordPress Permissions</h3>
              
              <div className="space-y-6">
                <div className="bg-black/30 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">📄</span>
                    <h4 className="text-xl font-semibold text-white">Files (0644)</h4>
                  </div>
                  <p className="text-gray-300">Owner can read/write, group and others can read only</p>
                </div>
                
                <div className="bg-black/30 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">📁</span>
                    <h4 className="text-xl font-semibold text-white">Directories (0755)</h4>
                  </div>
                  <p className="text-gray-300">Owner can read/write/execute, group and others can read/execute</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Powerful <span className="text-gradient">Features</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built with security, usability, and performance in mind
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="glass rounded-3xl p-8 hover-lift">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              When to Use <span className="text-gradient">This Plugin</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="glass rounded-2xl p-6 hover-lift">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-400 text-sm">✓</span>
                  </div>
                  <p className="text-gray-300">{useCase}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Built for <span className="text-gradient">Developers</span>
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-400 text-sm">🔧</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">WordPress Native Functions</h4>
                    <p className="text-gray-400">Uses WordPress core functions and follows coding standards</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-400 text-sm">🔒</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Secure AJAX Handling</h4>
                    <p className="text-gray-400">Proper nonce verification and input sanitization</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-400 text-sm">📱</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Responsive Design</h4>
                    <p className="text-gray-400">Modern interface using WordPress admin styles</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-400 text-sm">🛡️</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Privacy Focused</h4>
                    <p className="text-gray-400">No data collection or external service connections</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">System Requirements</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <span className="text-gray-300">WordPress</span>
                  <span className="text-white font-medium">5.0 or higher</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <span className="text-gray-300">PHP</span>
                  <span className="text-white font-medium">7.4 or higher</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <span className="text-gray-300">PHP chmod()</span>
                  <span className="text-white font-medium">Must be available</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-300">User Access</span>
                  <span className="text-white font-medium">Administrator only</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Stop Struggling - <span className="text-gradient">Fix It Now</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              <strong className="text-white">Join 10,000+ WordPress users</strong> who fixed their permission errors in under 2 minutes. Download our FREE plugin and get your site working perfectly again.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="https://wordpress.org/plugins/reset-file-and-folder-permissions/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-10 py-5 rounded-full text-white font-bold hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 group inline-flex items-center gap-3 text-xl"
              >
                <span>Download FREE Plugin</span>
                <span className="group-hover:translate-x-1 transition-transform duration-200">↓</span>
              </a>
              
              <Link 
                href="/contact" 
                className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 px-8 py-4 rounded-full text-white font-medium transition-all duration-300 backdrop-blur-sm"
              >
                Need Help? Contact Us
              </Link>
            </div>

            <div className="mt-8 text-gray-400">
              <p className="text-lg"><strong className="text-green-400">100% Free</strong> • <strong className="text-blue-400">10,000+ Downloads</strong> • <strong className="text-purple-400">5-Star Rated</strong></p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Got <span className="text-gradient">Questions?</span> We've Got Answers
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to know about fixing WordPress permission errors quickly and safely
            </p>
          </div>
          <FAQ faqs={pluginFAQs} />
        </div>
      </section>
    </div>
  );
}