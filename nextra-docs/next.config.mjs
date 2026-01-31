import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  latex: true,
  defaultShowCopyCode: true,
  search: {
    codeblocks: false
  }
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['ds-markdown-mermaid-plugin', 'ds-markdown'],
  // GitHub Pages 部署配置
  output: 'export',  // 启用静态导出
  images: {
    unoptimized: true,  // 静态导出需要禁用图片优化
  },
  // 部署到 GitHub Pages 子路径
  basePath: '/ds-markdown',
  assetPrefix: '/ds-markdown/',
  // 多语言配置 - 虽然静态导出模式下 Next.js 的 i18n 路由不生效
  // 但 Nextra 会使用这个配置来识别语言并过滤导航
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en'
  }
}

export default withNextra(nextConfig)
