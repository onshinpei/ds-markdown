/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useMemo } from 'react';
import type { IMarkdownThemeProps, IMarkdownThemeStateProps } from '../defined';

// Define Theme Context type, including state and methods
export type MarkdownThemeContextType = {
  state: IMarkdownThemeStateProps;
  methods: {
    // Theme-related methods can be added here
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
  state: {
    theme: DEFAULT_THEME,
    answerType: DEFAULT_ANSWER_TYPE,
  },
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
        // Theme-related methods can be added here
      },
    }),
    [value],
  );

  return <MarkdownThemeContext.Provider value={contextValue}>{children}</MarkdownThemeContext.Provider>;
};

export const useMarkdownThemeContext = () => useContext(MarkdownThemeContext);
export const useThemeState = () => {
  return useContext(MarkdownThemeContext).state;
};
