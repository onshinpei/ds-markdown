import React, { forwardRef, memo, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { __DEV__ } from '../constant.js';
import { AnswerType, MarkdownCMDRef, MarkdownProps, MarkdownRef, Theme } from '../defined.js';
import MarkdownCMD from '../MarkdownCMD/index.js';

interface MarkdownImplProps extends MarkdownProps {
  children: string | undefined;
  answerType: AnswerType;
  theme?: Theme;
}

interface MarkdownInnerProps extends MarkdownImplProps {
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
  }));

  return <MarkdownCMD ref={cmdRef} {...rest} />;
};

const Markdown = forwardRef<MarkdownRef, MarkdownImplProps>((props, ref) => {
  const { children = '', answerType = 'answer' } = props;

  if (__DEV__) {
    if (!['thinking', 'answer'].includes(answerType)) {
      throw new Error('Markdown组件的answerType必须是thinking或answer');
    }
    if (typeof children !== 'string') {
      throw new Error('Markdown组件的子元素必须是一个字符串');
    }
  }

  return <MarkdownInner {...props} answerType={answerType} markdownRef={ref} />;
});

export default memo(Markdown);
