import React from 'react';

interface StatusCardProps {
  title: string;
  children: React.ReactNode;
  theme: 'light' | 'dark';
}

const StatusCard: React.FC<StatusCardProps> = ({ title, children, theme }) => {
  return (
    <div className={`statusCard${theme === 'dark' ? ' statusCardDark' : ''}`}>
      <h5 className="statusCardTitle">{title}</h5>
      <div className="text-muted" style={{ fontSize: 12, lineHeight: 1.5 }}>
        {children}
      </div>
    </div>
  );
};

export default StatusCard;
