import React, { useState } from 'react';
import { Chevron } from '../../icons';
import { cn } from '../../../utils';

interface CollapsibleProps {
  label: string;
  children: React.ReactNode;
  initiallyOpen?: boolean;
  badge?: string;
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
      <div className="flex gap-1.5 items-center text-foreground-highlight">
        <button
          onClick={() => setIsOpen((p) => !p)}
          className="p-0.5 hover:bg-foreground-highlight/10 rounded duration-150"
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
      </div>
      {isOpen && <div className="px-8">{children}</div>}
    </div>
  );
};

export default Collapsible;
