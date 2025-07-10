# 🚀 全面API演示

这个演示展示了 **ds-markdown** 的所有核心功能和特性。

## ⌨️ 打字效果特性

### 🎛️ 可配置参数

1. **interval**: 控制打字速度，支持 5-200ms 范围调节
2. **timerType**: 两种模式
   - 🎬 **requestAnimationFrame** - 流畅动画，适合现代应用
   - ⏰ **setTimeout** - 精确计时，适合兼容性要求
3. **theme**: 主题切换
   - ☀️ **light** - 亮色主题，适合日间使用
   - 🌙 **dark** - 暗色主题，适合夜间使用
4. **answerType**: 内容类型
   - 💬 **answer** - 回答模式
   - 🤔 **thinking** - 思考模式

### 🎮 控制方法

支持以下 ref 方法：

- `start()` - 开始打字动画
- `stop()` - 暂停打字动画
- `resume()` - 继续打字动画
- `restart()` - 重新开始动画

### 🔄 回调函数监控

- **onStart**: 打字开始时触发
- **onEnd**: 打字结束时触发
- **onBeforeTypedChar**: 每个字符打字前触发
- **onTypedChar**: 每个字符打字后触发

实时监控打字过程中的所有事件和数据变化。

## 🧮 数学公式演示

这里有一些数学公式：

行内公式：$E = mc^2$

块级公式：
$$\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$$

勾股定理：$a^2 + b^2 = c^2$

## 💡 最佳实践建议

### 性能优化

- 推荐使用 **requestAnimationFrame** 模式
- 间隔设置为 **15-30ms** 获得最佳体验
- 高频场景下启用 RAF 模式处理多字符

### 用户体验

- 根据使用环境选择合适的主题
- 根据内容类型选择合适的 answerType
- 利用回调函数添加自定义交互效果

### 代码示例

```typescript
import DsMarkdown from 'ds-markdown';
import { katexPlugin } from 'ds-markdown/plugins';

<DsMarkdown
  interval={30}
  timerType="requestAnimationFrame"
  theme="light"
  plugins={[katexPlugin]}
  onTypedChar={(data) => {
    console.log('当前字符:', data.currentChar);
    console.log('进度:', data.percent);
  }}
>
  # Hello World
  这是一个**打字动画**示例。
</DsMarkdown>
```

> 🎯 这是一个完整的功能演示，展示了库的所有核心特性！

## 🔧 技术特性

### 类型安全

- 完整的 TypeScript 类型定义
- 智能代码提示和错误检查
- 类型安全的 ref 方法调用

### 插件系统

- 支持 remark/rehype 插件
- 内置 KaTeX 数学公式支持
- 可扩展的插件架构

### 性能监控

- 实时帧率监控
- 打字速度统计
- 内存使用优化

这个演示让你可以实时体验和调试所有功能特性！
