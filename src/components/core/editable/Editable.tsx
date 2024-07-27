import React from 'react';
import { Pencil, Save, Trash } from '../../icons';
import { cn } from '../../../utils';
import { Button } from '../button';
import { Textarea } from '../textarea';
import { useEditable } from './use-editable';

interface EditableProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  children: string;
  onSave: (value: string) => void;
}

const Editable: React.FC<EditableProps> = ({ ...props }) => {
  const {
    Component,
    children,
    isActive,
    value,
    setValue,
    setIsActive,
    isHovered,
    setIsHovered,
    onSave,
    className,
    ...otherProps
  } = useEditable(props);

  return (
    <>
      {isActive ? (
        <div>
          <Textarea value={value} onChange={(e) => setValue(e.target.value)} />
          <div className="flex gap-1.5 items-center mt-2 justify-end">
            <Button
              onClick={() => {
                setIsActive((p) => !p);
                onSave(value);
              }}
              iconOnly
              startContent={<Save />}
            />

            <Button
              onClick={() => {
                setIsActive((p) => !p);
                setValue(children);
              }}
              iconOnly
              variant="secondary"
              startContent={<Trash />}
            />
          </div>
        </div>
      ) : (
        <Component
          className={cn('flex gap-2 relative', className)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          {...otherProps}
        >
          {children}
          {isHovered && (
            <Button
              className="absolute top-0 right-0 bg-background text-base font-normal"
              onClick={() => setIsActive((p) => !p)}
              endContent={<Pencil />}
              variant="text"
            >
              Edit
            </Button>
          )}
        </Component>
      )}
    </>
  );
};

export default Editable;
