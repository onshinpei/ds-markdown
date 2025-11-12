import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { useI18n } from '../../hooks/useI18n';
import { migrationGuideData as migrationGuideDataZh } from './data';
import { migrationGuideData as migrationGuideDataEn } from './data.en';
import DemoSection from '../../components/DemoSection';
import FloatingToc from '../../components/FloatingToc';
import './index.css';

const dataMap: Record<'zh' | 'en', typeof migrationGuideDataZh> = {
  zh: migrationGuideDataZh,
  en: migrationGuideDataEn as typeof migrationGuideDataZh,
};

const MigrationGuide: React.FC = () => {
  const { lang } = useI18n();
  const data = dataMap[lang];

  return (
    <div id="migration-guide-page">
      <div className="main-nav">
        <FloatingToc />
      </div>
      <div className="main-content">
        <div className="container">
          {/* 标题区域 */}
          <section className="migration-header">
            <h1 className="section-title">{data.title}</h1>
            <p className="migration-subtitle">{data.subtitle}</p>
          </section>

          {/* 升级概览 */}
          <section id="overview" className="overview-section">
            <h2 className="section-title">{data.sections.overview.title}</h2>
            <p className="overview-description">{data.sections.overview.description}</p>
          </section>

          {/* 破坏性变更 */}
          <section id="breaking-changes" className="breaking-section">
            <h2 className="section-title breaking-section-title">{data.sections.breaking.title}</h2>
            {data.sections.breaking.changes.map((change, index) => (
              <div key={index} className="breaking-item">
                <h3 className="breaking-title">
                  {index + 1}. {change.title}
                </h3>
                <p className="breaking-description">{change.description}</p>
                <div className="code-comparison">
                  <div className="comparison-item">
                    <h4>v0</h4>
                    {/* <DemoSection id={`v0-${index}`} title="" sourceCode={{ code: change.v0, markdownString: change.v0, lang: 'tsx' }} showHeader={false} onlyShowCode={true} /> */}
                    <SyntaxHighlighter language="tsx">{change.v0}</SyntaxHighlighter>
                  </div>
                  <div className="comparison-item">
                    <h4>v1</h4>

                    <SyntaxHighlighter language="tsx">{change.v1}</SyntaxHighlighter>
                  </div>
                </div>
                <div className="breaking-action">
                  <div>
                    <strong>建议操作：</strong>
                    <span>{change.action}</span>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* 新特性 */}
          <section id="new-features" className="features-section">
            <h2 className="section-title">{data.sections.newFeatures.title}</h2>
            {data.sections.newFeatures.features.map((feature, index) => (
              <div key={index} className="feature-item">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <SyntaxHighlighter language="tsx">{feature.code}</SyntaxHighlighter>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default MigrationGuide;
