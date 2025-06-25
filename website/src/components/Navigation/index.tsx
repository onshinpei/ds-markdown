import React from 'react';

// Navigation 组件
const Navigation: React.FC = () => {
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
              安装
            </a>
          </li>
          <li>
            <a href="#basic-usage" onClick={(e) => handleNavClick(e, 'basic-usage')}>
              基础用法
            </a>
          </li>
          <li>
            <a href="#math-support" onClick={(e) => handleNavClick(e, 'math-support')}>
              数学公式
            </a>
          </li>
          <li>
            <a href="#typing-animation" onClick={(e) => handleNavClick(e, 'typing-animation')}>
              打字动画
            </a>
          </li>
          <li>
            <a href="#themes" onClick={(e) => handleNavClick(e, 'themes')}>
              主题切换
            </a>
          </li>
          <li>
            <a href="#api" onClick={(e) => handleNavClick(e, 'api')}>
              API 文档
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
