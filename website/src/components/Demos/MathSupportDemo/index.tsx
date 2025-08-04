import React, { useRef, useState, useEffect } from 'react';
import DsMarkdown, { type MarkdownRef } from 'ds-markdown';
import { katexPlugin } from 'ds-markdown/plugins';
import { useI18n } from '../../../../src/hooks/useI18n';

interface DemoProps {
  markdown: string;
}

// 数学公式演示组件
const MathSupportDemo: React.FC<DemoProps> = ({ markdown }) => {
  const markdownRef = useRef<MarkdownRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [disableTyping, setDisableTyping] = useState(false);
  const [mathOpen, setMathOpen] = useState(true);
  const { t } = useI18n();

  // 视口检测
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isStarted) {
          setIsInViewport(true);
          // 延迟一点开始打字，给用户一个视觉缓冲
          setTimeout(() => {
            handleStart();
          }, 500);
        }
      },
      {
        threshold: 0.3, // 当30%的内容可见时触发
        rootMargin: '0px 0px -100px 0px', // 提前100px触发
      },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isStarted]);

  // 事件处理函数
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

  const handleToggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleToggleMath = () => {
    setMathOpen(!mathOpen);
  };

  const handleToggleTyping = () => {
    setDisableTyping(!disableTyping);
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
      <DsMarkdown
        ref={markdownRef}
        interval={20}
        answerType="answer"
        theme={theme}
        plugins={mathOpen ? [katexPlugin] : []}
        math={{ splitSymbol: 'dollar' }}
        disableTyping={disableTyping}
        autoStartTyping={false}
        onStart={handleTypingStart}
        onEnd={handleTypingEnd}
      >
        {markdown}
      </DsMarkdown>
    </div>
  );
};

export default MathSupportDemo;
