import React, { memo, useCallback } from 'react';
import { DownloadIcon } from '../Icon';
import { useConfig } from '../../context/ConfigProvider';
import SuccessButton from '../ui/SuccessButton';

// File extension mapping - extracted as constant
const FILE_EXTENSIONS: Record<string, string> = {
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

const getFileExtension = (lang: string): string => {
  return FILE_EXTENSIONS[lang.toLowerCase()] || 'txt';
};

interface DownloadButtonProps {
  codeContent?: string;
  language: string;
  style?: React.CSSProperties;
  className?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ codeContent, language, style, className }) => {
  const { locale } = useConfig();

  const handleDownload = useCallback(async () => {
    if (!codeContent) return false;

    let url: string | null = null;
    let link: HTMLAnchorElement | null = null;

    try {
      const blob = new Blob([codeContent], { type: 'text/plain;charset=utf-8' });
      url = URL.createObjectURL(blob);
      link = document.createElement('a');

      const fileName = `code.${getFileExtension(language)}`;
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      return true;
    } finally {
      // Ensure cleanup always runs
      if (link && document.body.contains(link)) {
        document.body.removeChild(link);
      }
      if (url) {
        URL.revokeObjectURL(url);
      }
    }
  }, [codeContent, language]);

  return (
    <SuccessButton onClick={handleDownload} icon={<DownloadIcon size={24} />} executeText={locale.codeBlock.downloaded || 'Downloaded'} style={style} className={className}>
      {locale.codeBlock.download || 'Download'}
    </SuccessButton>
  );
};

export default memo(DownloadButton);
