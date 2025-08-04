import React, { useEffect, useRef } from 'react';
import { useI18n } from '../../hooks/useI18n';
import './Header.css';

// 数字雨背景组件
const DigitalRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 数字雨效果 - 从左往右
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;:,.<>?';
    const rows = Math.floor((canvas?.height || 600) / 20);
    const drops: number[] = new Array(rows).fill(1);

    const drawRain = () => {
      if (!ctx || !canvas) return;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = '15px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = drops[i] * 20;
        const y = i * 20;

        // 计算距离屏幕中心的距离，调整透明度
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const distanceFromCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));

        // 根据距离调整透明度，中间更淡
        const opacity = Math.max(0.1, Math.min(1, distanceFromCenter / maxDistance));
        ctx.fillStyle = `rgba(0, 255, 255, ${opacity * 0.6})`;

        ctx.fillText(text, x, y);

        if (drops[i] * 20 > canvas.width && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(drawRain, 35);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(interval);
    };
  }, []);

  return <canvas ref={canvasRef} className="digital-rain-canvas" />;
};

// Header 组件
const Header: React.FC = () => {
  const { t } = useI18n();
  return (
    <header className="header">
      <DigitalRain />
      <div className="container">
        <h1 className="logo" data-text="ds-markdown">
          ds-markdown
        </h1>
        <p className="subtitle">🚀 {t('headerSubtitle')}</p>
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
};

export default Header;
