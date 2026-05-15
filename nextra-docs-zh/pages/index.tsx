import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import DsMarkdown from 'ds-markdown';
import { katexPlugin } from 'ds-markdown/plugins';
import { ChatDemo } from '../components/demos';

// ── 打字内容 ──────────────────────────────────────────────────────────────────
const DEMO_CONTENT = `# ds-markdown ✨

为现代 AI 应用打造的 **高性能** React 打字动画组件。

## 核心能力

\`\`\`tsx
import DsMarkdown from 'ds-markdown';

<DsMarkdown interval={20} showCursor>
  # 你好，世界
  **加粗**、*斜体*、\`代码\` 等等…
</DsMarkdown>
\`\`\`

### 特性矩阵

| 特性          | 状态        |
|--------------|-------------|
| Markdown      | ✅ 完整 GFM |
| 代码高亮      | ✅ 内置     |
| 数学公式      | ✅ $E=mc^2$ |
| Mermaid 图表  | ✅ 插件     |
| 流式推送      | ✅ 原生     |
| 光标样式      | ✅ 5 种     |

数学公式：$\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}$

> 🚀 零配置，开箱即用，效果惊艳。
`;

// ── 特性卡片数据 ──────────────────────────────────────────────────────────────
const FEATURES = [
  { icon: '⚡', title: '原生流式', desc: '完美处理 AI 流式数据 —— 不卡顿、不跳字、丝般顺滑。' },
  { icon: '📝', title: '完整 Markdown', desc: 'GFM 表格、代码块、引用块全部支持，自带语法高亮。' },
  { icon: '🔢', title: '数学公式', desc: '行内 $E=mc^2$ 与块级 $$...$$ 公式漂亮渲染。' },
  { icon: '📊', title: 'Mermaid 图表', desc: '通过轻量插件支持流程图、时序图、甘特图等。' },
  { icon: '✨', title: '光标样式', desc: '线条、方块、下划线、圆点，或完全自定义的 React 元素。' },
  { icon: '🎨', title: '主题适配', desc: '亮色/暗色主题，可自定义 CSS 变量，零额外配置。' },
];

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
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
            首页
          </Link>
          <Link href="/get-started" className="hp-nav-link">
            文档
          </Link>
          <Link href="/examples" className="hp-nav-link">
            示例
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

// ── 背景光晕 ──────────────────────────────────────────────────────────────────
function OrbBg() {
  return (
    <div className="hp-orbs" aria-hidden="true">
      <div className="hp-orb hp-orb-1" />
      <div className="hp-orb hp-orb-2" />
      <div className="hp-orb hp-orb-3" />
    </div>
  );
}

// ── Hero 打字区 ───────────────────────────────────────────────────────────────
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
        <span className="hp-typing-bar-title">ds-markdown — 实时预览</span>
        <button className="hp-replay-btn" onClick={handleReplay} title="重播">
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
  const chatSectionRef = useRef<HTMLElement>(null);

  // Hero 打字完成后，平滑滚动到 chat demo
  useEffect(() => {
    if (!heroFinished) return;
    const t = setTimeout(() => {
      chatSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
    return () => clearTimeout(t);
  }, [heroFinished]);

  return (
    <>
      <Head>
        <title>ds-markdown — React Markdown 打字动画组件</title>
        <meta name="description" content="为现代 AI 应用打造的高性能 React 打字动画组件，支持完整 Markdown、KaTeX 数学公式、Mermaid 图表与流式输出。" />
        <meta property="og:title" content="ds-markdown" />
        <meta property="og:description" content="为现代 AI 应用打造的 React Markdown 打字动画组件" />
        <link rel="icon" href="/ds-markdown/zh/favicon.ico" />
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
                React 18 · TypeScript · 支持 SSR
              </div>

              <h1 className="hp-headline">
                让 Markdown 打字
                <br />
                <span className="hp-headline-grad">栩栩如生</span>
              </h1>

              <p className="hp-subheadline">为 AI 对话界面而生的 React 组件。逐字符流式输出，原生支持 Markdown、数学公式与图表渲染 —— 无需任何额外配置。</p>

              <div className="hp-cta-row">
                <Link href="/get-started" className="hp-cta-primary">
                  快速开始
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
                <Link href="/examples" className="hp-cta-secondary">
                  查看示例
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
          <section ref={chatSectionRef} className="hp-chat-section">
            <div className="hp-chat-section-inner hp-fade-in">
              <h2 className="hp-section-title">真实场景演示</h2>
              <p className="hp-section-sub">一个真实的 AI 对话演示 —— 流式打字、Markdown 渲染、数学公式同时呈现。</p>
              <ChatDemo />
            </div>
          </section>
        )}

        {/* ── Features ── */}
        <section className="hp-features">
          <div className="hp-features-inner">
            <h2 className="hp-section-title">你想要的，全都有</h2>
            <p className="hp-section-sub">为 AI 应用而生，可在任何 React 项目中使用。</p>
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
