import React, { useRef, useState } from 'react';
import DsMarkdown, { MarkdownRef } from 'ds-markdown';
import { katexPlugin } from 'ds-markdown/plugins';

interface DemoProps {
  markdown: string;
}

// 数学公式演示组件
const MathSupportDemo: React.FC<DemoProps> = ({ markdown }) => {
  const markdownRef = useRef<MarkdownRef>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [disableTyping, setDisableTyping] = useState(false);
  const [mathOpen, setMathOpen] = useState(true);

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
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
        <button className="btn" onClick={() => setMathOpen((v) => !v)}>
          {mathOpen ? '关闭公式转换' : '开启公式转换'}
        </button>
        <button className="btn" onClick={() => setDisableTyping((v) => !v)}>
          {disableTyping ? '开启打字效果' : '关闭打字效果'}
        </button>
      </div>
      <DsMarkdown
        ref={markdownRef}
        interval={20}
        answerType="answer"
        theme={theme}
        plugins={mathOpen ? [katexPlugin] : []}
        math={{ splitSymbol: 'dollar' }}
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
  );
};

export default MathSupportDemo;
