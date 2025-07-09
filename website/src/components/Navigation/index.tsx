import React from 'react';
import { useI18n } from '../../hooks/useI18n';

// Navigation 组件
const Navigation: React.FC = () => {
  const { t } = useI18n();
  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string): void => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <nav className="nav">
      <div className="container">
        <ul className="nav-list">
          <li>
            <a href="#installation" onClick={(e) => handleNavClick(e, 'installation')}>
              {t('navInstall')}
            </a>
          </li>
          <li>
            <a href="#basic-usage" onClick={(e) => handleNavClick(e, 'basic-usage')}>
              {t('navBasicUsage')}
            </a>
          </li>
          <li>
            <a href="#math-support" onClick={(e) => handleNavClick(e, 'math-support')}>
              {t('navMathSupport')}
            </a>
          </li>
          <li>
            <a href="#typing-animation" onClick={(e) => handleNavClick(e, 'typing-animation')}>
              {t('navTypingAnimation')}
            </a>
          </li>
          <li>
            <a href="#themes" onClick={(e) => handleNavClick(e, 'themes')}>
              {t('navThemes')}
            </a>
          </li>
          <li>
            <a href="#streaming" onClick={(e) => handleNavClick(e, 'streaming')}>
              {t('navStreaming')}
            </a>
          </li>
          <li>
            <a href="#api" onClick={(e) => handleNavClick(e, 'api')}>
              {t('navApi')}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
