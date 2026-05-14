'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MarkdownCMD, type MarkdownCMDRef } from 'ds-markdown';
import { katexPlugin } from 'ds-markdown/plugins';

// ── 预设对话剧本 ──────────────────────────────────────────────────────────────

interface ScriptMessage {
  role: 'user' | 'assistant';
  content: string;
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

// ── 输入框（受控）─────────────────────────────────────────────────────────────

interface ChatInputProps {
  value: string;
  onChange: (v: string) => void;
  onSend: (text: string) => void;
  disabled: boolean;
  placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ value, onChange, onSend, disabled, placeholder }) => {
  const handleSend = () => {
    const text = value.trim();
    if (!text || disabled) return;
    onSend(text);
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
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder ?? 'Ask something…'}
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

// ── 工具：按字符模拟人类打字写入 input ────────────────────────────────────────

function typeIntoInput(text: string, setInputValue: (updater: (prev: string) => string) => void, onDone: () => void) {
  let i = 0;
  // 先清空
  setInputValue(() => '');
  const tick = () => {
    if (i >= text.length) {
      onDone();
      return;
    }
    const ch = text[i];
    setInputValue((prev) => prev + ch);
    i++;
    // 真人节奏：基础速度 + 随机抖动；空格/标点稍慢
    const isPause = /[ ,.?!]/.test(ch);
    const delay = (isPause ? 90 : 38) + Math.random() * 50;
    setTimeout(tick, delay);
  };
  setTimeout(tick, 200);
}

// ── 主 Demo 组件 ──────────────────────────────────────────────────────────────

export const ChatDemo: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false); // AI 是否正在回复
  const [isUserTyping, setIsUserTyping] = useState(false); // 自动剧本：用户输入框正在打字
  const [scriptIdx, setScriptIdx] = useState(0);
  const [autoRunning, setAutoRunning] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

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
        setIsUserTyping(false);
        return;
      }
      const item = CHAT_SCRIPT[idx];
      if (item.role === 'user') {
        // 模拟人类打字到输入框，结束后自动发送
        setIsUserTyping(true);
        typeIntoInput(item.content, setInputValue, () => {
          // 短暂停顿，模拟"按回车前的迟疑"
          setTimeout(() => {
            // 提交：把当前输入加入消息列表 → 清空 input → 进入下一步
            addMessage({ role: 'user', content: item.content });
            setInputValue('');
            setIsUserTyping(false);
            setTimeout(() => runNext(idx + 1), 400);
          }, 350);
        });
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

  // 启动自动演示
  const startDemo = useCallback(
    (force = false) => {
      if (autoRunning && !force) return;
      setMessages([]);
      setScriptIdx(0);
      setInputValue('');
      setAutoRunning(true);
      setIsTyping(false);
      setIsUserTyping(false);
      setTimeout(() => runNext(0), 400);
    },
    [autoRunning, runNext],
  );

  // 挂载后自动启动
  useEffect(() => {
    const t = setTimeout(() => startDemo(), 800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 用户手动发送
  const handleUserSend = useCallback(
    (text: string) => {
      addMessage({ role: 'user', content: text });
      setInputValue('');
      setTimeout(() => {
        const reply = `Got it! You said: **"${text}"**\n\nThis is a simulated reply — in production, connect your AI stream here and push chunks with \`ref.current?.push(chunk, 'answer')\`. ds-markdown handles all the rendering magic. ✨`;
        addMessage({ role: 'assistant', content: reply, isTyping: true });
        setIsTyping(true);
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

  // 输入框 disabled：AI 在回复 或 剧本正在自动写
  const inputDisabled = isTyping || isUserTyping;

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
        {messages.length === 0 && !isUserTyping && <div className="chat-demo-empty">Starting demo…</div>}
        {messages.map((msg) =>
          msg.role === 'user' ? <UserBubble key={msg.id} content={msg.content} /> : <AssistantBubble key={msg.id} content={msg.content} isTyping={!!msg.isTyping} onEnd={handleAssistantEnd} />,
        )}
      </div>

      {/* Input */}
      <ChatInput value={inputValue} onChange={setInputValue} onSend={handleUserSend} disabled={inputDisabled} placeholder={isUserTyping ? '' : 'Ask something…'} />
    </div>
  );
};

export default ChatDemo;
