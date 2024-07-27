import React from 'react';
import { Button } from '../../core';
import { Chevron } from '../../icons';
import { cn } from '../../../utils';
import { Flex } from '../../layout';

interface PriorityPickerProps {
  priority: number;
  onChange: (priority: number) => void;
}

const PriorityPicker: React.FC<PriorityPickerProps> = ({
  priority,
  onChange
}) => {
  0;

  const buttonClasses = (value: number) => {
    return cn('h-2 w-full bg-success duration-150', {
      'h-4': priority === value,
      'bg-success': value === 0,
      'bg-warning': value === 1,
      'bg-danger': value === 2
    });
  };

  return (
    <Flex gap="md">
      <Button
        variant="secondary"
        iconOnly
        startContent={<Chevron className="-rotate-90" />}
        onClick={() => onChange((priority - 1 + 3) % 3)}
      />

      <Flex className="w-full">
        {[0, 1, 2].map((value) => (
          <button
            key={value}
            className={buttonClasses(value)}
            onClick={() => onChange(value)}
          />
        ))}
      </Flex>

      <Button
        variant="secondary"
        iconOnly
        startContent={<Chevron className="rotate-90" />}
        onClick={() => onChange((priority + 1) % 3)}
      />
    </Flex>
  );
};

export default PriorityPicker;
