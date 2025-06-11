# ds-markdown

`ds-markdown`是一个[React](https://react.dev)组件, 类似[deepseek官网](https://chat.deepseek.com/)风格的 `Markdown`

[DEMO](https://onshinpei.github.io/ds-markdown/)

## 特性

- 🦮 对`deepseek`官网的聊天响应效果进行了1:1还原
- 🛠 自带打字效果
- 🦮 内部封装了常用的`markdown`格式的文本显示
- 🔤 对大文档进行了性能优化，进行分批处理，生成打字效果的时候不会对页面造成卡顿现象

## 安装

```bash
npm install ds-markdown
```

<a href="https://www.npmjs.com/package/ds-markdown"><img src="https://img.shields.io/npm/v/ds-markdown" alt="npm version"/></a>
<img src="https://img.shields.io/npm/dm/ds-markdown.svg" alt="npm downloads"/> <img src="https://img.shields.io/bundlephobia/minzip/ds-markdown" alt="Min gzipped size"/>

## props

### 默认导出

| 属性名        | 类型                                                                                                     | 说明                                                                         | 默认值                    |
| ------------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------- |
| `interval`    | `number`                                                                                                 | 打字的速度`ms`                                                               | `30`                      |
| `timerType`   | `'setTimeout'` \| `'requestAnimationFrame'`                                                              | 计时器类型，详见下方说明                                                     | `'requestAnimationFrame'` |
| `answerType`  | `thinking` \| `answer`                                                                                   | `markdown`类型                                                               | `answer`                  |
| `onEnd`       | `(data: { str: string; answerType: AnswerType }) => void`                                                | 打字结束后回调，**可能会触发多次，因为AI的响应可能是一段一段，间隔可能较久** | -                         |
| `onStart`     | `(data: { currentIndex: number; currentChar: string; answerType: AnswerType; prevStr: string }) => void` | 打字开始回调 **可能会触发多次**                                              | -                         |
| `onTypedChar` | `(data: { currentIndex: number; currentChar: string; answerType: AnswerType; prevStr: string }) => void` | 当前正在打字的回调                                                           | -                         |

#### timerType 模式说明

##### `requestAnimationFrame` 模式 (推荐)

- **🎯 时间驱动**: 基于实际经过的时间计算字符数量
- **📊 批量处理**: 单帧内可以处理多个字符，适合高频间隔
- **🎬 帧同步**: 与浏览器刷新率（60fps）同步，动画更流畅
- **适用场景**: 追求流畅动画效果，特别是`interval < 16ms`的高频打字

```typescript
// 高频示例：interval = 5ms
// 每帧(16.67ms)会打印 3-4 个字符，视觉效果流畅连续
```

##### `setTimeout` 模式 (传统)

- **⚡ 单字符处理**: 每次调用只处理一个字符
- **🕐 固定间隔**: 严格按照设定的interval执行
- **🎵 节拍感**: 精确的时间控制，传统打字机效果
- **适用场景**: 需要精确时间控制，营造传统打字机的节拍感

```typescript
// 示例：interval = 100ms
// 精确每100ms打印一个字符，有明显的节拍感
```

##### 性能对比

| 特性         | requestAnimationFrame        | setTimeout       |
| ------------ | ---------------------------- | ---------------- |
| **字符处理** | 每帧可处理多个字符           | 每次处理一个字符 |
| **高频间隔** | ✅ 优秀 (5ms → 每帧3字符)    | ❌ 可能卡顿      |
| **低频间隔** | ✅ 正常 (100ms → 6帧后1字符) | ✅ 精确          |
| **视觉效果** | 🎬 流畅动画感                | ⚡ 精确节拍感    |

## 使用示例 - default export

[在线查看](https://stackblitz.com/edit/vitejs-vite-ddfw8avb?file=src%2FApp.tsx)

```tsx
import { useState } from 'react';
import DsMarkdown from 'ds-markdown';
import 'ds-markdown/style.css';

const markdown = `# ds-markdown

\`ds-markdown\`是一个[React](https://react.dev)组件, 类似[deepseek官网](https://chat.deepseek.com/)风格的 \`Markdown\`

## 特性

- 🦮 对`deepseek`官网的聊天响应效果进行了1:1还原
- 🛠 自带打字效果
- 🦮 内部封装了常用的\`markdown\`格式的文本显示
- 🔤 对大文档进行了性能优化，进行分批处理，生成打字效果的时候不会对页面造成卡顿现象
`;

function App() {
  const [thinkingContent, setThinkingContent] = useState('');
  const [answerContent, setAnswerContent] = useState('');

  const onClick = () => {
    // 如果重复点击，则会清空之前的效果
    setThinkingContent('这是我思考的内容，我已经思考完成，下面是我的答案');
  };

  console.log(answerContent);
  return (
    <div>
      <button onClick={onClick}>点击显示文字效果</button>
      <DsMarkdown
        answerType="thinking"
        interval={5}
        onEnd={() => {
          console.log('思考完成');
          setAnswerContent(markdown);
        }}
      >
        {thinkingContent}
      </DsMarkdown>

      {!!answerContent && (
        <DsMarkdown answerType="answer" interval={5}>
          {answerContent}
        </DsMarkdown>
      )}
    </div>
  );
}

export default App;
```

## 命令式示例

上面的示例中使用声明式方式来进行`markdown`的打字效果，当我们用流式拉取到数据时，文字是一个不断变化的过程，我们可以进行命令式的方式来加入文字，这样可以减少`markdown`的`rerender`
使用方式：
`import { MarkdownCMD } from 'ds-markdown';`

[在线查看](https://stackblitz.com/edit/vitejs-vite-2ri8kex3?file=src%2FApp.tsx)

```tsx
import { useRef, useState } from 'react';
import { MarkdownCMD } from 'ds-markdown';
import 'ds-markdown/style.css';

const markdown = `# ds-markdown

\`ds-markdown\`是一个[React](https://react.dev)组件, 类似[deepseek官网](https://chat.deepseek.com/)风格的 \`Markdown\`

## 特性

- 🦮 对`deepseek`官网的聊天响应效果进行了1:1还原
- 🛠 自带打字效果
- 🦮 内部封装了常用的\`markdown\`格式的文本显示
- 🔤 对大文档进行了性能优化，进行分批处理，生成打字效果的时候不会对页面造成卡顿现象
`;

function App() {
  const ref = useRef();

  const onClick = () => {
    // 如果重复点击，则会清空之前的效果
    ref.current.clear();
    // 显示思考过程
    ref.current.push('这是思考过程:我正在思考 ds-markdown是什么\n\n思考完成,准备发送答案', 'thinking');
    // 显示结果
    ref.current.push(markdown, 'answer');
  };

  return (
    <div>
      <button onClick={onClick}>点击显示文字效果</button>
      <MarkdownCMD ref={ref} />
    </div>
  );
}

export default App;
```

## 兼容性

由于本组件采用`react hooks`编写，所以`react`版本最低为`v16.8.0`

## License

MIT
