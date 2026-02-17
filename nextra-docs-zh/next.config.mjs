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
  // GitHub Pages 部署配置 - 部署到 /ds-markdown/zh 目录
  output: 'export',  // 启用静态导出
  images: {
    unoptimized: true,  // 静态导出需要禁用图片优化
  },
  // 部署到 GitHub Pages 子路径
  basePath: '/ds-markdown/zh',
  assetPrefix: '/ds-markdown/zh/',
  distDir: '../docs/zh'
}

export default withNextra(nextConfig)

