import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Pill } from './primitives/Pill';

gsap.registerPlugin(ScrollTrigger);

const STATEMENTS = [
  {
    num: '01',
    line: 'Scoreboards verified in seconds.',
    detail: 'AI vision scans end-match victory screenshots automatically. Zero host bias, zero dispute delays.',
  },
  {
    num: '02',
    line: 'Cash out in 24 hours.',
    detail: 'Direct transfers to JazzCash, EasyPaisa, and Pakistani bank accounts with 1 AX = 1 PKR cash parity.',
  },
  {
    num: '03',
    line: 'Money kept in two separate wallets.',
    detail: 'Deposits and tournament prize money remain completely segregated. 100% automated match refund guarantee.',
  },
  {
    num: '04',
    line: 'Cheaters banned for life.',
    detail: 'Strict in-game UID roster validation before credentials unlock. Zero tolerance for emulators or hacks.',
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
          const detail = row.querySelector('.statement-detail');

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

          if (detail) {
            gsap.fromTo(
              detail,
              { opacity: 0.35, y: 12 },
              {
                opacity: 1,
                y: 0,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: row,
                  start: 'top 80%',
                  end: 'top 45%',
                  scrub: 0.6,
                },
              }
            );
          }
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
        {/* Top Header Pill */}
        <div className="mb-10 sm:mb-14">
          <Pill dot={true} label="PLATFORM PROTOCOL" />
        </div>

        {/* 4 Numbered Editorial Rows */}
        <div className="space-y-0 divide-y divide-line">
          {STATEMENTS.map((item, index) => (
            <div
              key={item.num}
              data-statement-row={index}
              className="py-8 sm:py-12 group transition-all duration-300 flex flex-col md:flex-row md:items-baseline justify-between gap-4 md:gap-8"
            >
              {/* Row Left: Mono Number + Statement Words */}
              <div className="flex items-baseline gap-4 sm:gap-6 flex-grow">
                <span className="font-mono text-sm sm:text-base font-bold text-accent tracking-[0.1em] flex-shrink-0">
                  /{item.num}
                </span>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-text-1 font-heading tracking-tight leading-[1.08]">
                  {item.line.split(' ').map((word, wIdx) => (
                    <span
                      key={wIdx}
                      className="statement-word inline-block mr-2.5 opacity-25 transition-opacity"
                    >
                      {word}
                    </span>
                  ))}
                </h2>
              </div>

              {/* Row Right: Brief Technical Clarification */}
              <p className="statement-detail text-sm sm:text-base text-text-2 max-w-sm md:text-right leading-relaxed font-normal flex-shrink-0 pl-8 md:pl-0">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statement;
