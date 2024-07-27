import React from 'react';
import { Button } from '../../core';
import { Chevron } from '../../icons';
import { cn } from '../../../utils';

interface PriorityPickerProps {
  priority: number;
  onChange: (priority: number) => void;
}

const PriorityPicker: React.FC<PriorityPickerProps> = ({
  priority,
  onChange
}) => {
  0;

  const handleClick = (priority: number) => {
    onChange(priority);
  };

  const buttonClasses = (value: number) => {
    return cn('h-2 w-full bg-success duration-150', {
      'h-4': priority === value,
      'bg-success': value === 0,
      'bg-warning': value === 1,
      'bg-danger': value === 2
    });
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="secondary"
        iconOnly
        startContent={<Chevron className="-rotate-90" />}
        onClick={() => onChange((priority - 1 + 3) % 3)}
      ></Button>

      <div className="w-full rounded-full flex items-center">
        {[0, 1, 2].map((value) => (
          <button
            key={value}
            className={buttonClasses(value)}
            onClick={() => handleClick(value)}
          ></button>
        ))}
      </div>

      <Button
        variant="secondary"
        iconOnly
        startContent={<Chevron className="rotate-90" />}
        onClick={() => onChange((priority + 1) % 3)}
      ></Button>
    </div>
  );
};

export default PriorityPicker;
