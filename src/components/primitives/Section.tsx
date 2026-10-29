import React, { forwardRef } from 'react';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  deep?: boolean; // true = --bg-0 (pinned scenes / footer), false = --bg-1
  borderTop?: boolean;
  borderBottom?: boolean;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      as: Component = 'section',
      deep = false,
      borderTop = true,
      borderBottom = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const bgClass = deep ? 'bg-bg-0' : 'bg-bg-1';
    const borderTopClass = borderTop ? 'border-t border-line' : '';
    const borderBottomClass = borderBottom ? 'border-b border-line' : '';

    return (
      <Component
        ref={ref}
        className={`relative py-[clamp(80px,10vw,140px)] ${bgClass} ${borderTopClass} ${borderBottomClass} ${className}`.trim()}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Section.displayName = 'Section';
export default Section;

