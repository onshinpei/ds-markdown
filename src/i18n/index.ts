// Export Chinese locale
export { default as zhCN } from './zh';
export type { ZhCN } from './zh';

// Export English locale
export { default as enUS } from './en';
export type { EnUS } from './en';

// Export ConfigProvider related
export { ConfigProvider, useConfig, useLocale } from '../context/ConfigProvider';
export type { Locale, ConfigProviderProps, ConfigContextType } from '../context/ConfigProvider';
