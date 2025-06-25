import React from 'react';

// Header 组件
const Header: React.FC = () => (
  <header className="header">
    <div className="container">
      <h1 className="logo">ds-markdown</h1>
      <p className="subtitle">🚀 智能 Markdown 打字动画渲染引擎</p>
      <div className="badges">
        <a href="https://www.npmjs.com/package/ds-markdown" target="_blank" rel="noopener noreferrer">
          <img src="https://img.shields.io/npm/v/ds-markdown" alt="NPM Version" />
        </a>
        <a href="https://www.npmjs.com/package/ds-markdown" target="_blank" rel="noopener noreferrer">
          <img src="https://img.shields.io/npm/l/ds-markdown" alt="License" />
        </a>
        <a href="https://www.npmjs.com/package/ds-markdown" target="_blank" rel="noopener noreferrer">
          <img src="https://img.shields.io/npm/dt/ds-markdown" alt="Downloads" />
        </a>
        <a href="https://github.com/onshinpei/ds-markdown" target="_blank" rel="noopener noreferrer">
          <img src="https://img.shields.io/github/stars/onshinpei/ds-markdown" alt="GitHub Stars" />
        </a>
      </div>
    </div>
  </header>
);

export default Header;
