import React, { useState } from 'react';
import { Chevron } from '../../icons';
import { cn } from '../../../utils';
import { Flex } from '../../layout';

interface CollapsibleProps {
  label: string;
  children: React.ReactNode;
  initiallyOpen?: boolean;
  badge?: string | number;
}

const Collapsible: React.FC<CollapsibleProps> = ({
  label,
  children,
  initiallyOpen,
  badge
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(!!initiallyOpen);

  return (
    <div>
      <Flex>
        <button
          onClick={() => setIsOpen((p) => !p)}
          className="p-0.5 hover:bg-foreground-dimmed/10 rounded duration-150 opacity-50"
        >
          <Chevron
            className={cn('w-6 duration-150', { 'rotate-180': !isOpen })}
          />
        </button>
        <div className="flex items-center gap-1.5">
          <h4>{label}</h4>
          {!!badge && (
            <div className="text-sm bg-background-100 rounded-full px-1.5">
              {badge}
            </div>
          )}
        </div>
        <hr className="tb2:hidden w-full border-foreground-dimmed/20 mx-4" />
      </Flex>
      {isOpen && <div className="px-2 tb2:px-4 py-2">{children}</div>}
    </div>
  );
};

export default Collapsible;
