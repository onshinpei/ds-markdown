'use client';

import React, { useRef, useState, useEffect } from 'react';
import DemoContainer from './DemoContainer';
import DsMarkdown, { type MarkdownRef, ConfigProvider } from 'ds-markdown';

// Removed static import
// import mermaidPlugin from 'ds-markdown-mermaid-plugin';
// import 'ds-markdown-mermaid-plugin/style.css';

interface MermaidDemoProps {
  markdown?: string;
}

/**
 * Mermaid Chart Demo Component
 * Demonstrates rendering of flowcharts, sequence diagrams and other Mermaid charts
 */
export const MermaidDemo: React.FC<MermaidDemoProps> = ({ 
  markdown = `# Mermaid Chart Support

ds-markdown supports Mermaid chart rendering.

## Flowchart

\`\`\`mermaid
graph TD
    A[Start] --> B{Is Logged In?}
    B -->|Yes| C[Show Homepage]
    B -->|No| D[Redirect to Login]
    C --> E[End]
    D --> E
\`\`\`

## Sequence Diagram

\`\`\`mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    User->>Frontend: Send Request
    Frontend->>Backend: API Call
    Backend-->>Frontend: Return Data
    Frontend-->>User: Display Result
\`\`\`

## Pie Chart

\`\`\`mermaid
pie title Programming Language Usage
    "JavaScript" : 45
    "Python" : 30
    "Java" : 15
    "Others" : 10
\`\`\`

> Tip: Mermaid supports many chart types!`
}) => {
  const markdownRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [disableTyping, setDisableTyping] = useState(false);
  const [mermaidPlugin, setMermaidPlugin] = useState<any>(null);

  // Dynamically load mermaid plugin
  useEffect(() => {
    import('ds-markdown-mermaid-plugin').then((plugin) => {
      setMermaidPlugin(plugin.default);
    });
  }, []);

  const mermaidConfig = {
    flowchart: { useMaxWidth: true, htmlLabels: true },
  };

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
  const exampleCode = `import DsMarkdown, { ConfigProvider } from 'ds-markdown';
import mermaidPlugin from 'ds-markdown-mermaid-plugin';
import 'ds-markdown-mermaid-plugin/style.css';

function MermaidMarkdown() {
  const mermaidConfig = {
    flowchart: { useMaxWidth: true, htmlLabels: true },
  };

  return (
    <ConfigProvider mermaidConfig={mermaidConfig}>
      <DsMarkdown
        interval={20}
        plugins={[mermaidPlugin]}
      >
        # Mermaid Charts

        ## Flowchart

        \\\`\\\`\\\`mermaid
        graph TD
            A[Start] --> B{Is Logged In?}
            B -->|Yes| C[Show Homepage]
            B -->|No| D[Redirect to Login]
            C --> E[End]
            D --> E
        \\\`\\\`\\\`

        ## Sequence Diagram

        \\\`\\\`\\\`mermaid
        sequenceDiagram
            participant User
            participant Frontend
            participant Backend
            User->>Frontend: Send Request
            Frontend->>Backend: API Call
            Backend-->>Frontend: Return Data
            Frontend-->>User: Display Result
        \\\`\\\`\\\`
      </DsMarkdown>
    </ConfigProvider>
  );
}`;

  return (
    <DemoContainer 
      title="📊 Mermaid Chart Demo" 
      description="Demonstrates rendering effects of flowcharts, sequence diagrams, pie charts and other Mermaid charts"
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
          <ConfigProvider mermaidConfig={mermaidConfig}>
            <DsMarkdown
              ref={markdownRef}
              interval={5}
              answerType="answer"
              theme={theme}
              disableTyping={disableTyping}
              autoStartTyping={false}
              plugins={mermaidPlugin ? [mermaidPlugin] : []}
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
