import React from 'react';
import { useThemeState } from '../../../context/MarkdownThemeProvider';

interface CodeBlockWrapProps {
  children: React.ReactNode;
  title: React.ReactNode;
}

const CodeBlockWrap: React.FC<CodeBlockWrapProps> = ({ children, title }) => {
  const { theme } = useThemeState();
  return (
    <div className={`md-code-block md-code-block-${theme}`}>
      <div className="md-code-block-banner-wrap">
        <div className="md-code-block-banner md-code-block-banner-lite">{title}</div>
      </div>
      <div className="md-code-block-content">{children}</div>
    </div>
  );
};

export default CodeBlockWrap;
