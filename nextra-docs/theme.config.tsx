import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'

// 语言切换组件
function LanguageSwitch() {
  const router = useRouter()
  const basePath = '/ds-markdown'
  const currentPath = router.asPath || router.pathname
  
  // 获取不包含 basePath 的路径
  let pathWithoutBase = currentPath
  if (currentPath.startsWith(basePath)) {
    pathWithoutBase = currentPath.slice(basePath.length) || '/'
  }
  
  const isZh = pathWithoutBase.startsWith('/zh')
  
  const switchLanguage = (lang: string) => {
    // 获取当前路径（不包含 basePath）
    let targetPath = pathWithoutBase
    
    // 替换语言前缀
    if (isZh) {
      // 从中文切换到英文
      if (targetPath === '/zh') {
        targetPath = '/en'
      } else if (targetPath.startsWith('/zh/')) {
        targetPath = targetPath.replace('/zh/', '/en/')
      } else {
        targetPath = `/en${targetPath}`
      }
    } else {
      // 从英文切换到中文
      if (targetPath === '/en') {
        targetPath = '/zh'
      } else if (targetPath.startsWith('/en/')) {
        targetPath = targetPath.replace('/en/', '/zh/')
      } else {
        targetPath = `/zh${targetPath}`
      }
    }
    
    // 如果路径中没有语言前缀，添加默认语言
    if (!targetPath.startsWith('/en') && !targetPath.startsWith('/zh')) {
      targetPath = `/${lang}${targetPath === '/' ? '' : targetPath}`
    }
    
    // 构建最终路径（包含 basePath）
    const finalPath = `${basePath}${targetPath}`
    router.push(finalPath)
  }

  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <button
        onClick={() => switchLanguage('en')}
        style={{
          padding: '4px 8px',
          border: '1px solid var(--nextra-border-color)',
          borderRadius: '4px',
          background: !isZh ? 'var(--nextra-primary-color)' : 'transparent',
          color: !isZh ? 'white' : 'var(--nextra-text-color)',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        EN
      </button>
      <button
        onClick={() => switchLanguage('zh')}
        style={{
          padding: '4px 8px',
          border: '1px solid var(--nextra-border-color)',
          borderRadius: '4px',
          background: isZh ? 'var(--nextra-primary-color)' : 'transparent',
          color: isZh ? 'white' : 'var(--nextra-text-color)',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        中文
      </button>
    </div>
  )
}

const config: DocsThemeConfig = {
  logo: (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <img src="/ds-markdown/logo.png" alt="ds-markdown" style={{ height: '24px', width: '24px' }} />
      <span style={{ fontWeight: 600 }}>ds-markdown</span>
    </div>
  ),
  project: {
    link: 'https://github.com/onshinpei/ds-markdown',
  },
  chat: {
    link: 'https://github.com/onshinpei/ds-markdown',
  },
  docsRepositoryBase: 'https://github.com/onshinpei/ds-markdown/tree/main/nextra-docs',
  footer: {
    content: 'ds-markdown Documentation',
  },
  navbar: {
    extraContent: <LanguageSwitch />,
  },
  // 多语言配置 - 告诉 Nextra 支持哪些语言
  i18n: [
    { locale: 'en', name: 'English' },
    { locale: 'zh', name: '中文' }
  ],
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="ds-markdown" />
      <meta property="og:description" content="一个优雅的 React Markdown 渲染组件，支持打字机动画效果" />
      <link rel="icon" href="/ds-markdown/favicon.ico" />
    </>
  ),
  // primaryHue: 220,
  // primarySaturation: 100,
}

export default config

