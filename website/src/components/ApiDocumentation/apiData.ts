// API 数据定义
export interface ApiProperty {
  prop: string;
  type: string;
  description: string;
  defaultValue: string;
}

export interface RefMethod {
  method: string;
  description: string;
}

export interface ComparisonRow {
  feature: string;
  requestAnimationFrame: string;
  setTimeout: string;
}

export interface FormulaType {
  type: string;
  inline: string;
  block: string;
  example: string;
}

// Props 属性数据
export const propsData: ApiProperty[] = [
  {
    prop: 'interval',
    type: 'number',
    description: '打字间隔 (毫秒)',
    defaultValue: '30',
  },
  {
    prop: 'timerType',
    type: "'setTimeout' | 'requestAnimationFrame'",
    description: '定时器类型，推荐使用 requestAnimationFrame',
    defaultValue: "'setTimeout'",
  },
  {
    prop: 'answerType',
    type: "'thinking' | 'answer'",
    description: '内容类型，影响样式主题。thinking为思考模式，answer为回答模式',
    defaultValue: "'answer'",
  },
  {
    prop: 'theme',
    type: "'light' | 'dark'",
    description: '主题类型，支持亮色和暗色模式',
    defaultValue: "'light'",
  },
  {
    prop: 'disableTyping',
    type: 'boolean',
    description: '禁用打字动画，设为true时立即显示全部内容',
    defaultValue: 'false',
  },
  {
    prop: 'plugins',
    type: 'IMarkdownPlugin[]',
    description: '插件配置，支持 remark/rehype 插件扩展',
    defaultValue: '[]',
  },
  {
    prop: 'math',
    type: 'IMarkdownMath',
    description: '数学公式配置，支持 KaTeX 渲染',
    defaultValue: "{ splitSymbol: 'dollar' }",
  },
  {
    prop: 'onStart',
    type: '(data: StartData) => void',
    description: '打字开始时的回调函数',
    defaultValue: 'undefined',
  },
  {
    prop: 'onEnd',
    type: '(data: EndData) => void',
    description: '打字结束时的回调函数',
    defaultValue: 'undefined',
  },
  {
    prop: 'onTypedChar',
    type: '(data: ITypedChar) => void',
    description: '每个字符打字时的回调函数',
    defaultValue: 'undefined',
  },
  {
    prop: 'autoStartTyping',
    type: 'boolean',
    description: '是否自动开始打字动画，设为 false 时需手动触发',
    defaultValue: 'true',
  },
];

// DsMarkdown Ref 方法
export const dsMarkdownMethods: RefMethod[] = [
  {
    method: 'stop()',
    description: '暂停打字动画，可在打字过程中调用',
  },
  {
    method: 'resume()',
    description: '恢复打字动画，与stop()配合使用',
  },
];

// MarkdownCMD Ref 方法
export const markdownCMDMethods: RefMethod[] = [
  {
    method: 'push(content, answerType)',
    description: '添加内容并开始打字，支持流式数据',
  },
  {
    method: 'clear()',
    description: '清空所有内容和状态，重置组件',
  },
  {
    method: 'triggerWholeEnd()',
    description: '手动触发完成回调',
  },
  {
    method: 'stop()',
    description: '暂停打字动画',
  },
  {
    method: 'resume()',
    description: '恢复打字动画',
  },
];

// ITypedChar 类型定义
export const iTypedCharData: ApiProperty[] = [
  {
    prop: 'percent',
    type: 'number',
    description: '打字进度百分比 (0-100)',
    defaultValue: '0',
  },
  {
    prop: 'currentChar',
    type: 'string',
    description: '当前打字的字符',
    defaultValue: '-',
  },
  {
    prop: 'currentIndex',
    type: 'number',
    description: '当前字符在整个字符串中的索引',
    defaultValue: '0',
  },
];

// IMarkdownMath 类型定义
export const iMarkdownMathData: ApiProperty[] = [
  {
    prop: 'splitSymbol',
    type: "'dollar' | 'bracket'",
    description: '数学公式分隔符类型',
    defaultValue: "'dollar'",
  },
];

// IMarkdownPlugin 类型定义
export const iMarkdownPluginData: ApiProperty[] = [
  {
    prop: 'remarkPlugin',
    type: 'unknown',
    description: 'remark 插件实例',
    defaultValue: '-',
  },
  {
    prop: 'rehypePlugin',
    type: 'unknown',
    description: 'rehype 插件实例',
    defaultValue: '-',
  },
  {
    prop: 'type',
    type: "'buildIn' | 'custom'",
    description: '插件类型，内置或自定义',
    defaultValue: '-',
  },
  {
    prop: 'id',
    type: 'any',
    description: '插件唯一标识符',
    defaultValue: '-',
  },
];

// 定时器模式对比数据
export const timerComparisonData: ComparisonRow[] = [
  {
    feature: '字符处理',
    requestAnimationFrame: '每帧可处理多个字符',
    setTimeout: '每次处理一个字符',
  },
  {
    feature: '高频间隔',
    requestAnimationFrame: '✅ 优秀 (5ms → 每帧3字符)',
    setTimeout: '❌ 可能卡顿',
  },
  {
    feature: '低频间隔',
    requestAnimationFrame: '✅ 正常 (100ms → 6帧后1字符)',
    setTimeout: '✅ 精确',
  },
  {
    feature: '视觉效果',
    requestAnimationFrame: '🎬 流畅动画感',
    setTimeout: '⚡ 精确节拍感',
  },
  {
    feature: '性能开销',
    requestAnimationFrame: '🟢 低 (帧同步)',
    setTimeout: '🟡 中等 (定时器)',
  },
  {
    feature: '推荐场景',
    requestAnimationFrame: '现代Web应用、AI对话、高频打字',
    setTimeout: '兼容性要求高、复古效果',
  },
];

// 数学公式分隔符数据
export const formulaTypesData: FormulaType[] = [
  {
    type: "'dollar'",
    inline: '$...$',
    block: '$$...$$',
    example: '$E = mc^2$',
  },
  {
    type: "'bracket'",
    inline: '\\(...\\)',
    block: '\\[...\\]',
    example: '\\(a + b = c\\)',
  },
];

// 最佳实践建议
export const bestPractices = [
  {
    title: '性能优化',
    description: '推荐使用 requestAnimationFrame 模式，间隔设置为 15-30ms',
  },
  {
    title: '流式数据',
    description: '使用 MarkdownCMD 的命令式 API 处理流式数据，避免频繁更新 children',
  },
  {
    title: '数学公式',
    description: "按需引入 'ds-markdown/katex.css' 样式文件",
  },
  {
    title: '类型安全',
    description: '使用 TypeScript 获得完整的类型提示和检查',
  },
  {
    title: '插件使用',
    description: '合理配置插件顺序，确保插件之间不会冲突',
  },
];

// 代码示例
export const codeExamples = {
  katexPlugin: `import { katexPlugin } from 'ds-markdown/plugins';

<DsMarkdown 
  plugins={[katexPlugin]}
  math={{ splitSymbol: 'dollar' }}
>
  行内公式：$E = mc^2$
  
  块级公式：
  $$\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}$$
</DsMarkdown>`,

  streamingChat: `import { useRef } from 'react';
import { MarkdownCMD, MarkdownCMDRef } from 'ds-markdown';

function StreamingChat() {
  const markdownRef = useRef<MarkdownCMDRef>(null);

  const simulateAIResponse = async () => {
    markdownRef.current?.clear();
    
    // 思考阶段
    markdownRef.current?.push('🤔 正在分析...', 'thinking');
    
    // 流式回答
    const chunks = [
      '# React 19 新特性\\n\\n',
      '## 🚀 React Compiler\\n',
      '- 🎯 自动优化性能\\n',
      '- ⚡ 编译时优化\\n'
    ];
    
    for (const chunk of chunks) {
      await delay(100);
      markdownRef.current?.push(chunk, 'answer');
    }
  };

  return (
    <div>
      <button onClick={simulateAIResponse}>
        🤖 询问 AI
      </button>
      <MarkdownCMD 
        ref={markdownRef}
        interval={15}
        timerType="requestAnimationFrame"
      />
    </div>
  );
}`,
};
