// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useState, useRef, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import type { DemoSectionProps } from '../../defined';
import { useI18n } from '../../hooks/useI18n';
import DsMarkdown, { type MarkdownRef } from 'ds-markdown';

// Demo组件
const DemoSection: React.FC<DemoSectionProps> = ({ id, title, sourceCode, showHeader = true, renderComponent, children, onlyShowCode = false, viewInIsStart = false }) => {
  const [activeTab, setActiveTab] = useState<'code' | 'markdown'>(onlyShowCode ? 'code' : 'markdown');
  const [isInViewport, setIsInViewport] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const markdownRef = useRef<MarkdownRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();

  // 视口检测
  useEffect(() => {
    if (!viewInIsStart) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isStarted) {
          setIsInViewport(true);
          // 延迟一点开始打字，给用户一个视觉缓冲
          setTimeout(() => {
            if (markdownRef.current) {
              markdownRef.current.start();
              setIsStarted(true);
            }
          }, 500);
        }
      },
      {
        threshold: 0.3, // 当30%的内容可见时触发
        rootMargin: '0px 0px -100px 0px', // 提前100px触发
      },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [viewInIsStart, isStarted]);

  return (
    <section id={id} className="section">
      <h2 className="section-title">{title}</h2>
      <div ref={containerRef} className={`demo-container ${!showHeader ? 'source-only' : ''}`}>
        <div className="source-code">
          {showHeader && (
            <div className="source-header">
              <div className="tabs">
                <button className={`tab ${activeTab === 'markdown' ? 'active' : ''}`} onClick={() => setActiveTab('markdown')}>
                  📝 Markdown String
                </button>
                <button className={`tab ${activeTab === 'code' ? 'active' : ''}`} onClick={() => setActiveTab('code')}>
                  📄 Code
                </button>
              </div>
            </div>
          )}

          {activeTab === 'markdown' ? (
            <pre className="code-block">
              <code className="language-markdown">{sourceCode.markdownString}</code>
            </pre>
          ) : (
            <div className="ds-markdown code-block">
              <div className="md-code-block md-code-block-light">
                {onlyShowCode ? (
                  <>
                    <DsMarkdown ref={markdownRef} interval={16.67} autoStartTyping={false}>
                      {sourceCode.code.trim()}
                    </DsMarkdown>
                  </>
                ) : (
                  <SyntaxHighlighter useInlineStyles={false} language={activeTab === 'code' ? sourceCode.lang || 'tsx' : 'markdown'} style={{}}>
                    {sourceCode.code.trim()}
                  </SyntaxHighlighter>
                )}
              </div>
            </div>
          )}
        </div>
        {showHeader && renderComponent && (
          <div className="demo-effect">
            <h3 className="demo-effect-header">{t('demoEffect')}</h3>
            <div className={`demo-box`}>{renderComponent}</div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DemoSection;
