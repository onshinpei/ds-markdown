import React, { useState, useEffect } from 'react';
import { Markdown } from 'ds-markdown';
import { katexPlugin } from 'ds-markdown/plugins';
import mermaidPlugin from 'ds-markdown-mermaid-plugin';
import { useI18n } from '../../hooks/useI18n';
import './index.css';

const defaultMarkdown = `# 欢迎使用 Markdown 编辑器

这是一个功能强大的 Markdown 编辑器，支持实时预览、代码高亮、数学公式和 Mermaid 图表。
## 代码块示例
\`\`\`javascript
function hello() {
  console.log("Hello, Markdown!");
}
\`\`\`

## 数学公式示例
积分高斯函数：
$$
\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}
$$

## Mermaid 图表示例
\`\`\`mermaid
flowchart TD
  A[开始] --> B{条件判断}
  B -->|是| C[操作A]
  B -->|否| D[操作B]
  C --> E[结束]
  D --> E
\`\`\`
---
*开始编辑上面的内容，体验实时预览效果！*`;

const defaultMarkdownEn = `# Welcome to Markdown Editor

This is a powerful Markdown editor that supports real-time preview, code highlighting, mathematical formulas, and Mermaid charts.

## Code Block Example
\`\`\`javascript
function hello() {
  console.log("Hello, Markdown!");
}
\`\`\`

## Math Formula Example
Gaussian integral:
$$
\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}
$$

## Mermaid Chart Example
\`\`\`mermaid
flowchart TD
  A[Start] --> B{Condition}
  B -->|Yes| C[Action A]
  B -->|No| D[Action B]
  C --> E[End]
  D --> E
\`\`\`
---
*Start editing the content above to experience real-time preview!*`;

const TryIt: React.FC = () => {
  const { t, lang } = useI18n();
  const [markdown, setMarkdown] = useState(lang === 'zh' ? defaultMarkdown : defaultMarkdownEn);

  // 监听语言变化，自动更新默认内容
  useEffect(() => {
    setMarkdown(lang === 'zh' ? defaultMarkdown : defaultMarkdownEn);
  }, [lang]);

  const handleEditorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };

  const handleClear = () => {
    setMarkdown('');
  };

  const handleReset = () => {
    setMarkdown(lang === 'zh' ? defaultMarkdown : defaultMarkdownEn);
  };

  return (
    <div className="try-it-page">
      <div className="page-header">
        <h1>{t('tryItTitle')}</h1>
        <p>{t('tryItSubtitle')}</p>
      </div>
      <div className="try-it-container">
        <div className="editor-section">
          <div className="section-header">
            <h3>{t('editorTitle')}</h3>
            <span className="section-subtitle">{t('editorSubtitle')}</span>
          </div>
          <textarea value={markdown} onChange={handleEditorChange} className="markdown-editor" placeholder={t('editorPlaceholder')} />
          <div className="editor-actions">
            <button onClick={handleClear} className="action-btn clear-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              </svg>
              {t('clearButton')}
            </button>
            <button onClick={handleReset} className="action-btn reset-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                <path d="M21 3v5h-5"></path>
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                <path d="M3 21v-5h5"></path>
              </svg>
              {t('resetButton')}
            </button>
          </div>
        </div>
        <div className="preview-section">
          <div className="section-header">
            <h3>{t('previewTitle')}</h3>
            <span className="section-subtitle">{t('previewSubtitle')}</span>
          </div>
          <div className="markdown-preview">
            <Markdown interval={0} plugins={[katexPlugin, mermaidPlugin]}>
              {markdown}
            </Markdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryIt;
