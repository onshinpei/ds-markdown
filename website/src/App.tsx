import React from 'react';
import './App.css';

// 导入样式
import 'ds-markdown/style.css';
import 'ds-markdown/katex.css';

// 导入源代码示例
import { sourceCodeExamples } from './sourceCode';

// 导入组件
import Header from './components/Header';
import Navigation from './components/Navigation';
import DemoSection from './components/DemoSection';
import TypingDemoSection from './components/TypingDemoSection';
import Footer from './components/Footer';
import ApiDocumentation from './components/ApiDocumentation';

// 主App组件
const App: React.FC = () => {
  return (
    <div id="app">
      <Header />
      <Navigation />

      <main className="main">
        <div className="container">
          <DemoSection id="installation" title="📦 安装" demoType="installation" sourceCode={sourceCodeExamples.installation} showHeader={false} />

          <DemoSection id="basic-usage" title="🚀 基础用法" demoType="basic" sourceCode={sourceCodeExamples.basicUsage} />

          <DemoSection id="math-support" title="🧮 数学公式支持" demoType="math" sourceCode={sourceCodeExamples.mathSupport} />

          <TypingDemoSection />

          <DemoSection id="themes" title="🎨 主题切换" demoType="theme" sourceCode={sourceCodeExamples.themeSwitch} />

          <ApiDocumentation />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
