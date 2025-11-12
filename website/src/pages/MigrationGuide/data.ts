export const migrationGuideData = {
  title: 'v0 到 v1 升级指南',
  subtitle: '帮助您从 v0 平滑过渡到 v1 版本',
  sections: {
    overview: {
      title: '📋 升级概览',
      description: 'ds-markdown v1 版本带来了许多新特性和改进，同时保持了与 v0 版本的大部分兼容性。本指南将帮助您快速了解主要变化并完成升级。',
    },
    breaking: {
      title: '⚠️ 破坏性变更',
      changes: [
        {
          title: '定时器类型默认值变化',
          description: 'timerType 的默认值将从 setTimeout 改为 requestAnimationFrame，以提供更流畅的动画体验。',
          v0: `<DsMarkdown interval={20}>内容</DsMarkdown>
// 默认使用 setTimeout`,
          v1: `<DsMarkdown interval={20}>内容</DsMarkdown>
// 将默认使用 requestAnimationFrame

// 如需保持 v0 行为，显式指定：
<DsMarkdown interval={20} timerType="setTimeout">内容</DsMarkdown>`,
          action: '如果您希望保持 v0 的行为，请显式设置 `timerType="setTimeout"`。',
        },
        {
          title: '动态 push 用法变更',
          description: "动态push用法从 `push(newChunk, 'answer')` 改为 `push(newChunk)`。",
          v0: `
// tsx
<DsMarkdownCMD ref={markdownRef} />

// 调用
markdownRef.current?.push(newChunk, 'answer');
          `,
          v1: `
// tsx
<DsMarkdownCMD ref={markdownRef} answerType="answer" />

// 调用
markdownRef.current?.push(newChunk);
          `,
          action: '',
        },
      ],
    },
    newFeatures: {
      title: '✨ 新特性',
      features: [
        {
          title: '1. 支持自动导入css',
          description: '支持自动导入css，无需手动导入css。',
          code: `
// v0: 手动导入css
import 'ds-markdown/style.css';

<DsMarkdown interval={20}>内容</DsMarkdown>

// v1: 支持自动导入css,无需手动导入
<DsMarkdown interval={20}>内容</DsMarkdown>`,
        },
      ],
    },
  },
};
