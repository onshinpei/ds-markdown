import React from 'react';

interface ConfigItemProps {
  label: string;
  children: React.ReactNode;
}

const ConfigItem: React.FC<ConfigItemProps> = ({ label, children }) => {
  return (
    <div className="select-wrapper">
      <label className="select-label">{label}:</label>
      {children}
    </div>
  );
};

export default ConfigItem;
