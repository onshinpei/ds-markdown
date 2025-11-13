/* eslint-disable react-refresh/only-export-components */
import MarkdownCMD from './MarkdownCMD';
import Markdown from './Markdown';
import type { MarkdownCMDRef, MarkdownRef, IMarkdownMath, MarkdownProps, MarkdownCMDProps, IMarkdownPlugin, IMarkdownMermaidConfig } from './defined';
import type { ITypedChar } from 'react-markdown-typer';

import Button from './components/ui/Button';
import IconButton from './components/ui/IconButton';
import Segmented from './components/ui/Segmented';
import SuccessButton from './components/ui/SuccessButton';

import CopyButton from './components/CopyButton';
import DownloadButton from './components/DownloadButton';
import CodeBlockActions from './components/CodeComponent/CodeBlockActions';
import CodeBlockWrap from './components/CodeComponent/CodeBlockWrap';
import HighlightCode from './components/CodeComponent/HighlightCode';

import './index.less';

export { CopyIcon, DownloadIcon, CheckMarkIcon } from './components/Icon';

// 导出 ConfigProvider 相关
export { ConfigProvider, useConfig, useLocale } from './context/ConfigProvider';
export { useThemeState } from './context/MarkdownThemeProvider';
export * from './defined/mermaid.type';
export type { Locale, ConfigProviderProps, ConfigContextType } from './context/ConfigProvider';

export default Markdown;
export type { MarkdownCMDRef, MarkdownRef, IMarkdownMath, ITypedChar, MarkdownProps, MarkdownCMDProps, IMarkdownPlugin, IMarkdownMermaidConfig };
export { Markdown, MarkdownCMD, Button, IconButton, CopyButton, DownloadButton, SuccessButton, CodeBlockActions, CodeBlockWrap, HighlightCode, Segmented };
