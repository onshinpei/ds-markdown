'use client';

import React, { useRef, useState, useEffect } from 'react';
import DemoContainer from './DemoContainer';
import DsMarkdown, { type MarkdownRef } from 'ds-markdown';

interface CursorDemoProps {
    markdown?: string;
}

type CursorType = 'line' | 'block' | 'underline' | 'circle' | 'custom';

/**
 * Cursor Style Demo Component
 * Demonstrates various cursor types and custom cursors
 */
export const CursorDemo: React.FC<CursorDemoProps> = ({
    markdown = `# Cursor Style Demo

ds-markdown supports multiple cursor styles to enhance the visual effects of typing animation.

## Built-in Styles

- **Line Cursor** (line) - Classic text editor cursor
- **Block Cursor** (block) - Block cursor, more prominent
- **Underline Cursor** (underline) - Bottom underline style
- **Circle Cursor** (circle) - Circular dot cursor

## Custom Cursor

You can also pass a custom React element as the cursor, with full control over style and animation.

> Tip: Switch the options below to see different cursor effects!`
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

    // Viewport detection
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
            // Restart to apply new cursor style
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

    // Get current cursor element
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

    // Example code
    const exampleCode = `import DsMarkdown from 'ds-markdown';

function CursorExamples() {
  return (
    <div>
      {/* Default line cursor */}
      <DsMarkdown showCursor>
        # Default Cursor
        This is an example using the default line cursor.
      </DsMarkdown>

      {/* Block cursor */}
      <DsMarkdown showCursor cursor="block">
        # Block Cursor
        This is an example using block cursor.
      </DsMarkdown>

      {/* Underline cursor */}
      <DsMarkdown showCursor cursor="underline">
        # Underline Cursor
        This is an example using underline cursor.
      </DsMarkdown>

      {/* Circle cursor */}
      <DsMarkdown showCursor cursor="circle">
        # Circle Cursor
        This is an example using circle cursor.
      </DsMarkdown>

      {/* Custom cursor */}
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
        # Custom Cursor
        This is an example using custom cursor.
      </DsMarkdown>
    </div>
  );
}`;

    return (
        <DemoContainer
            title="⌨️ Cursor Style Demo"
            description="Demonstrates various cursor types: line, block, underline, circle, and custom cursor"
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
                        {isStarted ? '🔄 Restart' : '▶️ Start'}
                    </button>
                    {isStopped ? (
                        <button
                            className="demo-btn demo-btn-warning"
                            onClick={handleResume}
                        >
                            ▶️ Resume
                        </button>
                    ) : (
                        <button
                            className="demo-btn demo-btn-danger"
                            onClick={handleStop}
                            disabled={!isTyping}
                        >
                            ⏸️ Stop
                        </button>
                    )}
                    <button
                        className="demo-btn demo-btn-secondary"
                        onClick={handleToggleTheme}
                    >
                        {theme === 'light' ? '🌙 Dark Theme' : '☀️ Light Theme'}
                    </button>
                </div>

                {/* Cursor configuration panel */}
                <div className="cursor-config-panel">
                    <div className="config-row">
                        <label className="config-checkbox">
                            <input
                                type="checkbox"
                                checked={showCursor}
                                onChange={(e) => setShowCursor(e.target.checked)}
                            />
                            <span>Show Cursor</span>
                        </label>
                    </div>

                    {showCursor && (
                        <>
                            <div className="config-row">
                                <label className="config-label">Cursor Type:</label>
                                <select
                                    value={cursorType}
                                    onChange={(e) => handleCursorTypeChange(e.target.value as CursorType)}
                                    className="config-select"
                                >
                                    <option value="line">📏 Line (line)</option>
                                    <option value="block">▊ Block (block)</option>
                                    <option value="underline">▁ Underline (underline)</option>
                                    <option value="circle">● Circle (circle)</option>
                                    <option value="custom">🎨 Custom</option>
                                </select>
                            </div>

                            {cursorType === 'custom' && (
                                <>
                                    <div className="config-row">
                                        <label className="config-label">Custom Character:</label>
                                        <input
                                            type="text"
                                            value={customCursorText}
                                            onChange={(e) => setCustomCursorText(e.target.value)}
                                            className="config-input"
                                            placeholder="e.g., ▊, |, ❯"
                                            maxLength={5}
                                        />
                                    </div>
                                    <div className="config-row">
                                        <label className="config-label">Color:</label>
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

                {/* Preview area */}
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
