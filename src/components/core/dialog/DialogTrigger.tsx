import React, { useCallback } from 'react';
import { useDialog } from '../../../context/dialog-context';

interface DialogTriggerProps {
  children: React.ReactElement<{ onClick?: () => void }>;
}

const DialogTrigger: React.FC<DialogTriggerProps> = ({ children }) => {
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

export default DialogTrigger;
