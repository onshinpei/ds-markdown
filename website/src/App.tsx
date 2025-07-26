import React from 'react';
import './App.css';

// 导入样式
import 'ds-markdown/style.css';
import 'ds-markdown/katex.css';

// 导入组件
import Header from './components/Header';
import Navigation from './components/Navigation';
import DemoSection from './components/DemoSection';
import Footer from './components/Footer';
import ApiDocumentation from './components/ApiDocumentation';
import FloatingToc from './components/FloatingToc';

// 导入演示组件
import { BasicUsageDemo, MathSupportDemo, TypingAnimationDemo, CustomThemeDemo, StreamingDemo, MermaidDemo } from './components/Demos';

import basicUsageDemoSource from './components/Demos/BasicUsageDemo/index.tsx?raw';
import mathSupportDemoSource from './components/Demos/MathSupportDemo/index.tsx?raw';
import typingAnimationDemoSource from './components/Demos/TypingAnimationDemo/index.tsx?raw';
import customThemeDemoSource from './components/Demos/CustomThemeDemo/index.tsx?raw';
import streamingDemoSource from './components/Demos/StreamingDemo/index.tsx?raw';
import mermaidDemoSource from './components/Demos/MermaidDemo/index.tsx?raw';

import basicUsageDemoMarkdownZh from './components/Demos/BasicUsageDemo/markdown.md?raw';
import basicUsageDemoMarkdownEn from './components/Demos/BasicUsageDemo/markdown.en.md?raw';
import mathSupportDemoMarkdownZh from './components/Demos/MathSupportDemo/markdown.md?raw';
import mathSupportDemoMarkdownEn from './components/Demos/MathSupportDemo/markdown.en.md?raw';
import typingAnimationDemoMarkdownZh from './components/Demos/TypingAnimationDemo/markdown.md?raw';
import typingAnimationDemoMarkdownEn from './components/Demos/TypingAnimationDemo/markdown.en.md?raw';
import customThemeDemoMarkdownZh from './components/Demos/CustomThemeDemo/markdown.md?raw';
import customThemeDemoMarkdownEn from './components/Demos/CustomThemeDemo/markdown.en.md?raw';
import streamingDemoMarkdownZh from './components/Demos/StreamingDemo/markdown.md?raw';
import streamingDemoMarkdownEn from './components/Demos/StreamingDemo/markdown.en.md?raw';
import mermaidDemoMarkdownZh from './components/Demos/MermaidDemo/markdown.md?raw';
import mermaidDemoMarkdownEn from './components/Demos/MermaidDemo/markdown.en.md?raw';

import { LanguageProvider } from './LanguageContext';
import { useI18n } from './hooks/useI18n';
import { ConfigProvider } from 'ds-markdown';
import zh from 'ds-markdown/i18n/zh';
import en from 'ds-markdown/i18n/en';

const installationSource = `// npm
npm install ds-markdown
// yarn
yarn add ds-markdown
// pnpm
pnpm add ds-markdown
`;

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

const LangSwitcher: React.FC = () => {
  const { lang, setLang, t } = useI18n();
  return (
    <select className="lang-switcher" value={lang} onChange={(e) => setLang(e.target.value as 'zh' | 'en')} aria-label="Language Switcher">
      <option value="zh">中文</option>
      <option value="en">English</option>
    </select>
  );
};

const AppContent: React.FC = () => {
  const { lang, t } = useI18n();
  const locale = lang === 'zh' ? zh : en;
  return (
    <div id="app">
      <LangSwitcher />
      <Header />
      <Navigation />
      <main className="main">
        <div className="main-nav">
          <FloatingToc />
        </div>
        <div className="main-content">
          <ConfigProvider locale={locale}>
            <div className="container">
              <DemoSection
                id="installation"
                title={t('installTitle')}
                sourceCode={{
                  code: installationSource,
                  markdownString: installationSource,
                  lang: 'bash',
                }}
                showHeader={false}
                onlyShowCode={true}
              />
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
          </ConfigProvider>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
