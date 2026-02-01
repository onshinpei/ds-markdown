'use client';

import React, { useState, useRef, useEffect } from 'react';
import DemoContainer from './DemoContainer';
import DsMarkdown, { type MarkdownRef } from 'ds-markdown';

interface CustomThemeDemoProps {
  markdown?: string;
}

/**
 * Custom Theme Demo Component
 * Demonstrates how to customize theme styles, including light and dark theme previews
 */
export const CustomThemeDemo: React.FC<CustomThemeDemoProps> = ({ 
  markdown = `# Custom Theme Demo

Current Theme: **{{THEME}}**

## Theme Features

- 🎨 Support custom color schemes
- 🌗 Light/dark theme switching
- 💅 Flexible style customization

### Code Highlighting

\`\`\`javascript
const theme = {
  primary: '#6366f1',
  secondary: '#8b5cf6',
  background: '#ffffff'
};
\`\`\`

> Tip: Click the theme toggle button to see different effects!`
}) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const markdownRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [disableTyping, setDisableTyping] = useState(false);

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

  // Replace placeholder based on current theme
  const markdownContent = markdown.replace('{{THEME}}', theme === 'light' ? 'Light' : 'Dark');

  // Example code
  const exampleCode = `import DsMarkdown from 'ds-markdown';
import { useState } from 'react';

function ThemedMarkdown() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <div>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
      
      <DsMarkdown
        theme={theme}
        interval={20}
        answerType="answer"
      >
        # Theme Demo

        Current Theme: **{theme === 'light' ? 'Light' : 'Dark'}**

        ## Features
        - 🎨 Support light/dark themes
        - 🖌️ Customizable styles
        - 🔄 Real-time switching effects
      </DsMarkdown>
    </div>
  );
}`;

  return (
    <DemoContainer 
      title="🎨 Custom Theme Demo" 
      description="Demonstrates custom style effects of light and dark themes"
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

        <div className="theme-preview-container">
          <div className="theme-preview-item">
            <h4 className="theme-preview-title">☀️ Light Theme Preview</h4>
            <div className="theme-sample light-theme">
              <div className="theme-header">Header</div>
              <div className="theme-content">Content Area</div>
              <div className="theme-footer">Footer</div>
            </div>
          </div>
          <div className="theme-preview-item">
            <h4 className="theme-preview-title">🌙 Dark Theme Preview</h4>
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
