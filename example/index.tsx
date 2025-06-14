import { StrictMode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

import '../src/style.less';
import './index.css';

import BasicDemo from './basic';
import CDMDemo from './cmd';
const App = () => {
  return (
    <div className="ds-message">
      <CDMDemo />
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
