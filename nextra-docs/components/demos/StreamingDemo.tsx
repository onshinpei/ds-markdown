'use client';

import React, { useRef, useState } from 'react';
import DemoContainer from './DemoContainer';

// 如果 ds-markdown 已安装，取消下面的注释
// import { MarkdownCMD, MarkdownCMDRef } from 'ds-markdown';

// 临时占位符组件
const MarkdownCMD = ({ children, ...props }: any) => (
  <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9', minHeight: '300px' }}>
    <p style={{ color: '#666', marginBottom: '10px' }}>
      ⚠️ 请先安装 ds-markdown: <code>npm install ds-markdown</code>
    </p>
    <div style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
      {children || '点击"开始流式输出"按钮查看效果...'}
    </div>
  </div>
);

type StreamingType = 'ai-chat' | 'code-generation' | 'documentation';

interface StreamingItem {
  content: string;
  type: 'thinking' | 'answer';
}

// 流式数据
const streamingData: Record<StreamingType, StreamingItem[]> = {
  'ai-chat': [
    { content: '🤔 正在分析您的问题...', type: 'thinking' },
    { content: '\n\n', type: 'answer' },
    { content: '# AI 助手回答\n\n', type: 'answer' },
    { content: '根据您的问题，我来为您详细解答：\n\n', type: 'answer' },
    { content: '## 主要特点\n\n', type: 'answer' },
    { content: '- ⚡ **高性能**：基于优化的渲染引擎\n', type: 'answer' },
    { content: '- 🎬 **流畅动画**：支持多种打字效果\n', type: 'answer' },
    { content: '- 🎯 **完美兼容**：支持完整 Markdown 语法\n', type: 'answer' },
    { content: '- 🔧 **易于集成**：简单的 API 设计\n\n', type: 'answer' },
    { content: '## 使用建议\n\n', type: 'answer' },
    { content: '推荐在以下场景使用：\n\n', type: 'answer' },
    { content: '1. **AI 对话界面** - 模拟真实对话体验\n', type: 'answer' },
    { content: '2. **代码演示** - 逐步展示代码逻辑\n', type: 'answer' },
    { content: '3. **文档展示** - 动态呈现文档内容\n\n', type: 'answer' },
    { content: '希望这个解答对您有帮助！🎉', type: 'answer' },
  ],
  'code-generation': [
    { content: '💻 正在生成代码...', type: 'thinking' },
    { content: '\n\n', type: 'answer' },
    { content: '# React 组件示例\n\n', type: 'answer' },
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
    { content: '✅ 代码生成完成！', type: 'answer' },
  ],
  documentation: [
    { content: '📚 正在生成文档...', type: 'thinking' },
    { content: '\n\n', type: 'answer' },
    { content: '# API 文档\n\n', type: 'answer' },
    { content: '## DsMarkdown 组件\n\n', type: 'answer' },
    { content: '### Props\n\n', type: 'answer' },
    { content: '| 属性 | 类型 | 默认值 | 说明 |\n', type: 'answer' },
    { content: '|------|------|--------|------|\n', type: 'answer' },
    { content: '| `interval` | `number` | `20` | 打字间隔（毫秒） |\n', type: 'answer' },
    { content: '| `theme` | `"light" \\| "dark"` | `"light"` | 主题模式 |\n', type: 'answer' },
    { content: '| `disableTyping` | `boolean` | `false` | 禁用打字动画 |\n\n', type: 'answer' },
    { content: '### 方法\n\n', type: 'answer' },
    { content: '- `start()` - 开始打字动画\n', type: 'answer' },
    { content: '- `stop()` - 停止打字动画\n', type: 'answer' },
    { content: '- `resume()` - 恢复打字动画\n\n', type: 'answer' },
    { content: '📖 文档生成完成！', type: 'answer' },
  ],
};

/**
 * 流式数据演示组件
 * 展示如何处理流式数据输入，模拟 AI 对话场景
 */
export const StreamingDemo: React.FC = () => {
  const markdownRef = useRef<any>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [streamingType, setStreamingType] = useState<StreamingType>('ai-chat');

  // 事件处理函数
  const handleStartStreaming = async () => {
    if (isStreaming) return;

    setIsStreaming(true);
    setIsStopped(false);
    markdownRef.current?.clear?.();

    const data = streamingData[streamingType];

    for (const item of data) {
      if (isStopped) break;

      // 模拟网络延迟
      await new Promise((resolve) => setTimeout(resolve, 50 + Math.random() * 100));

      if (item.type === 'thinking') {
        markdownRef.current?.push?.(item.content, 'thinking');
        // 思考时间稍长
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

  return (
    <DemoContainer 
      title="🌊 流式数据演示" 
      description="模拟 AI 对话、代码生成等流式数据场景"
    >
      <div className={`demo-impl ${theme === 'dark' ? 'demo-impl-dark' : 'demo-impl-light'}`}>
        <div className="demo-controls">
          <div className="select-wrapper">
            <label className="select-label">选择场景：</label>
            <select 
              className="select-control" 
              value={streamingType} 
              onChange={(e) => handleStreamingTypeChange(e.target.value as StreamingType)} 
              disabled={isStreaming}
            >
              <option value="ai-chat">💬 AI 对话</option>
              <option value="code-generation">💻 代码生成</option>
              <option value="documentation">📚 文档生成</option>
            </select>
          </div>
          <button 
            className="demo-btn demo-btn-success" 
            onClick={handleStartStreaming} 
            disabled={isStreaming}
          >
            🚀 开始流式输出
          </button>
          <button 
            className="demo-btn demo-btn-danger" 
            onClick={handleStop} 
            disabled={!isStreaming || isStopped}
          >
            ⏸️ 停止
          </button>
          <button 
            className="demo-btn demo-btn-warning" 
            onClick={handleResume} 
            disabled={!isStopped}
          >
            ▶️ 继续
          </button>
          <button 
            className="demo-btn demo-btn-secondary" 
            onClick={handleClear}
          >
            🗑️ 清空
          </button>
          <button 
            className="demo-btn demo-btn-outline" 
            onClick={handleToggleTheme}
          >
            {theme === 'light' ? '🌙 暗色主题' : '☀️ 亮色主题'}
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

