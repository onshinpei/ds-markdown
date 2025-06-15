import React from 'react';
import { Theme } from '../../defined.js';

interface BlockWrapProps {
  children: React.ReactNode;
  language: string;
  theme?: Theme;
}

const BlockWrap: React.FC<BlockWrapProps> = ({ children, language, theme = 'light' }) => {
  return (
    <div className={`md-code-block md-code-block-${theme}`}>
      <div className="md-code-block-banner-wrap">
        <div className="md-code-block-banner md-code-block-banner-lite">
          <div className="md-code-block-banner-content">
            <div className="md-code-block-language">{language}</div>
            {/* <div className="md-code-block-copy">复制</div> */}
          </div>
        </div>
      </div>
      <div className="md-code-block-content">{children}</div>
    </div>
  );
};

export default BlockWrap;
