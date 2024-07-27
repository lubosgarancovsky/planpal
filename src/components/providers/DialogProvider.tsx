import React, { useEffect, useState } from 'react';
import { DialogContext } from '../../context/dialog-context';

interface DialogContextProviderProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

const DialogContextProvider: React.FC<DialogContextProviderProps> = ({
  children,
  ...props
}) => {
  const { isOpen: isOpenProp, onClose } = props;
  const [isOpen, setIsOpen] = useState<boolean>(!!isOpenProp);

  useEffect(() => {
    setIsOpen(!!isOpenProp);
  }, [isOpenProp]);

  return (
    <DialogContext.Provider value={{ isOpen, setIsOpen, onClose }}>
      {children}
    </DialogContext.Provider>
  );
};

export default DialogContextProvider;
