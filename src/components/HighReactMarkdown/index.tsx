import React, { memo } from 'react';
import Markdown from 'react-markdown';
import type { Options } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import gfmPlugin from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import remarkMathBracket, { replaceMathBracket } from '../../utils/remarkMathBracket';
import BlockWrap from '../BlockWrap/index.js';
import { Theme } from '../../defined.js';

interface HighReactMarkdownProps extends Options {
  theme?: Theme;
  children: string;
}

const modulePrefix = 'HighReactMarkdown';
const HighReactMarkdown: React.FC<HighReactMarkdownProps> = ({ theme = 'light', children, ...props }) => {
  return (
    <Markdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
      // components={{
      //   code: ({ className, children, ...props }) => {
      //     const match = /language-(\w+)/.exec(className || '');
      //     return match ? (
      //       <BlockWrap language={match[1]} theme={theme}>
      //         <SyntaxHighlighter useInlineStyles={false} language={match[1]} style={{}}>
      //           {String(children).replace(/\n$/, '')}
      //         </SyntaxHighlighter>
      //       </BlockWrap>
      //     ) : (
      //       <code className={className} {...props}>
      //         {children}
      //       </code>
      //     );
      //   },
      //   table: ({ children, ...props }) => {
      //     return (
      //       <div className="markdown-table-wrapper">
      //         <table className="ds-markdown-table">{children}</table>
      //       </div>
      //     );
      //   },
      // }}
      {...props}
    >
      {replaceMathBracket(children)}
    </Markdown>
  );
};
export default memo(HighReactMarkdown);
