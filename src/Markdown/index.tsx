import React, { forwardRef, memo, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { __DEV__ } from '../constant';
import { MarkdownCMDRef, MarkdownProps, MarkdownRef } from '../defined';
import MarkdownCMD from '../MarkdownCMD';
import { MarkdownProvider } from '../context/MarkdownProvider';

interface MarkdownInnerProps extends MarkdownProps {
  markdownRef: React.ForwardedRef<MarkdownRef>;
}

const MarkdownInner: React.FC<MarkdownInnerProps> = ({ children: _children = '', answerType, markdownRef, ...rest }) => {
  const cmdRef = useRef<MarkdownCMDRef>(null!);
  const prefixRef = useRef('');
  const content = useMemo(() => {
    if (typeof _children === 'string') {
      return _children;
    }
    if (__DEV__) {
      console.error('Markdown组件的子元素必须是一个字符串');
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

  return <MarkdownCMD ref={cmdRef} {...rest} />;
};

const Markdown = forwardRef<MarkdownRef, MarkdownProps>((props, ref) => {
  const { children = '', answerType = 'answer', ...reset } = props;

  if (__DEV__) {
    if (!['thinking', 'answer'].includes(answerType)) {
      throw new Error('Markdown组件的answerType必须是thinking或answer');
    }
    if (typeof children !== 'string') {
      throw new Error('Markdown组件的子元素必须是一个字符串');
    }
  }

  const contextValue = useMemo(() => ({ ...reset, answerType }), [reset, answerType]);

  return (
    <MarkdownProvider value={contextValue}>
      <MarkdownInner {...props} answerType={answerType} markdownRef={ref} />
    </MarkdownProvider>
  );
});

export default memo(Markdown);
