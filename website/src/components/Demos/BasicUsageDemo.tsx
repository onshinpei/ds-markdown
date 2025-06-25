import React from 'react';
import DsMarkdown from 'ds-markdown';
import { sourceCodeExamples } from '../../sourceCode';

// 基础用法演示组件
const BasicUsageDemo: React.FC = () => {
  return (
    <div
      style={{
        background: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
      }}
    >
      <DsMarkdown interval={25} answerType="answer" theme="light">
        {sourceCodeExamples.basicUsage.markdownString}
      </DsMarkdown>
    </div>
  );
};

export default BasicUsageDemo;
