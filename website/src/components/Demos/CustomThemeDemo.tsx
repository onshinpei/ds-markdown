import React, { useState } from 'react';
import DsMarkdown from 'ds-markdown';
import { sourceCodeExamples } from '../../sourceCode';

// 自定义主题演示组件
const CustomThemeDemo: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // 根据当前主题替换占位符
  const markdownContent = sourceCodeExamples.themeSwitch.markdownString.replace('{{THEME}}', theme === 'light' ? '亮色' : '暗色');

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
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
      </div>
      <div
        style={{
          background: theme === 'dark' ? '#1a202c' : 'white',
          padding: '20px',
          borderRadius: '8px',
          border: `1px solid ${theme === 'dark' ? '#2d3748' : '#e2e8f0'}`,
        }}
      >
        <DsMarkdown interval={20} answerType="answer" theme={theme} disableTyping={false}>
          {markdownContent}
        </DsMarkdown>
      </div>
    </div>
  );
};

export default CustomThemeDemo;
