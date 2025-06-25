import React, { useState, useRef } from 'react';
import DsMarkdown, { MarkdownRef } from 'ds-markdown';
import { katexPlugin } from 'ds-markdown/plugins';

interface DemoProps {
  markdown: string;
}

const CustomThemeDemo: React.FC<DemoProps> = ({ markdown }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const markdownRef = useRef<MarkdownRef>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [mathOpen, setMathOpen] = useState(true);
  const [disableTyping, setDisableTyping] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // 根据当前主题替换占位符
  const markdownContent = markdown.replace('{{THEME}}', theme === 'light' ? '亮色' : '暗色');

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <button
          className="btn"
          onClick={toggleTheme}
          style={{
            background: theme === 'dark' ? '#4a5568' : '#667eea',
            marginRight: '10px',
          }}
        >
          切换为{theme === 'light' ? '暗色' : '亮色'}主题
        </button>
        <span
          style={{
            padding: '8px 12px',
            background: theme === 'dark' ? '#2d3748' : '#f7fafc',
            color: theme === 'dark' ? '#e2e8f0' : '#2d3748',
            borderRadius: '4px',
            fontSize: '14px',
          }}
        >
          当前: {theme === 'light' ? '☀️ 亮色模式' : '🌙 暗色模式'}
        </span>
        <button className="btn" onClick={() => setMathOpen((v) => !v)}>
          {mathOpen ? '关闭公式转换' : '开启公式转换'}
        </button>
        <button className="btn" onClick={() => setDisableTyping((v) => !v)}>
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
      </div>
      <div>
        <DsMarkdown
          ref={markdownRef}
          interval={20}
          answerType="answer"
          theme={theme}
          plugins={mathOpen ? [katexPlugin] : []}
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
          {markdownContent}
        </DsMarkdown>
      </div>
    </div>
  );
};

export default CustomThemeDemo;
