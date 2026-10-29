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
        className={`text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading tracking-tight leading-none ${
          accent ? 'text-accent' : 'text-text-1'
        }`}
      >
        {value}
      </div>
      <span className="text-xs font-mono uppercase tracking-[0.08em] text-text-3 mt-2 block">
        {label}
      </span>
      {subtext && <span className="text-sm text-text-2 mt-1 leading-normal">{subtext}</span>}
    </div>
  );
};

export default Stat;

