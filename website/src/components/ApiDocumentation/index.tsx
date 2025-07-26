import React from 'react';
import { ApiTable, RefMethodTable, ComparisonTable, FormulaTypeTable, CodeExample, BestPracticesList, PluginSection } from './components';
import * as zhApiData from './apiData';
import * as enApiData from './apiData.en';
import { useI18n } from '../../hooks/useI18n';

const titles = {
  zh: {
    api: '📚 API 文档',
    props: 'Props 属性',
    refDs: 'Ref 方法 - DsMarkdown',
    refCmd: 'Ref 方法 - MarkdownCMD',
    typeDef: '类型定义',
    plugin: '内置插件',
    timer: '定时器模式对比',
    formula: '数学公式分隔符说明',
    best: '最佳实践建议',
    example: '使用示例',
    codeStream: '流式对话示例',
    codeCallback: '回调函数示例',
    codeStart: '手动开始动画示例',
    codeRestart: '重新开始动画示例',
    codeBlock: '代码块配置示例',
    config: 'ConfigProvider 多语言',
    configProps: 'ConfigProvider Props',
    localeType: 'Locale 类型结构',
    i18n: 'I18nData keys',
  },
  en: {
    api: '📚 API',
    props: 'Props',
    refDs: 'Ref Methods - DsMarkdown',
    refCmd: 'Ref Methods - MarkdownCMD',
    typeDef: 'Type Definitions',
    plugin: 'Built-in Plugins',
    timer: 'Timer Comparison',
    formula: 'Math Formula Delimiters',
    best: 'Best Practices',
    example: 'Examples',
    codeStream: 'Streaming Chat Example',
    codeCallback: 'Callback Example',
    codeStart: 'Manual Start Example',
    codeRestart: 'Restart Example',
    codeBlock: 'Code Block Example',
    config: 'ConfigProvider & i18n',
    configProps: 'ConfigProvider Props',
    localeType: 'Locale Type Structure',
    i18n: 'I18nData keys',
  },
};

const ApiDocumentation: React.FC = () => {
  const { lang } = useI18n();
  const data = lang === 'en' ? enApiData : zhApiData;
  const t = titles[lang];

  return (
    <section id="api" className="section">
      <h2>{t.api}</h2>
      <div id="api-props">
        <ApiTable data={data.propsData} title={t.props} />
      </div>
      <div id="api-ref-ds">
        <RefMethodTable data={data.dsMarkdownMethods} title={t.refDs} />
      </div>
      <div id="api-ref-cmd">
        <RefMethodTable data={data.markdownCMDMethods} title={t.refCmd} />
      </div>
      <h3 id="类型定义">{t.typeDef}</h3>
      <div id="ITypedChar">
        <ApiTable data={data.iTypedCharData} title="ITypedChar" />
      </div>
      <div id="IBeforeTypedChar">
        <ApiTable data={data.iBeforeTypedCharData} title="IBeforeTypedChar" />
      </div>
      <div id="IMarkdownMath">
        <ApiTable data={data.iMarkdownMathData} title="IMarkdownMath" />
      </div>
      <div id="IMarkdownPlugin">
        <ApiTable data={data.iMarkdownPluginData} title="IMarkdownPlugin" />
      </div>
      <div id="IMarkdownCode">
        <ApiTable data={data.iMarkdownCodeData} title="IMarkdownCode" />
      </div>
      <div id="IEndData">
        <ApiTable data={data.iEndData} title="IEndData" />
      </div>
      <div id="IStartData">
        <ApiTable data={data.iStartData} title="IStartData" />
      </div>
      <div id="api-plugin">
        <PluginSection title={t.plugin} codeExample={data.codeExamples.katexPlugin} />
      </div>
      <div id="api-timer">
        <ComparisonTable data={data.timerComparisonData} title={t.timer} />
      </div>
      <div id="api-formula">
        <FormulaTypeTable data={data.formulaTypesData} title={t.formula} />
      </div>
      <h3 id="api-config">{t.config}</h3>
      <ApiTable data={data.configProviderPropsData} title={t.configProps} />
      <ApiTable data={data.localeTypeData} title={t.localeType} />
      <div id="I18nData">
        <ApiTable data={data.i18nData} title={t.i18n} />
      </div>
      <div id="api-best">
        <BestPracticesList practices={data.bestPractices} title={t.best} />
      </div>
      <h3 id="api-example">{t.example}</h3>
      <CodeExample code={data.codeExamples.streamingChat} title={t.codeStream} />
      <CodeExample code={data.codeExamples.callbackExample} title={t.codeCallback} />
      <CodeExample code={data.codeExamples.startExample} title={t.codeStart} />
      <CodeExample code={data.codeExamples.restartExample} title={t.codeRestart} />
      <CodeExample code={data.codeExamples.codeBlockExample} title={t.codeBlock} />
    </section>
  );
};

export default ApiDocumentation;
