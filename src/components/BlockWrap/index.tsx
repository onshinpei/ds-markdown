import React, { useState } from 'react';
import { IMarkdownCode, Theme } from '../../defined';
import { CopyIcon, DownloadIcon, CheckMarkIcon } from './icon';
import DsButton from '../DsButton';

interface BlockWrapProps {
  children: React.ReactNode;
  language: string;
  theme?: Theme;
  codeBlock?: IMarkdownCode;
  codeContent?: string;
}

const BlockWrap: React.FC<BlockWrapProps> = ({ children, language, theme = 'light', codeBlock, codeContent }) => {
  const { headerActions = true } = codeBlock || {};
  const [copyText, setCopyText] = useState('复制');
  const [showCheckmark, setShowCheckmark] = useState(false);

  // 复制到剪贴板
  const handleCopy = async () => {
    if (!codeContent) return;

    try {
      await navigator.clipboard.writeText(codeContent);
      setCopyText('已复制');
      setShowCheckmark(true);
      setTimeout(() => {
        setCopyText('复制');
        setShowCheckmark(false);
      }, 2000);
    } catch (err) {
      console.error('复制失败:', err);
      // 降级方案：使用传统方法
      const textArea = document.createElement('textarea');
      textArea.value = codeContent;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopyText('已复制');
        setShowCheckmark(true);
        setTimeout(() => {
          setCopyText('复制');
          setShowCheckmark(false);
        }, 2000);
      } catch (fallbackErr) {
        console.error('降级复制也失败:', fallbackErr);
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
          <DsButton icon={showCheckmark ? <CheckMarkIcon size={24} /> : <CopyIcon size={24} />} onClick={handleCopy}>
            <span>{copyText}</span>
          </DsButton>
          {/* <button className="md-code-block-action-btn md-code-block-download-btn" onClick={handleDownload} title="下载代码">
              <DownloadIcon size={24} />
              <span>下载</span>
            </button> */}

          <DsButton icon={<DownloadIcon size={24} />} onClick={handleDownload}>
            <span>下载</span>
          </DsButton>
        </div>
      );
    }
    return headerActions;
  };

  return (
    <div className={`md-code-block md-code-block-${theme}`}>
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
