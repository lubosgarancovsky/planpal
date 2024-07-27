import React, { useEffect, useState } from 'react';
import { Check, Close, Pencil } from '../../icons';
import { cn } from '../../../utils';
import { Button } from '../button';

interface EditableProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  children: string;
  onSave: (value: string) => void;
}

const Editable: React.FC<EditableProps> = ({
  as,
  children,
  className,
  onSave,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState(children);

  useEffect(() => {
    setValue(children);
  }, [children]);

  const Component = as || 'p';

  return (
    <>
      {isActive ? (
        <div>
          <textarea
            className="w-full p-1.5 border border-background-100 rounded"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="flex gap-1.5 items-center mt-2">
            <Button
              onClick={() => {
                setIsActive((p) => !p);
                onSave(value);
              }}
            >
              Save
            </Button>
            <Button
              onClick={() => {
                setIsActive((p) => !p);
                setValue(children);
              }}
              variant="danger"
            >
              Close
            </Button>
          </div>
        </div>
      ) : (
        <Component
          className={cn('flex gap-2 relative', className)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          {...props}
        >
          {children}
          {isHovered && (
            <Button
              className="absolute top-0 right-0"
              onClick={() => setIsActive((p) => !p)}
              endContent={<Pencil />}
              variant="text"
            >
              <span className="text-base font-normal">Edit</span>
            </Button>
          )}
        </Component>
      )}
    </>
  );
};

export default Editable;
