import React, { forwardRef } from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'base' | 'highlighted';
  /** Adds the tournament-card upward lift on hover. Defaults to true. */
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

    const baseClass = 'group relative overflow-hidden p-6 sm:p-8';
    const variantClass = isHighlighted ? 'hud-card-highlight' : 'hud-card';
    const interactiveClass = interactive ? 'hover:-translate-y-1' : '';

    return (
      <Component
        ref={ref}
        className={`${baseClass} ${variantClass} ${interactiveClass} ${className}`.trim()}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';
export default Card;
