# ds-markdown

> 🚀 高性能 React Markdown 打字动画组件，完美复刻 DeepSeek 聊天界面效果

**🇨🇳 中文 | [🇺🇸 English](./README.en.md) | [🇯🇵 日本語](./README.ja.md) | [🇰🇷 한국어](./README.ko.md)**

一个专为现代 AI 应用设计的 React 组件，提供流畅的实时打字动画和完整的 Markdown 渲染能力。

[![npm version](https://img.shields.io/npm/v/ds-markdown)](https://www.npmjs.com/package/ds-markdown)
[![npm downloads](https://img.shields.io/npm/dm/ds-markdown.svg)](https://www.npmjs.com/package/ds-markdown)
[![bundle size](https://img.shields.io/bundlephobia/minzip/ds-markdown)](https://bundlephobia.com/package/ds-markdown)
[![React](https://img.shields.io/badge/React-16.8+-blue)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)

[📖 在线演示](https://onshinpei.github.io/ds-markdown/) | [🔧 StackBlitz 体验](https://stackblitz.com/edit/vitejs-vite-ddfw8avb?file=src%2FApp.tsx)

---

## ✨ 核心特性

### 🎯 **完美还原**

- 1:1 复刻 [DeepSeek 官网](https://chat.deepseek.com/) 聊天响应效果
- 支持思考过程 (`thinking`) 和回答内容 (`answer`) 双模式
- 原生 Markdown 语法支持，包括代码高亮、表格、列表等
- 支持亮色/暗色主题切换，完美适配不同场景

### ⚡ **极致性能**

- 智能分批处理，大文档渲染零卡顿
- 双模式定时器：`requestAnimationFrame` + `setTimeout`
- 内置流式语法缓冲，避免不完整 Markdown 渲染错误

### 🎬 **流畅动画**

- 高频打字支持（`requestAnimationFrame`模式下打字间隔最低可接近于`0ms`）
- 帧同步渲染，与浏览器 60fps 完美配合
- 智能字符批量处理，视觉效果更自然

### 🔧 **灵活易用**

- **声明式 API**：适合简单场景，React 风格
- **命令式 API**：适合流式数据，性能更优
- **TypeScript 原生支持**：完整类型提示

---

## 📦 快速安装

```bash
# npm
npm install ds-markdown

# yarn
yarn add ds-markdown

# pnpm
pnpm add ds-markdown
```

### 通过 ESM CDN 使用

无需安装，直接在浏览器中使用：

```html
<!-- 导入样式 -->
<link rel="stylesheet" href="https://esm.sh/ds-markdown/dist/style.css" />

<!-- 导入组件 -->
<script type="importmap">
  {
    "imports": {
      "react": "https://esm.sh/react@19.1.0",
      "react-dom/client": "https://esm.sh/react-dom@19.1.0/client",
      "ds-markdown": "https://esm.sh/ds-markdown"
    }
  }
</script>
<script type="module" src="https://esm.sh/tsx"></script>

<script type="text/babel">
  import { createRoot } from 'react-dom/client';
  import DsMarkdown from 'ds-markdown';

  const markdown = `
# Hello ds-markdown

这是一个**高性能**的 Markdown 打字动画组件！

## 特性
- ⚡ 零延迟流式处理
- 🎬 流畅的打字动画
- 🎯 完美的语法支持
  `;

  const root = createRoot(document.getElementById('root'));
  root.render(<DsMarkdown interval={20}>{markdown}</DsMarkdown>);
</script>
```

## 🚀 5分钟上手

### 基础用法

```tsx
import DsMarkdown from 'ds-markdown';
import 'ds-markdown/style.css';

function App() {
  return (
    <DsMarkdown interval={20} answerType="answer">
      # Hello ds-markdown 这是一个**高性能**的打字动画组件！ ## 特性 - ⚡ 零延迟流式处理 - 🎬 流畅打字动画 - 🎯 完美语法支持
    </DsMarkdown>
  );
}
```

### AI 对话场景

```tsx
function ChatDemo() {
  const [thinking, setThinking] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAsk = () => {
    setThinking('🤔 正在思考您的问题...');

    setTimeout(() => {
      setAnswer(`# 关于 React 19

React 19 带来了许多激动人心的新特性：

## 🚀 主要更新
1. **React Compiler** - 自动优化性能
2. **Actions** - 简化表单处理
3. **Document Metadata** - 内置 SEO 支持

让我们一起探索这些新功能！`);
    }, 2000);
  };

  return (
    <div>
      <button onClick={handleAsk}>询问 AI</button>

      {thinking && (
        <DsMarkdown answerType="thinking" interval={30}>
          {thinking}
        </DsMarkdown>
      )}

      {answer && (
        <DsMarkdown answerType="answer" interval={15}>
          {answer}
        </DsMarkdown>
      )}
    </div>
  );
}
```

---

## 📚 完整 API 文档

### 声明式 API (推荐新手)

| 属性          | 类型                                        | 说明                    | 默认值                                                      |
| ------------- | ------------------------------------------- | ----------------------- | ----------------------------------------------------------- |
| `interval`    | `number`                                    | 打字间隔 (毫秒)         | `30`                                                        |
| `timerType`   | `'setTimeout'` \| `'requestAnimationFrame'` | 定时器类型              | 当前默认值是`setTimeout`，后期会改为`requestAnimationFrame` |
| `answerType`  | `'thinking'` \| `'answer'`                  | 内容类型 (影响样式主题) | `'answer'`                                                  |
| `theme`       | `'light'` \| `'dark'`                       | 主题类型                | `'light'`                                                   |
| `onEnd`       | `(data: EndData) => void`                   | 打字结束回调            | -                                                           |
| `onStart`     | `(data: StartData) => void`                 | 打字开始回调            | -                                                           |
| `onTypedChar` | `(data: CharData) => void`                  | 每字符打字回调          | -                                                           |

### 命令式 API (推荐流式场景)

```typescript
import { MarkdownCMD, MarkdownRef } from 'ds-markdown';

interface MarkdownRef {
  push: (content: string, answerType: AnswerType) => void;
  clear: () => void;
  triggerWholeEnd: () => void;
}
```

| 方法              | 参数                                        | 说明               |
| ----------------- | ------------------------------------------- | ------------------ |
| `push`            | `(content: string, answerType: AnswerType)` | 添加内容并开始打字 |
| `clear`           | -                                           | 清空所有内容和状态 |
| `triggerWholeEnd` | -                                           | 手动触发完成回调   |

---

## 🎛️ 定时器模式详解

### `requestAnimationFrame` 模式 🌟 (推荐)

```typescript
// 🎯 特性
- 时间驱动：基于真实经过时间计算字符数量
- 批量处理：单帧内可处理多个字符
- 帧同步：与浏览器 60fps 刷新率同步
- 高频优化：完美支持 interval < 16ms 的高速打字

// 🎯 适用场景
- 现代 Web 应用的默认选择
- 追求流畅动画效果
- 高频打字 (interval > 0 即可)
- AI 实时对话场景
```

### `setTimeout` 模式 📟 (兼容)

```typescript
// 🎯 特性
- 单字符：每次精确处理一个字符
- 固定间隔：严格按设定时间执行
- 节拍感：经典打字机的节奏感
- 精确控制：适合特定时序要求

// 🎯 适用场景
- 需要精确时间控制
- 营造复古打字机效果
- 兼容性要求较高的场景
```

### 📊 性能对比

| 特性         | requestAnimationFrame        | setTimeout       |
| ------------ | ---------------------------- | ---------------- |
| **字符处理** | 每帧可处理多个字符           | 每次处理一个字符 |
| **高频间隔** | ✅ 优秀 (5ms → 每帧3字符)    | ❌ 可能卡顿      |
| **低频间隔** | ✅ 正常 (100ms → 6帧后1字符) | ✅ 精确          |
| **视觉效果** | 🎬 流畅动画感                | ⚡ 精确节拍感    |
| **性能开销** | 🟢 低 (帧同步)               | 🟡 中等 (定时器) |

高频推荐`requestAnimationFrame`,低频推荐 `setTimeout`

---

## 💡 实战示例

### 📝 AI 流式对话

````tsx
import { useRef } from 'react';
import { MarkdownCMD, MarkdownRef } from 'ds-markdown';

function StreamingChat() {
  const markdownRef = useRef<MarkdownRef>(null);

  // 模拟 AI 流式响应
  const simulateAIResponse = async () => {
    markdownRef.current?.clear();

    // 思考阶段
    markdownRef.current?.push('🤔 正在分析您的问题...', 'thinking');
    await delay(1000);
    markdownRef.current?.push('\n\n✅ 分析完成，开始回答', 'thinking');

    // 流式回答
    const chunks = [
      '# React 19 新特性解析\n\n',
      '## 🚀 React Compiler\n',
      'React 19 最大的亮点是引入了 **React Compiler**：\n\n',
      '- 🎯 **自动优化**：无需手动 memo 和 useMemo\n',
      '- ⚡ **性能提升**：编译时优化，运行时零开销\n',
      '- 🔧 **向后兼容**：现有代码无需修改\n\n',
      '## 📝 Actions 简化表单\n',
      '新的 Actions API 让表单处理变得更简单：\n\n',
      '```tsx\n',
      'function ContactForm({ action }) {\n',
      '  const [state, formAction] = useActionState(action, null);\n',
      '  return (\n',
      '    <form action={formAction}>\n',
      '      <input name="email" type="email" />\n',
      '      <button>提交</button>\n',
      '    </form>\n',
      '  );\n',
      '}\n',
      '```\n\n',
      '希望这个解答对您有帮助！🎉',
    ];

    for (const chunk of chunks) {
      await delay(100);
      markdownRef.current?.push(chunk, 'answer');
    }
  };

  return (
    <div className="chat-container">
      <button onClick={simulateAIResponse}>🤖 询问 React 19 新特性</button>

      <MarkdownCMD ref={markdownRef} interval={10} timerType="requestAnimationFrame" onEnd={(data) => console.log('段落完成:', data)} />
    </div>
  );
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
````

### 🔄 流式 Markdown 语法处理

**核心问题**：流式输出时，不完整的 Markdown 语法会导致渲染错误

```tsx
// 🚨 问题场景
push('#'); // "# "
push(' '); // "# "
push('标题'); // "# 标题"
push('\n'); // "# 标题\n"
push('1'); // "# 标题\n1"     ← 这里会被误解析为段落
push('.'); // "# 标题\n1."    ← 形成正确的列表
push(' 项目'); // "# 标题\n1. 项目"
```

**✅ 智能解决方案**：组件内置同步缓冲机制

```tsx
// 组件会智能处理语法边界
const handleStreamingMarkdown = () => {
  const chunks = ['#', ' ', '使用', '技能', '\n', '1', '.', ' ', '技能1', '\n', '2', '.', ' 技能2'];

  chunks.forEach((chunk) => {
    markdownRef.current?.push(chunk, 'answer');
    // 无需延迟，组件内部智能缓冲
  });
};

// 🧠 智能处理流程：
// 1. 实时检测 "# 使用技能\n1" 语法不完整
// 2. 智能缓冲，等待更多字符
// 3. 收到 "." 形成 "1." 后立即处理
// 4. 零延迟，纯同步处理
```

**支持的语法检测**：

````typescript
// ✅ 完整语法 (立即处理)
'## 标题'; // 完整标题
'1. 列表项'; // 完整列表项
'- 项目'; // 完整无序列表
'> 引用内容'; // 完整引用
'```javascript'; // 代码块开始
'```'; // 代码块结束
'内容以换行结尾\n'; // 换行边界

// 🔄 不完整语法 (智能缓冲)
'##'; // 只有标题符号
'1'; // 只有数字
'```java'; // 可能的代码块开始
````

---

## 🔧 最佳实践

### 1. 性能优化

```tsx
// ✅ 推荐配置
<DsMarkdown
  timerType="requestAnimationFrame"
  interval={15} // 15-30ms 为最佳体验
/>

// ❌ 避免过小间隔
<DsMarkdown interval={1} /> // 可能导致性能问题
```

### 2. 流式数据处理

```tsx
// ✅ 推荐：命令式 API
const ref = useRef<MarkdownRef>(null);
useEffect(() => {
  ref.current?.push(newChunk, 'answer');
}, [newChunk]);

// ❌ 避免：频繁更新 children
const [content, setContent] = useState('');
// 每次更新都会重新解析整个内容
```

### 3. 类型安全

```tsx
import { MarkdownRef } from 'ds-markdown';

const ref = useRef<MarkdownRef>(null);
// 完整的 TypeScript 类型提示
```

### 4. 样式定制

```css
/* 思考区域样式 */
.ds-markdown-thinking {
  background: rgba(255, 193, 7, 0.1);
  border-left: 3px solid #ffc107;
  padding: 12px;
  border-radius: 6px;
  margin: 8px 0;
}

/* 回答区域样式 */
.ds-markdown-answer {
  color: #333;
  line-height: 1.6;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* 代码块样式 */
.ds-markdown pre {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
}

/* 表格样式 */
.ds-markdown-table {
  border-collapse: collapse;
  width: 100%;
  margin: 16px 0;
}

.ds-markdown-table th,
.ds-markdown-table td {
  border: 1px solid #ddd;
  padding: 8px 12px;
  text-align: left;
}
```

---

## 🌐 兼容性

| 环境           | 版本要求                            | 说明            |
| -------------- | ----------------------------------- | --------------- |
| **React**      | 16.8.0+                             | 需要 Hooks 支持 |
| **TypeScript** | 4.0+                                | 可选，但推荐    |
| **浏览器**     | Chrome 60+, Firefox 55+, Safari 12+ | 现代浏览器      |
| **Node.js**    | 14.0+                               | 构建环境        |

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/amazing-feature`
3. 提交更改：`git commit -m 'Add amazing feature'`
4. 推送分支：`git push origin feature/amazing-feature`
5. 提交 Pull Request

---

## 📄 开源协议

MIT © [onshinpei](https://github.com/onshinpei)

---

<div align="center">
  <strong>如果这个项目对你有帮助，请给个 ⭐️ Star 支持一下！</strong>
  
  <br><br>
  
  [🐛 报告问题](https://github.com/onshinpei/ds-markdown/issues) | 
  [💡 功能建议](https://github.com/onshinpei/ds-markdown/issues) | 
  [📖 查看文档](https://onshinpei.github.io/ds-markdown/)
</div>
