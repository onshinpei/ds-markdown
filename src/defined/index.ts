/* eslint-disable @typescript-eslint/no-empty-object-type */

import { Pluggable } from 'unified';
import Mermaid from './mermaid.type';
import { KatexOptions } from 'katex';
// 但 TypeScript 在编译时可以直接从文件路径导入类型
import type { MarkdownBaseRef, MarkdownTyperBaseProps } from 'react-markdown-typer/es/defined';
// import { KatexOptions } from 'katex';

/**
 * 回答类型，思考和回答
 */
export type AnswerType = 'answer' | 'thinking';

export type Theme = 'light' | 'dark';

export interface IMarkdownThemeProps {
  /** 主题 */
  theme?: Theme;
  /** 数学公式配置 */
  math?: IMarkdownMath;
  /** 代码块配置 */
  codeBlock?: IMarkdownCode;
  /** 插件配置 */
  plugins?: IMarkdownPlugin[];
  /** 回答类型 */
  answerType?: 'thinking' | 'answer';
}

export interface IMarkdownThemeStateProps extends IMarkdownThemeProps {
  theme: Theme;
  answerType: AnswerType;
}

export interface IMarkdownCode {
  /** 是否显示头部操作按钮
   * 如果为true，则显示头部操作按钮
   * 如果为React.ReactNode，则显示自定义头部操作按钮
   */
  headerActions?: boolean | React.ReactNode;
}

export interface MarkdownBaseProps extends MarkdownTyperBaseProps {}

export interface MarkdownProps extends MarkdownTyperBaseProps, IMarkdownThemeProps {
  children: string | undefined;
}

/**  MarkdownCMD 组件不需要 children */
export interface MarkdownCMDProps extends MarkdownTyperBaseProps, IMarkdownThemeProps {
  children?: undefined;
  isInnerRender?: boolean;
}

export interface IMarkdownPlugin {
  remarkPlugin?: Pluggable;
  rehypePlugin?: Pluggable;
  type: 'buildIn' | 'custom';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  id?: any;
  components?: Record<string, React.ComponentType<unknown>>;
}

export interface IMarkdownMath {
  /** 是括号还是$作为分隔符, 默认是$ */
  splitSymbol: 'bracket' | 'dollar';
  /** 数学公式替换函数 */
  replaceMathBracket?: (value: string) => string;
}

/** Markdown 组件的ref 类型 */
export type MarkdownRef = MarkdownBaseRef;

/** MarkdownCMD 组件的 ref 类型 */
export interface MarkdownCMDRef extends MarkdownBaseRef {
  push: (content: string, answerType?: AnswerType) => void;
  clear: () => void;
  triggerWholeEnd: () => void;
}
export interface IMarkdownMermaidConfig extends Mermaid.MermaidConfig {
  /** 是否显示头部操作按钮
   * 如果为true，则显示头部操作按钮
   * 如果为React.ReactNode，则显示自定义头部操作按钮
   */
  headerActions?: boolean | React.ReactNode | ((data: { graphSvg: SVGElement }) => React.ReactNode);
}

export interface IMarkdownKatexConfig extends KatexOptions {}
