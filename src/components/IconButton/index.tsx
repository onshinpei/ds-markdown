import React from 'react';
import { Button } from 'ds-markdown';

interface IconButtonProps {
  icon: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, style, className = '', onClick }) => {
  return <Button icon={icon} className={`ds-icon-button ${className}`} style={style} onClick={onClick} />;
};

export default IconButton;
