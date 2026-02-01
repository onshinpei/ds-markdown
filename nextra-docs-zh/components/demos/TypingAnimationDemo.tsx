'use client';

import React, { useState, useRef, useEffect } from 'react';
import DemoContainer from './DemoContainer';
import DsMarkdown, { type MarkdownRef } from 'ds-markdown';

interface TypingAnimationDemoProps {
  markdown?: string;
}

interface TypingStats {
  currentIndex: number;
  currentChar: string;
  percent: number;
  totalChars: number;
  avgSpeed: number;
}

/**
 * 打字动画配置演示组件
 * 展示各种打字动画参数的效果
 */
export const TypingAnimationDemo: React.FC<TypingAnimationDemoProps> = ({
  markdown = `# 打字动画配置

这个演示展示了各种打字动画的配置选项。

## 速度控制

通过调整 \`interval\` 参数控制打字速度：
- 快速：5ms
- 正常：20ms  
- 慢速：50ms

## 定时器类型

支持两种定时器：
- \`setTimeout\` - 传统定时器
- \`requestAnimationFrame\` - 动画帧

## 主题样式

- **亮色主题** - 适合白天阅读
- **暗色主题** - 适合夜间使用

> 调整下方配置查看不同效果！`
}) => {
  const markdownRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  // 配置状态
  const [interval, setInterval] = useState(20);
  const [timerType, setTimerType] = useState<'setTimeout' | 'requestAnimationFrame'>('setTimeout');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [disableTyping, setDisableTyping] = useState(false);
  const [autoStartTyping, setAutoStartTyping] = useState(false);

  // 打字统计
  const [stats, setStats] = useState<TypingStats>({
    currentIndex: 0,
    currentChar: '',
    percent: 0,
    totalChars: markdown.length,
    avgSpeed: 0,
  });

  // 视口检测
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isStarted && autoStartTyping) {
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
  }, [isStarted, autoStartTyping]);

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

  const handleTypedChar = (data: any) => {
    setStats({
      currentIndex: data.currentIndex || 0,
      currentChar: data.currentChar || '',
      percent: data.percent || 0,
      totalChars: markdown.length,
      avgSpeed: data.currentIndex > 0 ? Math.round(data.currentIndex / ((Date.now() - (data.startTime || Date.now())) / 1000)) : 0,
    });
  };

  // 示例代码
  const exampleCode = `import DsMarkdown from 'ds-markdown';
import { useRef } from 'react';

function TypingAnimation() {
  const markdownRef = useRef(null);

  return (
    <DsMarkdown
      ref={markdownRef}
      // 打字速度（毫秒）
      interval={20}
      // 定时器类型：setTimeout 或 requestAnimationFrame
      timerType="setTimeout"
      // 主题：light 或 dark
      theme="light"
      // 是否禁用打字动画
      disableTyping={false}
      // 是否自动开始打字
      autoStartTyping={true}
      // 打字事件回调
      onStart={() => console.log('开始')}
      onEnd={() => console.log('结束')}
      onTypedChar={(data) => {
        console.log('当前字符:', data.currentChar);
        console.log('进度:', data.percent + '%');
      }}
    >
      # 打字动画配置

      通过调整参数控制打字效果：
      - **interval** - 打字速度
      - **timerType** - 定时器类型
      - **disableTyping** - 禁用动画
    </DsMarkdown>
  );
}`;

  return (
    <DemoContainer
      title="⚙️ 打字动画配置"
      description="实时调整各种参数，查看打字动画的不同效果"
      code={exampleCode}
      language="tsx"
    >
      <div
        ref={containerRef}
        className={`demo-impl ${theme === 'dark' ? 'demo-impl-dark' : 'demo-impl-light'}`}
      >
        {/* 控制按钮 */}
        <div className="demo-controls">
          <button
            className="demo-btn demo-btn-success"
            onClick={handleStart}
            disabled={isStopped}
          >
            {isStarted ? '🔄 重新开始' : '▶️ 开始'}
          </button>
          {isStopped ? (
            <button
              className="demo-btn demo-btn-warning"
              onClick={handleResume}
            >
              ▶️ 继续
            </button>
          ) : (
            <button
              className="demo-btn demo-btn-danger"
              onClick={handleStop}
              disabled={!isTyping}
            >
              ⏸️ 停止
            </button>
          )}
        </div>

        {/* 配置面板 */}
        <div className="typing-config-panel">
          <div className="config-row">
            <label className="config-label">
              ⚡ 打字速度 (interval): {interval}ms
            </label>
            <input
              type="range"
              min="5"
              max="100"
              value={interval}
              onChange={(e) => setInterval(Number(e.target.value))}
              className="config-slider"
            />
          </div>

          <div className="config-row">
            <label className="config-label">⏱️ 定时器类型:</label>
            <select
              value={timerType}
              onChange={(e) => setTimerType(e.target.value as any)}
              className="config-select"
            >
              <option value="setTimeout">setTimeout</option>
              <option value="requestAnimationFrame">requestAnimationFrame</option>
            </select>
          </div>

          <div className="config-row">
            <label className="config-label">🎨 主题:</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as any)}
              className="config-select"
            >
              <option value="light">亮色</option>
              <option value="dark">暗色</option>
            </select>
          </div>

          <div className="config-row">
            <label className="config-checkbox">
              <input
                type="checkbox"
                checked={disableTyping}
                onChange={(e) => setDisableTyping(e.target.checked)}
              />
              <span>禁用打字动画</span>
            </label>
          </div>

          <div className="config-row">
            <label className="config-checkbox">
              <input
                type="checkbox"
                checked={autoStartTyping}
                onChange={(e) => setAutoStartTyping(e.target.checked)}
              />
              <span>自动开始打字</span>
            </label>
          </div>
        </div>

        {/* 统计信息 */}
        <div className="typing-stats">
          <div className="stat-item">
            <span className="stat-label">进度:</span>
            <span className="stat-value">{stats.percent.toFixed(1)}%</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">当前字符:</span>
            <span className="stat-value">{stats.currentChar || '-'}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">位置:</span>
            <span className="stat-value">{stats.currentIndex} / {stats.totalChars}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">平均速度:</span>
            <span className="stat-value">{stats.avgSpeed} 字符/秒</span>
          </div>
        </div>

        {/* 预览区域 */}
        <div className="demo-preview">
          <DsMarkdown
            ref={markdownRef}
            interval={interval}
            timerType={timerType}
            answerType="answer"
            theme={theme}
            disableTyping={disableTyping}
            autoStartTyping={autoStartTyping}
            onStart={handleTypingStart}
            onEnd={handleTypingEnd}
            onTypedChar={handleTypedChar}
          >
            {markdown}
          </DsMarkdown>
        </div>
      </div>
    </DemoContainer>
  );
};

export default TypingAnimationDemo;

