# 更新日志

本项目的所有重要变更都将记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [0.1.0]

### 🚀 新增功能

- **数学公式支持**：添加了完整的 KaTeX 集成，提供高性能的数学公式渲染
  - 通过 `splitSymbol` 配置支持 `$...$` 和 `\[...\]` 两种分隔符
  - 完美兼容打字动画的流式渲染
  - 自动适配亮色/暗色主题
  - 新增 `math` 属性，包含 `splitSymbol` 选项
  - 内置语法缓冲，处理流式输出中的不完整数学公式

### 🔧 架构重构

- **插件化架构**：重构数学公式支持为插件系统
  - 新增 `plugins` 属性，支持插件配置
  - 新增 `katexPlugin` 内置插件
  - 新增 `createBuildInPlugin` 工具函数
  - 移除 `math.isOpen` 属性，改为通过插件控制
  - 新增 `IMarkdownPlugin` 接口定义

### 📦 依赖更新

- 新增 `katex` (^0.16.22) 用于数学公式渲染
- 新增 `rehype-katex` (^7.0.1) 用于 HTML 处理
- 新增 `remark-math` (^6.0.0) 用于 Markdown 处理

### 🔧 构建更新

- 更新构建流程，包含 KaTeX CSS 编译
- 新增 `src/katex.less` 用于 KaTeX 样式
- 更新 `package.json` 构建脚本，生成 `dist/katex.css`

### 📚 文档更新

- 更新所有语言版本的 README（中文、English、日本語、한국어）
- 添加完整的数学公式使用指南
- 添加流式数学公式渲染示例
- 添加数学公式优化最佳实践
- 添加数学公式 CSS 自定义示例
- 添加插件系统使用指南

### 🎯 API 变更

- **新增属性**：为声明式和命令式 API 添加 `plugins` 属性
  ```typescript
  interface IMarkdownPlugin {
    remarkPlugin?: unknown;
    rehypePlugin?: unknown;
    type: 'buildIn' | 'custom';
    id?: any;
  }
  ```
- **修改属性**：`math` 属性移除 `isOpen` 选项
  ```typescript
  interface IMarkdownMath {
    splitSymbol: 'dollar' | 'bracket'; // 分隔符类型
  }
  ```

### 🧪 示例更新

- 新增 KaTeX 数学公式流式渲染示例
- 新增完整的数学公式使用示例
- 新增括号语法转换工具 (`remarkMathBracket.ts`)
- 更新示例代码使用新的插件系统

### 🌐 国际化

- 更新 README.md（中文）添加数学公式支持
- 更新 README.en.md 添加数学公式支持
- 更新 README.ja.md 添加数学公式支持（数式サポート）
- 更新 README.ko.md 添加数学公式支持（수식 지원）

### 🔄 破坏性变更

- **移除 `math.isOpen` 属性**：现在需要通过 `plugins` 属性来启用数学公式支持
- **API 变更**：使用 `plugins={[katexPlugin]}` 替代 `math={{ isOpen: true }}`

### 🐛 问题修复

- 无

### 📝 内部更新

- 新增 `src/utils/remarkMathBracket.ts` 用于括号语法转换
- 新增 `src/plugins/index.tsx` 插件系统实现
- 新增 `src/constant.ts` 添加插件标识符
- 增强 `src/components/HighReactMarkdown/index.tsx` 的插件支持
- 更新 `src/defined.ts` 添加插件类型定义
- 更新 `src/MarkdownCMD/index.tsx` 传递插件配置

---

## [历史版本]

### [0.0.x] - 历史版本

- 初始版本，支持基础 Markdown 打字动画
- 流式语法缓冲
- 双定时器模式（requestAnimationFrame + setTimeout）
- 主题支持（亮色/暗色）
- TypeScript 支持
- React 16.8+ 兼容性
