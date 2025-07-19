import React from 'react';
import Button from '../ui/Button';
import { DownloadIcon } from '../BlockWrap/icon';
import { useConfig } from '../../context/ConfigProvider';

interface DownloadButtonProps {
  codeContent?: string;
  language: string;
  style?: React.CSSProperties;
  className?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ codeContent, language, style, className }) => {
  const { locale } = useConfig();
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

  return (
    <Button style={style} className={className} icon={<DownloadIcon size={24} />} onClick={handleDownload}>
      <span>{locale.codeBlock.download}</span>
    </Button>
  );
};

export default DownloadButton;
