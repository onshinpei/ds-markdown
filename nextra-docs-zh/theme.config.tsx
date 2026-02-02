import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'

// 语言切换组件 - 切换到英文
function LanguageSwitch() {
  const router = useRouter()
  const basePath = '/ds-markdown/zh'
  const currentPath = router.asPath || router.pathname
  
  // 获取不包含 basePath 的路径
  let pathWithoutBase = currentPath
  if (currentPath.startsWith(basePath)) {
    pathWithoutBase = currentPath.slice(basePath.length) || '/'
  }
  
  const switchToEn = () => {
    // 切换到英文版本
    const enPath = `/ds-markdown/en${pathWithoutBase}`
    window.location.href = enPath
  }

  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <span style={{ 
        padding: '4px 8px',
        background: 'var(--nextra-primary-color)',
        color: 'white',
        borderRadius: '4px',
        fontSize: '14px',
      }}>
        中文
      </span>
      <button
        onClick={switchToEn}
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
        EN
      </button>
    </div>
  )
}

const config: DocsThemeConfig = {
  logo: (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <img src="/ds-markdown/zh/logo.png" alt="ds-markdown" style={{ height: '24px', width: '24px' }} />
      <span style={{ fontWeight: 600 }}>ds-markdown</span>
    </div>
  ),
  project: {
    link: 'https://github.com/onshinpei/ds-markdown',
  },
  chat: {
    link: 'https://github.com/onshinpei/ds-markdown',
  },
  docsRepositoryBase: 'https://github.com/onshinpei/ds-markdown/tree/main/nextra-docs-zh',
  footer: {
    content: 'ds-markdown 文档',
  },
  navbar: {
    extraContent: <LanguageSwitch />,
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Primary Meta Tags */}
      <meta name="title" content="ds-markdown - React Markdown 打字动画组件 | 文档" />
      <meta name="description" content="一个优雅的 React Markdown 渲染组件，支持打字机动画效果。专为现代 AI 应用设计，提供流畅的实时打字动画和完整的 Markdown 渲染能力。" />
      <meta name="keywords" content="react, markdown, 打字动画, 打字机效果, react组件, markdown渲染器, AI聊天, 流式数据, react markdown组件, ds-markdown" />
      <meta name="author" content="ds-markdown" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Chinese" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Canonical URL */}
      <link rel="canonical" href="https://onshinpei.github.io/ds-markdown/zh/" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://onshinpei.github.io/ds-markdown/zh/" />
      <meta property="og:title" content="ds-markdown - React Markdown 打字动画组件" />
      <meta property="og:description" content="一个优雅的 React Markdown 渲染组件，支持打字机动画效果。专为现代 AI 应用设计，提供流畅的实时打字动画和完整的 Markdown 渲染能力。" />
      <meta property="og:image" content="https://onshinpei.github.io/ds-markdown/zh/logo.png" />
      <meta property="og:site_name" content="ds-markdown 文档" />
      <meta property="og:locale" content="zh_CN" />
      <meta property="og:locale:alternate" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content="https://onshinpei.github.io/ds-markdown/zh/" />
      <meta name="twitter:title" content="ds-markdown - React Markdown 打字动画组件" />
      <meta name="twitter:description" content="一个优雅的 React Markdown 渲染组件，支持打字机动画效果。专为现代 AI 应用设计。" />
      <meta name="twitter:image" content="https://onshinpei.github.io/ds-markdown/zh/logo.png" />
      
      {/* Baidu SEO */}
      <meta name="baidu-site-verification" content="" />
      <meta name="baidu_union_verify" content="" />
      <meta name="360-site-verification" content="" />
      
      {/* Bing / Microsoft */}
      <meta name="msvalidate.01" content="" />
      
      {/* Google Search Console */}
      <meta name="google-site-verification" content="" />
      
      {/* Additional SEO */}
      <meta name="theme-color" content="#0070f3" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="ds-markdown" />
      
      {/* Favicon */}
      <link rel="icon" href="/ds-markdown/zh/favicon.ico" />
      <link rel="apple-touch-icon" href="/ds-markdown/zh/logo.png" />
      
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "ds-markdown",
            "description": "一个优雅的 React Markdown 渲染组件，支持打字机动画效果。专为现代 AI 应用设计，提供流畅的实时打字动画和完整的 Markdown 渲染能力。",
            "url": "https://onshinpei.github.io/ds-markdown/zh/",
            "applicationCategory": "WebApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "CNY"
            },
            "author": {
              "@type": "Organization",
              "name": "ds-markdown",
              "url": "https://github.com/onshinpei/ds-markdown"
            },
            "codeRepository": "https://github.com/onshinpei/ds-markdown",
            "keywords": "react, markdown, 打字动画, 打字机效果, react组件, markdown渲染器, AI聊天, 流式数据",
            "inLanguage": "zh"
          })
        }}
      />
    </>
  ),
}

export default config

