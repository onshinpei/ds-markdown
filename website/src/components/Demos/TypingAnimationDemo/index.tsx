import React, { useState, useRef, useCallback } from 'react';
import DsMarkdown, { type MarkdownRef } from 'ds-markdown';
import { katexPlugin } from 'ds-markdown/plugins';
import { propsData, dsMarkdownMethods, iTypedCharData, iBeforeTypedCharData } from '../../ApiDocumentation/apiData';

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

// 全面的打字动画演示组件
const TypingAnimationDemo: React.FC<DemoProps> = ({ markdown }) => {
  const markdownRef = useRef<MarkdownRef>(null);

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

  // 打字统计数据
  const [typingStats, setTypingStats] = useState<TypingStats>({
    currentIndex: 0,
    currentChar: '',
    percent: 0,
    totalChars: 0,
    avgSpeed: 0,
  });

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

  // 演示用的丰富Markdown内容
  const getDemoContent = () => {
    return `# 🚀 全面API演示

这个演示展示了 **ds-markdown** 的所有核心功能和特性。

## ⌨️ 打字效果特性

### 🎛️ 可配置参数
1. **interval**: 控制打字速度，支持 5-200ms 范围调节
2. **timerType**: 两种模式
   - 🎬 **requestAnimationFrame** - 流畅动画，适合现代应用
   - ⏰ **setTimeout** - 精确计时，适合兼容性要求
3. **theme**: 主题切换
   - ☀️ **light** - 亮色主题，适合日间使用
   - 🌙 **dark** - 暗色主题，适合夜间使用
4. **answerType**: 内容类型
   - 💬 **answer** - 回答模式
   - 🤔 **thinking** - 思考模式

### 🎮 控制方法
支持以下 ref 方法：
- \`start()\` - 开始打字动画
- \`stop()\` - 暂停打字动画
- \`resume()\` - 继续打字动画
- \`restart()\` - 重新开始动画

### 🔄 回调函数监控
- **onStart**: 打字开始时触发
- **onEnd**: 打字结束时触发
- **onBeforeTypedChar**: 每个字符打字前触发
- **onTypedChar**: 每个字符打字后触发

实时监控打字过程中的所有事件和数据变化。

## 🧮 数学公式演示
这里有一些数学公式：

行内公式：$E = mc^2$

块级公式：
$$\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}$$

勾股定理：$a^2 + b^2 = c^2$

## 💡 最佳实践建议

### 性能优化
- 推荐使用 **requestAnimationFrame** 模式
- 间隔设置为 **15-30ms** 获得最佳体验
- 高频场景下启用 RAF 模式处理多字符

### 用户体验
- 根据使用环境选择合适的主题
- 根据内容类型选择合适的 answerType
- 利用回调函数添加自定义交互效果

### 代码示例

\`\`\`typescript
import DsMarkdown from 'ds-markdown';
import { katexPlugin } from 'ds-markdown/plugins';

<DsMarkdown
  interval={30}
  timerType="requestAnimationFrame"
  theme="light"
  plugins={[katexPlugin]}
  onTypedChar={(data) => {
    console.log('当前字符:', data.currentChar);
    console.log('进度:', data.percent);
  }}
>
  # Hello World
  这是一个**打字动画**示例。
</DsMarkdown>
\`\`\`

> 🎯 这是一个完整的功能演示，展示了库的所有核心特性！

## 🔧 技术特性

### 类型安全
- 完整的 TypeScript 类型定义
- 智能代码提示和错误检查
- 类型安全的 ref 方法调用

### 插件系统
- 支持 remark/rehype 插件
- 内置 KaTeX 数学公式支持
- 可扩展的插件架构

### 性能监控
- 实时帧率监控
- 打字速度统计
- 内存使用优化

这个演示让你可以实时体验和调试所有功能特性！`;
  };

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
    <div className={`demo-impl ${config.theme === 'dark' ? 'demo-impl-dark' : 'demo-impl-light'}`}>
      {/* 配置面板 */}
      <div style={{ marginBottom: 20, padding: 16, background: config.theme === 'dark' ? '#2d3748' : '#f7fafc', borderRadius: 8 }}>
        <h4 style={{ margin: '0 0 12px 0', color: config.theme === 'dark' ? '#e2e8f0' : '#2d3748' }}>🎛️ 实时配置面板</h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
          {/* 间隔控制 */}
          <div className="select-wrapper">
            <label className="select-label">间隔 (ms):</label>
            <input type="range" min="5" max="2000" value={config.interval} onChange={(e) => updateConfig('interval', parseInt(e.target.value))} style={{ width: '100%' }} />
            <span style={{ fontSize: 12, color: config.theme === 'dark' ? '#a0aec0' : '#718096' }}>{config.interval}ms</span>
          </div>

          {/* 定时器类型 */}
          <div className="select-wrapper">
            <label className="select-label">定时器类型:</label>
            <select className="select-control" value={config.timerType} onChange={(e) => updateConfig('timerType', e.target.value)}>
              <option value="setTimeout">setTimeout</option>
              <option value="requestAnimationFrame">requestAnimationFrame</option>
            </select>
          </div>

          {/* 主题 */}
          <div className="select-wrapper">
            <label className="select-label">主题:</label>
            <select className="select-control" value={config.theme} onChange={(e) => updateConfig('theme', e.target.value)}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          {/* 内容类型 */}
          <div className="select-wrapper">
            <label className="select-label">内容类型:</label>
            <select className="select-control" value={config.answerType} onChange={(e) => updateConfig('answerType', e.target.value)}>
              <option value="answer">Answer</option>
              <option value="thinking">Thinking</option>
            </select>
          </div>
        </div>

        {/* 布尔开关 */}
        <div style={{ marginTop: 12, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <input type="checkbox" checked={config.disableTyping} onChange={(e) => updateConfig('disableTyping', e.target.checked)} />
            <span className="select-label">禁用打字效果</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <input type="checkbox" checked={config.autoStartTyping} onChange={(e) => updateConfig('autoStartTyping', e.target.checked)} />
            <span className="select-label">自动开始</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <input type="checkbox" checked={config.mathEnabled} onChange={(e) => updateConfig('mathEnabled', e.target.checked)} />
            <span className="select-label">数学公式</span>
          </label>
        </div>
      </div>

      {/* 控制按钮 */}
      <div style={{ marginBottom: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button className="btn btn-success" onClick={handleStartDemo} disabled={isStopped}>
          {isStarted ? '🔄 重新开始' : '▶️ 开始演示'}
        </button>
        <button className="btn btn-danger" onClick={handleStop} disabled={!isTyping || isStopped}>
          ⏹️ 停止
        </button>
        <button className="btn btn-warning" onClick={handleResume} disabled={!isStopped}>
          ⏭️ 继续
        </button>
      </div>

      {/* 实时状态监控 */}
      <div style={{ marginBottom: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 12 }}>
        {/* 打字统计 */}
        <div
          style={{
            padding: 12,
            background: config.theme === 'dark' ? '#1a202c' : '#fff',
            borderRadius: 8,
            border: `1px solid ${config.theme === 'dark' ? '#2d3748' : '#e2e8f0'}`,
          }}
        >
          <h5 style={{ margin: '0 0 8px 0', color: config.theme === 'dark' ? '#e2e8f0' : '#2d3748' }}>📊 打字统计</h5>
          <div style={{ fontSize: 12, lineHeight: 1.5, color: config.theme === 'dark' ? '#a0aec0' : '#718096' }}>
            {/* 进度条 */}
            <div style={{ marginBottom: 8 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 4,
                }}
              >
                <span>进度</span>
                <span>{typingStats.percent.toFixed(1)}%</span>
              </div>
              <input type="range" min={0} max={100} value={typingStats.percent} style={{ width: '100%' }} />
            </div>
            <div>当前字符: "{typingStats.currentChar}"</div>
            <div>总字符: {typingStats.totalChars}</div>
            <div>平均速度: {typingStats.avgSpeed.toFixed(1)} 字符/秒</div>
          </div>
        </div>

        {/* 性能监控 */}
        <div
          style={{
            padding: 12,
            background: config.theme === 'dark' ? '#1a202c' : '#fff',
            borderRadius: 8,
            border: `1px solid ${config.theme === 'dark' ? '#2d3748' : '#e2e8f0'}`,
          }}
        >
          <h5 style={{ margin: '0 0 8px 0', color: config.theme === 'dark' ? '#e2e8f0' : '#2d3748' }}>⚡ 性能监控</h5>
          <div style={{ fontSize: 12, lineHeight: 1.5, color: config.theme === 'dark' ? '#a0aec0' : '#718096' }}>
            <div>帧数: {performanceMetrics.frameCount}</div>
            <div>平均帧时间: {performanceMetrics.avgFrameTime.toFixed(1)}ms</div>
            <div>定时器: {config.timerType}</div>
            <div>状态: {isTyping ? '🟢 运行中' : '🔴 已停止'}</div>
          </div>
        </div>

        {/* 最新回调数据 */}
        <div
          style={{
            padding: 12,
            background: config.theme === 'dark' ? '#1a202c' : '#fff',
            borderRadius: 8,
            border: `1px solid ${config.theme === 'dark' ? '#2d3748' : '#e2e8f0'}`,
          }}
        >
          <h5 style={{ margin: '0 0 8px 0', color: config.theme === 'dark' ? '#e2e8f0' : '#2d3748' }}>🔄 回调数据</h5>
          <div style={{ fontSize: 12, lineHeight: 1.5, color: config.theme === 'dark' ? '#a0aec0' : '#718096' }}>
            <div>onTypedChar: {callbackData.onTypedChar?.currentChar || '-'}</div>
            <div>进度: {callbackData.onTypedChar?.percent?.toFixed(1) || 0}%</div>
            <div>索引: {callbackData.onTypedChar?.currentIndex || 0}</div>
            <div>类型: {callbackData.onTypedChar?.answerType || config.answerType}</div>
          </div>
        </div>
      </div>

      {/* 渲染区域 */}
      <div>
        <DsMarkdown
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
          {getDemoContent()}
        </DsMarkdown>
      </div>
    </div>
  );
};

export default TypingAnimationDemo;
