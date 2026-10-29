import React, { forwardRef } from 'react';

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
      'group relative inline-flex select-none items-center justify-center gap-2.5 overflow-hidden rounded-control font-bold tracking-tight ring-1 transition-[transform,background-color,border-color,box-shadow,color,opacity] duration-200 ease-out cursor-pointer active:translate-y-px active:scale-[0.98] active:duration-100 disabled:pointer-events-none disabled:opacity-50 disabled:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-1';

    const sizeStyles = {
      sm: 'min-h-[40px] px-4 py-2 text-xs',
      md: 'min-h-[48px] px-6 py-3 text-sm',
      lg: 'min-h-[52px] px-7 py-3.5 text-base',
    }[size];

    const variantStyles = {
      primary:
        'bg-accent hover:bg-accent-hover text-bg-1 ring-white/25 hover:ring-emerald-300/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_16px_36px_-12px_rgba(0,200,120,0.30)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_20px_40px_-10px_rgba(0,200,120,0.40)]',
      secondary:
        'border border-white/[0.08] bg-bg-2/40 text-text-1 ring-white/10 backdrop-blur-xl hover:border-emerald-500/40 hover:bg-bg-2/70 hover:ring-emerald-400/40',
      ghost:
        'border border-transparent bg-transparent text-text-2 ring-transparent hover:bg-white/[0.04] hover:text-text-1 hover:ring-white/10',
    }[variant];

    const widthStyle = fullWidth ? 'w-full' : '';
    const combinedClassName = `${baseStyles} ${sizeStyles} ${variantStyles} ${widthStyle} ${className}`.trim();

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
