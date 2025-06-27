import React from 'react';
import { ApiTable, RefMethodTable, ComparisonTable, FormulaTypeTable, CodeExample, BestPracticesList, PluginSection } from './components';
import {
  propsData,
  dsMarkdownMethods,
  markdownCMDMethods,
  iTypedCharData,
  iBeforeTypedCharData,
  iMarkdownMathData,
  iMarkdownPluginData,
  timerComparisonData,
  formulaTypesData,
  bestPractices,
  codeExamples,
} from './apiData';

// API文档组件
const ApiDocumentation: React.FC = () => (
  <section id="api" className="section">
    <h2>📚 API 文档</h2>

    {/* Props 属性 */}
    <ApiTable data={propsData} title="Props 属性" />

    {/* Ref 方法 */}
    <RefMethodTable data={dsMarkdownMethods} title="Ref 方法 - DsMarkdown" />
    <RefMethodTable data={markdownCMDMethods} title="Ref 方法 - MarkdownCMD" />

    {/* 类型定义 */}
    <h3>类型定义</h3>
    <ApiTable data={iTypedCharData} title="ITypedChar" />
    <ApiTable data={iBeforeTypedCharData} title="IBeforeTypedChar" />
    <ApiTable data={iMarkdownMathData} title="IMarkdownMath" />
    <ApiTable data={iMarkdownPluginData} title="IMarkdownPlugin" />

    {/* 内置插件 */}
    <PluginSection title="内置插件" codeExample={codeExamples.katexPlugin} />

    {/* 定时器模式对比 */}
    <ComparisonTable data={timerComparisonData} title="定时器模式对比" />

    {/* 数学公式分隔符说明 */}
    <FormulaTypeTable data={formulaTypesData} title="数学公式分隔符说明" />

    {/* 最佳实践建议 */}
    <BestPracticesList practices={bestPractices} title="最佳实践建议" />

    {/* 使用示例 */}
    <h3>使用示例</h3>
    <CodeExample code={codeExamples.streamingChat} title="流式对话示例" />
    <CodeExample code={codeExamples.callbackExample} title="回调函数示例" />
    <CodeExample code={codeExamples.startExample} title="手动开始动画示例" />
    <CodeExample code={codeExamples.restartExample} title="重新开始动画示例" />
  </section>
);

export default ApiDocumentation;
