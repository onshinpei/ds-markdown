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
- Support for typing interruption `stop` and resume `resume`

### 🔧 **Flexible and Easy to Use**

- **Declarative API**: Suitable for simple scenarios, React-style
- **Imperative API**: Suitable for streaming data, better performance
- **Native TypeScript support**: Complete type hints

### 🧮 **Mathematical Formula Support**

- **KaTeX Integration**: High-performance mathematical formula rendering
- **Dual Syntax Support**: `$...$` and `\[...\]` delimiters
- **Streaming Compatible**: Perfect support for mathematical formulas in typing animations
- **Theme Adaptation**: Automatic adaptation to light/dark themes

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
<!-- Import styles -->
<link rel="stylesheet" href="https://esm.sh/ds-markdown/dist/style.css" />
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

### Mathematical Formula Support

```tsx
import DsMarkdown from 'ds-markdown';
import 'ds-markdown/style.css';
import 'ds-markdown/katex.css'; // Import mathematical formula styles

function MathDemo() {
  return (
    <DsMarkdown interval={20} answerType="answer" math={{ isOpen: true, splitSymbol: 'dollar' }}>
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

---

## 📚 Complete API Documentation

### Declarative API (Recommended for Beginners)

| Property      | Type                                        | Description                        | Default                                                                       |
| ------------- | ------------------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------- |
| `interval`    | `number`                                    | Typing interval (milliseconds)     | `30`                                                                          |
| `timerType`   | `'setTimeout'` \| `'requestAnimationFrame'` | Timer type                         | Current default is `setTimeout`, will change to `requestAnimationFrame` later |
| `answerType`  | `'thinking'` \| `'answer'`                  | Content type (affects style theme) | `'answer'`                                                                    |
| `theme`       | `'light'` \| `'dark'`                       | Theme type                         | `'light'`                                                                     |
| `math`        | `IMarkdownMath`                             | Mathematical formula configuration | `{ isOpen: false, splitSymbol: 'dollar' }`                                    |
| `onEnd`       | `(data: EndData) => void`                   | Typing completion callback         | -                                                                             |
| `onStart`     | `(data: StartData) => void`                 | Typing start callback              | -                                                                             |
| `onTypedChar` | `(data: CharData) => void`                  | Per-character typing callback      | -                                                                             |

### Mathematical Formula Configuration

| Property      | Type                      | Description                           | Default    |
| ------------- | ------------------------- | ------------------------------------- | ---------- |
| `isOpen`      | `boolean`                 | Enable mathematical formula rendering | `false`    |
| `splitSymbol` | `'dollar'` \| `'bracket'` | Mathematical formula delimiter type   | `'dollar'` |

**Delimiter Description:**

- `'dollar'`: Use `$...$` and `$$...$$` syntax
- `'bracket'`: Use `\(...\)` and `\[...\]` syntax

### Imperative API (Recommended for Streaming Scenarios)

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

## 🧮 Mathematical Formula Usage Guide

### Basic Syntax

```tsx
// 1. Enable mathematical formula support
<DsMarkdown math={{ isOpen: true }}>
  # Mathematical Formula Example

  // Inline formula
  This is an inline formula: $E = mc^2$

  // Block formula
  $$\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$$
</DsMarkdown>
```

### Delimiter Selection

```tsx
// Use dollar symbol delimiters (default)
<DsMarkdown math={{ isOpen: true, splitSymbol: 'dollar' }}>
  Inline: $a + b = c$
  Block: $$\sum_{i=1}^{n} x_i = x_1 + x_2 + \cdots + x_n$$
</DsMarkdown>

// Use bracket delimiters
<DsMarkdown math={{ isOpen: true, splitSymbol: 'bracket' }}>
  Inline: \(a + b = c\)
  Block: \[\sum_{i=1}^{n} x_i = x_1 + x_2 + \cdots + x_n\]
</DsMarkdown>
```

### Streaming Mathematical Formulas

```tsx
// Perfect support for mathematical formulas in streaming output
const mathContent = [
  'Pythagorean Theorem: ',
  '$a^2 + b^2 = c^2$',
  '\n\n',
  'Where:\n',
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

## 🎛️ Timer Mode Details

### `requestAnimationFrame` Mode 🌟 (Recommended)

```typescript
// 🎯 Features
- Time-driven: Calculate character count based on actual elapsed time
- Batch processing: Can process multiple characters per frame
- Frame synchronization: Synchronized with browser 60fps refresh rate
- High-frequency optimization: Perfect support for high-speed typing with interval < 16ms

// 🎯 Use Cases
- Default choice for modern web applications
- Pursuing smooth animation effects
- High-frequency typing (interval > 0 is sufficient)
- AI real-time conversation scenarios
```

### `setTimeout` Mode 📟 (Compatible)

```typescript
// 🎯 Features
- Single character: Process exactly one character each time
- Fixed interval: Execute strictly according to set time
- Beat feeling: Classic typewriter rhythm
- Precise control: Suitable for specific timing requirements

// 🎯 Use Cases
- Need precise time control
- Creating retro typewriter effects
- Scenarios with high compatibility requirements
```

### 📊 Performance Comparison

| Feature                     | requestAnimationFrame                          | setTimeout                      |
| --------------------------- | ---------------------------------------------- | ------------------------------- |
| **Character Processing**    | Can process multiple characters per frame      | Process one character each time |
| **High-frequency Interval** | ✅ Excellent (5ms → 3 characters per frame)    | ❌ May lag                      |
| **Low-frequency Interval**  | ✅ Normal (100ms → 1 character after 6 frames) | ✅ Precise                      |
| **Visual Effect**           | 🎬 Smooth animation feeling                    | ⚡ Precise beat feeling         |
| **Performance Overhead**    | 🟢 Low (frame synchronization)                 | 🟡 Medium (timer)               |

High-frequency recommended `requestAnimationFrame`, low-frequency recommended `setTimeout`

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
    markdownRef.current?.push('\n\n✅ Analysis complete, starting to answer', 'thinking');

    // Streaming answer
    const chunks = [
      '# React 19 New Features Analysis\n\n',
      '## 🚀 React Compiler\n',
      'The biggest highlight of React 19 is the introduction of **React Compiler**:\n\n',
      '- 🎯 **Automatic Optimization**: No need for manual memo and useMemo\n',
      '- ⚡ **Performance Boost**: Compile-time optimization, zero runtime overhead\n',
      '- 🔧 **Backward Compatible**: No need to modify existing code\n\n',
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
      <button onClick={simulateAIResponse}>🤖 Ask about React 19 New Features</button>

      <MarkdownCMD ref={markdownRef} interval={10} timerType="requestAnimationFrame" onEnd={(data) => console.log('Paragraph complete:', data)} />
    </div>
  );
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
````

### 🧮 Mathematical Formula Streaming Rendering

```tsx
function MathStreamingDemo() {
  const markdownRef = useRef<MarkdownCMDRef>(null);

  const simulateMathResponse = async () => {
    markdownRef.current?.clear();

    const mathChunks = [
      '# Pythagorean Theorem Explanation\n\n',
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

      <MarkdownCMD ref={markdownRef} interval={20} timerType="requestAnimationFrame" math={{ isOpen: true, splitSymbol: 'dollar' }} />
    </div>
  );
}
```

### 🔄 Streaming Markdown Syntax Processing

**Core Problem**: Incomplete Markdown syntax during streaming output can cause rendering errors

```tsx
// 🚨 Problem scenario
push('#'); // "# "
push(' '); // "# "
push('Title'); // "# Title"
push('\n'); // "# Title\n"
push('1'); // "# Title\n1"     ← This will be incorrectly parsed as paragraph
push('.'); // "# Title\n1."    ← Forms correct list
push(' Item'); // "# Title\n1. Item"
```

**✅ Smart Solution**: Built-in synchronous buffering mechanism

```tsx
// Component intelligently handles syntax boundaries
const handleStreamingMarkdown = () => {
  const chunks = ['#', ' ', 'Use', 'Skills', '\n', '1', '.', ' ', 'Skill1', '\n', '2', '.', ' Skill2'];

  chunks.forEach((chunk) => {
    markdownRef.current?.push(chunk, 'answer');
    // No delay needed, component internally buffers intelligently
  });
};

// 🧠 Intelligent processing flow:
// 1. Real-time detection of incomplete syntax like "# Use Skills\n1"
// 2. Intelligent buffering, waiting for more characters
// 3. Process immediately after receiving "." to form "1."
// 4. Zero delay, pure synchronous processing
```

**Supported Syntax Detection**:

````typescript
// ✅ Complete syntax (immediate processing)
'## Title'; // Complete title
'1. List item'; // Complete list item
'- Item'; // Complete unordered list
'> Quote content'; // Complete quote
'```javascript'; // Code block start
'```'; // Code block end
'Content ending with newline\n'; // Newline boundary
'$a + b$'; // Complete mathematical formula
'$$\\sum x$$'; // Complete block mathematical formula

// 🔄 Incomplete syntax (intelligent buffering)
'##'; // Only title symbol
'1'; // Only number
'```java'; // Possible code block start
'$a +'; // Incomplete mathematical formula
````

---

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
// Each update will re-parse the entire content
```

### 3. Mathematical Formula Optimization

```tsx
// ✅ Recommended: Load mathematical formula styles on demand
import 'ds-markdown/style.css';
import 'ds-markdown/katex.css'; // Only import when needed

// ✅ Recommended: Reasonable use of delimiters
// For simple formulas, use $...$ for conciseness
// For complex formulas, use $$...$$ for clarity

// ❌ Avoid: Enable mathematical formulas when not needed
<DsMarkdown math={{ isOpen: true }}>Plain text content</DsMarkdown>;
```

### 4. Type Safety

```tsx
import { MarkdownCMDRef } from 'ds-markdown';

const ref = useRef<MarkdownCMDRef>(null);
// Complete TypeScript type hints
```

### 5. Style Customization

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

/* Mathematical formula styles */
.katex {
  font-size: 1.1em;
}

.katex-display {
  margin: 1em 0;
  text-align: center;
}

/* Dark theme mathematical formulas */
[data-theme='dark'] .katex {
  color: #e1e1e1;
}
```

---

## 🌐 Compatibility

| Environment    | Version Requirement                 | Description              |
| -------------- | ----------------------------------- | ------------------------ |
| **React**      | 16.8.0+                             | Requires Hooks support   |
| **TypeScript** | 4.0+                                | Optional but recommended |
| **Browser**    | Chrome 60+, Firefox 55+, Safari 12+ | Modern browsers          |
| **Node.js**    | 14.0+                               | Build environment        |

---

## 🤝 Contributing

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
  <strong>If this project helps you, please give it a ⭐️ Star!</strong>
  
  <br><br>
  
  [🐛 Report Issues](https://github.com/onshinpei/ds-markdown/issues) | 
  [💡 Feature Suggestions](https://github.com/onshinpei/ds-markdown/issues) | 
  [📖 View Documentation](https://onshinpei.github.io/ds-markdown/)
</div>
