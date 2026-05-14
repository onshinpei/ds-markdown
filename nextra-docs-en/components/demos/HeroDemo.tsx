'use client';

import React, { useRef, useState, useEffect } from 'react';
import DsMarkdown, { MarkdownCMD, ConfigProvider } from 'ds-markdown';
import { katexPlugin } from 'ds-markdown/plugins';

const heroContent = `# Welcome to ds-markdown ✨

A **high-performance** React typing animation component built for modern AI applications.

## 📝 Full Markdown Support

Render **bold**, *italic*, \`inline code\`, and more with smooth typing animations.

| Feature | Support | Description |
|---------|---------|-------------|
| Markdown | ✅ | Full GFM support |
| Code Highlight | ✅ | Syntax highlighting |
| Math Formula | ✅ | KaTeX rendering |
| Mermaid Chart | ✅ | Via plugin |
| Streaming | ✅ | Real-time push |

## 💻 Code Highlighting

\`\`\`tsx
import DsMarkdown from 'ds-markdown';

function App() {
  return (
    <DsMarkdown interval={20} showCursor>
      # Hello ds-markdown!
    </DsMarkdown>
  );
}
\`\`\`

## 🔢 Math Formulas (KaTeX)

Inline: $E = mc^2$ and $a^2 + b^2 = c^2$

Block formula:

$$
\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}
$$

## 📊 Mermaid Charts

\`\`\`mermaid
graph LR
    A[Streaming Data] --> B[ds-markdown]
    B --> C[Typing Animation]
    B --> D[Markdown Render]
    B --> E[Math / Charts]
    C --> F[✨ Perfect Experience]
    D --> F
    E --> F
\`\`\`

> 🚀 **Ready to get started?** Check out the [Get Started](/get-started) guide!
`;

/**
 * Hero Demo — auto-starts on mount, showcases all key features
 */
export const HeroDemo: React.FC = () => {
  const markdownRef = useRef<any>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mermaidPlugin, setMermaidPlugin] = useState<any>(null);

  // Dynamically load mermaid plugin
  useEffect(() => {
    import('ds-markdown-mermaid-plugin').then((mod) => {
      setMermaidPlugin(() => mod.default);
    });
  }, []);

  // Auto-start after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      markdownRef.current?.start?.();
      setIsStarted(true);
      setIsTyping(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleRestart = () => {
    markdownRef.current?.restart?.();
    setIsStarted(true);
    setIsTyping(true);
    setIsStopped(false);
  };

  const handleStop = () => {
    markdownRef.current?.stop?.();
    setIsStopped(true);
    setIsTyping(false);
  };

  const handleResume = () => {
    markdownRef.current?.resume?.();
    setIsStopped(false);
    setIsTyping(true);
  };

  const handleToggleTheme = () => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  };

  const mermaidConfig = {
    flowchart: { useMaxWidth: true, htmlLabels: true },
  };

  return (
    <div className={`hero-demo-wrapper ${theme === 'dark' ? 'hero-demo-dark' : 'hero-demo-light'}`}>
      {/* Toolbar */}
      <div className="hero-demo-toolbar">
        <div className="hero-demo-toolbar-dots">
          <span className="hero-dot hero-dot-red" />
          <span className="hero-dot hero-dot-yellow" />
          <span className="hero-dot hero-dot-green" />
        </div>
        <span className="hero-demo-toolbar-title">ds-markdown — Live Demo</span>
        <div className="hero-demo-toolbar-actions">
          <button className="hero-btn hero-btn-primary" onClick={handleRestart} title="Replay">
            🔄 Replay
          </button>
          {isStopped ? (
            <button className="hero-btn hero-btn-warning" onClick={handleResume}>
              ▶️ Resume
            </button>
          ) : (
            <button className="hero-btn hero-btn-secondary" onClick={handleStop} disabled={!isTyping}>
              ⏸️ Pause
            </button>
          )}
          <button className="hero-btn hero-btn-ghost" onClick={handleToggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="hero-demo-content">
        <ConfigProvider mermaidConfig={mermaidConfig}>
          <DsMarkdown
            ref={markdownRef}
            interval={10}
            answerType="answer"
            theme={theme}
            showCursor
            cursor="line"
            autoStartTyping={false}
            plugins={[katexPlugin, ...(mermaidPlugin ? [mermaidPlugin] : [])]}
            math={{ splitSymbol: 'dollar' }}
            onStart={() => setIsTyping(true)}
            
            onEnd={(data) => {
              if (!data?.manual) {
                setIsTyping(false);
                setIsStopped(false);
              }
            }}
          >
            {heroContent}
          </DsMarkdown>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default HeroDemo;
