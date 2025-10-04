/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import gfmPlugin from 'remark-gfm';
import classNames from 'classnames';
import { AnswerType, IMarkdownCode, IMarkdownMath, IMarkdownPlugin, MarkdownCMDRef, Theme } from '../defined';
import { __DEV__, katexId } from '../constant';
import { MarkdownTyperCMD, MarkdownTyperCMDRef, MarkdownTyperCMDProps } from 'react-markdown-typer';
import { DEFAULT_ANSWER_TYPE, DEFAULT_PLUGINS, DEFAULT_THEME, MarkdownThemeProvider, useMarkdownThemeContext } from '../context/MarkdownThemeProvider';
import { MarkdownProvider } from '../context/MarkdownProvider';
import { useConfig } from '../context/ConfigProvider';
import { replaceMathBracket } from '../utils/remarkMathBracket';
import BlockWrap from '../components/BlockWrap';
import HighlightCode from '../components/HighlightCode';

interface IMarkdownCustom {
  answerType: AnswerType;
  theme: Theme;
  codeBlock: IMarkdownCode;
  plugins: IMarkdownPlugin[];
  math: IMarkdownMath;
  isInnerRender: boolean;
}

const CodeComponent: React.FC<{ className: string; children: string }> = ({ className, children = '' }) => {
  const match = /language-(\w+)/.exec(className || '');
  const codeContent = String(children).replace(/\n$/, '');
  return match ? (
    <BlockWrap language={match[1]} codeContent={codeContent}>
      <HighlightCode code={codeContent} language={match[1]} />
    </BlockWrap>
  ) : (
    <code className={className}>{children}</code>
  );
};

const MarkdownCMDInner = forwardRef<MarkdownCMDRef, MarkdownTyperCMDProps & IMarkdownCustom>(({ answerType = 'answer', ...rest }, ref) => {
  const { state: themeState } = useMarkdownThemeContext();
  const cmdRef = useRef<MarkdownTyperCMDRef>(null!);

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

  const { katexConfig } = useConfig();

  // 从 context 中获取主题配置
  const currentMath = themeState.math;
  const currentPlugins = themeState.plugins;
  const mathSplitSymbol = currentMath?.splitSymbol ?? 'dollar';
  const finalReplaceMathBracket = currentMath?.replaceMathBracket ?? replaceMathBracket;

  const { remarkPlugins, rehypePlugins, hasKatexPlugin, components } = useMemo(() => {
    let hasKatexPlugin = false;
    const components: Record<string, React.ComponentType<unknown>> = {};
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
        rehypePlugins.push([plugin.rehypePlugin, katexConfig]);
      } else {
        if (plugin.rehypePlugin) {
          rehypePlugins.push(plugin.rehypePlugin);
        }
        if (plugin.remarkPlugin) {
          remarkPlugins.push(plugin.remarkPlugin);
        }
      }
      if (plugin.components) {
        Object.assign(components, plugin.components);
      }
    });

    return {
      remarkPlugins,
      rehypePlugins,
      hasKatexPlugin,
      components,
    };
  }, [currentPlugins, katexConfig]);

  const customConvertMarkdownString = useCallback(
    (markdownString: string) => {
      /** 如果存在数学公式插件，并且数学公式分隔符为括号，则替换成 $ 符号 */
      if (hasKatexPlugin && mathSplitSymbol === 'bracket') {
        return finalReplaceMathBracket(markdownString);
      }
      return markdownString;
    },
    [finalReplaceMathBracket, hasKatexPlugin, mathSplitSymbol],
  );

  return (
    <div
      className={classNames({
        'ds-markdown': true,
        apple: true,
        'ds-markdown-dark': currentTheme === 'dark',
      })}
    >
      <div className={`ds-markdown-${answerType}`}>
        {/* <MarkdownTyperCMD ref={cmdRef} {...rest} reactMarkdownProps={{}} /> */}

        <MarkdownTyperCMD
          ref={cmdRef}
          customConvertMarkdownString={customConvertMarkdownString}
          {...rest}
          reactMarkdownProps={{
            remarkPlugins,
            rehypePlugins,
            components: {
              code: CodeComponent as any,
              table: ({ children, ...props }) => {
                return (
                  <div className="markdown-table-wrapper">
                    <table className="ds-markdown-table">{children}</table>
                  </div>
                );
              },
              ...components,
            },
          }}
        />
      </div>
    </div>
  );
});

if (__DEV__) {
  MarkdownCMDInner.displayName = 'MarkdownCMD';
}

const MarkdownCMD = forwardRef<MarkdownCMDRef, MarkdownTyperCMDProps & IMarkdownCustom>((props, ref) => {
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
