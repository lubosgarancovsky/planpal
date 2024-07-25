import React from 'react';

interface ChipProps {
  children: React.ReactNode;
}

const Chip: React.FC<ChipProps> = ({ children }) => {
  return (
    <div className="border border-foreground-dimmed/50 rounded-full px-3 text-sm">
      {children}
    </div>
  );
};

export default Chip;
