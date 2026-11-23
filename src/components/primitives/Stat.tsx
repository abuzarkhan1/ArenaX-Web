import React, { forwardRef } from 'react';

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  value: React.ReactNode;
  label: string;
  accent?: boolean;
}

export const Stat = forwardRef<HTMLDivElement, StatProps>(
  ({ value, label, accent = false, className = '', ...props }, ref) => {
    return (
      <div ref={ref} className={`flex flex-col ${className}`.trim()} {...props}>
        <div className={`stat-figure ${accent ? 'gradient-text' : 'text-text-1'}`}>
          {value}
        </div>
        <span className="mt-2.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-text-3">
          {label}
        </span>
      </div>
    );
  }
);

Stat.displayName = 'Stat';
export default Stat;