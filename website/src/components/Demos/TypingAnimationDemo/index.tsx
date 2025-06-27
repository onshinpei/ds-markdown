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

  // 事件处理函数
  const handleToggleTyping = (): void => {
    setDisableTyping(!disableTyping);
  };

  const handleStart = () => {
    markdownRef.current?.start();
    setIsTyping(true);
    setIsStopped(false);
  };

  const handleStop = () => {
    markdownRef.current?.stop();
    setIsStopped(true);
  };

  const handleResume = () => {
    markdownRef.current?.resume();
    setIsTyping(true);
    setIsStopped(false);
  };

  const handleToggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleTypingStart = () => {
    setIsTyping(true);
  };

  const handleTypingEnd = (data?: { manual?: boolean }) => {
    if (!data?.manual) {
      setIsTyping(false);
      setIsStopped(false);
    }
  };

  return (
    <div className={`demo-impl ${theme === 'dark' ? 'demo-impl-dark' : 'demo-impl-light'}`}>
      <div style={{ marginBottom: 16, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <button className="btn btn-outline" onClick={handleToggleTyping}>
          {disableTyping ? '开启打字效果' : '关闭打字效果'}
        </button>
        <button className="btn btn-success" onClick={handleStart} disabled={isTyping || isStopped}>
          ▶️ 开始
        </button>
        <button className="btn btn-danger" onClick={handleStop} disabled={!isTyping || isStopped}>
          ⏹️ 停止
        </button>
        <button className="btn btn-warning" onClick={handleResume} disabled={!isStopped}>
          ⏭️ 继续
        </button>
        <button className="btn btn-secondary" onClick={handleToggleTheme}>
          {theme === 'light' ? '🌙 暗色主题' : '☀️ 亮色主题'}
        </button>
      </div>
      <div>
        <DsMarkdown ref={markdownRef} interval={30} answerType="answer" theme={theme} disableTyping={disableTyping} autoStartTyping={false} onStart={handleTypingStart} onEnd={handleTypingEnd}>
          {markdown}
        </DsMarkdown>
      </div>
    </div>
  );
};

export default TypingAnimationDemo;
