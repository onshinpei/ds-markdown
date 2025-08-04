import React from 'react';
import { useI18n } from '../../hooks/useI18n';
import { ConfigProvider } from 'ds-markdown';
import zh from 'ds-markdown/i18n/zh';
import en from 'ds-markdown/i18n/en';
import DemoSection from '../../components/DemoSection';
import FloatingToc from '../../components/FloatingToc';
import { BasicUsageDemo } from '../../components/Demos';
import basicUsageDemoSource from '../../components/Demos/BasicUsageDemo/index.tsx?raw';
import basicUsageDemoMarkdownZh from '../../components/Demos/BasicUsageDemo/markdown.md?raw';
import basicUsageDemoMarkdownEn from '../../components/Demos/BasicUsageDemo/markdown.en.md?raw';
import './index.css';

const markdownMap = {
  zh: {
    basicUsage: basicUsageDemoMarkdownZh,
  },
  en: {
    basicUsage: basicUsageDemoMarkdownEn,
  },
};

const installationSource = `\
\`\`\`npm\n\nnpm install ds-markdown\n\n\`\`\`\n\`\`\`yarn\n\nyarn add ds-markdown\n\n\`\`\`\n\`\`\`pnpm\n\npnpm add ds-markdown\n\n\`\`\``;

const quickStartSource = `\
import React from 'react';\nimport { Markdown } from 'ds-markdown';\n\nconst App = () => {\n  return (\n    <Markdown interval={50}>\n      # Hello World\n      \n      Welcome to **ds-markdown**!\n      \n      - 🚀 Fast and lightweight\n      - 🎨 Beautiful animations\n      - 📱 Mobile responsive\n    </Markdown>\n  );\n};\n\nexport default App;`;

const featuresSource = `\
## ✨ 核心特性

### 🎯 打字机效果
- 支持字符级和单词级打字动画
- 可自定义打字速度和间隔
- 支持暂停、恢复、重启操作

### 🧮 数学公式支持
- 内置 KaTeX 渲染引擎
- 支持行内公式 \`$E=mc^2$\`
- 支持块级公式 \`$$\\sum_{i=1}^{n} x_i$$\`

### 🎨 主题系统
- 内置浅色/深色主题
- 支持自定义主题配置
- 响应式设计，移动端友好

### 🔌 插件系统
- 可扩展的插件架构
- 内置 Mermaid 图表插件
- 支持自定义插件开发

### 🌍 国际化
- 内置中英文支持
- 可扩展多语言配置
- 支持 RTL 布局

### ⚡ 高性能
- 虚拟滚动优化
- 懒加载渲染
- 内存使用优化`;

const GetStarted: React.FC = () => {
  const { lang, t } = useI18n();
  const locale = lang === 'zh' ? zh : en;

  return (
    <div id="get-started-page">
      <div className="main-nav">
        <FloatingToc />
      </div>
      <div className="main-content">
        <ConfigProvider locale={locale}>
          <div className="container">
            {/* 欢迎区域 */}
            <section className="welcome-section">
              <h1 className="section-title">🚀 开始使用 ds-markdown</h1>
              <p className="welcome-description">ds-markdown 是一个功能强大的 React Markdown 渲染组件，支持打字机效果、数学公式、图表渲染等特性。 快速上手，轻松构建现代化的 Markdown 应用。</p>
            </section>

            {/* 安装指南 */}
            <DemoSection id="installation" title="📦 安装" sourceCode={{ code: installationSource, markdownString: installationSource, lang: 'bash' }} showHeader={false} onlyShowCode={true} />

            {/* 快速开始 */}
            <DemoSection id="quick-start" title="⚡ 快速开始" sourceCode={{ code: quickStartSource, markdownString: quickStartSource, lang: 'tsx' }} showHeader={false} onlyShowCode={true} />

            {/* 基础用法演示 */}
            <DemoSection
              id="basic-usage"
              title="🎯 基础用法"
              sourceCode={{ code: basicUsageDemoSource, markdownString: markdownMap[lang].basicUsage }}
              renderComponent={React.createElement(BasicUsageDemo, { markdown: markdownMap[lang].basicUsage })}
            />

            {/* 特性介绍 */}
            <DemoSection id="features" title="✨ 核心特性" sourceCode={{ code: featuresSource, markdownString: featuresSource, lang: 'markdown' }} showHeader={false} onlyShowCode={true} />

            {/* 下一步 */}
            <section id="next-steps" className="next-steps">
              <h2 className="section-title">🎯 下一步</h2>
              <div className="steps-grid">
                <div className="step-card">
                  <div className="step-icon">📚</div>
                  <h3>查看示例</h3>
                  <p>探索更多使用示例和高级功能演示</p>
                  <a href="/examples" className="step-link">
                    浏览示例 →
                  </a>
                </div>
                <div className="step-card">
                  <div className="step-icon">📖</div>
                  <h3>阅读文档</h3>
                  <p>详细了解 API 接口和配置选项</p>
                  <a href="/docs" className="step-link">
                    查看文档 →
                  </a>
                </div>
                <div className="step-card">
                  <div className="step-icon">🎮</div>
                  <h3>在线体验</h3>
                  <p>在浏览器中实时体验各种功能</p>
                  <a href="/try" className="step-link">
                    开始体验 →
                  </a>
                </div>
              </div>
            </section>

            {/* 社区支持 */}
            <section id="community" className="community-section">
              <h2 className="section-title">🤝 社区支持</h2>
              <div className="community-grid">
                <div className="community-item">
                  <h3>📝 问题反馈</h3>
                  <p>发现 Bug 或有功能建议？欢迎在 GitHub 上提交 Issue。</p>
                  <a href="https://github.com/onshinpei/ds-markdown/issues" target="_blank" rel="noopener noreferrer" className="community-link">
                    提交 Issue
                  </a>
                </div>
                <div className="community-item">
                  <h3>💬 讨论交流</h3>
                  <p>加入我们的社区，与其他开发者交流使用心得。</p>
                  <a href="https://github.com/onshinpei/ds-markdown/discussions" target="_blank" rel="noopener noreferrer" className="community-link">
                    参与讨论
                  </a>
                </div>
                <div className="community-item">
                  <h3>⭐ 支持项目</h3>
                  <p>如果这个项目对你有帮助，请给我们一个 Star！</p>
                  <a href="https://github.com/onshinpei/ds-markdown" target="_blank" rel="noopener noreferrer" className="community-link">
                    给个 Star
                  </a>
                </div>
              </div>
            </section>
          </div>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default GetStarted;
