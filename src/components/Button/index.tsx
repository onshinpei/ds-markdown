import classNames from 'classnames';
import React from 'react';

interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({ className = '', children, icon, onClick, style }) => {
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

export default Button;
