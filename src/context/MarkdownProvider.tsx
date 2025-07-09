import React, { createContext, useContext, useMemo } from 'react';
import type { MarkdownBaseProps } from '../defined';

// 定义 Context 类型，允许部分属性
export type MarkdownContextType = Partial<MarkdownBaseProps>;

const MarkdownContext = createContext<MarkdownContextType>({});

export const MarkdownProvider: React.FC<{
  value: MarkdownContextType;
  children: React.ReactNode;
}> = ({ value, children }) => {
  const contextValue = useMemo(() => value, [value]);
  return <MarkdownContext.Provider value={contextValue}>{children}</MarkdownContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMarkdownContext = () => useContext(MarkdownContext);
