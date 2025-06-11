import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';

import HighReactMarkdown from '../components/HighReactMarkdown/index.js';
import classNames from 'classnames';
import { AnswerType, IParagraph, MarkdownProps, IChar } from '../defined.js';
import { compiler } from '../utils/compiler.js';
import { __DEV__ } from '../constant.js';
import deepClone from '../utils/methods/deepClone.js';
import { Token } from '../utils/Tokenizer.js';
import { useTypingTask } from '../hooks/useTypingTask.js';

type MarkdownCMDProps = MarkdownProps;

export interface MarkdownRef {
  push: (content: string, answerType: AnswerType) => void;
  clear: () => void;
  triggerWholeEnd: () => void;
  flushBuffer: (answerType?: AnswerType) => void;
}
const MarkdownCMD = forwardRef<MarkdownRef, MarkdownCMDProps>(({ interval = 30, onEnd, onStart, onTypedChar, timerType = 'requestAnimationFrame' }, ref) => {
  /** 当前需要打字的内容 */
  const charsRef = useRef<IChar[]>([]);

  /**
   * 打字是否已经完全结束
   * 如果打字已经完全结束，则不会再触发打字效果
   */
  const isWholeTypedEndRef = useRef(false);

  /**
   * 稳定段落
   * 稳定段落是已经打过字，并且不会再变化的段落
   */
  const [stableSegments, setStableSegments] = useState<IParagraph[]>([]);
  /** 当前段落 */
  const [currentSegment, setCurrentSegment] = useState<IParagraph | undefined>(undefined);
  /** 当前段落引用 */
  const currentParagraphRef = useRef<IParagraph | undefined>(undefined);
  // currentParagraphRef.current = currentSegment;

  /**
   * 处理字符显示逻辑
   */
  const processCharDisplay = (char: IChar) => {
    const currentSegment = currentParagraphRef.current;
    /** 如果碰到 space，和split_segment 则需要处理成两个段落 */
    if (char.contentType === 'space' || char.contentType === 'split_segment') {
      if (currentSegment) {
        setStableSegments((prev) => {
          const newParagraphs = [...prev];
          // 放入到稳定队列
          if (currentSegment) {
            newParagraphs.push({ ...currentSegment, isTyped: false });
          }
          if (char.contentType === 'space') {
            newParagraphs.push({
              content: '',
              isTyped: false,
              type: 'br',
              answerType: char.answerType,
              tokensReference: {
                [char.tokenId]: {
                  startIndex: 0,
                  raw: char.content,
                },
              },
            });
          }
          return newParagraphs;
        });
        setCurrentSegment(() => undefined);
        currentParagraphRef.current = undefined;
      } else {
        setStableSegments((prev) => {
          const newParagraphs = [...prev];
          newParagraphs.push({
            content: '',
            isTyped: false,
            type: 'br',
            answerType: char.answerType,
            tokensReference: {
              [char.tokenId]: {
                startIndex: 0,
                raw: char.content,
              },
            },
          });
          return newParagraphs;
        });
      }
      return;
    }

    // 处理当前段落
    const newCurrentParagraph: IParagraph = {
      content: '',
      isTyped: false,
      type: 'text',
      answerType: char.answerType,
      tokensReference: {},
    };

    let _currentParagraph = currentSegment;
    if (!_currentParagraph) {
      // 如果当前没有段落，则直接设置为新当前段落
      _currentParagraph = newCurrentParagraph;
    } else if (currentSegment && currentSegment?.answerType !== char.answerType) {
      // 如果当前段落和当前字符的回答类型不一致，则需要处理成两个段落
      setStableSegments((prev) => {
        const newParagraphs = [...prev];
        newParagraphs.push({ ...currentSegment, isTyped: false });
        return newParagraphs;
      });
      _currentParagraph = newCurrentParagraph;
    }

    const tokensReference = deepClone(_currentParagraph.tokensReference);
    if (tokensReference[char.tokenId]) {
      tokensReference[char.tokenId].raw += char.content;
      tokensReference[char.tokenId].startIndex = currentSegment?.content?.length || 0;
    } else {
      tokensReference[char.tokenId] = {
        startIndex: currentSegment?.content?.length || 0,
        raw: char.content,
      };
    }

    const newCurrentSegment = {
      ..._currentParagraph,
      tokensReference,
      content: (currentSegment?.content || '') + char.content,
      isTyped: true,
    };
    currentParagraphRef.current = newCurrentSegment;
    setCurrentSegment(() => newCurrentSegment);
  };

  /** 思考段落 */
  const thinkingParagraphs = useMemo(() => stableSegments.filter((paragraph) => paragraph.answerType === 'thinking'), [stableSegments]);
  /** 回答段落 */
  const answerParagraphs = useMemo(() => stableSegments.filter((paragraph) => paragraph.answerType === 'answer'), [stableSegments]);

  // 使用新的打字任务 hook
  const typingTask = useTypingTask({
    timerType,
    interval,
    charsRef,
    onEnd,
    onStart,
    onTypedChar,
    processCharDisplay,
  });

  const lastSegmentRawRef = useRef<{
    thinking: string;
    answer: string;
    thinkingReference: Token | null;
    answerReference: Token | null;
    // 同步缓冲区，不使用定时器
    thinkingBuffer: string;
    answerBuffer: string;
  }>({
    thinking: '',
    answer: '',
    thinkingReference: null,
    answerReference: null,
    thinkingBuffer: '',
    answerBuffer: '',
  });

  /**
   * 检测当前内容是否在安全的 Markdown 边界
   */
  const isAtSafeMarkdownBoundary = (content: string): boolean => {
    if (!content.trim()) return true;

    const lines = content.split('\n');
    const lastLine = lines[lines.length - 1];

    // 如果以换行符结尾，通常是安全的
    if (content.endsWith('\n')) return true;

    // 检查最后一行是否是完整的语法结构
    const patterns = [
      /^#+\s+.+$/, // 完整标题: "## 标题"
      /^\s*(\d+\.|\*|\+|-)\s+.+$/, // 完整列表项: "1. 项目" 或 "- 项目"
      /^\s*```\s*$/, // 代码块结束: "```"
      /^\s*```\w*\s*$/, // 代码块开始: "```js"
      /^\s*>.*$/, // 引用: "> 内容"
      /^\s*\|.*\|\s*$/, // 完整表格行: "| 列1 | 列2 |"
      /^.*[.!?。！？]\s*$/, // 以句号等结尾的句子
    ];

    return patterns.some((pattern) => pattern.test(lastLine));
  };

  /**
   * 查找最近的安全分割点
   */
  const findLastSafeBoundary = (content: string): number => {
    const lines = content.split('\n');

    // 从后往前找最后一个完整的行
    for (let i = lines.length - 1; i >= 0; i--) {
      const currentContent = lines.slice(0, i + 1).join('\n');

      if (i < lines.length - 1) {
        // 有后续行，说明当前行以换行结尾，通常是安全的
        return currentContent.length + 1; // +1 for \n
      }

      const line = lines[i];

      // 检查当前行是否是完整的结构
      if (
        /^#+\s+.+$/.test(line) || // 完整标题
        /^\s*(\d+\.|\*|\+|-)\s+.+$/.test(line) || // 完整列表项
        /^\s*```\s*$/.test(line) || // 代码块标记
        /^\s*>.*$/.test(line) || // 引用行
        /^.*[.!?。！？]\s*$/.test(line)
      ) {
        // 完整句子
        return currentContent.length;
      }
    }

    return 0; // 没找到安全点
  };

  /**
   * 同步处理带缓冲的内容推送
   */
  const processBufferedPush = (content: string, answerType: AnswerType) => {
    const bufferKey = `${answerType}Buffer` as const;
    const lastSegmentRef = lastSegmentRawRef.current;

    // 将内容添加到缓冲区
    lastSegmentRef[bufferKey] += content;

    // 检查当前是否在安全边界
    if (isAtSafeMarkdownBoundary(lastSegmentRef[bufferKey])) {
      // 在安全边界，直接处理所有内容
      const bufferedContent = lastSegmentRef[bufferKey];
      lastSegmentRef[bufferKey] = '';
      processPushInternal(bufferedContent, answerType);
    } else {
      // 不在安全边界，找到最后一个安全分割点
      const safeBoundary = findLastSafeBoundary(lastSegmentRef[bufferKey]);

      if (safeBoundary > 0) {
        // 有安全分割点，处理安全部分，保留其余部分
        const safeContent = lastSegmentRef[bufferKey].substring(0, safeBoundary);
        const remainingContent = lastSegmentRef[bufferKey].substring(safeBoundary);

        lastSegmentRef[bufferKey] = remainingContent;
        processPushInternal(safeContent, answerType);
      }
      // 如果没有安全分割点，继续缓冲等待更多内容
    }
  };

  /**
   * 内部推送处理逻辑
   */
  const processPushInternal = (content: string, answerType: AnswerType) => {
    if (content.length === 0) {
      return;
    }

    const lastSegmentReference = lastSegmentRawRef.current[`${answerType}Reference`];

    if (isWholeTypedEndRef.current) {
      if (__DEV__) {
        console.warn('打字已经完全结束，不能再添加新的内容');
      }
      return;
    }
    let currentLastSegmentReference: Token | null = null;
    let currentLastSegmentRaw = '';
    let lastSegmentRaw = '';
    if (lastSegmentReference) {
      lastSegmentRaw = lastSegmentReference.noTrimEndRaw || lastSegmentReference.raw;
      currentLastSegmentRaw = lastSegmentRaw + content;
    } else {
      currentLastSegmentRaw = content;
    }

    const tokens = compiler(currentLastSegmentRaw);

    // 如果最后一个token是space，则把lastSegmentRaw设置为空
    if (tokens[tokens.length - 1].type === 'space') {
      currentLastSegmentReference = null;
    } else {
      currentLastSegmentReference = tokens[tokens.length - 1];
    }

    const pushAndSplitSegment = (raw: string, currenIndex: number, segmentTokenId: number) => {
      const currentToken = tokens[currenIndex];
      if (currenIndex > 0) {
        const prevToken = tokens[currenIndex - 1];

        if (prevToken.type !== 'space' && currentToken.type !== 'space') {
          charsRef.current.push({ content: '', answerType, contentType: 'split_segment', tokenId: currentToken.id });
        }
      }

      charsRef.current.push(...(raw.split('').map((char) => ({ content: char, answerType, contentType: 'segment', tokenId: segmentTokenId })) as IChar[]));
    };

    if (!lastSegmentReference) {
      tokens.forEach((token, i) => {
        if (token.type === 'space') {
          charsRef.current.push({ content: token.raw, answerType, contentType: 'space', tokenId: token.id });
        } else {
          pushAndSplitSegment(token.raw, i, token.id);
        }
      });
    } else {
      let str = '';
      let firstSpaceIndex = -1;
      let nextTokenIndex = lastSegmentRaw.length;
      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        if (token.type === 'space') {
          if (firstSpaceIndex === -1) {
            firstSpaceIndex = str.length;
          }
          str += token.raw;
          if (lastSegmentRaw.length > firstSpaceIndex) {
            // 如果lastSegmentRaw的长度大于firstSpaceIndex，则需要将当前设置为 segment
            charsRef.current.push(...(token.raw.split('').map((char) => ({ content: char, answerType, contentType: 'segment', tokenId: token.id })) as IChar[]));
          } else {
            charsRef.current.push({ content: token.raw, answerType, contentType: 'space', tokenId: token.id });
          }
        } else {
          str += token.noTrimEndRaw || token.raw;
          const realRaw = str.slice(nextTokenIndex);
          if (realRaw.length > 0) {
            pushAndSplitSegment(realRaw, i, lastSegmentReference.id);
          }
        }

        nextTokenIndex = str.length;
      }
    }

    lastSegmentRawRef.current[`${answerType}Reference`] = currentLastSegmentReference;

    if (!typingTask.isTyping()) {
      typingTask.start();
    }
  };

  /**
   * 强制刷新缓冲区内容
   */
  const flushBuffer = (answerType?: AnswerType) => {
    const lastSegmentRef = lastSegmentRawRef.current;

    if (answerType) {
      // 刷新指定类型的缓冲区
      const bufferKey = `${answerType}Buffer` as const;
      const bufferedContent = lastSegmentRef[bufferKey];
      if (bufferedContent) {
        lastSegmentRef[bufferKey] = '';
        processPushInternal(bufferedContent, answerType);
      }
    } else {
      // 刷新所有缓冲区
      if (lastSegmentRef.thinkingBuffer) {
        const content = lastSegmentRef.thinkingBuffer;
        lastSegmentRef.thinkingBuffer = '';
        processPushInternal(content, 'thinking');
      }
      if (lastSegmentRef.answerBuffer) {
        const content = lastSegmentRef.answerBuffer;
        lastSegmentRef.answerBuffer = '';
        processPushInternal(content, 'answer');
      }
    }
  };

  useImperativeHandle(ref, () => ({
    /**
     * 添加内容
     * @param content 内容 {string}
     * @param answerType 回答类型 {AnswerType}
     */
    push: (content: string, answerType: AnswerType) => {
      processBufferedPush(content, answerType);
    },
    /**
     * 清除打字任务
     */
    clear: () => {
      typingTask.stop();
      charsRef.current = [];
      setStableSegments([]);
      setCurrentSegment(undefined);
      isWholeTypedEndRef.current = false;
      currentParagraphRef.current = undefined;
      typingTask.clear();

      // 清理缓冲区
      const lastSegmentRef = lastSegmentRawRef.current;
      lastSegmentRef.thinkingBuffer = '';
      lastSegmentRef.answerBuffer = '';
      lastSegmentRef.thinkingReference = null;
      lastSegmentRef.answerReference = null;
    },
    /**
     * 主动触发打字结束
     */
    triggerWholeEnd: () => {
      // 先刷新所有缓冲区内容
      flushBuffer();

      isWholeTypedEndRef.current = true;
      if (!typingTask.isTyping()) {
        // 这里需要手动触发结束回调，因为 hook 中的 triggerOnEnd 不能直接调用
        onEnd?.({
          str: undefined,
          answerType: undefined,
        });
      }
    },
    /**
     * 刷新缓冲区 (新增方法)
     */
    flushBuffer,
  }));

  const getParagraphs = (paragraphs: IParagraph[], answerType: AnswerType) => {
    return (
      <div className={`ds-markdown-paragraph ds-typed-${answerType}`}>
        {paragraphs.map((paragraph, index) => {
          if (paragraph.type === 'br') {
            return null;
          }
          return <HighReactMarkdown key={index}>{paragraph.content || ''}</HighReactMarkdown>;
        })}
        {currentSegment?.answerType === answerType && <HighReactMarkdown key={currentSegment.content}>{currentSegment.content || ''}</HighReactMarkdown>}
      </div>
    );
  };

  return (
    <div
      className={classNames({
        'ds-markdown': true,
        apple: true,
      })}
    >
      {(thinkingParagraphs.length > 0 || currentSegment?.answerType === 'thinking') && <div className="ds-markdown-thinking">{getParagraphs(thinkingParagraphs, 'thinking')}</div>}
      {(answerParagraphs.length > 0 || currentSegment?.answerType === 'answer') && <div className="ds-markdown-answer">{getParagraphs(answerParagraphs, 'answer')}</div>}
    </div>
  );
});

export default MarkdownCMD;
