import React, { forwardRef, memo, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { __DEV__ } from '../constant';
import { MarkdownCMDRef, MarkdownProps, MarkdownRef } from '../defined';
import MarkdownCMD from '../MarkdownCMD';

import { MarkdownProvider } from '../context/MarkdownProvider';
import { DEFAULT_ANSWER_TYPE, DEFAULT_PLUGINS, DEFAULT_THEME, MarkdownThemeProvider } from '../context/MarkdownThemeProvider';

interface MarkdownInnerProps extends MarkdownProps {
  markdownRef: React.ForwardedRef<MarkdownRef>;
}

const MarkdownInner: React.FC<MarkdownInnerProps> = ({ children: _children = '', answerType = 'answer', markdownRef, timerType = 'requestAnimationFrame', ...rest }) => {
  const cmdRef = useRef<MarkdownCMDRef>(null!);
  const prefixRef = useRef('');
  const content = useMemo(() => {
    if (typeof _children === 'string') {
      return _children;
    }
    if (__DEV__) {
      console.error('The children of Markdown component must be a string');
    }
    return '';
  }, [_children]);

  useEffect(() => {
    if (prefixRef.current !== content) {
      let newContent = '';
      if (prefixRef.current === '') {
        newContent = content;
      } else {
        if (content.startsWith(prefixRef.current)) {
          newContent = content.slice(prefixRef.current.length);
        } else {
          newContent = content;
          cmdRef.current.clear();
        }
      }
      cmdRef.current.push(newContent, answerType);
      prefixRef.current = content;
    }
  }, [answerType, content]);

  useImperativeHandle(markdownRef, () => ({
    stop: () => {
      cmdRef.current.stop();
    },
    resume: () => {
      cmdRef.current.resume();
    },
    start: () => {
      cmdRef.current.start();
    },
    restart: () => {
      cmdRef.current.restart();
    },
  }));

  // Get interval from props, use default value 30 if not provided
  const interval = 'interval' in rest ? rest.interval : 30;
  return <MarkdownCMD ref={cmdRef} {...rest} interval={interval} answerType={answerType} timerType={timerType} isInnerRender />;
};

const Markdown = forwardRef<MarkdownRef, MarkdownProps>((props, ref) => {
  const { children = '', answerType = 'answer', ...reset } = props;

  if (__DEV__) {
    if (!['thinking', 'answer'].includes(answerType)) {
      throw new Error('The answerType of Markdown component must be thinking or answer');
    }
    if (typeof children !== 'string') {
      throw new Error('The children of Markdown component must be a string');
    }
  }

  const contextValue = useMemo(() => ({ ...reset, answerType }), [reset, answerType]);

  // Separate theme-related props
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

  return (
    <MarkdownProvider value={contextValue}>
      <MarkdownThemeProvider value={themeProps}>
        <MarkdownInner {...props} answerType={answerType} markdownRef={ref} />
      </MarkdownThemeProvider>
    </MarkdownProvider>
  );
});

export default memo(Markdown);
