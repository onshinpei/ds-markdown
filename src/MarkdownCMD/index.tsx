import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react';

import HighReactMarkdown from '../components/HighReactMarkdown';
import classNames from 'classnames';
import { AnswerType, MarkdownCMDProps, IChar, IWholeContent, MarkdownCMDRef } from '../defined';
import { __DEV__ } from '../constant';
import { useTypingTask } from '../hooks/useTypingTask';
import { MarkdownCMD as MarkdownCMDTyper, MarkdownCMDRef as MarkdownCMDTyperRef, MarkdownCMDProps as MarkdownCMDTyperProps } from 'react-markdown-typer';
import { DEFAULT_ANSWER_TYPE, DEFAULT_PLUGINS, DEFAULT_THEME, MarkdownThemeProvider, useMarkdownThemeContext } from '../context/MarkdownThemeProvider';
import { MarkdownProvider } from '../context/MarkdownProvider';

const MarkdownCMDInner = forwardRef<MarkdownCMDRef, MarkdownCMDTyperProps & { answerType: AnswerType }>(({ answerType = 'answer', ...rest }, ref) => {
  const { state: themeState } = useMarkdownThemeContext();
  const cmdRef = useRef<MarkdownCMDTyperRef>(null!);

  // 从 context 中获取主题配置
  const currentTheme = themeState.theme;

  useImperativeHandle(ref, () => ({
    push: cmdRef.current.push,
    clear: cmdRef.current.clear,
    triggerWholeEnd: cmdRef.current.triggerWholeEnd,
    stop: cmdRef.current.stop,
    resume: cmdRef.current.resume,
    start: cmdRef.current.start,
    restart: cmdRef.current.restart,
  }));

  return (
    <div
      className={classNames({
        'ds-markdown': true,
        apple: true,
        'ds-markdown-dark': currentTheme === 'dark',
      })}
    >
      {/* <div className="ds-markdown-thinking">{getParagraphs('thinking')}</div>

        <div className="ds-markdown-answer">{getParagraphs('answer')}</div> */}

      <div className={`ds-markdown-${answerType}`}>
        <MarkdownCMDTyper ref={cmdRef} {...rest} />
      </div>
    </div>
  );
});

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
