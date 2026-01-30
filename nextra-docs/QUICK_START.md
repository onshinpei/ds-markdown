# 🚀 快速启动指南

## 立即开始

### 1️⃣ 安装依赖

```bash
cd nextra-docs
npm install
```

### 2️⃣ 启动开发服务器

```bash
npm run dev
```

### 3️⃣ 访问示例页面

打开浏览器访问：http://localhost:3000

然后查看示例页面：
- 📝 [基础用法](http://localhost:3000/examples/basic-usage)
- 🎨 [自定义主题](http://localhost:3000/examples/custom-theme)
- 📐 [数学公式](http://localhost:3000/examples/math-formulas)
- 📊 [Mermaid 图表](http://localhost:3000/examples/mermaid-charts)
- 🌊 [流式数据](http://localhost:3000/examples/streaming-data)
- ⚙️ [打字动画](http://localhost:3000/examples/typing-animation)

## 💡 在你的页面中使用

### 创建新的 MDX 页面

在 `pages/` 目录下创建新的 `.mdx` 文件：

```mdx
import { BasicUsageDemo } from '../components/demos'

# 我的新页面

这是一些介绍文字...

## 在线演示

<BasicUsageDemo />

继续其他内容...
```

### 使用其他 Demo 组件

```mdx
import { 
  BasicUsageDemo,
  CustomThemeDemo,
  MathSupportDemo,
  MermaidDemo,
  StreamingDemo,
  TypingAnimationDemo
} from '../components/demos'

# 多个演示

<BasicUsageDemo />

<CustomThemeDemo />

<MathSupportDemo />
```

### 自定义 Markdown 内容

```mdx
import { BasicUsageDemo } from '../components/demos'

<BasicUsageDemo markdown="# 自定义标题\n\n这是自定义内容" />
```

## 📁 项目结构

```
nextra-docs/
├── components/
│   └── demos/              # 所有 Demo 组件
│       ├── BasicUsageDemo.tsx
│       ├── CustomThemeDemo.tsx
│       ├── MathSupportDemo.tsx
│       ├── MermaidDemo.tsx
│       ├── StreamingDemo.tsx
│       ├── TypingAnimationDemo.tsx
│       ├── DemoContainer.tsx
│       └── index.ts        # 统一导出
├── styles/
│   └── demos.css           # Demo 样式
├── pages/
│   ├── _app.tsx            # 已导入样式
│   └── examples/           # 示例页面
│       ├── basic-usage.mdx
│       ├── custom-theme.mdx
│       ├── math-formulas.mdx
│       ├── mermaid-charts.mdx
│       ├── streaming-data.mdx
│       └── typing-animation.mdx
└── package.json            # 已添加依赖
```

## 🎨 可用的 Demo 组件

| 组件 | 描述 | 特性 |
|------|------|------|
| `BasicUsageDemo` | 基础用法 | 开始/停止/继续、主题切换 |
| `CustomThemeDemo` | 主题定制 | 主题预览、动态切换 |
| `MathSupportDemo` | 数学公式 | KaTeX 渲染、启用/禁用 |
| `MermaidDemo` | Mermaid 图表 | 流程图、时序图、饼图 |
| `StreamingDemo` | 流式数据 | 场景切换、实时输出 |
| `TypingAnimationDemo` | 打字动画配置 | 速度调整、统计信息 |

## 🔧 常见问题

### Q: 提示找不到模块？

**A:** 检查导入路径。从当前 MDX 文件到 `components/demos` 的相对路径：

```mdx
# 在 pages/examples/*.mdx 中
import { BasicUsageDemo } from '../../components/demos'

# 在 pages/*.mdx 中
import { BasicUsageDemo } from '../components/demos'
```

### Q: Demo 不显示？

**A:** 确保：
1. 已运行 `npm install`
2. 开发服务器正在运行
3. 导入路径正确
4. 查看浏览器控制台的错误信息

### Q: 样式不生效？

**A:** 确保 `pages/_app.tsx` 中已导入样式：

```tsx
import '../styles/demos.css'
```

### Q: 想要自定义样式？

**A:** 编辑 `styles/demos.css` 文件，或在你的 MDX 文件中添加自定义样式。

## 📚 更多文档

- 📖 [完整迁移说明](./MIGRATION_COMPLETE.md)
- 📖 [Demo 组件开发指南](./components/demos/README.md)
- 📖 [详细使用教程](./HOW_TO_USE_DEMOS.md)

## 🎯 下一步

1. ✅ 查看所有示例页面
2. ✅ 在自己的页面中使用 Demo
3. ✅ 自定义样式和内容
4. ✅ 创建更多自定义 Demo

## 💬 需要帮助？

- 查看 [Nextra 文档](https://nextra.site/)
- 查看 [ds-markdown 仓库](https://github.com/onshinpei/ds-markdown)
- 阅读项目中的 README 文件

---

**祝你使用愉快！** 🎉

