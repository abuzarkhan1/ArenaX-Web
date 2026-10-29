import React from 'react';

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  value: React.ReactNode;
  label: string;
  subtext?: string;
  accent?: boolean;
}

export const Stat: React.FC<StatProps> = ({
  value,
  label,
  subtext,
  accent = false,
  className = '',
  ...props
}) => {
  return (
    <div className={`flex flex-col ${className}`.trim()} {...props}>
      <div
        className={`font-heading text-3xl font-extrabold leading-none tracking-tight tabular-nums sm:text-4xl md:text-5xl ${
          accent ? 'text-accent drop-shadow-[0_0_18px_rgba(0,200,120,0.25)]' : 'text-text-1'
        }`}
      >
        {value}
      </div>
      <span className="mt-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-text-3">
        {label}
      </span>
      {subtext && <span className="mt-1 font-mono text-xs leading-normal text-text-2 tabular-nums">{subtext}</span>}
    </div>
  );
};

export default Stat;
