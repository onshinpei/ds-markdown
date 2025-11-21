import React, { createContext, useContext, useMemo } from 'react';
import defaultLocale, { ZhCN } from '../../i18n/zh';
import { IMarkdownKatexConfig, IMarkdownMermaidConfig } from '../../defined';

// Define base type for locale
export type Locale = ZhCN;

// Define ConfigProvider props type
export interface ConfigProviderProps {
  locale?: Locale;
  mermaidConfig?: IMarkdownMermaidConfig;
  katexConfig?: IMarkdownKatexConfig;
  children: React.ReactNode;
  // katexConfig?: IMarkdownKatexConfig;
}

// Define Context type
export interface ConfigContextType {
  locale: Locale;
  mermaidConfig?: IMarkdownMermaidConfig;
  katexConfig?: IMarkdownKatexConfig;
}

const ConfigContext = createContext<ConfigContextType>({
  locale: defaultLocale,
});

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ locale, children, mermaidConfig, katexConfig }) => {
  const contextValue = useMemo(() => {
    const contextValue: ConfigContextType = {
      locale: locale || defaultLocale,
    };
    if (mermaidConfig) {
      contextValue.mermaidConfig = mermaidConfig;
    }
    if (katexConfig) {
      contextValue.katexConfig = katexConfig;
    }
    return contextValue;
  }, [locale, mermaidConfig, katexConfig]);

  return <ConfigContext.Provider value={contextValue}>{children}</ConfigContext.Provider>;
};

// Hook for using config in components
export const useConfig = () => {
  const context = useContext(ConfigContext);
  return context;
};

// Hook for getting current locale
export const useLocale = () => {
  const { locale } = useConfig();
  return locale;
};
