/* eslint-disable react-refresh/only-export-components */
import MarkdownCMD from './MarkdownCMD';
import Markdown from './Markdown';
import type { MarkdownCMDRef, MarkdownRef, IMarkdownMath, ITypedChar, MarkdownProps, MarkdownCMDProps, IMarkdownPlugin } from './defined';

import Button from './components/ui/Button';
import IconButton from './components/ui/IconButton';
import ToolTip from './components/ui/ToolTip';
import Segmented from './components/ui/Segmented';
import SuccessButton from './components/ui/SuccessButton';

import CopyButton from './components/CopyButton';
import DownloadButton from './components/DownloadButton';
import CodeBlockActions from './components/CodeBlockActions';
import CodeBlockWrap from './components/CodeBlockWrap';
import HighlightCode from './components/HighlightCode';

export { CopyIcon, DownloadIcon, CheckMarkIcon } from './components/Icon';

// 导出 ConfigProvider 相关
export { ConfigProvider, useConfig, useLocale } from './context/ConfigProvider';
export { useThemeState } from './context/MarkdownThemeProvider';
export * from './context/ConfigProvider/mermaid.type';
export type { Locale, ConfigProviderProps, ConfigContextType } from './context/ConfigProvider';

export default Markdown;
export type { MarkdownCMDRef, MarkdownRef, IMarkdownMath, ITypedChar, MarkdownProps, MarkdownCMDProps, IMarkdownPlugin };
export { Markdown, MarkdownCMD, Button, IconButton, ToolTip, CopyButton, DownloadButton, SuccessButton, CodeBlockActions, CodeBlockWrap, HighlightCode, Segmented };
