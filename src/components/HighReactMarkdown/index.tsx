/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { memo, useMemo } from 'react';
import Markdown from 'react-markdown';
import type { ExtraProps, Options } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import gfmPlugin from 'remark-gfm';
import { replaceMathBracket } from '../../utils/remarkMathBracket';
import BlockWrap from '../BlockWrap';
import { IMarkdownCode, IMarkdownMath, IMarkdownPlugin, Theme } from '../../defined';
import { katexId } from '../../constant';
import { useMarkdownContext } from '../../context/MarkdownProvider';

interface HighReactMarkdownProps extends Options {
  theme?: Theme;
  children: string;
  math?: IMarkdownMath;
  plugins?: IMarkdownPlugin[];
  codeBlock?: IMarkdownCode;
}

const CodeComponent: React.FC<{ className: string; children: string }> = ({ className, children }) => {
  const match = /language-(\w+)/.exec(className || '');
  const codeContent = String(children).replace(/\n$/, '');
  const { state } = useMarkdownContext();

  const { theme, codeBlock } = state;

  return match ? (
    <BlockWrap language={match[1]} theme={theme} codeBlock={codeBlock} codeContent={codeContent}>
      <SyntaxHighlighter useInlineStyles={false} language={match[1]} style={{}}>
        {codeContent}
      </SyntaxHighlighter>
    </BlockWrap>
  ) : (
    <code className={className}>{children}</code>
  );
};

const HighReactMarkdown: React.FC<HighReactMarkdownProps> = ({ theme = 'light', children: _children, math, plugins, codeBlock, ...props }) => {
  const mathSplitSymbol = math?.splitSymbol ?? 'dollar';

  const { remarkPlugins, rehypePlugins, hasKatexPlugin } = useMemo(() => {
    let hasKatexPlugin = false;
    const remarkPlugins: any[] = [gfmPlugin];
    const rehypePlugins: any[] = [];
    if (!plugins) {
      return {
        remarkPlugins,
        rehypePlugins,
      };
    }
    plugins.forEach((plugin) => {
      if (plugin.id === katexId) {
        hasKatexPlugin = true;
        remarkPlugins.push(plugin.remarkPlugin);
        rehypePlugins.push(plugin.rehypePlugin);
      }
    });

    return {
      remarkPlugins,
      rehypePlugins,
      hasKatexPlugin,
    };
  }, [plugins]);

  const children = useMemo(() => {
    /** 如果存在数学公式插件，并且数学公式分隔符为括号，则替换成 $ 符号 */
    if (hasKatexPlugin && mathSplitSymbol === 'bracket') {
      return replaceMathBracket(_children);
    }
    return _children;
  }, [hasKatexPlugin, mathSplitSymbol, _children]);

  return (
    <Markdown
      remarkPlugins={remarkPlugins}
      rehypePlugins={rehypePlugins}
      components={{
        code: CodeComponent as any,
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
