import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, UserPlus, Users, Swords, Trophy, Banknote, ArrowRight } from 'lucide-react';
import { Pill } from './primitives/Pill';
import { Button } from './primitives/Button';
import { HudCorners, IconOrb } from './primitives';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    step: '01',
    icon: Download,
    title: 'Download & Install APK',
    desc: 'Download the official ArenaX APK for Android. Register with a referral code to claim 25 AX starter coins immediately.',
    spec: '25 AX Welcome Bonus',
  },
  {
    step: '02',
    icon: UserPlus,
    title: 'Link Your Free Fire UID',
    desc: 'Set up your player profile and connect your authentic Free Fire in-game name and UID for automated roster verification.',
    spec: 'Automated UID Verification',
  },
  {
    step: '03',
    icon: Users,
    title: 'Assemble Your Squad',
    desc: 'Form Duo or Squad lineups in under 5 seconds using unique 6-digit squad codes, or enter tournaments as a Solo rogue.',
    spec: '6-Digit Squad Codes',
  },
  {
    step: '04',
    icon: Swords,
    title: 'Register for Tournaments',
    desc: 'Browse daily Bermuda Battle Royale scrims and Clash Squad 4v4 brackets with entry fees starting from only 50 AX Coins.',
    spec: 'Daily Scrims 24/7',
  },
  {
    step: '05',
    icon: Trophy,
    title: 'Drop & Dominate',
    desc: 'Room ID & password unlock inside the app 10–15 minutes before match countdown. Fight for the Booyah and rack up kill points.',
    spec: '10–15m Credential Unlock',
  },
  {
    step: '06',
    icon: Banknote,
    title: 'AI Vision & 24h Cashout',
    desc: 'AI vision scans your victory scoreboard. Verified cash winnings credit directly to your Winning Wallet for 24h cashout.',
    spec: '1 AX = 1 PKR Cash Parity',
  },
];

export const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // 1. Progress line vertical fill
        if (progressLineRef.current && timelineRef.current) {
          gsap.fromTo(
            progressLineRef.current,
            { scaleY: 0, transformOrigin: 'top center' },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: timelineRef.current,
                start: 'top 75%',
                end: 'bottom 60%',
                scrub: 0.4,
              },
            }
          );
        }

        // 2. Step cards rotateX entrance
        if (timelineRef.current) {
          const cards = timelineRef.current.querySelectorAll('.timeline-step-card');
          cards.forEach((card) => {
            gsap.fromTo(
              card,
              { rotateX: 15, opacity: 0.4, y: 15 },
              {
                rotateX: 0,
                opacity: 1,
                y: 0,
                ease: 'power3.out',
                duration: 0.7,
                scrollTrigger: {
                  trigger: card,
                  start: 'top 85%',
                  toggleActions: 'play none none reverse',
                },
              }
            );
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToDownload = () => {
    document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="py-[clamp(80px,10vw,140px)] bg-bg-1 border-b border-line relative overflow-hidden"
      aria-label="How It Works Timeline"
    >
      <div
        aria-hidden="true"
        className="ambient-glow left-[6%] top-[42%] h-[420px] w-[420px] opacity-60"
      />
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-14 sm:mb-18">
          <Pill dot={true} label="PLAYER ONBOARDING" />
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-text-1 font-heading mt-4">
            Road to <span className="text-accent text-glow-accent">Booyah</span>
          </h2>
          <p className="text-base sm:text-lg text-text-2 max-w-2xl mt-3 leading-relaxed">
            From downloading the APK to 24-hour JazzCash or EasyPaisa payouts in 6 transparent steps.
          </p>
        </div>

        {/* ======================================================== */}
        {/* VERTICAL TIMELINE WITH PROGRESS LINE                     */}
        {/* ======================================================== */}
        <div
          ref={timelineRef}
          className="relative pl-6 sm:pl-10 space-y-6 sm:space-y-8 max-w-3xl perspective-1200"
        >
          {/* Soft ambient backlight behind the timeline track */}
          <div
            aria-hidden="true"
            className="ambient-glow -left-20 top-24 h-[380px] w-[380px] opacity-70"
          />

          {/* Base Vertical Line Track */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-line pointer-events-none">
            {/* Animated Emerald Fill Line */}
            <div
              ref={progressLineRef}
              className="w-full h-full bg-accent shadow-[0_0_8px_rgba(0,200,120,0.8)]"
            />
          </div>

          {STEPS.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={item.step} className="relative group">
                {/* Node Dot on the Timeline */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-6 w-3.5 h-3.5 rounded-full bg-bg-1 border-2 border-accent shadow-[0_0_12px_rgba(0,200,120,0.55)] transition-all group-hover:scale-125 group-hover:shadow-[0_0_18px_rgba(0,200,120,0.85)] z-10" />

                {/* Base Card for Step with 3D rotate in */}
                <div className="timeline-step-card hud-card relative z-10 p-6 sm:p-7 rounded-card flex flex-col sm:flex-row sm:items-center justify-between gap-4 preserve-3d duration-200 ease-out hover:shadow-lift">
                  {index === 0 && <HudCorners tone="emerald" size="sm" inset className="opacity-60" />}
                  <div className="flex items-start gap-4">
                    <IconOrb icon={Icon} tone="emerald" size="md" className="mt-0.5" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-bold text-accent tabular-nums tracking-tight">/{item.step}</span>
                        <h3 className="text-lg font-bold font-heading text-text-1">{item.title}</h3>
                      </div>
                      <p className="text-sm text-text-2 leading-relaxed max-w-xl">{item.desc}</p>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-text-3 tabular-nums tracking-tight px-3 py-1 rounded-control bg-bg-1/70 border border-line whitespace-nowrap self-start sm:self-auto transition-colors duration-200 group-hover:border-line-accent group-hover:text-text-2">
                    {item.spec}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Final CTA */}
        <div className="mt-12 sm:mt-16 pl-6 sm:pl-10">
          <Button
            variant="primary"
            onClick={scrollToDownload}
            icon={<ArrowRight className="w-4 h-4" strokeWidth={1.5} />}
          >
            Download Direct APK
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
