# ds-markdown Documentation

使用 Nextra 构建的文档站点。

## 开发

```bash
npm install
npm run dev
```

访问 http://localhost:3000

## 构建

### 标准构建（用于 Vercel、自建服务器等）

```bash
npm run build
npm start
```

### 静态导出（用于 GitHub Pages、Netlify 等）

1. 将 `next.config.static.mjs` 的内容合并到 `next.config.mjs`，或直接替换
2. 构建：
   ```bash
   npm run build
   ```
3. 静态文件会输出到 `out` 目录

## 部署

详细部署指南请查看 [DEPLOY.md](./DEPLOY.md)

### 快速部署到 Vercel

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

### 部署到 GitHub Pages

1. 配置静态导出（见上方）
2. 推送代码到 GitHub，GitHub Actions 会自动部署

## 目录结构

```
nextra-docs/
├── pages/              # 文档页面
│   ├── _meta.tsx      # 主导航配置
│   ├── index.mdx      # 首页
│   ├── get-started/   # 快速开始
│   ├── api-reference/ # API 文档
│   └── examples/       # 示例
├── components/        # React 组件
├── styles/            # 样式文件
├── theme.config.tsx   # 主题配置
├── next.config.mjs    # Next.js 配置
└── package.json
```
