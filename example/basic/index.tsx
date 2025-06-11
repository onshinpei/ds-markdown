import { StrictMode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

import Markdown from '../../src';
import json from './data.json';

function throttle(fn: (...args: any[]) => void, delay: number) {
  let lastTime = 0;
  return (...args: unknown[]) => {
    const now = Date.now();
    if (now - lastTime > delay) {
      fn(...args);
      lastTime = now;
    }
  };
}

const BasicDemo = () => {
  const [thinkingContent, setThinkingContent] = useState('');
  const [answerContent, setAnswerContent] = useState('');
  const messageDivRef = useRef<HTMLDivElement>(null!);

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

  const interval = 8;
  const flag = true;
  const timerType = flag ? 'timestamp' : 'setTimeout';

  return (
    <>
      <div className="ds-message-actions">
        {thinkingContent ? <button onClick={onReset}>重置</button> : <button onClick={onClick}>点击显示</button>} <span style={{ marginLeft: 30 }}>React 19有哪些新特性</span>
      </div>
      <div className="ds-message-box" ref={messageDivRef} onScroll={onScroll}>
        <div className="ds-message-list">
          <Markdown
            interval={interval}
            answerType="thinking"
            onEnd={(args) => {
              // console.log('思考完成', args);
              if (thinkingContent) {
                setAnswerContent(json.content);
              }
            }}
            // onStart={(args) => {
            //   console.log('思考开始', args);
            // }}
            // onTypedChar={(args) => {
            //   console.log('打字中', args);
            // }}
            onTypedChar={throttleOnTypedChar}
            // timerType="setTimeout"
            timerType={timerType}
          >
            {thinkingContent}
          </Markdown>

          {answerContent && (
            <Markdown
              interval={interval}
              answerType="answer"
              // onEnd={(args) => {
              //   console.log('思考完成', args);
              //   if (thinkingContent) {
              //     setAnswerContent(json.content);
              //   }
              // }}
              // onStart={(args) => {
              //   console.log('思考开始', args);
              // }}
              // onTypedChar={(args) => {
              //   console.log('打字中', args);
              // }}
              onTypedChar={throttleOnTypedChar}
              // timerType="setTimeout"
              timerType={timerType}
            >
              {answerContent}
            </Markdown>
          )}
        </div>
      </div>
    </>
  );
};

export default BasicDemo;
