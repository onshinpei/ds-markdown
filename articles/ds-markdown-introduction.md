# ds-markdown：专为 AI 时代打造的 Markdown 打字动画组件

## 前言

在 ChatGPT、Claude、文心一言等 AI 应用遍地开花的今天，你是否注意到一个细节：**AI 的回复不是瞬间出现的，而是像真人打字一样逐字显示**。这种打字动画效果极大地增强了用户的沉浸感，让人感觉真的在与一个智能体对话。

但是，当你想在自己的项目中实现类似效果时，你会发现：

- 传统的打字机组件处理 AI 流式数据时会**卡顿、跳字**
- 打字动画和 Markdown 渲染**无法兼得**——要么只能打字，要么只能渲染
- 数学公式、Mermaid 图表等复杂内容**完全无法支持**

今天介绍的 **ds-markdown**，就是为了解决这些痛点而生的。

## 它解决了什么问题？

### 问题一：流式数据导致打字卡顿

AI 后端返回的是**流式数据**，每个 chunk 可能包含多个字符。传统打字机组件会把整个 chunk 一次性显示，导致视觉上的「跳字」现象：

```
❌ 传统方案：「你」->「你好，我」->「你好，我是AI」 （跳跃式）
✅ ds-markdown：「你」->「你好」->「你好，」->「你好，我」... （丝滑逐字）
```

ds-markdown 会智能地将每个 chunk **拆分成单个字符**，确保每一个字都有流畅的打字效果。

### 问题二：打字与渲染的两难选择

很多打字机组件只支持纯文本。但 AI 的回复往往包含丰富的 Markdown 格式：

- **粗体**、*斜体*、~~删除线~~
- 代码块（带语法高亮）
- 表格
- 数学公式 $E=mc^2$
- Mermaid 流程图

ds-markdown 实现了**边打字边渲染**，让你的 AI 应用既有打字动画的沉浸感，又有完整的 Markdown 渲染能力。

## 快速上手

安装：

```bash
npm install ds-markdown
```

基础使用：

```tsx
import DsMarkdown from 'ds-markdown';

function ChatMessage({ content }) {
  return (
    <DsMarkdown interval={20} answerType="answer">
      {content}
    </DsMarkdown>
  );
}
```

处理流式数据：

```tsx
import DsMarkdown from 'ds-markdown';
import { useState, useEffect } from 'react';

function AIChat() {
  const [content, setContent] = useState('');

  useEffect(() => {
    // 模拟 AI 流式响应
    const eventSource = new EventSource('/api/chat');
    eventSource.onmessage = (e) => {
      setContent(prev => prev + e.data);
    };
    return () => eventSource.close();
  }, []);

  return (
    <DsMarkdown interval={30}>
      {content}
    </DsMarkdown>
  );
}
```

就是这么简单！组件会自动处理增量内容，平滑地展示打字动画。

## 核心特性

### 🎯 为 AI 场景量身定制

- **智能增量处理**：自动识别新增内容，无需手动管理状态
- **双模式支持**：`answer`（回答）和 `thinking`（思考中）两种样式
- **丝滑动画**：支持 `requestAnimationFrame`，60fps 流畅体验

### 📝 完整的 Markdown 支持

- GFM 语法（表格、任务列表、删除线等）
- 代码块语法高亮（自带复制、下载按钮）
- 数学公式（KaTeX，支持 `$...$` 和 `$$...$$`）
- Mermaid 图表（通过插件支持）

### 🎨 开箱即用的 UI

- 明/暗主题切换
- 精心设计的代码块样式
- 国际化支持（中/英文）
- 丰富的 UI 组件导出（Button、CopyButton 等）

### ⚡ 卓越的性能

- 轻量级设计
- 智能渲染优化
- 打字过程不阻塞 UI

## 进阶用法

### 控制打字速度

```tsx
// 固定间隔
<DsMarkdown interval={50}>...</DsMarkdown>

// 动态速度控制
<DsMarkdown interval={{
  default: 30,    // 默认间隔
  code: 10,       // 代码块更快
  punctuation: 100 // 标点停顿
}}>
  ...
</DsMarkdown>
```

### 生命周期回调

```tsx
<DsMarkdown
  onStart={() => console.log('开始打字')}
  onEnd={() => console.log('打字完成')}
  onTypedChar={({ char }) => console.log('打印了:', char)}
>
  ...
</DsMarkdown>
```

### 手动控制

```tsx
const ref = useRef();

// 暂停/继续
ref.current.stop();
ref.current.resume();

// 重新开始
ref.current.restart();

<DsMarkdown ref={ref}>...</DsMarkdown>
```

### 禁用动画（直接渲染）

```tsx
// 历史消息不需要动画
<DsMarkdown disableTyping={true}>
  {historyMessage}
</DsMarkdown>
```

## 与其他方案对比

| 特性 | ds-markdown | streamdown | react-markdown |
|------|-------------|------------|----------------|
| **打字动画** | ✅ 逐字丝滑动画 | ❌ 无打字效果 | ❌ 无 |
| **流式渲染** | ✅ | ✅ | ❌ 需手动处理 |
| **Markdown 渲染** | ✅ | ✅ | ✅ |
| **数学公式** | ✅ KaTeX | ✅ KaTeX | 需配置 |
| **Mermaid 图表** | ✅ 插件支持 | ✅ | 需配置 |
| **代码高亮** | ✅ 内置 | ✅ Shiki | 需配置 |
| **主题切换** | ✅ 内置明/暗 | 需 Tailwind | ❌ |
| **打字速度控制** | ✅ 精细控制 | ❌ | ❌ |
| **暂停/继续/重播** | ✅ | ❌ | ❌ |
| **样式依赖** | ✅ 零依赖，开箱即用 | 需要 Tailwind CSS | 无样式 |
| **国际化** | ✅ 中/英文 | ✅ CJK 支持 | ❌ |
| **定位** | AI 打字动画组件 | 流式 Markdown 渲染器 | 静态 Markdown 渲染器 |

### ds-markdown vs streamdown：如何选择？

**[streamdown](https://github.com/vercel/streamdown)** 是 Vercel 出品的优秀流式 Markdown 渲染器，专注于解决「未闭合标签」的流式渲染问题。它的核心优势是：
- 可以优雅地处理不完整的 Markdown 块
- 内置安全防护（防止恶意链接/图片注入）
- 作为 react-markdown 的 drop-in 替代品

**ds-markdown** 则专注于**打字动画体验**：
- 如果你需要 **ChatGPT 风格的逐字打字效果**，选 ds-markdown
- 如果你只需要 **流式渲染而不需要打字动画**，streamdown 是个好选择
- 如果你想要 **既能流式渲染，又有丝滑打字动画**，ds-markdown 是唯一的选择

简单来说：
> **streamdown = 流式渲染**
> **ds-markdown = 流式渲染 + 打字动画**

## 适用场景

- **AI 聊天机器人**：ChatGPT 风格的对话界面
- **智能客服系统**：让机器人回复更有「温度」
- **文档生成工具**：AI 写作助手的实时预览
- **教育类应用**：AI 辅导、题目讲解
- **任何需要打字效果 + Markdown 的场景**

## 在线体验

- 📖 [完整文档](https://onshinpei.github.io/ds-markdown/)
- 🎮 [在线演示](https://onshinpei.github.io/ds-markdown/#try)
- 💻 [StackBlitz 示例](https://stackblitz.com/edit/vitejs-vite-61cs2kga)

## 结语

在 AI 时代，用户体验的细节决定产品的质量。**ds-markdown** 让你用最少的代码，实现最专业的 AI 聊天体验。

如果你正在开发 AI 相关的应用，不妨试试这个组件。欢迎 Star 和提 Issue！

- **GitHub**: https://github.com/onshinpei/ds-markdown
- **NPM**: https://www.npmjs.com/package/ds-markdown
