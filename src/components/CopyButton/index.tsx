import React, { useEffect } from 'react';
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
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeContent || '');
      return true;
    } catch (err) {
      // 降级方案：使用传统方法
      const textArea = document.createElement('textarea');
      textArea.value = codeContent || '';
      textArea.select();
      document.execCommand('copy');
      return true;
    }
  };

  return (
    <SuccessButton onClick={handleCopy} icon={<CopyIcon size={24} />} executeText={locale.codeBlock.copied || 'copied'} style={style} className={className}>
      {locale.codeBlock.copy || 'copy'}
    </SuccessButton>
  );
};

export default CopyButton;
