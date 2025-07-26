// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import type { DemoSectionProps } from '../../defined';
import { useI18n } from '../../hooks/useI18n';
import DsMarkdown from 'ds-markdown';

// Demo组件
const DemoSection: React.FC<DemoSectionProps> = ({ id, title, sourceCode, showHeader = true, renderComponent, children, onlyShowCode = false }) => {
  const [activeTab, setActiveTab] = useState<'code' | 'markdown'>(onlyShowCode ? 'code' : 'markdown');
  const { t } = useI18n();
  return (
    <section id={id} className="section">
      <h2 className="section-title">{title}</h2>
      <div className={`demo-container ${!showHeader ? 'source-only' : ''}`}>
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
                    <DsMarkdown interval={16.67}>{sourceCode.code.trim()}</DsMarkdown>
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
