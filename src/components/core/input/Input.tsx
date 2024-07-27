import React from 'react';
import { cn } from '../../../utils';

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  variant?: 'outlined' | 'filled';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'outlined', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'rounded-md p-2 bg-background outline-none focus:outline-1 focus:outline-primary',
          {
            'border border-foreground-dimmed/30 ': variant === 'outlined',
            'bg-background-100': variant === 'filled'
          },
          className
        )}
        {...props}
      />
    );
  }
);

export default Input;
