import { ReactNode, ReactElement } from 'react';

// 演示数据类型
export interface DemoData {
  installation: string;
  basic: string;
  math: string;
  typing: string;
  theme: string;
}

export interface SourceCodeExample {
  code: string;
  markdownString: string;
  lang?: string; // 代码高亮语言，默认 tsx
}

// 组件属性类型
export interface DemoSectionProps {
  id: string;
  title: string;
  sourceCode: SourceCodeExample;
  showHeader?: boolean;
  renderComponent?: ReactElement;
  children?: ReactNode;
}

export interface ApiTableRowProps {
  prop: string;
  type: string;
  description: string;
  defaultValue: string;
}

export interface RefMethodRowProps {
  method: string;
  description: string;
}

// 内部组件使用的类型
export interface InternalDsMarkdownProps {
  interval?: number;
  timerType?: 'setTimeout' | 'requestAnimationFrame';
  answerType?: 'thinking' | 'answer';
  theme?: 'light' | 'dark';
  disableTyping?: boolean;
  plugins?: unknown[];
  math?: { splitSymbol: 'dollar' | 'bracket' };
  onTypedChar?: (char: string) => void;
  children: string;
}
