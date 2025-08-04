import React, { useEffect, useState } from 'react';
import { useI18n } from '../hooks/useI18n';
import { useLocation } from 'react-router-dom';
import './FloatingToc.css';

const getStartedToc = [
  { id: 'installation', i18n: 'navInstall' },
  { id: 'quick-start', i18n: 'navQuickStart' },
  { id: 'basic-usage', i18n: 'navBasicUsage' },
  { id: 'features', i18n: 'navFeatures' },
  { id: 'next-steps', i18n: 'navNextSteps' },
  { id: 'community', i18n: 'navCommunity' },
];

const examplesToc = [
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
  const location = useLocation();
  const [activeId, setActiveId] = useState('');

  // 根据当前页面选择目录
  const getCurrentToc = () => {
    if (location.pathname === '/get-started') {
      return getStartedToc;
    } else if (location.pathname === '/examples') {
      return examplesToc;
    }
    return [];
  };

  const currentToc = getCurrentToc();

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

      // 处理当前页面的目录
      for (const item of currentToc) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < 120) {
            current = item.id;
          }
        }
      }

      // 处理 API 部分（仅在 examples 页面）
      if (location.pathname === '/examples') {
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
      }

      setActiveId(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lang, location.pathname, currentToc]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 如果不在支持的页面，不显示目录
  if (!currentToc.length && location.pathname !== '/examples') {
    return null;
  }

  return (
    <nav className="floating-toc">
      <ul>
        {currentToc.map((item) => (
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
        {location.pathname === '/examples' && (
          <>
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
                    <ul className="toc-children">
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
          </>
        )}
      </ul>
    </nav>
  );
};

export default FloatingToc;
