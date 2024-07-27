import { useEffect, useState } from 'react';

export interface EditableProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  children: string;
  onSave: (value: string) => void;
}

export const useEditable = (props: EditableProps) => {
  const { as, children, onSave, className, ...otherProps } = props;

  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState(children);

  // Sync internal state with props
  useEffect(() => {
    setValue(children);
  }, [children]);

  const Component = as || 'p';

  return {
    Component,
    value,
    setValue,
    isActive,
    setIsActive,
    children,
    className,
    onSave,
    otherProps
  };
};
