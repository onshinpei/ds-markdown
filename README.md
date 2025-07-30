# ds-markdown

> 🚀 高性能 React Markdown 打字动画组件，完美复刻 DeepSeek 聊天界面效果

**🇨🇳 中文 | [🇺🇸 English](./README.en.md)**

一个专为现代 AI 应用设计的 React 组件，提供流畅的实时打字动画和完整的 Markdown 渲染能力。

[![npm version](https://img.shields.io/npm/v/ds-markdown)](https://www.npmjs.com/package/ds-markdown)
[![npm downloads](https://img.shields.io/npm/dm/ds-markdown.svg)](https://www.npmjs.com/package/ds-markdown)
[![bundle size](https://img.shields.io/bundlephobia/minzip/ds-markdown)](https://bundlephobia.com/package/ds-markdown)
[![React](https://img.shields.io/badge/React-18.0.0+-blue)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)

[使用文档](https://onshinpei.github.io/ds-markdown/)

- [基本用法](https://stackblitz.com/edit/vitejs-vite-ddfw8avb?file=src%2FApp.tsx)
- [流式数据用法](https://stackblitz.com/edit/vitejs-vite-2ri8kex3?file=src%2FApp.tsx)
- [mermaid图表](https://stackblitz.com/edit/vitejs-vite-iqbyta3j?file=index.html)
- [数学公式demo1](https://stackblitz.com/edit/vitejs-vite-iqbyta3j?file=index.html)
- [数学公式demo2](https://stackblitz.com/edit/vitejs-vite-xk9lxagc?file=src%2FApp.tsx)

如果你想要一个纯净的`react markdown` 打字组件，可以使用[react-markdown-typer](https://github.com/onshinpei/react-markdown-typer)

---

## ❓ 为什么要用 ds-markdown？

- **AI 聊天体验极致还原**  
  1:1 复刻 DeepSeek 等主流 AI 聊天界面的打字动画和流式响应，带来真实的"AI 正在思考/回答"体验，极大提升用户沉浸感。

- **后端流式数据完美适配**  
  很多 AI/LLM 后端接口（如 OpenAI、DeepSeek 等）推送的数据 chunk 往往一次包含多个字符，普通打字机实现会出现卡顿、跳字等问题。  
  **ds-markdown 会自动将每个 chunk 拆分为单个字符，逐字流畅渲染动画，无论后端一次推送多少字，都能保证每个字都流畅打字。**

- **完整 Markdown & 数学公式、Diagram支持**

  - 内置 KaTeX，支持所有主流 Markdown 语法和数学公式，适合技术问答、教育、知识库等内容丰富的应用。
  - 通过插件[mermaid-plugin](https://github.com/onshinpei/ds-markdown-mermaid-plugin)支持`Diagram`的渲染

- **极致开发体验**  
  丰富的命令式 API，支持流式数据、异步回调、插件扩展，开发者可灵活控制动画和内容。

- **轻量高性能**  
  体积小、性能优，适配移动端和桌面端。核心依赖 [react-markdown](https://github.com/remarkjs/react-markdown)（业界主流、成熟的 Markdown 渲染库），无其它重量级依赖，开箱即用。

- **多主题与插件化架构**  
  支持亮/暗主题切换，兼容 remark/rehype 插件，满足个性化和高级扩展需求。

- **丰富的UI组件系统** 🆕  
  内置按钮、工具提示、分段控制器等UI组件，支持代码块复制、下载等交互功能。

- **适用场景广泛**
  - AI 聊天机器人/助手
  - 实时问答/知识库
  - 教育/数学/编程内容展示
  - 产品演示、交互式文档
  - 任何需要"打字机"动画和流式 Markdown 渲染的场景

---

## 📋 目录

- [✨ 核心特性](#-核心特性)
- [📦 快速安装](#-快速安装)
- [🚀 5分钟上手](#-5分钟上手)
  - [基础用法](#基础用法)
  - [禁用打字动画](#禁用打字动画)
  - [数学公式支持](#数学公式支持)
  - [AI 对话场景](#ai-对话场景)
  - [代码块功能](#代码块功能) 🆕
  - [Mermaid图表支持](#mermaid图表支持) 🆕
- [📚 完整 API 文档](#-完整-api-文档)
- [🔌 插件系统](#-插件系统)
- [🎨 UI组件系统](#-ui组件系统) 🆕
- [💡 实战示例](#-实战示例)
- [🔧 最佳实践](#-最佳实践)

---

## ✨ 核心特性

### 🤖 **AI 对话场景**

- 1:1 复刻 [DeepSeek 官网](https://chat.deepseek.com/) 聊天响应效果
- 支持思考过程 (`thinking`) 和回答内容 (`answer`) 双模式
- 流式数据完美适配，零延迟响应用户输入

### 📊 **内容展示场景**

- 完整 Markdown 语法支持，包括代码高亮、表格、列表等
- 数学公式渲染 (KaTeX)，支持 `$...$` 和 `\[...\]` 语法
- Mermaid 图表支持，包括流程图、序列图、甘特图、类图等 🆕
- 支持亮色/暗色主题，适配不同产品风格
- 插件化架构，支持 remark/rehype 插件扩展

### 🎨 **UI组件系统** 🆕

- 内置丰富的UI组件：Button、IconButton、ToolTip、Segmented等
- 代码块增强功能：复制、下载、语言标识
- 完整的交互体验和无障碍支持

### 🔧 **开发体验**

- 支持打字中断 `stop` 和继续 `resume`
- 支持打字关闭与开启
- 完整的TypeScript类型支持

### 🎬 **流畅动画**

- 双模式定时器优化，支持`requestAnimationFrame`和`setTimeout`模式
- 高频打字支持（`requestAnimationFrame`模式下打字间隔最低可接近于`0ms`）
- 帧同步渲染，与浏览器刷新完美配合
- 智能字符批量处理，视觉效果更自然

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

[DEMO](https://stackblitz.com/edit/stackblitz-starters-7vcclcw7?file=index.html)

```html
<!-- 导入样式， 必须 -->
<link rel="stylesheet" href="https://esm.sh/ds-markdown/dist/style.css" />

<!-- 导入katex数学公式样式， 非不要不引入 -->
<link rel="stylesheet" href="https://esm.sh/ds-markdown/dist/katex.css" />

<!-- 导入组件 -->
<script type="module">
  import Markdown from 'https://esm.sh/ds-markdown';
</script>
```

## 🚀 5分钟上手

### 基础用法

[DEMO](https://stackblitz.com/edit/vitejs-vite-z94syu8j?file=src%2FApp.tsx)

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

### 禁用打字动画

```tsx
import DsMarkdown from 'ds-markdown';
import 'ds-markdown/style.css';

function StaticDemo() {
  const [disableTyping, setDisableTyping] = useState(false);

  return (
    <div>
      <button onClick={() => setDisableTyping(!disableTyping)}>{disableTyping ? '开启' : '关闭'}打字机效果</button>

      <DsMarkdown interval={20} answerType="answer" disableTyping={disableTyping}>
        # 静态展示模式 当 `disableTyping` 为 `true` 时，内容会立即全部显示，无打字动画效果。 这在某些场景下非常有用： - 📄 静态文档展示 - 🔄 切换显示模式 - ⚡ 快速预览内容
      </DsMarkdown>
    </div>
  );
}
```

### 数学公式支持

```tsx
import DsMarkdown from 'ds-markdown';
// 如果需要展示公式，则需要引入公式转换插件
import { katexPlugin } from 'ds-markdown/plugins';
import 'ds-markdown/style.css';
// 如果需要展示公式，则需要引入数学公式样式
import 'ds-markdown/katex.css';

function MathDemo() {
  return (
    <DsMarkdown interval={20} answerType="answer" plugins={[katexPlugin]} math={{ splitSymbol: 'dollar' }}>
      # 勾股定理 在直角三角形中，斜边的平方等于两条直角边的平方和： $a^2 + b^2 = c^2$ 其中： - $a$ 和 $b$ 是直角边 - $c$ 是斜边 对于经典的"勾三股四弦五"： $c = \sqrt{3 ^ (2 + 4) ^ 2} = \sqrt{25} = 5$
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

### 代码块功能 🆕

```tsx
import DsMarkdown from 'ds-markdown';
import 'ds-markdown/style.css';

function CodeBlockDemo() {
  const codeContent = `# Hello World

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('ds-markdown');
\`\`\`

支持代码高亮、复制和下载功能！`;

  return (
    <DsMarkdown
      interval={20}
      answerType="answer"
      codeBlock={{
        headerActions: true, // 启用代码块头部操作按钮
      }}
    >
      {codeContent}
    </DsMarkdown>
  );
}
```

### Mermaid图表支持 🆕

```tsx
import DsMarkdown from 'ds-markdown';
import { ConfigProvider } from 'ds-markdown';
import mermaidPlugin from 'ds-markdown-mermaid-plugin';
import 'ds-markdown/style.css';

function MermaidDemo() {
  const chartContent = `# 流程图示例

\`\`\`mermaid
flowchart TD
    A[开始] --> B{判断条件}
    B -->|是| C[处理A]
    B -->|否| D[处理B]
    C --> E[结束]
    D --> E
\`\`\`

## 序列图示例

\`\`\`mermaid
sequenceDiagram
    participant 用户
    participant 系统
    participant 数据库
    
    用户->>系统: 登录请求
    系统->>数据库: 验证用户
    数据库-->>系统: 返回结果
    系统-->>用户: 登录响应
\`\`\`

支持流程图、序列图、甘特图、类图等多种图表类型！`;

  return (
    <ConfigProvider>
      <DsMarkdown interval={20} answerType="answer" plugins={[mermaidPlugin]}>
        {chartContent}
      </DsMarkdown>
    </ConfigProvider>
  );
}
```

---

## 📚 完整 API 文档

### 默认导出 DsMarkdown 和 MarkdownCMD 的 props

```js
import DsMarkdown, { MarkdownCMD } from 'ds-markdown';
```

| 属性                | 类型                                        | 说明                                                          | 默认值                                                      |
| ------------------- | ------------------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------- |
| `interval`          | `number`                                    | 打字间隔 (毫秒)                                               | `30`                                                        |
| `timerType`         | `'setTimeout'` \| `'requestAnimationFrame'` | 定时器类型，不支持动态修改                                    | 当前默认值是`setTimeout`，后期会改为`requestAnimationFrame` |
| `answerType`        | `'thinking'` \| `'answer'`                  | 内容类型 (影响样式主题)，不支持动态修改                       | `'answer'`                                                  |
| `theme`             | `'light'` \| `'dark'`                       | 主题类型                                                      | `'light'`                                                   |
| `plugins`           | `IMarkdownPlugin[]`                         | 插件配置                                                      | `[]`                                                        |
| `math`              | [IMarkdownMath](#IMarkdownMath)             | 数学公式配置                                                  | `{ splitSymbol: 'dollar' }`                                 |
| `onEnd`             | `(data: EndData) => void`                   | 打字结束回调                                                  | -                                                           |
| `onStart`           | `(data: StartData) => void`                 | 打字开始回调                                                  | -                                                           |
| `onBeforeTypedChar` | `(data: IBeforeTypedChar) => Promise<void>` | 字符打字前的回调，支持异步操作，会阻塞之后的打字              | -                                                           |
| `onTypedChar`       | `(data: ITypedChar) => void`                | 每字符打字后的回调                                            | -                                                           |
| `disableTyping`     | `boolean`                                   | 禁用打字动画效果                                              | `false`                                                     |
| `autoStartTyping`   | `boolean`                                   | 是否自动开始打字动画，设为 false 时需手动触发，不支持动态修改 | `true`                                                      |
| `codeBlock`         | `IMarkdownCode`                             | 代码块配置                                                    | `{headerActions: true}`                                     |

> 注意： 如果当在打字中 `disableTyping`从 `true` 变为 `false`，则在下一个打字触发时，会把剩下的所有字一次性显示

### IBeforeTypedChar

| 属性           | 类型         | 说明                         | 默认值 |
| -------------- | ------------ | ---------------------------- | ------ |
| `currentIndex` | `number`     | 当前字符在整个字符串中的索引 | `0`    |
| `currentChar`  | `string`     | 当前即将打字的字符           | -      |
| `answerType`   | `AnswerType` | 内容类型 (thinking/answer)   | -      |
| `prevStr`      | `string`     | 当前类型内容的前缀字符串     | -      |
| `percent`      | `number`     | 打字进度百分比 (0-100)       | `0`    |

### ITypedChar

| 属性           | 类型         | 说明                         | 默认值 |
| -------------- | ------------ | ---------------------------- | ------ |
| `currentIndex` | `number`     | 当前字符在整个字符串中的索引 | `0`    |
| `currentChar`  | `string`     | 当前已打字的字符             | -      |
| `answerType`   | `AnswerType` | 内容类型 (thinking/answer)   | -      |
| `prevStr`      | `string`     | 当前类型内容的前缀字符串     | -      |
| `currentStr`   | `string`     | 当前类型内容的完整字符串     | -      |
| `percent`      | `number`     | 打字进度百分比 (0-100)       | `0`    |

#### IMarkdownMath

| 属性          | 类型                      | 说明               | 默认值     |
| ------------- | ------------------------- | ------------------ | ---------- |
| `splitSymbol` | `'dollar'` \| `'bracket'` | 数学公式分隔符类型 | `'dollar'` |

**分隔符说明：**

- `'dollar'`：使用 `$...$` 和 `$$...$$` 语法
- `'bracket'`：使用 `\(...\)` 和 `\[...\]` 语法

#### IMarkdownCode 🆕

| 属性            | 类型      | 说明                 | 默认值 |
| --------------- | --------- | -------------------- | ------ |
| `headerActions` | `boolean` | 是否显示头部操作按钮 | `true` |

#### IMarkdownPlugin

| 属性           | 类型                                           | 说明              | 默认值 |
| -------------- | ---------------------------------------------- | ----------------- | ------ |
| `remarkPlugin` | `Pluggable`                                    | remark 插件       | -      |
| `rehypePlugin` | `Pluggable`                                    | rehype 插件       | -      |
| `type`         | `'buildIn'` \| `'custom'`                      | 插件类型          | -      |
| `id`           | `any`                                          | 插件唯一标识      | -      |
| `components`   | `Record<string, React.ComponentType<unknown>>` | 自定义组件映射 🆕 | -      |

### 组件暴露的方法

#### 默认导出 DsMarkdown

| 方法      | 参数 | 说明                                   |
| --------- | ---- | -------------------------------------- |
| `start`   | -    | 开始打字动画                           |
| `stop`    | -    | 暂停打字动画                           |
| `resume`  | -    | 恢复打字动画                           |
| `restart` | -    | 重新开始打字动画，从头开始播放当前内容 |

#### MarkdownCMD 暴露的方法

| 方法              | 参数                                        | 说明                                   |
| ----------------- | ------------------------------------------- | -------------------------------------- |
| `push`            | `(content: string, answerType: AnswerType)` | 添加内容并开始打字                     |
| `clear`           | -                                           | 清空所有内容和状态                     |
| `triggerWholeEnd` | -                                           | 手动触发完成回调                       |
| `start`           | -                                           | 开始打字动画                           |
| `stop`            | -                                           | 暂停打字动画                           |
| `resume`          | -                                           | 恢复打字动画                           |
| `restart`         | -                                           | 重新开始打字动画，从头开始播放当前内容 |

**用法示例：**

```tsx
markdownRef.current?.start(); // 开始动画
markdownRef.current?.stop(); // 暂停动画
markdownRef.current?.resume(); // 恢复动画
markdownRef.current?.restart(); // 重新开始动画
```

---

## 🔌 插件系统

### 内置插件

#### KaTeX 数学公式插件

[DEMO](https://stackblitz.com/edit/vitejs-vite-iqbyta3j?file=index.html)

```tsx
import { katexPlugin } from 'ds-markdown/plugins';

// 启用数学公式支持
<DsMarkdown plugins={[katexPlugin]}>数学公式：$E = mc^2$</DsMarkdown>;
```

#### Mermaid 图表插件 🆕

**安装 Mermaid 插件：**

```bash
npm install ds-markdown-mermaid-plugin
```

**基础用法：**

```tsx
import { ConfigProvider, Markdown } from 'ds-markdown';
import mermaidPlugin from 'ds-markdown-mermaid-plugin';

function App() {
  const content = `
# 流程图示例

\`\`\`mermaid
flowchart TD
    A[开始] --> B{判断条件}
    B -->|是| C[处理A]
    B -->|否| D[处理B]
    C --> E[结束]
    D --> E
\`\`\`
`;

  return (
    <ConfigProvider>
      <Markdown plugins={[mermaidPlugin]}>{content}</Markdown>
    </ConfigProvider>
  );
}
```

**支持的图表类型：**

- 🔄 **流程图** (Flowchart) - 展示流程和决策路径
- 📋 **序列图** (Sequence Diagram) - 展示对象间的交互时序
- 📅 **甘特图** (Gantt Chart) - 项目计划和时间线
- 🏗️ **类图** (Class Diagram) - 面向对象设计
- 🥧 **饼图** (Pie Chart) - 数据比例展示
- 🔀 **状态图** (State Diagram) - 状态转换流程
- 📊 **Git图** (Git Graph) - 代码分支历史
- 🗺️ **用户旅程图** (User Journey) - 用户体验流程

**配置 Mermaid：**

```tsx
import { ConfigProvider } from 'ds-markdown';

const mermaidConfig = {
  theme: 'default', // 主题：default, neutral, dark, forest
  flowchart: {
    useMaxWidth: true,
    htmlLabels: true,
  },
  sequence: {
    diagramMarginX: 50,
    diagramMarginY: 10,
  },
};

return (
  <ConfigProvider mermaidConfig={mermaidConfig}>
    <Markdown plugins={[mermaidPlugin]}>{chartContent}</Markdown>
  </ConfigProvider>
);
```

**相关链接：**

- [ds-markdown-mermaid-plugin GitHub](https://github.com/onshinpei/ds-markdown-mermaid-plugin)
- [Mermaid 官方文档](https://mermaid.js.org/)

### 自定义插件

```tsx
import { createBuildInPlugin } from 'ds-markdown/plugins';

// 创建自定义插件
const customPlugin = createBuildInPlugin({
  remarkPlugin: yourRemarkPlugin,
  rehypePlugin: yourRehypePlugin,
  id: Symbol('custom-plugin'),
  components: {
    // 自定义组件映射 🆕
    CustomComponent: MyCustomComponent,
  },
});

// 使用自定义插件
<DsMarkdown plugins={[katexPlugin, customPlugin]}>内容</DsMarkdown>;
```

---

## 🎨 UI组件系统 🆕

ds-markdown 提供了丰富的UI组件，可以单独使用或与markdown组件配合。

### 核心组件

```tsx
import {
  Button,
  IconButton,
  ToolTip,
  Segmented,
  CopyButton,
  DownloadButton
} from 'ds-markdown';

// 按钮组件
<Button icon={<span>📄</span>} onClick={() => {}}>
  点击按钮
</Button>

// 工具提示
<ToolTip title="提示信息">
  <IconButton icon={<span>📋</span>} onClick={() => {}} />
</ToolTip>

// 分段控制器
<Segmented
  Segmented={[
    { label: '图表', value: 'diagram' },
    { label: '代码', value: 'code' }
  ]}
  value={value}
  onChange={setValue}
/>

// 代码块操作
<CopyButton codeContent="console.log('Hello')" />
<DownloadButton codeContent="console.log('Hello')" language="javascript" />
```

### 样式定制

```css
:root {
  --ds-button-bg-color: #f5f5f5;
  --ds-button-hover-color: #e0e0e0;
  --ds-tooltip-bg-color: rgba(0, 0, 0, 0.8);
}
```

---

## 多语言配置

```tsx
import { ConfigProvider } from 'ds-markdown';
import zhCN from 'ds-markdown/i18n/zh';
import enUS from 'ds-markdown/i18n/en';

// 中文
<ConfigProvider locale={zhCN}>
  <DsMarkdown {...props} />
</ConfigProvider>

// 英文
<ConfigProvider locale={enUS}>
  <DsMarkdown {...props} />
</ConfigProvider>
```

---

## 💡 实战示例

### 📝 AI 流式对话

[DEMO: 🔧 StackBlitz 体验](https://stackblitz.com/edit/vitejs-vite-2ri8kex3?file=src%2FApp.tsx)

```tsx
import { useRef } from 'react';
import { MarkdownCMD, MarkdownCMDRef } from 'ds-markdown';

function StreamingChat() {
  const markdownRef = useRef<MarkdownCMDRef>(null);

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
      '希望这个解答对您有帮助！🎉',
    ];

    for (const chunk of chunks) {
      await delay(100);
      markdownRef.current?.push(chunk, 'answer');
    }
  };

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <div className="chat-container">
      <button onClick={simulateAIResponse}>🤖 询问 React 19 新特性</button>
      <MarkdownCMD ref={markdownRef} interval={10} timerType="requestAnimationFrame" />
    </div>
  );
}
```

## 🔧 最佳实践

### 1. 性能优化

```tsx
// ✅ 推荐配置
<DsMarkdown
  timerType="requestAnimationFrame"
  interval={15} // 15-30ms 为最佳体验
/>
```

### 2. 流式数据处理

```tsx
// ✅ 推荐：命令式 API
const ref = useRef<MarkdownCMDRef>(null);
useEffect(() => {
  ref.current?.push(newChunk, 'answer');
}, [newChunk]);
```

### 3. 数学公式优化

```tsx
// ✅ 推荐：按需加载
import { katexPlugin } from 'ds-markdown/plugins';
import 'ds-markdown/katex.css'; // 仅在需要时引入

<DsMarkdown plugins={[katexPlugin]}>数学公式内容</DsMarkdown>;
```

### 4. Mermaid图表最佳实践 🆕

```tsx
// ✅ 推荐：独立安装插件
npm install ds-markdown-mermaid-plugin

// ✅ 推荐：配置适合的主题
const mermaidConfig = {
  theme: 'default', // 根据应用主题选择
  flowchart: { useMaxWidth: true },
};

<ConfigProvider mermaidConfig={mermaidConfig}>
  <DsMarkdown plugins={[mermaidPlugin]} />
</ConfigProvider>
```
