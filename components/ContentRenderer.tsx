import React, { useEffect, useRef } from 'react';

interface ContentRendererProps {
  contentHtml: string;
}

export default function ContentRenderer({ contentHtml }: ContentRendererProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      // Find all pre elements and add copy buttons
      const preElements = contentRef.current.querySelectorAll('pre');
      
      preElements.forEach((pre) => {
        // Skip if already processed
        if (pre.querySelector('.copy-button')) return;
        
        // Create copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button absolute top-2 right-2 px-3 py-1 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-gray-600 hover:border-gray-500';
        copyButton.textContent = 'Copy';
        copyButton.title = 'Copy code';
        
        // Add click handler
        copyButton.addEventListener('click', async () => {
          const code = pre.querySelector('code');
          if (code) {
            await navigator.clipboard.writeText(code.textContent || '');
            copyButton.textContent = 'Copied!';
            setTimeout(() => {
              copyButton.textContent = 'Copy';
            }, 2000);
          }
        });
        
        // Wrap pre in a container
        const wrapper = document.createElement('div');
        wrapper.className = 'relative group';
        pre.parentNode?.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);
        wrapper.appendChild(copyButton);
        
        // Update pre styles
        pre.className = 'relative rounded-lg p-4 overflow-x-auto bg-gray-900 border border-gray-700';
      });
    }
  }, [contentHtml]);

  return (
    <div 
      ref={contentRef}
      className="prose prose-invert max-w-none prose-lg prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-a:text-blue-300 hover:prose-a:text-blue-200 prose-li:marker:text-blue-300 prose-img:rounded-xl prose-img:shadow-2xl prose-img:mx-auto" 
      dangerouslySetInnerHTML={{ __html: contentHtml }} 
    />
  );
} 