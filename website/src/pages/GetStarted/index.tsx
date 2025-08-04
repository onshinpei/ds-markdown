import React from 'react';
import { useI18n } from '../../hooks/useI18n';
import DemoSection from '../../components/DemoSection';
import FloatingToc from '../../components/FloatingToc';
import { BasicUsageDemo } from '../../components/Demos';
import basicUsageDemoSource from '../../components/Demos/BasicUsageDemo/index.tsx?raw';
import basicUsageDemoMarkdownZh from '../../components/Demos/BasicUsageDemo/markdown.md?raw';
import basicUsageDemoMarkdownEn from '../../components/Demos/BasicUsageDemo/markdown.en.md?raw';
import { getStartedData as getStartedDataZh } from './data';
import { getStartedData as getStartedDataEn } from './data.en';
import './index.css';

const markdownMap = {
  zh: {
    basicUsage: basicUsageDemoMarkdownZh,
  },
  en: {
    basicUsage: basicUsageDemoMarkdownEn,
  },
};

const dataMap = {
  zh: getStartedDataZh,
  en: getStartedDataEn,
};

const GetStarted: React.FC = () => {
  const { lang } = useI18n();
  const data = dataMap[lang];

  return (
    <div id="get-started-page">
      <div className="main-nav">
        <FloatingToc />
      </div>
      <div className="main-content">
        <div className="container">
          {/* 欢迎区域 */}
          <section className="welcome-section">
            <h1 className="section-title">{data.welcome.title}</h1>
            <p className="welcome-description">{data.welcome.description}</p>
          </section>

          {/* 安装指南 */}
          <DemoSection
            id="installation"
            title={data.sections.installation.title}
            sourceCode={{ code: data.installation.content, markdownString: data.installation.content, lang: 'bash' }}
            showHeader={false}
            onlyShowCode={true}
          />

          {/* 快速开始 */}
          <DemoSection
            id="quick-start"
            title={data.sections.quickStart.title}
            sourceCode={{ code: data.quickStart.content, markdownString: data.quickStart.content, lang: 'tsx' }}
            showHeader={false}
            onlyShowCode={true}
          />

          {/* 基础用法演示 */}
          <DemoSection
            id="basic-usage"
            title={data.sections.basicUsage.title}
            sourceCode={{ code: basicUsageDemoSource, markdownString: markdownMap[lang].basicUsage }}
            renderComponent={React.createElement(BasicUsageDemo, { markdown: markdownMap[lang].basicUsage })}
          />

          {/* 特性介绍 */}
          <DemoSection
            id="features"
            title={data.sections.features.title}
            sourceCode={{ code: data.features.content, markdownString: data.features.content, lang: 'markdown' }}
            showHeader={false}
            onlyShowCode={true}
          />

          {/* 下一步 */}
          <section id="next-steps" className="next-steps">
            <h2 className="section-title">{data.sections.nextSteps.title}</h2>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-icon">📚</div>
                <h3>{data.nextSteps.examples.title}</h3>
                <p>{data.nextSteps.examples.description}</p>
                <a href={data.nextSteps.examples.href} className="step-link">
                  {data.nextSteps.examples.link}
                </a>
              </div>
              <div className="step-card">
                <div className="step-icon">📖</div>
                <h3>{data.nextSteps.docs.title}</h3>
                <p>{data.nextSteps.docs.description}</p>
                <a href={data.nextSteps.docs.href} className="step-link">
                  {data.nextSteps.docs.link}
                </a>
              </div>
              <div className="step-card">
                <div className="step-icon">🎮</div>
                <h3>{data.nextSteps.try.title}</h3>
                <p>{data.nextSteps.try.description}</p>
                <a href={data.nextSteps.try.href} className="step-link">
                  {data.nextSteps.try.link}
                </a>
              </div>
            </div>
          </section>

          {/* 社区支持 */}
          <section id="community" className="community-section">
            <h2 className="section-title">{data.sections.community.title}</h2>
            <div className="community-grid">
              <div className="community-item">
                <h3>{data.community.issues.title}</h3>
                <p>{data.community.issues.description}</p>
                <a href={data.community.issues.href} target="_blank" rel="noopener noreferrer" className="community-link">
                  {data.community.issues.link}
                </a>
              </div>
              <div className="community-item">
                <h3>{data.community.source.title}</h3>
                <p>{data.community.source.description}</p>
                <a href={data.community.source.href} target="_blank" rel="noopener noreferrer" className="community-link">
                  {data.community.source.link}
                </a>
              </div>
              <div className="community-item">
                <h3>{data.community.star.title}</h3>
                <p>{data.community.star.description}</p>
                <a href={data.community.star.href} target="_blank" rel="noopener noreferrer" className="community-link">
                  {data.community.star.link}
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
