import React, { forwardRef } from 'react';

export interface PillProps extends React.HTMLAttributes<HTMLDivElement> {
  dot?: boolean;
  dotPulse?: boolean;
  pulse?: boolean;
  label?: string;
}

export const Pill = forwardRef<HTMLDivElement, PillProps>(
  (
    {
      dot = true,
      dotPulse = true,
      pulse,
      label,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const isPulsing = pulse !== undefined ? pulse : dotPulse;

    return (
      <div
        ref={ref}
        className={`inline-flex select-none items-center gap-2 rounded-full border border-white/[0.08] bg-bg-2/60 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-text-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl ${className}`.trim()}
        {...props}
      >
        {dot && (
          <span className="relative flex h-1.5 w-1.5 flex-shrink-0" aria-hidden="true">
            {isPulsing && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3ECF8E] opacity-60" />
            )}
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#3ECF8E] shadow-[0_0_6px_rgba(62,207,142,0.9)]" />
          </span>
        )}
        <span>{label || children}</span>
      </div>
    );
  }
);

Pill.displayName = 'Pill';
export default Pill;
