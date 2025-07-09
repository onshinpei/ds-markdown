/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { memo, useMemo } from 'react';
import Markdown from 'react-markdown';
import type { ExtraProps, Options } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import gfmPlugin from 'remark-gfm';
import { replaceMathBracket } from '../../utils/remarkMathBracket';
import BlockWrap from '../BlockWrap';
import { katexId } from '../../constant';
import { useMarkdownThemeContext } from '../../context/MarkdownThemeProvider';

interface HighReactMarkdownProps extends Options {
  children: string;
}

const CodeComponent: React.FC<{ className: string; children: string }> = ({ className, children }) => {
  const match = /language-(\w+)/.exec(className || '');
  const codeContent = String(children).replace(/\n$/, '');
  const { state: themeState } = useMarkdownThemeContext();

  return match ? (
    <BlockWrap language={match[1]} codeContent={codeContent}>
      <SyntaxHighlighter useInlineStyles={false} language={match[1]} style={{}}>
        {codeContent}
      </SyntaxHighlighter>
    </BlockWrap>
  ) : (
    <code className={className}>{children}</code>
  );
};

const HighReactMarkdown: React.FC<HighReactMarkdownProps> = ({ children: _children, ...props }) => {
  const { state: themeState } = useMarkdownThemeContext();

  // 从 context 中获取主题配置
  const currentMath = themeState.math;
  const currentPlugins = themeState.plugins;
  const mathSplitSymbol = currentMath?.splitSymbol ?? 'dollar';

  const { remarkPlugins, rehypePlugins, hasKatexPlugin } = useMemo(() => {
    let hasKatexPlugin = false;
    const remarkPlugins: any[] = [gfmPlugin];
    const rehypePlugins: any[] = [];
    if (!currentPlugins) {
      return {
        remarkPlugins,
        rehypePlugins,
      };
    }
    currentPlugins.forEach((plugin) => {
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
  }, [currentPlugins]);

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
