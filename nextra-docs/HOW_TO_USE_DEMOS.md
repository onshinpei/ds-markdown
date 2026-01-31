# 如何在新版文档中使用可运行示例

本指南说明如何在 Nextra 新版文档中添加可在线运行的示例。

## 📋 概述

新版文档使用 Nextra (Next.js + MDX)，支持在 MDX 文件中直接导入和使用 React 组件。我们已经创建了一套可复用的 Demo 组件系统。

## 🚀 快速开始

### 1. 安装依赖

首先确保安装了 `ds-markdown` 包：

```bash
cd nextra-docs
npm install
```

`ds-markdown` 已经添加到 `package.json` 中，运行 `npm install` 即可。

### 2. 在 MDX 文件中使用演示

在任何 `.mdx` 文件中，你可以这样使用：

```mdx
import { BasicUsageDemo } from '../../components/demos'

# 你的页面标题

一些介绍文字...

## 在线演示

<BasicUsageDemo />

继续其他内容...
```

### 3. 运行开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看效果。

## 📁 项目结构

```
nextra-docs/
├── components/
│   └── demos/                    # Demo 组件目录
│       ├── DemoContainer.tsx     # 通用容器组件
│       ├── BasicUsageDemo.tsx    # 基础用法演示
│       ├── index.ts              # 统一导出
│       └── README.md             # 详细文档
├── styles/
│   └── demos.css                 # Demo 样式
├── pages/
│   ├── _app.tsx                  # 已导入样式
│   └── examples/
│       └── basic-usage.mdx       # 示例页面
└── package.json                  # 已添加 ds-markdown
```

## 🎨 已有的 Demo 组件

### BasicUsageDemo

展示基本的打字动画功能，包含：
- 开始/重新开始按钮
- 停止/继续按钮
- 主题切换（亮色/暗色）
- 禁用打字功能
- 自动在视口中触发

使用方法：

```mdx
import { BasicUsageDemo } from '../../components/demos'

<BasicUsageDemo />
```

你也可以传入自定义的 markdown：

```mdx
<BasicUsageDemo markdown="# 自定义内容\n\n这是自定义的 markdown 内容" />
```

## 🔧 创建新的 Demo 组件

### 方法 1：基于 BasicUsageDemo 修改

1. 复制 `BasicUsageDemo.tsx` 并重命名
2. 修改内容和功能
3. 在 `index.ts` 中导出
4. 在 MDX 文件中使用

### 方法 2：从头创建

```tsx
'use client';

import React from 'react';
import DemoContainer from './DemoContainer';
import DsMarkdown from 'ds-markdown';

export const MyDemo: React.FC = () => {
  return (
    <DemoContainer 
      title="我的演示" 
      description="演示描述"
    >
      <div className="demo-impl demo-impl-light">
        <DsMarkdown interval={20}>
          # 你的内容
        </DsMarkdown>
      </div>
    </DemoContainer>
  );
};

export default MyDemo;
```

然后在 `components/demos/index.ts` 中添加：

```ts
export { default as MyDemo } from './MyDemo';
```

## 💡 最佳实践

### 1. 导入路径

根据你的 MDX 文件位置调整导入路径：

```mdx
# 在 pages/examples/*.mdx 中
import { BasicUsageDemo } from '../../components/demos'

# 在 pages/*.mdx 中
import { BasicUsageDemo } from '../components/demos'

# 在 pages/subfolder/page.mdx 中
import { BasicUsageDemo } from '../../components/demos'
```

### 2. 使用 DemoContainer

始终使用 `DemoContainer` 包装你的演示，以保持一致的 UI：

```tsx
<DemoContainer title="标题" description="描述">
  {/* 内容 */}
</DemoContainer>
```

### 3. 响应式设计

所有样式已经考虑了响应式设计，在移动设备上会自动调整。

### 4. 主题支持

使用预定义的主题类：
- `demo-impl-light` - 亮色主题
- `demo-impl-dark` - 暗色主题

按钮样式：
- `demo-btn-success` - 绿色（成功）
- `demo-btn-warning` - 橙色（警告）
- `demo-btn-danger` - 红色（危险）
- `demo-btn-secondary` - 灰色（次要）
- `demo-btn-outline` - 轮廓样式

## 🔄 从旧版迁移

### 旧版文档 (website/)

旧版使用独立的组件系统：
- 位置：`website/src/components/Demos/`
- 每个 Demo 是独立的文件夹
- 包含 index.tsx 和 markdown 文件

### 新版文档 (nextra-docs/)

新版使用 Nextra + MDX：
- 位置：`nextra-docs/components/demos/`
- 所有 Demo 在同一目录
- 直接在 MDX 中导入使用

### 迁移步骤

1. **复制组件逻辑**
   - 从 `website/src/components/Demos/XxxDemo/index.tsx` 复制核心逻辑
   - 放到 `nextra-docs/components/demos/XxxDemo.tsx`

2. **调整导入**
   - 更新 import 路径
   - 添加 `'use client'` 指令（如果有交互）

3. **使用 DemoContainer**
   - 包装在 DemoContainer 中
   - 添加标题和描述

4. **导出组件**
   - 在 `index.ts` 中添加导出

5. **在 MDX 中使用**
   - 导入并使用新组件

## 🐛 常见问题

### Q: 提示找不到模块？

A: 检查导入路径是否正确。使用相对路径，从当前 MDX 文件位置计算。

### Q: 样式不生效？

A: 确保 `pages/_app.tsx` 中已导入 `../styles/demos.css`。

### Q: 组件不显示？

A: 
1. 检查是否添加了 `'use client'` 指令
2. 检查是否在 `index.ts` 中导出
3. 查看浏览器控制台的错误信息

### Q: ds-markdown 未定义？

A: 运行 `npm install` 安装依赖。如果仍有问题，手动运行：

```bash
npm install ds-markdown
```

## 📚 相关文档

- [Nextra 官方文档](https://nextra.site/)
- [MDX 官方文档](https://mdxjs.com/)
- [ds-markdown 仓库](https://github.com/onshinpei/ds-markdown)
- [Demo 组件详细文档](./components/demos/README.md)

## 🎯 示例页面

查看已经实现的示例：
- `pages/examples/basic-usage.mdx` - 基础用法演示

## 💬 需要帮助？

如果遇到问题，请：
1. 查看本文档和 `components/demos/README.md`
2. 检查浏览器控制台的错误信息
3. 参考 `BasicUsageDemo.tsx` 的实现
4. 查看 Nextra 官方文档

祝你使用愉快！🎉

