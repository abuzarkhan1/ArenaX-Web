import React from 'react';

export interface PillProps extends React.HTMLAttributes<HTMLDivElement> {
  dot?: boolean;
  dotPulse?: boolean;
  label?: string;
}

export const Pill: React.FC<PillProps> = ({
  dot = true,
  dotPulse = true,
  label,
  children,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bg-2 border border-line text-xs font-mono uppercase tracking-[0.08em] text-text-3 select-none ${className}`.trim()}
      {...props}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 ${
            dotPulse ? 'animate-pulse' : ''
          }`}
          aria-hidden="true"
        />
      )}
      <span>{label || children}</span>
    </div>
  );
};

export default Pill;

