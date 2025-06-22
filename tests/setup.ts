import '@testing-library/jest-dom';
import React from 'react';

// Mock React Markdown dependencies
jest.mock('react-markdown', () => {
  return function MockReactMarkdown({ children }: { children: string }) {
    return React.createElement('div', { className: 'ds-markdown-paragraph' }, children);
  };
});

jest.mock('remark-gfm', () => jest.fn());

// Mock KaTeX
jest.mock('katex', () => ({
  renderToString: jest.fn((formula) => `<span class="katex">${formula}</span>`),
}));

// Mock remark and rehype plugins
jest.mock('remark-math', () => jest.fn());
jest.mock('rehype-katex', () => jest.fn());

// Mock requestAnimationFrame for timer tests
global.requestAnimationFrame = jest.fn((callback) => {
  return setTimeout(callback, 16);
});

global.cancelAnimationFrame = jest.fn((id) => {
  clearTimeout(id);
});

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};

// Setup DOM environment
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
