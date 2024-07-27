import { useCallback, useId, useMemo } from 'react';
import { cn, safeAriaLabel } from '../../../utils';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  isSelected?: boolean;
  icon?: React.ReactNode;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  onChange: (isSelected: boolean) => void;
}

export const useCheckbox = (props: CheckboxProps) => {
  const {
    isSelected,
    onChange,
    children,
    isReadOnly,
    isDisabled,
    ...otherProps
  } = props;

  const labelId = useId();

  const checkboxProps = useMemo(() => {
    return {
      'aria-label': safeAriaLabel(otherProps['aria-label'] || children),
      'aria-labelledby': otherProps['aria-labelledby'] || labelId
    };
  }, [otherProps['aria-label'], otherProps['aria-labelledby'], labelId]);

  const styles = cn(
    'duration-150 w-5 h-5 border border-foreground-dimmed/50 rounded overflow-hidden cursor-pointer flex items-center justify-center',
    { 'bg-black hover:bg-neutral-700': isSelected },
    { 'hover:bg-background-100': !isSelected },
    { 'pointer-events-none': isReadOnly || isDisabled },
    props.className
  );

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isReadOnly && isDisabled) {
        event.preventDefault();
        return;
      }
      onChange(!isSelected);
    },
    [onChange, isReadOnly, isDisabled, isSelected]
  );

  const getInputProps = useCallback(() => {
    return {
      id: labelId,
      hidden: true,
      type: 'checkbox',
      checked: isSelected,
      ...checkboxProps
    };
  }, [isSelected, checkboxProps, labelId]);

  const getBaseProps = useCallback(() => {
    return {
      htmlFor: labelId
    };
  }, [labelId]);

  const getButtonProps = useCallback(() => {
    return {
      className: styles,
      onClick: handleClick
    };
  }, [handleClick]);

  return {
    isSelected,
    checkboxProps,
    styles,
    getInputProps,
    getBaseProps,
    getButtonProps
  };
};
