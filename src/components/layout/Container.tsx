import React from 'react';
import Flex from './Flex';

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
    <Flex flex="col" gap="md" className={className}>
      {heading}
      {children}
    </Flex>
  );
};

export default Container;
