import React from 'react';

export interface HudCornersProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: 'emerald' | 'neutral' | 'amber';
  size?: 'sm' | 'md';
  inset?: boolean;
}

const TONE_STYLES = {
  emerald: 'border-emerald-400/50',
  neutral: 'border-white/20',
  amber: 'border-amber-400/50',
};

const SIZE_STYLES = {
  sm: 'h-2 w-2',
  md: 'h-2.5 w-2.5',
};

/**
 * Four 1px HUD corner brackets. Place inside any `relative` card or badge.
 * Purely decorative: aria-hidden and pointer-events-none.
 */
export const HudCorners: React.FC<HudCornersProps> = ({
  tone = 'emerald',
  size = 'md',
  inset = false,
  className = '',
  ...props
}) => {
  const position = inset ? 'inset-[5px]' : 'inset-0';
  const color = TONE_STYLES[tone];
  const dimensions = SIZE_STYLES[size];

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute ${position} z-20 ${className}`.trim()}
      {...props}
    >
      <span className={`absolute left-0 top-0 ${dimensions} border-l border-t ${color}`} />
      <span className={`absolute right-0 top-0 ${dimensions} border-r border-t ${color}`} />
      <span className={`absolute bottom-0 left-0 ${dimensions} border-b border-l ${color}`} />
      <span className={`absolute bottom-0 right-0 ${dimensions} border-b border-r ${color}`} />
    </span>
  );
};

export default HudCorners;
