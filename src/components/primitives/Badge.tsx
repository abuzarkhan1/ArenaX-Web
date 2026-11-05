import React, { forwardRef } from 'react';

export type BadgeTone = 'emerald' | 'neutral' | 'danger';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  dot?: boolean;
  pulse?: boolean;
  label?: string;
}

const TONE_STYLES: Record<BadgeTone, string> = {
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]',
  neutral: 'bg-white/[0.04] text-text-2 border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]',
  danger: 'bg-red-500/10 text-red-400 border-red-500/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]',
};

const DOT_STYLES: Record<BadgeTone, string> = {
  emerald: 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]',
  neutral: 'bg-text-2',
  danger: 'bg-red-400 shadow-[0_0_6px_rgba(248,113,113,0.9)]',
};

/**
 * Compact tactical status tag used for LIVE, VERIFIED, slot counts and
 * other dense HUD metadata. Numerals stay aligned through tabular-nums.
 */
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
        className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider tabular-nums ${TONE_STYLES[tone]} ${className}`.trim()}
        {...props}
      >
        {dot && (
          <span className="relative flex h-1.5 w-1.5 flex-shrink-0" aria-hidden="true">
            {pulse && (
              <span
                className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${DOT_STYLES[tone]}`}
              />
            )}
            <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${DOT_STYLES[tone]}`} />
          </span>
        )}
        <span>{label || children}</span>
      </span>
    );
  }
);

Badge.displayName = 'Badge';
export default Badge;
