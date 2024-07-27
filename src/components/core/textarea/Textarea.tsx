import React from 'react';
import { cn } from '../../../utils';

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'outlined' | 'filled';
}

const Input = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, variant = 'outlined', ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'rounded-md p-2 bg-background outline-none focus:outline-1 focus:outline-primary w-full',
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
