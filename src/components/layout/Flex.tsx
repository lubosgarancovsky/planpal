import React from 'react';
import { cn } from '../../utils';

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  flex?: 'row' | 'col';
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  wrap?: true;
  as?: React.ElementType;
}

const Flex: React.FC<FlexProps> = ({
  children,
  className,
  as,
  flex = 'row',
  gap = 'sm',
  wrap = false
}) => {
  const classes = cn(
    'flex gap-3',
    {
      'items-center flex-row': flex === 'row',
      'flex-col': flex === 'col',
      'gap-0': gap === 'none',
      'gap-1.5': gap === 'sm',
      'gap-3': gap === 'md',
      'gap-6': gap === 'lg',
      'gap-12': gap === 'xl',
      'flex-wrap': wrap
    },
    className
  );

  const Component = as || 'div';

  return <Component className={classes}>{children}</Component>;
};

export default Flex;
