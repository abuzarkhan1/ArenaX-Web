import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATEMENTS = [
  {
    num: '01',
    line: 'AI vision verifies scoreboards in seconds.',
  },
  {
    num: '02',
    line: 'Cash out in 24 hours.',
  },
  {
    num: '03',
    line: 'Money kept in two separate wallets.',
  },
  {
    num: '04',
    line: 'Cheaters banned for life.',
  },
];

export const Statement = () => {
  const statementRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Scrubbed word reveals for standard motion
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const rows = statementRef.current?.querySelectorAll('[data-statement-row]');
        rows?.forEach((row) => {
          const words = row.querySelectorAll('.statement-word');

          gsap.to(words, {
            opacity: 1,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
              end: 'top 45%',
              scrub: 0.6,
            },
          });
        });
      });

      // Reduced-motion accessibility fallback: Immediately reveal all words at full opacity
      mm.add('(prefers-reduced-motion: reduce)', () => {
        const words = statementRef.current?.querySelectorAll('.statement-word');
        if (words) {
          gsap.set(words, { opacity: 1 });
        }
      });
    }, statementRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={statementRef}
      id="statement"
      className="relative z-20 py-[clamp(80px,10vw,140px)] bg-bg-1 border-b border-line overflow-hidden"
      aria-label="ArenaX Platform Statement"
    >
      {/* Top Hairline Gradient Divider */}
      <div className="divider-gradient absolute inset-x-0 top-0" aria-hidden="true" />

      {/* Volumetric Dark Carbon Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-accent/[0.025] rounded-full blur-[160px]" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 w-full">
        {/* 4 Numbered Editorial Rows */}
        <div className="space-y-0 divide-y divide-line">
          {STATEMENTS.map((item, index) => (
            <div
              key={item.num}
              data-statement-row={index}
              className="group relative py-12 sm:py-16 md:py-20 px-4 sm:px-8 -mx-4 sm:-mx-8 rounded-xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#171717]/40 flex items-baseline gap-6 sm:gap-10 md:gap-14"
            >
              {/* Dynamic Emerald Hairline Top Accent on Hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3ECF8E]/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              {/* Mono Index Number with Supabase Accent and Micro-Nudge */}
              <span className="font-mono text-sm sm:text-base md:text-lg lg:text-xl font-bold text-accent tracking-[0.14em] tabular-nums select-none flex-shrink-0 pt-1.5 sm:pt-2 md:pt-3 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:text-[#4CD99B]">
                /{item.num}
              </span>

              {/* High-Contrast Scrubbed Statement Words in Manrope Display Hierarchy */}
              <p className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-text-1 font-heading tracking-tight sm:tracking-[-0.03em] leading-[1.06] max-w-5xl">
                {item.line.split(' ').map((word, wIdx) => (
                  <span
                    key={wIdx}
                    className="statement-word inline-block mr-2.5 sm:mr-3.5 md:mr-4 opacity-25 transition-opacity"
                  >
                    {word}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statement;
