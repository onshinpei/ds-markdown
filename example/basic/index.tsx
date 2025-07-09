import { useMemo, useRef, useState } from 'react';

import Markdown, { MarkdownRef } from '../../src';
import json from './data.json';

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

const BasicDemo: React.FC<{
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}> = ({ theme, setTheme }) => {
  const [thinkingContent, setThinkingContent] = useState('');
  const [answerContent, setAnswerContent] = useState('');
  const messageDivRef = useRef<HTMLDivElement>(null!);

  const markdownRef = useRef<MarkdownRef>(null!);

  const scrollCacheRef = useRef<{
    type: 'manual' | 'auto';
    needAutoScroll: boolean;
    prevScrollTop: number;
  }>({
    type: 'manual',
    needAutoScroll: true,
    prevScrollTop: 0,
  });

  const onClick = () => {
    setThinkingContent(json.thinking_content);
  };
  const onReset = () => {
    setThinkingContent('');
    setAnswerContent('');
  };

  const throttleOnTypedChar = useMemo(() => {
    return throttle((_char) => {
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

  const interval = 8;
  const flag = false;
  const timerType = flag ? 'requestAnimationFrame' : 'setTimeout';

  return (
    <>
      <div className="ds-message-actions">
        <div>
          {thinkingContent ? (
            <button className="start-btn" onClick={onReset}>
              重置
            </button>
          ) : (
            <button className="start-btn" onClick={onClick}>
              点击显示
            </button>
          )}
          <span style={{ marginLeft: 30 }}>React 19有哪些新特性</span>
        </div>
        <div>
          <button className="theme-btn" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            切换为{theme === 'light' ? '暗色' : '亮色'}
          </button>
        </div>
      </div>
      <div className="ds-message-box" ref={messageDivRef} onScroll={onScroll}>
        <div className="ds-message-list">
          <Markdown
            interval={interval}
            answerType="thinking"
            onEnd={(_args) => {
              // console.log('思考完成', args);
              if (thinkingContent) {
                setAnswerContent(json.content);
              }
            }}
            onTypedChar={throttleOnTypedChar}
            // timerType="setTimeout"
            timerType={timerType}
            theme={theme}
          >
            {thinkingContent}
          </Markdown>

          {answerContent && (
            <>
              <div>
                <button className="theme-btn" onClick={() => markdownRef.current.stop()}>
                  停止
                </button>
                <button className="theme-btn" onClick={() => markdownRef.current.resume()}>
                  继续
                </button>
              </div>
              <Markdown interval={interval} ref={markdownRef} answerType="answer" onTypedChar={throttleOnTypedChar} timerType={timerType} theme={theme}>
                {answerContent}
              </Markdown>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BasicDemo;
