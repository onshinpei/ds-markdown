'use client';

import React, { ReactNode, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface DemoContainerProps {
  children: ReactNode;
  title?: string;
  description?: string;
  code?: string;
  language?: string;
}

/**
 * 通用的 Demo 容器组件
 * 为所有演示提供统一的外观和布局
 * 支持显示源码功能
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

  const handleCopy = async () => {
    if (code) {
      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('复制失败:', err);
      }
    }
  };

  return (
    <div className="demo-container">
      {/* 头部 */}
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
              title={showCode ? '隐藏代码' : '显示代码'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16,18 22,12 16,6"></polyline>
                <polyline points="8,6 2,12 8,18"></polyline>
              </svg>
              <span>{showCode ? '隐藏代码' : '显示代码'}</span>
            </button>
          </div>
        )}
      </div>

      {/* 效果展示区 */}
      <div className="demo-content">
        {children}
      </div>

      {/* 代码区域 */}
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
                  <span>已复制!</span>
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  <span>复制代码</span>
                </>
              )}
            </button>
          </div>
          <div className="demo-code-block">
            <SyntaxHighlighter
              language={language}
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: '20px',
                fontSize: '13px',
                lineHeight: '1.6',
                background: '#1e1e1e',
                borderRadius: 0,
              }}
              showLineNumbers={true}
              wrapLines={true}
              lineNumberStyle={{
                minWidth: '3em',
                paddingRight: '1em',
                color: '#858585',
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

