import React from 'react';
import './App.css';

// 导入样式
import 'ds-markdown/style.css';
import 'ds-markdown/katex.css';

// 导入组件
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { LanguageProvider } from './LanguageContext';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import GetStarted from './pages/GetStarted';
import TryIt from './pages/TryIt';
import Examples from './pages/Examples';
import Docs from './pages/Docs';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <HashRouter basename="">
        <Header />
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/get-started" replace />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/try" element={<TryIt />} />
          <Route path="/examples" element={<Examples />} />
          <Route path="/docs" element={<Docs />} />
        </Routes>
        <Footer />
      </HashRouter>
    </LanguageProvider>
  );
};

export default App;
