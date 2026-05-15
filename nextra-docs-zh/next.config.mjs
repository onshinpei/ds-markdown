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

const isDev = process.env.NODE_ENV === 'development'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['ds-markdown-mermaid-plugin', 'ds-markdown'],
  // GitHub Pages 部署配置 - 仅在构建时生效
  ...(!isDev && {
    output: 'export',  // 启用静态导出
    basePath: '/ds-markdown/zh',
    assetPrefix: '/ds-markdown/zh/',
    distDir: '../docs/zh',
  }),
  images: {
    unoptimized: true,  // 静态导出需要禁用图片优化
  },
}

export default withNextra(nextConfig)
