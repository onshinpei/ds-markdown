/* eslint-disable no-unused-vars */
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
  /**
   * split_segment 两个连续的段落，需要做分割
   */
  contentType: 'space' | 'segment' | 'split_segment';
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

export interface MarkdownProps {
  /** 计时类型： 支持setTimeout和requestAnimationFrame */
  timerType?: 'setTimeout' | 'requestAnimationFrame';
  /** 打字机效果间隔时间 */
  interval: number;
  /** 是否关闭匀速打字机效果 */
  isClosePrettyTyped?: boolean;
  /** 打字完成后回调,  */
  onEnd?: (data?: { str?: string; answerType?: AnswerType }) => void;
  /** 开始打字回调 */
  onStart?: (data?: { currentIndex: number; currentChar: string; answerType: AnswerType; prevStr: string }) => void;
  /**
   * 打字机打完一个字符回调
   * @param char 字符
   * @param index 字符索引
   */
  onTypedChar?: (data?: { currentIndex: number; currentChar: string; answerType: AnswerType; prevStr: string }) => void;
  /** 主题 */
  theme?: Theme;
}
