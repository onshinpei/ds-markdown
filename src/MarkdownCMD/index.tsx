import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';

import HighReactMarkdown from '../components/HighReactMarkdown/index.js';
import classNames from 'classnames';
import { AnswerType, IParagraph, MarkdownProps, IChar, ITokensReference } from '../defined.js';
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
}
const MarkdownCMD = forwardRef<MarkdownRef, MarkdownCMDProps>(({ interval = 30, onEnd, onStart, onTypedChar, timerType = 'setTimeout' }, ref) => {
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

  /**
   * 处理字符显示逻辑
   */
  const processCharDisplay = (char: IChar) => {
    console.log('processCharDisplay', char);
    const currentSegment = currentParagraphRef.current;
    // debugger;
    /** 如果碰到 space，和split_segment 则需要处理成两个段落 */
    if (char.contentType === 'space' || char.contentType === 'split_segment') {
      if (currentSegment) {
        setStableSegments((prev) => {
          const newParagraphs = [...prev];
          // 放入到稳定队列
          if (currentSegment) {
            debugger;
            newParagraphs.push({ ...currentSegment, isTyped: false });
          }
          return newParagraphs;
        });
        setCurrentSegment(() => undefined);
        currentParagraphRef.current = undefined;
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
    thinkingReference: Token | null;
    answerReference: Token | null;
  }>({
    thinkingReference: null,
    answerReference: null,
  });

  const wholeContentRef = useRef<{
    thinking: {
      content: string;
      length: number;
    };
    answer: {
      content: string;
      length: number;
    };
  }>({
    thinking: {
      content: '',
      length: 0,
    },
    answer: {
      content: '',
      length: 0,
    },
  });

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
    const wholeContent = wholeContentRef.current[`${answerType}`] || '';
    let currentIndex = wholeContent.length;

    let currentLastSegmentReference: Token | null = null;
    let currentLastSegmentRaw = '';
    let lastSegmentRaw = '';
    if (lastSegmentReference) {
      lastSegmentRaw = lastSegmentReference.raw;
      currentLastSegmentRaw = lastSegmentRaw + content;
    } else {
      currentLastSegmentRaw = content;
    }

    const tokens = compiler(currentLastSegmentRaw);

    // 如果最后一个token是space，则把lastSegmentRaw设置为空
    if (tokens[tokens.length - 1].type === 'space') {
      currentLastSegmentReference = null;
    } else {
      // 如果上一个segment存在并且当前只有一个token，则说明是同一个segment
      if (lastSegmentReference !== null && tokens.length === 1) {
        const newCurrentLastSegmentReference = lastSegmentReference;
        newCurrentLastSegmentReference.raw = newCurrentLastSegmentReference.raw + content;
        currentLastSegmentReference = newCurrentLastSegmentReference;
      } else {
        currentLastSegmentReference = tokens[tokens.length - 1];
      }
    }

    const pushAndSplitSegment = (raw: string, tokenIndex: number, segmentTokenId: number) => {
      const currentToken = tokens[tokenIndex];
      if (tokenIndex > 0) {
        const prevToken = tokens[tokenIndex - 1];
        if (prevToken.type !== 'space' && currentToken.type !== 'space') {
          charsRef.current.push({ content: '', answerType, contentType: 'split_segment', tokenId: currentToken.id, index: currentIndex++ });
        }
      }

      charsRef.current.push(...(raw.split('').map((char) => ({ content: char, answerType, contentType: 'segment', tokenId: segmentTokenId, index: currentIndex++ })) as IChar[]));
    };

    if (!lastSegmentReference) {
      tokens.forEach((token, i) => {
        if (token.type === 'space') {
          charsRef.current.push(...(token.raw.split('').map((char) => ({ content: char, answerType, contentType: 'space', tokenId: token.id, index: currentIndex++ })) as IChar[]));
        } else {
          pushAndSplitSegment(token.raw, i, token.id);
        }
      });
    } else {
      // debugger;
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
            charsRef.current.push(...(token.raw.split('').map((char) => ({ content: char, answerType, contentType: 'segment', tokenId: token.id, index: currentIndex++ })) as IChar[]));
          } else {
            charsRef.current.push(...(token.raw.split('').map((char) => ({ content: char, answerType, contentType: 'space', tokenId: token.id, index: currentIndex++ })) as IChar[]));
          }
        } else {
          str += token.raw;
          if (str.length < nextTokenIndex && i == 0) {
            /** 如果当前字符串长度小于下一个token的索引，则需要将当前段落更新, 以修正不完整的token */
            const lastSegmentReferenceId = lastSegmentReference.id;
            const currentSegment = currentParagraphRef.current;
            const tokensReference = currentSegment?.tokensReference || {};
            const lastTokenReference = tokensReference[lastSegmentReferenceId];
            if (lastTokenReference) {
              const newTokensReference: Record<string, ITokensReference> = { ...tokensReference, [lastSegmentReferenceId]: { startIndex: lastTokenReference.startIndex, raw: token.raw } };
              const newCurrentSegment: IParagraph = { ...currentSegment, tokensReference: newTokensReference, isTyped: false, type: 'text', answerType };
              newCurrentSegment.content = Object.values(newTokensReference).reduce((acc, curr) => acc + curr.raw, '');
              setCurrentSegment(newCurrentSegment);
              currentParagraphRef.current = newCurrentSegment;
            }
          }
          const realRaw = str.slice(nextTokenIndex);
          if (realRaw.length > 0) {
            pushAndSplitSegment(realRaw, i, lastSegmentReference.id);
          }
        }

        nextTokenIndex = str.length;
      }
    }

    lastSegmentRawRef.current[`${answerType}Reference`] = currentLastSegmentReference;

    wholeContent.content = wholeContent.content + content;
    wholeContent.length = wholeContent.content.length;

    if (!typingTask.isTyping()) {
      typingTask.start();
    }
  };

  useImperativeHandle(ref, () => ({
    /**
     * 添加内容
     * @param content 内容 {string}
     * @param answerType 回答类型 {AnswerType}
     */
    push: (content: string, answerType: AnswerType) => {
      processPushInternal(content, answerType);
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
      lastSegmentRef.thinkingReference = null;
      lastSegmentRef.answerReference = null;

      wholeContentRef.current.thinking.content = '';
      wholeContentRef.current.thinking.length = 0;
      wholeContentRef.current.answer.content = '';
      wholeContentRef.current.answer.length = 0;
    },
    /**
     * 主动触发打字结束
     */
    triggerWholeEnd: () => {
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
