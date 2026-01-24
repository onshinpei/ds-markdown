'use client';

import React, { useRef, useState, useEffect } from 'react';
import DemoContainer from './DemoContainer';
import DsMarkdown, { type MarkdownRef } from 'ds-markdown';

interface BasicUsageDemoProps {
  markdown?: string;
}

/**
 * 基础用法演示组件
 * 展示 ds-markdown 的基本功能：打字动画、主题切换等
 */
export const BasicUsageDemo: React.FC<BasicUsageDemoProps> = ({ 
  markdown = `# Hello ds-markdown

这是一个**高性能**的打字动画组件！

## 特性

- ⚡ 零延迟流式处理
- 🎬 流畅打字动画
- 🎯 完美语法支持
- 📝 完整 Markdown 支持

### 代码示例

\`\`\`javascript
function greet() {
  console.log('Hello World!');
}
\`\`\`

> 提示：这是一个实时演示，你可以看到打字效果！`
}) => {
  const markdownRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [disableTyping, setDisableTyping] = useState(false);

  // 视口检测 - 当组件进入视口时自动开始打字
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isStarted) {
          // 延迟一点开始打字，给用户一个视觉缓冲
          setTimeout(() => {
            handleStart();
          }, 500);
        }
      },
      {
        threshold: 0.3, // 当30%的内容可见时触发
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

  // 事件处理函数
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
      title="🎬 实时演示" 
      description="点击按钮控制打字动画、切换主题等"
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
          <DsMarkdown 
            ref={markdownRef} 
            interval={5} 
            answerType="answer" 
            theme={theme} 
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

export default BasicUsageDemo;

