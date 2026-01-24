'use client';

import React, { useRef, useState, useEffect } from 'react';
import DemoContainer from './DemoContainer';

// 如果 ds-markdown 已安装，取消下面的注释
// import DsMarkdown, { type MarkdownRef, ConfigProvider } from 'ds-markdown';
// import mermaidPlugin from 'ds-markdown-mermaid-plugin';
// import 'ds-markdown-mermaid-plugin/style.css';

// 临时占位符组件
const DsMarkdown = ({ children, ...props }: any) => (
  <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
    <p style={{ color: '#666', marginBottom: '10px' }}>
      ⚠️ 请先安装依赖: <code>npm install ds-markdown ds-markdown-mermaid-plugin</code>
    </p>
    <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
      {children}
    </pre>
  </div>
);

const ConfigProvider = ({ children }: any) => <>{children}</>;

interface MermaidDemoProps {
  markdown?: string;
}

/**
 * Mermaid 图表演示组件
 * 展示流程图、时序图等 Mermaid 图表的渲染
 */
export const MermaidDemo: React.FC<MermaidDemoProps> = ({ 
  markdown = `# Mermaid 图表支持

ds-markdown 支持 Mermaid 图表渲染。

## 流程图

\`\`\`mermaid
graph TD
    A[开始] --> B{是否登录?}
    B -->|是| C[显示主页]
    B -->|否| D[跳转登录]
    C --> E[结束]
    D --> E
\`\`\`

## 时序图

\`\`\`mermaid
sequenceDiagram
    participant 用户
    participant 前端
    participant 后端
    用户->>前端: 发起请求
    前端->>后端: API调用
    后端-->>前端: 返回数据
    前端-->>用户: 显示结果
\`\`\`

## 饼图

\`\`\`mermaid
pie title 编程语言使用占比
    "JavaScript" : 45
    "Python" : 30
    "Java" : 15
    "其他" : 10
\`\`\`

> 提示：Mermaid 支持多种图表类型！`
}) => {
  const markdownRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [disableTyping, setDisableTyping] = useState(false);

  const mermaidConfig = {
    flowchart: { useMaxWidth: true, htmlLabels: true },
  };

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

  const handleToggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleToggleTyping = () => {
    setDisableTyping((v) => !v);
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

  return (
    <DemoContainer 
      title="📊 Mermaid 图表演示" 
      description="展示流程图、时序图、饼图等 Mermaid 图表的渲染效果"
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

        <div className="demo-preview">
          <ConfigProvider mermaidConfig={mermaidConfig}>
            <DsMarkdown
              ref={markdownRef}
              interval={5}
              answerType="answer"
              theme={theme}
              disableTyping={disableTyping}
              autoStartTyping={false}
              // plugins={[mermaidPlugin]}
              onStart={handleTypingStart}
              onEnd={handleTypingEnd}
            >
              {markdown}
            </DsMarkdown>
          </ConfigProvider>
        </div>
      </div>
    </DemoContainer>
  );
};

export default MermaidDemo;

