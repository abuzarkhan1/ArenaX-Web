import React, { forwardRef } from 'react';

export interface HudCornersProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: 'emerald' | 'neutral';
  size?: 'sm' | 'md';
  inset?: boolean;
}

const TONE_STYLES = {
  emerald: 'border-[#3ECF8E]/50',
  neutral: 'border-white/[0.18]',
};

/* Arm boxes are sized to fully contain the host card's border-radius so the
   1px arc traces the card's own curve instead of floating over the corner.
   sm: hugs cards up to 20px radius, md: hugs cards up to 24px radius. */
const ARM_STYLES = {
  sm: 'h-5 w-5',
  md: 'h-6 w-6',
};

/**
 * Four 1px HUD corner arcs. The corner spans inherit the host's border-radius
 * so brackets bend along the card edge on rounded surfaces and stay square
 * on straight-edged hosts. Place inside any `relative` card, tile or badge.
 * Purely decorative: aria-hidden and pointer-events-none.
 */
export const HudCorners = forwardRef<HTMLSpanElement, HudCornersProps>(
  (
    {
      tone = 'emerald',
      size = 'md',
      inset = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const position = inset ? 'inset-[6px]' : 'inset-0';
    const color = TONE_STYLES[tone];
    const dimensions = ARM_STYLES[size];

    return (
      <span
        ref={ref}
        aria-hidden="true"
        className={`pointer-events-none absolute ${position} z-20 rounded-[inherit] ${className}`.trim()}
        {...props}
      >
        <span
          className={`absolute left-0 top-0 ${dimensions} rounded-tl-[inherit] border-l border-t ${color}`}
        />
        <span
          className={`absolute right-0 top-0 ${dimensions} rounded-tr-[inherit] border-r border-t ${color}`}
        />
        <span
          className={`absolute bottom-0 left-0 ${dimensions} rounded-bl-[inherit] border-b border-l ${color}`}
        />
        <span
          className={`absolute bottom-0 right-0 ${dimensions} rounded-br-[inherit] border-b border-r ${color}`}
        />
      </span>
    );
  }
);

HudCorners.displayName = 'HudCorners';
export default HudCorners;
