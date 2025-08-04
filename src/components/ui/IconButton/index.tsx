import React from 'react';
import Button from '../Button';
import type { ButtonProps } from '../Button';

interface IconButtonProps extends ButtonProps {
  icon: React.ReactNode;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, className = '', ...restProps }) => {
  return <Button icon={icon} className={`ds-icon-button ${className}`} {...restProps} />;
};

export default IconButton;
