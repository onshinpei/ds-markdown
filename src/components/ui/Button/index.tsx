import classNames from 'classnames';
import React from 'react';

interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ className = '', children, icon, onClick, style, disabled = false, ...restProps }) => {
  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.();
  };

  return (
    <div
      role="button"
      className={classNames({
        'ds-button': true,
        'ds-button__disabled': disabled,
        [className]: !!className,
      })}
      onClick={handleClick}
      style={style}
      aria-disabled={disabled}
      {...restProps}
    >
      {icon && <div className="ds-button__icon">{icon}</div>}
      {children}
    </div>
  );
};

export default Button;
