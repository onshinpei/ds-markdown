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
import CodeComponent from '../components/CodeComponent';

interface IMarkdownCustom {
  answerType?: AnswerType;
  theme?: Theme;
  codeBlock?: IMarkdownCode;
  plugins?: IMarkdownPlugin[];
  math?: IMarkdownMath;
  isInnerRender?: boolean;
}

const MarkdownCMDInner = forwardRef<MarkdownCMDRef, MarkdownTyperCMDProps & IMarkdownCustom>(({ answerType = 'answer', timerType = 'requestAnimationFrame', ...rest }, ref) => {
  const { state: themeState } = useMarkdownThemeContext();
  const cmdRef = useRef<MarkdownTyperCMDRef>(null!);

  // Get theme config from context
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

  // Get theme config from context
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
      /** If math plugin exists and math delimiter is bracket, replace with $ symbol */
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
          timerType={timerType}
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
      throw new Error('The answerType of MarkdownCMD component must be thinking or answer');
    }
    if (typeof children !== 'string') {
      throw new Error('The children of MarkdownCMD component must be a string');
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

  if (isInnerRender) {
    // Inner render, outer layer has already passed props via context, no need to pass again here
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
