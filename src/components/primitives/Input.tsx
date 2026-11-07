import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  error?: boolean | string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      icon,
      iconPosition = 'left',
      error = false,
      fullWidth = true,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const hasError = Boolean(error);
    const widthStyle = fullWidth ? 'w-full' : '';

    const baseInputStyles =
      'min-h-[42px] rounded-md bg-[#121212] px-3.5 py-2 text-sm text-[#EDEDED] placeholder:text-[#707070] border border-white/10 transition-colors duration-150 focus:outline-none focus:border-[#3ECF8E]/60 focus-visible:ring-2 focus-visible:ring-[#3ECF8E]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212] focus-visible:border-[#3ECF8E]/60 disabled:cursor-not-allowed disabled:opacity-50 hover:border-white/20';

    const errorStyles = hasError
      ? 'border-red-500/60 focus:border-red-500 focus-visible:ring-red-500/30'
      : '';

    const iconPaddingStyles = icon
      ? iconPosition === 'left'
        ? 'pl-10 pr-3.5'
        : 'pl-3.5 pr-10'
      : '';

    return (
      <div className={cn('relative inline-flex items-center', widthStyle)}>
        {icon && iconPosition === 'left' && (
          <span className="pointer-events-none absolute left-3.5 flex items-center text-[#707070]">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          disabled={disabled}
          aria-invalid={hasError ? 'true' : undefined}
          className={cn(baseInputStyles, errorStyles, iconPaddingStyles, widthStyle, className)}
          {...props}
        />
        {icon && iconPosition === 'right' && (
          <span className="pointer-events-none absolute right-3.5 flex items-center text-[#707070]">
            {icon}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;

