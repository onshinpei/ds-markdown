import React, { memo, useCallback } from 'react';
import { CopyIcon } from '../Icon';
import { useConfig } from '../../context/ConfigProvider';
import SuccessButton from '../ui/SuccessButton';

interface CopyButtonProps {
  codeContent?: string;
  style?: React.CSSProperties;
  className?: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ codeContent, style, className }) => {
  const { locale } = useConfig();

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(codeContent || '');
      return true;
    } catch (err) {
      // Fallback: use traditional method
      const textArea = document.createElement('textarea');
      textArea.value = codeContent || '';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    }
  }, [codeContent]);

  return (
    <SuccessButton onClick={handleCopy} icon={<CopyIcon size={24} />} executeText={locale.codeBlock.copied || 'copied'} style={style} className={className}>
      {locale.codeBlock.copy || 'copy'}
    </SuccessButton>
  );
};

export default memo(CopyButton);
