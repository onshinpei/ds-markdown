export const getStartedData = {
  welcome: {
    title: '🚀 开始使用 ds-markdown',
    description: 'ds-markdown 是一个功能强大的 React Markdown 渲染组件，支持打字机效果、数学公式、图表渲染等特性。快速上手，轻松构建现代化的 Markdown 应用。',
  },
  sections: {
    installation: {
      title: '📦 安装',
    },
    quickStart: {
      title: '⚡ 快速开始',
    },
    basicUsage: {
      title: '🎯 基础用法',
    },
    features: {
      title: '✨ 核心特性',
    },
    nextSteps: {
      title: '🎯 下一步',
    },
    community: {
      title: '🤝 社区支持',
    },
  },
  installation: {
    content: `\`\`\`npm

npm install ds-markdown

\`\`\`
\`\`\`yarn

yarn add ds-markdown

\`\`\`
\`\`\`pnpm

pnpm add ds-markdown

\`\`\``,
  },
  quickStart: {
    content: `
\`\`\`tsx
import React from 'react';
import { Markdown } from 'ds-markdown';

const App = () => {
  return (
    <Markdown interval={50}>
      # Hello World
      
      欢迎使用 **ds-markdown**！
      
      - 🚀 快速轻量
      - 🎨 精美动画
      - 📱 移动端友好
    </Markdown>
  );
};

export default App;

\`\`\``,
  },
  features: {
    content: `## ✨ 核心特性

### 🎯 打字机效果
- 支持字符级和单词级打字动画
- 可自定义打字速度和间隔
- 支持暂停、恢复、重启操作

### 🧮 数学公式支持
- 内置 KaTeX 渲染引擎
- 支持行内公式 \`$E=mc^2$\`
- 支持块级公式 \`$$\\sum_{i=1}^{n} x_i$$\`

### 📊 Mermaid 图表支持
- 内置 Mermaid 图表渲染引擎
- 支持流程图、时序图、甘特图等多种图表类型
- 支持自定义图表主题和样式
- 响应式图表，自动适配容器大小

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
- 内存使用优化`,
  },
  nextSteps: {
    examples: {
      title: '查看示例',
      description: '探索更多使用示例和高级功能演示',
      link: '浏览示例 →',
      href: '/examples',
    },
    docs: {
      title: '阅读文档',
      description: '详细了解 API 接口和配置选项',
      link: '查看文档 →',
      href: '/docs',
    },
    try: {
      title: '在线体验',
      description: '在浏览器中实时体验各种功能',
      link: '开始体验 →',
      href: '/try',
    },
  },
  community: {
    issues: {
      title: '📝 问题反馈',
      description: '发现 Bug 或有功能建议？欢迎在 GitHub 上提交 Issue。',
      link: '提交 Issue',
      href: 'https://github.com/onshinpei/ds-markdown/issues',
    },
    source: {
      title: '📖 查看源码',
      description: '想要了解实现细节或贡献代码？欢迎查看项目源码。',
      link: '查看源码',
      href: 'https://github.com/onshinpei/ds-markdown',
    },
    star: {
      title: '⭐ 支持项目',
      description: '如果这个项目对你有帮助，请给我们一个 Star！',
      link: '给个 Star',
      href: 'https://github.com/onshinpei/ds-markdown',
    },
  },
};
