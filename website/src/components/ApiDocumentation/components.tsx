// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import type { ApiProperty, RefMethod, ComparisonRow, FormulaType } from './apiData';

// API 属性表格组件
export const ApiTable: React.FC<{ data: ApiProperty[]; title: string }> = ({ data, title }) => (
  <div>
    <h3>{title}</h3>
    <table className="api-table">
      <thead>
        <tr>
          <th>属性</th>
          <th>类型</th>
          <th>说明</th>
          <th>默认值</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>
              <code>{item.prop}</code>
            </td>
            <td>
              {(() => {
                const typeNames = ['IMarkdownCode', 'IMarkdownMath', 'IMarkdownPlugin', 'ITypedChar', 'IBeforeTypedChar', 'IEndData', 'IStartData', 'I18nData'];
                const typeStr = item.type;

                // 检查是否包含已知类型名
                const hasKnownType = typeNames.some((name) => typeStr.includes(name));

                if (hasKnownType) {
                  // 如果有已知类型，替换为锚点链接
                  let result = typeStr;
                  typeNames.forEach((name) => {
                    const regex = new RegExp(`\\b${name}\\b`, 'g');
                    result = result.replace(regex, `<a href="#${name}" class="anchor-link">${name}</a>`);
                  });
                  return <span dangerouslySetInnerHTML={{ __html: result }} />;
                } else {
                  return <code>{typeStr}</code>;
                }
              })()}
            </td>
            <td>{item.description}</td>
            <td>
              <code>{item.defaultValue}</code>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Ref 方法表格组件
export const RefMethodTable: React.FC<{ data: RefMethod[]; title: string }> = ({ data, title }) => (
  <div>
    <h3>{title}</h3>
    <table className="api-table">
      <thead>
        <tr>
          <th>方法</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>
              <code>{item.method}</code>
            </td>
            <td>{item.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// 对比表格组件
export const ComparisonTable: React.FC<{ data: ComparisonRow[]; title: string }> = ({ data, title }) => (
  <div>
    <h3>{title}</h3>
    <table className="api-table">
      <thead>
        <tr>
          <th>特性</th>
          <th>requestAnimationFrame</th>
          <th>setTimeout</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>
              <strong>{item.feature}</strong>
            </td>
            <td>{item.requestAnimationFrame}</td>
            <td>{item.setTimeout}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// 公式类型表格组件
export const FormulaTypeTable: React.FC<{ data: FormulaType[]; title: string }> = ({ data, title }) => (
  <div>
    <h3>{title}</h3>
    <table className="api-table">
      <thead>
        <tr>
          <th>类型</th>
          <th>行内公式</th>
          <th>块级公式</th>
          <th>示例</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>
              <code>{item.type}</code>
            </td>
            <td>
              <code>{item.inline}</code>
            </td>
            <td>
              <code>{item.block}</code>
            </td>
            <td>{item.example}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// 代码示例组件
export const CodeExample: React.FC<{
  code: string;
  title: string;
  language?: string;
}> = ({ code, title, language = 'tsx' }) => (
  <div style={{ marginBottom: '20px' }}>
    <h4>{title}</h4>
    <div className="code-block ds-markdown">
      <div className="md-code-block md-code-block-light">
        <SyntaxHighlighter useInlineStyles={false} language={language} style={{}}>
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  </div>
);

// 最佳实践列表组件
export const BestPracticesList: React.FC<{
  practices: Array<{ title: string; description: string }>;
  title: string;
}> = ({ practices, title }) => (
  <div>
    <h3>{title}</h3>
    <ul style={{ marginTop: '20px', lineHeight: '1.8' }}>
      {practices.map((practice, index) => (
        <li key={index}>
          <strong>{practice.title}</strong>：{practice.description}
        </li>
      ))}
    </ul>
  </div>
);

// 插件说明组件
export const PluginSection: React.FC<{
  title: string;
  description?: string;
  codeExample: string;
}> = ({ title, description, codeExample }) => (
  <div>
    <h3>{title}</h3>
    {description && <p>{description}</p>}
    <CodeExample code={codeExample} title="KaTeX 数学公式插件" />
  </div>
);
