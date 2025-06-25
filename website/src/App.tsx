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
import Footer from './components/Footer';
import ApiDocumentation from './components/ApiDocumentation';

// 导入演示组件
import { BasicUsageDemo, MathSupportDemo, TypingAnimationDemo, CustomThemeDemo } from './components/Demos';

// 主App组件
const App: React.FC = () => {
  return (
    <div id="app">
      <Header />
      <Navigation />

      <main className="main">
        <div className="container">
          <DemoSection id="installation" title="📦 安装" sourceCode={sourceCodeExamples.installation} showHeader={false} />

          <DemoSection id="basic-usage" title="🚀 基础用法" sourceCode={sourceCodeExamples.basicUsage} renderComponent={<BasicUsageDemo />} />

          <DemoSection id="math-support" title="🧮 数学公式支持" sourceCode={sourceCodeExamples.mathSupport} renderComponent={<MathSupportDemo />} />

          <DemoSection id="typing-animation" title="⌨️ 打字动画控制" sourceCode={sourceCodeExamples.typingAnimation} renderComponent={<TypingAnimationDemo />} />

          <DemoSection id="themes" title="🎨 主题切换" sourceCode={sourceCodeExamples.themeSwitch} renderComponent={<CustomThemeDemo />} />

          <ApiDocumentation />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
