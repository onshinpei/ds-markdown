import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';

import HighReactMarkdown from '../components/HighReactMarkdown/index.js';
import classNames from 'classnames';
import { AnswerType, IParagraph, MarkdownProps } from '../defined.js';
import { compiler } from '../utils/compiler.js';
import { __DEV__ } from '../constant.js';
import deepClone from '../utils/methods/deepClone.js';
import { Token } from '../utils/Tokenizer.js';

type MarkdownCMDProps = MarkdownProps;

interface IChar {
  content: string;
  answerType: AnswerType;
  /**
   * split_segment 两个连续的段落，需要做分割
   */
  contentType: 'space' | 'segment' | 'split_segment';
  tokenId: number;
}

export interface MarkdownRef {
  push: (content: string, answerType: AnswerType) => void;
  clear: () => void;
  triggerWholeEnd: () => void;
}
const MarkdownCMD = forwardRef<MarkdownRef, MarkdownCMDProps>(({ interval = 30, onEnd, onStart, onTypedChar, timerType = 'requestAnimationFrame' }, ref) => {
  /** 当前需要打字的内容 */
  const charsRef = useRef<IChar[]>([]);

  /**
   * 打字是否已经完全结束
   * 如果打字已经完全结束，则不会再触发打字效果
   */
  const isWholeTypedEndRef = useRef(false);

  /** 已经打过的字 */
  const typedCharsRef = useRef<{ typedContent: string; answerType: AnswerType; prevStr: string } | undefined>(undefined);
  /** 是否卸载 */
  const isUnmountRef = useRef(false);
  /** 是否正在打字 */
  const isTypedRef = useRef(false);

  // 时间戳驱动相关状态
  /** 打字开始时间 */
  const startTimeRef = useRef<number | null>(null);
  /** 已经打出的字符数量 */
  const typedCountRef = useRef<number>(0);
  /** 动画帧ID */
  const animationFrameRef = useRef<number | null>(null);
  /** 传统定时器（兼容模式） */
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  /** 打字结束回调, */
  const onEndRef = useRef(onEnd);
  onEndRef.current = onEnd;
  /** 打字开始回调 */
  const onStartRef = useRef(onStart);
  onStartRef.current = onStart;
  /** 打字过程中回调 */
  const onTypedCharRef = useRef(onTypedChar);
  onTypedCharRef.current = onTypedChar;

  /**
   * 稳定段落
   * 稳定段落是已经打过字，并且不会再变化的段落
   */
  const [stableSegments, setStableSegments] = useState<IParagraph[]>([]);
  /** 当前段落 */
  const [currentSegment, setCurrentSegment] = useState<IParagraph | undefined>(undefined);
  /** 当前段落引用 */
  const currentParagraphRef = useRef<IParagraph | undefined>(undefined);
  currentParagraphRef.current = currentSegment;

  /** 清除打字定时器 */
  const clearTimer = () => {
    if (timerType === 'timestamp') {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    } else if (timerType === 'requestAnimationFrame') {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    } else {
      // setTimeout mode
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }
    isTypedRef.current = false;
    startTimeRef.current = null;
    typedCountRef.current = 0;
  };

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
        setCurrentSegment(undefined);
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
    let _currentParagraph = currentSegment;
    const newCurrentParagraph: IParagraph = {
      content: '',
      isTyped: false,
      type: 'text',
      answerType: char.answerType,
      tokensReference: {},
    };

    if (!_currentParagraph) {
      // 如果当前没有段落，则直接设置为当前段落
      _currentParagraph = newCurrentParagraph;
    } else if (currentSegment && currentSegment?.answerType !== char.answerType) {
      // 如果当前段落和当前字符的回答类型不一致，则需要处理成两个段落
      setStableSegments((prev) => {
        const newParagraphs = [...prev];
        newParagraphs.push({ ...currentSegment, isTyped: false });
        return newParagraphs;
      });
      _currentParagraph = newCurrentParagraph;
      setCurrentSegment(_currentParagraph);
    }

    setCurrentSegment((prev) => {
      const tokensReference = deepClone(_currentParagraph.tokensReference);
      if (tokensReference[char.tokenId]) {
        tokensReference[char.tokenId].raw += char.content;
        tokensReference[char.tokenId].startIndex = prev?.content?.length || 0;
      } else {
        tokensReference[char.tokenId] = {
          startIndex: prev?.content?.length || 0,
          raw: char.content,
        };
      }

      return {
        ..._currentParagraph,
        tokensReference,
        content: (prev?.content || '') + char.content,
        isTyped: true,
      };
    });
  };

  useEffect(() => {
    isUnmountRef.current = false;

    return () => {
      isUnmountRef.current = true;
    };
  }, []);

  /** 思考段落 */
  const thinkingParagraphs = useMemo(() => stableSegments.filter((paragraph) => paragraph.answerType === 'thinking'), [stableSegments]);
  /** 回答段落 */
  const answerParagraphs = useMemo(() => stableSegments.filter((paragraph) => paragraph.answerType === 'answer'), [stableSegments]);

  /**
   * 记录打过的字
   * @param char 当前字符
   * @returns
   */
  const recordTypedChars = (char: IChar) => {
    let prevStr = '';
    if (!typedCharsRef.current || typedCharsRef.current.answerType !== char.answerType) {
      typedCharsRef.current = {
        typedContent: char.content,
        answerType: char.answerType,
        prevStr: '',
      };
    } else {
      prevStr = typedCharsRef.current.typedContent;
      typedCharsRef.current.typedContent += char.content;
      typedCharsRef.current.prevStr = prevStr;
    }

    return {
      prevStr,
      nextStr: typedCharsRef.current?.typedContent || '',
    };
  };

  /**
   * 触发打字开始回调
   * @param char 当前字符
   */
  const triggerOnStart = (char: IChar) => {
    const onStartFn = onStartRef.current;
    if (!onStartFn) {
      return;
    }
    const { prevStr } = recordTypedChars(char);
    onStartRef.current?.({
      currentIndex: prevStr.length,
      currentChar: char.content,
      answerType: char.answerType,
      prevStr,
    });
  };

  /**
   * 触发打字结束回调
   */
  const triggerOnEnd = () => {
    const onEndFn = onEndRef.current;
    if (!onEndFn) {
      return;
    }

    onEndFn({
      str: typedCharsRef.current?.typedContent,
      answerType: typedCharsRef.current?.answerType,
    });
  };

  /**
   * 触发打字过程中回调
   * @param char 当前字符
   * @param isStartPoint 是否是开始打字(第一个字)
   */
  const triggerOnTypedChar = (char: IChar, isStartPoint = false) => {
    const onTypedCharFn = onTypedCharRef.current;
    if (!isStartPoint) {
      recordTypedChars(char);
    }
    if (!onTypedCharFn) {
      return;
    }

    onTypedCharFn({
      currentIndex: typedCharsRef.current?.prevStr.length || 0,
      currentChar: char.content,
      answerType: char.answerType,
      prevStr: typedCharsRef.current?.prevStr || '',
    });
  };

  /**
   * 处理下一个字符（用于时间戳驱动模式）
   */
  const processNextChar = (): boolean => {
    const chars = charsRef.current;
    if (chars.length === 0) {
      return false;
    }

    const char = chars.shift();
    if (char === undefined) {
      return false;
    }

    // 第一个字符需要触发开始回调
    if (typedCountRef.current === 0) {
      triggerOnStart(char);
      triggerOnTypedChar(char, true);
    } else {
      triggerOnTypedChar(char);
    }

    processCharDisplay(char);
    typedCountRef.current++;
    return true;
  };

  /** 开始打字任务 */
  const startTypedTask = () => {
    if (isTypedRef.current) {
      return;
    }

    if (timerType === 'timestamp') {
      // 时间戳驱动模式 - 能在后台继续运行
      startTimeRef.current = Date.now();
      typedCountRef.current = 0;
      isTypedRef.current = true;

      /** 时间戳驱动的打字循环 */
      const timestampLoop = (currentTime: number) => {
        if (isUnmountRef.current || !isTypedRef.current) {
          return;
        }

        const chars = charsRef.current;
        if (chars.length === 0) {
          // 打字完成
          isTypedRef.current = false;
          triggerOnEnd();
          return;
        }

        if (!startTimeRef.current) {
          startTimeRef.current = currentTime;
        }

        const elapsed = currentTime - startTimeRef.current;
        const expectedChars = Math.floor(elapsed / interval);
        const actualChars = typedCountRef.current;

        // 如果需要追赶进度，一次性打出多个字符
        if (expectedChars > actualChars) {
          const charsToType = Math.min(expectedChars - actualChars, chars.length);

          for (let i = 0; i < charsToType; i++) {
            if (!processNextChar()) {
              break;
            }
          }
        }

        // 继续下一帧
        if (chars.length > 0) {
          animationFrameRef.current = requestAnimationFrame(timestampLoop);
        } else {
          isTypedRef.current = false;
          triggerOnEnd();
        }
      };

      animationFrameRef.current = requestAnimationFrame(timestampLoop);
    } else if (timerType === 'requestAnimationFrame') {
      // requestAnimationFrame 模式 - 会在后台暂停
      const chars = charsRef.current;
      let lastFrameTime = 0;

      /** 停止打字 */
      const stopTyped = () => {
        isTypedRef.current = false;
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
        triggerOnEnd();
      };

      /**
       * requestAnimationFrame 循环
       */
      const frameLoop = (currentTime: number) => {
        if (isUnmountRef.current) {
          return;
        }

        if (chars.length === 0) {
          stopTyped();
          return;
        }

        // 控制间隔时间
        if (currentTime - lastFrameTime >= interval) {
          const char = chars.shift();
          if (char === undefined) {
            stopTyped();
            return;
          }

          if (!isTypedRef.current) {
            // 第一个字符
            isTypedRef.current = true;
            triggerOnStart(char);
            triggerOnTypedChar(char, true);
          } else {
            triggerOnTypedChar(char);
          }

          processCharDisplay(char);
          lastFrameTime = currentTime;
        }

        // 继续下一帧
        animationFrameRef.current = requestAnimationFrame(frameLoop);
      };

      animationFrameRef.current = requestAnimationFrame(frameLoop);
    } else {
      // 传统 setTimeout 模式 - 会在后台暂停
      const chars = charsRef.current;

      /** 停止打字 */
      const stopTyped = () => {
        isTypedRef.current = false;
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
        triggerOnEnd();
      };

      /** 打下一个字 */
      const nextTyped = () => {
        if (chars.length === 0) {
          stopTyped();
          return;
        }
        timerRef.current = setTimeout(startTyped, interval);
      };

      /**
       * 开始打字
       * @param isStartPoint 是否是开始打字
       */
      function startTyped(isStartPoint = false) {
        if (isUnmountRef.current) {
          return;
        }
        isTypedRef.current = true;

        const char = chars.shift();
        if (char === undefined) {
          stopTyped();
          return;
        }

        if (isStartPoint) {
          triggerOnStart(char);
          triggerOnTypedChar(char, isStartPoint);
        } else {
          triggerOnTypedChar(char);
        }

        processCharDisplay(char);
        nextTyped();
      }

      startTyped(true);
    }
  };

  const lastSegmentRawRef = useRef<{
    thinking: string;
    answer: string;
    thinkingReference: Token | null;
    answerReference: Token | null;
  }>({
    thinking: '',
    answer: '',
    thinkingReference: null,
    answerReference: null,
  });

  useImperativeHandle(ref, () => ({
    /**
     * 添加内容
     * @param content 内容 {string}
     * @param answerType 回答类型 {AnswerType}
     */
    push: (content: string, answerType: AnswerType) => {
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

      // debugger;

      const tokens = compiler(currentLastSegmentRaw);
      // 如果最后一个token是space，则把lastSegmentRaw设置为空
      if (tokens[tokens.length - 1].type === 'space') {
        currentLastSegmentReference = null;
      } else {
        currentLastSegmentReference = tokens[tokens.length - 1];
      }

      const pushAndSplitSegment = (raw: string, currenIndex: number) => {
        const currentToken = tokens[currenIndex];
        if (currenIndex > 0) {
          const prevToken = tokens[currenIndex - 1];

          if (prevToken.type !== 'space' && currentToken.type !== 'space') {
            charsRef.current.push({ content: '', answerType, contentType: 'split_segment', tokenId: currentToken.id });
          }
        }

        charsRef.current.push(...(raw.split('').map((char) => ({ content: char, answerType, contentType: 'segment', tokenId: currentToken.id })) as IChar[]));
      };

      if (!lastSegmentReference) {
        tokens.forEach((token, i) => {
          if (token.type === 'space') {
            charsRef.current.push({ content: token.raw, answerType, contentType: 'space', tokenId: token.id });
          } else {
            pushAndSplitSegment(token.raw, i);
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
              pushAndSplitSegment(realRaw, i);
            }
          }

          nextTokenIndex = str.length;
        }
      }

      lastSegmentRawRef.current[`${answerType}Reference`] = currentLastSegmentReference;

      if (!isTypedRef.current) {
        startTypedTask();
      }
    },
    /**
     * 清除打字任务
     */
    clear: () => {
      clearTimer();
      charsRef.current = [];
      setStableSegments([]);
      setCurrentSegment(undefined);
      isWholeTypedEndRef.current = false;
      typedCharsRef.current = undefined;
      startTimeRef.current = null;
      typedCountRef.current = 0;
      lastSegmentRawRef.current = {
        thinking: '',
        answer: '',
        thinkingReference: null,
        answerReference: null,
      };
    },
    /**
     * 主动触发打字结束
     */
    triggerWholeEnd: () => {
      isWholeTypedEndRef.current = true;
      if (!isTypedRef.current) {
        triggerOnEnd();
      }
    },
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
