'use client';

import React, { useRef, useState } from 'react';
import DemoContainer from './DemoContainer';
import { MarkdownCMD, MarkdownCMDRef } from 'ds-markdown';

type StreamingType = 'ai-chat' | 'code-generation' | 'documentation';

interface StreamingItem {
  content: string;
  type: 'thinking' | 'answer';
}

// Streaming data
const streamingData: Record<StreamingType, StreamingItem[]> = {
  'ai-chat': [
    { content: '🤔 Analyzing your question...', type: 'thinking' },
    { content: '\n\n', type: 'answer' },
    { content: '# AI Assistant Answer\n\n', type: 'answer' },
    { content: 'Based on your question, let me provide a detailed answer:\n\n', type: 'answer' },
    { content: '## Key Features\n\n', type: 'answer' },
    { content: '- ⚡ **High Performance**: Based on optimized rendering engine\n', type: 'answer' },
    { content: '- 🎬 **Smooth Animation**: Supports multiple typing effects\n', type: 'answer' },
    { content: '- 🎯 **Perfect Compatibility**: Supports full Markdown syntax\n', type: 'answer' },
    { content: '- 🔧 **Easy Integration**: Simple API design\n\n', type: 'answer' },
    { content: '## Usage Recommendations\n\n', type: 'answer' },
    { content: 'Recommended for the following scenarios:\n\n', type: 'answer' },
    { content: '1. **AI Chat Interface** - Simulate real conversation experience\n', type: 'answer' },
    { content: '2. **Code Demo** - Step-by-step code logic display\n', type: 'answer' },
    { content: '3. **Documentation Display** - Dynamic document content presentation\n\n', type: 'answer' },
    { content: 'Hope this answer helps! 🎉', type: 'answer' },
  ],
  'code-generation': [
    { content: '💻 Generating code...', type: 'thinking' },
    { content: '\n\n', type: 'answer' },
    { content: '# React Component Example\n\n', type: 'answer' },
    { content: '```tsx\n', type: 'answer' },
    { content: "import React, { useState } from 'react';\n", type: 'answer' },
    { content: "import DsMarkdown from 'ds-markdown';\n\n", type: 'answer' },
    { content: 'function ChatComponent() {\n', type: 'answer' },
    { content: '  const [messages, setMessages] = useState([]);\n\n', type: 'answer' },
    { content: '  return (\n', type: 'answer' },
    { content: '    <div className="chat-container">\n', type: 'answer' },
    { content: '      {messages.map((msg, index) => (\n', type: 'answer' },
    { content: '        <DsMarkdown key={index} interval={20}>\n', type: 'answer' },
    { content: '          {msg}\n', type: 'answer' },
    { content: '        </DsMarkdown>\n', type: 'answer' },
    { content: '      ))}\n', type: 'answer' },
    { content: '    </div>\n', type: 'answer' },
    { content: '  );\n', type: 'answer' },
    { content: '}\n', type: 'answer' },
    { content: '```\n\n', type: 'answer' },
    { content: '✅ Code generation completed!', type: 'answer' },
  ],
  documentation: [
    { content: '📚 Generating documentation...', type: 'thinking' },
    { content: '\n\n', type: 'answer' },
    { content: '# API Documentation\n\n', type: 'answer' },
    { content: '## DsMarkdown Component\n\n', type: 'answer' },
    { content: '### Props\n\n', type: 'answer' },
    { content: '| Property | Type | Default | Description |\n', type: 'answer' },
    { content: '|----------|------|---------|-------------|\n', type: 'answer' },
    { content: '| `interval` | `number` | `20` | Typing interval (ms) |\n', type: 'answer' },
    { content: '| `theme` | `"light" \\| "dark"` | `"light"` | Theme mode |\n', type: 'answer' },
    { content: '| `disableTyping` | `boolean` | `false` | Disable typing animation |\n\n', type: 'answer' },
    { content: '### Methods\n\n', type: 'answer' },
    { content: '- `start()` - Start typing animation\n', type: 'answer' },
    { content: '- `stop()` - Stop typing animation\n', type: 'answer' },
    { content: '- `resume()` - Resume typing animation\n\n', type: 'answer' },
    { content: '📖 Documentation generation completed!', type: 'answer' },
  ],
};

/**
 * Streaming Data Demo Component
 * Demonstrates how to handle streaming data input, simulating AI chat scenarios
 */
export const StreamingDemo: React.FC = () => {
  const markdownRef = useRef<any>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [streamingType, setStreamingType] = useState<StreamingType>('ai-chat');

  // Event handlers
  const handleStartStreaming = async () => {
    if (isStreaming) return;

    setIsStreaming(true);
    setIsStopped(false);
    markdownRef.current?.clear?.();

    const data = streamingData[streamingType];

    for (const item of data) {
      if (isStopped) break;

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 50 + Math.random() * 100));

      if (item.type === 'thinking') {
        markdownRef.current?.push?.(item.content, 'thinking');
        // Thinking time is slightly longer
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } else {
        markdownRef.current?.push?.(item.content, 'answer');
      }
    }

    setIsStreaming(false);
  };

  const handleStop = () => {
    markdownRef.current?.stop?.();
    setIsStopped(true);
    setIsStreaming(false);
  };

  const handleResume = () => {
    markdownRef.current?.resume?.();
    setIsStopped(false);
    setIsStreaming(true);
  };

  const handleClear = () => {
    markdownRef.current?.clear?.();
    setIsStreaming(false);
    setIsStopped(false);
  };

  const handleToggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleStreamingTypeChange = (type: StreamingType) => {
    setStreamingType(type);
    handleClear();
  };

  const handleTypingStart = () => {
    setIsStreaming(true);
  };

  const handleTypingEnd = (data?: { manual?: boolean }) => {
    if (!data?.manual) {
      setIsStreaming(false);
      setIsStopped(false);
    }
  };

  // Example code
  const exampleCode = `import { useRef } from 'react';
import { MarkdownCMD, MarkdownCMDRef } from 'ds-markdown';

function StreamingChat() {
  const markdownRef = useRef<MarkdownCMDRef>(null);

  // Simulate streaming data push
  const handleStream = async () => {
    markdownRef.current?.clear();

    const chunks = [
      '# AI Answer\\n\\n',
      'This is an example of **streaming output**.\\n\\n',
      '## Features\\n\\n',
      '- Real-time content display\\n',
      '- Supports Markdown syntax\\n',
      '- With typing animation effect\\n',
    ];

    for (const chunk of chunks) {
      await new Promise(r => setTimeout(r, 100));
      markdownRef.current?.push(chunk, 'answer');
    }
  };

  return (
    <div>
      <button onClick={handleStream}>Start Streaming</button>
      <MarkdownCMD
        ref={markdownRef}
        interval={15}
        theme="light"
        autoStartTyping={true}
      />
    </div>
  );
}`;

  return (
    <DemoContainer 
      title="🌊 Streaming Data Demo" 
      description="Simulates AI chat, code generation and other streaming data scenarios using MarkdownCMD component"
      code={exampleCode}
      language="tsx"
    >
      <div className={`demo-impl ${theme === 'dark' ? 'demo-impl-dark' : 'demo-impl-light'}`}>
        <div className="demo-controls">
          <div className="select-wrapper">
            <label className="select-label">Select Scenario:</label>
            <select 
              className="select-control" 
              value={streamingType} 
              onChange={(e) => handleStreamingTypeChange(e.target.value as StreamingType)} 
              disabled={isStreaming}
            >
              <option value="ai-chat">💬 AI Chat</option>
              <option value="code-generation">💻 Code Generation</option>
              <option value="documentation">📚 Documentation</option>
            </select>
          </div>
          <button 
            className="demo-btn demo-btn-success" 
            onClick={handleStartStreaming} 
            disabled={isStreaming}
          >
            🚀 Start Streaming
          </button>
          {isStopped ? (
            <button 
              className="demo-btn demo-btn-warning" 
              onClick={handleResume}
            >
              ▶️ Resume
            </button>
          ) : (
            <button 
              className="demo-btn demo-btn-danger" 
              onClick={handleStop} 
              disabled={!isStreaming}
            >
              ⏸️ Stop
            </button>
          )}
          <button 
            className="demo-btn demo-btn-secondary" 
            onClick={handleClear}
          >
            🗑️ Clear
          </button>
          <button 
            className="demo-btn demo-btn-outline" 
            onClick={handleToggleTheme}
          >
            {theme === 'light' ? '🌙 Dark Theme' : '☀️ Light Theme'}
          </button>
        </div>

        <div className="demo-preview">
          <MarkdownCMD 
            ref={markdownRef} 
            interval={15} 
            timerType="setTimeout" 
            theme={theme} 
            autoStartTyping={true} 
            onStart={handleTypingStart} 
            onEnd={handleTypingEnd} 
          />
        </div>
      </div>
    </DemoContainer>
  );
};

export default StreamingDemo;
