import React from 'react';

export interface SegmentedItem {
  label: string;
  value: string;
}

export interface SegmentedProps {
  Segmented: SegmentedItem[];
  value?: string;
  onChange?: (value: string) => void;
}

const Segmented: React.FC<SegmentedProps> = ({ Segmented: segments, value, onChange }) => {
  const handleClick = (itemValue: string) => {
    onChange?.(itemValue);
  };

  return (
    <div className="ds-segmented-container">
      {segments.map((item) => (
        <div key={item.value} className={`ds-segmented-item ${value === item.value ? 'active' : ''}`} onClick={() => handleClick(item.value)}>
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default Segmented;
