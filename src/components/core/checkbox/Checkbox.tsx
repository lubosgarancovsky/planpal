import React, { useEffect, useState } from 'react';
import { cn } from '../../../utils';

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange: (isChecked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ onChange, ...props }, ref) => {
    const [isChecked, setIsChecked] = useState<boolean>(props.checked ?? false);

    // useEffect(() => {
    //   if (onChange) onChange(isChecked);
    // }, [isChecked]);

    return (
      <div>
        <input
          type="checkbox"
          hidden={true}
          checked={isChecked}
          {...props}
          ref={ref}
          onChange={() => onChange(!isChecked)}
        />
        <button
          className={cn(
            'duration-150 cursor-help w-5 h-5 border border-foreground-dimmed/50 rounded overflow-hidden cursor-pointer',
            { 'bg-blue-500': isChecked },
            { 'hover:bg-background-100': !isChecked },
            props.className
          )}
          onClick={() => onChange(!isChecked)}
        ></button>
      </div>
    );
  }
);

export default Checkbox;
