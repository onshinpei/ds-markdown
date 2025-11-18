# ds-markdown

<p align="center">
  <img src="./assets/images/favicon.png" alt="ds-markdown logo" width="120" />
</p>

> 🚀 React Markdown 打字动画组件，提供现代聊天界面效果

**🇨🇳 中文 | [🇺🇸 English](./README.md)**

一个专为现代 AI 应用设计的 React 组件，提供流畅的实时打字动画和完整的 Markdown 渲染能力。

[![npm version](https://img.shields.io/npm/v/ds-markdown)](https://www.npmjs.com/package/ds-markdown)
[![npm downloads](https://img.shields.io/npm/dm/ds-markdown.svg)](https://www.npmjs.com/package/ds-markdown)
[![bundle size](https://img.shields.io/bundlephobia/minzip/ds-markdown)](https://bundlephobia.com/package/ds-markdown)
[![React](https://img.shields.io/badge/React-18.0.0+-blue)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)

## 📖 文档

**👉 [完整文档](https://onshinpei.github.io/ds-markdown/)**

- [快速开始](https://onshinpei.github.io/ds-markdown/#get-started)
- [API 文档](https://onshinpei.github.io/ds-markdown/#docs)
- [在线示例](https://onshinpei.github.io/ds-markdown/#examples)
- [马上试试](https://onshinpei.github.io/ds-markdown/#try)

## stackblitz 示例

- [基本用法](https://stackblitz.com/edit/vitejs-vite-ddfw8avb?file=src%2FApp.tsx)
- [流式数据用法](https://stackblitz.com/edit/vitejs-vite-2ri8kex3?file=src%2FApp.tsx)
- [mermaid图表](https://stackblitz.com/edit/vitejs-vite-iqbyta3j?file=index.html)
- [数学公式demo1](https://stackblitz.com/edit/vitejs-vite-iqbyta3j?file=index.html)
- [数学公式demo2](https://stackblitz.com/edit/vitejs-vite-xk9lxagc?file=src%2FApp.tsx)

## ✨ 核心特性

- 🤖 **AI 对话就绪** - 专业的 AI 流式响应打字动画
- 📝 **完整 Markdown 支持** - 代码高亮、表格、列表等
- 🔢 **数学公式** - KaTeX 支持，`$...$` 和 `$$...$$` 语法
- 📊 **Mermaid 图表** - 流程图、序列图、甘特图等
- 🎨 **可定制** - 亮色/暗色主题，可配置打字速度
- ⚡ **高性能** - 轻量级，流畅动画
- 🔌 **可扩展** - 插件系统，支持自定义功能
- 📦 **TypeScript** - 完整类型支持

---

## 📦 安装

```bash
# npm
npm install ds-markdown

# yarn
yarn add ds-markdown

# pnpm
pnpm add ds-markdown
```

## 🚀 快速开始

```tsx
import DsMarkdown from 'ds-markdown';

function App() {
  return (
    <DsMarkdown interval={20} answerType="answer">
      # Hello ds-markdown 这是一个**高性能**的打字动画组件！ ## 特性 - ⚡ 零延迟流式处理 - 🎬 流畅打字动画 - 🎯 完美语法支持
    </DsMarkdown>
  );
}
```

## 🔗 相关项目

- **[react-markdown-typer](https://github.com/onshinpei/react-markdown-typer)** - 如果你需要一个轻量级的 markdown 打字组件
- **[ds-markdown-mermaid-plugin](https://github.com/onshinpei/ds-markdown-mermaid-plugin)** - Mermaid 图表支持插件

## 📄 许可证

MIT © [onshinpei](https://github.com/onshinpei)

## 🤝 贡献

欢迎贡献、提问和功能请求！

[![Visitors](https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2Fonshinpei%2Fds-markdown&label=Visitors&countColor=%23263759&style=flat)](https://visitorbadge.io/status?path=https%3A%2F%2Fgithub.com%2Fonshinpei%2Fds-markdown)
