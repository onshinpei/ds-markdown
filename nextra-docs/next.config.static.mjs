/**
 * 静态导出配置示例
 * 
 * 如果需要部署到 GitHub Pages 或其他静态托管平台，
 * 可以将此文件重命名为 next.config.mjs，或合并配置到现有文件。
 */

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
  
  // 启用静态导出
  output: 'export',
  
  // 静态导出需要禁用图片优化
  images: {
    unoptimized: true,
  },
  
  // 如果部署到子目录（如 GitHub Pages），取消下面的注释并设置正确的路径
  // basePath: '/ds-markdown',
  // assetPrefix: '/ds-markdown',
}

export default withNextra(nextConfig)

