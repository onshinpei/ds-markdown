import React from 'react';
import { DocsThemeConfig } from 'nextra-theme-docs';
import { useRouter } from 'next/router';

// 语言切换组件 - 切换到中文
function LanguageSwitch() {
  const router = useRouter();
  const basePath = '/ds-markdown/en';
  const currentPath = router.asPath || router.pathname;

  // 获取不包含 basePath 的路径
  let pathWithoutBase = currentPath;
  if (currentPath.startsWith(basePath)) {
    pathWithoutBase = currentPath.slice(basePath.length) || '/';
  }

  const switchToZh = () => {
    // 切换到中文版本
    const zhPath = `/ds-markdown/zh${pathWithoutBase}`;
    window.location.href = zhPath;
  };

  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <button
        onClick={switchToZh}
        style={{
          padding: '4px 8px',
          border: '1px solid var(--nextra-border-color)',
          borderRadius: '4px',
          background: 'transparent',
          color: 'var(--nextra-text-color)',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        中文
      </button>
      <span
        style={{
          padding: '4px 8px',
          background: 'var(--nextra-primary-color)',
          color: 'white',
          borderRadius: '4px',
          fontSize: '14px',
        }}
      >
        EN
      </span>
    </div>
  );
}

const config: DocsThemeConfig = {
  logo: (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="url(#nav-logo-grad)" />
        <path d="M8 10h6l3 8 3-8h6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M8 22h16" stroke="white" strokeWidth="2.2" strokeLinecap="round" opacity="0.6" />
        <defs>
          <linearGradient id="nav-logo-grad" x1="0" y1="0" x2="32" y2="32">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
      <span style={{ fontWeight: 600 }}>ds-markdown</span>
    </div>
  ),
  project: {
    link: 'https://github.com/onshinpei/ds-markdown',
  },
  chat: {
    link: 'https://github.com/onshinpei/ds-markdown',
  },
  docsRepositoryBase: 'https://github.com/onshinpei/ds-markdown/tree/main/nextra-docs-en',
  footer: {
    content: 'ds-markdown Documentation',
  },
  navbar: {
    extraContent: <LanguageSwitch />,
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="ds-markdown" />
      <meta property="og:description" content="A React Markdown rendering component with typing animation effects" />
      <link rel="icon" href="/ds-markdown/en/favicon.ico" />
    </>
  ),
};

export default config;
