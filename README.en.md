# ds-markdown

> 🚀 High-performance React Markdown typing animation component, perfectly replicating DeepSeek chat interface effects

**[🇨🇳 中文](./README.md) | 🇺🇸 English**

A React component designed specifically for modern AI applications, providing smooth real-time typing animations and complete Markdown rendering capabilities.

[![npm version](https://img.shields.io/npm/v/ds-markdown)](https://www.npmjs.com/package/ds-markdown)
[![npm downloads](https://img.shields.io/npm/dm/ds-markdown.svg)](https://www.npmjs.com/package/ds-markdown)
[![bundle size](https://img.shields.io/bundlephobia/minzip/ds-markdown)](https://bundlephobia.com/package/ds-markdown)
[![React](https://img.shields.io/badge/React-16.8+-blue)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)

[📖 Live Demo](https://onshinpei.github.io/ds-markdown/)

[DEMO：🔧 StackBlitz Experience](https://stackblitz.com/edit/vitejs-vite-ddfw8avb?file=src%2FApp.tsx)

**If you want a pure react markdown typing component, you can use [react-markdown-typer](https://github.com/onshinpei/react-markdown-typer)**

---

## 📋 Table of Contents

- [✨ Core Features](#-core-features)
- [📦 Quick Installation](#-quick-installation)
- [🚀 5-Minute Quick Start](#-5-minute-quick-start)
  - [Basic Usage](#basic-usage)
  - [Disable Typing Animation](#disable-typing-animation)
  - [Mathematical Formula Support](#mathematical-formula-support)
  - [AI Conversation Scenario](#ai-conversation-scenario)
  - [🎯 Advanced Callback Control](#-advanced-callback-control)
  - [🔄 Restart Animation Demo](#-restart-animation-demo)
  - [▶️ Manual Start Animation Demo](#️-manual-start-animation-demo)
- [📚 Complete API Documentation](#-complete-api-documentation)
- [🧮 Mathematical Formula Usage Guide](#-mathematical-formula-usage-guide)
- [🔌 Plugin System](#-plugin-system)
- [🎛️ Timer Mode Details](#️-timer-mode-details)
- [💡 Practical Examples](#-practical-examples)
- [🔧 Best Practices](#-best-practices)
- [ConfigProvider Internationalization (i18n)](<#ConfigProvider-Internationalization-(i18n)>)

---

## ❓ Why use ds-markdown?

- **Ultimate AI Chat Experience**  
  Faithfully recreates the typing animation and streaming response of leading AI chat interfaces (like DeepSeek), delivering a truly immersive "AI is thinking/answering" experience.

- **Perfect for Streaming Backend Data**  
  Many AI/LLM backends (OpenAI, DeepSeek, etc.) send data chunks containing multiple characters at once.  
  **ds-markdown automatically splits each chunk into single characters and animates them one by one, ensuring smooth typing even if the backend sends several characters at a time.**

- **Full Markdown & Math Formula Support**  
  Built-in KaTeX, supports all major Markdown syntax and math formulas—ideal for technical Q&A, education, and knowledge bases.

- **Excellent Developer Experience**  
  Rich imperative API, supports streaming data, async callbacks, and plugin extensions for flexible animation and content control.

- **Lightweight & High Performance**  
  Small bundle size, fast, mobile and desktop ready. The only core dependency is [react-markdown](https://github.com/remarkjs/react-markdown) (a widely used, mature Markdown renderer). No other heavy dependencies—works out of the box.

- **Multi-theme & Plugin Architecture**  
  Light/dark theme switching, remark/rehype plugin compatibility, and advanced extensibility.

- **Wide Range of Use Cases**
  - AI chatbots/assistants
  - Real-time Q&A/knowledge bases
  - Education/math/programming content
  - Product demos, interactive docs
  - Any scenario needing "typewriter" animation and streaming Markdown rendering

---

## ✨ Core Features

### 🤖 **AI Conversation Scenarios**

- 1:1 recreation of [DeepSeek website](https://chat.deepseek.com/) chat response effects
- Support for both thinking process (`thinking`) and answer content (`answer`) modes
- Perfect adaptation to streaming data with zero-delay response to user input

### 📊 **Content Display Scenarios**

- Complete Markdown syntax support, including code highlighting, tables, lists, etc.
- Mathematical formula rendering (KaTeX), supporting `$...$` and `\[...\]` syntax
- Light/dark theme support, adapting to different product styles
- Plugin architecture supporting remark/rehype plugin extensions

### 🔧 **Developer Experience**

- Support for typing interruption `stop` and resume `resume`
- Support for disabling and enabling typing

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

### 🎯 Advanced Callback Control

```tsx
import { useRef, useState } from 'react';
import { MarkdownCMD, MarkdownCMDRef } from 'ds-markdown';

function AdvancedCallbackDemo() {
  const markdownRef = useRef<MarkdownCMDRef>(null);
  const [typingStats, setTypingStats] = useState({ progress: 0, currentChar: '', totalChars: 0 });

  const handleBeforeTypedChar = async (data) => {
    // Perform async operations before character typing
    console.log('About to type:', data.currentChar);

    // Can perform network requests, data validation, etc.
    if (data.currentChar === '!') {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay
    }
  };

  const handleTypedChar = (data) => {
    // Update typing statistics
    setTypingStats({
      progress: Math.round(data.percent),
      currentChar: data.currentChar,
      totalChars: data.currentIndex + 1,
    });

    // Can add sound effects, animations, etc.
    if (data.currentChar === '.') {
      // Play period sound effect
      console.log('Play period sound effect');
    }
  };

  const handleStart = (data) => {
    console.log('Start typing:', data.currentChar);
  };

  const handleEnd = (data) => {
    console.log('Typing complete:', data.str);
  };

  const startDemo = () => {
    markdownRef.current?.clear();
    markdownRef.current?.push(
      '# Advanced Callback Demo\n\n' +
        'This example shows how to use `onBeforeTypedChar` and `onTypedChar` callbacks:\n\n' +
        '- 🎯 **Pre-typing callback**: Can perform async operations before character display\n' +
        '- 📊 **Post-typing callback**: Can update progress in real-time and add effects\n' +
        '- ⚡ **Performance optimization**: Supports async operations without affecting typing smoothness\n\n' +
        'Current progress: ' +
        typingStats.progress +
        '%\n' +
        'Characters typed: ' +
        typingStats.totalChars +
        '\n\n' +
        'This is a very powerful feature!',
      'answer',
    );
  };

  return (
    <div>
      <button onClick={startDemo}>🚀 Start Advanced Demo</button>

      <div style={{ margin: '10px 0', padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
        <strong>Typing Stats:</strong> Progress {typingStats.progress}% | Current char: "{typingStats.currentChar}" | Total chars: {typingStats.totalChars}
      </div>

      <MarkdownCMD ref={markdownRef} interval={30} onBeforeTypedChar={handleBeforeTypedChar} onTypedChar={handleTypedChar} onStart={handleStart} onEnd={handleEnd} />
    </div>
  );
}
```

### 🔄 Restart Animation Demo

```tsx
import { useRef, useState } from 'react';
import { MarkdownCMD, MarkdownCMDRef } from 'ds-markdown';

function RestartDemo() {
  const markdownRef = useRef<MarkdownCMDRef>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const startContent = () => {
    markdownRef.current?.clear();
    markdownRef.current?.push(
      '# Restart Animation Demo\n\n' +
        'This example shows how to use the `restart()` method:\n\n' +
        '- 🔄 **Restart**: Play current content from the beginning\n' +
        '- ⏸️ **Pause/Resume**: Can pause and resume at any time\n' +
        '- 🎯 **Precise Control**: Complete control over animation playback state\n\n' +
        'Current state: ' +
        (isPlaying ? 'Playing' : 'Paused') +
        '\n\n' +
        'This is a very practical feature!',
      'answer',
    );
    setIsPlaying(true);
  };

  const handleStart = () => {
    if (hasStarted) {
      // If already started, restart
      markdownRef.current?.restart();
    } else {
      // First time start
      markdownRef.current?.start();
      setHasStarted(true);
    }
    setIsPlaying(true);
  };

  const handleStop = () => {
    markdownRef.current?.stop();
    setIsPlaying(false);
  };

  const handleResume = () => {
    markdownRef.current?.resume();
    setIsPlaying(true);
  };

  const handleRestart = () => {
    markdownRef.current?.restart();
    setIsPlaying(true);
  };

  const handleEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div>
      <div style={{ marginBottom: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={startContent}>🚀 Start Content</button>
        <button onClick={handleStart} disabled={isPlaying}>
          {hasStarted ? '🔄 Restart' : '▶️ Start'}
        </button>
        <button onClick={handleStop} disabled={!isPlaying}>
          ⏸️ Pause
        </button>
        <button onClick={handleResume} disabled={isPlaying}>
          ▶️ Resume
        </button>
        <button onClick={handleRestart}>🔄 Restart</button>
      </div>

      <div style={{ margin: '10px 0', padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
        <strong>Animation State:</strong> {isPlaying ? '🟢 Playing' : '🔴 Paused'}
      </div>

      <MarkdownCMD ref={markdownRef} interval={25} onEnd={handleEnd} />
    </div>
  );
}
```

### ▶️ Manual Start Animation Demo

```tsx
import { useRef, useState } from 'react';
import { MarkdownCMD, MarkdownCMDRef } from 'ds-markdown';

function StartDemo() {
  const markdownRef = useRef<MarkdownCMDRef>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const loadContent = () => {
    markdownRef.current?.clear();
    markdownRef.current?.push(
      '# Manual Start Animation Demo\n\n' +
        'This example shows how to use the `start()` method:\n\n' +
        '- 🎯 **Manual Control**: When `autoStartTyping=false`, need to manually call `start()`\n' +
        '- ⏱️ **Delayed Start**: Can start animation after user interaction\n' +
        '- 🎮 **Gamification**: Suitable for scenarios requiring user initiative\n\n' +
        'Click the "Start Animation" button to manually trigger the typing effect!',
      'answer',
    );
    setIsPlaying(false);
  };

  const handleStart = () => {
    if (hasStarted) {
      // If already started, restart
      markdownRef.current?.restart();
    } else {
      // First time start
      markdownRef.current?.start();
      setHasStarted(true);
    }
    setIsPlaying(true);
  };

  const handleEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div>
      <div style={{ marginBottom: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={loadContent}>📝 Load Content</button>
        <button onClick={handleStart} disabled={isPlaying}>
          {hasStarted ? '🔄 Restart' : '▶️ Start Animation'}
        </button>
      </div>

      <div style={{ margin: '10px 0', padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
        <strong>State:</strong> {isPlaying ? '🟢 Animation Playing' : '🔴 Waiting to Start'}
      </div>

      <MarkdownCMD ref={markdownRef} interval={30} autoStartTyping={false} onEnd={handleEnd} />
    </div>
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
| `timerType`         | `'setTimeout'` \| `'requestAnimationFrame'` | Timer type                                                                         | Current default is `setTimeout`, will change to `requestAnimationFrame` later |
| `answerType`        | `'thinking'` \| `'answer'`                  | Content type (affects styling)                                                     | `'answer'`                                                                    |
| `theme`             | `'light'` \| `'dark'`                       | Theme type                                                                         | `'light'`                                                                     |
| `plugins`           | `IMarkdownPlugin[]`                         | Plugin configuration                                                               | `[]`                                                                          |
| `math`              | [IMarkdownMath](#IMarkdownMath)             | Mathematical formula config                                                        | `{ splitSymbol: 'dollar' }`                                                   |
| `onEnd`             | `(data: EndData) => void`                   | Typing completion callback                                                         | -                                                                             |
| `onStart`           | `(data: StartData) => void`                 | Typing start callback                                                              | -                                                                             |
| `onBeforeTypedChar` | `(data: IBeforeTypedChar) => Promise<void>` | Character typing pre-callback, supports async operations, blocks subsequent typing | -                                                                             |
| `onTypedChar`       | `(data: ITypedChar) => void`                | Character typing post-callback                                                     | -                                                                             |
| `disableTyping`     | `boolean`                                   | Disable typing animation                                                           | `false`                                                                       |
| `autoStartTyping`   | `boolean`                                   | Whether to auto-start typing animation, set to false for manual trigger            | `true`                                                                        |

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

#### IMarkdownPlugin

| Property       | Type                      | Description      | Default |
| -------------- | ------------------------- | ---------------- | ------- |
| `remarkPlugin` | `unknown`                 | remark plugin    | -       |
| `rehypePlugin` | `unknown`                 | rehype plugin    | -       |
| `type`         | `'buildIn'` \| `'custom'` | Plugin type      | -       |
| `id`           | `any`                     | Plugin unique ID | -       |

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

## 🧮 Mathematical Formula Usage Guide

[DEMO1: Pythagorean Theorem](https://stackblitz.com/edit/vitejs-vite-z94syu8j?file=src%2FApp.tsx)

[DEMO2: Problem Solving](https://stackblitz.com/edit/vitejs-vite-xk9lxagc?file=README.md)

### Basic Syntax

```tsx
import { katexPlugin } from 'ds-markdown/plugins';

// 1. Enable mathematical formula support
<DsMarkdown plugins={[katexPlugin]}>
  # Mathematical Formula Example

  // Inline formula
  This is an inline formula: $E = mc^2$

  // Block formula
  $$\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$$
</DsMarkdown>
```

### Delimiter Selection

```tsx
// Using dollar sign delimiters (default)
<DsMarkdown
  plugins={[katexPlugin]}
  math={{ splitSymbol: 'dollar' }}
>
  Inline: $a + b = c$
  Block: $$\sum_{i=1}^{n} x_i = x_1 + x_2 + \cdots + x_n$$
</DsMarkdown>

// Using bracket delimiters
<DsMarkdown
  plugins={[katexPlugin]}
  math={{ splitSymbol: 'bracket' }}
>
  Inline: \(a + b = c\)
  Block: \[\sum_{i=1}^{n} x_i = x_1 + x_2 + \cdots + x_n\]
</DsMarkdown>
```

### Streaming Mathematical Formulas

```tsx
// Perfect support for mathematical formulas in streaming output
const mathContent = [
  'Pythagorean Theorem:',
  '$a^2 + b^2 = c^2$',
  '\n\n',
  'Where:',
  '- $a$ and $b$ are the legs\n',
  '- $c$ is the hypotenuse\n\n',
  'For the classic "3-4-5" triangle:\n',
  '$c = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$\n\n',
  'This theorem has wide applications in geometry!',
];

mathContent.forEach((chunk) => {
  markdownRef.current?.push(chunk, 'answer');
});
```

### Style Customization

```css
/* Mathematical formula style customization */
.katex {
  font-size: 1.1em;
}

.katex-display {
  margin: 1em 0;
  text-align: center;
}

/* Dark theme adaptation */
[data-theme='dark'] .katex {
  color: #e1e1e1;
}
```

---

## 🔌 Plugin System

### Built-in Plugins

#### KaTeX Mathematical Formula Plugin

```tsx
import { katexPlugin } from 'ds-markdown/plugins';

// Enable mathematical formula support
<DsMarkdown plugins={[katexPlugin]}>Mathematical formula: $E = mc^2$</DsMarkdown>;
```

### Custom Plugins

```tsx
import { createBuildInPlugin } from 'ds-markdown/plugins';

// Create custom plugin
const customPlugin = createBuildInPlugin({
  remarkPlugin: yourRemarkPlugin,
  rehypePlugin: yourRehypePlugin,
  id: Symbol('custom-plugin'),
});

// Use custom plugin
<DsMarkdown plugins={[katexPlugin, customPlugin]}>Content</DsMarkdown>;
```

---

## 🎛️ Timer Mode Details

### `requestAnimationFrame` Mode 🌟 (Recommended)

```typescript
// 🎯 Features
- Time-driven: Calculates character count based on actual elapsed time
- Batch processing: Can process multiple characters in a single frame
- Frame-synchronized: Syncs with browser 60fps refresh rate
- High-frequency optimized: Perfect support for interval < 16ms high-speed typing

// 🎯 Use Cases
- Default choice for modern web applications
- Pursuit of smooth animation effects
- High-frequency typing (interval > 0 works)
- AI real-time conversation scenarios
```

### `setTimeout` Mode 📟 (Compatible)

```typescript
// 🎯 Features
- Single character: Precisely processes one character at a time
- Fixed interval: Strictly executes at set time intervals
- Rhythmic: Classic typewriter rhythm feel
- Precise control: Suitable for specific timing requirements

// 🎯 Use Cases
- Need precise timing control
- Creating retro typewriter effects
- Scenarios with high compatibility requirements
```

### 📊 Performance Comparison

| Feature                  | requestAnimationFrame               | setTimeout              |
| ------------------------ | ----------------------------------- | ----------------------- |
| **Character Processing** | Multiple characters per frame       | One character at a time |
| **High Frequency**       | ✅ Excellent (5ms → 3 chars/frame)  | ❌ May lag              |
| **Low Frequency**        | ✅ Normal (100ms → 1 char/6 frames) | ✅ Precise              |
| **Visual Effect**        | 🎬 Smooth animation feel            | ⚡ Precise rhythm feel  |
| **Performance Overhead** | 🟢 Low (frame-synced)               | 🟡 Medium (timer)       |

High frequency recommended `requestAnimationFrame`, low frequency recommended `setTimeout`

---

## 💡 Practical Examples

### 📝 AI Streaming Conversation

[DEMO: 🔧 StackBlitz Experience](https://stackblitz.com/edit/vitejs-vite-2ri8kex3?file=src%2FApp.tsx)

````tsx
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
      '## 📝 Actions Simplify Forms\n',
      'The new Actions API makes form handling simpler:\n\n',
      '```tsx\n',
      'function ContactForm({ action }) {\n',
      '  const [state, formAction] = useActionState(action, null);\n',
      '  return (\n',
      '    <form action={formAction}>\n',
      '      <input name="email" type="email" />\n',
      '      <button>Submit</button>\n',
      '    </form>\n',
      '  );\n',
      '}\n',
      '```\n\n',
      'Hope this answer helps you! 🎉',
    ];

    for (const chunk of chunks) {
      await delay(100);
      markdownRef.current?.push(chunk, 'answer');
    }
  };

  return (
    <div className="chat-container">
      <button onClick={simulateAIResponse}>🤖 Ask about React 19 features</button>

      <MarkdownCMD ref={markdownRef} interval={10} timerType="requestAnimationFrame" onEnd={(data) => console.log('Section complete:', data)} />
    </div>
  );
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
````

### 🧮 Mathematical Formula Streaming Rendering

```tsx
import { katexPlugin } from 'ds-markdown/plugins';

function MathStreamingDemo() {
  const markdownRef = useRef<MarkdownCMDRef>(null);

  const simulateMathResponse = async () => {
    markdownRef.current?.clear();

    const mathChunks = [
      '# Pythagorean Theorem Explained\n\n',
      'In a right triangle, the square of the hypotenuse equals the sum of squares of the two legs:\n\n',
      '$a^2 + b^2 = c^2$\n\n',
      'Where:\n',
      '- $a$ and $b$ are the legs\n',
      '- $c$ is the hypotenuse\n\n',
      'For the classic "3-4-5" triangle:\n',
      '$c = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$\n\n',
      'This theorem has wide applications in geometry!',
    ];

    for (const chunk of mathChunks) {
      await delay(150);
      markdownRef.current?.push(chunk, 'answer');
    }
  };

  return (
    <div>
      <button onClick={simulateMathResponse}>📐 Explain Pythagorean Theorem</button>

      <MarkdownCMD ref={markdownRef} interval={20} timerType="requestAnimationFrame" plugins={[katexPlugin]} math={{ splitSymbol: 'dollar' }} />
    </div>
  );
}
```

### 🎯 Advanced Callback Control

```tsx
import { useRef, useState } from 'react';
import { MarkdownCMD, MarkdownCMDRef } from 'ds-markdown';

function AdvancedCallbackDemo() {
  const markdownRef = useRef<MarkdownCMDRef>(null);
  const [typingStats, setTypingStats] = useState({ progress: 0, currentChar: '', totalChars: 0 });

  const handleBeforeTypedChar = async (data) => {
    // Perform async operations before character typing
    console.log('About to type:', data.currentChar);

    // Can perform network requests, data validation, etc.
    if (data.currentChar === '!') {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay
    }
  };

  const handleTypedChar = (data) => {
    // Update typing statistics
    setTypingStats({
      progress: Math.round(data.percent),
      currentChar: data.currentChar,
      totalChars: data.currentIndex + 1,
    });

    // Can add sound effects, animations, etc.
    if (data.currentChar === '.') {
      // Play period sound effect
      console.log('Play period sound effect');
    }
  };

  const handleStart = (data) => {
    console.log('Start typing:', data.currentChar);
  };

  const handleEnd = (data) => {
    console.log('Typing complete:', data.str);
  };

  const startDemo = () => {
    markdownRef.current?.clear();
    markdownRef.current?.push(
      '# Advanced Callback Demo\n\n' +
        'This example shows how to use `onBeforeTypedChar` and `onTypedChar` callbacks:\n\n' +
        '- 🎯 **Pre-typing callback**: Can perform async operations before character display\n' +
        '- 📊 **Post-typing callback**: Can update progress in real-time and add effects\n' +
        '- ⚡ **Performance optimization**: Supports async operations without affecting typing smoothness\n\n' +
        'Current progress: ' +
        typingStats.progress +
        '%\n' +
        'Characters typed: ' +
        typingStats.totalChars +
        '\n\n' +
        'This is a very powerful feature!',
      'answer',
    );
  };

  return (
    <div>
      <button onClick={startDemo}>🚀 Start Advanced Demo</button>

      <div style={{ margin: '10px 0', padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
        <strong>Typing Stats:</strong> Progress {typingStats.progress}% | Current char: "{typingStats.currentChar}" | Total chars: {typingStats.totalChars}
      </div>

      <MarkdownCMD ref={markdownRef} interval={30} onBeforeTypedChar={handleBeforeTypedChar} onTypedChar={handleTypedChar} onStart={handleStart} onEnd={handleEnd} />
    </div>
  );
}
```

### 🔄 Restart Animation Demo

```tsx
import { useRef, useState } from 'react';
import { MarkdownCMD, MarkdownCMDRef } from 'ds-markdown';

function RestartDemo() {
  const markdownRef = useRef<MarkdownCMDRef>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const startContent = () => {
    markdownRef.current?.clear();
    markdownRef.current?.push(
      '# Restart Animation Demo\n\n' +
        'This example shows how to use the `restart()` method:\n\n' +
        '- 🔄 **Restart**: Play current content from the beginning\n' +
        '- ⏸️ **Pause/Resume**: Can pause and resume at any time\n' +
        '- 🎯 **Precise Control**: Complete control over animation playback state\n\n' +
        'Current state: ' +
        (isPlaying ? 'Playing' : 'Paused') +
        '\n\n' +
        'This is a very practical feature!',
      'answer',
    );
    setIsPlaying(true);
  };

  const handleStart = () => {
    if (hasStarted) {
      // If already started, restart
      markdownRef.current?.restart();
    } else {
      // First time start
      markdownRef.current?.start();
      setHasStarted(true);
    }
    setIsPlaying(true);
  };

  const handleStop = () => {
    markdownRef.current?.stop();
    setIsPlaying(false);
  };

  const handleResume = () => {
    markdownRef.current?.resume();
    setIsPlaying(true);
  };

  const handleRestart = () => {
    markdownRef.current?.restart();
    setIsPlaying(true);
  };

  const handleEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div>
      <div style={{ marginBottom: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={startContent}>🚀 Start Content</button>
        <button onClick={handleStart} disabled={isPlaying}>
          {hasStarted ? '🔄 Restart' : '▶️ Start'}
        </button>
        <button onClick={handleStop} disabled={!isPlaying}>
          ⏸️ Pause
        </button>
        <button onClick={handleResume} disabled={isPlaying}>
          ▶️ Resume
        </button>
        <button onClick={handleRestart}>🔄 Restart</button>
      </div>

      <div style={{ margin: '10px 0', padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
        <strong>Animation State:</strong> {isPlaying ? '🟢 Playing' : '🔴 Paused'}
      </div>

      <MarkdownCMD ref={markdownRef} interval={25} onEnd={handleEnd} />
    </div>
  );
}
```

### ▶️ Manual Start Animation Demo

```tsx
import { useRef, useState } from 'react';
import { MarkdownCMD, MarkdownCMDRef } from 'ds-markdown';

function StartDemo() {
  const markdownRef = useRef<MarkdownCMDRef>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const loadContent = () => {
    markdownRef.current?.clear();
    markdownRef.current?.push(
      '# Manual Start Animation Demo\n\n' +
        'This example shows how to use the `start()` method:\n\n' +
        '- 🎯 **Manual Control**: When `autoStartTyping=false`, need to manually call `start()`\n' +
        '- ⏱️ **Delayed Start**: Can start animation after user interaction\n' +
        '- 🎮 **Gamification**: Suitable for scenarios requiring user initiative\n\n' +
        'Click the "Start Animation" button to manually trigger the typing effect!',
      'answer',
    );
    setIsPlaying(false);
  };

  const handleStart = () => {
    if (hasStarted) {
      // If already started, restart
      markdownRef.current?.restart();
    } else {
      // First time start
      markdownRef.current?.start();
      setHasStarted(true);
    }
    setIsPlaying(true);
  };

  const handleEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div>
      <div style={{ marginBottom: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={loadContent}>📝 Load Content</button>
        <button onClick={handleStart} disabled={isPlaying}>
          {hasStarted ? '🔄 Restart' : '▶️ Start Animation'}
        </button>
      </div>

      <div style={{ margin: '10px 0', padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
        <strong>State:</strong> {isPlaying ? '🟢 Animation Playing' : '🔴 Waiting to Start'}
      </div>

      <MarkdownCMD ref={markdownRef} interval={30} autoStartTyping={false} onEnd={handleEnd} />
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

// ❌ Avoid too small intervals
<DsMarkdown interval={1} /> // May cause performance issues
```

### 2. Streaming Data Processing

```tsx
// ✅ Recommended: Imperative API
const ref = useRef<MarkdownCMDRef>(null);
useEffect(() => {
  ref.current?.push(newChunk, 'answer');
}, [newChunk]);

// ❌ Avoid: Frequent children updates
const [content, setContent] = useState('');
// Each update re-parses the entire content
```

### 3. Mathematical Formula Optimization

```tsx
// ✅ Recommended: Load math formula styles on demand
import 'ds-markdown/style.css';
import 'ds-markdown/katex.css'; // Only import when needed

// ✅ Recommended: Use delimiters appropriately
// For simple formulas, use $...$ for simplicity
// For complex formulas, use $$...$$ for clarity

// ✅ Recommended: Plugin configuration
import { katexPlugin } from 'ds-markdown/plugins';
<DsMarkdown plugins={[katexPlugin]}>Mathematical formula content</DsMarkdown>;
```

### 4. Type Safety

```tsx
import { MarkdownCMDRef } from 'ds-markdown';

const ref = useRef<MarkdownCMDRef>(null);
// Complete TypeScript type hints
```

## ConfigProvider Internationalization (i18n)

ConfigProvider is a component provided by ds-markdown for managing internationalized text in your application.

### Basic Usage

```tsx
import React from 'react';
import { ConfigProvider } from 'ds-markdown';
import zhCN from 'ds-markdown/i18n/zh';

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <YourApp />
    </ConfigProvider>
  );
};
```

### Available Locales

#### Chinese (zhCN)

```tsx
import zhCN from 'ds-markdown/i18n/zh';
```

#### English (enUS)

```tsx
import enUS from 'ds-markdown/i18n/en';
```

### Using Locale in Components

Use the `useLocale` hook to get the current locale:

```tsx
import React from 'react';
import { useLocale } from 'ds-markdown';

const MyComponent: React.FC = () => {
  const locale = useLocale();

  return (
    <div>
      <button>{locale.codeBlock.copy}</button>
      <span>{locale.codeBlock.copied}</span>
      <button>{locale.codeBlock.download}</button>
    </div>
  );
};
```

### Locale Structure

Currently supported locale fields:

```typescript
interface Locale {
  codeBlock: {
    copy: string;
    copied: string;
    download: string;
  };
  [key: string]: string;
}
```

### Full Example

```tsx
import React from 'react';
import { ConfigProvider, useLocale } from 'ds-markdown';
import zhCN from 'ds-markdown/i18n/zh';

const ExampleComponent: React.FC = () => {
  const locale = useLocale();

  return (
    <div>
      <h2>i18n Example</h2>
      <p>Copy button: {locale.codeBlock.copy}</p>
      <p>Copied tip: {locale.codeBlock.copied}</p>
      <p>Download button: {locale.codeBlock.download}</p>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <ExampleComponent />
    </ConfigProvider>
  );
};

export default App;
```

### Notes

1. `ConfigProvider` must wrap components that use `useLocale`.
2. The locale object is memoized to avoid unnecessary re-renders.
3. You can extend the locale object with custom fields.
4. If `ConfigProvider` is not provided, the default locale is Chinese.
