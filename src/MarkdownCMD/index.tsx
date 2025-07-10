import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react';

import HighReactMarkdown from '../components/HighReactMarkdown';
import classNames from 'classnames';
import { AnswerType, MarkdownCMDProps, IChar, IWholeContent, MarkdownCMDRef } from '../defined';
import { __DEV__ } from '../constant';
import { useTypingTask } from '../hooks/useTypingTask';
import { DEFAULT_ANSWER_TYPE, DEFAULT_PLUGINS, DEFAULT_THEME, MarkdownThemeProvider, useMarkdownThemeContext } from '../context/MarkdownThemeProvider';
import { MarkdownProvider } from '../context/MarkdownProvider';

const MarkdownCMDInner = forwardRef<MarkdownCMDRef, MarkdownCMDProps>(
  ({ interval = 30, onEnd, onStart, onTypedChar, onBeforeTypedChar, timerType = 'setTimeout', disableTyping = false, autoStartTyping = true }, ref) => {
    const { state: themeState } = useMarkdownThemeContext();

    // 从 context 中获取主题配置
    const currentTheme = themeState.theme;

    /** 是否自动开启打字动画, 后面发生变化将不会生效 */
    const autoStartTypingRef = useRef(autoStartTyping);

    /** 是否打过字 */
    const isStartedTypingRef = useRef(false);

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
        prevLength: 0,
      },
      answer: {
        content: '',
        length: 0,
        prevLength: 0,
      },
      allLength: 0,
    });

    const [, setUpdate] = useState(0);
    const triggerUpdate = () => {
      setUpdate((prev) => prev + 1);
    };

    /**
     * 处理字符显示逻辑
     */
    const processCharDisplay = (char: IChar) => {
      if (!isStartedTypingRef.current) {
        isStartedTypingRef.current = true;
      }
      if (char.answerType === 'thinking') {
        wholeContentRef.current.thinking.content += char.content;
        wholeContentRef.current.thinking.length += 1;
      } else {
        wholeContentRef.current.answer.content += char.content;
        wholeContentRef.current.answer.length += 1;
      }
      triggerUpdate();
    };

    const resetWholeContent = () => {
      wholeContentRef.current.thinking.content = '';
      wholeContentRef.current.thinking.length = 0;
      wholeContentRef.current.thinking.prevLength = 0;
      wholeContentRef.current.answer.content = '';
      wholeContentRef.current.answer.length = 0;
      wholeContentRef.current.answer.prevLength = 0;
      wholeContentRef.current.allLength = 0;
    };

    // 使用新的打字任务 hook
    const typingTask = useTypingTask({
      timerType,
      interval,
      charsRef,
      onEnd,
      onStart,
      onTypedChar,
      onBeforeTypedChar,
      processCharDisplay,
      wholeContentRef,
      disableTyping,
      triggerUpdate,
      resetWholeContent,
    });

    /**
     * 内部推送处理逻辑
     */
    const processHasTypingPush = (content: string, answerType: AnswerType) => {
      if (content.length === 0) {
        return;
      }

      charsRef.current.push(
        ...content.split('').map((chatStr) => {
          const index = charIndexRef.current++;
          const charObj: IChar = {
            content: chatStr,
            answerType,
            tokenId: 0,
            index,
          };
          return charObj;
        }),
      );

      wholeContentRef.current.allLength += content.length;

      // 如果关闭了自动打字， 并且没有打过字， 则不开启打字动画
      if (!autoStartTypingRef.current && !isStartedTypingRef.current) {
        return;
      }

      if (!typingTask.isTyping()) {
        typingTask.start();
      }
    };

    const processNoTypingPush = (content: string, answerType: AnswerType) => {
      wholeContentRef.current[answerType].content += content;
      // 记录打字前的长度
      wholeContentRef.current[answerType].prevLength = wholeContentRef.current[answerType].length;
      wholeContentRef.current[answerType].length += content.length;
      triggerUpdate();
      onEnd?.({
        str: content,
        answerStr: wholeContentRef.current.answer.content,
        thinkingStr: wholeContentRef.current.thinking.content,
        manual: false,
      });
    };

    useImperativeHandle(ref, () => ({
      /**
       * 添加内容
       * @param content 内容 {string}
       * @param answerType 回答类型 {AnswerType}
       */
      push: (content: string, answerType: AnswerType = 'answer') => {
        if (disableTyping) {
          processNoTypingPush(content, answerType);
          return;
        }
        processHasTypingPush(content, answerType);
      },
      /**
       * 清除打字任务
       */
      clear: () => {
        typingTask.stop();

        typingTask.typedIsManualStopRef.current = false;
        charsRef.current = [];
        resetWholeContent();
        isWholeTypedEndRef.current = false;
        charIndexRef.current = 0;
        isStartedTypingRef.current = false;

        triggerUpdate();
      },
      /** 开启打字，只有在关闭了自动打字才生效 */
      start: () => {
        if (!autoStartTypingRef.current) {
          typingTask.start();
        }
      },
      /** 停止打字任务 */
      stop: () => {
        typingTask.stop();
      },
      /** 重新开始打字任务 */
      resume: () => {
        typingTask.resume();
      },
      /**
       * 主动触发打字结束
       */
      triggerWholeEnd: () => {
        isWholeTypedEndRef.current = true;
        if (!typingTask.isTyping()) {
          // 这里需要手动触发结束回调，因为 hook 中的 triggerOnEnd 不能直接调用
          onEnd?.({
            str: wholeContentRef.current.answer.content,
            answerStr: wholeContentRef.current.answer.content,
            thinkingStr: wholeContentRef.current.thinking.content,
            manual: true,
          });
        }
      },
      /** 重新开始打字任务 */
      restart: () => {
        typingTask.restart();
      },
    }));

    const getParagraphs = (answerType: AnswerType) => {
      const content = wholeContentRef.current[answerType].content || '';
      return (
        <div className={`ds-markdown-paragraph ds-typed-${answerType}`}>
          <HighReactMarkdown>{content}</HighReactMarkdown>
        </div>
      );
    };

    return (
      <div
        className={classNames({
          'ds-markdown': true,
          apple: true,
          'ds-markdown-dark': currentTheme === 'dark',
        })}
      >
        <div className="ds-markdown-thinking">{getParagraphs('thinking')}</div>

        <div className="ds-markdown-answer">{getParagraphs('answer')}</div>
      </div>
    );
  },
);

if (__DEV__) {
  MarkdownCMDInner.displayName = 'MarkdownCMD';
}

const MarkdownCMD = forwardRef<MarkdownCMDRef, MarkdownCMDProps>((props, ref) => {
  const { children = '', answerType = 'answer', isInnerRender, ...reset } = props;

  if (__DEV__) {
    if (!['thinking', 'answer'].includes(answerType)) {
      throw new Error('Markdown组件的answerType必须是thinking或answer');
    }
    if (typeof children !== 'string') {
      throw new Error('Markdown组件的子元素必须是一个字符串');
    }
  }

  const contextValue = useMemo(() => ({ ...reset, answerType }), [reset, answerType]);

  // 分离主题相关的 props
  const themeProps = useMemo(
    () => ({
      theme: props.theme || DEFAULT_THEME,
      math: props.math,
      codeBlock: props.codeBlock,
      plugins: props.plugins || DEFAULT_PLUGINS,
      answerType: props.answerType || DEFAULT_ANSWER_TYPE,
    }),
    [props.theme, props.math, props.codeBlock, props.plugins, props.answerType],
  );

  if (isInnerRender) {
    // 内部渲染，外层已经 context 传递了 props，这里不再重复传递
    return <MarkdownCMDInner {...props} ref={ref} />;
  }

  return (
    <MarkdownProvider value={contextValue}>
      <MarkdownThemeProvider value={themeProps}>
        <MarkdownCMDInner {...props} ref={ref} />
      </MarkdownThemeProvider>
    </MarkdownProvider>
  );
});

export default MarkdownCMD;
