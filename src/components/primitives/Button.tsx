import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'md' | 'lg' | 'sm';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  asAnchor?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'lg',
      fullWidth = false,
      icon,
      iconPosition = 'right',
      className = '',
      children,
      asAnchor = false,
      href,
      target,
      rel,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'group relative inline-flex select-none items-center justify-center gap-2.5 overflow-hidden rounded-control font-medium tracking-tight transition-[transform,background-color,border-color,box-shadow,color,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer active:translate-y-px motion-safe:active:scale-[0.97] active:duration-100 disabled:pointer-events-none disabled:opacity-50 disabled:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ECF8E]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212]';

    const sizeStyles = {
      sm: 'h-9 px-4 py-2 text-xs',
      md: 'min-h-[46px] px-6 py-3 text-sm',
      lg: 'min-h-[52px] px-7 py-3.5 text-[15px]',
    }[size];

    const variantStyles = {
      primary:
        'bg-accent hover:bg-accent-hover text-[#0E0F0E] font-semibold shadow-[0_0_0_1px_rgba(62,207,142,0.35),0_10px_28px_-10px_rgba(62,207,142,0.55),inset_0_1px_0_rgba(255,255,255,0.28)] hover:shadow-[0_0_0_1px_rgba(62,207,142,0.5),0_14px_34px_-10px_rgba(62,207,142,0.7),inset_0_1px_0_rgba(255,255,255,0.32)] hover:-translate-y-px',
      secondary:
        'border border-white/[0.08] hover:border-white/25 bg-white/[0.03] hover:bg-white/[0.06] text-[#EDEDED] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:-translate-y-px',
      ghost:
        'border border-transparent bg-transparent text-[#A0A0A0] hover:bg-white/[0.05] hover:text-[#EDEDED]',
    }[variant];

    const widthStyle = fullWidth ? 'w-full' : '';
    const combinedClassName = cn(baseStyles, sizeStyles, variantStyles, widthStyle, className);

    const content = (
      <>
        {icon && iconPosition === 'left' && (
          <span className="flex flex-shrink-0 items-center transition-transform duration-200 group-hover:-translate-x-0.5">
            {icon}
          </span>
        )}
        <span>{children}</span>
        {icon && iconPosition === 'right' && (
          <span className="flex flex-shrink-0 items-center transition-transform duration-200 group-hover:translate-x-0.5">
            {icon}
          </span>
        )}
      </>
    );

    if (asAnchor && href) {
      return (
        <a
          ref={ref as unknown as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
          className={combinedClassName}
        >
          {content}
        </a>
      );
    }

    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;