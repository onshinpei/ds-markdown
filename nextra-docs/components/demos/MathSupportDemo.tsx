'use client';

import React, { useRef, useState, useEffect } from 'react';
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

interface MathSupportDemoProps {
  markdown?: string;
}

/**
 * 数学公式支持演示组件
 * 展示 KaTeX 数学公式渲染功能
 */
export const MathSupportDemo: React.FC<MathSupportDemoProps> = ({ 
  markdown = `# 数学公式支持

ds-markdown 支持使用 KaTeX 渲染数学公式。

## 行内公式

质能方程：$E = mc^2$

勾股定理：$a^2 + b^2 = c^2$

## 块级公式

$$
\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}
$$

## 矩阵

$$
\\begin{bmatrix}
a & b \\\\
c & d
\\end{bmatrix}
$$

## 求和公式

$$
\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}
$$

> 提示：点击"禁用数学"按钮查看未渲染的效果`
}) => {
  const markdownRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [disableTyping, setDisableTyping] = useState(false);
  const [mathOpen, setMathOpen] = useState(true);

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
    setDisableTyping(!disableTyping);
  };

  const handleToggleMath = () => {
    setMathOpen(!mathOpen);
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
      title="📐 数学公式演示" 
      description="展示 KaTeX 数学公式的渲染效果，支持行内和块级公式"
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
          <button 
            className="demo-btn demo-btn-outline" 
            onClick={handleToggleMath}
          >
            {mathOpen ? '📐 禁用数学' : '📐 启用数学'}
          </button>
        </div>

        <div className="demo-preview">
          <DsMarkdown
            ref={markdownRef}
            interval={8}
            answerType="answer"
            theme={theme}
            // plugins={mathOpen ? [katexPlugin] : []}
            // math={{ splitSymbol: 'dollar' }}
            disableTyping={disableTyping}
            autoStartTyping={false}
            onStart={handleTypingStart}
            onEnd={handleTypingEnd}
          >
            {markdown}
          </DsMarkdown>
        </div>
      </div>
    </DemoContainer>
  );
};

export default MathSupportDemo;

