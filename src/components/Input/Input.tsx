
import { forwardRef } from 'react';

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    error?: boolean;
  }
>(({ children, className, error = false, ...other }, ref) => <input ref={ref} {...other} />);
