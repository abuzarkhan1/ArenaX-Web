import React, { forwardRef } from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ as: Component = 'div', className = '', children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={`max-w-[1200px] mx-auto px-6 w-full ${className}`.trim()}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = 'Container';
export default Container;

