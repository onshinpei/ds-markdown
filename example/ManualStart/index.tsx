import { useMemo, useRef, useState } from 'react';

import Markdown, { MarkdownRef } from '../../src';
import dataJson from './data.json';

import 'katex/dist/katex.min.css';
import { katexPlugin } from '../../src/plugins';
import { replaceMathBracket } from '../../src/utils/remarkMathBracket';

function throttle<T extends unknown[]>(fn: (...args: T) => void, delay: number) {
  let lastTime = 0;
  return (...args: T) => {
    const now = Date.now();
    if (now - lastTime > delay) {
      fn(...args);
      lastTime = now;
    }
  };
}

const App: React.FC<{
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}> = ({ theme, setTheme }) => {
  const [disableTyping, setDisableTyping] = useState(false);
  const messageDivRef = useRef<HTMLDivElement>(null!);
  const [isStartTyping, setIsStartTyping] = useState(false);
  const [isStopTyping, setIsStopTyping] = useState(false);
  const markdownRef = useRef<MarkdownRef>(null!);

  const [mathOpen, setMathOpen] = useState(true);

  const scrollCacheRef = useRef<{
    type: 'manual' | 'auto';
    needAutoScroll: boolean;
    prevScrollTop: number;
  }>({
    type: 'manual',
    needAutoScroll: true,
    prevScrollTop: 0,
  });

  const answerContent = dataJson.content;

  const throttleOnTypedChar = useMemo(() => {
    return throttle(() => {
      if (!scrollCacheRef.current.needAutoScroll) return;
      const messageDiv = messageDivRef.current;
      // 自动滑动到最底部
      if (messageDiv) {
        messageDiv.scrollTo({
          top: messageDiv.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, 50);
  }, []);

  const onScroll = useMemo(() => {
    return throttle((e: React.UIEvent<HTMLDivElement>) => {
      // 如果是往上滚动，则说明是手动滚动，则需要停止自动向下滚动
      // console.log(e.currentTarget.scrollTop - scrollCacheRef.current.prevScrollTop);
      if (e.currentTarget.scrollTop < scrollCacheRef.current.prevScrollTop) {
        scrollCacheRef.current.needAutoScroll = false;
      }
      scrollCacheRef.current.prevScrollTop = e.currentTarget.scrollTop;
    }, 50);
  }, []);

  const interval = 5;
  const flag = true;
  const timerType = flag ? 'requestAnimationFrame' : 'setTimeout';

  return (
    <>
      <div className="ds-message-actions">
        <div className="theme-btns">
          {/* <button
            className="theme-btn"
            onClick={() => {
              if (isStartTyping) {
                markdownRef.current.stop();
              } else {
                markdownRef.current.start();
              }
              setIsStartTyping(!isStartTyping);
            }}
          >
            {isStartTyping ? '停止' : '开始'}打字
          </button> */}
          <button
            className="theme-btn"
            onClick={() => {
              markdownRef.current.start();
              setIsStartTyping(true);
              setIsStopTyping(false);
            }}
            disabled={isStartTyping}
          >
            开始
          </button>
          <button
            className="theme-btn"
            onClick={() => {
              markdownRef.current.stop();
              setIsStopTyping(true);
            }}
            disabled={!isStartTyping || isStopTyping}
          >
            停止
          </button>
          <button
            className="theme-btn"
            onClick={() => {
              markdownRef.current.resume();
              setIsStartTyping(true);
              setIsStopTyping(false);
            }}
            disabled={!isStopTyping}
          >
            继续
          </button>
          <button className="theme-btn" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            切换为{theme === 'light' ? '暗色' : '亮色'}
          </button>
          <button className="theme-btn" onClick={() => setMathOpen(!mathOpen)}>
            {mathOpen ? '关闭' : '开启'}公式转换
          </button>
          <button className="theme-btn" onClick={() => setDisableTyping(!disableTyping)}>
            {disableTyping ? '开启' : '关闭'}打字机效果
          </button>
        </div>
      </div>
      <div className="ds-message-box" ref={messageDivRef} onScroll={onScroll}>
        <div className="ds-message-list">
          <Markdown
            ref={markdownRef}
            plugins={mathOpen ? [katexPlugin] : []}
            interval={interval}
            answerType="answer"
            onTypedChar={throttleOnTypedChar}
            timerType={timerType}
            theme={theme}
            math={{ splitSymbol: 'bracket' }}
            disableTyping={disableTyping}
            autoStartTyping={false}
            onEnd={(data) => {
              if (!data?.manual) {
                // 手动停止的
                setIsStartTyping(false);
                setIsStopTyping(false);
              }
            }}
          >
            {answerContent}
          </Markdown>
        </div>
      </div>
    </>
  );
};

export default App;
