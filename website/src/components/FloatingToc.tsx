import React, { useEffect, useState } from 'react';
import { useI18n } from '../hooks/useI18n';
import './FloatingToc.css';

const demoToc = [
  { id: 'installation', i18n: 'navInstall' },
  { id: 'basic-usage', i18n: 'navBasicUsage' },
  { id: 'math-support', i18n: 'navMathSupport' },
  { id: 'typing-animation', i18n: 'navTypingAnimation' },
  { id: 'themes', i18n: 'navThemes' },
  { id: 'streaming', i18n: 'navStreaming' },
  { id: 'mermaid-demo', i18n: 'navMermaid' },
];

const apiToc = [
  { id: 'api', i18n: 'navApi' },
  {
    id: '类型定义',
    label: '类型定义',
    children: [
      { id: 'ITypedChar', label: 'ITypedChar' },
      { id: 'IBeforeTypedChar', label: 'IBeforeTypedChar' },
      { id: 'IMarkdownMath', label: 'IMarkdownMath' },
      { id: 'IMarkdownPlugin', label: 'IMarkdownPlugin' },
      { id: 'IMarkdownCode', label: 'IMarkdownCode' },
      { id: 'IEndData', label: 'IEndData' },
      { id: 'IStartData', label: 'IStartData' },
      { id: 'I18nData', label: 'I18nData' },
    ],
  },
  { id: 'api-props', label: 'Props 属性' },
  { id: 'api-ref-ds', label: 'Ref 方法 - DsMarkdown' },
  { id: 'api-ref-cmd', label: 'Ref 方法 - MarkdownCMD' },
  { id: 'api-plugin', label: '内置插件' },
  { id: 'api-timer', label: '定时器模式对比' },
  { id: 'api-formula', label: '数学公式分隔符说明' },
  { id: 'api-config', label: 'ConfigProvider 多语言' },
  { id: 'api-best', label: '最佳实践建议' },
  { id: 'api-example', label: '使用示例' },
];

const FloatingToc: React.FC = () => {
  const { t, lang } = useI18n();
  const [activeId, setActiveId] = useState('');

  // 处理 API 区标题多语言
  const apiLabels = {
    'Props 属性': lang === 'zh' ? 'Props 属性' : 'Props',
    'Ref 方法 - DsMarkdown': lang === 'zh' ? 'Ref 方法 - DsMarkdown' : 'Ref Methods - DsMarkdown',
    'Ref 方法 - MarkdownCMD': lang === 'zh' ? 'Ref 方法 - MarkdownCMD' : 'Ref Methods - MarkdownCMD',
    类型定义: lang === 'zh' ? '类型定义' : 'Type Definitions',
    内置插件: lang === 'zh' ? '内置插件' : 'Built-in Plugins',
    定时器模式对比: lang === 'zh' ? '定时器模式对比' : 'Timer Comparison',
    数学公式分隔符说明: lang === 'zh' ? '数学公式分隔符说明' : 'Math Formula Delimiters',
    'ConfigProvider 多语言': lang === 'zh' ? 'ConfigProvider 多语言' : 'ConfigProvider & i18n',
    最佳实践建议: lang === 'zh' ? '最佳实践建议' : 'Best Practices',
    使用示例: lang === 'zh' ? '使用示例' : 'Examples',
  };

  useEffect(() => {
    const handleScroll = () => {
      // 处理活跃状态
      let current = '';

      // 处理 demo 部分
      for (const item of demoToc) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < 120) {
            current = item.id;
          }
        }
      }

      // 处理 API 部分
      for (const item of apiToc) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < 120) {
            current = item.id;
          }
        }

        // 处理子项
        if (item.children) {
          for (const child of item.children) {
            const childEl = document.getElementById(child.id);
            if (childEl) {
              const rect = childEl.getBoundingClientRect();
              if (rect.top < 120) {
                current = child.id;
              }
            }
          }
        }
      }

      setActiveId(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lang]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="floating-toc">
      <ul>
        {demoToc.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={activeId === item.id ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
            >
              {t(item.i18n)}
            </a>
          </li>
        ))}
        <li className="toc-divider" />
        {apiToc.map((item) => (
          <React.Fragment key={item.id}>
            <li>
              <a
                href={`#${item.id}`}
                className={activeId === item.id ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
              >
                {item.i18n ? t(item.i18n) : (item.label && apiLabels[item.label as keyof typeof apiLabels]) || item.label}
              </a>
              {item.children && (
                <ul style={{ marginLeft: 12, marginTop: 4 }}>
                  {item.children.map((child) => (
                    <li key={child.id}>
                      <a
                        href={`#${child.id}`}
                        className={activeId === child.id ? 'active' : ''}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(child.id);
                        }}
                      >
                        {child.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </React.Fragment>
        ))}
      </ul>
    </nav>
  );
};

export default FloatingToc;
