import React, { createContext, useContext, useMemo } from 'react';
import defaultLocale, { ZhCN } from '../../i18n/zh';
import { IMarkdownMermaidConfig } from '../../defined';

// 定义语言包的基础类型
export type Locale = ZhCN;

// 定义 ConfigProvider 的 props 类型
export interface ConfigProviderProps {
  locale?: Locale;
  mermaidConfig?: IMarkdownMermaidConfig;
  children: React.ReactNode;
  // katexConfig?: IMarkdownKatexConfig;
}

// 定义 Context 类型
export interface ConfigContextType {
  locale: Locale;
  mermaidConfig?: IMarkdownMermaidConfig;
}

const ConfigContext = createContext<ConfigContextType>({
  locale: defaultLocale,
});

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ locale, children, mermaidConfig }) => {
  const contextValue = useMemo(() => {
    const contextValue: ConfigContextType = {
      locale: locale || defaultLocale,
    };
    if (mermaidConfig) {
      contextValue.mermaidConfig = mermaidConfig;
    }
    return contextValue;
  }, [locale, mermaidConfig]);

  return <ConfigContext.Provider value={contextValue}>{children}</ConfigContext.Provider>;
};

// Hook 用于在组件中使用配置
export const useConfig = () => {
  const context = useContext(ConfigContext);
  return context;
};

// Hook 用于获取当前语言包
export const useLocale = () => {
  const { locale } = useConfig();
  return locale;
};
