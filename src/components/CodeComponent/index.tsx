import React from 'react';
import BlockWrap from './BlockWrap';
import HighlightCode from './HighlightCode';

import './index.less';

const CodeComponent: React.FC<{ className: string; children: string }> = ({ className, children = '' }) => {
  const match = /language-(\w+)/.exec(className || '');
  const codeContent = String(children).replace(/\n$/, '');
  return match ? (
    <BlockWrap language={match[1]} codeContent={codeContent}>
      <HighlightCode code={codeContent} language={match[1]} />
    </BlockWrap>
  ) : (
    <code className={className}>{children}</code>
  );
};
export default CodeComponent;
