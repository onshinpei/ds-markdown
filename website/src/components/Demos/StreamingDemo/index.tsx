import React, { useRef, useState } from 'react';
import { MarkdownCMD, MarkdownCMDRef } from 'ds-markdown';
import { useI18n } from '../../../../src/hooks/useI18n';
import { streamingData as zhStreamingData } from './streamingData';
import { streamingData as enStreamingData } from './streamingData.en';
import type { StreamingType } from './types';

interface DemoProps {
  markdown: string;
}

// 流式演示组件
const StreamingDemo: React.FC<DemoProps> = ({ markdown }) => {
  const markdownRef = useRef<MarkdownCMDRef>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [streamingType, setStreamingType] = useState<StreamingType>('ai-chat');
  const { t, lang } = useI18n();

  // 根据语言获取流式数据
  const getStreamingData = () => {
    return lang === 'zh' ? zhStreamingData : enStreamingData;
  };

  // 事件处理函数
  const handleStartStreaming = async () => {
    if (isStreaming) return;

    setIsStreaming(true);
    setIsStopped(false);
    markdownRef.current?.clear();

    const streamingData = getStreamingData();
    const data = streamingData[streamingType];

    for (const item of data) {
      if (isStopped) break;

      // 模拟网络延迟
      await new Promise((resolve) => setTimeout(resolve, 50 + Math.random() * 100));

      if (item.type === 'thinking') {
        markdownRef.current?.push(item.content, 'thinking');
        // 思考时间稍长
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } else {
        markdownRef.current?.push(item.content, 'answer');
      }
    }

    setIsStreaming(false);
  };

  const handleStop = () => {
    markdownRef.current?.stop();
    setIsStopped(true);
    setIsStreaming(false);
  };

  const handleResume = () => {
    markdownRef.current?.resume();
    setIsStopped(false);
    setIsStreaming(true);
  };

  const handleClear = () => {
    markdownRef.current?.clear();
    setIsStreaming(false);
    setIsStopped(false);
  };

  const handleToggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleStreamingTypeChange = (type: StreamingType) => {
    setStreamingType(type);
    handleClear();
  };

  const handleTypingStart = () => {
    setIsStreaming(true);
  };

  const handleTypingEnd = (data?: { manual?: boolean }) => {
    if (!data?.manual) {
      setIsStreaming(false);
      setIsStopped(false);
    }
  };

  return (
    <div className={`demo-impl ${theme === 'dark' ? 'demo-impl-dark' : 'demo-impl-light'}`}>
      <div style={{ marginBottom: 16, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div className="select-wrapper" style={{ marginRight: 16 }}>
          <label className="select-label">{t('selectScene')}</label>
          <select className="select-control" value={streamingType} onChange={(e) => handleStreamingTypeChange(e.target.value as StreamingType)} disabled={isStreaming}>
            <option value="ai-chat">{t('aiChat')}</option>
            <option value="code-generation">{t('codeGen')}</option>
            <option value="documentation">{t('docGen')}</option>
          </select>
        </div>
        <button className="btn btn-success" onClick={handleStartStreaming} disabled={isStreaming}>
          {t('startDemo')}
        </button>
        <button className="btn btn-danger" onClick={handleStop} disabled={!isStreaming}>
          {t('stop')}
        </button>
        <button className="btn btn-warning" onClick={handleResume} disabled={!isStopped}>
          {t('resume')}
        </button>
        <button className="btn btn-secondary" onClick={handleClear}>
          {t('clear')}
        </button>
        <button className="btn btn-outline" onClick={handleToggleTheme}>
          {theme === 'light' ? t('themeDark') : t('themeLight')}
        </button>
      </div>

      <MarkdownCMD ref={markdownRef} interval={15} timerType="setTimeout" theme={theme} autoStartTyping={true} onStart={handleTypingStart} onEnd={handleTypingEnd} />
    </div>
  );
};

export default StreamingDemo;
