import React, { createContext, useContext, useMemo } from 'react';
import type { MarkdownBaseProps } from '../defined';

// 定义 Context 类型，允许部分属性
export type MarkdownContextType = {
  state: Partial<MarkdownBaseProps>;
  // method
};

const MarkdownContext = createContext<MarkdownContextType>(null!);

export const MarkdownProvider: React.FC<{
  value: MarkdownContextType;
  children: React.ReactNode;
}> = ({ value, children }) => {
  const contextValue = useMemo(() => {
    return {
      state: value,
    };
  }, [value]);
  return <MarkdownContext.Provider value={contextValue as MarkdownContextType}>{children}</MarkdownContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMarkdownContext = () => useContext(MarkdownContext);
