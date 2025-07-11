import React, { useState, useRef, useCallback } from 'react';
import DsMarkdown, { type MarkdownRef } from 'ds-markdown';
import { katexPlugin } from 'ds-markdown/plugins';
import { useI18n } from '../../../../src/hooks/useI18n';
import { ConfigSection, StatusCard, ControlButtons, ConfigItem } from './components';
import './TypingAnimationDemo.css';

interface DemoProps {
  markdown: string;
}

interface TypingStats {
  currentIndex: number;
  currentChar: string;
  percent: number;
  totalChars: number;
  startTime?: number;
  avgSpeed: number;
}

interface ComponentConfig {
  interval: number;
  timerType: 'setTimeout' | 'requestAnimationFrame';
  answerType: 'thinking' | 'answer';
  theme: 'light' | 'dark';
  disableTyping: boolean;
  autoStartTyping: boolean;
  mathEnabled: boolean;
}

interface ITypedChar {
  currentIndex: number;
  currentChar: string;
  answerType: 'thinking' | 'answer';
  prevStr: string;
  currentStr: string;
  percent: number;
}

interface IBeforeTypedChar {
  currentIndex: number;
  currentChar: string;
  answerType: 'thinking' | 'answer';
  prevStr: string;
  percent: number;
}

interface StartData {
  timestamp: number;
}

interface EndData {
  manual?: boolean;
}

const DEFAULT_CONFIG: TypingStats = {
  currentIndex: 0,
  currentChar: '',
  percent: 0,
  totalChars: 0,
  avgSpeed: 0,
};

// 全面的打字动画演示组件
const TypingAnimationDemo: React.FC<DemoProps> = ({ markdown }) => {
  const markdownRef = useRef<MarkdownRef>(null);
  const { t } = useI18n();

  // 组件配置状态
  const [config, setConfig] = useState<ComponentConfig>({
    interval: 30,
    timerType: 'setTimeout',
    answerType: 'answer',
    theme: 'light',
    disableTyping: false,
    autoStartTyping: false,
    mathEnabled: true,
  });

  // 组件运行状态
  const [isTyping, setIsTyping] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const resetStatus = () => {
    setIsTyping(false);
    setIsStopped(false);
    setIsStarted(false);
    setTypingStats(DEFAULT_CONFIG);
    setCallbackData({});
    setPerformanceMetrics({
      frameCount: 0,
      avgFrameTime: 0,
      lastFrameTime: 0,
    });
  };

  // 打字统计数据
  const [typingStats, setTypingStats] = useState<TypingStats>(DEFAULT_CONFIG);

  // 回调数据展示
  const [callbackData, setCallbackData] = useState<{
    onStart?: StartData;
    onEnd?: EndData;
    onBeforeTypedChar?: IBeforeTypedChar;
    onTypedChar?: ITypedChar;
  }>({});

  // 性能监控
  const [performanceMetrics, setPerformanceMetrics] = useState({
    frameCount: 0,
    avgFrameTime: 0,
    lastFrameTime: 0,
  });

  // 配置更新函数
  const updateConfig = useCallback((key: keyof ComponentConfig, value: string | number | boolean) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }, []);

  // 需要重新渲染的配置项key
  const rerenderKey = `${config.timerType}-${config.autoStartTyping}-${config.answerType}`;

  // 回调函数定义
  const handleStart = useCallback(() => {
    const startData = { timestamp: Date.now() };
    setCallbackData((prev) => ({ ...prev, onStart: startData }));
    setIsTyping(true);
    setTypingStats((prev) => ({ ...prev, startTime: Date.now() }));
    setPerformanceMetrics({ frameCount: 0, avgFrameTime: 0, lastFrameTime: Date.now() });
  }, []);

  const handleEnd = useCallback((data?: { manual?: boolean }) => {
    setCallbackData((prev) => ({ ...prev, onEnd: data }));
    if (!data?.manual) {
      setIsTyping(false);
      setIsStopped(false);
    }
  }, []);

  const handleBeforeTypedChar = useCallback(async (data?: IBeforeTypedChar) => {
    if (!data) return;
    setCallbackData((prev) => ({ ...prev, onBeforeTypedChar: data }));

    // 性能监控
    const now = Date.now();
    setPerformanceMetrics((prev) => {
      const frameTime = now - prev.lastFrameTime;
      const newFrameCount = prev.frameCount + 1;
      const newAvgFrameTime = (prev.avgFrameTime * prev.frameCount + frameTime) / newFrameCount;

      return {
        frameCount: newFrameCount,
        avgFrameTime: newAvgFrameTime,
        lastFrameTime: now,
      };
    });

    // 模拟特殊字符的延迟效果
    if (data.currentChar === '!' || data.currentChar === '?') {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }, []);

  const handleTypedChar = useCallback((data?: ITypedChar) => {
    if (!data) return;
    setCallbackData((prev) => ({ ...prev, onTypedChar: data }));

    // 更新打字统计
    setTypingStats((prev) => {
      const elapsed = (Date.now() - (prev.startTime || Date.now())) / 1000;
      const avgSpeed = elapsed > 0 ? data.currentIndex / elapsed : 0;

      return {
        currentIndex: data.currentIndex,
        currentChar: data.currentChar,
        percent: data.percent,
        totalChars: data.currentIndex + 1,
        startTime: prev.startTime,
        avgSpeed,
      };
    });
  }, []);

  // 控制函数
  const handleStartDemo = () => {
    if (isStarted) {
      markdownRef.current?.restart?.();
    } else {
      markdownRef.current?.start?.();
      setIsStarted(true);
    }
    setIsTyping(true);
    setIsStopped(false);
  };

  const handleStop = () => {
    markdownRef.current?.stop?.();
    setIsTyping(false);
    setIsStopped(true);
  };

  const handleResume = () => {
    markdownRef.current?.resume?.();
    setIsTyping(true);
    setIsStopped(false);
  };

  return (
    <div className={`demo-impl ${config.theme === 'dark' ? 'demoImplDark' : 'demoImplLight'}`}>
      {/* 配置面板 */}
      <div className="configPanel">
        <h4 className="sectionTitle">{t('configPanelTitle')}</h4>
        {/* 第一组：实时生效的配置 */}
        <ConfigSection title={t('realtimeConfigTitle')} style={{ marginBottom: 16 }}>
          <div className="selectGrid">
            {/* 间隔控制 */}
            <ConfigItem label={t('intervalLabel')}>
              <input type="range" min="5" max="2000" value={config.interval} onChange={(e) => updateConfig('interval', parseInt(e.target.value))} style={{ width: '100%' }} />
              <span className="text-muted" style={{ fontSize: 12 }}>
                {config.interval}ms
              </span>
            </ConfigItem>
            {/* 主题 */}
            <ConfigItem label={t('themeLabel')}>
              <select className="select-control" value={config.theme} onChange={(e) => updateConfig('theme', e.target.value)}>
                <option value="light">{t('lightTheme')}</option>
                <option value="dark">{t('darkTheme')}</option>
              </select>
            </ConfigItem>
          </div>
          {/* 实时开关 */}
          <div className="flexWrap" style={{ marginTop: 12 }}>
            <label className="selectLabel">
              <input type="checkbox" checked={config.disableTyping} onChange={(e) => updateConfig('disableTyping', e.target.checked)} />
              <span className="select-label">{t('disableTypingLabel')}</span>
            </label>
            <label className="selectLabel">
              <input type="checkbox" checked={config.mathEnabled} onChange={(e) => updateConfig('mathEnabled', e.target.checked)} />
              <span className="select-label">{t('mathEnabledLabel')}</span>
            </label>
          </div>
        </ConfigSection>
        {/* 第二组：需要重新渲染的配置 */}
        <div className={`rerenderPanel${config.theme === 'dark' ? ' rerenderPanelDark' : ''}`}>
          <h5 className="sectionSubTitle sectionSubTitlePink">{t('rerenderConfigTitle')}</h5>
          <p className="description-text" style={{ fontSize: 12, margin: '0 0 12px 0' }}>
            {t('rerenderConfigDescription')}
          </p>
          <div className="selectGrid">
            {/* 定时器类型 */}
            <ConfigItem label={t('timerTypeLabel')}>
              <select
                className="select-control"
                value={config.timerType}
                onChange={(e) => {
                  updateConfig('timerType', e.target.value);
                  resetStatus();
                }}
              >
                <option value="setTimeout">{t('setTimeout')}</option>
                <option value="requestAnimationFrame">{t('requestAnimationFrame')}</option>
              </select>
            </ConfigItem>
          </div>
          {/* 重新渲染开关 */}
          <div className="flexWrap" style={{ marginTop: 12 }}>
            <label className="selectLabel">
              <input
                type="checkbox"
                checked={config.autoStartTyping}
                onChange={(e) => {
                  updateConfig('autoStartTyping', e.target.checked);
                  resetStatus();
                }}
              />
              <span className="select-label">{t('autoStartTypingLabel')}</span>
            </label>
          </div>
          {/* 内容类型 */}
          <ConfigItem label={t('contentTypeLabel')}>
            <select
              className="select-control"
              value={config.answerType}
              onChange={(e) => {
                updateConfig('answerType', e.target.value);
                resetStatus();
              }}
            >
              <option value="answer">{t('answerOption')}</option>
              <option value="thinking">{t('thinkingOption')}</option>
            </select>
          </ConfigItem>
        </div>
      </div>
      {/* 控制按钮 */}
      <ControlButtons isStarted={isStarted} isTyping={isTyping} isStopped={isStopped} onStart={handleStartDemo} onStop={handleStop} onResume={handleResume} t={t} />
      {/* 实时状态监控 */}
      <div className="statusPanels">
        {/* 打字统计 */}
        <StatusCard title={t('typingStatsTitle')} theme={config.theme}>
          {/* 进度条 */}
          <div className="progressBar">
            <div className="progressLabel">
              <span>{t('progress')}</span>
              <span>{typingStats.percent.toFixed(1)}%</span>
            </div>
            <input type="range" min={0} max={100} value={typingStats.percent} style={{ width: '100%' }} readOnly />
          </div>
          <div>
            {t('currentChar')}: "{typingStats.currentChar}"
          </div>
          <div>
            {t('totalChars')}: {typingStats.totalChars}
          </div>
          <div>
            {t('averageSpeed')}: {typingStats.avgSpeed.toFixed(1)} {t('charsPerSecond')}
          </div>
        </StatusCard>
        {/* 性能监控 */}
        <StatusCard title={t('performanceMonitorTitle')} theme={config.theme}>
          <div>
            {t('frameCount')}: {performanceMetrics.frameCount}
          </div>
          <div>
            {t('averageFrameTime')}: {performanceMetrics.avgFrameTime.toFixed(1)}ms
          </div>
          <div>
            {t('timer')}: {config.timerType}
          </div>
          <div>
            {t('status')}: {isTyping ? t('statusPlaying') : t('statusStopped')}
          </div>
        </StatusCard>
        {/* 最新回调数据 */}
        <StatusCard title={t('callbackDataTitle')} theme={config.theme}>
          <div>
            {t('onTypedChar')}: {callbackData.onTypedChar?.currentChar || '-'}
          </div>
          <div>
            {t('progress')}: {callbackData.onTypedChar?.percent?.toFixed(1) || 0}%
          </div>
          <div>
            {t('index')}: {callbackData.onTypedChar?.currentIndex || 0}
          </div>
          <div>
            {t('type')}: {callbackData.onTypedChar?.answerType || config.answerType}
          </div>
        </StatusCard>
      </div>
      {/* 渲染区域 */}
      <div>
        <DsMarkdown
          key={rerenderKey}
          ref={markdownRef}
          interval={config.interval}
          timerType={config.timerType}
          answerType={config.answerType}
          theme={config.theme}
          disableTyping={config.disableTyping}
          autoStartTyping={config.autoStartTyping}
          plugins={config.mathEnabled ? [katexPlugin] : []}
          math={{ splitSymbol: 'dollar' }}
          onStart={handleStart}
          onEnd={handleEnd}
          onBeforeTypedChar={handleBeforeTypedChar}
          onTypedChar={handleTypedChar}
        >
          {markdown}
        </DsMarkdown>
      </div>
    </div>
  );
};

export default TypingAnimationDemo;
