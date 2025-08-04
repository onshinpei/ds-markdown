import React from 'react';
import { useI18n } from '../../hooks/useI18n';
import { Link, useLocation } from 'react-router-dom';

// Navigation 组件
const Navigation: React.FC = () => {
  const { t, lang, setLang } = useI18n();
  const location = useLocation();

  return (
    <nav className="nav">
      <div className="container">
        <ul className="nav-list">
          <li>
            <Link to="/get-started" className={location.pathname === '/get-started' ? 'active' : ''}>
              Get Started
            </Link>
          </li>
          <li>
            <Link to="/try" className={location.pathname === '/try' ? 'active' : ''}>
              我试试
            </Link>
          </li>
          <li>
            <Link to="/examples" className={location.pathname === '/examples' ? 'active' : ''}>
              Examples
            </Link>
          </li>
          <li>
            <Link to="/docs" className={location.pathname === '/docs' ? 'active' : ''}>
              Docs
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
