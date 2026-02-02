import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'

// 语言切换组件 - 切换到中文
function LanguageSwitch() {
  const router = useRouter()
  const basePath = '/ds-markdown/en'
  const currentPath = router.asPath || router.pathname
  
  // 获取不包含 basePath 的路径
  let pathWithoutBase = currentPath
  if (currentPath.startsWith(basePath)) {
    pathWithoutBase = currentPath.slice(basePath.length) || '/'
  }
  
  const switchToZh = () => {
    // 切换到中文版本
    const zhPath = `/ds-markdown/zh${pathWithoutBase}`
    window.location.href = zhPath
  }

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
      <span style={{ 
        padding: '4px 8px',
        background: 'var(--nextra-primary-color)',
        color: 'white',
        borderRadius: '4px',
        fontSize: '14px',
      }}>
        EN
      </span>
    </div>
  )
}

const config: DocsThemeConfig = {
  logo: (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <img src="/ds-markdown/en/logo.png" alt="ds-markdown" style={{ height: '24px', width: '24px' }} />
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
      
      {/* Primary Meta Tags */}
      <meta name="title" content="ds-markdown - React Markdown Typing Animation Component | Documentation" />
      <meta name="description" content="A React Markdown rendering component with typing animation effects. Perfect for modern AI applications, providing smooth real-time typing animations and full Markdown rendering capabilities." />
      <meta name="keywords" content="react, markdown, typing animation, typewriter effect, react component, markdown renderer, AI chat, streaming data, react markdown component, ds-markdown" />
      <meta name="author" content="ds-markdown" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Canonical URL */}
      <link rel="canonical" href="https://onshinpei.github.io/ds-markdown/en/" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://onshinpei.github.io/ds-markdown/en/" />
      <meta property="og:title" content="ds-markdown - React Markdown Typing Animation Component" />
      <meta property="og:description" content="A React Markdown rendering component with typing animation effects. Perfect for modern AI applications, providing smooth real-time typing animations and full Markdown rendering capabilities." />
      <meta property="og:image" content="https://onshinpei.github.io/ds-markdown/en/logo.png" />
      <meta property="og:site_name" content="ds-markdown Documentation" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="zh_CN" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content="https://onshinpei.github.io/ds-markdown/en/" />
      <meta name="twitter:title" content="ds-markdown - React Markdown Typing Animation Component" />
      <meta name="twitter:description" content="A React Markdown rendering component with typing animation effects. Perfect for modern AI applications." />
      <meta name="twitter:image" content="https://onshinpei.github.io/ds-markdown/en/logo.png" />
      
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
      <link rel="icon" href="/ds-markdown/en/favicon.ico" />
      <link rel="apple-touch-icon" href="/ds-markdown/en/logo.png" />
      
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "ds-markdown",
            "description": "A React Markdown rendering component with typing animation effects. Perfect for modern AI applications, providing smooth real-time typing animations and full Markdown rendering capabilities.",
            "url": "https://onshinpei.github.io/ds-markdown/en/",
            "applicationCategory": "WebApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "author": {
              "@type": "Organization",
              "name": "ds-markdown",
              "url": "https://github.com/onshinpei/ds-markdown"
            },
            "codeRepository": "https://github.com/onshinpei/ds-markdown",
            "keywords": "react, markdown, typing animation, typewriter effect, react component, markdown renderer, AI chat, streaming data",
            "inLanguage": "en"
          })
        }}
      />
    </>
  ),
}

export default config

