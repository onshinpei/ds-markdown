import React, { useEffect, useRef } from 'react';
import { MarkdownCMD, MarkdownCMDRef } from '../../src';

// 导入 ./cozeData.text

import { cozeData } from './cozeData';
import { IntervalType, ITypedChar } from '../../src/defined';

interface CMDDemoProps {
  id?: number;
}

const indexTime = {
  0: 5,
  1: 10,
  2: 15,
  3: 20,
  4: 25,
  5: 30,
  6: 35,
  7: 300,
  8: 300,
  9: 300,
};

const CMDDemo: React.FC<CMDDemoProps> = (props: CMDDemoProps) => {
  const thinkingRef = useRef<MarkdownCMDRef>(null!);
  const answerRef = useRef<MarkdownCMDRef>(null!);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) {
      return;
    }
    mountedRef.current = true;

    async function pushData() {
      let index = 0;
      while (true) {
        const timeout = 10;
        await new Promise((resolve) => setTimeout(resolve, timeout));

        index++;
        const data = cozeData.shift();

        if (data) {
          if (data.answerType === 'thinking') {
            thinkingRef.current.push(data.content);
          }
          answerRef.current.push(data.content);
        }

        if (!data || cozeData.length === 0) {
          break;
        }
      }
    }

    pushData();
    // cmdRef.current.push(data.thinking_content, 'thinking');
    // cmdRef.current.push(data.content, 'answer');
  }, []);

  const interval: IntervalType = {
    min: 0.5,
    max: 10,
    curve: 'ease',
  };
  const flag = true;
  const timerType = flag ? 'requestAnimationFrame' : 'setTimeout';

  const onTypedChar = () => {
    // console.log('onTypedChar', data);
  };

  return (
    <div className="ds-message-box">
      <div style={{ padding: '20px 50px' }}>
        <button
          onClick={() => {
            thinkingRef.current.stop();
            answerRef.current.stop();
          }}
        >
          stop
        </button>
        <button
          onClick={() => {
            thinkingRef.current.resume();
          }}
        >
          resume
        </button>
      </div>
      <div className="ds-message-list">
        <MarkdownCMD interval={interval} ref={thinkingRef} timerType={timerType} onTypedChar={onTypedChar} />
        <MarkdownCMD interval={interval} ref={answerRef} timerType={timerType} onTypedChar={onTypedChar} />
      </div>
    </div>
  );
};

export default CMDDemo;
