import React, { memo } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

// Extract empty style object as constant to avoid creating new object on each render
const EMPTY_STYLE = {};

interface HighlightCodeProps {
  code: string;
  language: string;
}

const HighlightCode: React.FC<HighlightCodeProps> = ({ code, language }) => {
  return (
    <SyntaxHighlighter useInlineStyles={false} language={language} style={EMPTY_STYLE}>
      {code}
    </SyntaxHighlighter>
  );
};

export default memo(HighlightCode);
