'use client';

import React, { useRef, useState, useEffect } from 'react';
import DemoContainer from './DemoContainer';
import DsMarkdown, { type MarkdownRef } from 'ds-markdown';

interface BasicUsageDemoProps {
  markdown?: string;
}

/**
 * Basic Usage Demo Component
 * Demonstrates basic features of ds-markdown: typing animation, theme switching, etc.
 */
export const BasicUsageDemo: React.FC<BasicUsageDemoProps> = ({
  markdown = `# Hello ds-markdown

This is a **high-performance** typing animation component!

## Features

- ⚡ Zero-latency streaming processing
- 🎬 Smooth typing animation
- 🎯 Perfect syntax support
- 📝 Full Markdown support

### Code Example

\`\`\`javascript
function greet() {
  console.log('Hello World!');
}
\`\`\`

> Tip: This is a live demo, you can see the typing effect!`
}) => {
  const markdownRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [disableTyping, setDisableTyping] = useState(false);

  // Viewport detection - automatically start typing when component enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isStarted) {
          // Delay a bit before starting typing to give users a visual buffer
          setTimeout(() => {
            handleStart();
          }, 500);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of content is visible
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

  // Event handlers
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

  // Example code
  const exampleCode = `import DsMarkdown from 'ds-markdown';
import { useRef } from 'react';

function App() {
  const markdownRef = useRef(null);

  return (
    <DsMarkdown
      ref={markdownRef}
      interval={20}
      answerType="answer"
      theme="light"
      autoStartTyping={false}
      onStart={() => console.log('Started typing')}
      onEnd={() => console.log('Typing ended')}
    >
      # Hello ds-markdown

      This is a **high-performance** typing animation component!

      ## Features

      - ⚡ Zero-latency streaming processing
      - 🎬 Smooth typing animation
      - 🎯 Perfect syntax support
      - 📝 Full Markdown support
    </DsMarkdown>
  );
}`;

  return (
    <DemoContainer
      title="🎬 Basic Usage"
      description="Demonstrates basic typing animation effects of ds-markdown, supports theme switching, playback control, and more"
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
          <button
            className="demo-btn demo-btn-outline"
            onClick={handleToggleTyping}
          >
            {disableTyping ? '🎬 Enable Typing' : '⏭️ Disable Typing'}
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
