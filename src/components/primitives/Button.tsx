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
      'inline-flex items-center justify-center font-bold tracking-tight select-none transition-all duration-200 cursor-pointer active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 rounded-control gap-2.5';

    const sizeStyles = {
      sm: 'min-h-[40px] px-4 py-2 text-xs',
      md: 'min-h-[48px] px-6 py-3 text-sm',
      lg: 'min-h-[52px] px-7 py-3.5 text-base',
    }[size];

    const variantStyles = {
      primary:
        'bg-accent hover:bg-accent-hover text-bg-1 shadow-[0_16px_36px_-12px_rgba(0,200,120,0.3)] hover:shadow-[0_20px_40px_-10px_rgba(0,200,120,0.4)]',
      secondary:
        'bg-transparent border border-line-strong hover:bg-bg-3 text-text-1 hover:border-white/25',
      ghost:
        'bg-transparent hover:bg-bg-3 text-text-2 hover:text-text-1 border border-transparent',
    }[variant];

    const widthStyle = fullWidth ? 'w-full' : '';
    const combinedClassName = `${baseStyles} ${sizeStyles} ${variantStyles} ${widthStyle} ${className}`.trim();

    const content = (
      <>
        {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
        <span>{children}</span>
        {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
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

