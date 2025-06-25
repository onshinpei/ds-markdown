import React, { useState, useRef } from 'react';
import { MarkdownRef } from 'ds-markdown';
import { sourceCodeExamples } from '../../sourceCode';
import DemoSection from '../DemoSection';

// 特殊的打字动画演示组件
const TypingDemoSection: React.FC = () => {
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
    <DemoSection id="typing-animation" title="⌨️ 打字动画控制" demoType="typing" sourceCode={sourceCodeExamples.typingAnimation}>
      <button className="btn" onClick={toggleTyping}>
        {disableTyping ? '开启打字效果' : '关闭打字效果'}
      </button>
      <button className="btn" onClick={pauseTyping}>
        暂停
      </button>
      <button className="btn" onClick={resumeTyping}>
        继续
      </button>
    </DemoSection>
  );
};

export default TypingDemoSection;
