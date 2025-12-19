# ds-markdown

> 🚀 React Markdown typing animation component for modern chat interface effects

<p align="center">
  <img src="./assets/images/favicon.png" alt="ds-markdown logo" width="120" />
</p>

**🇺🇸 English | [🇨🇳 中文](./README.zh.md)**

A React component designed specifically for modern AI applications, providing smooth real-time typing animations and complete Markdown rendering capabilities.

[![npm version](https://img.shields.io/npm/v/ds-markdown)](https://www.npmjs.com/package/ds-markdown)
[![npm downloads](https://img.shields.io/npm/dm/ds-markdown.svg)](https://www.npmjs.com/package/ds-markdown)
[![bundle size](https://img.shields.io/bundlephobia/minzip/ds-markdown)](https://bundlephobia.com/package/ds-markdown)
[![React](https://img.shields.io/badge/React-18.0.0+-blue)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)

## Why use ds-markdown?

### **Core Problems Solved**

- **Streaming Data Typing Stuttering Issues**  
  Traditional typewriter components experience stuttering and character jumping when processing AI backend streaming data, as each chunk contains multiple characters. ds-markdown intelligently splits each chunk to ensure smooth typing for every character.

- **Markdown Rendering and Typing Animation Disconnection**  
  Most typewriter components only support plain text and cannot render Markdown syntax, mathematical formulas, charts, and other rich media content in real-time during typing.

### **Value Delivered**

- **Enhanced User Immersion**  
  Provides professional-level AI chat experience, allowing users to feel authentic AI interaction processes, greatly improving product professionalism and user satisfaction.

- **Out-of-the-box, Reduces Development Complexity**  
  Complete solution that requires no additional configuration to support streaming data, Markdown rendering, mathematical formulas, charts, and other complex features.

## Documentation

**👉 [Full Documentation](https://onshinpei.github.io/ds-markdown/)**

- [Get Started](https://onshinpei.github.io/ds-markdown/#get-started)
- [API Documentation](https://onshinpei.github.io/ds-markdown/#docs)
- [Live Examples](https://onshinpei.github.io/ds-markdown/#examples)
- [Try it Now](https://onshinpei.github.io/ds-markdown/#try)

## Stackblitz Examples

- [Basic Usage](https://stackblitz.com/edit/vitejs-vite-61cs2kga?file=src%2FApp.tsx)
- [Streaming Data Usage](https://stackblitz.com/edit/vitejs-vite-lwyevhp6?file=src%2FApp.tsx)
- [Mermaid Charts](https://stackblitz.com/edit/vitejs-vite-6gxhttps?file=src%2FApp.tsx)
- [Math Formulas Demo 1](https://stackblitz.com/edit/vitejs-vite-iqbyta3j?file=index.html)
- [Math Formulas Demo 2](https://stackblitz.com/edit/vitejs-vite-xk9lxagc?file=src%2FApp.tsx)

## Key Features

- 🤖 **AI Chat Ready** - Professional typing animation for AI streaming responses
- 📝 **Full Markdown Support** - Code highlighting, tables, lists, and more
- 🔢 **Math Formulas** - KaTeX support with `$...$` and `$$...$$` syntax
- 📊 **Mermaid Charts** - Flowcharts, sequence diagrams, Gantt charts, etc.
- 🎨 **Customizable** - Light/dark themes, configurable typing speed
- ⚡ **High Performance** - Lightweight, smooth animations
- 🔌 **Extensible** - Plugin system for custom functionality
- 📦 **TypeScript** - Full type support

---

## Installation

```bash
# npm
npm install ds-markdown

# yarn
yarn add ds-markdown

# pnpm
pnpm add ds-markdown
```

## Quick Start

```tsx
import DsMarkdown from 'ds-markdown';

function App() {
  return (
    <DsMarkdown interval={20} answerType="answer">
      # Hello ds-markdown This is a **high-performance** typing animation component! ## Features - ⚡ Zero-delay streaming processing - 🎬 Smooth typing animation - 🎯 Perfect syntax support
    </DsMarkdown>
  );
}
```

## Core API Documentation

For detailed documentation, please visit: [Full Documentation](https://onshinpei.github.io/ds-markdown/#get-started)

### Default export DsMarkdown and MarkdownCMD props

```js
import DsMarkdown, { MarkdownCMD } from 'ds-markdown';
```

| Property            | Type                                        | Description                                                                                                             | Default Value                                                                 |
| ------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `interval`          | `number` \| `IntervalConfig`                | Typing interval configuration, supports fixed interval or dynamic speed control                                         | `30`                                                                          |
| `timerType`         | `'setTimeout'` \| `'requestAnimationFrame'` | Timer type, does not support dynamic modification                                                                       | Current default is `setTimeout`, will change to `requestAnimationFrame` later |
| `answerType`        | `'thinking'` \| `'answer'`                  | Content type (affects style theme), does not support dynamic modification                                               | `'answer'`                                                                    |
| `theme`             | `'light'` \| `'dark'`                       | Theme type                                                                                                              | `'light'`                                                                     |
| `plugins`           | `IMarkdownPlugin[]`                         | Plugin configuration                                                                                                    | `[]`                                                                          |
| `math`              | `IMarkdownMath`                             | Mathematical formula configuration                                                                                      | `{ splitSymbol: 'dollar' }`                                                   |
| `onEnd`             | `(data: EndData) => void`                   | Typing completion callback                                                                                              | -                                                                             |
| `onStart`           | `(data: StartData) => void`                 | Typing start callback                                                                                                   | -                                                                             |
| `onBeforeTypedChar` | `(data: IBeforeTypedChar) => Promise<void>` | Callback before character typing, supports async operations, blocks subsequent typing                                   | -                                                                             |
| `onTypedChar`       | `(data: ITypedChar) => void`                | Callback after each character typing                                                                                    | -                                                                             |
| `disableTyping`     | `boolean`                                   | Disable typing animation effects                                                                                        | `false`                                                                       |
| `autoStartTyping`   | `boolean`                                   | Whether to automatically start typing animation, set to false for manual trigger, does not support dynamic modification | `true`                                                                        |
| `codeBlock`         | `IMarkdownCode`                             | Code block configuration                                                                                                | `{headerActions: true}`                                                       |

> Note: If `disableTyping` changes from `true` to `false` during typing, it will only continue from the current position and will not replay the skipped animation; to replay from the beginning, please call the instance method `restart()`.

For detailed documentation, please visit: [Full Documentation](https://onshinpei.github.io/ds-markdown/#get-started)

## Related Projects

- **[react-markdown-typer](https://github.com/onshinpei/react-markdown-typer)** - If you need a lightweight markdown typing component
- **[ds-markdown-mermaid-plugin](https://github.com/onshinpei/ds-markdown-mermaid-plugin)** - Mermaid chart support plugin

## License

MIT © [onshinpei](https://github.com/onshinpei)

## Contributing

Contributions, issues and feature requests are welcome!

[![Visitors](https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2Fonshinpei%2Fds-markdown&label=Visitors&countColor=%23263759&style=flat)](https://visitorbadge.io/status?path=https%3A%2F%2Fgithub.com%2Fonshinpei%2Fds-markdown)
