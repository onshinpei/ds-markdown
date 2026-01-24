'use client';

import React, { useState, useRef, useEffect } from 'react';
import DemoContainer from './DemoContainer';

// 如果 ds-markdown 已安装，取消下面的注释
// import DsMarkdown, { type MarkdownRef } from 'ds-markdown';
// import { katexPlugin } from 'ds-markdown/plugins';

// 临时占位符组件
const DsMarkdown = ({ children, ...props }: any) => (
  <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
    <p style={{ color: '#666', marginBottom: '10px' }}>
      ⚠️ 请先安装 ds-markdown: <code>npm install ds-markdown</code>
    </p>
    <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
      {children}
    </pre>
  </div>
);

interface CustomThemeDemoProps {
  markdown?: string;
}

/**
 * 自定义主题演示组件
 * 展示如何自定义主题样式，包含亮色和暗色主题预览
 */
export const CustomThemeDemo: React.FC<CustomThemeDemoProps> = ({ 
  markdown = `# 自定义主题演示

当前主题：**{{THEME}}**

## 主题特性

- 🎨 支持自定义颜色方案
- 🌗 亮色/暗色主题切换
- 💅 灵活的样式定制

### 代码高亮

\`\`\`javascript
const theme = {
  primary: '#6366f1',
  secondary: '#8b5cf6',
  background: '#ffffff'
};
\`\`\`

> 提示：点击主题切换按钮查看不同效果！`
}) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const markdownRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [disableTyping, setDisableTyping] = useState(false);

  // 视口检测
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isStarted) {
          setTimeout(() => {
            handleStart();
          }, 500);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px',
      },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isStarted]);

  const handleToggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleToggleTyping = () => {
    setDisableTyping(!disableTyping);
  };

  const handleStart = () => {
    if (isStarted) {
      markdownRef.current?.restart?.();
    } else {
      markdownRef.current?.start?.();
      setIsStarted(true);
    }
    setIsTyping(true);
    setIsStopped(false);
  };

  const handleStop = () => {
    markdownRef.current?.stop?.();
    setIsStopped(true);
  };

  const handleResume = () => {
    markdownRef.current?.resume?.();
    setIsTyping(true);
    setIsStopped(false);
  };

  const handleTypingStart = () => {
    setIsTyping(true);
  };

  const handleTypingEnd = (data?: { manual?: boolean }) => {
    if (!data?.manual) {
      setIsTyping(false);
      setIsStopped(false);
    }
  };

  // 根据当前主题替换占位符
  const markdownContent = markdown.replace('{{THEME}}', theme === 'light' ? '亮色' : '暗色');

  return (
    <DemoContainer 
      title="🎨 主题定制演示" 
      description="展示亮色和暗色主题的自定义样式效果"
    >
      <div 
        ref={containerRef} 
        className={`demo-impl ${theme === 'dark' ? 'demo-impl-dark' : 'demo-impl-light'}`}
      >
        <div className="demo-controls">
          <button 
            className="demo-btn demo-btn-success" 
            onClick={handleStart} 
            disabled={isStopped}
          >
            {isStarted ? '🔄 重新开始' : '▶️ 开始'}
          </button>
          <button 
            className="demo-btn demo-btn-danger" 
            onClick={handleStop} 
            disabled={!isTyping || isStopped}
          >
            ⏸️ 停止
          </button>
          <button 
            className="demo-btn demo-btn-warning" 
            onClick={handleResume} 
            disabled={!isStopped}
          >
            ▶️ 继续
          </button>
          <button 
            className="demo-btn demo-btn-secondary" 
            onClick={handleToggleTheme}
          >
            {theme === 'light' ? '🌙 暗色主题' : '☀️ 亮色主题'}
          </button>
          <button 
            className="demo-btn demo-btn-outline" 
            onClick={handleToggleTyping}
          >
            {disableTyping ? '🎬 启用打字' : '⏭️ 禁用打字'}
          </button>
        </div>

        <div className="theme-preview-container">
          <div className="theme-preview-item">
            <h4 className="theme-preview-title">☀️ 浅色主题预览</h4>
            <div className="theme-sample light-theme">
              <div className="theme-header">Header</div>
              <div className="theme-content">Content Area</div>
              <div className="theme-footer">Footer</div>
            </div>
          </div>
          <div className="theme-preview-item">
            <h4 className="theme-preview-title">🌙 深色主题预览</h4>
            <div className="theme-sample dark-theme">
              <div className="theme-header">Header</div>
              <div className="theme-content">Content Area</div>
              <div className="theme-footer">Footer</div>
            </div>
          </div>
        </div>

        <div className="demo-preview">
          <DsMarkdown
            ref={markdownRef}
            interval={20}
            answerType="answer"
            theme={theme}
            disableTyping={disableTyping}
            autoStartTyping={false}
            onStart={handleTypingStart}
            onEnd={handleTypingEnd}
          >
            {markdownContent}
          </DsMarkdown>
        </div>
      </div>
    </DemoContainer>
  );
};

export default CustomThemeDemo;

