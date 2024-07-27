import React, { useState } from 'react';
import { cn } from '../../../utils';

interface ColorPickerProps {
  fn: (hex: string) => void;
}

interface ColorPickerButtonProps {
  hex: string;
  isActive: boolean;
  onClick: () => void;
}

const ColorPickerButton: React.FC<ColorPickerButtonProps> = ({
  hex,
  isActive,
  onClick
}) => {
  return (
    <button
      className={cn('aspect-square rounded active:scale-90 duration-150', {
        'border-2 border-black': isActive
      })}
      style={{
        backgroundColor: hex
      }}
      onClick={onClick}
    ></button>
  );
};

const ColorPicker: React.FC<ColorPickerProps> = ({ fn }) => {
  const [current, setCurrent] = useState<string | null>('#E57373');

  const colors = [
    '#E57373', // Light Red
    '#F06292', // Light Pink
    '#BA68C8', // Light Purple
    '#9575CD', // Light Deep Purple
    '#64B5F6', // Light Blue
    '#4FC3F7', // Light Sky Blue
    '#4DD0E1', // Light Cyan
    '#4DB6AC', // Light Teal
    '#81C784', // Light Green
    '#AED581', // Light Lime Green
    '#FFD54F', // Light Yellow
    '#FFB74D', // Light Orange,
    '#9e9e9e', // Light Grey,
    '#595959', // Dark Grey,
    '#000000' // Black,
  ];

  const isActive = (hex: string) => {
    return current === hex;
  };

  return (
    <div className="grid grid-cols-6 grid-rows-3 gap-2">
      {colors.map((hex, index) => (
        <ColorPickerButton
          hex={hex}
          isActive={isActive(hex)}
          onClick={() => {
            setCurrent(hex);
            fn(hex);
          }}
          key={index}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
