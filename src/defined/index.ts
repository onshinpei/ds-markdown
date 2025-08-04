/* eslint-disable @typescript-eslint/no-empty-object-type */

import { Pluggable } from 'unified';
import Mermaid from './mermaid.type';
// import { KatexOptions } from 'katex';

/**
 * 回答类型，思考和回答
 */
export type AnswerType = 'answer' | 'thinking';

export type Theme = 'light' | 'dark';

/**
 * 字符接口
 */
export interface IChar {
  content: string;
  answerType: AnswerType;
  tokenId: number;
  /** 字符索引 */
  index: number;
}

/**
 * 段落类型
 * 段落类型为br时，表示换行
 * 段落类型为text时，表示文本
 */
export interface IParagraph {
  /** 段落内容 */
  content?: string;
  /** 是否已打字 */
  isTyped: boolean;
  /** 段落类型 */
  type: 'br' | 'text';
  /** 回答类型 */
  answerType: AnswerType;

  /** token 参考 */
  tokensReference: Record<string, ITokensReference>;
}

export interface ITokensReference {
  startIndex: number;
  raw: string;
}

export interface IOnTypedCharData {
  currentIndex: number;
  currentChar: string;
  answerType: AnswerType;
  prevStr: string;
}

export interface IStartData extends IOnTypedCharData {}

export interface ITypedChar extends IOnTypedCharData {
  percent: number;
  currentStr: string;
}

export interface IBeforeTypedChar extends IOnTypedCharData {
  percent: number;
}

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

export interface MarkdownBaseProps {
  /** 计时类型： 支持setTimeout和requestAnimationFrame */
  timerType?: 'setTimeout' | 'requestAnimationFrame';
  /** 打字机效果间隔时间 */
  interval: number;
  /** 是否关闭打字机效果 */
  disableTyping?: boolean;
  /** 打字完成后回调,  */
  onEnd?: (data?: IEndData) => void;
  /** 开始打字回调 */
  onStart?: (data?: IStartData) => void;
  /** 打字前回调 */
  onBeforeTypedChar?: (data?: IBeforeTypedChar) => Promise<void>;
  /**
   * 打字机打完一个字符回调
   * @param char 字符
   * @param index 字符索引
   */
  onTypedChar?: (data?: ITypedChar) => void;
  /** 是否自动开启打字动画 */
  autoStartTyping?: boolean;
}

export interface IMarkdownCode {
  /** 是否显示头部操作按钮
   * 如果为true，则显示头部操作按钮
   * 如果为React.ReactNode，则显示自定义头部操作按钮
   */
  headerActions?: boolean | React.ReactNode;
}

export interface MarkdownProps extends MarkdownBaseProps, IMarkdownThemeProps {
  children: string | undefined;
}

/**  MarkdownCMD 组件不需要 children */
export interface MarkdownCMDProps extends MarkdownBaseProps, IMarkdownThemeProps {
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

export interface IWholeContent {
  thinking: {
    content: string;
    length: number;
    prevLength: number;
  };
  answer: {
    content: string;
    length: number;
    prevLength: number;
  };
  allLength: number;
}

export interface MarkdownBaseRef {
  stop: () => void;
  resume: () => void;
  start: () => void;
  restart: () => void;
}

/** Markdown 组件的ref 类型 */
export type MarkdownRef = MarkdownBaseRef;

/** MarkdownCMD 组件的 ref 类型 */
export interface MarkdownCMDRef extends MarkdownBaseRef {
  push: (content: string, answerType?: AnswerType) => void;
  clear: () => void;
  triggerWholeEnd: () => void;
}

export interface IEndData {
  manual: boolean;
  /** 回答字符串 */
  answerStr: string;
  /** 思考字符串 */
  thinkingStr: string;
  /** 打字机打过的字符串, 和answerStr 相同 */
  str: string;
}

export interface IMarkdownMermaidConfig extends Mermaid.MermaidConfig {
  /** 是否显示头部操作按钮
   * 如果为true，则显示头部操作按钮
   * 如果为React.ReactNode，则显示自定义头部操作按钮
   */
  headerActions?: boolean | React.ReactNode | ((data: { graphSvg: SVGElement }) => React.ReactNode);
}

// export interface IMarkdownKatexConfig extends KatexOptions {}
