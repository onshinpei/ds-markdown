// 导出中文语言包
export { default as zhCN } from './zh';
export type { ZhCN } from './zh';

// 导出英文语言包
export { default as enUS } from './en';
export type { EnUS } from './en';

// 导出 ConfigProvider 相关
export { ConfigProvider, useConfig, useLocale } from '../context/ConfigProvider';
export type { Locale, ConfigProviderProps, ConfigContextType } from '../context/ConfigProvider';
