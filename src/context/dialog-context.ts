import { createContext, useContext } from 'react';

interface DialogContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
}

export const DialogContext = createContext<DialogContextType | null>(null);

export const useDialog = () => {
  const ctx = useContext(DialogContext);

  if (!ctx) {
    throw new Error('useDialog must be used within a DialogProvider');
  }

  return ctx;
};
