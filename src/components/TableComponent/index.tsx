import React from 'react';

import './index.less';

interface TableComponentProps {
  children: React.ReactNode;
}

const TableComponent: React.FC<TableComponentProps> = ({ children }) => {
  return (
    <div className="markdown-table-wrapper">
      <table className="ds-markdown-table">{children}</table>
    </div>
  );
};

export default TableComponent;
