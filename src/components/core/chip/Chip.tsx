import React from 'react';
import { Close } from '../../icons';
import { cn, isLight } from '../../../utils';
import { Button } from '..';

interface ChipProps {
  children: React.ReactNode;
  color?: string;
  onClose?: () => void;
  classname?: string;
}

const Chip: React.FC<ChipProps> = ({
  children,
  color: backgroundColor,
  classname,
  onClose
}) => {
  const chipClasses = cn(
    ' rounded-full px-3 text-sm flex items-center gap-2 h-fit',
    {
      'pr-0': !!onClose,
      'border border-foreground-dimmed/50': !backgroundColor
    },
    classname
  );

  const color = backgroundColor
    ? isLight(backgroundColor)
      ? '#000'
      : '#fff'
    : undefined;

  const getStyleProp = (bg?: string) => {
    if (color) {
      return {
        style: {
          backgroundColor: bg,
          color
        }
      };
    }
  };

  return (
    <div className={chipClasses} {...getStyleProp(backgroundColor)}>
      {children}
      {!!onClose && (
        <Button
          variant="text"
          iconOnly
          startContent={<Close className="w-3" />}
          className="hover:bg-foreground-dimmed/20 rounded-full"
          onClick={onClose}
          {...getStyleProp()}
        />
      )}
    </div>
  );
};

export default Chip;
