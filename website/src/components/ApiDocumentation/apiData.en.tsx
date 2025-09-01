import { ApiProperty, RefMethod, ComparisonRow, FormulaType } from './type';
// API 数据定义
import en from 'ds-markdown/i18n/en';
import { getObjectKeys } from './util';
// Props Data
export const propsData: ApiProperty[] = [
  { prop: 'interval', type: 'number', description: 'Typing interval (ms)', defaultValue: '30' },
  { prop: 'timerType', type: "'setTimeout' | 'requestAnimationFrame'", description: 'Timer type: setTimeout or requestAnimationFrame', defaultValue: "'setTimeout'" },
  { prop: 'disableTyping', type: 'boolean', description: 'Disable typing animation', defaultValue: 'false' },
  { prop: 'onEnd', type: '(data?: IEndData) => void', description: 'Callback when typing ends', defaultValue: 'undefined' },
  { prop: 'onStart', type: '(data?: IStartData) => void', description: 'Callback when typing starts', defaultValue: 'undefined' },
  { prop: 'onBeforeTypedChar', type: '(data?: IBeforeTypedChar) => Promise<void>', description: 'Callback before typing each character', defaultValue: 'undefined' },
  { prop: 'onTypedChar', type: '(data?: ITypedChar) => void', description: 'Callback after typing each character', defaultValue: 'undefined' },
  { prop: 'autoStartTyping', type: 'boolean', description: 'Auto start typing animation', defaultValue: 'true' },
  { prop: 'theme', type: 'Theme', description: 'Theme', defaultValue: 'light' },
  { prop: 'math', type: 'IMarkdownMath', description: 'Math formula config', defaultValue: '{ splitSymbol: "dollar" }' },
  { prop: 'codeBlock', type: 'IMarkdownCode', description: 'Code block config', defaultValue: 'true' },
  { prop: 'plugins', type: 'IMarkdownPlugin[]', description: 'Plugin config', defaultValue: '[]' },
  { prop: 'answerType', type: "'thinking' | 'answer'", description: 'Answer type', defaultValue: 'answer' },
  { prop: 'children', type: 'string | undefined', description: 'Markdown content', defaultValue: '-' },
];

// DsMarkdown Ref Methods
export const dsMarkdownMethods: RefMethod[] = [
  { method: 'start()', description: 'Start typing animation manually' },
  { method: 'stop()', description: 'Pause typing animation' },
  { method: 'resume()', description: 'Resume typing animation' },
  { method: 'restart()', description: 'Restart typing animation from the beginning' },
];

// MarkdownCMD Ref Methods
export const markdownCMDMethods: RefMethod[] = [
  { method: 'push(content, answerType)', description: 'Add content and start typing, supports streaming' },
  { method: 'clear()', description: 'Clear all content and state, reset component' },
  { method: 'triggerWholeEnd()', description: 'Manually trigger completion callback' },
  { method: 'start()', description: 'Start typing animation manually' },
  { method: 'stop()', description: 'Pause typing animation' },
  { method: 'resume()', description: 'Resume typing animation' },
  { method: 'restart()', description: 'Restart typing animation from the beginning' },
];

// ITypedChar Type Definition
export const iTypedCharData: ApiProperty[] = [
  { prop: 'currentIndex', type: 'number', description: 'Index of the current character in the string', defaultValue: '0' },
  { prop: 'currentChar', type: 'string', description: 'The character just typed', defaultValue: '-' },
  { prop: 'answerType', type: 'AnswerType', description: 'Content type (thinking/answer)', defaultValue: '-' },
  { prop: 'prevStr', type: 'string', description: 'Prefix string of the current type', defaultValue: '-' },
  { prop: 'currentStr', type: 'string', description: 'Full string of the current type', defaultValue: '-' },
  { prop: 'percent', type: 'number', description: 'Typing progress percentage (0-100)', defaultValue: '0' },
];

// IBeforeTypedChar Type Definition
export const iBeforeTypedCharData: ApiProperty[] = [
  { prop: 'currentIndex', type: 'number', description: 'Index of the current character in the string', defaultValue: '0' },
  { prop: 'currentChar', type: 'string', description: 'The character about to be typed', defaultValue: '-' },
  { prop: 'answerType', type: 'AnswerType', description: 'Content type (thinking/answer)', defaultValue: '-' },
  { prop: 'prevStr', type: 'string', description: 'Prefix string of the current type', defaultValue: '-' },
  { prop: 'percent', type: 'number', description: 'Typing progress percentage (0-100)', defaultValue: '0' },
];

// IMarkdownMath Type Definition
export const iMarkdownMathData: ApiProperty[] = [{ prop: 'splitSymbol', type: "'dollar' | 'bracket'", description: 'Math formula delimiter type', defaultValue: "'dollar'" }];

// IMarkdownPlugin Type Definition
export const iMarkdownPluginData: ApiProperty[] = [
  { prop: 'remarkPlugin', type: 'unknown', description: 'remark plugin instance', defaultValue: '-' },
  { prop: 'rehypePlugin', type: 'unknown', description: 'rehype plugin instance', defaultValue: '-' },
  { prop: 'type', type: "'buildIn' | 'custom'", description: 'Plugin type, built-in or custom', defaultValue: '-' },
  { prop: 'id', type: 'any', description: 'Plugin unique identifier', defaultValue: '-' },
];

// IMarkdownCode Type Definition
export const iMarkdownCodeData: ApiProperty[] = [
  { prop: 'headerActions', type: 'boolean | React.ReactNode', description: 'Show header action buttons. true for default, React.ReactNode for custom', defaultValue: 'true' },
];

// IEndData Type Definition
export const iEndData: ApiProperty[] = [
  { prop: 'manual', type: 'boolean', description: 'Whether triggered manually', defaultValue: '-' },
  { prop: 'answerStr', type: 'string', description: 'Answer string', defaultValue: '-' },
  { prop: 'thinkingStr', type: 'string', description: 'Thinking string', defaultValue: '-' },
  { prop: 'str', type: 'string', description: 'Typed string, same as answerStr', defaultValue: '-' },
];

// IStartData Type Definition
export const iStartData: ApiProperty[] = [
  { prop: 'currentIndex', type: 'number', description: 'Index of the current character in the string', defaultValue: '0' },
  { prop: 'currentChar', type: 'string', description: 'The character just typed', defaultValue: '-' },
  { prop: 'answerType', type: 'AnswerType', description: 'Content type (thinking/answer)', defaultValue: '-' },
  { prop: 'prevStr', type: 'string', description: 'Prefix string of the current type', defaultValue: '-' },
];

// Timer Comparison Data
export const timerComparisonData: ComparisonRow[] = [
  { feature: 'Character Handling', requestAnimationFrame: 'Multiple characters per frame', setTimeout: 'One character per tick' },
  { feature: 'High Frequency Interval', requestAnimationFrame: '✅ Excellent (5ms → 3 chars/frame)', setTimeout: '❌ May lag' },
  { feature: 'Low Frequency Interval', requestAnimationFrame: '✅ Normal (100ms → 1 char/6 frames)', setTimeout: '✅ Precise' },
  { feature: 'Visual Effect', requestAnimationFrame: '🎬 Smooth animation', setTimeout: '⚡ Precise rhythm' },
  { feature: 'Performance Overhead', requestAnimationFrame: '🟢 Low (frame sync)', setTimeout: '🟡 Medium (timer)' },
  { feature: 'Recommended Scenarios', requestAnimationFrame: 'Modern web apps, AI chat, high-frequency typing', setTimeout: 'High compatibility, retro effect' },
];

// Math Formula Delimiter Data
export const formulaTypesData: FormulaType[] = [
  { type: "'dollar'", inline: '$...$', block: '$$...$$', example: '$E = mc^2$' },
  { type: "'bracket'", inline: '(...)', block: '[...]', example: '(a + b = c)' },
];

// Best Practices
export const bestPractices = [
  { title: 'Performance Optimization', description: 'Use requestAnimationFrame mode, set interval to 15-30ms' },
  { title: 'Streaming Data', description: 'Use MarkdownCMD imperative API for streaming, avoid frequent children updates' },
  { title: 'Math Formula', description: "Import 'ds-markdown/katex.css' as needed" },
  { title: 'Code Block Config', description: 'Use codeBlock.headerActions to customize code block actions for better UX' },
  { title: 'Type Safety', description: 'Use TypeScript for full type hints and checks' },
  { title: 'Plugin Usage', description: 'Configure plugin order properly to avoid conflicts' },
];

// Code Examples
export const codeExamples = {
  katexPlugin: `import { katexPlugin } from 'ds-markdown/plugins';

<DsMarkdown 
  plugins={[katexPlugin]}
  math={{ splitSymbol: 'dollar' }}
>
  Inline formula: $E = mc^2$
  
  Block formula:
  $$\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}$$
</DsMarkdown>`,

  streamingChat: `import { useRef } from 'react';
import { MarkdownCMD, MarkdownCMDRef } from 'ds-markdown';

function StreamingChat() {
  const markdownRef = useRef<MarkdownCMDRef>(null);

  const simulateAIResponse = async () => {
    markdownRef.current?.clear();
    
    // Thinking phase
    markdownRef.current?.push('🤔 Analyzing...', 'thinking');
    
    // Streaming answer
    const chunks = [
      '# React 19 New Features\n\n',
      '## 🚀 React Compiler\n',
      '- 🎯 Automatic performance optimization\n',
      '- ⚡ Compile-time optimization\n'
    ];
    
    for (const chunk of chunks) {
      await delay(100);
      markdownRef.current?.push(chunk, 'answer');
    }
  };

  return (
    <div>
      <button onClick={simulateAIResponse}>
        🤖 Ask AI
      </button>
      <MarkdownCMD 
        ref={markdownRef}
        interval={15}
        timerType="requestAnimationFrame"
      />
    </div>
  );
}`,

  callbackExample: `import { useRef, useState } from 'react';
import { MarkdownCMD, MarkdownCMDRef } from 'ds-markdown';

function CallbackDemo() {
  const markdownRef = useRef<MarkdownCMDRef>(null);
  const [progress, setProgress] = useState(0);

  const handleBeforeTypedChar = async (data) => {
    // Async operation before typing a character
    console.log('About to type:', data.currentChar);
    
    // You can perform network requests, validation, etc. here
    if (data.currentChar === '!') {
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  };

  const handleTypedChar = (data) => {
    // Update progress
    setProgress(Math.round(data.percent));
    
    // Add effects
    if (data.currentChar === '.') {
      console.log('Play period sound effect');
    }
  };

  return (
    <div>
      <div>Progress: {progress}%</div>
      <MarkdownCMD 
        ref={markdownRef}
        interval={30}
        onBeforeTypedChar={handleBeforeTypedChar}
        onTypedChar={handleTypedChar}
      />
    </div>
  );
}`,

  restartExample: `import { useRef, useState } from 'react';
import { MarkdownCMD, MarkdownCMDRef } from 'ds-markdown';

function RestartDemo() {
  const markdownRef = useRef<MarkdownCMDRef>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const startContent = () => {
    markdownRef.current?.clear();
    markdownRef.current?.push(
      '# Restart Animation Demo\\n\\n' +
      'This example shows how to use the restart() method:\\n\\n' +
      '- 🔄 Restart: Play current content from the beginning\\n' +
      '- ⏸️ Pause/Resume: Pause and resume at any time\\n' +
      '- 🎯 Precise control: Fully control animation state\\n\\n' +
      'Current state: ' + (isPlaying ? 'Playing' : 'Paused') + '\\n\\n' +
      'This is a very useful feature!',
      'answer'
    );
    setIsPlaying(true);
  };

  const handleStart = () => {
    markdownRef.current?.start();
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

  return (
    <div>
      <div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
        <button onClick={startContent}>🚀 Start Content</button>
        <button onClick={handleStart} disabled={isPlaying}>▶️ Start</button>
        <button onClick={handleStop} disabled={!isPlaying}>⏸️ Pause</button>
        <button onClick={handleResume} disabled={isPlaying}>▶️ Resume</button>
        <button onClick={handleRestart}>🔄 Restart</button>
      </div>
      
      <div>Status: {isPlaying ? '🟢 Playing' : '🔴 Paused'}</div>
      
      <MarkdownCMD 
        ref={markdownRef} 
        interval={25} 
        onEnd={() => setIsPlaying(false)}
      />
    </div>
  );
}`,

  startExample: `import { useRef, useState } from 'react';
import { MarkdownCMD, MarkdownCMDRef } from 'ds-markdown';

function StartDemo() {
  const markdownRef = useRef<MarkdownCMDRef>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const loadContent = () => {
    markdownRef.current?.clear();
    markdownRef.current?.push(
      '# Manual Start Animation Demo\\n\\n' +
      'This example shows how to use the start() method:\\n\\n' +
      '- 🎯 Manual control: When autoStartTyping=false, you need to call start() manually\\n' +
      '- ⏱️ Delayed start: Start animation after user interaction\\n' +
      '- 🎮 Gamification: Suitable for scenarios where user triggers are needed\\n\\n' +
      'Click the "Start Animation" button to manually start typing!',
      'answer'
    );
    setIsPlaying(false);
  };

  const handleStart = () => {
    markdownRef.current?.start();
    setIsPlaying(true);
  };

  return (
    <div>
      <div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
        <button onClick={loadContent}>📝 Load Content</button>
        <button onClick={handleStart} disabled={isPlaying}>▶️ Start Animation</button>
      </div>
      
      <div style={{ margin: '10px 0', padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
        <strong>Status: </strong> {isPlaying ? '🟢 Animation Playing' : '🔴 Waiting to Start'}
      </div>
      
      <MarkdownCMD 
        ref={markdownRef} 
        interval={30} 
        autoStartTyping={false}
        onEnd={() => setIsPlaying(false)}
      />
    </div>
  );
}`,

  codeBlockExample: `// Default header action buttons\n<DsMarkdown codeBlock={{ headerActions: true }}>\n  {\`\`\`javascript\nconsole.log('Hello, World!');\n\`\`\`}\n</DsMarkdown>\n\n// Custom header action buttons\n<DsMarkdown codeBlock={{ headerActions: (\n  <div style={{ display: 'flex', gap: '8px', padding: '8px' }}>\n    <button onClick={() => console.log('Copy code')}>📋 Copy</button>\n    <button onClick={() => console.log('Download file')}>💾 Download</button>\n    <button onClick={() => console.log('Share code')}>🔗 Share</button>\n  </div>\n) }}>\n  {\`\`\`typescript\ninterface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\nconst user: User = {\n  id: 1,\n  name: 'John Doe',\n  email: 'john@example.com'\n};\n\`\`\`}\n</DsMarkdown>\n\n// Disable header action buttons\n<DsMarkdown codeBlock={{ headerActions: false }}>\n  {\`\`\`python\ndef fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)\n\`\`\`}\n</DsMarkdown>`,
};

// ConfigProvider & i18n related props
export const configProviderPropsData: ApiProperty[] = [
  {
    prop: 'locale',
    type: 'Locale',
    description: 'Locale object, supports grouped structure. Default is Chinese, English optional',
    defaultValue: 'zhCN',
  },
  {
    prop: 'mermaidConfig',
    type: 'IMarkdownMermaidConfig',
    description: 'Mermaid config',
    defaultValue: '-',
  },
  {
    prop: 'katexConfig',
    type: 'IMarkdownKatexConfig',
    description: 'KaTeX config',
    defaultValue: '-',
  },
  {
    prop: 'children',
    type: 'React.ReactNode',
    description: 'Child components to be wrapped by multi-language provider',
    defaultValue: '-',
  },
];

export const katexConfigData: ApiProperty[] = [
  {
    prop: '...rest',
    type: 'Katex.KatexConfig',
    description: 'Katex config, please refer to <a href="https://katex.org/docs/options.html" target="_blank">Katex config</a>',
    defaultValue: '-',
  },
];

export const localeTypeData: ApiProperty[] = [
  {
    prop: 'codeBlock',
    type: '{ copy: string; copied: string; download: string; [key: string]: string }',
    description: 'Code block related text group',
    defaultValue: '-',
  },
  {
    prop: '[key: string]',
    type: 'any',
    description: 'Supports custom groups and fields',
    defaultValue: '-',
  },
];

export const i18nData: ApiProperty[] = getObjectKeys(en).map((item) => ({
  prop: item.key,
  type: 'string',
  description: item.value,
  defaultValue: '-',
}));
