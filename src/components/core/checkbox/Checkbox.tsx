import React from 'react';
import { Check } from '../../icons';
import { CheckboxProps, useCheckbox } from './use-checkbox';

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const { isSelected, getInputProps, getBaseProps, getButtonProps } =
      useCheckbox(props);

    return (
      <label {...getBaseProps()}>
        <input ref={ref} {...getInputProps()} />
        <button type="button" {...getButtonProps()}>
          {isSelected && <Check className="w-4 text-white" />}
        </button>
      </label>
    );
  }
);

export default Checkbox;
