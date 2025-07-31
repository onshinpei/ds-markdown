import React from 'react';
import { DownloadIcon } from '../Icon';
import { useConfig } from '../../context/ConfigProvider';
import SuccessButton from '../ui/SuccessButton';

interface DownloadButtonProps {
  codeContent?: string;
  language: string;
  style?: React.CSSProperties;
  className?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ codeContent, language, style, className }) => {
  const { locale } = useConfig();
  // 下载文件
  const handleDownload = async () => {
    if (!codeContent) return false;

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
    return true;
  };

  return (
    <SuccessButton onClick={handleDownload} icon={<DownloadIcon size={24} />} executeText={locale.codeBlock.downloaded || 'Downloaded'} style={style} className={className}>
      {locale.codeBlock.download || 'Download'}
    </SuccessButton>
  );
};

export default DownloadButton;
