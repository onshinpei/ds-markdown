# Demo 组件使用指南

这个目录包含了可在 Nextra 文档中使用的交互式演示组件。

## 目录结构

```
components/demos/
├── DemoContainer.tsx      # 通用的演示容器组件
├── BasicUsageDemo.tsx     # 基础用法演示
├── index.ts               # 统一导出文件
└── README.md             # 本文件
```

## 如何在 MDX 中使用

### 1. 在 MDX 文件顶部导入组件

```mdx
import { BasicUsageDemo } from '../../components/demos'
```

### 2. 在内容中使用组件

```mdx
# 示例页面

这是一些说明文字...

## 在线演示

<BasicUsageDemo />

更多内容...
```

## 创建新的 Demo 组件

### 步骤 1：创建组件文件

在 `components/demos/` 目录下创建新的组件文件，例如 `CustomThemeDemo.tsx`：

```tsx
'use client';

import React from 'react';
import DemoContainer from './DemoContainer';
import DsMarkdown from 'ds-markdown';

export const CustomThemeDemo: React.FC = () => {
  return (
    <DemoContainer 
      title="自定义主题演示" 
      description="展示如何自定义主题样式"
    >
      <div className="demo-impl demo-impl-light">
        {/* 你的演示代码 */}
        <DsMarkdown>
          # 自定义主题
        </DsMarkdown>
      </div>
    </DemoContainer>
  );
};

export default CustomThemeDemo;
```

### 步骤 2：在 index.ts 中导出

```ts
export { default as CustomThemeDemo } from './CustomThemeDemo';
```

### 步骤 3：在 MDX 中使用

```mdx
import { CustomThemeDemo } from '../../components/demos'

<CustomThemeDemo />
```

## 样式说明

所有样式定义在 `styles/demos.css` 中，主要包括：

### 容器类
- `.demo-container` - 演示容器的外层样式
- `.demo-content` - 演示内容区域
- `.demo-impl` - 演示实现区域
- `.demo-impl-light` / `.demo-impl-dark` - 明暗主题

### 控制类
- `.demo-controls` - 控制按钮区域
- `.demo-preview` - 预览区域

### 按钮类
- `.demo-btn` - 基础按钮样式
- `.demo-btn-success` - 成功按钮（绿色）
- `.demo-btn-warning` - 警告按钮（橙色）
- `.demo-btn-danger` - 危险按钮（红色）
- `.demo-btn-secondary` - 次要按钮（灰色）
- `.demo-btn-outline` - 轮廓按钮

## 最佳实践

### 1. 使用 DemoContainer

始终使用 `DemoContainer` 包装你的演示，以保持一致的外观：

```tsx
<DemoContainer title="标题" description="描述">
  {/* 你的演示内容 */}
</DemoContainer>
```

### 2. 添加 'use client' 指令

由于演示组件通常包含交互和状态，记得在文件顶部添加：

```tsx
'use client';
```

### 3. 视口检测

对于自动播放的演示，使用 IntersectionObserver 检测组件是否进入视口：

```tsx
useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        // 开始演示
      }
    },
    { threshold: 0.3 }
  );
  
  if (containerRef.current) {
    observer.observe(containerRef.current);
  }
  
  return () => observer.disconnect();
}, []);
```

### 4. 响应式设计

确保你的演示在移动设备上也能正常工作：

```css
@media (max-width: 768px) {
  /* 移动端样式调整 */
}
```

## 注意事项

1. **性能优化**：避免在演示中使用过多的实时更新和动画
2. **错误处理**：提供友好的错误提示，尤其是依赖未安装时
3. **清理资源**：在 useEffect 的清理函数中释放资源（如定时器、观察器等）
4. **可访问性**：为按钮添加适当的 aria 标签和禁用状态

## 安装依赖

确保已安装 `ds-markdown`：

```bash
npm install ds-markdown
```

或

```bash
pnpm add ds-markdown
```

## 开发调试

运行开发服务器：

```bash
npm run dev
```

然后访问 http://localhost:3000 查看你的演示。

