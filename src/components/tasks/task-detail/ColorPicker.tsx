import React, { useState } from 'react';
import { cn, colors } from '../../../utils';

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
}) => (
  <button
    className={cn('aspect-square rounded active:scale-90 duration-150', {
      'rounded-xl': isActive
    })}
    style={{
      backgroundColor: hex
    }}
    onClick={onClick}
  />
);
const ColorPicker: React.FC<ColorPickerProps> = ({ fn }) => {
  const [current, setCurrent] = useState<string | null>('#E57373');

  return (
    <div className="grid grid-cols-6 grid-rows-3 gap-2">
      {colors.map((hex, index) => (
        <ColorPickerButton
          hex={hex}
          isActive={current === hex}
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
