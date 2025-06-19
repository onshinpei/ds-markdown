import React, { memo, useEffect, useMemo, useRef } from 'react';
import { __DEV__ } from '../constant.js';
import { AnswerType, MarkdownProps, Theme } from '../defined.js';
import MarkdownCMD, { MarkdownCMDRef } from '../MarkdownCMD/index.js';

interface MarkdownImplProps extends MarkdownProps {
  children: string | undefined;
  answerType: AnswerType;
  theme?: Theme;
}

const MarkdownInner: React.FC<MarkdownImplProps> = ({ children: _children = '', answerType, ...rest }) => {
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

  return <MarkdownCMD ref={cmdRef} {...rest} />;
};

const Markdown: React.FC<MarkdownImplProps> = (props) => {
  const { children = '', answerType = 'answer' } = props;

  if (__DEV__) {
    if (!['thinking', 'answer'].includes(answerType)) {
      throw new Error('Markdown组件的answerType必须是thinking或answer');
    }
    if (typeof children !== 'string') {
      throw new Error('Markdown组件的子元素必须是一个字符串');
    }
  }

  return <MarkdownInner {...props} answerType={answerType} />;
};

export default memo(Markdown);
