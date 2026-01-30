'use client';

import React, { useRef, useState, useEffect } from 'react';
import DemoContainer from './DemoContainer';
import DsMarkdown, { type MarkdownRef } from 'ds-markdown';

interface CursorDemoProps {
    markdown?: string;
}

type CursorType = 'line' | 'block' | 'underline' | 'circle' | 'custom';

/**
 * 光标样式演示组件
 * 展示各种光标类型和自定义光标
 */
export const CursorDemo: React.FC<CursorDemoProps> = ({
    markdown = `# 光标样式演示

ds-markdown 支持多种光标样式，增强打字动画的视觉效果。

## 内置样式

- **竖线光标** (line) - 经典的文本编辑器光标
- **实心块光标** (block) - 块状光标，更醒目
- **下划线光标** (underline) - 底部下划线样式
- **圆点光标** (circle) - 圆形点状光标

## 自定义光标

你也可以传入自定义的 React 元素作为光标，完全控制样式和动画。

> 提示：切换下方选项查看不同光标效果！`
}) => {
    const markdownRef = useRef<MarkdownRef>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isTyping, setIsTyping] = useState(false);
    const [isStopped, setIsStopped] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [showCursor, setShowCursor] = useState(true);
    const [cursorType, setCursorType] = useState<CursorType>('line');
    const [customCursorText, setCustomCursorText] = useState('▊');
    const [customCursorColor, setCustomCursorColor] = useState('#6366f1');

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

    const handleCursorTypeChange = (type: CursorType) => {
        setCursorType(type);
        if (isStarted) {
            // 重新开始以应用新的光标样式
            setTimeout(() => {
                markdownRef.current?.restart?.();
            }, 100);
        }
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

    // 获取当前光标元素
    const getCursor = () => {
        if (!showCursor) return undefined;

        if (cursorType === 'custom') {
            return (
                <span style={{
                    color: customCursorColor,
                    fontSize: '1.2em',
                    fontWeight: 'bold',
                    marginLeft: '2px',
                    animation: 'blink 1s infinite'
                }}>
                    {customCursorText}
                </span>
            );
        }

        return cursorType;
    };

    // 示例代码
    const exampleCode = `import DsMarkdown from 'ds-markdown';

function CursorExamples() {
  return (
    <div>
      {/* 默认竖线光标 */}
      <DsMarkdown showCursor>
        # 默认光标
        这是使用默认竖线光标的示例。
      </DsMarkdown>

      {/* 实心块光标 */}
      <DsMarkdown showCursor cursor="block">
        # 实心块光标
        这是使用实心块光标的示例。
      </DsMarkdown>

      {/* 下划线光标 */}
      <DsMarkdown showCursor cursor="underline">
        # 下划线光标
        这是使用下划线光标的示例。
      </DsMarkdown>

      {/* 圆点光标 */}
      <DsMarkdown showCursor cursor="circle">
        # 圆点光标
        这是使用圆点光标的示例。
      </DsMarkdown>

      {/* 自定义光标 */}
      <DsMarkdown 
        showCursor 
        cursor={
          <span style={{ 
            color: '#6366f1',
            fontSize: '1.2em',
            fontWeight: 'bold'
          }}>
            ▊
          </span>
        }
      >
        # 自定义光标
        这是使用自定义光标的示例。
      </DsMarkdown>
    </div>
  );
}`;

    return (
        <DemoContainer
            title="⌨️ 光标样式演示"
            description="展示各种光标类型：竖线、实心块、下划线、圆点和自定义光标"
            code={exampleCode}
            language="tsx"
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
                    <button
                        className="demo-btn demo-btn-secondary"
                        onClick={handleToggleTheme}
                    >
                        {theme === 'light' ? '🌙 暗色主题' : '☀️ 亮色主题'}
                    </button>
                </div>

                {/* 光标配置面板 */}
                <div className="cursor-config-panel">
                    <div className="config-row">
                        <label className="config-checkbox">
                            <input
                                type="checkbox"
                                checked={showCursor}
                                onChange={(e) => setShowCursor(e.target.checked)}
                            />
                            <span>显示光标</span>
                        </label>
                    </div>

                    {showCursor && (
                        <>
                            <div className="config-row">
                                <label className="config-label">光标类型：</label>
                                <select
                                    value={cursorType}
                                    onChange={(e) => handleCursorTypeChange(e.target.value as CursorType)}
                                    className="config-select"
                                >
                                    <option value="line">📏 竖线 (line)</option>
                                    <option value="block">▊ 实心块 (block)</option>
                                    <option value="underline">▁ 下划线 (underline)</option>
                                    <option value="circle">● 圆点 (circle)</option>
                                    <option value="custom">🎨 自定义</option>
                                </select>
                            </div>

                            {cursorType === 'custom' && (
                                <>
                                    <div className="config-row">
                                        <label className="config-label">自定义字符：</label>
                                        <input
                                            type="text"
                                            value={customCursorText}
                                            onChange={(e) => setCustomCursorText(e.target.value)}
                                            className="config-input"
                                            placeholder="例如: ▊, |, ❯"
                                            maxLength={5}
                                        />
                                    </div>
                                    <div className="config-row">
                                        <label className="config-label">颜色：</label>
                                        <div className="color-input-wrapper">
                                            <input
                                                type="color"
                                                value={customCursorColor}
                                                onChange={(e) => setCustomCursorColor(e.target.value)}
                                                className="config-color"
                                            />
                                            <input
                                                type="text"
                                                value={customCursorColor}
                                                onChange={(e) => setCustomCursorColor(e.target.value)}
                                                className="config-input-small"
                                                placeholder="#6366f1"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>

                {/* 预览区域 */}
                <div className="demo-preview">
                    <DsMarkdown
                        ref={markdownRef}
                        interval={8}
                        answerType="answer"
                        theme={theme}
                        showCursor={showCursor}
                        cursor={getCursor()}
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

export default CursorDemo;

