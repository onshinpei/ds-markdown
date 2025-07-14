import React, { createContext, useContext, useMemo } from 'react';
import defaultLocale from '../../i18n/zh';

// 定义语言包的基础类型
export interface Locale {
  codeBlock: {
    copy: string;
    copied: string;
    download: string;
    [key: string]: string;
  };
  [key: string]: unknown;
}

// 定义 ConfigProvider 的 props 类型
export interface ConfigProviderProps {
  locale?: Locale;
  children: React.ReactNode;
}

// 定义 Context 类型
export interface ConfigContextType {
  locale: Locale;
}

const ConfigContext = createContext<ConfigContextType>({
  locale: defaultLocale,
});

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ locale, children }) => {
  const contextValue = useMemo(
    () => ({
      locale: locale || defaultLocale,
    }),
    [locale],
  );

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
