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
  iMarkdownCodeData,
  iEndData,
  iStartData,
  timerComparisonData,
  formulaTypesData,
  bestPractices,
  codeExamples,
  configProviderPropsData,
  localeTypeData,
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
    <h3 id="类型定义">类型定义</h3>
    <div id="ITypedChar">
      <ApiTable data={iTypedCharData} title="ITypedChar" />
    </div>
    <div id="IBeforeTypedChar">
      <ApiTable data={iBeforeTypedCharData} title="IBeforeTypedChar" />
    </div>
    <div id="IMarkdownMath">
      <ApiTable data={iMarkdownMathData} title="IMarkdownMath" />
    </div>
    <div id="IMarkdownPlugin">
      <ApiTable data={iMarkdownPluginData} title="IMarkdownPlugin" />
    </div>
    <div id="IMarkdownCode">
      <ApiTable data={iMarkdownCodeData} title="IMarkdownCode" />
    </div>
    <div id="IEndData">
      <ApiTable data={iEndData} title="IEndData" />
    </div>
    <div id="IStartData">
      <ApiTable data={iStartData} title="IStartData" />
    </div>

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
    <CodeExample code={codeExamples.codeBlockExample} title="代码块配置示例" />

    {/* ConfigProvider 多语言相关 */}
    <h3>ConfigProvider 多语言</h3>
    <ApiTable data={configProviderPropsData} title="ConfigProvider Props" />
    <ApiTable data={localeTypeData} title="Locale 类型结构" />
  </section>
);

export default ApiDocumentation;
