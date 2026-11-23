import React from 'react';
import { Reveal } from './Reveal';

export interface SectionHeaderProps {
  /** Main section headline. Wrap words in a span to apply a gradient/accent. */
  title: React.ReactNode;
  /** Supporting sentence taken verbatim from the existing copy. */
  description?: React.ReactNode;
  /** Trailing slot for badges or contextual metadata. */
  aside?: React.ReactNode;
  /** Short label rendered inside the eyebrow chip above the headline. */
  eyebrow?: string;
  /** Optional two-digit numeral, shown when no eyebrow label is supplied. */
  index?: string;
  /** Centre the headline block (Apple-style) or keep it left (Linear-style). */
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader = ({
  title,
  description,
  aside,
  eyebrow,
  index,
  align = 'center',
  className = '',
}: SectionHeaderProps) => {
  const centered = align === 'center';

  const tag = eyebrow ? (
    <span className="eyebrow-chip">{eyebrow}</span>
  ) : index ? (
    <span className="font-mono text-[11px] font-medium tracking-[0.22em] text-accent">
      /{index}
    </span>
  ) : null;

  return (
    <Reveal className={`relative mb-14 sm:mb-20 ${className}`.trim()}>
      <header
        className={
          centered
            ? 'flex flex-col items-center text-center'
            : 'flex flex-col gap-6 md:flex-row md:items-end md:justify-between'
        }
      >
        <div className={centered ? 'flex max-w-3xl flex-col items-center' : 'max-w-3xl'}>
          {tag && <div className="mb-5">{tag}</div>}
          <h2 className="section-title">{title}</h2>
          {description && (
            <p className={`body-copy mt-5 max-w-2xl text-balance ${centered ? 'mx-auto' : ''}`}>
              {description}
            </p>
          )}
          {centered && aside && <div className="mt-6 flex-shrink-0">{aside}</div>}
        </div>
        {!centered && aside && <div className="flex-shrink-0">{aside}</div>}
      </header>
    </Reveal>
  );
};

export default SectionHeader;