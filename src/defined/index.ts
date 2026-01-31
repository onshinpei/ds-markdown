/* eslint-disable @typescript-eslint/no-empty-object-type */

import { Pluggable } from 'unified';
import Mermaid from './mermaid.type';
import { KatexOptions } from 'katex';
// But TypeScript can import types directly from file paths at compile time
import type { MarkdownBaseRef, MarkdownTyperBaseProps } from 'react-markdown-typer/es/defined';
// import { KatexOptions } from 'katex';

/**
 * Answer type, thinking and answer
 */
export type AnswerType = 'answer' | 'thinking';

export type Theme = 'light' | 'dark';

export interface IMarkdownThemeProps {
  /** Theme */
  theme?: Theme;
  /** Math formula configuration */
  math?: IMarkdownMath;
  /** Code block configuration */
  codeBlock?: IMarkdownCode;
  /** Plugin configuration */
  plugins?: IMarkdownPlugin[];
  /** Answer type */
  answerType?: 'thinking' | 'answer';
}

export interface IMarkdownThemeStateProps extends IMarkdownThemeProps {
  theme: Theme;
  answerType: AnswerType;
}

export interface IMarkdownCode {
  /** Whether to show header action buttons
   * If true, show default header action buttons
   * If React.ReactNode, show custom header action buttons
   */
  headerActions?: boolean | React.ReactNode;
}

export interface MarkdownBaseProps extends MarkdownTyperBaseProps {}

export interface MarkdownProps extends MarkdownTyperBaseProps, IMarkdownThemeProps {
  children: string | undefined;
  cursor?: React.ReactNode | string | 'circle' | 'block' | 'underline' | 'line';
}

/** MarkdownCMD component does not need children */
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
  /** Whether to use brackets or $ as delimiter, default is $ */
  splitSymbol: 'bracket' | 'dollar';
  /** Math formula replacement function */
  replaceMathBracket?: (value: string) => string;
}

/** Markdown component ref type */
export type MarkdownRef = MarkdownBaseRef;

/** MarkdownCMD component ref type */
export interface MarkdownCMDRef extends MarkdownBaseRef {
  push: (content: string, answerType?: AnswerType) => void;
  clear: () => void;
  triggerWholeEnd: () => void;
}
export interface IMarkdownMermaidConfig extends Mermaid.MermaidConfig {
  /** Whether to show header action buttons
   * If true, show default header action buttons
   * If React.ReactNode, show custom header action buttons
   */
  headerActions?: boolean | React.ReactNode | ((data: { graphSvg: SVGElement }) => React.ReactNode);
}

export interface IMarkdownKatexConfig extends KatexOptions {}
