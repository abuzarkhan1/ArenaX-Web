import React, { forwardRef } from 'react';

export type IconOrbTone = 'emerald' | 'neutral' | 'danger';
export type IconOrbSize = 'sm' | 'md' | 'lg';

export interface IconOrbProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number | string }>;
  tone?: IconOrbTone;
  size?: IconOrbSize;
}

const TONE_STYLES: Record<IconOrbTone, string> = {
  emerald:
    'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-[0_0_24px_-6px_rgba(16,185,129,0.45)]',
  neutral:
    'bg-white/[0.04] border-white/[0.08] text-text-2 shadow-[0_0_24px_-10px_rgba(255,255,255,0.20)]',
  danger:
    'bg-red-500/10 border-red-500/20 text-red-400 shadow-[0_0_24px_-6px_rgba(239,68,68,0.40)]',
};

const SIZE_STYLES: Record<IconOrbSize, { box: string; icon: string }> = {
  sm: { box: 'p-2 rounded-lg', icon: 'w-4 h-4' },
  md: { box: 'p-2.5 rounded-xl', icon: 'w-5 h-5' },
  lg: { box: 'p-3 rounded-xl', icon: 'w-6 h-6' },
};

/**
 * A tactile lucide icon container with a hairline border, emerald backlight
 * and a consistent 1.5 stroke weight. Keeps iconography uniform across sections.
 */
export const IconOrb = forwardRef<HTMLDivElement, IconOrbProps>(
  ({ icon: Icon, tone = 'emerald', size = 'md', className = '', ...props }, ref) => {
    const sizing = SIZE_STYLES[size];
    const glowClass =
      tone === 'danger' ? 'bg-red-500/20' : tone === 'emerald' ? 'bg-emerald-500/20' : 'bg-white/5';

    return (
      <div
        ref={ref}
        className={`relative inline-flex flex-shrink-0 items-center justify-center border ${sizing.box} ${TONE_STYLES[tone]} ${className}`.trim()}
        {...props}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 rounded-[inherit] opacity-60 blur-md ${glowClass}`}
        />
        <Icon className={`relative z-10 ${sizing.icon}`} strokeWidth={1.5} />
      </div>
    );
  }
);

IconOrb.displayName = 'IconOrb';
export default IconOrb;
