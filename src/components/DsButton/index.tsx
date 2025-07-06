import classNames from 'classnames';
import React from 'react';

interface DsButtonProps {
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const DsButton: React.FC<DsButtonProps> = ({ className = '', children, icon, onClick, style }) => {
  return (
    <div
      role="button"
      className={classNames({
        'ds-button': true,
        [className]: !!className,
      })}
      onClick={onClick}
      style={style}
    >
      {icon && <div className="ds-button__icon">{icon}</div>}
      {children}
    </div>
  );
};

export default DsButton;
