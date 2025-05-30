import React from 'react';

interface BlockWrapProps {
  children: React.ReactNode;
  language: string;
}

const BlockWrap: React.FC<BlockWrapProps> = ({ children, language }) => {
  return (
    <div className="md-code-block md-code-block-light">
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
