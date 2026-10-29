import { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, CheckCircle2, Crosshair, ShieldCheck } from 'lucide-react';
import { Pill } from './primitives/Pill';
import { Badge, HudCorners, IconOrb } from './primitives';

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
        // 1. Perspective tilt scroll scrub
        if (scoreboardRef.current) {
          gsap.fromTo(
            scoreboardRef.current,
            { rotateX: 20, rotateZ: -3, scale: 0.94 },
            {
              rotateX: 8,
              rotateZ: 0,
              scale: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                end: 'top 20%',
                scrub: 0.6,
              },
            }
          );
        }

        // 2. Scanline continuous sweep
        if (scanlineRef.current) {
          gsap.fromTo(
            scanlineRef.current,
            { top: '0%', opacity: 0.3 },
            {
              top: '95%',
              opacity: 1,
              repeat: -1,
              yoyo: true,
              duration: 2.2,
              ease: 'power2.inOut',
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
      className="py-[clamp(80px,10vw,140px)] bg-bg-0 border-b border-line relative overflow-hidden"
      aria-label="ArenaX Vision Engine"
    >
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <Pill dot={true} label="COMPUTER VISION OCR" />
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-text-1 font-heading mt-4">
            Zero <span className="text-accent">Disputes</span>
          </h2>
          <p className="text-base sm:text-lg text-text-2 max-w-2xl mt-3 leading-relaxed">
            Players upload the scoreboard. AI reads it. Winners get paid.
          </p>
        </div>

        {/* ======================================================== */}
        {/* SIGNATURE SCENE 2: SCOREBOARD IN PERSPECTIVE            */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Left: Perspective Scoreboard Display */}
          <div className="lg:col-span-7 perspective-1200 relative flex justify-center">
            {/* Emerald ambient bloom behind the OCR plane */}
            <div
              aria-hidden="true"
              className="ambient-glow left-1/2 top-1/2 h-[420px] w-[460px] -translate-x-1/2 -translate-y-1/2 opacity-80"
            />
            <div
              ref={scoreboardRef}
              className="relative z-10 w-full max-w-lg rounded-card bg-gradient-to-b from-bg-2/80 via-bg-2/70 to-bg-0/80 backdrop-blur-xl border border-white/[0.08] border-t-white/[0.12] p-5 sm:p-6 shadow-broadcast overflow-hidden preserve-3d"
              style={{
                transform: 'rotateX(14deg) rotateZ(-2deg)',
              }}
            >
              <HudCorners tone="emerald" size="md" inset />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent"
              />
              {/* Animated Emerald Scanline */}
              <div
                ref={scanlineRef}
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent z-30 pointer-events-none opacity-80"
                style={{ top: '38%' }}
              />

              {/* Simulated Free Fire Scoreboard Plane */}
              <div className="space-y-3">
                <div className="flex flex-wrap justify-between items-center gap-2 pb-3 border-b border-line text-xs font-mono tracking-tight tabular-nums">
                  <span className="text-emerald-400 font-bold">MATCH #402 • BERMUDA</span>
                  <Badge tone="emerald" dot pulse className="px-2 py-0 text-[9px]">
                    OCR STATUS: ACTIVE
                  </Badge>
                </div>

                {/* Scoreboard Row 1: Player with Bounding Box */}
                <div className="p-3 rounded-control bg-emerald-500/[0.04] border border-emerald-500/25 relative shadow-[inset_0_0_24px_-14px_rgba(16,185,129,0.65)]">
                  <div className="absolute -top-2 right-2 px-1.5 py-0.5 bg-accent text-bg-1 text-[9px] font-mono font-bold rounded">
                    <span className="hidden sm:inline">BOUNDING BOX: </span>UID MATCHED
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono tracking-tight tabular-nums">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded bg-accent-dim text-accent flex items-center justify-center font-bold text-[10px]">
                        #1
                      </span>
                      <span className="text-text-1 font-bold">AX_Sniper</span>
                      <span className="text-text-2 text-[10px] hidden sm:inline">(UID: 2849182390)</span>
                    </div>
                    <span className="text-emerald-400 font-bold">14 KILLS</span>
                  </div>
                </div>

                {/* Scoreboard Row 2 */}
                <div className="p-2.5 rounded-control bg-bg-1/70 border border-white/[0.07] flex justify-between items-center text-xs font-mono tracking-tight tabular-nums text-text-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-bg-3 text-text-2 flex items-center justify-center text-[10px]">
                      #2
                    </span>
                    <span>PK_Hunter</span>
                  </div>
                  <span className="text-text-2">8 KILLS</span>
                </div>

                {/* Scoreboard Row 3 */}
                <div className="p-2.5 rounded-control bg-bg-1/70 border border-white/[0.07] flex justify-between items-center text-xs font-mono tracking-tight tabular-nums text-text-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-bg-3 text-text-2 flex items-center justify-center text-[10px]">
                      #3
                    </span>
                    <span>Viper_Ghost</span>
                  </div>
                  <span className="text-text-2">5 KILLS</span>
                </div>
              </div>

              {/* Security Pill Footer */}
              <div className="mt-4 pt-3 border-t border-line flex flex-wrap items-center justify-between gap-1 text-[11px] font-mono tracking-tight text-text-2">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.5} />
                  Anti-Photoshop Verification
                </span>
                <span className="text-emerald-400 font-bold tabular-nums">SHA-256 Passed</span>
              </div>
            </div>
          </div>

          {/* Right: Verified Data Extraction Panel */}
          <div ref={telemetryRef} className="lg:col-span-5 hud-card p-6 sm:p-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-line">
              <div className="flex items-center gap-2.5">
                <IconOrb icon={Eye} tone="emerald" size="sm" />
                <h3 className="text-base font-bold font-heading text-text-1 uppercase tracking-wider">
                  Telemetry Extraction
                </h3>
              </div>
              <Badge tone="emerald" dot className="tabular-nums">
                {confidence}% AI CONFIDENCE
              </Badge>
            </div>

            <div className="space-y-3 font-mono text-xs tracking-tight tabular-nums">
              <div className="telemetry-row flex justify-between py-2 border-b border-line">
                <span className="text-text-2">IN-GAME NAME</span>
                <span className="text-text-1 font-bold">AX_Sniper</span>
              </div>

              <div className="telemetry-row flex justify-between py-2 border-b border-line">
                <span className="text-text-2">VERIFIED UID</span>
                <span className="text-text-1 font-bold">2849182390</span>
              </div>

              <div className="telemetry-row flex justify-between py-2 border-b border-line">
                <span className="text-text-2">CONFIRMED KILLS</span>
                <span className="text-text-1 font-bold">14 Kills (+70 PTS)</span>
              </div>

              <div className="telemetry-row flex justify-between py-2 border-b border-line">
                <span className="text-text-2">BOOYAH PLACEMENT</span>
                <span className="text-emerald-400 font-bold">#1 Place (+20 PTS)</span>
              </div>

              <div className="telemetry-row flex justify-between py-2 border-b border-line">
                <span className="text-text-2">TOTAL COMBAT SCORE</span>
                <span className="text-text-1 font-extrabold text-sm">90 PTS</span>
              </div>

              <div className="telemetry-row p-3 rounded-control bg-emerald-500/10 border border-emerald-500/25 flex items-center gap-2 text-emerald-400 font-bold text-xs shadow-[inset_0_0_24px_-14px_rgba(16,185,129,0.7)]">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                <span>Credited to Winning Wallet</span>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* COMBAT POINTS CALCULATOR (Simplified monochrome card)   */}
        {/* ======================================================== */}
        <div className="hud-card p-6 sm:p-8 rounded-card max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-line gap-2 mb-6">
            <div className="flex items-center gap-3">
              <IconOrb icon={Crosshair} tone="emerald" size="sm" />
              <div>
                <span className="text-xs font-mono font-bold uppercase text-emerald-400 tracking-widest block">
                  OFFICIAL SCORING FORMULA
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-text-1 mt-1">
                  Combat Points Calculator
                </h3>
              </div>
            </div>
            <span className="text-xs font-mono tracking-tight tabular-nums text-text-2">
              1 Booyah = 20 PTS  •  1 Kill = 5 PTS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Controls */}
            <div className="space-y-5">
              {/* Placement Toggle */}
              <div>
                <span className="text-xs font-mono font-bold uppercase text-text-2 block mb-2">
                  Match Placement
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setIsBooyah(true)}
                    className={`min-h-[44px] py-2.5 px-3 rounded-control text-xs font-mono font-bold uppercase transition-all duration-200 active:scale-[0.98] active:duration-100 cursor-pointer ${
                      isBooyah
                        ? 'bg-accent text-bg-1 shadow-[0_0_20px_-6px_rgba(16,185,129,0.55)] ring-1 ring-emerald-300/30'
                        : 'bg-bg-1/70 text-text-2 border border-white/[0.08] hover:border-emerald-500/25 hover:text-text-1'
                    }`}
                  >
                    Booyah (+20 PTS)
                  </button>
                  <button
                    onClick={() => setIsBooyah(false)}
                    className={`min-h-[44px] py-2.5 px-3 rounded-control text-xs font-mono font-bold uppercase transition-all duration-200 active:scale-[0.98] active:duration-100 cursor-pointer ${
                      !isBooyah
                        ? 'bg-accent text-bg-1 shadow-[0_0_20px_-6px_rgba(16,185,129,0.55)] ring-1 ring-emerald-300/30'
                        : 'bg-bg-1/70 text-text-2 border border-white/[0.08] hover:border-emerald-500/25 hover:text-text-1'
                    }`}
                  >
                    Top 2–48 (0 PTS)
                  </button>
                </div>
              </div>

              {/* Kill Slider */}
              <div>
                <div className="flex justify-between items-center text-xs font-mono tracking-tight tabular-nums mb-2">
                  <span className="text-text-2 uppercase font-bold flex items-center gap-1.5">
                    <Crosshair className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.5} />
                    Kills (5 PTS Each)
                  </span>
                  <span className="text-text-1 font-bold">{kills} Kills ({kills * 5} PTS)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={kills}
                  onChange={(e) => setKills(parseInt(e.target.value, 10))}
                  aria-label="Match Kill Count"
                  className="w-full h-2.5 bg-bg-1 rounded-control appearance-none cursor-pointer accent-accent"
                />
                <div className="flex justify-between text-[11px] font-mono tracking-tight tabular-nums text-text-2 mt-1.5">
                  <span>0</span>
                  <span>5</span>
                  <span>10</span>
                  <span>15</span>
                  <span>20 Kills</span>
                </div>
              </div>
            </div>

            {/* Calculated Output with Rank Bar */}
            <div className="relative overflow-hidden p-5 rounded-card bg-gradient-to-b from-bg-1 to-bg-0 border border-emerald-500/20 space-y-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <HudCorners tone="emerald" size="sm" inset />
              <div className="relative z-10 flex justify-between items-baseline">
                <div>
                  <span className="text-xs font-mono text-text-2 uppercase block">Calculated Rating</span>
                  <span className="text-4xl font-extrabold font-heading text-text-1 tracking-tight tabular-nums">
                    {totalPoints} <span className="text-base text-emerald-400 font-mono font-bold">PTS</span>
                  </span>
                </div>
                <div className="flex items-center gap-3 text-right">
                  <img
                    src={tier.badge}
                    alt={tier.name}
                    className="w-9 h-9 object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
                  />
                  <div>
                    <span className="text-[10px] font-mono uppercase text-text-2 block">Projected Tier</span>
                    <span className="text-sm font-bold text-text-1">{tier.name}</span>
                  </div>
                </div>
              </div>

              {/* Rank Progress Bar (Emerald Only) */}
              <div className="relative z-10 space-y-1">
                <div className="w-full bg-bg-3 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-accent h-full transition-all duration-300 shadow-[0_0_12px_rgba(16,185,129,0.55)]"
                    style={{ width: `${tier.percent}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-text-2 block text-right">
                  Based on official rulebook formula
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIVisionShowcase;
