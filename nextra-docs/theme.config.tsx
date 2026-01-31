import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

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

