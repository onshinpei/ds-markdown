# ds-markdown

> 🚀 一个高性能的 React Markdown 打字动画组件，完美复刻 DeepSeek 聊天界面效果

`ds-markdown` 是一个专为现代 Web 应用设计的 React 组件，提供流畅的打字动画效果和完整的 Markdown 渲染能力。

[![npm version](https://img.shields.io/npm/v/ds-markdown)](https://www.npmjs.com/package/ds-markdown)
[![npm downloads](https://img.shields.io/npm/dm/ds-markdown.svg)](https://www.npmjs.com/package/ds-markdown)
[![bundle size](https://img.shields.io/bundlephobia/minzip/ds-markdown)](https://bundlephobia.com/package/ds-markdown)
[![React](https://img.shields.io/badge/React-16.8+-blue)](https://react.dev)

[📖 在线演示](https://onshinpei.github.io/ds-markdown/) | [🔧 StackBlitz 体验](https://stackblitz.com/edit/vitejs-vite-ddfw8avb?file=src%2FApp.tsx)

## ✨ 特性

- 🎯 **1:1 还原** - 完美复刻 [DeepSeek 官网](https://chat.deepseek.com/) 聊天响应效果
- ⚡ **高性能** - 智能分批处理，大文档渲染无卡顿
- 🎬 **流畅动画** - 双模式定时器，支持高频打字效果
- 🎨 **完整渲染** - 内置常用 Markdown 格式支持
- 🔧 **灵活配置** - 声明式 + 命令式双重 API 设计
- 📱 **现代兼容** - 支持 React 16.8+ 和现代浏览器

## 📦 安装

```bash
npm install ds-markdown
# or
yarn add ds-markdown
# or
pnpm add ds-markdown
```

## 🚀 快速开始

```tsx
import DsMarkdown from 'ds-markdown';
import 'ds-markdown/style.css';

function App() {
  return (
    <DsMarkdown timerType="requestAnimationFrame" interval={20} answerType="answer">
      # Hello World 这是一个**打字动画**示例！
    </DsMarkdown>
  );
}
```

## 📚 API 文档

### 默认导出 (声明式 API)

| 属性名        | 类型                                                                                                     | 说明                            | 默认值                    |
| ------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------- | ------------------------- |
| `interval`    | `number`                                                                                                 | 打字间隔时间 (毫秒)             | `30`                      |
| `timerType`   | `'setTimeout'` \| `'requestAnimationFrame'`                                                              | 定时器类型，详见下方说明        | `'requestAnimationFrame'` |
| `answerType`  | `'thinking'` \| `'answer'`                                                                               | 内容类型，影响样式主题          | `'answer'`                |
| `onEnd`       | `(data: { str: string; answerType: AnswerType }) => void`                                                | 打字结束回调 **(可能触发多次)** | -                         |
| `onStart`     | `(data: { currentIndex: number; currentChar: string; answerType: AnswerType; prevStr: string }) => void` | 打字开始回调 **(可能触发多次)** | -                         |
| `onTypedChar` | `(data: { currentIndex: number; currentChar: string; answerType: AnswerType; prevStr: string }) => void` | 每个字符打字回调                | -                         |

#### 🎛️ timerType 模式详解

##### `requestAnimationFrame` 模式 (推荐) 🌟

```typescript
// 特性
- 🎯 时间驱动：基于真实经过时间计算字符数量
- 📊 批量处理：单帧内可处理多个字符
- 🎬 帧同步：与浏览器 60fps 刷新率同步
- ⚡ 高频优化：完美支持 interval < 16ms 的高速打字

// 适用场景
- 追求流畅动画效果
- 高频打字 (interval: 5-15ms)
- 现代 Web 应用的默认选择
```

##### `setTimeout` 模式 (传统) 📟

```typescript
// 特性
- ⚡ 单字符：每次精确处理一个字符
- 🕐 固定间隔：严格按设定时间执行
- 🎵 节拍感：经典打字机的节奏感
- 🎯 精确控制：适合特定时序要求

// 适用场景
- 需要精确时间控制
- 营造复古打字机效果
- 兼容性要求较高的场景
```

##### 📊 性能对比

| 特性         | requestAnimationFrame        | setTimeout       |
| ------------ | ---------------------------- | ---------------- |
| **字符处理** | 每帧可处理多个字符           | 每次处理一个字符 |
| **高频间隔** | ✅ 优秀 (5ms → 每帧3字符)    | ❌ 可能卡顿      |
| **低频间隔** | ✅ 正常 (100ms → 6帧后1字符) | ✅ 精确          |
| **视觉效果** | 🎬 流畅动画感                | ⚡ 精确节拍感    |
| **性能开销** | 🟢 低 (帧同步)               | 🟡 中等 (定时器) |

## 💡 使用示例

### 📝 声明式用法 (推荐)

```tsx
import { useState } from 'react';
import DsMarkdown from 'ds-markdown';
import 'ds-markdown/style.css';

const markdown = `# ds-markdown

\`ds-markdown\` 是一个高性能的 React Markdown 打字动画组件

## ✨ 特性

- 🎯 **1:1 还原** - 完美复刻 DeepSeek 聊天界面效果
- ⚡ **高性能** - 智能分批处理，大文档渲染无卡顿
- 🎬 **流畅动画** - 双模式定时器，支持高频打字效果
`;

function App() {
  const [thinkingContent, setThinkingContent] = useState('');
  const [answerContent, setAnswerContent] = useState('');

  const handleStart = () => {
    // 清空之前的内容
    setThinkingContent('🤔 正在分析您的问题...\n\n分析完成，准备回答');
  };

  return (
    <div>
      <button onClick={handleStart}>开始演示</button>

      {/* 思考过程 */}
      <DsMarkdown
        answerType="thinking"
        interval={15}
        timerType="requestAnimationFrame"
        onEnd={() => {
          console.log('思考完成');
          setAnswerContent(markdown);
        }}
      >
        {thinkingContent}
      </DsMarkdown>

      {/* 回答内容 */}
      {answerContent && (
        <DsMarkdown answerType="answer" interval={10} timerType="requestAnimationFrame">
          {answerContent}
        </DsMarkdown>
      )}
    </div>
  );
}

export default App;
```

[🔗 在线体验](https://stackblitz.com/edit/vitejs-vite-ddfw8avb?file=src%2FApp.tsx)

### ⚡ 命令式用法 (流式场景)

适用于实时流式数据场景，减少组件重渲染，提升性能。

```tsx
import { useRef } from 'react';
import { MarkdownCMD } from 'ds-markdown';
import 'ds-markdown/style.css';

function StreamingChat() {
  const markdownRef = useRef<any>();

  // 模拟流式数据接收
  const simulateStreaming = async () => {
    markdownRef.current?.clear();

    // 显示思考过程
    markdownRef.current?.push('🤔 正在分析您的问题...\n\n分析完成，准备回答', 'thinking');

    // 模拟流式回答
    const chunks = [
      '# 关于 ds-markdown\n\n',
      '`ds-markdown` 是一个专为现代 Web 应用设计的组件。\n\n',
      '## 主要特性\n\n',
      '- ⚡ 高性能渲染\n',
      '- 🎬 流畅动画\n',
      '- 🎯 精确控制\n\n',
      '希望这个回答对您有帮助！',
    ];

    for (const chunk of chunks) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      markdownRef.current?.push(chunk, 'answer');
    }
  };

  return (
    <div>
      <button onClick={simulateStreaming}>开始流式演示</button>
      <MarkdownCMD
        ref={markdownRef}
        interval={10}
        timerType="requestAnimationFrame"
        onEnd={(data) => {
          console.log('段落完成:', data);
        }}
      />
    </div>
  );
}
```

[🔗 在线体验](https://stackblitz.com/edit/vitejs-vite-2ri8kex3?file=src%2FApp.tsx)

### 命令式 API

```typescript
interface MarkdownRef {
  push: (content: string, answerType: 'thinking' | 'answer') => void;
  clear: () => void;
  triggerWholeEnd: () => void;
}
```

| 方法              | 参数                                        | 说明               |
| ----------------- | ------------------------------------------- | ------------------ |
| `push`            | `(content: string, answerType: AnswerType)` | 添加内容并开始打字 |
| `clear`           | -                                           | 清空所有内容和状态 |
| `triggerWholeEnd` | -                                           | 手动触发完成回调   |

## 🎨 样式定制

```css
/* 自定义思考区域样式 */
.ds-markdown-thinking {
  background: rgba(255, 193, 7, 0.1);
  border-left: 3px solid #ffc107;
  padding: 12px;
  border-radius: 4px;
}

/* 自定义回答区域样式 */
.ds-markdown-answer {
  color: #333;
  line-height: 1.6;
}

/* 自定义代码块样式 */
.ds-markdown pre {
  background: #f8f9fa;
  border-radius: 6px;
  padding: 16px;
}
```

## 🔧 最佳实践

### 1. 性能优化建议

```tsx
// ✅ 推荐：使用 requestAnimationFrame + 适中的 interval
<DsMarkdown
  timerType="requestAnimationFrame"
  interval={15} // 15-30ms 为最佳体验
/>

// ❌ 避免：过小的 interval 值
<DsMarkdown interval={1} /> // 可能导致性能问题
```

### 2. 流式数据处理

```tsx
// ✅ 推荐：使用命令式 API
const ref = useRef();
useEffect(() => {
  // 实时接收数据时使用 push 方法
  ref.current?.push(newChunk, 'answer');
}, [newChunk]);

// ❌ 避免：频繁更新 children prop
const [content, setContent] = useState('');
// 每次更新都会重新解析整个内容
```

### 3. 类型安全

```tsx
import { MarkdownRef } from 'ds-markdown';

const ref = useRef<MarkdownRef>(null);
// 现在具有完整的类型提示
```

## 🌐 兼容性

- **React**: 16.8.0+
- **TypeScript**: 4.0+
- **浏览器**: Chrome 60+, Firefox 55+, Safari 12+
- **Node.js**: 14.0+

## 📄 License

MIT © [YourName](https://github.com/yourusername)

---

<div align="center">
  <strong>如果这个项目对你有帮助，请给个 ⭐️ Star 支持一下！</strong>
</div>
