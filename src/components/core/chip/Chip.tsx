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

const Chip: React.FC<ChipProps> = ({ children, color, classname, onClose }) => {
  return (
    <div
      className={cn(
        ' rounded-full px-3 text-sm flex items-center gap-2 h-fit',
        {
          'pr-0': onClose,
          'border border-foreground-dimmed/50': !color
        },
        classname
      )}
      {...(color && {
        style: {
          backgroundColor: color,
          color: isLight(color) ? '#000' : '#fff'
        }
      })}
    >
      {children}
      {onClose && (
        <Button
          variant="text"
          iconOnly
          startContent={<Close className="w-3" />}
          className="hover:bg-foreground-dimmed/20 rounded-full"
          onClick={onClose}
          {...(color && {
            style: {
              color: isLight(color) ? '#000' : '#fff'
            }
          })}
        ></Button>
      )}
    </div>
  );
};

export default Chip;
