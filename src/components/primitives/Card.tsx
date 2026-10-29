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

    const baseClass =
      'group relative overflow-hidden rounded-card p-6 sm:p-8 transition-all duration-300 ease-out shadow-broadcast backdrop-blur-xl';
    const variantClass = isHighlighted
      ? 'border border-emerald-500/35 border-t-emerald-400/50 bg-bg-2/60 hover:border-emerald-400/60 hover:shadow-lift-strong'
      : 'border border-white/[0.08] border-t-white/[0.12] bg-bg-2/50 hover:border-emerald-500/40 hover:shadow-lift';
    const interactiveClass = interactive
      ? 'hover:-translate-y-1'
      : '';

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
