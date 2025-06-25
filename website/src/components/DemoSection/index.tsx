import React, { useState } from 'react';
import type { DemoSectionProps } from '../../defined';

// Demo组件
const DemoSection: React.FC<DemoSectionProps> = ({ id, title, sourceCode, showHeader = true, renderComponent, children }) => {
  const [activeTab, setActiveTab] = useState<'code' | 'markdown'>('code');

  return (
    <section id={id} className="section">
      <h2>{title}</h2>
      <div className={`demo-container ${!showHeader ? 'source-only' : ''}`}>
        <div className="source-code">
          {showHeader && (
            <div className="source-header">
              <div className="tabs">
                <button className={`tab ${activeTab === 'code' ? 'active' : ''}`} onClick={() => setActiveTab('code')}>
                  📄 Code
                </button>
                <button className={`tab ${activeTab === 'markdown' ? 'active' : ''}`} onClick={() => setActiveTab('markdown')}>
                  📝 Markdown String
                </button>
              </div>
            </div>
          )}
          <pre className="code-block">
            <code className={activeTab === 'code' ? 'language-tsx' : 'language-markdown'}>{showHeader ? (activeTab === 'code' ? sourceCode.code : sourceCode.markdownString) : sourceCode.code}</code>
          </pre>
        </div>
        {showHeader && renderComponent && (
          <div className="demo-effect">
            <h3>显示效果：</h3>
            <div className="demo-box">
              <div style={{ flex: 1 }}>{renderComponent}</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DemoSection;
