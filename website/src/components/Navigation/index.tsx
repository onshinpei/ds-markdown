import React from 'react';
import { useI18n } from '../../hooks/useI18n';
import { Link, useLocation } from 'react-router-dom';

const navText = {
  zh: {
    getStarted: '快速开始',
    examples: '示例',
    docs: '文档',
    try: '在线体验',
    migration: 'v0 → v1 升级',
  },
  en: {
    getStarted: 'Get Started',
    examples: 'Examples',
    docs: 'Docs',
    try: 'Try It',
    migration: 'v0 → v1 Migration',
  },
};

// Navigation 组件
const Navigation: React.FC = () => {
  const { lang, setLang } = useI18n();
  const location = useLocation();
  const text = navText[lang];

  return (
    <nav className="nav">
      <div className="container">
        <ul className="nav-list">
          <li>
            <Link to="/get-started" className={location.pathname === '/get-started' ? 'active' : ''}>
              {text.getStarted}
            </Link>
          </li>
          <li>
            <Link to="/examples" className={location.pathname === '/examples' ? 'active' : ''}>
              {text.examples}
            </Link>
          </li>
          <li>
            <Link to="/docs" className={location.pathname === '/docs' ? 'active' : ''}>
              {text.docs}
            </Link>
          </li>
          <li>
            <Link to="/try" className={location.pathname === '/try' ? 'active' : ''}>
              {text.try}
            </Link>
          </li>
          <li>
            <Link to="/migration" className={location.pathname === '/migration' ? 'active' : ''}>
              {text.migration}
            </Link>
          </li>
          <li className="lang-switcher-container">
            <select className="lang-switcher" value={lang} onChange={(e) => setLang(e.target.value as 'zh' | 'en')} aria-label="Language Switcher">
              <option value="zh">中文</option>
              <option value="en">English</option>
            </select>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
