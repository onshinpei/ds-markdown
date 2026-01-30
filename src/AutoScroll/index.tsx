import React from 'react';

interface AutoScrollProps {
  children: React.ReactNode;
}

const AutoScroll: React.FC<AutoScrollProps> = ({ children }) => {
  return <div className="ds-markdown_auto_scroll">{children}</div>;
};

export default AutoScroll;
