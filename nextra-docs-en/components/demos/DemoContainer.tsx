'use client';

import React, { ReactNode, useState } from 'react';
import { useTheme } from 'next-themes';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface DemoContainerProps {
  children: ReactNode;
  title?: string;
  description?: string;
  code?: string;
  language?: string;
}

/**
 * Universal Demo Container Component
 * Provides unified appearance and layout for all demos
 * Supports source code display functionality
 */
export const DemoContainer: React.FC<DemoContainerProps> = ({ 
  children, 
  title, 
  description,
  code,
  language = 'tsx'
}) => {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Use next-themes to get theme
  const { theme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark' || theme === 'dark';

  const handleCopy = async () => {
    if (code) {
      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Copy failed:', err);
      }
    }
  };

  return (
    <div className="demo-container">
      {/* Header */}
      <div className="demo-header">
        <div className="demo-header-left">
          {title && <h3 className="demo-title">{title}</h3>}
          {description && <p className="demo-description">{description}</p>}
        </div>
        {code && (
          <div className="demo-header-actions">
            <button 
              className={`demo-action-btn ${showCode ? 'active' : ''}`}
              onClick={() => setShowCode(!showCode)}
              title={showCode ? 'Hide Code' : 'Show Code'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16,18 22,12 16,6"></polyline>
                <polyline points="8,6 2,12 8,18"></polyline>
              </svg>
              <span>{showCode ? 'Hide Code' : 'Show Code'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Effect Display Area */}
      <div className="demo-content">
        {children}
      </div>

      {/* Code Area */}
      {code && showCode && (
        <div className="demo-code-section">
          <div className="demo-code-header">
            <span className="demo-code-lang">{language.toUpperCase()}</span>
            <button 
              className="demo-copy-btn"
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20,6 9,17 4,12"></polyline>
                  </svg>
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>
          <div className="demo-code-block">
            <SyntaxHighlighter
              language={language}
              style={isDark ? vscDarkPlus : oneLight}
              customStyle={{
                margin: 0,
                padding: '20px',
                fontSize: '13px',
                lineHeight: '1.6',
                background: isDark ? '#1e1e1e' : '#fafafa',
                borderRadius: 0,
              }}
              showLineNumbers={true}
              wrapLines={true}
              lineNumberStyle={{
                minWidth: '3em',
                paddingRight: '1em',
                color: isDark ? '#858585' : '#999',
                userSelect: 'none',
              }}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemoContainer;
