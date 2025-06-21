import React, { memo, useMemo } from 'react';
import Markdown from 'react-markdown';
import type { Options } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import gfmPlugin from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { replaceMathBracket } from '../../utils/remarkMathBracket';
import BlockWrap from '../BlockWrap/index.js';
import { IMarkdownMath, Theme } from '../../defined.js';

interface HighReactMarkdownProps extends Options {
  theme?: Theme;
  children: string;
  math?: IMarkdownMath;
}

const HighReactMarkdown: React.FC<HighReactMarkdownProps> = ({ theme = 'light', children: _children, math, ...props }) => {
  let children = _children;

  const mathOpen = math?.isOpen ?? false;
  const mathSplitSymbol = math?.splitSymbol ?? 'dollar';

  if (mathOpen && mathSplitSymbol === 'bracket') {
    children = replaceMathBracket(children);
  }

  const remarkPlugins = useMemo(() => {
    if (math?.isOpen) {
      return [gfmPlugin, remarkMath];
    }
    return [gfmPlugin];
  }, [math]);

  const rehypePlugins = useMemo(() => {
    if (mathOpen) {
      return [rehypeKatex];
    }
    return [];
  }, [mathOpen]);

  return (
    <Markdown
      remarkPlugins={remarkPlugins}
      rehypePlugins={rehypePlugins}
      components={{
        code: ({ className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '');
          return match ? (
            <BlockWrap language={match[1]} theme={theme}>
              <SyntaxHighlighter useInlineStyles={false} language={match[1]} style={{}}>
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            </BlockWrap>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
        table: ({ children, ...props }) => {
          return (
            <div className="markdown-table-wrapper">
              <table className="ds-markdown-table">{children}</table>
            </div>
          );
        },
      }}
      {...props}
    >
      {children}
    </Markdown>
  );
};
export default memo(HighReactMarkdown);
