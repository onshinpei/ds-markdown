import React from 'react';
import CopyButton from '../../CopyButton';
import DownloadButton from '../../DownloadButton';

interface CodeBlockActionsProps {
  codeContent?: string;
  language: string;
}

const CodeBlockActions: React.FC<CodeBlockActionsProps> = ({ codeContent, language }) => {
  return (
    <div className="md-code-block-header-actions">
      <CopyButton codeContent={codeContent} style={{ fontSize: 13, padding: '0 4px' }} />
      <DownloadButton codeContent={codeContent} language={language} style={{ fontSize: 13, padding: '0 4px' }} />
    </div>
  );
};

export default CodeBlockActions;
