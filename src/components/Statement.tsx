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
      <div className="max-w-[1200px] mx-auto px-6 w-full">
        {/* 4 Numbered Editorial Rows */}
        <div className="space-y-0 divide-y divide-line">
          {STATEMENTS.map((item, index) => (
            <div
              key={item.num}
              data-statement-row={index}
              className="group relative py-10 sm:py-16 transition-colors duration-300 hover:bg-emerald-500/[0.025] flex items-baseline gap-6 sm:gap-10"
            >
              {/* Emerald hairline accent on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-emerald-500/50 via-emerald-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              {/* Mono Index Number */}
              <span className="font-mono text-base sm:text-xl font-bold text-accent tracking-[0.1em] tabular-nums flex-shrink-0 transition-colors duration-300 group-hover:text-emerald-300">
                /{item.num}
              </span>

              {/* High-Contrast Scrubbed Statement Words */}
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-text-1 font-heading tracking-tight leading-[1.08] max-w-5xl">
                {item.line.split(' ').map((word, wIdx) => (
                  <span
                    key={wIdx}
                    className="statement-word inline-block mr-2.5 sm:mr-3.5 opacity-25 transition-opacity"
                  >
                    {word}
                  </span>
                ))}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statement;
