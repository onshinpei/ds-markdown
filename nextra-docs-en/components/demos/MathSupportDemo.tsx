'use client';

import React, { useRef, useState, useEffect } from 'react';
import DemoContainer from './DemoContainer';
import DsMarkdown, { type MarkdownRef } from 'ds-markdown';
import { katexPlugin } from 'ds-markdown/plugins';

interface MathSupportDemoProps {
  markdown?: string;
}

/**
 * Math Formula Support Demo Component
 * Demonstrates KaTeX math formula rendering functionality
 */
export const MathSupportDemo: React.FC<MathSupportDemoProps> = ({ 
  markdown = `# Math Formula Support

ds-markdown supports rendering math formulas using KaTeX.

## Inline Formulas

Mass-energy equation: $E = mc^2$

Pythagorean theorem: $a^2 + b^2 = c^2$

## Block Formulas

$$
\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}
$$

## Matrix

$$
\\begin{bmatrix}
a & b \\\\
c & d
\\end{bmatrix}
$$

## Summation Formula

$$
\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}
$$

> Tip: Click the "Disable Math" button to see the unrendered effect`
}) => {
  const markdownRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [disableTyping, setDisableTyping] = useState(false);
  const [mathOpen, setMathOpen] = useState(true);

  // Viewport detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isStarted) {
          setTimeout(() => {
            handleStart();
          }, 500);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px',
      },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isStarted]);

  const handleStart = () => {
    if (isStarted) {
      markdownRef.current?.restart?.();
    } else {
      markdownRef.current?.start?.();
      setIsStarted(true);
    }
    setIsTyping(true);
    setIsStopped(false);
  };

  const handleStop = () => {
    markdownRef.current?.stop?.();
    setIsStopped(true);
  };

  const handleResume = () => {
    markdownRef.current?.resume?.();
    setIsTyping(true);
    setIsStopped(false);
  };

  const handleToggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleToggleTyping = () => {
    setDisableTyping(!disableTyping);
  };

  const handleToggleMath = () => {
    setMathOpen(!mathOpen);
  };

  const handleTypingStart = () => {
    setIsTyping(true);
  };

  const handleTypingEnd = (data?: { manual?: boolean }) => {
    if (!data?.manual) {
      setIsTyping(false);
      setIsStopped(false);
    }
  };

  // Example code
  const exampleCode = `import DsMarkdown from 'ds-markdown';
import { katexPlugin } from 'ds-markdown/plugins';

function MathMarkdown() {
  return (
    <DsMarkdown
      interval={20}
      plugins={[katexPlugin]}
      math={{ splitSymbol: 'dollar' }}
    >
      # Math Formula Support

      ## Inline Formulas

      Mass-energy equation: $E = mc^2$

      ## Block Formulas

      $$
      \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}
      $$

      ## Summation Formula

      $$
      \\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}
      $$
    </DsMarkdown>
  );
}`;

  return (
    <DemoContainer 
      title="📐 Math Formula Demo" 
      description="Demonstrates KaTeX math formula rendering effects, supports inline and block formulas"
      code={exampleCode}
      language="tsx"
    >
      <div 
        ref={containerRef} 
        className={`demo-impl ${theme === 'dark' ? 'demo-impl-dark' : 'demo-impl-light'}`}
      >
        <div className="demo-controls">
          <button 
            className="demo-btn demo-btn-success" 
            onClick={handleStart} 
            disabled={isStopped}
          >
            {isStarted ? '🔄 Restart' : '▶️ Start'}
          </button>
          {isStopped ? (
            <button 
              className="demo-btn demo-btn-warning" 
              onClick={handleResume}
            >
              ▶️ Resume
            </button>
          ) : (
            <button 
              className="demo-btn demo-btn-danger" 
              onClick={handleStop} 
              disabled={!isTyping}
            >
              ⏸️ Stop
            </button>
          )}
          <button 
            className="demo-btn demo-btn-secondary" 
            onClick={handleToggleTheme}
          >
            {theme === 'light' ? '🌙 Dark Theme' : '☀️ Light Theme'}
          </button>
          <button 
            className="demo-btn demo-btn-outline" 
            onClick={handleToggleTyping}
          >
            {disableTyping ? '🎬 Enable Typing' : '⏭️ Disable Typing'}
          </button>
          <button 
            className="demo-btn demo-btn-outline" 
            onClick={handleToggleMath}
          >
            {mathOpen ? '📐 Disable Math' : '📐 Enable Math'}
          </button>
        </div>

        <div className="demo-preview">
          <DsMarkdown
            ref={markdownRef}
            interval={8}
            answerType="answer"
            theme={theme}
            plugins={mathOpen ? [katexPlugin] : []}
            math={{ splitSymbol: 'dollar' }}
            disableTyping={disableTyping}
            autoStartTyping={false}
            onStart={handleTypingStart}
            onEnd={handleTypingEnd}
          >
            {markdown}
          </DsMarkdown>
        </div>
      </div>
    </DemoContainer>
  );
};

export default MathSupportDemo;
