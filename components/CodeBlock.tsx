import React, { useState } from 'react';

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

export default function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = async () => {
    if (typeof children === 'string') {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative group">
      <pre className={`${className} relative rounded-lg p-4 overflow-x-auto bg-gray-900 border border-gray-700`}>
        <code>{children}</code>
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 px-3 py-1 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-gray-600 hover:border-gray-500"
        title="Copy code"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
} 