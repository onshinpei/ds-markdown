import React, { useEffect, useState } from 'react';
import { useI18n } from '../hooks/useI18n';
import { useLocation } from 'react-router-dom';
import './FloatingToc.css';

interface TocChild {
  id: string;
  label: string;
}

interface TocItem {
  id: string;
  i18n?: string;
  label?: string;
  children?: TocChild[];
}

const getStartedToc = [
  { id: 'installation', i18n: 'navInstall' },
  { id: 'quick-start', i18n: 'navQuickStart' },
  { id: 'basic-usage', i18n: 'navBasicUsage' },
  { id: 'features', i18n: 'navFeatures' },
  { id: 'next-steps', i18n: 'navNextSteps' },
  { id: 'community', i18n: 'navCommunity' },
];

const examplesToc = [
  { id: 'basic-usage', i18n: 'navBasicUsage' },
  { id: 'math-support', i18n: 'navMathSupport' },
  { id: 'typing-animation', i18n: 'navTypingAnimation' },
  { id: 'themes', i18n: 'navThemes' },
  { id: 'streaming', i18n: 'navStreaming' },
  { id: 'mermaid-demo', i18n: 'navMermaid' },
];

const apiToc = [
  { id: 'api', i18n: 'navApi' },
  { id: 'api-props', i18n: 'navApiProps' },
  { id: 'api-ref-ds', i18n: 'navApiRefDs' },
  { id: 'api-ref-cmd', i18n: 'navApiRefCmd' },
  {
    id: '类型定义',
    i18n: 'navApiTypedef',
    children: [
      { id: 'ITypedChar', label: 'ITypedChar' },
      { id: 'IBeforeTypedChar', label: 'IBeforeTypedChar' },
      { id: 'IMarkdownMath', label: 'IMarkdownMath' },
      { id: 'IntervalConfig', label: 'IntervalConfig' },
      { id: 'IMarkdownPlugin', label: 'IMarkdownPlugin' },
      { id: 'IMarkdownCode', label: 'IMarkdownCode' },
      { id: 'IEndData', label: 'IEndData' },
      { id: 'IStartData', label: 'IStartData' },
    ],
  },
  { id: 'api-plugin', i18n: 'navApiPlugin' },
  { id: 'api-timer', i18n: 'navApiTimer' },
  { id: 'api-formula', i18n: 'navApiFormula' },
  {
    id: 'api-config',
    i18n: 'navApiConfig',
    children: [{ id: 'I18nData', label: 'I18nData' }],
  },
  { id: 'api-best', i18n: 'navApiBest' },
  { id: 'api-example', i18n: 'navApiExample' },
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
    } else if (location.pathname === '/docs') {
      return apiToc;
    }
    return [];
  };

  const currentToc = getCurrentToc();

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
        {currentToc.map((item: TocItem) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={activeId === item.id ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
            >
              {item.i18n ? t(item.i18n) : item.label}
            </a>
            {item.children && (
              <ul>
                {item.children.map((child: TocChild) => (
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
        ))}
      </ul>
    </nav>
  );
};

export default FloatingToc;
