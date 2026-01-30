import React, { memo } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

// Extract empty style object as constant to avoid creating new object on each render
const EMPTY_STYLE = {};

interface HighlightCodeProps {
  code: string;
  language: string;
  cursorPlaceholder?: React.ReactElement | null;
}

const HighlightCode: React.FC<HighlightCodeProps> = ({ code, language, cursorPlaceholder }) => {
  console.log('code', code);
  return (
    <SyntaxHighlighter
      useInlineStyles={false}
      language={language}
      style={EMPTY_STYLE}
      CodeTag={({ children, ...props }) => (
        <code {...props}>
          {children}
          {/* Render the cursor placeholder which will be handled by react-markdown-typer's CursorSpan */}
          {cursorPlaceholder && cursorPlaceholder}
        </code>
      )}
    >
      {code}
    </SyntaxHighlighter>
  );
};

export default memo(HighlightCode);
