import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export type BadgeTone = 'emerald' | 'neutral' | 'danger';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  dot?: boolean;
  pulse?: boolean;
  label?: string;
}

const TONE_STYLES: Record<BadgeTone, string> = {
  emerald:
    'bg-[#3ECF8E]/[0.08] text-[#3ECF8E] border border-[#3ECF8E]/30',
  neutral:
    'bg-white/[0.04] text-[#A0A0A0] border border-white/[0.12]',
  danger:
    'bg-red-500/[0.08] text-red-400 border border-red-500/30',
};

const DOT_STYLES: Record<BadgeTone, string> = {
  emerald: 'bg-[#3ECF8E] shadow-[0_0_6px_rgba(62,207,142,0.9)]',
  neutral: 'bg-[#A0A0A0]',
  danger: 'bg-red-400 shadow-[0_0_6px_rgba(248,113,113,0.9)]',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      tone = 'emerald',
      dot = false,
      pulse = false,
      label,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[10px] md:text-[11px] font-medium uppercase tracking-[0.12em] tabular-nums backdrop-blur-sm transition-colors duration-150',
          TONE_STYLES[tone],
          className
        )}
        {...props}
      >
        {dot && (
          <span className="relative flex h-1.5 w-1.5 flex-shrink-0" aria-hidden="true">
            {pulse && (
              <span
                className={cn(
                  'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
                  DOT_STYLES[tone]
                )}
              />
            )}
            <span className={cn('relative inline-flex h-1.5 w-1.5 rounded-full', DOT_STYLES[tone])} />
          </span>
        )}
        <span>{label || children}</span>
      </span>
    );
  }
);

Badge.displayName = 'Badge';
export default Badge;