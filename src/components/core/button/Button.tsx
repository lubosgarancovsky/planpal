import React from 'react';
import { ButtonProps, useButton } from './use-button';

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { startContent, endContent, children, styles, buttonProps } =
      useButton(props);

    return (
      <button ref={ref} className={styles} {...buttonProps}>
        {startContent}
        {children}
        {endContent}
      </button>
    );
  }
);

export default Button;
