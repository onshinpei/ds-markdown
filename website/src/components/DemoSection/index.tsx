import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import DsMarkdown, { MarkdownProps } from 'ds-markdown';
import { katexPlugin } from 'ds-markdown/plugins';
import { demoData } from '../../demoData';
import type { DemoSectionProps } from '../../defined';

// Demo组件
const DemoSection: React.FC<DemoSectionProps> = ({ id, title, sourceCode, demoType, showHeader = true, children }) => {
  const [isRendered, setIsRendered] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'code' | 'markdown'>('code');
  const containerRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<ReactDOM.Root | null>(null);

  const startDemo = (): void => {
    if (containerRef.current) {
      try {
        const props: Omit<MarkdownProps, 'children'> = {
          interval: 20,
          answerType: 'answer',
          theme: 'light',
        };

        if (demoType === 'math' && katexPlugin) {
          props.plugins = [katexPlugin];
          props.math = { splitSymbol: 'dollar' };
          props.interval = 25;
        }

        if (demoType === 'typing') {
          props.interval = 30;
        }

        // 创建demoType到demoData键的映射
        const demoDataMap = {
          installation: 'installation',
          basic: 'basic',
          math: 'math',
          typing: 'typing',
          theme: 'theme',
          advanced: 'basic', // advanced使用basic的数据
        } as const;

        const dataKey = demoDataMap[demoType] as keyof typeof demoData;
        const content = demoType === 'theme' ? demoData[dataKey].replace('{{THEME}}', '亮色') : demoData[dataKey];

        if (!rootRef.current) {
          rootRef.current = ReactDOM.createRoot(containerRef.current);
        }

        rootRef.current.render(React.createElement(DsMarkdown, props as MarkdownProps, content));
        setIsRendered(true);
        console.log(`✅ ${demoType} demo rendered`);
      } catch (error) {
        console.error(`❌ Error rendering ${demoType} demo:`, error);
        if (containerRef.current) {
          containerRef.current.innerHTML = `
            <div style="color: red; padding: 20px;">
              <h4>渲染错误</h4>
              <p>错误信息: ${error instanceof Error ? error.message : 'Unknown error'}</p>
            </div>
          `;
        }
      }
    }
  };

  const resetDemo = (): void => {
    if (rootRef.current && containerRef.current) {
      try {
        rootRef.current.unmount();
        rootRef.current = null;
        containerRef.current.innerHTML = '';
        setIsRendered(false);
        console.log(`✅ ${demoType} demo reset`);
      } catch (error) {
        console.error(`Error resetting ${demoType} demo:`, error);
      }
    }
  };

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
        {showHeader && (
          <div className="demo-effect">
            <h3>显示效果：</h3>
            <div className="demo-box">
              <div className="controls">
                <button className="btn" onClick={startDemo}>
                  {isRendered ? '演示中...' : '开始演示'}
                </button>
                <button className="btn" onClick={resetDemo} disabled={!isRendered}>
                  重置
                </button>
                {children}
              </div>
              <div ref={containerRef} className="demo-result"></div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DemoSection;
