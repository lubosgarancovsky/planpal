import { AnimatePresence, motion } from 'framer-motion';
import { useRef } from 'react';
import { useDialog } from '../../../context/dialog-context';
import { useClickOutside } from '../../../hooks';
import { Close } from '../../icons';
import { Button } from '../button';
import { WithChildren } from '../../../utils';

interface DialogContentProps extends WithChildren {}

const DialogContent: React.FC<DialogContentProps> = ({ children }) => {
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

export default DialogContent;
