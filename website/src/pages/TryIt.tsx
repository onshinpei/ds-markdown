import React, { useState } from 'react';
import { Markdown } from 'ds-markdown';
import './TryIt.css';

const defaultMarkdown = `# 试试 Markdown\n\n- 支持 **加粗**\n- 支持公式 $E=mc^2$\n`;

const TryIt: React.FC = () => {
  const [markdown, setMarkdown] = useState(defaultMarkdown);

  return (
    <div className="try-it-container">
      <textarea value={markdown} onChange={(e) => setMarkdown(e.target.value)} className="markdown-editor" />
      <div className="markdown-preview">
        <Markdown interval={0}>{markdown}</Markdown>
      </div>
    </div>
  );
};

export default TryIt;
