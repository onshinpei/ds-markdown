import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

interface HighlightCodeProps {
  code: string;
  language: string;
}

const HighlightCode: React.FC<HighlightCodeProps> = ({ code, language }) => {
  return (
    <SyntaxHighlighter useInlineStyles={false} language={language} style={{}}>
      {code}
    </SyntaxHighlighter>
  );
};

export default HighlightCode;
