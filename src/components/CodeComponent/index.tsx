import React, { memo, useMemo } from 'react';
import BlockWrap from './BlockWrap';
import HighlightCode from './HighlightCode';

import './index.less';

// Extract regex to avoid recompilation on each render
const LANGUAGE_REGEX = /language-(\w+)/;

// Helper function to extract string content from children, filtering out React elements
const extractStringContent = (children: React.ReactNode): string => {
  if (typeof children === 'string') {
    return children;
  }
  
  if (typeof children === 'number') {
    return String(children);
  }
  
  if (Array.isArray(children)) {
    return children
      .map(child => extractStringContent(child))
      .join('');
  }
  
  // If it's a React element (like cursor), return empty string
  if (React.isValidElement(children)) {
    return '';
  }
  
  // Fallback to string conversion
  return String(children || '');
};

// Helper function to check if element is a cursor placeholder from react-markdown-typer
const isCursorPlaceholder = (element: React.ReactElement): boolean => {
  const props = element.props as { 'data-cursor-placeholder'?: string };
  return props?.['data-cursor-placeholder'] === 'true';
};

// Helper function to extract cursor placeholder from children
const extractCursorPlaceholder = (children: React.ReactNode): React.ReactElement | null => {
  if (React.isValidElement(children)) {
    // Check if it's a cursor placeholder from react-markdown-typer
    if (isCursorPlaceholder(children)) {
      return children as React.ReactElement;
    }
    return null;
  }
  
  if (Array.isArray(children)) {
    // Find the first cursor placeholder in the array
    for (const child of children) {
      const cursor = extractCursorPlaceholder(child);
      if (cursor) {
        return cursor;
      }
    }
  }
  
  return null;
};

const CodeComponent: React.FC<{ className: string; children: React.ReactNode }> = ({ className, children = '' }) => {
  const match = useMemo(() => LANGUAGE_REGEX.exec(className || ''), [className]);
  const codeContent = useMemo(() => extractStringContent(children).replace(/\n$/, ''), [children]);
  const cursorPlaceholder = useMemo(() => extractCursorPlaceholder(children), [children]);
  
  // For inline code, also filter out React elements (like cursor) to avoid "object Object" issue
  const inlineCodeContent = useMemo(() => {
    if (typeof children === 'string') {
      return children;
    }
    return extractStringContent(children);
  }, [children]);

  if (match) {
    return (
      <BlockWrap language={match[1]} codeContent={codeContent}>
        <HighlightCode code={codeContent} language={match[1]} cursorPlaceholder={cursorPlaceholder} />
      </BlockWrap>
    );
  }

  return (
    <code className={className}>
      {inlineCodeContent}
      {cursorPlaceholder && cursorPlaceholder}
    </code>
  );
};

export default memo(CodeComponent);
