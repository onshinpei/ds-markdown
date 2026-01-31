import React, { createContext, useContext } from 'react';
import type { MarkdownBaseProps } from '../defined';

// Define Context type, allowing partial properties
export type MarkdownContextType = Partial<MarkdownBaseProps>;

const MarkdownContext = createContext<MarkdownContextType>({});

export const MarkdownProvider: React.FC<{
  value: MarkdownContextType;
  children: React.ReactNode;
}> = ({ value, children }) => {
  // Removed unnecessary useMemo - the value is already memoized by the parent component
  return <MarkdownContext.Provider value={value}>{children}</MarkdownContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMarkdownContext = () => useContext(MarkdownContext);
