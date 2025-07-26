import React from 'react';

interface ConfigSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const ConfigSection: React.FC<ConfigSectionProps> = ({ title, children, className = '', style }) => {
  return (
    <div className={className} style={style}>
      <h5 className="sectionSubTitle">{title}</h5>
      {children}
    </div>
  );
};

export default ConfigSection;
