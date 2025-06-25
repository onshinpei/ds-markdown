import React, { useState, useRef } from 'react';
import DsMarkdown, { MarkdownRef } from 'ds-markdown';
import { sourceCodeExamples } from '../../sourceCode';

// 打字动画控制演示组件
const TypingAnimationDemo: React.FC = () => {
  const [disableTyping, setDisableTyping] = useState<boolean>(false);
  const markdownRef = useRef<MarkdownRef>(null);

  const toggleTyping = (): void => {
    setDisableTyping(!disableTyping);
  };

  const pauseTyping = (): void => {
    if (markdownRef.current && markdownRef.current.stop) {
      markdownRef.current.stop();
    }
  };

  const resumeTyping = (): void => {
    if (markdownRef.current && markdownRef.current.resume) {
      markdownRef.current.resume();
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button className="btn" onClick={toggleTyping}>
          {disableTyping ? '开启打字效果' : '关闭打字效果'}
        </button>
        <button className="btn" onClick={pauseTyping}>
          ⏸️ 暂停
        </button>
        <button className="btn" onClick={resumeTyping}>
          ▶️ 继续
        </button>
      </div>
      <div
        style={{
          background: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
        }}
      >
        <DsMarkdown ref={markdownRef} interval={30} answerType="answer" theme="light" disableTyping={disableTyping}>
          {sourceCodeExamples.typingAnimation.markdownString}
        </DsMarkdown>
      </div>
    </div>
  );
};

export default TypingAnimationDemo;
