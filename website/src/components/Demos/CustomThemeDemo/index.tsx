import React, { useState, useRef } from 'react';
import DsMarkdown, { type MarkdownRef } from 'ds-markdown';
import { katexPlugin } from 'ds-markdown/plugins';
import { useI18n } from '../../../../src/hooks/useI18n';

interface DemoProps {
  markdown: string;
}

const CustomThemeDemo: React.FC<DemoProps> = ({ markdown }) => {
  const { t } = useI18n();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const markdownRef = useRef<MarkdownRef>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [mathOpen, setMathOpen] = useState(true);
  const [disableTyping, setDisableTyping] = useState(false);

  // 事件处理函数
  const handleToggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleToggleMath = () => {
    setMathOpen(!mathOpen);
  };

  const handleToggleTyping = () => {
    setDisableTyping(!disableTyping);
  };

  const handleStart = () => {
    if (isStarted) {
      // 如果已经开始过，则重新开始
      markdownRef.current?.start();
    } else {
      // 第一次开始
      markdownRef.current?.start();
      setIsStarted(true);
    }
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

  const handleTypingStart = () => {
    setIsTyping(true);
  };

  const handleTypingEnd = (data?: { manual?: boolean }) => {
    if (!data?.manual) {
      setIsTyping(false);
      setIsStopped(false);
    }
  };

  // 根据当前主题替换占位符
  const markdownContent = markdown.replace('{{THEME}}', theme === 'light' ? '亮色' : '暗色');

  return (
    <div className={`demo-impl ${theme === 'dark' ? 'demo-impl-dark' : 'demo-impl-light'}`}>
      <div style={{ marginBottom: 16, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <button
          className="btn btn-primary btn-round"
          onClick={handleToggleTheme}
          style={{
            background: theme === 'dark' ? 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            marginRight: '10px',
          }}
        >
          {theme === 'light' ? t('switchToDark') : t('switchToLight')}
        </button>
        <span
          style={{
            padding: '8px 12px',
            background: theme === 'dark' ? '#2d3748' : '#f7fafc',
            color: theme === 'dark' ? '#e2e8f0' : '#2d3748',
            borderRadius: '8px',
            fontSize: '14px',
            border: `1px solid ${theme === 'dark' ? '#4a5568' : '#e2e8f0'}`,
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          {theme === 'light' ? t('themeLight') : t('themeDark')}
        </span>
        <button className="btn btn-primary" onClick={handleToggleMath}>
          {mathOpen ? t('disableMath') : t('enableMath')}
        </button>
        <button className="btn btn-outline" onClick={handleToggleTyping}>
          {disableTyping ? t('enableTyping') : t('disableTyping')}
        </button>
        <button className="btn btn-success" onClick={handleStart} disabled={isStopped}>
          {isStarted ? t('restart') : t('start')}
        </button>
        <button className="btn btn-danger" onClick={handleStop} disabled={!isTyping || isStopped}>
          {t('stop')}
        </button>
        <button className="btn btn-warning" onClick={handleResume} disabled={!isStopped}>
          {t('resume')}
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
          onStart={handleTypingStart}
          onEnd={handleTypingEnd}
        >
          {markdownContent}
        </DsMarkdown>
      </div>
    </div>
  );
};

export default CustomThemeDemo;
