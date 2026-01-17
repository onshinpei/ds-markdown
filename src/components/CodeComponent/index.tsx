import React, { memo, useMemo } from 'react';
import BlockWrap from './BlockWrap';
import HighlightCode from './HighlightCode';

import './index.less';

// Extract regex to avoid recompilation on each render
const LANGUAGE_REGEX = /language-(\w+)/;

const CodeComponent: React.FC<{ className: string; children: string }> = ({ className, children = '' }) => {
  const match = useMemo(() => LANGUAGE_REGEX.exec(className || ''), [className]);
  const codeContent = useMemo(() => String(children).replace(/\n$/, ''), [children]);

  if (match) {
    return (
      <BlockWrap language={match[1]} codeContent={codeContent}>
        <HighlightCode code={codeContent} language={match[1]} />
      </BlockWrap>
    );
  }

  return <code className={className}>{children}</code>;
};

export default memo(CodeComponent);
