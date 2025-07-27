# ds-markdown

> 🚀 High-performance React Markdown typing animation component, perfectly replicating DeepSeek chat interface effects

**[🇨🇳 中文](./README.md) | 🇺🇸 English**

A React component designed specifically for modern AI applications, providing smooth real-time typing animations and complete Markdown rendering capabilities.

[![npm version](https://img.shields.io/npm/v/ds-markdown)](https://www.npmjs.com/package/ds-markdown)
[![npm downloads](https://img.shields.io/npm/dm/ds-markdown.svg)](https://www.npmjs.com/package/ds-markdown)
[![bundle size](https://img.shields.io/bundlephobia/minzip/ds-markdown)](https://bundlephobia.com/package/ds-markdown)
[![React](https://img.shields.io/badge/React-18.0.0+-blue)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)

- [Documentation](https://onshinpei.github.io/ds-markdown/)
- Usage Examples
  - [Basic Usage](https://stackblitz.com/edit/vitejs-vite-ddfw8avb?file=src%2FApp.tsx)
  - [Streaming Data Usage](https://stackblitz.com/edit/vitejs-vite-2ri8kex3?file=src%2FApp.tsx)
  - [Mermaid Charts](https://stackblitz.com/edit/vitejs-vite-iqbyta3j?file=index.html)
  - [Math Formula Demo 1](https://stackblitz.com/edit/vitejs-vite-iqbyta3j?file=index.html)
  - [Math Formula Demo 2](https://stackblitz.com/edit/vitejs-vite-xk9lxagc?file=src%2FApp.tsx)

If you want a pure `react markdown` typing component, you can use [react-markdown-typer](https://github.com/onshinpei/react-markdown-typer)

---

## ❓ Why use ds-markdown?

- **Ultimate AI Chat Experience**  
  1:1 recreation of DeepSeek and other mainstream AI chat interface typing animations and streaming responses, delivering an authentic "AI is thinking/answering" experience that greatly enhances user immersion.

- **Perfect for Streaming Backend Data**  
  Many AI/LLM backend interfaces (like OpenAI, DeepSeek, etc.) push data chunks containing multiple characters at once, which can cause stuttering and character jumping issues with ordinary typewriter implementations.  
  **ds-markdown automatically splits each chunk into single characters and renders them one by one with smooth animations, ensuring fluent typing regardless of how many characters the backend pushes at once.**

- **Complete Markdown & Math Formula, Diagram Support**

  - Built-in KaTeX, supporting all mainstream Markdown syntax and math formulas, suitable for technical Q&A, education, knowledge bases, and other content-rich applications.
  - Support for `Diagram` rendering through the [mermaid-plugin](https://github.com/onshinpei/ds-markdown-mermaid-plugin)

- **Excellent Developer Experience**  
  Rich imperative API, supporting streaming data, async callbacks, and plugin extensions, allowing developers to flexibly control animations and content.

- **Lightweight & High Performance**  
  Small size, excellent performance, compatible with mobile and desktop. Core dependency is [react-markdown](https://github.com/remarkjs/react-markdown) (industry mainstream, mature Markdown rendering library), with no other heavyweight dependencies - works out of the box.

- **Multi-theme & Plugin Architecture**  
  Support for light/dark theme switching, compatible with remark/rehype plugins, meeting personalized and advanced extension needs.

- **Rich UI Component System** 🆕  
  Built-in UI components: Button, IconButton, ToolTip, Segmented, etc., supporting code block copy, download, and other interactive features.

- **Wide Range of Use Cases**
  - AI chatbots/assistants
  - Real-time Q&A/knowledge bases
  - Education/math/programming content display
  - Product demos, interactive documentation
  - Any scenario requiring "typewriter" animation and streaming Markdown rendering

---

## 📋 Table of Contents

- [✨ Core Features](#-core-features)
- [📦 Quick Installation](#-quick-installation)
- [🚀 5-Minute Quick Start](#-5-minute-quick-start)
  - [Basic Usage](#basic-usage)
  - [Disable Typing Animation](#disable-typing-animation)
  - [Mathematical Formula Support](#mathematical-formula-support)
  - [AI Conversation Scenario](#ai-conversation-scenario)
  - [Code Block Features](#code-block-features) 🆕
  - [Mermaid Chart Support](#mermaid-chart-support) 🆕
- [📚 Complete API Documentation](#-complete-api-documentation)
- [🔌 Plugin System](#-plugin-system)
- [🎨 UI Component System](#-ui-component-system) 🆕
- [💡 Practical Examples](#-practical-examples)
- [🔧 Best Practices](#-best-practices)

---

## ✨ Core Features

### 🤖 **AI Conversation Scenarios**

- 1:1 recreation of [DeepSeek website](https://chat.deepseek.com/) chat response effects
- Support for both thinking process (`thinking`) and answer content (`answer`) modes
- Perfect adaptation to streaming data with zero-delay response to user input

### 📊 **Content Display Scenarios**

- Complete Markdown syntax support, including code highlighting, tables, lists, etc.
- Mathematical formula rendering (KaTeX), supporting `$...$` and `\[...\]` syntax
- Mermaid chart support, including flowcharts, sequence diagrams, Gantt charts, class diagrams, etc. 🆕
- Support for light/dark themes, adapting to different product styles
- Plugin architecture supporting remark/rehype plugin extensions

### 🎨 **UI Component System** 🆕

- Built-in rich UI components: Button, IconButton, ToolTip, Segmented, etc.
- Code block enhancement features: copy, download, language identification
- Complete interactive experience and accessibility support

### 🔧 **Developer Experience**

- Support for typing interruption `stop` and resume `resume`
- Support for enabling and disabling typing
- Complete TypeScript type support

### 🎬 **Smooth Animation**

- Dual timer mode optimization, supporting `requestAnimationFrame` and `setTimeout` modes
- High-frequency typing support (`requestAnimationFrame` mode supports typing intervals as low as `0ms`)
- Frame-synchronized rendering, perfectly matching browser refresh rate
- Smart character batch processing for more natural visual effects

---

## 📦 Quick Installation

```bash
# npm
npm install ds-markdown

# yarn
yarn add ds-markdown

# pnpm
pnpm add ds-markdown
```

### Using via ESM CDN

No installation required, use directly in browser:

[DEMO](https://stackblitz.com/edit/stackblitz-starters-7vcclcw7?file=index.html)

```html
<!-- Import styles, required -->
<link rel="stylesheet" href="https://esm.sh/ds-markdown/dist/style.css" />

<!-- Import katex math formula styles, only if needed -->
<link rel="stylesheet" href="https://esm.sh/ds-markdown/dist/katex.css" />

<!-- Import component -->
<script type="module">
  import Markdown from 'https://esm.sh/ds-markdown';
</script>
```

## 🚀 5-Minute Quick Start

### Basic Usage

[DEMO](https://stackblitz.com/edit/vitejs-vite-z94syu8j?file=src%2FApp.tsx)

```tsx
import DsMarkdown from 'ds-markdown';
import 'ds-markdown/style.css';

function App() {
  return (
    <DsMarkdown interval={20} answerType="answer">
      # Hello ds-markdown This is a **high-performance** typing animation component! ## Features - ⚡ Zero-delay streaming processing - 🎬 Smooth typing animation - 🎯 Perfect syntax support
    </DsMarkdown>
  );
}
```

### Disable Typing Animation

```tsx
import DsMarkdown from 'ds-markdown';
import 'ds-markdown/style.css';

function StaticDemo() {
  const [disableTyping, setDisableTyping] = useState(false);

  return (
    <div>
      <button onClick={() => setDisableTyping(!disableTyping)}>{disableTyping ? 'Enable' : 'Disable'} Typing Effect</button>

      <DsMarkdown interval={20} answerType="answer" disableTyping={disableTyping}>
        # Static Display Mode When `disableTyping` is `true`, content will be displayed immediately without typing animation. This is very useful in certain scenarios: - 📄 Static document display -
        🔄 Toggle display modes - ⚡ Quick content preview
      </DsMarkdown>
    </div>
  );
}
```

### Mathematical Formula Support

```tsx
import DsMarkdown from 'ds-markdown';
// If you need to display formulas, import the formula conversion plugin
import { katexPlugin } from 'ds-markdown/plugins';
import 'ds-markdown/style.css';
// If you need to display formulas, import mathematical formula styles
import 'ds-markdown/katex.css';

function MathDemo() {
  return (
    <DsMarkdown interval={20} answerType="answer" plugins={[katexPlugin]} math={{ splitSymbol: 'dollar' }}>
      # Pythagorean Theorem In a right triangle, the square of the hypotenuse equals the sum of squares of the two legs: $a^2 + b^2 = c^2$ Where: - $a$ and $b$ are the legs - $c$ is the hypotenuse For
      the classic "3-4-5" triangle: $c = \sqrt{3 ^ (2 + 4) ^ 2} = \sqrt{25} = 5$
    </DsMarkdown>
  );
}
```

### AI Conversation Scenario

```tsx
function ChatDemo() {
  const [thinking, setThinking] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAsk = () => {
    setThinking('🤔 Thinking about your question...');

    setTimeout(() => {
      setAnswer(`# About React 19

React 19 brings many exciting new features:

## 🚀 Major Updates
1. **React Compiler** - Automatic performance optimization
2. **Actions** - Simplified form handling
3. **Document Metadata** - Built-in SEO support

Let's explore these new features together!`);
    }, 2000);
  };

  return (
    <div>
      <button onClick={handleAsk}>Ask AI</button>

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

### Code Block Features 🆕

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

Supports code highlighting, copy, and download features!`;

  return (
    <DsMarkdown
      interval={20}
      answerType="answer"
      codeBlock={{
        headerActions: true, // Enable code block header action buttons
      }}
    >
      {codeContent}
    </DsMarkdown>
  );
}
```

### Mermaid Chart Support 🆕

```tsx
import DsMarkdown from 'ds-markdown';
import { ConfigProvider } from 'ds-markdown';
import mermaidPlugin from 'ds-markdown-mermaid-plugin';
import 'ds-markdown/style.css';

function MermaidDemo() {
  const chartContent = `# Flowchart Example

\`\`\`mermaid
flowchart TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Process A]
    B -->|No| D[Process B]
    C --> E[End]
    D --> E
\`\`\`

## Sequence Diagram Example

\`\`\`mermaid
sequenceDiagram
    participant User
    participant System
    participant Database
    
    User->>System: Login Request
    System->>Database: Verify User
    Database-->>System: Return Result
    System-->>User: Login Response
\`\`\`

Supports flowcharts, sequence diagrams, Gantt charts, class diagrams, and many other chart types!`;

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

## 📚 Complete API Documentation

### Default export DsMarkdown and MarkdownCMD props

```js
import DsMarkdown, { MarkdownCMD } from 'ds-markdown';
```

| Property            | Type                                        | Description                                                                        | Default                                                                       |
| ------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `interval`          | `number`                                    | Typing interval (milliseconds)                                                     | `30`                                                                          |
| `timerType`         | `'setTimeout'` \| `'requestAnimationFrame'` | Timer type, cannot be modified dynamically                                         | Current default is `setTimeout`, will change to `requestAnimationFrame` later |
| `answerType`        | `'thinking'` \| `'answer'`                  | Content type (affects styling), cannot be modified dynamically                     | `'answer'`                                                                    |
| `theme`             | `'light'` \| `'dark'`                       | Theme type                                                                         | `'light'`                                                                     |
| `plugins`           | `IMarkdownPlugin[]`                         | Plugin configuration                                                               | `[]`                                                                          |
| `math`              | [IMarkdownMath](#IMarkdownMath)             | Mathematical formula config                                                        | `{ splitSymbol: 'dollar' }`                                                   |
| `onEnd`             | `(data: EndData) => void`                   | Typing completion callback                                                         | -                                                                             |
| `onStart`           | `(data: StartData) => void`                 | Typing start callback                                                              | -                                                                             |
| `onBeforeTypedChar` | `(data: IBeforeTypedChar) => Promise<void>` | Character typing pre-callback, supports async operations, blocks subsequent typing | -                                                                             |
| `onTypedChar`       | `(data: ITypedChar) => void`                | Character typing post-callback                                                     | -                                                                             |
| `disableTyping`     | `boolean`                                   | Disable typing animation                                                           | `false`                                                                       |
| `autoStartTyping`   | `boolean`                                   | Whether to auto-start typing animation, set to false for manual trigger            | `true`                                                                        |
| `codeBlock`         | `IMarkdownCode`                             | Code block configuration                                                           | `{headerActions: true}`                                                       |

> Note: If `disableTyping` changes from `true` to `false` during typing, all remaining characters will be displayed at once on the next typing trigger.

### IBeforeTypedChar

| Property       | Type         | Description                                  | Default |
| -------------- | ------------ | -------------------------------------------- | ------- |
| `currentIndex` | `number`     | Current character index in the entire string | `0`     |
| `currentChar`  | `string`     | Character about to be typed                  | -       |
| `answerType`   | `AnswerType` | Content type (thinking/answer)               | -       |
| `prevStr`      | `string`     | Previous string of current type content      | -       |
| `percent`      | `number`     | Typing progress percentage (0-100)           | `0`     |

### ITypedChar

| Property       | Type         | Description                                  | Default |
| -------------- | ------------ | -------------------------------------------- | ------- |
| `currentIndex` | `number`     | Current character index in the entire string | `0`     |
| `currentChar`  | `string`     | Character that was just typed                | -       |
| `answerType`   | `AnswerType` | Content type (thinking/answer)               | -       |
| `prevStr`      | `string`     | Previous string of current type content      | -       |
| `currentStr`   | `string`     | Complete string of current type content      | -       |
| `percent`      | `number`     | Typing progress percentage (0-100)           | `0`     |

#### IMarkdownMath

| Property      | Type                      | Description                    | Default    |
| ------------- | ------------------------- | ------------------------------ | ---------- |
| `splitSymbol` | `'dollar'` \| `'bracket'` | Mathematical formula delimiter | `'dollar'` |

**Delimiter explanation:**

- `'dollar'`: Uses `$...$` and `$$...$$` syntax
- `'bracket'`: Uses `\(...\)` and `\[...\]` syntax

#### IMarkdownCode 🆕

| Property        | Type      | Description                | Default |
| --------------- | --------- | -------------------------- | ------- |
| `headerActions` | `boolean` | Show header action buttons | `true`  |

#### IMarkdownPlugin

| Property       | Type                                           | Description                 | Default |
| -------------- | ---------------------------------------------- | --------------------------- | ------- |
| `remarkPlugin` | `Pluggable`                                    | remark plugin               | -       |
| `rehypePlugin` | `Pluggable`                                    | rehype plugin               | -       |
| `type`         | `'buildIn'` \| `'custom'`                      | Plugin type                 | -       |
| `id`           | `any`                                          | Plugin unique identifier    | -       |
| `components`   | `Record<string, React.ComponentType<unknown>>` | Custom component mapping 🆕 | -       |

### Component Exposed Methods

#### Default export DsMarkdown

| Method    | Parameters | Description                                                   |
| --------- | ---------- | ------------------------------------------------------------- |
| `start`   | -          | Start typing animation                                        |
| `stop`    | -          | Pause typing                                                  |
| `resume`  | -          | Resume typing                                                 |
| `restart` | -          | Restart typing animation, play current content from beginning |

#### MarkdownCMD Exposed Methods

| Method            | Parameters                                  | Description                                                   |
| ----------------- | ------------------------------------------- | ------------------------------------------------------------- |
| `push`            | `(content: string, answerType: AnswerType)` | Add content and start typing                                  |
| `clear`           | -                                           | Clear all content and state                                   |
| `triggerWholeEnd` | -                                           | Manually trigger end callback                                 |
| `start`           | -                                           | Start typing animation                                        |
| `stop`            | -                                           | Pause typing                                                  |
| `resume`          | -                                           | Resume typing                                                 |
| `restart`         | -                                           | Restart typing animation, play current content from beginning |

**Usage example:**

```tsx
markdownRef.current?.start(); // Start animation
markdownRef.current?.stop(); // Pause animation
markdownRef.current?.resume(); // Resume animation
markdownRef.current?.restart(); // Restart animation
```

---

## 🔌 Plugin System

### Built-in Plugins

#### KaTeX Mathematical Formula Plugin

[DEMO](https://stackblitz.com/edit/vitejs-vite-iqbyta3j?file=index.html)

```tsx
import { katexPlugin } from 'ds-markdown/plugins';

// Enable mathematical formula support
<DsMarkdown plugins={[katexPlugin]}>Mathematical formula: $E = mc^2$</DsMarkdown>;
```

#### Mermaid Chart Plugin 🆕

**Install Mermaid plugin:**

```bash
npm install ds-markdown-mermaid-plugin
```

**Basic usage:**

```tsx
import { ConfigProvider, Markdown } from 'ds-markdown';
import mermaidPlugin from 'ds-markdown-mermaid-plugin';

function App() {
  const content = `
# Flowchart Example

\`\`\`mermaid
flowchart TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Process A]
    B -->|No| D[Process B]
    C --> E[End]
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

**Supported chart types:**

- 🔄 **Flowchart** - Display processes and decision paths
- 📋 **Sequence Diagram** - Display interaction timing between objects
- 📅 **Gantt Chart** - Project planning and timelines
- 🏗️ **Class Diagram** - Object-oriented design
- 🥧 **Pie Chart** - Data proportion display
- 🔀 **State Diagram** - State transition processes
- 📊 **Git Graph** - Code branch history
- 🗺️ **User Journey** - User experience processes

**Configure Mermaid:**

```tsx
import { ConfigProvider } from 'ds-markdown';

const mermaidConfig = {
  theme: 'default', // Themes: default, neutral, dark, forest
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

**Related links:**

- [ds-markdown-mermaid-plugin GitHub](https://github.com/onshinpei/ds-markdown-mermaid-plugin)
- [Mermaid Official Documentation](https://mermaid.js.org/)

### Custom Plugins

```tsx
import { createBuildInPlugin } from 'ds-markdown/plugins';

// Create custom plugin
const customPlugin = createBuildInPlugin({
  remarkPlugin: yourRemarkPlugin,
  rehypePlugin: yourRehypePlugin,
  id: Symbol('custom-plugin'),
  components: {
    // Custom component mapping 🆕
    CustomComponent: MyCustomComponent,
  },
});

// Use custom plugin
<DsMarkdown plugins={[katexPlugin, customPlugin]}>Content</DsMarkdown>;
```

---

## 🎨 UI Component System 🆕

ds-markdown provides rich UI components that can be used independently or in combination with markdown components.

### Core Components

```tsx
import {
  Button,
  IconButton,
  ToolTip,
  Segmented,
  CopyButton,
  DownloadButton
} from 'ds-markdown';

// Button component
<Button icon={<span>📄</span>} onClick={() => {}}>
  Click Button
</Button>

// Tooltip
<ToolTip title="Tooltip information">
  <IconButton icon={<span>📋</span>} onClick={() => {}} />
</ToolTip>

// Segmented controller
<Segmented
  Segmented={[
    { label: 'Chart', value: 'diagram' },
    { label: 'Code', value: 'code' }
  ]}
  value={value}
  onChange={setValue}
/>

// Code block operations
<CopyButton codeContent="console.log('Hello')" />
<DownloadButton codeContent="console.log('Hello')" language="javascript" />
```

### Style Customization

```css
:root {
  --ds-button-bg-color: #f5f5f5;
  --ds-button-hover-color: #e0e0e0;
  --ds-tooltip-bg-color: rgba(0, 0, 0, 0.8);
}
```

---

## Internationalization Configuration

```tsx
import { ConfigProvider } from 'ds-markdown';
import zhCN from 'ds-markdown/i18n/zh';
import enUS from 'ds-markdown/i18n/en';

// Chinese
<ConfigProvider locale={zhCN}>
  <DsMarkdown {...props} />
</ConfigProvider>

// English
<ConfigProvider locale={enUS}>
  <DsMarkdown {...props} />
</ConfigProvider>
```

---

## 💡 Practical Examples

### 📝 AI Streaming Conversation

[DEMO: 🔧 StackBlitz Experience](https://stackblitz.com/edit/vitejs-vite-2ri8kex3?file=src%2FApp.tsx)

```tsx
import { useRef } from 'react';
import { MarkdownCMD, MarkdownCMDRef } from 'ds-markdown';

function StreamingChat() {
  const markdownRef = useRef<MarkdownCMDRef>(null);

  // Simulate AI streaming response
  const simulateAIResponse = async () => {
    markdownRef.current?.clear();

    // Thinking phase
    markdownRef.current?.push('🤔 Analyzing your question...', 'thinking');
    await delay(1000);
    markdownRef.current?.push('\n\n✅ Analysis complete, starting answer', 'thinking');

    // Streaming answer
    const chunks = [
      '# React 19 Feature Analysis\n\n',
      '## 🚀 React Compiler\n',
      'The biggest highlight of React 19 is the introduction of **React Compiler**:\n\n',
      '- 🎯 **Automatic optimization**: No need for manual memo and useMemo\n',
      '- ⚡ **Performance boost**: Compile-time optimization, zero runtime overhead\n',
      '- 🔧 **Backward compatible**: Existing code needs no modification\n\n',
      'Hope this answer helps you! 🎉',
    ];

    for (const chunk of chunks) {
      await delay(100);
      markdownRef.current?.push(chunk, 'answer');
    }
  };

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <div className="chat-container">
      <button onClick={simulateAIResponse}>🤖 Ask about React 19 features</button>
      <MarkdownCMD ref={markdownRef} interval={10} timerType="requestAnimationFrame" />
    </div>
  );
}
```

## 🔧 Best Practices

### 1. Performance Optimization

```tsx
// ✅ Recommended configuration
<DsMarkdown
  timerType="requestAnimationFrame"
  interval={15} // 15-30ms for best experience
/>
```

### 2. Streaming Data Processing

```tsx
// ✅ Recommended: Imperative API
const ref = useRef<MarkdownCMDRef>(null);
useEffect(() => {
  ref.current?.push(newChunk, 'answer');
}, [newChunk]);
```

### 3. Mathematical Formula Optimization

```tsx
// ✅ Recommended: Load on demand
import { katexPlugin } from 'ds-markdown/plugins';
import 'ds-markdown/katex.css'; // Only import when needed

<DsMarkdown plugins={[katexPlugin]}>Mathematical formula content</DsMarkdown>;
```

### 4. Mermaid Chart Best Practices 🆕

```tsx
// ✅ Recommended: Install plugin separately
npm install ds-markdown-mermaid-plugin

// ✅ Recommended: Configure suitable theme
const mermaidConfig = {
  theme: 'default', // Choose based on application theme
  flowchart: { useMaxWidth: true },
};

<ConfigProvider mermaidConfig={mermaidConfig}>
  <DsMarkdown plugins={[mermaidPlugin]} />
</ConfigProvider>
```
