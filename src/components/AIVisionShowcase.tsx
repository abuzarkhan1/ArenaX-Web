import { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, CheckCircle2, Crosshair, ShieldCheck } from 'lucide-react';
import { Badge, IconOrb } from './primitives';

gsap.registerPlugin(ScrollTrigger);

export const AIVisionShowcase = () => {
  const [isBooyah, setIsBooyah] = useState(true);
  const [kills, setKills] = useState(6);
  const sectionRef = useRef<HTMLElement>(null);
  const scoreboardRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const telemetryRef = useRef<HTMLDivElement>(null);
  const [confidence, setConfidence] = useState(99.4);

  // Authoritative scoring: 20 PTS for Booyah + 5 PTS per kill
  const totalPoints = (isBooyah ? 20 : 0) + kills * 5;

  const getTier = (pts: number) => {
    if (pts >= 60) return { name: 'Grandmaster Contender', percent: 100, badge: '/ranks/grandmaster.webp?v=s4' };
    if (pts >= 40) return { name: 'Heroic Tier', percent: 75, badge: '/ranks/heroic.webp?v=s4' };
    if (pts >= 25) return { name: 'Diamond Tier', percent: 50, badge: '/ranks/diamond.webp?v=s4' };
    return { name: 'Gold Tier', percent: 25, badge: '/ranks/gold.webp?v=s4' };
  };

  const tier = getTier(totalPoints);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // 1. Scoreboard entrance reveal (orthogonal, razor-sharp)
        if (scoreboardRef.current) {
          gsap.fromTo(
            scoreboardRef.current,
            { y: 24, opacity: 0.8, scale: 0.98 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              ease: 'power3.out',
              duration: 0.8,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
              },
            }
          );
        }

        // 2. Scanline analysis pulse sweep on scroll trigger
        if (scanlineRef.current) {
          gsap.fromTo(
            scanlineRef.current,
            { top: '0%', opacity: 0 },
            {
              top: '100%',
              opacity: 0.9,
              duration: 1.8,
              ease: 'power2.inOut',
              scrollTrigger: {
                trigger: scoreboardRef.current,
                start: 'top 75%',
                toggleActions: 'restart none none none',
              },
            }
          );
        }

        // 3. Telemetry rows stagger reveal & confidence score tick-up
        if (telemetryRef.current) {
          const rows = telemetryRef.current.querySelectorAll('.telemetry-row');
          gsap.fromTo(
            rows,
            { opacity: 0, y: 14 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: telemetryRef.current,
                start: 'top 75%',
              },
            }
          );

          const confObj = { val: 88.0 };
          gsap.to(confObj, {
            val: 99.4,
            duration: 1.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: telemetryRef.current,
              start: 'top 75%',
            },
            onUpdate: () => setConfidence(Number(confObj.val.toFixed(1))),
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ai-vision"
      className="py-[clamp(80px,10vw,140px)] bg-[#121212] border-b border-white/[0.08] relative overflow-hidden"
      aria-label="ArenaX Vision Engine"
    >
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#EDEDED] font-heading">
            Zero <span className="text-accent">Disputes</span>
          </h2>
        </div>

        {/* ======================================================== */}
        {/* SIGNATURE SCENE 2: SCOREBOARD IN PERSPECTIVE            */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Left: Orthogonal Razor-Sharp Scoreboard Display */}
          <div className="lg:col-span-7 relative flex justify-center">
            {/* Emerald ambient bloom behind the OCR plane */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(62,207,142,0.06)_0%,rgba(62,207,142,0)_70%)] blur-[100px]"
            />
            <div
              ref={scoreboardRef}
              className="relative z-10 w-full max-w-lg rounded-card bg-[#171717] border border-white/[0.08] p-5 sm:p-6 shadow-[0_20px_48px_-16px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.06)] overflow-hidden transition-all duration-300 hover:border-white/[0.16] hover:shadow-[0_24px_56px_-16px_rgba(62,207,142,0.12)]"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3ECF8E]/40 to-transparent"
              />
              {/* Animated Emerald Scanline */}
              <div
                ref={scanlineRef}
                className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#3ECF8E] to-transparent z-30 pointer-events-none opacity-90 shadow-[0_0_8px_rgba(62,207,142,0.8)]"
                style={{ top: '38%' }}
              />

              {/* Simulated Free Fire Scoreboard Plane */}
              <div className="space-y-3">
                <div className="flex flex-wrap justify-between items-center gap-2 pb-3 border-b border-white/[0.08] text-xs font-mono tracking-tight tabular-nums">
                  <span className="text-[#3ECF8E] font-bold">MATCH #402 • BERMUDA</span>
                  <Badge tone="emerald" dot pulse className="px-2 py-0 text-[9px]">
                    ACTIVE
                  </Badge>
                </div>

                {/* Scoreboard Row 1: Player with Bounding Box */}
                <div className="p-3 rounded-control bg-[#041B10] border border-[#3ECF8E]/30 relative shadow-[inset_0_1px_0_rgba(62,207,142,0.2)]">
                  <div className="absolute -top-2 right-2 px-1.5 py-0.5 bg-[#3ECF8E] text-[#041B10] text-[9px] font-mono font-bold rounded">
                    UID MATCHED
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono tracking-tight tabular-nums">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded bg-[#041B10] border border-[#3ECF8E]/40 text-[#3ECF8E] flex items-center justify-center font-bold text-[10px]">
                        #1
                      </span>
                      <span className="text-[#EDEDED] font-bold">AX_Sniper</span>
                      <span className="text-[#707070] text-[10px] hidden sm:inline">(UID: 2849182390)</span>
                    </div>
                    <span className="text-[#3ECF8E] font-bold">14 KILLS</span>
                  </div>
                </div>

                {/* Scoreboard Row 2 */}
                <div className="p-2.5 rounded-control bg-[#121212] border border-white/[0.07] flex justify-between items-center text-xs font-mono tracking-tight tabular-nums text-[#A0A0A0]">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-[#181A19] border border-white/[0.08] text-[#707070] flex items-center justify-center text-[10px]">
                      #2
                    </span>
                    <span>PK_Hunter</span>
                  </div>
                  <span className="text-[#707070]">8 KILLS</span>
                </div>

                {/* Scoreboard Row 3 */}
                <div className="p-2.5 rounded-control bg-[#121212] border border-white/[0.07] flex justify-between items-center text-xs font-mono tracking-tight tabular-nums text-[#A0A0A0]">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-[#181A19] border border-white/[0.08] text-[#707070] flex items-center justify-center text-[10px]">
                      #3
                    </span>
                    <span>Viper_Ghost</span>
                  </div>
                  <span className="text-[#707070]">5 KILLS</span>
                </div>
              </div>

              {/* Security Pill Footer */}
              <div className="mt-4 pt-3 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-1 text-[11px] font-mono tracking-tight text-[#A0A0A0]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#3ECF8E]" strokeWidth={1.5} />
                  SHA-256 INTEGRITY
                </span>
                <span className="text-[#3ECF8E] font-bold tabular-nums">VERIFIED</span>
              </div>
            </div>
          </div>

          {/* Right: Verified Data Extraction Panel */}
          <div ref={telemetryRef} className="lg:col-span-5 hud-card rounded-card bg-[#171717] border border-white/[0.08] p-6 sm:p-8 space-y-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <IconOrb icon={Eye} tone="emerald" size="sm" />
                <h3 className="text-base font-bold font-heading text-[#EDEDED] uppercase tracking-wider">
                  Telemetry Extraction
                </h3>
              </div>
              <Badge tone="emerald" dot className="tabular-nums">
                {confidence}% CONFIDENCE
              </Badge>
            </div>

            <div className="space-y-3 font-mono text-xs tracking-tight tabular-nums">
              <div className="telemetry-row flex justify-between py-2 border-b border-white/[0.08]">
                <span className="text-[#707070]">IN-GAME NAME</span>
                <span className="text-[#EDEDED] font-bold">AX_Sniper</span>
              </div>

              <div className="telemetry-row flex justify-between py-2 border-b border-white/[0.08]">
                <span className="text-[#707070]">VERIFIED UID</span>
                <span className="text-[#EDEDED] font-bold">2849182390</span>
              </div>

              <div className="telemetry-row flex justify-between py-2 border-b border-white/[0.08]">
                <span className="text-[#707070]">CONFIRMED KILLS</span>
                <span className="text-[#EDEDED] font-bold">14 Kills (+70 PTS)</span>
              </div>

              <div className="telemetry-row flex justify-between py-2 border-b border-white/[0.08]">
                <span className="text-[#707070]">BOOYAH PLACEMENT</span>
                <span className="text-[#3ECF8E] font-bold">#1 Place (+20 PTS)</span>
              </div>

              <div className="telemetry-row flex justify-between py-2 border-b border-white/[0.08]">
                <span className="text-[#707070]">TOTAL COMBAT SCORE</span>
                <span className="text-[#EDEDED] font-extrabold text-sm">90 PTS</span>
              </div>

              <div className="telemetry-row p-3 rounded-control bg-[#041B10] border border-[#3ECF8E]/30 flex items-center gap-2 text-[#3ECF8E] font-bold text-xs shadow-[inset_0_1px_0_rgba(62,207,142,0.15)]">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                <span>Credited to Winning Wallet</span>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* COMBAT POINTS CALCULATOR (Simplified monochrome card)   */}
        {/* ======================================================== */}
        <div className="hud-card rounded-card bg-[#171717] border border-white/[0.08] p-6 sm:p-8 max-w-4xl mx-auto shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
            <div className="flex items-center gap-3">
              <IconOrb icon={Crosshair} tone="emerald" size="sm" />
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#EDEDED]">
                Combat Points Calculator
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Controls */}
            <div className="space-y-5">
              {/* Placement Toggle */}
              <div>
                <span className="text-xs font-mono font-bold uppercase text-[#707070] block mb-2">
                  Match Placement
                </span>
                <div className="grid grid-cols-2 gap-2 p-1 bg-bg-1/80 rounded-control border border-white/[0.08]">
                  <button
                    onClick={() => setIsBooyah(true)}
                    className={`min-h-[40px] py-2 px-3 rounded-control text-xs font-mono font-bold uppercase transition-all duration-200 active:scale-[0.98] cursor-pointer ${
                      isBooyah
                        ? 'bg-[#3ECF8E] text-[#041B10] font-semibold ring-1 ring-[#3ECF8E]/30 shadow-[0_1px_2px_rgba(0,0,0,0.24)]'
                        : 'text-[#A0A0A0] hover:text-[#EDEDED] hover:bg-[#1E201F]'
                    }`}
                  >
                    Booyah (+20 PTS)
                  </button>
                  <button
                    onClick={() => setIsBooyah(false)}
                    className={`min-h-[40px] py-2 px-3 rounded-control text-xs font-mono font-bold uppercase transition-all duration-200 active:scale-[0.98] cursor-pointer ${
                      !isBooyah
                        ? 'bg-[#3ECF8E] text-[#041B10] font-semibold ring-1 ring-[#3ECF8E]/30 shadow-[0_1px_2px_rgba(0,0,0,0.24)]'
                        : 'text-[#A0A0A0] hover:text-[#EDEDED] hover:bg-[#1E201F]'
                    }`}
                  >
                    Top 2–48 (0 PTS)
                  </button>
                </div>
              </div>

              {/* Kill Slider */}
              <div>
                <div className="flex justify-between items-center text-xs font-mono tracking-tight tabular-nums mb-2">
                  <span className="text-[#707070] uppercase font-bold flex items-center gap-1.5">
                    <Crosshair className="w-3.5 h-3.5 text-[#3ECF8E]" strokeWidth={1.5} />
                    Kills
                  </span>
                  <span className="text-[#EDEDED] font-bold">{kills} Kills ({kills * 5} PTS)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={kills}
                  onChange={(e) => setKills(parseInt(e.target.value, 10))}
                  aria-label="Match Kill Count"
                  className="w-full h-2.5 bg-[#121212] rounded-control appearance-none cursor-pointer accent-[#3ECF8E] hover:accent-[#34B27B] border border-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ECF8E]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212]"
                />
                <div className="flex justify-between text-[11px] font-mono tracking-tight tabular-nums text-[#707070] mt-1.5">
                  <span>0</span>
                  <span>5</span>
                  <span>10</span>
                  <span>15</span>
                  <span>20</span>
                </div>
              </div>
            </div>

            {/* Calculated Output with Rank Bar */}
            <div className="relative overflow-hidden p-5 rounded-card bg-[#121212] border border-[#3ECF8E]/30 space-y-4 shadow-[inset_0_1px_0_rgba(62,207,142,0.15)]">
              <div className="relative z-10 flex justify-between items-baseline">
                <div>
                  <span className="text-xs font-mono text-[#707070] uppercase block">Combat Score</span>
                  <span className="text-4xl font-extrabold font-heading text-[#EDEDED] tracking-tight tabular-nums">
                    {totalPoints} <span className="text-base text-[#3ECF8E] font-mono font-bold">PTS</span>
                  </span>
                </div>
                <div className="flex items-center gap-3 text-right">
                  <img
                    src={tier.badge}
                    alt={tier.name}
                    className="w-9 h-9 object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
                  />
                  <div>
                    <span className="text-sm font-bold text-[#EDEDED] block">{tier.name}</span>
                    <span className="text-[10px] font-mono text-[#3ECF8E] font-bold tabular-nums">
                      {tier.percent}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Rank Progress Bar (Emerald Only) */}
              <div className="relative z-10">
                <div className="w-full bg-[#1E201F] h-2 rounded-full overflow-hidden border border-white/[0.06]">
                  <div
                    className="bg-[#3ECF8E] h-full transition-all duration-300 shadow-[0_0_8px_rgba(62,207,142,0.4)]"
                    style={{ width: `${tier.percent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIVisionShowcase;
