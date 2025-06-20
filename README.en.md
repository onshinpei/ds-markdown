# ds-markdown

> 🚀 High-performance React Markdown typing animation component, perfectly replicating DeepSeek chat interface effects

**[🇨🇳 中文](./README.md) | 🇺🇸 English | [🇯🇵 日本語](./README.ja.md) | [🇰🇷 한국어](./README.ko.md)**

A React component designed specifically for modern AI applications, providing smooth real-time typing animations and complete Markdown rendering capabilities.

[![npm version](https://img.shields.io/npm/v/ds-markdown)](https://www.npmjs.com/package/ds-markdown)
[![npm downloads](https://img.shields.io/npm/dm/ds-markdown.svg)](https://www.npmjs.com/package/ds-markdown)
[![bundle size](https://img.shields.io/bundlephobia/minzip/ds-markdown)](https://bundlephobia.com/package/ds-markdown)
[![React](https://img.shields.io/badge/React-16.8+-blue)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)

[📖 Live Demo](https://onshinpei.github.io/ds-markdown/)

[DEMO：🔧 StackBlitz Experience](https://stackblitz.com/edit/vitejs-vite-ddfw8avb?file=src%2FApp.tsx)

---

## ✨ Core Features

### 🎯 **Perfect Replication**

- 1:1 recreation of [DeepSeek website](https://chat.deepseek.com/) chat response effects
- Support for both thinking process (`thinking`) and answer content (`answer`) modes
- Native Markdown syntax support, including code highlighting, tables, lists, etc.
- Light/dark theme support, perfectly adapting to different scenarios

### ⚡ **Ultimate Performance**

- Smart batch processing, zero lag rendering for large documents
- Dual timer modes: `requestAnimationFrame` + `setTimeout`
- Built-in streaming syntax buffering, avoiding incomplete Markdown rendering errors

### 🎬 **Smooth Animation**

- High-frequency typing support (`requestAnimationFrame` mode supports typing intervals as low as `0ms`)
- Frame-synchronized rendering, perfectly matching browser 60fps
- Smart character batch processing for more natural visual effects

### 🔧 **Flexible and Easy to Use**

- **Declarative API**: Suitable for simple scenarios, React-style
- **Imperative API**: Suitable for streaming data, better performance
- **Native TypeScript support**: Complete type hints

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

```html
<!-- Import styles -->
<link rel="stylesheet" href="https://esm.sh/ds-markdown/dist/style.css" />

<!-- Import component -->
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

This is a **high-performance** typing animation component!

## Features
- ⚡ Zero-delay streaming
- 🎬 Smooth typing animation
- 🎯 Perfect syntax support
  `;

  const root = createRoot(document.getElementById('root'));
  root.render(<DsMarkdown interval={20}>{markdown}</DsMarkdown>);
</script>
```

## 🚀 5-Minute Quick Start

### Basic Usage

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

---

## 📚 Complete API Documentation

### Declarative API (Recommended for Beginners)

| Property      | Type                                        | Description                        | Default                                                                       |
| ------------- | ------------------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------- |
| `interval`    | `number`                                    | Typing interval (milliseconds)     | `30`                                                                          |
| `timerType`   | `'setTimeout'` \| `'requestAnimationFrame'` | Timer type                         | Current default is `setTimeout`, will change to `requestAnimationFrame` later |
| `answerType`  | `'thinking'` \| `'answer'`                  | Content type (affects style theme) | `'answer'`                                                                    |
| `theme`       | `'light'` \| `'dark'`                       | Theme type                         | `'light'`                                                                     |
| `onEnd`       | `(data: EndData) => void`                   | Typing completion callback         | -                                                                             |
| `onStart`     | `(data: StartData) => void`                 | Typing start callback              | -                                                                             |
| `onTypedChar` | `(data: CharData) => void`                  | Per-character typing callback      | -                                                                             |

### Imperative API (Recommended for Streaming Scenarios)

```typescript
import { MarkdownCMD, MarkdownCMDRef } from 'ds-markdown';

interface MarkdownCMDRef {
  push: (content: string, answerType: AnswerType) => void;
  clear: () => void;
  triggerWholeEnd: () => void;
}
```

| Method            | Parameters                                  | Description                   |
| ----------------- | ------------------------------------------- | ----------------------------- |
| `push`            | `(content: string, answerType: AnswerType)` | Add content and start typing  |
| `clear`           | -                                           | Clear all content and state   |
| `triggerWholeEnd` | -                                           | Manually trigger end callback |
| `stop`            | -                                           | Pause typing animation        |
| `resume`          | -                                           | Resume typing animation       |

**Usage Example:**

```tsx
markdownRef.current?.stop(); // Pause animation
markdownRef.current?.resume(); // Resume animation
```

---

## 🎛️ Timer Mode Detailed Explanation

### `requestAnimationFrame` Mode 🌟 (Recommended)

```typescript
// 🎯 Features
- Time-driven: Calculate character count based on actual elapsed time
- Batch processing: Can process multiple characters within a single frame
- Frame-synchronized: Synchronized with browser 60fps refresh rate
- High-frequency optimized: Perfect support for interval < 16ms high-speed typing

// 🎯 Use Cases
- Default choice for modern web applications
- Pursuing smooth animation effects
- High-frequency typing (interval > 0 is sufficient)
- AI real-time conversation scenarios
```

### `setTimeout` Mode 📟 (Compatible)

```typescript
// 🎯 Features
- Single character: Precisely processes one character at a time
- Fixed interval: Executes strictly according to set time
- Rhythmic feel: Classic typewriter rhythm
- Precise control: Suitable for specific timing requirements

// 🎯 Use Cases
- Need precise time control
- Creating retro typewriter effects
- Scenarios with high compatibility requirements
```

### 📊 Performance Comparison

| Feature                     | requestAnimationFrame                     | setTimeout                      |
| --------------------------- | ----------------------------------------- | ------------------------------- |
| **Character Processing**    | Can process multiple characters per frame | Process one character at a time |
| **High-frequency Interval** | ✅ Excellent (5ms → 3 chars per frame)    | ❌ May lag                      |
| **Low-frequency Interval**  | ✅ Normal (100ms → 1 char after 6 frames) | ✅ Precise                      |
| **Visual Effect**           | 🎬 Smooth animation feel                  | ⚡ Precise rhythmic feel        |
| **Performance Overhead**    | 🟢 Low (frame-synchronized)               | 🟡 Medium (timer)               |

High-frequency recommends `requestAnimationFrame`, low-frequency recommends `setTimeout`

---

## 💡 Practical Examples

### 📝 AI Streaming Conversation

[DEMO: 🔧 StackBlitz 体验](https://stackblitz.com/edit/vitejs-vite-2ri8kex3?file=src%2FApp.tsx)

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
      '# React 19 New Features Analysis\n\n',
      '## 🚀 React Compiler\n',
      'The biggest highlight of React 19 is the introduction of **React Compiler**:\n\n',
      '- 🎯 **Automatic Optimization**: No need for manual memo and useMemo\n',
      '- ⚡ **Performance Boost**: Compile-time optimization, zero runtime overhead\n',
      '- 🔧 **Backward Compatible**: Existing code needs no modification\n\n',
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
      <button onClick={simulateAIResponse}>🤖 Ask About React 19 Features</button>

      <MarkdownCMD ref={markdownRef} interval={10} timerType="requestAnimationFrame" onEnd={(data) => console.log('Paragraph completed:', data)} />
    </div>
  );
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
````

### 🔄 Streaming Markdown Syntax Processing

**Core Issue**: During streaming output, incomplete Markdown syntax can cause rendering errors

```tsx
// 🚨 Problem Scenario
push('#'); // "# "
push(' '); // "# "
push('Title'); // "# Title"
push('\n'); // "# Title\n"
push('1'); // "# Title\n1"     ← This will be misinterpreted as paragraph
push('.'); // "# Title\n1."    ← Forms correct list
push(' Item'); // "# Title\n1. Item"
```

**✅ Smart Solution**: Built-in synchronous buffering mechanism in component

```tsx
// Component intelligently handles syntax boundaries
const handleStreamingMarkdown = () => {
  const chunks = ['#', ' ', 'Using', 'Skills', '\n', '1', '.', ' ', 'Skill1', '\n', '2', '.', ' Skill2'];

  chunks.forEach((chunk) => {
    markdownRef.current?.push(chunk, 'answer');
    // No delay needed, component buffers intelligently internally
  });
};

// 🧠 Smart Processing Flow:
// 1. Real-time detection of "# Using Skills\n1" incomplete syntax
// 2. Smart buffering, waiting for more characters
// 3. Process immediately after receiving "." to form "1."
// 4. Zero delay, pure synchronous processing
```

**Supported Syntax Detection**:

````typescript
// ✅ Complete syntax (process immediately)
'## Title'; // Complete title
'1. List item'; // Complete list item
'- Item'; // Complete unordered list
'> Quote content'; // Complete quote
'```javascript'; // Code block start
'```'; // Code block end
'Content ending with newline\n'; // Newline boundary

// 🔄 Incomplete syntax (smart buffering)
'##'; // Only title symbols
'1'; // Only number
'```java'; // Possible code block start
````

---

## 🔧 Best Practices

### 1. Performance Optimization

```tsx
// ✅ Recommended configuration
<DsMarkdown
  timerType="requestAnimationFrame"
  interval={15} // 15-30ms for optimal experience
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
// Each update will re-parse the entire content
```

### 3. Type Safety

```tsx
import { MarkdownCMDRef } from 'ds-markdown';

const ref = useRef<MarkdownCMDRef>(null);
// Complete TypeScript type hints
```

### 4. Style Customization

```css
/* Thinking area styles */
.ds-markdown-thinking {
  background: rgba(255, 193, 7, 0.1);
  border-left: 3px solid #ffc107;
  padding: 12px;
  border-radius: 6px;
  margin: 8px 0;
}

/* Answer area styles */
.ds-markdown-answer {
  color: #333;
  line-height: 1.6;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* Code block styles */
.ds-markdown pre {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
}

/* Table styles */
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

## 🌐 Compatibility

| Environment    | Version Requirement                 | Description               |
| -------------- | ----------------------------------- | ------------------------- |
| **React**      | 16.8.0+                             | Requires Hooks support    |
| **TypeScript** | 4.0+                                | Optional, but recommended |
| **Browser**    | Chrome 60+, Firefox 55+, Safari 12+ | Modern browsers           |
| **Node.js**    | 14.0+                               | Build environment         |

---

## 🤝 Contributing Guide

Welcome to submit Issues and Pull Requests!

1. Fork this repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push branch: `git push origin feature/amazing-feature`
5. Submit Pull Request

---

## 📄 License

MIT © [onshinpei](https://github.com/onshinpei)

---

<div align="center">
  <strong>If this project helps you, please give it a ⭐️ Star for support!</strong>
  
  <br><br>
  
  [🐛 Report Issues](https://github.com/onshinpei/ds-markdown/issues) | 
  [💡 Feature Suggestions](https://github.com/onshinpei/ds-markdown/issues) | 
  [📖 View Documentation](https://onshinpei.github.io/ds-markdown/)
</div>
