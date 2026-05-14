import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import DsMarkdown from 'ds-markdown';
import { katexPlugin } from 'ds-markdown/plugins';
import { ChatDemo } from '../components/demos';

// ── Typing content ────────────────────────────────────────────────────────────
const DEMO_CONTENT = `# ds-markdown ✨

A **high-performance** React typing animation component for modern AI apps.

## What it supports

\`\`\`tsx
import DsMarkdown from 'ds-markdown';

<DsMarkdown interval={20} showCursor>
  # Hello World
  **Bold**, *italic*, \`code\` and more...
</DsMarkdown>
\`\`\`

### Feature matrix

| Feature        | Status      |
|----------------|-------------|
| Markdown        | ✅ Full GFM |
| Code highlight  | ✅ Built-in |
| Math (KaTeX)    | ✅ $E=mc^2$ |
| Mermaid charts  | ✅ Plugin   |
| Streaming push  | ✅ Native   |
| Cursor styles   | ✅ 5 types  |

Math: $\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}$

> 🚀 Zero config. Drop it in and watch the magic.
`;

// ── Feature cards data ────────────────────────────────────────────────────────
const FEATURES = [
  { icon: '⚡', title: 'Streaming Native', desc: 'Handles AI streaming chunks smoothly — no stuttering, no skipping.' },
  { icon: '📝', title: 'Full Markdown', desc: 'GFM tables, code blocks, blockquotes rendered with syntax highlighting.' },
  { icon: '🔢', title: 'Math (KaTeX)', desc: 'Inline $E=mc^2$ and block $$...$$ formulas rendered beautifully.' },
  { icon: '📊', title: 'Mermaid Charts', desc: 'Flowcharts, sequence diagrams, Gantt via a lightweight plugin.' },
  { icon: '✨', title: 'Cursor Styles', desc: 'Line, block, underline, circle, or fully custom React element.' },
  { icon: '🎨', title: 'Theming', desc: 'Light / dark modes, custom CSS variables, zero extra config.' },
];

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  // 用 mounted 避免 SSR/CSR 不一致：服务端永远渲染未滚动状态
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`hp-nav${mounted && scrolled ? ' hp-nav--scrolled' : ''}`}>
      <div className="hp-nav-inner">
        <Link href="/" className="hp-logo">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="url(#logo-grad)" />
            <path d="M8 10h6l3 8 3-8h6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M8 22h16" stroke="white" strokeWidth="2.2" strokeLinecap="round" opacity="0.6" />
            <defs>
              <linearGradient id="logo-grad" x1="0" y1="0" x2="32" y2="32">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
          <span>ds-markdown</span>
        </Link>

        <div className="hp-nav-links">
          <Link href="/" className="hp-nav-link hp-nav-link--active">
            Home
          </Link>
          <Link href="/get-started" className="hp-nav-link">
            Docs
          </Link>
          <Link href="/examples" className="hp-nav-link">
            Examples
          </Link>
          <a href="https://github.com/onshinpei/ds-markdown" target="_blank" rel="noopener noreferrer" className="hp-nav-link hp-nav-github" aria-label="GitHub">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
}

// ── Orb background ────────────────────────────────────────────────────────────
function OrbBg() {
  return (
    <div className="hp-orbs" aria-hidden="true">
      <div className="hp-orb hp-orb-1" />
      <div className="hp-orb hp-orb-2" />
      <div className="hp-orb hp-orb-3" />
    </div>
  );
}

// ── Hero typing block ─────────────────────────────────────────────────────────
function HeroTyping({ onEnd }: { onEnd?: () => void }) {
  const ref = useRef<any>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      ref.current?.start?.();
    }, 700);
    return () => clearTimeout(t);
  }, []);

  const handleReplay = () => {
    ref.current?.restart?.();
  };

  return (
    <div className="hp-typing-shell">
      {/* window chrome */}
      <div className="hp-typing-bar">
        <span className="hp-dot hp-dot-r" />
        <span className="hp-dot hp-dot-y" />
        <span className="hp-dot hp-dot-g" />
        <span className="hp-typing-bar-title">ds-markdown — live preview</span>
        <button className="hp-replay-btn" onClick={handleReplay} title="Replay">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 .49-3.36" />
          </svg>
        </button>
      </div>
      {/* content */}
      <div className="hp-typing-body">
        <DsMarkdown
          theme="dark"
          ref={ref}
          interval={12}
          answerType="answer"
          showCursor
          cursor="line"
          autoStartTyping={false}
          plugins={[katexPlugin]}
          math={{ splitSymbol: 'dollar' }}
          onEnd={(data) => {
            if (!data?.manual) onEnd?.();
          }}
        >
          {DEMO_CONTENT}
        </DsMarkdown>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [heroFinished, setHeroFinished] = useState(false);
  return (
    <>
      <Head>
        <title>ds-markdown — React Markdown Typing Animation</title>
        <meta name="description" content="High-performance React typing animation component for modern AI applications. Full Markdown, KaTeX math, Mermaid charts, streaming support." />
        <meta property="og:title" content="ds-markdown" />
        <meta property="og:description" content="React Markdown typing animation for modern AI apps" />
        <link rel="icon" href="/ds-markdown/en/favicon.ico" />
      </Head>

      <div className="hp-root">
        <Navbar />

        {/* ── Hero ── */}
        <section className="hp-hero">
          <OrbBg />
          <div className="hp-hero-inner">
            {/* Left: copy */}
            <div className="hp-hero-copy">
              <div className="hp-badge">
                <span className="hp-badge-dot" />
                React 18 · TypeScript · SSR Ready
              </div>

              <h1 className="hp-headline">
                Markdown typing
                <br />
                <span className="hp-headline-grad">that feels alive</span>
              </h1>

              <p className="hp-subheadline">Drop-in React component for AI chat interfaces. Streams text character-by-character with full Markdown, math and chart rendering — out of the box.</p>

              <div className="hp-cta-row">
                <Link href="/get-started" className="hp-cta-primary">
                  Get Started
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
                <Link href="/examples" className="hp-cta-secondary">
                  See Examples
                </Link>
              </div>

              <div className="hp-install-box">
                <code>npm install ds-markdown</code>
              </div>
            </div>

            {/* Right: live demo */}
            <div className="hp-hero-demo">
              <HeroTyping onEnd={() => setHeroFinished(true)} />
            </div>
          </div>
        </section>

        {/* ── Chat Demo（Hero 打字完成后才出现）── */}
        {heroFinished && (
          <section className="hp-chat-section">
            <div className="hp-chat-section-inner hp-fade-in">
              <h2 className="hp-section-title">See it in action</h2>
              <p className="hp-section-sub">A live AI chat demo — watch the streaming typing animation, Markdown rendering and math formulas all working together.</p>
              <ChatDemo />
            </div>
          </section>
        )}

        {/* ── Features ── */}
        <section className="hp-features">
          <div className="hp-features-inner">
            <h2 className="hp-section-title">Everything you need</h2>
            <p className="hp-section-sub">Built for AI applications. Works anywhere React runs.</p>
            <div className="hp-cards">
              {FEATURES.map((f) => (
                <div key={f.title} className="hp-card">
                  <div className="hp-card-icon">{f.icon}</div>
                  <h3 className="hp-card-title">{f.title}</h3>
                  <p className="hp-card-desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="hp-footer">
          <p>
            © 2024 ds-markdown · MIT License ·&nbsp;
            <a href="https://github.com/onshinpei/ds-markdown" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </p>
        </footer>
      </div>
    </>
  );
}
