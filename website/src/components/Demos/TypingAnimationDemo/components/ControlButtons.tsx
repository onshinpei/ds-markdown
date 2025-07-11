import React from 'react';

interface ControlButtonsProps {
  isStarted: boolean;
  isTyping: boolean;
  isStopped: boolean;
  onStart: () => void;
  onStop: () => void;
  onResume: () => void;
  t: (key: string) => string;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({ isStarted, isTyping, isStopped, onStart, onStop, onResume, t }) => {
  return (
    <div style={{ marginBottom: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <button className="btn btn-success" onClick={onStart} disabled={isStopped}>
        {isStarted ? t('restart') : t('startDemo')}
      </button>
      <button className="btn btn-danger" onClick={onStop} disabled={!isTyping || isStopped}>
        {t('stop')}
      </button>
      <button className="btn btn-warning" onClick={onResume} disabled={!isStopped}>
        {t('continue')}
      </button>
    </div>
  );
};

export default ControlButtons;
