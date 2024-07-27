import React, { useState } from 'react';
import { WithChildren } from '../../../utils';
import { Button } from '../button';
import { Close, Logo, Menu } from '../../icons';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeSwitch } from '../../theme';
import { Flex } from '../../layout';

interface NavbarProps extends WithChildren {}

export const NavbarMobile: React.FC<WithChildren> = ({ children }) => {
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

export const NavbarDesktop: React.FC<WithChildren> = ({ children }) => {
  return <div className="tb2:flex hidden">{children}</div>;
};

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  return (
    <Flex
      gap="md"
      className="justify-between p-3 tb2:px-6 bg-background dark:bg-background-200"
    >
      <Flex as="h1" gap="md">
        <Logo className="w-8 text-primary" />
        <span>PlanPal</span>
      </Flex>
      {children}
    </Flex>
  );
};

export default Navbar;
