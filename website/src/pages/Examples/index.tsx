import React from 'react';
import { useI18n } from '../../hooks/useI18n';
import { ConfigProvider } from 'ds-markdown';
import zh from 'ds-markdown/i18n/zh';
import en from 'ds-markdown/i18n/en';
import DemoSection from '../../components/DemoSection';
import FloatingToc from '../../components/FloatingToc';
import ApiDocumentation from '../../components/ApiDocumentation';
import { BasicUsageDemo, MathSupportDemo, TypingAnimationDemo, CustomThemeDemo, StreamingDemo, MermaidDemo } from '../../components/Demos';
import basicUsageDemoSource from '../../components/Demos/BasicUsageDemo/index.tsx?raw';
import mathSupportDemoSource from '../../components/Demos/MathSupportDemo/index.tsx?raw';
import typingAnimationDemoSource from '../../components/Demos/TypingAnimationDemo/index.tsx?raw';
import customThemeDemoSource from '../../components/Demos/CustomThemeDemo/index.tsx?raw';
import streamingDemoSource from '../../components/Demos/StreamingDemo/index.tsx?raw';
import mermaidDemoSource from '../../components/Demos/MermaidDemo/index.tsx?raw';
import basicUsageDemoMarkdownZh from '../../components/Demos/BasicUsageDemo/markdown.md?raw';
import basicUsageDemoMarkdownEn from '../../components/Demos/BasicUsageDemo/markdown.en.md?raw';
import mathSupportDemoMarkdownZh from '../../components/Demos/MathSupportDemo/markdown.md?raw';
import mathSupportDemoMarkdownEn from '../../components/Demos/MathSupportDemo/markdown.en.md?raw';
import typingAnimationDemoMarkdownZh from '../../components/Demos/TypingAnimationDemo/markdown.md?raw';
import typingAnimationDemoMarkdownEn from '../../components/Demos/TypingAnimationDemo/markdown.en.md?raw';
import customThemeDemoMarkdownZh from '../../components/Demos/CustomThemeDemo/markdown.md?raw';
import customThemeDemoMarkdownEn from '../../components/Demos/CustomThemeDemo/markdown.en.md?raw';
import streamingDemoMarkdownZh from '../../components/Demos/StreamingDemo/markdown.md?raw';
import streamingDemoMarkdownEn from '../../components/Demos/StreamingDemo/markdown.en.md?raw';
import mermaidDemoMarkdownZh from '../../components/Demos/MermaidDemo/markdown.md?raw';
import mermaidDemoMarkdownEn from '../../components/Demos/MermaidDemo/markdown.en.md?raw';

import './index.css';

const markdownMap = {
  zh: {
    basicUsage: basicUsageDemoMarkdownZh,
    mathSupport: mathSupportDemoMarkdownZh,
    typingAnimation: typingAnimationDemoMarkdownZh,
    customTheme: customThemeDemoMarkdownZh,
    streaming: streamingDemoMarkdownZh,
    mermaid: mermaidDemoMarkdownZh,
  },
  en: {
    basicUsage: basicUsageDemoMarkdownEn,
    mathSupport: mathSupportDemoMarkdownEn,
    typingAnimation: typingAnimationDemoMarkdownEn,
    customTheme: customThemeDemoMarkdownEn,
    streaming: streamingDemoMarkdownEn,
    mermaid: mermaidDemoMarkdownEn,
  },
};

const Examples: React.FC = () => {
  const { lang, t } = useI18n();
  const locale = lang === 'zh' ? zh : en;
  return (
    <div id="examples-page">
      <div className="main-nav">
        <FloatingToc />
      </div>
      <div className="main-content">
        <div className="container">
          <DemoSection
            id="basic-usage"
            title={t('basicUsageTitle')}
            sourceCode={{ code: basicUsageDemoSource, markdownString: markdownMap[lang].basicUsage }}
            renderComponent={React.createElement(BasicUsageDemo, { markdown: markdownMap[lang].basicUsage })}
          />
          <DemoSection
            id="math-support"
            title={t('mathSupportTitle')}
            sourceCode={{ code: mathSupportDemoSource, markdownString: markdownMap[lang].mathSupport }}
            renderComponent={React.createElement(MathSupportDemo, { markdown: markdownMap[lang].mathSupport })}
          />
          <DemoSection
            id="typing-animation"
            title={t('typingAnimationTitle')}
            sourceCode={{ code: typingAnimationDemoSource, markdownString: markdownMap[lang].typingAnimation }}
            renderComponent={React.createElement(TypingAnimationDemo, { markdown: markdownMap[lang].typingAnimation })}
          />
          <DemoSection
            id="themes"
            title={t('themesTitle')}
            sourceCode={{ code: customThemeDemoSource, markdownString: markdownMap[lang].customTheme }}
            renderComponent={React.createElement(CustomThemeDemo, { markdown: markdownMap[lang].customTheme })}
          />
          <DemoSection
            id="streaming"
            title={t('streamingTitle')}
            sourceCode={{ code: streamingDemoSource, markdownString: markdownMap[lang].streaming }}
            renderComponent={React.createElement(StreamingDemo, { markdown: markdownMap[lang].streaming })}
          />
          <DemoSection
            id="mermaid-demo"
            title={t('mermaidDemoTitle') || 'Mermaid 图表示例'}
            sourceCode={{ code: mermaidDemoSource, markdownString: markdownMap[lang].mermaid }}
            renderComponent={React.createElement(MermaidDemo)}
          />
          <ApiDocumentation />
        </div>
      </div>
    </div>
  );
};

export default Examples;
