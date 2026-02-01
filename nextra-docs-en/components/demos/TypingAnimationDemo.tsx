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
 * Typing Animation Configuration Demo Component
 * Demonstrates the effects of various typing animation parameters
 */
export const TypingAnimationDemo: React.FC<TypingAnimationDemoProps> = ({
  markdown = `# Typing Animation Configuration

This demo shows various typing animation configuration options.

## Speed Control

Control typing speed by adjusting the \`interval\` parameter:
- Fast: 5ms
- Normal: 20ms  
- Slow: 50ms

## Timer Type

Supports two timer types:
- \`setTimeout\` - Traditional timer
- \`requestAnimationFrame\` - Animation frame

## Theme Styles

- **Light Theme** - Suitable for daytime reading
- **Dark Theme** - Suitable for nighttime use

> Adjust the configuration below to see different effects!`
}) => {
  const markdownRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  // Configuration state
  const [interval, setInterval] = useState(20);
  const [timerType, setTimerType] = useState<'setTimeout' | 'requestAnimationFrame'>('setTimeout');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [disableTyping, setDisableTyping] = useState(false);
  const [autoStartTyping, setAutoStartTyping] = useState(false);

  // Typing statistics
  const [stats, setStats] = useState<TypingStats>({
    currentIndex: 0,
    currentChar: '',
    percent: 0,
    totalChars: markdown.length,
    avgSpeed: 0,
  });

  // Viewport detection
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

  // Example code
  const exampleCode = `import DsMarkdown from 'ds-markdown';
import { useRef } from 'react';

function TypingAnimation() {
  const markdownRef = useRef(null);

  return (
    <DsMarkdown
      ref={markdownRef}
      // Typing speed (ms)
      interval={20}
      // Timer type: setTimeout or requestAnimationFrame
      timerType="setTimeout"
      // Theme: light or dark
      theme="light"
      // Whether to disable typing animation
      disableTyping={false}
      // Whether to auto-start typing
      autoStartTyping={true}
      // Typing event callbacks
      onStart={() => console.log('Started')}
      onEnd={() => console.log('Ended')}
      onTypedChar={(data) => {
        console.log('Current char:', data.currentChar);
        console.log('Progress:', data.percent + '%');
      }}
    >
      # Typing Animation Configuration

      Control typing effects by adjusting parameters:
      - **interval** - Typing speed
      - **timerType** - Timer type
      - **disableTyping** - Disable animation
    </DsMarkdown>
  );
}`;

  return (
    <DemoContainer
      title="⚙️ Typing Animation Configuration"
      description="Adjust various parameters in real-time to see different typing animation effects"
      code={exampleCode}
      language="tsx"
    >
      <div
        ref={containerRef}
        className={`demo-impl ${theme === 'dark' ? 'demo-impl-dark' : 'demo-impl-light'}`}
      >
        {/* Control buttons */}
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
        </div>

        {/* Configuration panel */}
        <div className="typing-config-panel">
          <div className="config-row">
            <label className="config-label">
              ⚡ Typing Speed (interval): {interval}ms
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
            <label className="config-label">⏱️ Timer Type:</label>
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
            <label className="config-label">🎨 Theme:</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as any)}
              className="config-select"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <div className="config-row">
            <label className="config-checkbox">
              <input
                type="checkbox"
                checked={disableTyping}
                onChange={(e) => setDisableTyping(e.target.checked)}
              />
              <span>Disable Typing Animation</span>
            </label>
          </div>

          <div className="config-row">
            <label className="config-checkbox">
              <input
                type="checkbox"
                checked={autoStartTyping}
                onChange={(e) => setAutoStartTyping(e.target.checked)}
              />
              <span>Auto Start Typing</span>
            </label>
          </div>
        </div>

        {/* Statistics */}
        <div className="typing-stats">
          <div className="stat-item">
            <span className="stat-label">Progress:</span>
            <span className="stat-value">{stats.percent.toFixed(1)}%</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Current Char:</span>
            <span className="stat-value">{stats.currentChar || '-'}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Position:</span>
            <span className="stat-value">{stats.currentIndex} / {stats.totalChars}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Avg Speed:</span>
            <span className="stat-value">{stats.avgSpeed} chars/sec</span>
          </div>
        </div>

        {/* Preview area */}
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
