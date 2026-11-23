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
    'text-[#3ECF8E] bg-[#3ECF8E]/[0.08] border-[#3ECF8E]/25 shadow-[0_0_20px_-6px_rgba(62,207,142,0.4),inset_0_1px_0_rgba(255,255,255,0.06)]',
  neutral:
    'text-[#A0A0A0] bg-white/[0.04] border-white/[0.1] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]',
  danger:
    'text-red-400 bg-red-500/[0.08] border-red-500/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]',
};

const SIZE_STYLES: Record<IconOrbSize, { box: string; icon: string }> = {
  sm: { box: 'h-9 w-9 rounded-[10px]', icon: 'w-4 h-4' },
  md: { box: 'h-11 w-11 rounded-xl', icon: 'w-5 h-5' },
  lg: { box: 'h-[52px] w-[52px] rounded-2xl', icon: 'w-6 h-6' },
};

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
          className={`pointer-events-none absolute inset-0 rounded-[inherit] blur-md ${glowClass}`}
        />
        <Icon className={`relative ${sizing.icon}`} strokeWidth={1.6} />
      </div>
    );
  }
);

IconOrb.displayName = 'IconOrb';
export default IconOrb;