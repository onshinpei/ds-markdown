import React, { createContext, useContext, useMemo } from 'react';
import type { IMarkdownThemeProps } from '../defined';

// 定义 Theme Context 类型，包含 state 和 methods
export type MarkdownThemeContextType = {
  state: Partial<IMarkdownThemeProps>;
  methods: {
    // 这里可以添加主题相关的方法
    updateTheme?: (theme: IMarkdownThemeProps['theme']) => void;
    updateMath?: (math: IMarkdownThemeProps['math']) => void;
    updateCodeBlock?: (codeBlock: IMarkdownThemeProps['codeBlock']) => void;
    updatePlugins?: (plugins: IMarkdownThemeProps['plugins']) => void;
  };
};

export const DEFAULT_THEME = 'light';
export const DEFAULT_ANSWER_TYPE = 'answer';
export const DEFAULT_PLUGINS = [];

const MarkdownThemeContext = createContext<MarkdownThemeContextType>({
  state: {},
  methods: {},
});

export const MarkdownThemeProvider: React.FC<{
  value?: Partial<IMarkdownThemeProps>;
  children: React.ReactNode;
}> = ({ value = {}, children }) => {
  const contextValue: MarkdownThemeContextType = useMemo(
    () => ({
      state: {
        theme: DEFAULT_THEME,
        answerType: DEFAULT_ANSWER_TYPE,
        ...value,
      },
      methods: {
        // 这里可以添加主题相关的方法实现
      },
    }),
    [value],
  );

  return <MarkdownThemeContext.Provider value={contextValue}>{children}</MarkdownThemeContext.Provider>;
};

export const useMarkdownThemeContext = () => useContext(MarkdownThemeContext);
