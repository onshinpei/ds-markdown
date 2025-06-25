import type { DemoData } from './defined';

// 演示数据
export const demoData: DemoData = {
  installation: `# 📦 安装 ds-markdown

\`\`\`bash
# 使用 npm 安装
npm install ds-markdown

# 使用 yarn 安装  
yarn add ds-markdown

# 使用 pnpm 安装
pnpm add ds-markdown
\`\`\`

## 快速开始

安装完成后，你就可以在项目中使用这个强大的 Markdown 打字动画组件了！

> 💡 **提示**: 记得同时引入样式文件来获得最佳视觉效果。`,

  basic: `# Hello ds-markdown

这是一个**高性能**的打字动画组件！

## ✨ 特性

- ⚡ 零延迟流式处理
- 🎬 流畅打字动画  
- 🎯 完美语法支持
- 📊 丰富的内容类型

### 代码示例

\`\`\`javascript
const message = "Hello World!";
console.log(message);

// 支持多种编程语言高亮
function greet(name) {
    return \`Hello, \${name}!\`;
}
\`\`\`

### 表格支持

| 特性 | 支持程度 | 说明 |
|------|----------|------|
| Markdown | ✅ 完整 | 支持标准 Markdown 语法 |
| 打字动画 | ✅ 流畅 | 可自定义速度和效果 |
| 数学公式 | ✅ KaTeX | 支持复杂数学公式 |
| 代码高亮 | ✅ 多语言 | 支持主流编程语言 |

> 这是一个引用块，展示了 Markdown 的强大功能。`,

  math: `# 🧮 勾股定理

在直角三角形中，斜边的平方等于两条直角边的平方和：

$a^2 + b^2 = c^2$

其中：
- $a$ 和 $b$ 是直角边
- $c$ 是斜边

## 示例计算

对于经典的"勾三股四弦五"：

$c = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$

## 更复杂的公式

**二次公式：**
$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$

**积分：**
$\\int_{0}^{\\infty} e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}$

> 💡 数学公式使用 KaTeX 渲染，支持绝大部分 LaTeX 数学语法。`,

  typing: `# ⌨️ 打字动画演示

这段文字会以打字机的效果逐字显示...

## 控制功能

1. **开启/关闭打字效果** - 可以切换静态显示模式
2. **暂停/继续** - 可以在打字过程中暂停和继续  
3. **速度控制** - 通过 interval 属性调整打字速度

### 使用场景

- 📄 **AI 对话界面** - 模拟真实的对话体验
- 📝 **在线文档展示** - 增加阅读的趣味性
- 🎬 **动画效果展示** - 吸引用户注意力
- 📊 **数据流式加载** - 实时展示数据变化

> ⚡ 打字动画支持多种模式，可以实现流畅的视觉效果。`,

  theme: `# 🎨 主题演示

当前主题：**{{THEME}}模式**

## 支持的主题

1. **light** - 亮色主题，适合日间使用 ☀️
2. **dark** - 暗色主题，适合夜间使用 🌙

### 代码高亮

\`\`\`javascript
const theme = 'dark';
if (theme === 'dark') {
    document.body.classList.add('dark-theme');
} else {
    document.body.classList.remove('dark-theme');
}
\`\`\`

> 两种主题都有完美的代码高亮支持，确保在任何环境下都有良好的阅读体验。`,
};
