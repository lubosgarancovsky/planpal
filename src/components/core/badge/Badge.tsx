import React from 'react';
import { cn, WithChildren } from '../../../utils';

interface BadgeProps extends WithChildren {
  className?: string;
  icon?: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ className, icon, children }) => {
  return (
    <div
      className={cn(
        'flex items-center text-sm gap-2 text-foreground-dimmed',
        className
      )}
    >
      {icon && React.isValidElement(icon) && (
        <span>
          {React.cloneElement(icon, {
            // @ts-ignore
            'aria-hidden': true,
            focusable: false,
            tabIndex: -1,
            className: cn('w-4', icon.props.className)
          })}
        </span>
      )}
      {children}
    </div>
  );
};

export default Badge;
