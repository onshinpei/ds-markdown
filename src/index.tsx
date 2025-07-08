/* eslint-disable react-refresh/only-export-components */
import MarkdownCMD from './MarkdownCMD';
import Markdown from './Markdown';
import type { MarkdownCMDRef, MarkdownRef, IMarkdownMath, ITypedChar, MarkdownProps, MarkdownCMDProps } from './defined';

// 导出 ConfigProvider 相关
export { ConfigProvider, useConfig, useLocale } from './context/ConfigProvider';
export type { Locale, ConfigProviderProps, ConfigContextType } from './context/ConfigProvider';

export default Markdown;
export type { MarkdownCMDRef, MarkdownRef, IMarkdownMath, ITypedChar, MarkdownProps, MarkdownCMDProps };
export { Markdown, MarkdownCMD };
