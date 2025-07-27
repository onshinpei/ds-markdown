import React from 'react';
import Button from '../Button';

interface IconButtonProps {
  icon: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, style, className = '', onClick, ...restProps }) => {
  return <Button icon={icon} className={`ds-icon-button ${className}`} style={style} onClick={onClick} {...restProps} />;
};

export default IconButton;
