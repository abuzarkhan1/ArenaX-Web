import { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, UserPlus, Users, Swords, Trophy, Banknote, ArrowRight } from 'lucide-react';
import { Button } from './primitives/Button';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    step: '01',
    icon: Download,
    title: 'Download & Install APK',
    desc: 'Download the official ArenaX APK for Android. Register with a referral code to claim 25 AX starter coins immediately.',
  },
  {
    step: '02',
    icon: UserPlus,
    title: 'Link Your Free Fire UID',
    desc: 'Set up your player profile and connect your authentic Free Fire in-game name and UID for automated roster verification.',
  },
  {
    step: '03',
    icon: Users,
    title: 'Assemble Your Squad',
    desc: 'Form Duo or Squad lineups in under 5 seconds using unique 6-digit squad codes, or enter tournaments as a Solo rogue.',
  },
  {
    step: '04',
    icon: Swords,
    title: 'Register for Tournaments',
    desc: 'Browse daily Bermuda Battle Royale scrims and Clash Squad 4v4 brackets with entry fees starting from only 50 AX Coins.',
  },
  {
    step: '05',
    icon: Trophy,
    title: 'Drop & Dominate',
    desc: 'Room ID & password unlock inside the app 10–15 minutes before match countdown. Fight for the Booyah and rack up kill points.',
  },
  {
    step: '06',
    icon: Banknote,
    title: 'AI Vision & 24h Cashout',
    desc: 'AI vision scans your victory scoreboard. Verified cash winnings credit directly to your Winning Wallet for 24h cashout.',
  },
];

export const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState('01');
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
          cards.forEach((card, idx) => {
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
                  onEnter: () => setActiveStep(STEPS[idx].step),
                  onEnterBack: () => setActiveStep(STEPS[idx].step),
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
      className="py-[clamp(80px,10vw,140px)] bg-[#121212] border-b border-white/[0.08] relative overflow-hidden"
      aria-label="How It Works Timeline"
    >
      {/* Subtle atmospheric radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/4 h-[500px] w-[500px] -translate-x-1/3 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(62,207,142,0.06)_0%,rgba(62,207,142,0)_70%)]"
      />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-14 sm:mb-18">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#EDEDED] font-heading">
            Road to <span className="text-[#3ECF8E]">Booyah</span>
          </h2>
          <p className="text-base sm:text-lg text-[#A0A0A0] max-w-2xl mt-3 leading-relaxed">
            From downloading the APK to 24-hour JazzCash or EasyPaisa payouts in 6 transparent steps.
          </p>
        </div>

        {/* ======================================================== */}
        {/* BALANCED 2-COLUMN DESKTOP LAYOUT (Timeline + Preview HUD)*/}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column (7 cols): Vertical Timeline */}
          <div
            ref={timelineRef}
            className="lg:col-span-7 relative pl-6 sm:pl-10 space-y-6 sm:space-y-8 perspective-1200"
          >
            {/* Base Vertical Line Track */}
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/[0.08] pointer-events-none">
              {/* Animated Emerald Fill Line */}
              <div
                ref={progressLineRef}
                className="w-full h-full bg-gradient-to-b from-[#249361] to-[#3ECF8E]"
              />
            </div>

            {STEPS.map((item) => {
              const Icon = item.icon;
              const isActive = activeStep === item.step;

              return (
                <div
                  key={item.step}
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setActiveStep(item.step)}
                >
                  {/* Node Dot on the Timeline */}
                  <div
                    className={`absolute -left-[31px] sm:-left-[47px] top-6 w-3.5 h-3.5 rounded-full bg-[#121212] border-2 transition-all duration-200 z-10 ${
                      isActive
                        ? 'border-[#3ECF8E] ring-4 ring-[#3ECF8E]/20 scale-125'
                        : 'border-[#3ECF8E]/60 ring-4 ring-[#121212] group-hover:scale-125'
                    }`}
                  />

                  {/* Base Card for Step with 3D rotate in */}
                  <div
                    className={`timeline-step-card relative z-10 p-6 sm:p-7 rounded-card border transition-all duration-200 ease-out preserve-3d shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_12px_32px_-12px_rgba(0,0,0,0.5)] flex items-start gap-4.5 ${
                      isActive
                        ? 'bg-[#181A19] border-[#3ECF8E]/40 shadow-[0_16px_36px_-12px_rgba(62,207,142,0.15)] -translate-y-0.5'
                        : 'bg-[#171717] border-white/[0.08] hover:border-white/[0.14] hover:-translate-y-0.5'
                    }`}
                  >
                    <div
                      className={`w-11 h-11 rounded-md border flex items-center justify-center flex-shrink-0 transition-colors ${
                        isActive
                          ? 'bg-[#041B10] border-[#3ECF8E]/40 text-[#3ECF8E]'
                          : 'bg-[#181A19] border-white/[0.08] text-[#3ECF8E] group-hover:border-[#3ECF8E]/30'
                      }`}
                    >
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div className="min-w-0 flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-bold text-[#3ECF8E] tabular-nums tracking-tight">
                          /{item.step}
                        </span>
                        <h3 className="text-lg font-bold font-heading text-[#EDEDED]">{item.title}</h3>
                      </div>
                      <p className="text-sm text-[#A0A0A0] leading-relaxed font-normal">{item.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Final CTA */}
            <div className="pt-4">
              <Button
                variant="primary"
                size="lg"
                onClick={scrollToDownload}
                icon={<ArrowRight className="w-4 h-4" strokeWidth={1.5} />}
              >
                Download Direct APK
              </Button>
            </div>
          </div>

          {/* Right Column (5 cols): Sticky Stage Verification Preview HUD */}
          <div className="hidden lg:block lg:col-span-5 sticky top-28 self-start">
            <div className="rounded-card bg-[#171717] border border-white/[0.08] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_48px_-20px_rgba(0,0,0,0.7)] space-y-5 max-h-[calc(100vh-8.5rem)] overflow-y-auto no-scrollbar">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-[#3ECF8E] animate-pulse" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#EDEDED]">
                    Stage Telemetry Preview
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-[#3ECF8E] bg-[#041B10] px-2 py-0.5 rounded border border-[#3ECF8E]/30">
                  Step {activeStep} / 06
                </span>
              </div>

              {/* Dynamic Preview for Step 01 */}
              {activeStep === '01' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="p-4 rounded-control bg-[#121212] border border-white/[0.08] space-y-2.5 text-xs font-mono">
                    <div className="flex justify-between items-center text-[#A0A0A0]">
                      <span>PACKAGE</span>
                      <span className="text-[#3ECF8E] font-bold">ArenaX.apk</span>
                    </div>
                    <div className="flex justify-between items-center text-[#A0A0A0]">
                      <span>INTEGRITY</span>
                      <span className="text-[#EDEDED]">SHA-256 Validated</span>
                    </div>
                    <div className="flex justify-between items-center text-[#A0A0A0]">
                      <span>PLATFORM</span>
                      <span className="text-[#EDEDED]">Android Client</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-control bg-[#041B10] border border-[#3ECF8E]/30 text-xs font-mono text-[#3ECF8E] flex items-center justify-between">
                    <span>Starter Bonus</span>
                    <span className="font-bold">+25 AX Instant</span>
                  </div>
                </div>
              )}

              {/* Dynamic Preview for Step 02 */}
              {activeStep === '02' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="p-4 rounded-control bg-[#121212] border border-white/[0.08] space-y-2.5 text-xs font-mono">
                    <div className="flex justify-between items-center text-[#A0A0A0]">
                      <span>PLAYER IGN</span>
                      <span className="text-[#EDEDED] font-bold">AX_Sniper</span>
                    </div>
                    <div className="flex justify-between items-center text-[#A0A0A0]">
                      <span>VERIFIED UID</span>
                      <span className="text-[#3ECF8E] font-bold">94829104</span>
                    </div>
                    <div className="flex justify-between items-center text-[#A0A0A0]">
                      <span>ROSTER MATCH</span>
                      <span className="text-[#EDEDED]">Certified Official</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-control bg-[#041B10] border border-[#3ECF8E]/30 text-xs font-mono text-[#3ECF8E] flex items-center justify-between">
                    <span>Profile Status</span>
                    <span className="font-bold">UID Linked</span>
                  </div>
                </div>
              )}

              {/* Dynamic Preview for Step 03 */}
              {activeStep === '03' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="p-4 rounded-control bg-[#121212] border border-white/[0.08] space-y-2.5 text-xs font-mono">
                    <div className="flex justify-between items-center text-[#A0A0A0]">
                      <span>SQUAD CODE</span>
                      <span className="text-[#3ECF8E] font-bold">#884921</span>
                    </div>
                    <div className="flex justify-between items-center text-[#A0A0A0]">
                      <span>ROSTER SLOTS</span>
                      <span className="text-[#EDEDED]">4 / 4 Filled</span>
                    </div>
                    <div className="flex justify-between items-center text-[#A0A0A0]">
                      <span>MODE READY</span>
                      <span className="text-[#EDEDED]">Duo & Squad</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-control bg-[#041B10] border border-[#3ECF8E]/30 text-xs font-mono text-[#3ECF8E] flex items-center justify-between">
                    <span>Lineup Formation</span>
                    <span className="font-bold">Instant Sync</span>
                  </div>
                </div>
              )}

              {/* Dynamic Preview for Step 04 */}
              {activeStep === '04' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="p-4 rounded-control bg-[#121212] border border-white/[0.08] space-y-2.5 text-xs font-mono">
                    <div className="flex justify-between items-center text-[#A0A0A0]">
                      <span>TOURNAMENT</span>
                      <span className="text-[#EDEDED] font-bold">Bermuda Championship #402</span>
                    </div>
                    <div className="flex justify-between items-center text-[#A0A0A0]">
                      <span>ENTRY FEE</span>
                      <span className="text-[#EDEDED]">50 AX Coins</span>
                    </div>
                    <div className="flex justify-between items-center text-[#A0A0A0]">
                      <span>PRIZE POOL</span>
                      <span className="text-[#3ECF8E] font-bold">2,160 AX Cash</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-control bg-[#041B10] border border-[#3ECF8E]/30 text-xs font-mono text-[#3ECF8E] flex items-center justify-between">
                    <span>Registration</span>
                    <span className="font-bold">Slot Confirmed</span>
                  </div>
                </div>
              )}

              {/* Dynamic Preview for Step 05 */}
              {activeStep === '05' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="p-4 rounded-control bg-[#121212] border border-white/[0.08] space-y-2.5 text-xs font-mono">
                    <div className="flex justify-between items-center text-[#A0A0A0]">
                      <span>ROOM ID</span>
                      <span className="text-[#3ECF8E] font-bold">884921</span>
                    </div>
                    <div className="flex justify-between items-center text-[#A0A0A0]">
                      <span>PASSWORD</span>
                      <span className="text-[#3ECF8E] font-bold">arena77</span>
                    </div>
                    <div className="flex justify-between items-center text-[#A0A0A0]">
                      <span>DISPATCH TIME</span>
                      <span className="text-[#EDEDED]">15m Before Drop</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-control bg-[#041B10] border border-[#3ECF8E]/30 text-xs font-mono text-[#3ECF8E] flex items-center justify-between">
                    <span>Credentials</span>
                    <span className="font-bold">Roster Verified</span>
                  </div>
                </div>
              )}

              {/* Dynamic Preview for Step 06 */}
              {activeStep === '06' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="p-4 rounded-control bg-[#121212] border border-white/[0.08] space-y-2.5 text-xs font-mono">
                    <div className="flex justify-between items-center text-[#A0A0A0]">
                      <span>VISION RESULT</span>
                      <span className="text-[#3ECF8E] font-bold">Booyah #1 (14 Kills)</span>
                    </div>
                    <div className="flex justify-between items-center text-[#A0A0A0]">
                      <span>PAYOUT METHOD</span>
                      <span className="text-[#EDEDED]">JazzCash / EasyPaisa</span>
                    </div>
                    <div className="flex justify-between items-center text-[#A0A0A0]">
                      <span>PARITY</span>
                      <span className="text-[#EDEDED]">1 AX = 1 PKR</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-control bg-[#041B10] border border-[#3ECF8E]/30 text-xs font-mono text-[#3ECF8E] flex items-center justify-between">
                    <span>Disbursement</span>
                    <span className="font-bold">24h SLA Verified</span>
                  </div>
                </div>
              )}

              <div className="pt-2 text-center">
                <Button
                  variant="primary"
                  size="sm"
                  fullWidth
                  onClick={scrollToDownload}
                  icon={<ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />}
                >
                  Download App to Play
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
