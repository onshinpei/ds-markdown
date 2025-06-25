import React from 'react';
import DsMarkdown from 'ds-markdown';
import { katexPlugin } from 'ds-markdown/plugins';
import { sourceCodeExamples } from '../../sourceCode';

// 数学公式演示组件
const MathSupportDemo: React.FC = () => {
  return (
    <div
      style={{
        background: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
      }}
    >
      <DsMarkdown interval={20} answerType="answer" theme="light" plugins={[katexPlugin]} math={{ splitSymbol: 'dollar' }}>
        {sourceCodeExamples.mathSupport.markdownString}
      </DsMarkdown>
    </div>
  );
};

export default MathSupportDemo;
