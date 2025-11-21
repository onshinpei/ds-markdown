import React from 'react';
import { useMarkdownThemeContext } from '../../../context/MarkdownThemeProvider';
import CodeBlockWrap from '../CodeBlockWrap';
import CodeBlockActions from '../CodeBlockActions';

import './index.less';

interface BlockWrapProps {
  children: React.ReactNode;
  language: string;
  codeContent?: string;
}

const BlockWrap: React.FC<BlockWrapProps> = ({ children, language, codeContent }) => {
  const { state: themeState } = useMarkdownThemeContext();

  // Get theme config from context
  const currentCodeBlock = themeState.codeBlock;
  const { headerActions = true } = currentCodeBlock || {};
  const renderHeaderActions = () => {
    if (headerActions === true) {
      return <CodeBlockActions codeContent={codeContent} language={language} />;
    }
    return headerActions;
  };

  return (
    <CodeBlockWrap
      title={
        <>
          <div className="md-code-block-language">{language}</div>
          {renderHeaderActions()}
        </>
      }
    >
      {children}
    </CodeBlockWrap>
  );
};

export default BlockWrap;
