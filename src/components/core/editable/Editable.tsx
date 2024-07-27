import React from 'react';
import { Save } from '../../icons';
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
    onSave,
    className,
    ...otherProps
  } = useEditable(props);

  return (
    <>
      {isActive ? (
        <div>
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={8}
          />
          <div className="flex gap-1.5 items-center mt-2 justify-end">
            <Button
              onClick={() => {
                setIsActive((p) => !p);
                onSave(value);
              }}
              startContent={<Save />}
            >
              Save
            </Button>

            <Button
              onClick={() => {
                setIsActive((p) => !p);
                setValue(children);
              }}
              variant="secondary"
            >
              Back
            </Button>
          </div>
        </div>
      ) : (
        <Component
          className={cn(
            'flex gap-2 relative hover:ring-1 hover:ring-primary rounded-sm hover:ring-offset-8 ring-offset-background ring-0 duration-150',
            className
          )}
          onDoubleClick={() => setIsActive((p) => !p)}
          {...otherProps}
        >
          {children}
        </Component>
      )}
    </>
  );
};

export default Editable;
