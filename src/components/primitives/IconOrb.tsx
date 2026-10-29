import React from 'react';

export type IconOrbTone = 'emerald' | 'amber' | 'neutral' | 'danger';
export type IconOrbSize = 'sm' | 'md' | 'lg';

export interface IconOrbProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number | string }>;
  tone?: IconOrbTone;
  size?: IconOrbSize;
}

const TONE_STYLES: Record<IconOrbTone, string> = {
  emerald:
    'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-[0_0_24px_-6px_rgba(16,185,129,0.45)]',
  amber:
    'bg-amber-500/10 border-amber-500/20 text-amber-400 shadow-[0_0_24px_-6px_rgba(245,158,11,0.40)]',
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
export const IconOrb: React.FC<IconOrbProps> = ({
  icon: Icon,
  tone = 'emerald',
  size = 'md',
  className = '',
  ...props
}) => {
  const sizing = SIZE_STYLES[size];

  return (
    <div
      className={`relative inline-flex flex-shrink-0 items-center justify-center border ${sizing.box} ${TONE_STYLES[tone]} ${className}`.trim()}
      {...props}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 rounded-[inherit] opacity-60 blur-md ${
          tone === 'amber' ? 'bg-amber-500/20' : tone === 'danger' ? 'bg-red-500/20' : 'bg-emerald-500/20'
        }`}
      />
      <Icon className={`relative z-10 ${sizing.icon}`} strokeWidth={1.5} />
    </div>
  );
};

export default IconOrb;
