import React, { useRef, useState } from 'react';
import DsMarkdown, { type MarkdownRef } from 'ds-markdown';
import { useI18n } from '../../../../src/hooks/useI18n';

interface DemoProps {
  markdown: string;
}

// 基础用法演示组件
const BasicUsageDemo: React.FC<DemoProps> = ({ markdown }) => {
  const markdownRef = useRef<MarkdownRef>(null);
  const [isTyping, setIsTyping] = useState(true);
  const [isStopped, setIsStopped] = useState(false);
  const [isStarted, setIsStarted] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [disableTyping, setDisableTyping] = useState(false);
  const { t } = useI18n();

  // 事件处理函数
  const handleStart = () => {
    if (isStarted) {
      // 如果已经开始过，则重新开始
      markdownRef.current?.restart();
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

  const handleToggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleToggleTyping = () => {
    setDisableTyping((v) => !v);
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
      <div className="demo-controls">
        <button className="btn btn-success" onClick={handleStart} disabled={isStopped}>
          {isStarted ? t('restart') : t('start')}
        </button>
        <button className="btn btn-danger" onClick={handleStop} disabled={!isTyping || isStopped}>
          {t('stop')}
        </button>
        <button className="btn btn-warning" onClick={handleResume} disabled={!isStopped}>
          {t('resume')}
        </button>
        <button className="btn btn-secondary" onClick={handleToggleTheme}>
          {theme === 'light' ? t('themeDark') : t('themeLight')}
        </button>
        <button className="btn btn-outline" onClick={handleToggleTyping}>
          {disableTyping ? t('enableTyping') : t('disableTyping')}
        </button>
      </div>
      <DsMarkdown ref={markdownRef} interval={25} answerType="answer" theme={theme} disableTyping={disableTyping} autoStartTyping={true} onStart={handleTypingStart} onEnd={handleTypingEnd}>
        {markdown}
      </DsMarkdown>
    </div>
  );
};

export default BasicUsageDemo;
