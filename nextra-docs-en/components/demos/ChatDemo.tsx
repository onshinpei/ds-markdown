'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MarkdownCMD, type MarkdownCMDRef } from 'ds-markdown';
import { katexPlugin } from 'ds-markdown/plugins';

// ── 预设对话剧本 ──────────────────────────────────────────────────────────────

interface ScriptMessage {
  role: 'user' | 'assistant';
  content: string; // user 直接展示；assistant 逐块 push
}

const CHAT_SCRIPT: ScriptMessage[] = [
  {
    role: 'user',
    content: 'Can you show me how ds-markdown handles streaming output?',
  },
  {
    role: 'assistant',
    content: [
      '# Streaming Output Demo\n\n',
      'Sure! `ds-markdown` is designed for **real-time AI streaming**.\n\n',
      "Here's how it works:\n\n",
      '```tsx\n',
      'const ref = useRef<MarkdownCMDRef>(null);\n\n',
      '// Push chunks as they arrive from the AI\n',
      'ref.current?.push(chunk, "answer");\n',
      '```\n\n',
      '## Key advantages\n\n',
      '- ⚡ Each chunk is **split character-by-character** — no stuttering\n',
      '- 📝 Markdown renders **incrementally** as you type\n',
      '- 🔢 Even math works mid-stream: $E = mc^2$\n\n',
      '> The component handles all the timing complexity for you.\n',
    ].join(''),
  },
  {
    role: 'user',
    content: 'What about math formulas and tables?',
  },
  {
    role: 'assistant',
    content: [
      '# Math & Tables\n\n',
      'Both are fully supported out of the box.\n\n',
      '## Math (KaTeX)\n\n',
      'Inline: $a^2 + b^2 = c^2$\n\n',
      'Block formula:\n\n',
      '$$\n\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}\n$$\n\n',
      '## Tables\n\n',
      '| Feature | Support | Notes |\n',
      '|---------|---------|-------|\n',
      '| Markdown | ✅ | Full GFM |\n',
      '| Math | ✅ | KaTeX |\n',
      '| Charts | ✅ | Via plugin |\n',
      '| Streaming | ✅ | Native |\n\n',
      'Everything renders **smoothly** during the typing animation. 🎉\n',
    ].join(''),
  },
];

// ── 类型 ──────────────────────────────────────────────────────────────────────

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isTyping?: boolean;
}

// ── 用户气泡 ──────────────────────────────────────────────────────────────────

const UserBubble: React.FC<{ content: string }> = ({ content }) => (
  <div className="chat-row chat-row--user">
    <div className="chat-bubble chat-bubble--user">{content}</div>
    <div className="chat-avatar chat-avatar--user">U</div>
  </div>
);

// ── AI 气泡（使用 MarkdownCMD 打字）────────────────────────────────────────────

const AssistantBubble: React.FC<{
  content: string;
  isTyping: boolean;
  onEnd: () => void;
}> = ({ content, isTyping, onEnd }) => {
  const ref = useRef<MarkdownCMDRef>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!isTyping || pushed.current) return;
    pushed.current = true;

    // 模拟流式 push，按字符分块
    const chunks = content.match(/.{1,6}/gs) ?? [];
    let i = 0;

    const push = () => {
      if (i >= chunks.length) {
        onEnd();
        return;
      }
      ref.current?.push(chunks[i], 'answer');
      i++;
      setTimeout(push, 18 + Math.random() * 20);
    };

    // 稍作延迟，模拟网络响应
    setTimeout(push, 300);
  }, [isTyping, content, onEnd]);

  return (
    <div className="chat-row chat-row--assistant">
      <div className="chat-avatar chat-avatar--ai">AI</div>
      <div className="chat-bubble chat-bubble--assistant">
        <MarkdownCMD theme="dark" ref={ref} interval={0} autoStartTyping showCursor={isTyping} cursor="line" plugins={[katexPlugin]} math={{ splitSymbol: 'dollar' }} />
      </div>
    </div>
  );
};

// ── 输入框 ────────────────────────────────────────────────────────────────────

const ChatInput: React.FC<{
  onSend: (text: string) => void;
  disabled: boolean;
}> = ({ onSend, disabled }) => {
  const [value, setValue] = useState('');

  const handleSend = () => {
    const text = value.trim();
    if (!text || disabled) return;
    onSend(text);
    setValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-input-row">
      <textarea
        className="chat-input-textarea"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask something… (or watch the auto demo)"
        disabled={disabled}
        rows={1}
      />
      <button className="chat-send-btn" onClick={handleSend} disabled={disabled || !value.trim()} aria-label="Send">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>
    </div>
  );
};

// ── 主 Demo 组件 ──────────────────────────────────────────────────────────────

export const ChatDemo: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [scriptIdx, setScriptIdx] = useState(0);
  const [autoRunning, setAutoRunning] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // messages 区域不再独立滚动（页面整体滚动），保留 ref 仅供未来扩展。

  // 添加一条消息
  const addMessage = useCallback((msg: Omit<ChatMessage, 'id'>) => {
    const id = `${Date.now()}-${Math.random()}`;
    setMessages((prev) => [...prev, { ...msg, id }]);
    return id;
  }, []);

  // 执行下一条剧本
  const runNext = useCallback(
    (idx: number) => {
      if (idx >= CHAT_SCRIPT.length) {
        setAutoRunning(false);
        setIsTyping(false);
        return;
      }
      const item = CHAT_SCRIPT[idx];
      if (item.role === 'user') {
        addMessage({ role: 'user', content: item.content });
        setTimeout(() => runNext(idx + 1), 600);
      } else {
        addMessage({ role: 'assistant', content: item.content, isTyping: true });
        setIsTyping(true);
        setScriptIdx(idx + 1);
      }
    },
    [addMessage],
  );

  // AI 消息打字结束 → 继续剧本
  const handleAssistantEnd = useCallback(() => {
    setIsTyping(false);
    setTimeout(() => {
      setMessages((prev) => prev.map((m, i) => (i === prev.length - 1 ? { ...m, isTyping: false } : m)));
      runNext(scriptIdx);
    }, 800);
  }, [scriptIdx, runNext]);

  // 启动自动演示（force=true 时忽略 autoRunning 防重入，用于 Replay）
  const startDemo = useCallback(
    (force = false) => {
      if (autoRunning && !force) return;
      setMessages([]);
      setScriptIdx(0);
      setAutoRunning(true);
      setIsTyping(false);
      setTimeout(() => runNext(0), 400);
    },
    [autoRunning, runNext],
  );

  // 挂载后自动启动，不等视口
  useEffect(() => {
    const t = setTimeout(() => startDemo(), 800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 用户手动发送
  const handleUserSend = useCallback(
    (text: string) => {
      addMessage({ role: 'user', content: text });
      // 模拟 AI 回复
      setTimeout(() => {
        const reply = `Got it! You said: **"${text}"**\n\nThis is a simulated reply — in production, connect your AI stream here and push chunks with \`ref.current?.push(chunk, 'answer')\`. ds-markdown handles all the rendering magic. ✨`;
        addMessage({ role: 'assistant', content: reply, isTyping: true });
        setIsTyping(true);
        // 简单模拟打字结束
        const len = reply.length;
        setTimeout(
          () => {
            setIsTyping(false);
            setMessages((prev) => prev.map((m, i) => (i === prev.length - 1 ? { ...m, isTyping: false } : m)));
          },
          len * 22 + 500,
        );
      }, 600);
    },
    [addMessage],
  );

  return (
    <div className="chat-demo-wrapper">
      {/* Header */}
      <div className="chat-demo-header">
        <div className="chat-demo-header-left">
          <div className="chat-demo-avatar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" y1="9" x2="9.01" y2="9" />
              <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
          </div>
          <div>
            <div className="chat-demo-title">AI Assistant</div>
            <div className="chat-demo-status">
              <span className="chat-demo-status-dot" />
              {isTyping ? 'Typing…' : 'Online'}
            </div>
          </div>
        </div>
        <button className="chat-demo-replay" onClick={() => startDemo(true)} title="Replay demo">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 .49-3.36" />
          </svg>
          Replay
        </button>
      </div>

      {/* Messages */}
      <div className="chat-demo-messages" ref={containerRef}>
        {messages.length === 0 && <div className="chat-demo-empty">Starting demo…</div>}
        {messages.map((msg) =>
          msg.role === 'user' ? <UserBubble key={msg.id} content={msg.content} /> : <AssistantBubble key={msg.id} content={msg.content} isTyping={!!msg.isTyping} onEnd={handleAssistantEnd} />,
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <ChatInput onSend={handleUserSend} disabled={isTyping} />
    </div>
  );
};

export default ChatDemo;
