import React from 'react';
import { DialogProvider } from '../../providers';
import { WithChildren } from '../../../utils';

interface DialogProps extends WithChildren {
  isOpen?: boolean;
  onClose?: () => void;
}

const Dialog: React.FC<DialogProps> = ({ children, ...props }) => {
  return <DialogProvider {...props}>{children}</DialogProvider>;
};

export default Dialog;
