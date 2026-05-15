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
    content: '能演示一下 ds-markdown 是如何处理流式输出的吗？',
  },
  {
    role: 'assistant',
    content: [
      '# 流式输出演示\n\n',
      '当然！`ds-markdown` 专为 **AI 实时流式响应** 而设计。\n\n',
      '基本用法：\n\n',
      '```tsx\n',
      'const ref = useRef<MarkdownCMDRef>(null);\n\n',
      '// AI 推送数据时调用 push 即可\n',
      'ref.current?.push(chunk, "answer");\n',
      '```\n\n',
      '## 核心优势\n\n',
      '- ⚡ 每个 chunk 都会被 **逐字符拆分** —— 不卡顿、不跳字\n',
      '- 📝 Markdown **边输入边渲染**\n',
      '- 🔢 数学公式同样可以流式输出：$E = mc^2$\n\n',
      '> 复杂的时序问题，组件已经帮你处理好了。\n',
    ].join(''),
  },
  {
    role: 'user',
    content: '那数学公式和表格支持得怎么样？',
  },
  {
    role: 'assistant',
    content: [
      '# 数学公式 & 表格\n\n',
      '两者都开箱即用，无需额外配置。\n\n',
      '## 数学公式（KaTeX）\n\n',
      '行内公式：$a^2 + b^2 = c^2$\n\n',
      '块级公式：\n\n',
      '$$\n\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}\n$$\n\n',
      '## 表格\n\n',
      '| 特性 | 支持 | 备注 |\n',
      '|------|------|------|\n',
      '| Markdown | ✅ | 完整 GFM |\n',
      '| 数学公式 | ✅ | KaTeX |\n',
      '| 图表 | ✅ | 通过插件 |\n',
      '| 流式输出 | ✅ | 原生支持 |\n\n',
      '所有内容都能在打字动画中 **流畅渲染**。🎉\n',
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
    <div className="chat-avatar chat-avatar--user">我</div>
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
        placeholder={placeholder ?? '输入消息…'}
        disabled={disabled}
        rows={1}
      />
      <button className="chat-send-btn" onClick={handleSend} disabled={disabled || !value.trim()} aria-label="发送">
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
  setInputValue(() => '');
  const tick = () => {
    if (i >= text.length) {
      onDone();
      return;
    }
    const ch = text[i];
    setInputValue((prev) => prev + ch);
    i++;
    // 中文：基础速度 + 随机抖动；标点稍慢
    const isPause = /[，。、？！,.?! ]/.test(ch);
    const delay = (isPause ? 90 : 55) + Math.random() * 50;
    setTimeout(tick, delay);
  };
  setTimeout(tick, 200);
}

// ── 主 Demo 组件 ──────────────────────────────────────────────────────────────

export const ChatDemo: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [scriptIdx, setScriptIdx] = useState(0);
  const [autoRunning, setAutoRunning] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const addMessage = useCallback((msg: Omit<ChatMessage, 'id'>) => {
    const id = `${Date.now()}-${Math.random()}`;
    setMessages((prev) => [...prev, { ...msg, id }]);
    return id;
  }, []);

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
        setIsUserTyping(true);
        typeIntoInput(item.content, setInputValue, () => {
          setTimeout(() => {
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

  const handleAssistantEnd = useCallback(() => {
    setIsTyping(false);
    setTimeout(() => {
      setMessages((prev) => prev.map((m, i) => (i === prev.length - 1 ? { ...m, isTyping: false } : m)));
      runNext(scriptIdx);
    }, 800);
  }, [scriptIdx, runNext]);

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

  useEffect(() => {
    const t = setTimeout(() => startDemo(), 800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUserSend = useCallback(
    (text: string) => {
      addMessage({ role: 'user', content: text });
      setInputValue('');
      setTimeout(() => {
        const reply = `收到！你说的是：**"${text}"**\n\n这是一条模拟回复 —— 在生产环境中，把你的 AI 流式数据接进来，调用 \`ref.current?.push(chunk, 'answer')\` 即可，ds-markdown 会处理好渲染细节。✨`;
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
            <div className="chat-demo-title">AI 助手</div>
            <div className="chat-demo-status">
              <span className="chat-demo-status-dot" />
              {isTyping ? '输入中…' : '在线'}
            </div>
          </div>
        </div>
        <button className="chat-demo-replay" onClick={() => startDemo(true)} title="重新播放">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 .49-3.36" />
          </svg>
          重播
        </button>
      </div>

      {/* Messages */}
      <div className="chat-demo-messages" ref={containerRef}>
        {messages.length === 0 && !isUserTyping && <div className="chat-demo-empty">演示即将开始…</div>}
        {messages.map((msg) =>
          msg.role === 'user' ? <UserBubble key={msg.id} content={msg.content} /> : <AssistantBubble key={msg.id} content={msg.content} isTyping={!!msg.isTyping} onEnd={handleAssistantEnd} />,
        )}
      </div>

      {/* Input */}
      <ChatInput value={inputValue} onChange={setInputValue} onSend={handleUserSend} disabled={inputDisabled} placeholder={isUserTyping ? '' : '输入消息…'} />
    </div>
  );
};

export default ChatDemo;
