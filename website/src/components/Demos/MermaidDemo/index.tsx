import React, { useRef, useState, useEffect } from 'react';
import Markdown, { type MarkdownRef } from 'ds-markdown';
import { ConfigProvider } from 'ds-markdown';
import mermaidPlugin from 'ds-markdown-mermaid-plugin';
import { useI18n } from '../../../../src/hooks/useI18n';
import zhMarkdown from './markdown.md?raw';
import enMarkdown from './markdown.en.md?raw';
import 'ds-markdown/style.css';

const MermaidDemo: React.FC = () => {
  const markdownRef = useRef<MarkdownRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [disableTyping, setDisableTyping] = useState(false);
  const { t, lang } = useI18n();
  const markdown = lang === 'zh' ? zhMarkdown : enMarkdown;
  const mermaidConfig = {
    flowchart: { useMaxWidth: true, htmlLabels: true },
  };

  const handleStart = () => {
    if (isStarted) {
      markdownRef.current?.restart();
    } else {
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
    <div ref={containerRef} className={`demo-impl ${theme === 'dark' ? 'demo-impl-dark' : 'demo-impl-light'}`}>
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
      <ConfigProvider mermaidConfig={mermaidConfig}>
        <Markdown
          ref={markdownRef}
          interval={5}
          answerType="answer"
          theme={theme}
          disableTyping={disableTyping}
          autoStartTyping={false}
          plugins={[mermaidPlugin]}
          onStart={handleTypingStart}
          onEnd={handleTypingEnd}
        >
          {markdown}
        </Markdown>
      </ConfigProvider>
    </div>
  );
};

export default MermaidDemo;
