import React from 'react';
import ApiDocumentation from '../../components/ApiDocumentation';

import FloatingToc from '../../components/FloatingToc';
import './index.css';

const Docs: React.FC = () => (
  <div id="docs-page">
    <div id="examples-page">
      <div className="main-nav">
        <FloatingToc />
      </div>
      <div className="main-content">
        <div className="container">
          <ApiDocumentation />
        </div>
      </div>
    </div>
  </div>
);

export default Docs;
