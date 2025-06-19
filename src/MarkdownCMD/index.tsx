import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

import HighReactMarkdown from '../components/HighReactMarkdown/index.js';
import classNames from 'classnames';
import { AnswerType, MarkdownProps, IChar, IWholeContent } from '../defined.js';
import { __DEV__ } from '../constant.js';
import { useTypingTask } from '../hooks/useTypingTask.js';

type MarkdownCMDProps = MarkdownProps;

export interface MarkdownRef {
  push: (content: string, answerType: AnswerType) => void;
  clear: () => void;
  triggerWholeEnd: () => void;
}
const MarkdownCMD = forwardRef<MarkdownRef, MarkdownCMDProps>(({ interval = 30, onEnd, onStart, onTypedChar, timerType = 'setTimeout', theme = 'light' }, ref) => {
  /** 当前需要打字的内容 */
  const charsRef = useRef<IChar[]>([]);

  /**
   * 打字是否已经完全结束
   * 如果打字已经完全结束，则不会再触发打字效果
   */
  const isWholeTypedEndRef = useRef(false);
  const charIndexRef = useRef(0);

  /** 整个内容引用 */
  const wholeContentRef = useRef<IWholeContent>({
    thinking: {
      content: '',
      length: 0,
    },
    answer: {
      content: '',
      length: 0,
    },
    allLength: 0,
  });

  const [, setUpdate] = useState(false);
  const triggerUpdate = () => {
    setUpdate((prev) => !prev);
  };

  /**
   * 处理字符显示逻辑
   */
  const processCharDisplay = (char: IChar) => {
    if (char.answerType === 'thinking') {
      wholeContentRef.current.thinking.content += char.content;
      wholeContentRef.current.thinking.length += 1;
    } else {
      wholeContentRef.current.answer.content += char.content;
      wholeContentRef.current.answer.length += 1;
    }
    triggerUpdate();
  };

  // 使用新的打字任务 hook
  const typingTask = useTypingTask({
    timerType,
    interval,
    charsRef,
    onEnd,
    onStart,
    onTypedChar,
    processCharDisplay,
    wholeContentRef,
  });

  /**
   * 内部推送处理逻辑
   */
  const processPushInternal = (content: string, answerType: AnswerType) => {
    if (content.length === 0) {
      return;
    }

    charsRef.current.push(
      ...content.split('').map((chatStr) => {
        const index = charIndexRef.current++;
        const charObj: IChar = {
          content: chatStr,
          answerType,
          contentType: 'segment',
          tokenId: 0,
          index,
        };
        return charObj;
      }),
    );

    wholeContentRef.current.allLength += content.length;

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
      wholeContentRef.current = {
        thinking: {
          content: '',
          length: 0,
        },
        answer: {
          content: '',
          length: 0,
        },
      };
      isWholeTypedEndRef.current = false;
      charIndexRef.current = 0;
      triggerUpdate();
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

  const getParagraphs = (answerType: AnswerType) => {
    return (
      <div className={`ds-markdown-paragraph ds-typed-${answerType}`}>
        <HighReactMarkdown theme={theme}>{wholeContentRef.current[answerType].content || ''}</HighReactMarkdown>
      </div>
    );
  };

  return (
    <div
      className={classNames({
        'ds-markdown': true,
        apple: true,
        'ds-markdown-dark': theme === 'dark',
      })}
    >
      <div className="ds-markdown-thinking">{getParagraphs('thinking')}</div>

      <div className="ds-markdown-answer">{getParagraphs('answer')}</div>
    </div>
  );
});

if (__DEV__) {
  MarkdownCMD.displayName = 'MarkdownCMD';
}

export default MarkdownCMD;
