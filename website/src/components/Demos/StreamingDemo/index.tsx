import React, { useRef, useState } from 'react';
import { MarkdownCMD, MarkdownCMDRef } from 'ds-markdown';
import { useI18n } from '../../../../src/hooks/useI18n';

interface DemoProps {
  markdown: string;
}

// 类型定义
type StreamingType = 'ai-chat' | 'code-generation' | 'documentation';
type AnswerType = 'thinking' | 'answer';

interface StreamingItem {
  content: string;
  type: AnswerType;
}

// 流式演示组件
const StreamingDemo: React.FC<DemoProps> = ({ markdown }) => {
  const markdownRef = useRef<MarkdownCMDRef>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [streamingType, setStreamingType] = useState<StreamingType>('ai-chat');
  const { t } = useI18n();

  // 模拟流式数据
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
      { content: '  const handleNewMessage = (content) => {\n', type: 'answer' },
      { content: '    setMessages(prev => [...prev, content]);\n', type: 'answer' },
      { content: '  };\n\n', type: 'answer' },
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
      { content: '这个组件展示了如何集成 ds-markdown 到聊天应用中。', type: 'answer' },
    ],
    documentation: [
      { content: '📚 正在生成文档...', type: 'thinking' },
      { content: '\n\n', type: 'answer' },
      { content: '# ds-markdown 使用指南\n\n', type: 'answer' },
      { content: '## 快速开始\n\n', type: 'answer' },
      { content: '### 1. 安装依赖\n\n', type: 'answer' },
      { content: '```bash\n', type: 'answer' },
      { content: 'npm install ds-markdown\n', type: 'answer' },
      { content: '```\n\n', type: 'answer' },
      { content: '### 2. 基础使用\n\n', type: 'answer' },
      { content: '```tsx\n', type: 'answer' },
      { content: "import DsMarkdown from 'ds-markdown';\n", type: 'answer' },
      { content: "import 'ds-markdown/style.css';\n\n", type: 'answer' },
      { content: 'function App() {\n', type: 'answer' },
      { content: '  return (\n', type: 'answer' },
      { content: '    <DsMarkdown interval={20}>\n', type: 'answer' },
      { content: '      # Hello World\n', type: 'answer' },
      { content: '      这是一个**打字动画**示例。\n', type: 'answer' },
      { content: '    </DsMarkdown>\n', type: 'answer' },
      { content: '  );\n', type: 'answer' },
      { content: '}\n', type: 'answer' },
      { content: '```\n\n', type: 'answer' },
      { content: '### 3. 高级配置\n\n', type: 'answer' },
      { content: '支持多种配置选项，包括打字速度、主题、数学公式等。', type: 'answer' },
    ],
  };

  // 事件处理函数
  const handleStartStreaming = async () => {
    if (isStreaming) return;

    setIsStreaming(true);
    setIsStopped(false);
    markdownRef.current?.clear();

    const data = streamingData[streamingType];

    for (const item of data) {
      if (isStopped) break;

      // 模拟网络延迟
      await new Promise((resolve) => setTimeout(resolve, 50 + Math.random() * 100));

      if (item.type === 'thinking') {
        markdownRef.current?.push(item.content, 'thinking');
        // 思考时间稍长
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } else {
        markdownRef.current?.push(item.content, 'answer');
      }
    }

    setIsStreaming(false);
  };

  const handleStop = () => {
    markdownRef.current?.stop();
    setIsStopped(true);
    setIsStreaming(false);
  };

  const handleResume = () => {
    markdownRef.current?.resume();
    setIsStopped(false);
    setIsStreaming(true);
  };

  const handleClear = () => {
    markdownRef.current?.clear();
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
    <div className={`demo-impl ${theme === 'dark' ? 'demo-impl-dark' : 'demo-impl-light'}`}>
      <div style={{ marginBottom: 16, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div className="select-wrapper" style={{ marginRight: 16 }}>
          <label className="select-label">{t('selectScene')}</label>
          <select className="select-control" value={streamingType} onChange={(e) => handleStreamingTypeChange(e.target.value as StreamingType)} disabled={isStreaming}>
            <option value="ai-chat">{t('aiChat')}</option>
            <option value="code-generation">{t('codeGen')}</option>
            <option value="documentation">{t('docGen')}</option>
          </select>
        </div>
        <button className="btn btn-success" onClick={handleStartStreaming} disabled={isStreaming}>
          {t('startDemo')}
        </button>
        <button className="btn btn-danger" onClick={handleStop} disabled={!isStreaming}>
          {t('stop')}
        </button>
        <button className="btn btn-warning" onClick={handleResume} disabled={!isStopped}>
          {t('resume')}
        </button>
        <button className="btn btn-secondary" onClick={handleClear}>
          {t('clear')}
        </button>
        <button className="btn btn-outline" onClick={handleToggleTheme}>
          {theme === 'light' ? t('themeDark') : t('themeLight')}
        </button>
      </div>

      <MarkdownCMD ref={markdownRef} interval={15} timerType="setTimeout" theme={theme} autoStartTyping={true} onStart={handleTypingStart} onEnd={handleTypingEnd} />
    </div>
  );
};

export default StreamingDemo;
