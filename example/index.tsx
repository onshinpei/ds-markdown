import { StrictMode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

import '../src/style.less';
import './index.css';

import BasicDemo from './basic';
import CDMDemo from './cmd';
import KatexDemo from './katex';
import ManualStartDemo from './ManualStart';
import TypingAnimationDemo from './TypingAnimationDemo';
import CodeDemo from './code';
const App = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  return (
    <div className={`ds-message ds-message-${theme}`}>
      <CDMDemo theme={theme} setTheme={setTheme} />
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
