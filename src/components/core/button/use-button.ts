import React from 'react';
import { cn } from '../../../utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  iconOnly?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'text';
}

export const useButton = (props: ButtonProps) => {
  const {
    variant = 'primary',
    children,
    iconOnly,
    className,
    startContent: startContentProp,
    endContent: endContentProp,
    ...buttonProps
  } = props;

  const getIconClone = (icon: React.ReactNode) =>
    React.isValidElement(icon)
      ? React.cloneElement(icon, {
          // @ts-ignore
          'aria-hidden': true,
          focusable: false,
          tabIndex: -1,
          className: cn('w-5', icon.props.className)
        })
      : null;

  const startContent = getIconClone(startContentProp);

  const endContent = getIconClone(endContentProp);

  const variants = {
    'border border-foreground-dimmed/20 tb2:hover:bg-foreground-dimmed/10':
      variant === 'secondary',
    'bg-danger/10 tb2:hover:bg-danger/20 text-danger': variant === 'danger',
    'bg-primary tb2:hover:bg-primary/90 text-white': variant === 'primary',
    'text-primary tb2:hover:underline': variant === 'text',
    'text-foreground tb2:hover:bg-foreground/10': variant === 'ghost'
  };

  const styles = cn(
    'p-2 tb2:p-1.5 rounded-md duration-150 flex items-center gap-1.5 w-fit active:scale-95 outline-none focus:outline-1 focus:outline-primary whitespace-nowrap',
    {
      ...variants,
      'px-4 tb2:px-4': !iconOnly && variant !== 'text',
      'pointer-events-none  text-foreground-dimmed': props.disabled,
      'bg-background-100': props.disabled && variant === 'primary'
    },
    className
  );

  return { startContent, endContent, children, styles, buttonProps };
};
