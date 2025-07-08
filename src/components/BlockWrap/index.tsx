import React, { useEffect, useState } from 'react';
import { CopyIcon, DownloadIcon, CheckMarkIcon } from './icon';
import DsButton from '../DsButton';
import { useMarkdownThemeContext } from '../../context/MarkdownThemeProvider';
import { useConfig } from '../../context/ConfigProvider';

interface BlockWrapProps {
  children: React.ReactNode;
  language: string;
  codeContent?: string;
}

const TIMEOUT = 3000;

const BlockWrap: React.FC<BlockWrapProps> = ({ children, language, codeContent }) => {
  const { state: themeState } = useMarkdownThemeContext();
  const { locale } = useConfig();

  // 从 context 中获取主题配置
  const currentTheme = themeState.theme;
  const currentCodeBlock = themeState.codeBlock;

  const { headerActions = true } = currentCodeBlock || {};
  const [copyText, setCopyText] = useState(locale.codeBlock.copy);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [isCopying, setIsCopying] = useState(false);

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

  // 下载文件
  const handleDownload = () => {
    if (!codeContent) return;

    const blob = new Blob([codeContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    // 根据语言设置文件扩展名
    const getFileExtension = (lang: string) => {
      const extensions: Record<string, string> = {
        javascript: 'js',
        typescript: 'ts',
        jsx: 'jsx',
        tsx: 'tsx',
        python: 'py',
        java: 'java',
        cpp: 'cpp',
        c: 'c',
        csharp: 'cs',
        php: 'php',
        ruby: 'rb',
        go: 'go',
        rust: 'rs',
        swift: 'swift',
        kotlin: 'kt',
        scala: 'scala',
        shell: 'sh',
        bash: 'sh',
        powershell: 'ps1',
        sql: 'sql',
        html: 'html',
        css: 'css',
        scss: 'scss',
        less: 'less',
        json: 'json',
        xml: 'xml',
        yaml: 'yml',
        markdown: 'md',
        dockerfile: 'dockerfile',
      };
      return extensions[lang.toLowerCase()] || 'txt';
    };

    const fileName = `code.${getFileExtension(language)}`;
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderHeaderActions = () => {
    if (headerActions === true) {
      return (
        <div className="md-code-block-header-actions">
          <DsButton style={{ fontSize: 13 }} icon={showCheckmark ? <CheckMarkIcon size={24} /> : <CopyIcon size={24} />} onClick={handleCopy}>
            <span>{copyText}</span>
          </DsButton>
          <DsButton style={{ fontSize: 13 }} icon={<DownloadIcon size={24} />} onClick={handleDownload}>
            <span>{locale.codeBlock.download}</span>
          </DsButton>
        </div>
      );
    }
    return headerActions;
  };

  return (
    <div className={`md-code-block md-code-block-${currentTheme}`}>
      <div className="md-code-block-banner-wrap">
        <div className="md-code-block-banner md-code-block-banner-lite">
          <div className="md-code-block-language">{language}</div>
          {renderHeaderActions()}
        </div>
      </div>
      <div className="md-code-block-content">{children}</div>
    </div>
  );
};

export default BlockWrap;
