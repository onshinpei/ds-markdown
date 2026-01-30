# Nextra 文档站点设置指南

## 已完成的工作

✅ 创建了完整的 Nextra 文档站点结构
✅ 迁移了所有 API 文档内容
✅ 创建了示例页面
✅ 配置了主题和导航

## 目录结构

```
nextra-docs/
├── pages/
│   ├── _meta.tsx          # 主导航配置
│   ├── index.mdx          # 首页
│   ├── get-started/       # 快速开始章节
│   │   ├── _meta.tsx
│   │   ├── index.mdx
│   │   ├── installation.mdx
│   │   ├── basic-usage.mdx
│   │   ├── typing-cursor.mdx
│   │   └── features.mdx
│   ├── api/               # API 文档章节
│   │   ├── _meta.tsx
│   │   ├── index.mdx
│   │   ├── props.mdx
│   │   ├── methods.mdx
│   │   └── types.mdx
│   └── examples/          # 示例章节
│       ├── _meta.tsx
│       ├── index.mdx
│       ├── basic-usage.mdx
│       ├── streaming-data.mdx
│       ├── typing-animation.mdx
│       ├── custom-theme.mdx
│       ├── math-formulas.mdx
│       └── mermaid-charts.mdx
├── theme.config.tsx       # 主题配置
├── next.config.js         # Next.js 配置
├── package.json
└── tsconfig.json
```

## 启动开发服务器

```bash
cd nextra-docs
npm install
npm run dev
```

访问 http://localhost:3000

## 构建生产版本

```bash
npm run build
npm start
```

## 部署

可以部署到：
- Vercel（推荐）
- Netlify
- 任何支持 Next.js 的平台

## 自定义配置

### 修改主题

编辑 `theme.config.tsx` 文件：

```tsx
const config: DocsThemeConfig = {
  logo: <span>你的 Logo</span>,
  project: {
    link: '你的 GitHub 链接',
  },
  // ... 其他配置
}
```

### 添加新页面

1. 在 `pages` 目录下创建新的 `.mdx` 文件
2. 在对应的 `_meta.tsx` 中添加导航项

### 修改样式

Nextra 使用 Tailwind CSS，可以通过 `theme.config.tsx` 中的 `primaryHue` 和 `primarySaturation` 调整主色调。

## 下一步

1. 测试所有页面是否正常显示
2. 根据需要调整内容和样式
3. 添加更多示例和文档
4. 部署到生产环境

