export const getStartedData = {
  welcome: {
    title: '🚀 Get Started with ds-markdown',
    description:
      'ds-markdown is a powerful React Markdown rendering component that supports typewriter effects, mathematical formulas, chart rendering, and more. Get started quickly and easily build modern Markdown applications.',
  },
  sections: {
    installation: {
      title: '📦 Installation',
    },
    quickStart: {
      title: '⚡ Quick Start',
    },
    basicUsage: {
      title: '🎯 Basic Usage',
    },
    features: {
      title: '✨ Core Features',
    },
    nextSteps: {
      title: '🎯 Next Steps',
    },
    community: {
      title: '🤝 Community Support',
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
      
      Welcome to **ds-markdown**!
      
      - 🚀 Fast and lightweight
      - 🎨 Beautiful animations
      - 📱 Mobile responsive
    </Markdown>
  );
};

export default App;

\`\`\``,
  },
  features: {
    content: `## ✨ Core Features

### 🎯 Typewriter Effect
- Support character-level and word-level typing animations
- Customizable typing speed and intervals
- Support pause, resume, and restart operations

### 🧮 Mathematical Formula Support
- Built-in KaTeX rendering engine
- Support inline formulas \`$E=mc^2$\`
- Support block formulas \`$$\\sum_{i=1}^{n} x_i$$\`

### 📊 Mermaid Chart Support
- Built-in Mermaid chart rendering engine
- Support flowcharts, sequence diagrams, Gantt charts, and more
- Support custom chart themes and styles
- Responsive charts that automatically adapt to container size

### 🎨 Theme System
- Built-in light/dark themes
- Support custom theme configuration
- Responsive design, mobile-friendly

### 🔌 Plugin System
- Extensible plugin architecture
- Built-in Mermaid chart plugin
- Support custom plugin development

### 🌍 Internationalization
- Built-in Chinese/English support
- Extensible multi-language configuration
- Support RTL layout

### ⚡ High Performance
- Virtual scrolling optimization
- Lazy loading rendering
- Memory usage optimization`,
  },
  nextSteps: {
    examples: {
      title: 'View Examples',
      description: 'Explore more usage examples and advanced feature demonstrations',
      link: 'Browse Examples →',
      href: '/examples',
    },
    docs: {
      title: 'Read Documentation',
      description: 'Learn about API interfaces and configuration options in detail',
      link: 'View Docs →',
      href: '/docs',
    },
    try: {
      title: 'Try Online',
      description: 'Experience various features in real-time in your browser',
      link: 'Start Experience →',
      href: '/try',
    },
  },
  community: {
    issues: {
      title: '📝 Report Issues',
      description: 'Found a bug or have feature suggestions? Welcome to submit issues on GitHub.',
      link: 'Submit Issue',
      href: 'https://github.com/onshinpei/ds-markdown/issues',
    },
    source: {
      title: '📖 View Source',
      description: 'Want to understand implementation details or contribute code? Welcome to view the project source code.',
      link: 'View Source',
      href: 'https://github.com/onshinpei/ds-markdown',
    },
    star: {
      title: '⭐ Support Project',
      description: 'If this project helps you, please give us a Star!',
      link: 'Give a Star',
      href: 'https://github.com/onshinpei/ds-markdown',
    },
  },
};
