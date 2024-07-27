import React from 'react';
import { cn } from '../../utils';

interface ContainerProps {
  children: React.ReactNode;
  heading?: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({
  heading,
  children,
  className
}) => {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {heading}
      {children}
    </div>
  );
};

export default Container;
