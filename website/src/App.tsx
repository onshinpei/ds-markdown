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

// 导入演示组件
import { BasicUsageDemo, MathSupportDemo, TypingAnimationDemo, CustomThemeDemo, StreamingDemo } from './components/Demos';

import basicUsageDemoSource from './components/Demos/BasicUsageDemo/index.tsx?raw';
import mathSupportDemoSource from './components/Demos/MathSupportDemo/index.tsx?raw';
import typingAnimationDemoSource from './components/Demos/TypingAnimationDemo/index.tsx?raw';
import customThemeDemoSource from './components/Demos/CustomThemeDemo/index.tsx?raw';
import streamingDemoSource from './components/Demos/StreamingDemo/index.tsx?raw';

import basicUsageDemoMarkdown from './components/Demos/BasicUsageDemo/markdown.md?raw';
import mathSupportDemoMarkdown from './components/Demos/MathSupportDemo/markdown.md?raw';
import typingAnimationDemoMarkdown from './components/Demos/TypingAnimationDemo/markdown.md?raw';
import customThemeDemoMarkdown from './components/Demos/CustomThemeDemo/markdown.md?raw';
import streamingDemoMarkdown from './components/Demos/StreamingDemo/markdown.md?raw';

const installationSource = `// npm
npm install ds-markdown
// yarn
yarn add ds-markdown
// pnpm
pnpm add ds-markdown
`;
// 主App组件
const App: React.FC = () => {
  return (
    <div id="app">
      <Header />
      <Navigation />

      <main className="main">
        <div className="container">
          <DemoSection
            id="installation"
            title="📦 安装"
            sourceCode={{
              code: installationSource,
              markdownString: installationSource,
            }}
            showHeader={false}
          />

          <DemoSection
            id="basic-usage"
            title="🚀 基础用法"
            sourceCode={{ code: basicUsageDemoSource, markdownString: basicUsageDemoMarkdown }}
            renderComponent={React.createElement(BasicUsageDemo, { markdown: basicUsageDemoMarkdown })}
          />

          <DemoSection
            id="math-support"
            title="🧮 数学公式支持"
            sourceCode={{ code: mathSupportDemoSource, markdownString: mathSupportDemoMarkdown }}
            renderComponent={React.createElement(MathSupportDemo, { markdown: mathSupportDemoMarkdown })}
          />

          <DemoSection
            id="typing-animation"
            title="⌨️ 打字动画控制"
            sourceCode={{ code: typingAnimationDemoSource, markdownString: typingAnimationDemoMarkdown }}
            renderComponent={React.createElement(TypingAnimationDemo, { markdown: typingAnimationDemoMarkdown })}
          />

          <DemoSection
            id="themes"
            title="🎨 主题切换"
            sourceCode={{ code: customThemeDemoSource, markdownString: customThemeDemoMarkdown }}
            renderComponent={React.createElement(CustomThemeDemo, { markdown: customThemeDemoMarkdown })}
          />

          <DemoSection
            id="streaming"
            title="📺 流式演示"
            sourceCode={{ code: streamingDemoSource, markdownString: streamingDemoMarkdown }}
            renderComponent={React.createElement(StreamingDemo, { markdown: streamingDemoMarkdown })}
          />

          <ApiDocumentation />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
