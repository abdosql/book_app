import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import type { Chapter } from '../types';

interface ReaderProps {
  chapter: Chapter;
  fontSize: number;
}

export function Reader({ chapter, fontSize }: ReaderProps) {
  return (
    <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900">
      <div 
        className="max-w-3xl mx-auto px-8 py-12"
        style={{ fontSize: `${fontSize}px` }}
      >
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          {chapter.title}
        </h1>
        <div className="prose dark:prose-invert prose-indigo max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              h2: ({ children }) => (
                <h2 className="text-2xl font-semibold mt-8 mb-4">{children}</h2>
              ),
              p: ({ children }) => (
                <p className="mb-4 leading-relaxed">{children}</p>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
              code: ({ inline, children }) => (
                inline ? (
                  <code className="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-sm">
                    {children}
                  </code>
                ) : (
                  <pre className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-x-auto">
                    <code>{children}</code>
                  </pre>
                )
              ),
            }}
          >
            {chapter.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}