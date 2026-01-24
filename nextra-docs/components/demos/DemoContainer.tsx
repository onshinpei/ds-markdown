import React, { ReactNode } from 'react';

interface DemoContainerProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

/**
 * 通用的 Demo 容器组件
 * 为所有演示提供统一的外观和布局
 */
export const DemoContainer: React.FC<DemoContainerProps> = ({ 
  children, 
  title, 
  description 
}) => {
  return (
    <div className="demo-container">
      {title && <h3 className="demo-title">{title}</h3>}
      {description && <p className="demo-description">{description}</p>}
      <div className="demo-content">
        {children}
      </div>
    </div>
  );
};

export default DemoContainer;

