export const migrationGuideData = {
  title: 'v0 to v1 Migration Guide',
  subtitle: 'Help you smoothly transition from v0 to v1',
  sections: {
    overview: {
      title: '📋 Migration Overview',
      description:
        'ds-markdown v1 brings many new features and improvements while maintaining most compatibility with v0. This guide will help you quickly understand the major changes and complete the upgrade.',
    },
    breaking: {
      title: '⚠️ Breaking Changes',
      changes: [
        {
          title: 'Default Timer Type Change',
          description: 'The default value of timerType will change from setTimeout to requestAnimationFrame to provide a smoother animation experience.',
          v0: `<DsMarkdown interval={20}>Content</DsMarkdown>
// Default uses setTimeout`,
          v1: `<DsMarkdown interval={20}>Content</DsMarkdown>
// Will default to requestAnimationFrame

// To keep v0 behavior, explicitly specify:
<DsMarkdown interval={20} timerType="setTimeout">Content</DsMarkdown>`,
          action: 'If you want to keep v0 behavior, please explicitly set `timerType="setTimeout"`.',
        },
        {
          title: 'Dynamic push Usage Change',
          description: "Dynamic push usage changed from `push(newChunk, 'answer')` to `push(newChunk)`.",
          v0: `
// tsx
<DsMarkdownCMD ref={markdownRef} />

// Call
markdownRef.current?.push(newChunk, 'answer');
          `,
          v1: `
// tsx
<DsMarkdownCMD ref={markdownRef} answerType="answer" />

// Call
markdownRef.current?.push(newChunk);
          `,
          action: '',
        },
      ],
    },
    newFeatures: {
      title: '✨ New Features',
      features: [
        {
          title: '1. Support Auto Import CSS',
          description: 'Support auto import CSS, no need to manually import CSS.',
          code: `
// v0: Manually import CSS
import 'ds-markdown/style.css';

<DsMarkdown interval={20}>Content</DsMarkdown>

// v1: Support auto import CSS, no need to manually import
<DsMarkdown interval={20}>Content</DsMarkdown>`,
        },
      ],
    },
  },
};
