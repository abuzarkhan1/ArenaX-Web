import React, { forwardRef } from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'base' | 'highlighted';
  as?: React.ElementType;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'base', as: Component = 'div', className = '', children, ...props }, ref) => {
    const isHighlighted = variant === 'highlighted';

    const baseClass =
      'rounded-card p-6 sm:p-8 relative overflow-hidden transition-all duration-300 shadow-broadcast';
    const variantClass = isHighlighted
      ? 'bg-bg-2 border border-line-accent border-t-[rgba(0,200,120,0.50)]'
      : 'bg-bg-2 border border-line border-t-[rgba(255,255,255,0.10)] hover:border-line-strong';

    return (
      <Component ref={ref} className={`${baseClass} ${variantClass} ${className}`.trim()} {...props}>
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';
export default Card;

