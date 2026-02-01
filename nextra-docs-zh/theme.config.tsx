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
      <meta property="og:title" content="ds-markdown" />
      <meta property="og:description" content="一个优雅的 React Markdown 渲染组件，支持打字机动画效果" />
      <link rel="icon" href="/ds-markdown/zh/favicon.ico" />
    </>
  ),
}

export default config

