import React, { useState, useRef } from 'react';
import DsMarkdown, { MarkdownRef } from 'ds-markdown';

interface DemoProps {
  markdown: string;
}

// 打字动画控制演示组件
const TypingAnimationDemo: React.FC<DemoProps> = ({ markdown }) => {
  const [disableTyping, setDisableTyping] = useState<boolean>(false);
  const markdownRef = useRef<MarkdownRef>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTyping = (): void => {
    setDisableTyping(!disableTyping);
  };

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <button className="btn" onClick={toggleTyping}>
          {disableTyping ? '开启打字效果' : '关闭打字效果'}
        </button>
        <button
          className="btn"
          onClick={() => {
            markdownRef.current?.start();
            setIsTyping(true);
            setIsStopped(false);
          }}
          disabled={isTyping || isStopped}
        >
          ▶️ 开始
        </button>
        <button
          className="btn"
          onClick={() => {
            markdownRef.current?.stop();
            setIsStopped(true);
          }}
          disabled={!isTyping || isStopped}
        >
          ⏹️ 停止
        </button>
        <button
          className="btn"
          onClick={() => {
            markdownRef.current?.resume();
            setIsTyping(true);
            setIsStopped(false);
          }}
          disabled={!isStopped}
        >
          ⏭️ 继续
        </button>
        <button className="btn" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          {theme === 'light' ? '🌙 暗色主题' : '☀️ 亮色主题'}
        </button>
      </div>
      <div>
        <DsMarkdown
          ref={markdownRef}
          interval={30}
          answerType="answer"
          theme={theme}
          disableTyping={disableTyping}
          autoStartTyping={false}
          onStart={() => setIsTyping(true)}
          onEnd={(data) => {
            if (!data?.manual) {
              setIsTyping(false);
              setIsStopped(false);
            }
          }}
        >
          {markdown}
        </DsMarkdown>
      </div>
    </div>
  );
};

export default TypingAnimationDemo;
