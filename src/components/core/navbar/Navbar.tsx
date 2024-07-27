import React, { useState } from 'react';
import { cn } from '../../../utils';
import { Button } from '../button';
import { Close, Logo, Menu } from '../../icons';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeSwitch } from '../../theme';

interface NavbarProps {
  children?: React.ReactNode;
}

export const NavbarMobile = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex tb2:hidden">
      <ThemeSwitch />
      <Button
        variant="ghost"
        iconOnly
        startContent={<Menu className="w-6" />}
        className="ml-auto"
        onClick={() => setIsOpen(true)}
      />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
            animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
            exit={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
            className="fixed top-0 left-0 w-screen h-screen bg-background backdrop-blur-sm z-50"
          >
            <div>
              <div className="p-4 flex justify-end">
                <Button
                  iconOnly
                  startContent={<Close />}
                  variant="ghost"
                  onClick={() => setIsOpen(false)}
                ></Button>
              </div>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const NavbarDesktop = ({ children }) => {
  return <div className="tb2:flex hidden">{children}</div>;
};

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  const classNames = cn(
    'flex gap-3 items-center justify-between p-3 tb2:px-6 bg-background-200'
  );
  return (
    <div className={classNames}>
      <h1 className="flex gap-3 items-center">
        <Logo className="w-8 text-primary" />
        PlanPal
      </h1>
      {children}
    </div>
  );
};

export default Navbar;
