import React, { useState } from 'react';
import Button from '../ui/Button';
import { CheckMarkIcon, CopyIcon } from '../BlockWrap/icon';
import { useConfig } from '../../context/ConfigProvider';

interface CopyButtonProps {
  codeContent?: string;
  style?: React.CSSProperties;
  className?: string;
}

const TIMEOUT = 3000;
const CopyButton: React.FC<CopyButtonProps> = ({ codeContent, style, className }) => {
  const { locale } = useConfig();
  const [copyText, setCopyText] = useState(locale.codeBlock.copy);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [isCopying, setIsCopying] = useState(false);

  // 下载文件
  // 复制到剪贴板
  const handleCopy = async () => {
    if (isCopying || !codeContent) return;
    setIsCopying(true);
    try {
      await navigator.clipboard.writeText(codeContent);
      setCopyText(locale.codeBlock.copied);
      setShowCheckmark(true);
      setTimeout(() => {
        setCopyText(locale.codeBlock.copy);
        setShowCheckmark(false);
        setIsCopying(false);
      }, TIMEOUT);
    } catch (err) {
      // 降级方案：使用传统方法
      const textArea = document.createElement('textarea');
      textArea.value = codeContent;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopyText(locale.codeBlock.copied);
        setShowCheckmark(true);
        setTimeout(() => {
          setCopyText(locale.codeBlock.copy);
          setShowCheckmark(false);
          setIsCopying(false);
        }, TIMEOUT);
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr);
        setIsCopying(false);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <Button style={style} className={className} icon={showCheckmark ? <CheckMarkIcon size={24} /> : <CopyIcon size={24} />} onClick={handleCopy}>
      <span>{isCopying ? locale.codeBlock.copying : locale.codeBlock.copy}</span>
    </Button>
  );
};

export default CopyButton;
