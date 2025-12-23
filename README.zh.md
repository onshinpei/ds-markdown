
# 请注意，本仓库已归档，已迁移到新仓库 [react-stream-markdown](https://github.com/onshinpei/react-stream-markdown)
## 请注意，本仓库已归档，已迁移到新仓库 [react-stream-markdown](https://github.com/onshinpei/react-stream-markdown)
## 请注意，本仓库已归档，已迁移到新仓库 [react-stream-markdown](https://github.com/onshinpei/react-stream-markdown)

# ds-markdown

> 🚀 React Markdown 打字动画组件，提供现代聊天界面效果

<p align="center">
  <img src="./assets/images/favicon.png" alt="ds-markdown logo" width="120" />
</p>

**🇨🇳 中文 | [🇺🇸 English](./README.md)**

一个专为现代 AI 应用设计的 React 组件，提供流畅的实时打字动画和完整的 Markdown 渲染能力。

[![npm version](https://img.shields.io/npm/v/ds-markdown)](https://www.npmjs.com/package/ds-markdown)
[![npm downloads](https://img.shields.io/npm/dm/ds-markdown.svg)](https://www.npmjs.com/package/ds-markdown)
[![bundle size](https://img.shields.io/bundlephobia/minzip/ds-markdown)](https://bundlephobia.com/package/ds-markdown)
[![React](https://img.shields.io/badge/React-18.0.0+-blue)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)

## 为什么要用 ds-markdown？

### **解决的核心问题**

- **流式数据打字卡顿问题**  
  传统打字机组件在处理 AI 后端流式数据时，由于每个 chunk 包含多个字符，会出现卡顿、跳字等问题。ds-markdown 智能拆分每个 chunk，确保每个字符都流畅打字。

- **Markdown 渲染与打字动画割裂**  
  大多数打字机组件只支持纯文本，无法在打字过程中实时渲染 Markdown 语法、数学公式、图表等富媒体内容。

### **带来的价值**

- **提升用户沉浸感**  
  提供专业级 AI 聊天体验，让用户感受到真实的 AI 交互过程，极大提升产品专业度和用户满意度。

- **开箱即用，降低开发复杂度**  
  完整的解决方案，无需额外配置即可支持流式数据、Markdown 渲染、数学公式、图表等复杂功能。

> _如果您不需要任何样式，自己处理所有产物的渲染，推荐您使用 [react-markdown-typer](https://github.com/onshinpei/react-markdown-typer)_

## 文档

**👉 [完整文档](https://onshinpei.github.io/ds-markdown/)**

- [快速开始](https://onshinpei.github.io/ds-markdown/#get-started)
- [API 文档](https://onshinpei.github.io/ds-markdown/#docs)
- [在线示例](https://onshinpei.github.io/ds-markdown/#examples)
- [马上试试](https://onshinpei.github.io/ds-markdown/#try)

## stackblitz 示例

- [基本用法](https://stackblitz.com/edit/vitejs-vite-ddfw8avb?file=src%2FApp.tsx)
- [流式数据用法](https://stackblitz.com/edit/vitejs-vite-2ri8kex3?file=src%2FApp.tsx)
- [mermaid图表](https://stackblitz.com/edit/vitejs-vite-iqbyta3j?file=src%2FApp.tsx)
- [数学公式demo1](https://stackblitz.com/edit/vitejs-vite-z94syu8j?file=src%2FApp.tsx)
- [数学公式demo2](https://stackblitz.com/edit/vitejs-vite-xk9lxagc?file=src%2FApp.tsx)

## 核心特性

- 🤖 **AI 对话就绪** - 专业的 AI 流式响应打字动画
- 📝 **完整 Markdown 支持** - 代码高亮、表格、列表等
- 🔢 **数学公式** - KaTeX 支持，`$...$` 和 `$$...$$` 语法
- 📊 **Mermaid 图表** - 流程图、序列图、甘特图等
- 🎨 **可定制** - 亮色/暗色主题，可配置打字速度
- ⚡ **高性能** - 轻量级，流畅动画
- 🔌 **可扩展** - 插件系统，支持自定义功能
- 📦 **TypeScript** - 完整类型支持

---

## 安装

```bash
# npm
npm install ds-markdown

# yarn
yarn add ds-markdown

# pnpm
pnpm add ds-markdown
```

## 快速开始

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

## 核心API文档

详细文档可查看：[完整文档](https://onshinpei.github.io/ds-markdown/#get-started)

### 默认导出 DsMarkdown 和 MarkdownCMD 的 props

```js
import DsMarkdown, { MarkdownCMD } from 'ds-markdown';
```

| 属性                | 类型                                        | 说明                                                          | 默认值                                                      |
| ------------------- | ------------------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------- |
| `interval`          | `number` \| `IntervalConfig`                | 打字间隔配置，支持固定间隔或动态速度控制                      | `30`                                                        |
| `timerType`         | `'setTimeout'` \| `'requestAnimationFrame'` | 定时器类型，不支持动态修改                                    | 当前默认值是`setTimeout`，后期会改为`requestAnimationFrame` |
| `answerType`        | `'thinking'` \| `'answer'`                  | 内容类型 (影响样式主题)，不支持动态修改                       | `'answer'`                                                  |
| `theme`             | `'light'` \| `'dark'`                       | 主题类型                                                      | `'light'`                                                   |
| `plugins`           | `IMarkdownPlugin[]`                         | 插件配置                                                      | `[]`                                                        |
| `math`              | `IMarkdownMath`                             | 数学公式配置                                                  | `{ splitSymbol: 'dollar' }`                                 |
| `onEnd`             | `(data: EndData) => void`                   | 打字结束回调                                                  | -                                                           |
| `onStart`           | `(data: StartData) => void`                 | 打字开始回调                                                  | -                                                           |
| `onBeforeTypedChar` | `(data: IBeforeTypedChar) => Promise<void>` | 字符打字前的回调，支持异步操作，会阻塞之后的打字              | -                                                           |
| `onTypedChar`       | `(data: ITypedChar) => void`                | 每字符打字后的回调                                            | -                                                           |
| `disableTyping`     | `boolean`                                   | 禁用打字动画效果                                              | `false`                                                     |
| `autoStartTyping`   | `boolean`                                   | 是否自动开始打字动画，设为 false 时需手动触发，不支持动态修改 | `true`                                                      |
| `codeBlock`         | `IMarkdownCode`                             | 代码块配置                                                    | `{headerActions: true}`                                     |

> 注意：打字进行中将 `disableTyping` 从 `true` 改为 `false` 只会从当前位置继续，不会回放已跳过的动画；若需从头播放，请调用实例方法 `restart()`。

详细文档可查看：[完整文档](https://onshinpei.github.io/ds-markdown/#get-started)

## 相关项目

- **[react-markdown-typer](https://github.com/onshinpei/react-markdown-typer)** - 如果你需要一个轻量级的 markdown 打字组件
- **[ds-markdown-mermaid-plugin](https://github.com/onshinpei/ds-markdown-mermaid-plugin)** - Mermaid 图表支持插件

## 许可证

MIT © [onshinpei](https://github.com/onshinpei)

## 贡献

欢迎贡献、提问和功能请求！

[![Visitors](https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2Fonshinpei%2Fds-markdown&label=Visitors&countColor=%23263759&style=flat)](https://visitorbadge.io/status?path=https%3A%2F%2Fgithub.com%2Fonshinpei%2Fds-markdown)
