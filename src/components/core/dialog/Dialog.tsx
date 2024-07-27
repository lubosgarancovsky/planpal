import React, { useCallback, useRef } from 'react';
import { useDialog } from '../../../context/dialog-context';
import { DialogProvider } from '../../providers';
import { Close } from '../../icons';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '../button';
import { useClickOutside } from '../../../hooks';

interface DialogProps {}

interface DialogTriggerProps {
  children: React.ReactElement<{ onClick?: () => void }>;
}

interface DialogBodyProps {
  children: React.ReactNode;
}

interface DialogContentProps {
  children: React.ReactNode;
}

interface DialogHeaderProps {
  title: string;
  children?: React.ReactNode;
}

interface DialogProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

export const DialogTrigger: React.FC<DialogTriggerProps> = ({ children }) => {
  const { setIsOpen } = useDialog();

  const handleClick = useCallback(() => {
    if (children.props.onClick) {
      children.props.onClick();
    }

    setIsOpen((p) => !p);
  }, [children.props, setIsOpen]);

  if (!React.isValidElement(children)) {
    console.warn(
      'Child provided to DialogTrigger component is not a valid React element'
    );
    return null;
  }

  return React.cloneElement(children, {
    onClick: handleClick
  });
};

export const DialogHeader: React.FC<DialogHeaderProps> = ({
  title,
  children
}) => {
  return (
    <div>
      <h2>{title}</h2>
      {children && <p className="text-foreground-dimmed">{children}</p>}
    </div>
  );
};

export const DialogBody: React.FC<DialogBodyProps> = ({ children }) => {
  return <div>{children}</div>;
};

export const DialogContent: React.FC<DialogContentProps> = ({ children }) => {
  const { isOpen, setIsOpen } = useDialog();

  const ref = useRef(null);

  useClickOutside(() => {
    setIsOpen(false);
  }, ref);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed left-0 top-0 w-full h-full bg-black/60 backdrop-blur-sm p-6 flex items-center justify-center z-50"
        >
          <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.75, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.75, y: 100 }}
            role="dialog"
            aria-modal="true"
            className="bg-background p-4 tb2:p-4 rounded-xl tb2:min-w-[42rem] flex flex-col gap-4 relative border border-foreground-dimmed/20"
          >
            {children}
            <Button
              className="rounded-full w-fit absolute top-3 right-3 p-1.5"
              iconOnly
              startContent={<Close className="w-4 text-foreground-dimmed" />}
              variant="ghost"
              onClick={() => setIsOpen(false)}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Dialog: React.FC<DialogProps> = ({ children, ...props }) => {
  return <DialogProvider {...props}>{children}</DialogProvider>;
};

export default Dialog;
