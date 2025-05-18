import React, { memo } from 'react';
import Markdown from 'react-markdown';
import type { Options } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import gfmPlugin from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import BlockWrap from '../BlockWrap/index.js';

interface HighReactMarkdownProps extends Options {
  id?: number;
}

const modulePrefix = 'HighReactMarkdown';
const HighReactMarkdown: React.FC<HighReactMarkdownProps> = (props) => {
  return (
    <Markdown
      remarkPlugins={[gfmPlugin, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        code: ({ className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '');
          return match ? (
            <BlockWrap language={match[1]}>
              <SyntaxHighlighter useInlineStyles={false} language={match[1]}>
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
    />
  );
};
export default memo(HighReactMarkdown);
