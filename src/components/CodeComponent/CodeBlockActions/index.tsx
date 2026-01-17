import React, { memo } from 'react';
import CopyButton from '../../CopyButton';
import DownloadButton from '../../DownloadButton';

// Extract style constant to avoid creating new object on each render
const ACTION_BUTTON_STYLE = { fontSize: 13, padding: '0 4px' };

interface CodeBlockActionsProps {
  codeContent?: string;
  language: string;
}

const CodeBlockActions: React.FC<CodeBlockActionsProps> = ({ codeContent, language }) => {
  return (
    <div className="md-code-block-header-actions">
      <CopyButton codeContent={codeContent} style={ACTION_BUTTON_STYLE} />
      <DownloadButton codeContent={codeContent} language={language} style={ACTION_BUTTON_STYLE} />
    </div>
  );
};

export default memo(CodeBlockActions);
