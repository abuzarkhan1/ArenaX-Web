import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'base' | 'highlighted';
  /** Adds the upward lift on hover. Defaults to true. */
  interactive?: boolean;
  as?: React.ElementType;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'base',
      interactive = true,
      as: Component = 'div',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const isHighlighted = variant === 'highlighted';

    const baseClass =
      'group relative overflow-hidden rounded-card p-6 sm:p-8 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]';
    const variantClass = isHighlighted ? 'hud-card-highlight' : 'hud-card';
    const interactiveClass = interactive ? 'hover:-translate-y-1' : '';

    return (
      <Component
        ref={ref}
        className={cn(baseClass, variantClass, interactiveClass, className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';
export default Card;