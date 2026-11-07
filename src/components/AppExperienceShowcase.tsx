import { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Copy, Check, Eye, Shield, KeyRound } from 'lucide-react';
import { Button } from './primitives/Button';
import { Badge, IconOrb } from './primitives';

gsap.registerPlugin(ScrollTrigger);

// Real screenshots fallback configuration (place images in public/screens/ if available):
const REAL_SCREENSHOTS: Record<string, string | null> = {
  match: null,  // e.g. '/screens/lobby.webp'
  ocr: null,    // e.g. '/screens/scanner.webp'
  wallet: null, // e.g. '/screens/wallet.webp'
};

const CHAPTERS = [
  {
    id: 'match',
    num: '01',
    title: 'Match Credentials',
    desc: 'Automated room credential dispatch 15 minutes before match countdown. Roster-locked entry for verified player UIDs.',
  },
  {
    id: 'ocr',
    num: '02',
    title: 'AI Scoreboard',
    desc: 'Computer vision extraction of player IGNs, placement rank, and kill counts directly from end-match screenshots.',
  },
  {
    id: 'wallet',
    num: '03',
    title: 'Dual-Vault Escrow',
    desc: 'Segregated Play Wallet entry escrow and automated Winning Wallet prize routing with direct local cashout.',
  },
];

const ROTATION_MAP: Record<string, { rotY: number; rotX: number; transZ: number }> = {
  match: { rotY: -18, rotX: 6, transZ: 0 },
  ocr: { rotY: -2, rotX: 1, transZ: 35 },
  wallet: { rotY: 14, rotX: -4, transZ: 0 },
};

export const AppExperienceShowcase = () => {
  const [activeTab, setActiveTab] = useState<'match' | 'ocr' | 'wallet'>('match');
  const [copiedRoomId, setCopiedRoomId] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  const handleTabSwitch = (tab: 'match' | 'ocr' | 'wallet') => {
    setActiveTab(tab);
    if (phoneRef.current && window.innerWidth >= 1024) {
      const { rotY, rotX, transZ } = ROTATION_MAP[tab];
      phoneRef.current.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg) translateZ(${transZ}px)`;
    } else if (phoneRef.current) {
      phoneRef.current.style.transform = 'none';
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const pinTrigger = ScrollTrigger.create({
          trigger: containerRef.current,
          pin: true,
          start: 'top top',
          end: '+=160%',
          scrub: 0.5,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.35) {
              setActiveTab('match');
            } else if (p < 0.7) {
              setActiveTab('ocr');
            } else {
              setActiveTab('wallet');
            }

            if (phoneRef.current) {
              const rotY = -18 + p * 32; // -18deg to +14deg
              const rotX = 6 - p * 10;   // 6deg to -4deg
              const transZ = Math.sin(p * Math.PI) * 35;
              phoneRef.current.style.transform = `rotateY(${rotY.toFixed(1)}deg) rotateX(${rotX.toFixed(1)}deg) translateZ(${transZ.toFixed(0)}px)`;
            }
          },
        });

        return () => pinTrigger.kill();
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const copyRoomDetails = () => {
    navigator.clipboard?.writeText('Room ID: 884921 | Password: arena77');
    setCopiedRoomId(true);
    setTimeout(() => setCopiedRoomId(false), 2500);
  };

  return (
    <section
      id="app-showcase"
      ref={containerRef}
      className="relative bg-[#121212] py-[clamp(80px,10vw,140px)] border-b border-white/[0.08] overflow-hidden"
      aria-label="Inside the Mobile Client"
    >
      {/* Background Ambient Radial Glow (Emerald Only, Max 6%) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(62,207,142,0.06)_0%,rgba(62,207,142,0)_70%)] blur-[120px]" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#EDEDED] font-heading">
            Engineered For <span className="text-[#3ECF8E]">Esports</span>
          </h2>
        </div>

        {/* 2-Column Chapter Composition: Left Text Chapters, Right 3D Phone */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* ======================================================== */}
          {/* LEFT COLUMN: 3 CHAPTERS                                  */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 space-y-6">
            {CHAPTERS.map((chapter) => {
              const isActive = activeTab === chapter.id;

              return (
                <div
                  key={chapter.id}
                  onClick={() => handleTabSwitch(chapter.id as 'match' | 'ocr' | 'wallet')}
                  className={`group relative overflow-hidden p-6 sm:p-7 rounded-card transition-all duration-200 cursor-pointer border ${isActive
                      ? 'bg-[#171717] border-[#3ECF8E]/35 shadow-[0_18px_40px_-18px_rgba(62,207,142,0.18),inset_0_1px_0_rgba(62,207,142,0.15)]'
                      : 'bg-[#171717] border-white/[0.08] hover:border-white/20 hover:bg-[#1E201F] opacity-65 hover:opacity-100 hover:-translate-y-0.5'
                    }`}
                >
                  {isActive && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3ECF8E]/40 to-transparent"
                    />
                  )}
                  <div className="flex items-center gap-3 mb-2.5">
                    <span
                      className={`text-xs font-mono font-bold tracking-widest tabular-nums ${isActive ? 'text-[#3ECF8E]' : 'text-[#707070]'
                        }`}
                    >
                      /{chapter.num}
                    </span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#3ECF8E] animate-pulse" />}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#EDEDED] mb-2">
                    {chapter.title}
                  </h3>

                  <p className="text-sm text-[#A0A0A0] leading-relaxed font-sans font-normal">{chapter.desc}</p>
                </div>
              );
            })}
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: CSS 3D SMARTPHONE (Signature Scene 1)      */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center perspective-1200">
            {/* Subtle radial backlight behind phone */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-[56%] h-[480px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(62,207,142,0.06)_0%,rgba(62,207,142,0)_70%)] blur-[90px]"
            />
            {/* Quick Interactive Screen Switcher Tabs */}
            <div className="relative z-10 flex items-center gap-1.5 p-1 rounded-control bg-[#171717] border border-white/[0.08] mb-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              {CHAPTERS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleTabSwitch(c.id as 'match' | 'ocr' | 'wallet')}
                  className={`min-h-[40px] px-3.5 py-1.5 rounded-control text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 active:scale-[0.98] active:duration-100 cursor-pointer ${activeTab === c.id
                      ? 'bg-[#3ECF8E] text-[#041B10] font-semibold ring-1 ring-[#3ECF8E]/30 shadow-[0_1px_3px_rgba(62,207,142,0.35)]'
                      : 'text-[#A0A0A0] hover:text-[#EDEDED] hover:bg-[#1E201F]'
                    }`}
                >
                  {c.id === 'match' ? 'Lobby' : c.id === 'ocr' ? 'Scanner' : 'Wallet'}
                </button>
              ))}
            </div>

            {/* 3D Physical Smartphone Frame with CSS perspective */}
            <div
              ref={phoneRef}
              className="relative z-10 w-[300px] sm:w-[320px] max-w-[calc(100vw-3rem)] rounded-[44px] p-3 bg-gradient-to-b from-[#222423] via-[#171817] to-[#121212] border border-white/[0.12] ring-1 ring-white/[0.06] shadow-[0_24px_64px_-16px_rgba(0,0,0,0.85),0_0_32px_-8px_rgba(62,207,142,0.12)] transition-transform duration-500 ease-out preserve-3d"
              style={{
                transform: globalThis.window && globalThis.window.innerWidth < 1024 ? 'none' : 'rotateY(-18deg) rotateX(6deg)',
              }}
            >
              {/* Android Top Punch-Hole Camera */}
              <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-black/90 ring-1 ring-white/10 z-40 flex items-center justify-center pointer-events-none">
                <div className="w-1 h-1 rounded-full bg-[#181918]" />
              </div>

              {/* Inner OLED Phone Screen */}
              <div className="rounded-[36px] bg-[#0E0F0E] overflow-hidden text-left relative flex flex-col justify-between min-h-[560px] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                {/* Authentic Android Esports Status Bar */}
                <div className="px-5 pt-2.5 pb-2 flex justify-between items-center text-[11px] font-medium text-[#EDEDED] select-none">
                  <span className="font-mono tracking-tight tabular-nums text-[#A0A0A0]">20:45</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[#3ECF8E]">12ms</span>
                    <span className="text-[10px] font-mono text-[#707070]">5G</span>
                    <div className="w-4 h-2 rounded-[2px] border border-white/40 p-0.5 flex items-center">
                      <div className="w-full h-full bg-[#3ECF8E] rounded-[1px]" />
                    </div>
                  </div>
                </div>

                {/* In-App Content Header */}
                <div className="px-4 py-2 border-b border-white/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#041B10] border border-[#3ECF8E]/30 flex items-center justify-center text-xs font-black text-[#3ECF8E]">
                      AX
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#EDEDED] block">AX_Sniper</span>
                      <span className="text-[10px] text-[#3ECF8E] font-mono flex items-center gap-1">
                        <img src="/ranks/grandmaster.webp?v=s4" alt="Grandmaster" className="w-3.5 h-3.5 object-contain inline" />
                        Grandmaster
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-extrabold text-[#EDEDED] font-mono tracking-tight tabular-nums block">1,450 AX</span>
                    <span className="text-[9px] text-[#3ECF8E] font-mono tracking-wider uppercase">Verified</span>
                  </div>
                </div>

                {/* Screen Content: Real screenshot fallback to coded UI */}
                <div className="p-4 flex-grow flex flex-col justify-between">
                  {REAL_SCREENSHOTS[activeTab] ? (
                    <img
                      src={REAL_SCREENSHOTS[activeTab]!}
                      alt="ArenaX App Screen"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : null}

                  {/* TAB 1: Match Credentials */}
                  {!REAL_SCREENSHOTS[activeTab] && activeTab === 'match' && (
                    <div className="space-y-3 animate-in fade-in duration-200">
                      <div className="p-3.5 rounded-card bg-[#171717] border border-white/[0.08] relative overflow-hidden">
                        <div className="flex justify-between items-center mb-1.5 gap-2">
                          <Badge tone="emerald" dot pulse className="px-2 py-0 text-[9px]">
                            Live Scrim
                          </Badge>
                          <span className="text-xs font-mono tracking-tight tabular-nums text-[#707070]">21:00 PKT</span>
                        </div>
                        <h4 className="text-sm font-extrabold text-[#EDEDED] font-heading">
                          Bermuda Championship #402
                        </h4>
                        <div className="flex justify-between text-xs font-mono tracking-tight tabular-nums text-[#707070] mt-1">
                          <span>Entry: 50 AX</span>
                          <span className="text-[#3ECF8E] font-bold">Prize: 2,160 AX</span>
                        </div>
                      </div>

                      {/* Locked vs Unlocked Credentials */}
                      <div className="p-3.5 rounded-card bg-[#171717] border border-[#3ECF8E]/30 space-y-2 shadow-[inset_0_1px_0_rgba(62,207,142,0.15)]">
                        <div className="flex flex-wrap justify-between items-center gap-2">
                          <span className="text-xs font-mono font-bold text-[#3ECF8E] uppercase flex items-center gap-1.5">
                            <KeyRound className="w-3.5 h-3.5" strokeWidth={1.5} />
                            Room Credentials
                          </span>
                          <Badge tone="emerald" dot className="px-2 py-0 text-[9px]">
                            Unlocked
                          </Badge>
                        </div>
                        <div className="p-2.5 rounded-control bg-[#121212] border border-white/[0.08] font-mono text-xs tracking-tight tabular-nums text-[#EDEDED] flex justify-between items-center">
                          <span>ID: 884921 | Pass: arena77</span>
                          <button
                            onClick={copyRoomDetails}
                            className="text-[#3ECF8E] hover:text-[#34B27B] cursor-pointer p-3.5 -m-3.5 transition-colors duration-100 active:scale-90"
                            title="Copy credentials"
                            aria-label="Copy room credentials"
                          >
                            {copiedRoomId ? <Check className="w-3.5 h-3.5" strokeWidth={1.5} /> : <Copy className="w-3.5 h-3.5" strokeWidth={1.5} />}
                          </button>
                        </div>
                      </div>

                      {/* Self-Evident Slot Verification Status */}
                      <div className="p-2.5 rounded-card bg-[#121212] border border-white/[0.08] flex items-center justify-between text-xs font-mono">
                        <div className="flex items-center gap-2">
                          <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border border-[#3ECF8E]/30 bg-[#041B10]">
                            <Shield className="w-3.5 h-3.5 text-[#3ECF8E]" strokeWidth={1.5} />
                          </span>
                          <span className="text-[#EDEDED] font-semibold">Slot #12 Locked</span>
                        </div>
                        <span className="text-[#3ECF8E] tabular-nums">UID 94829104</span>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: AI Scoreboard */}
                  {!REAL_SCREENSHOTS[activeTab] && activeTab === 'ocr' && (
                    <div className="space-y-3 animate-in fade-in duration-200">
                      <div className="p-3.5 rounded-card bg-[#171717] border border-white/[0.08] text-center">
                        <div className="flex justify-center mb-1.5">
                          <IconOrb icon={Eye} tone="emerald" size="sm" />
                        </div>
                        <span className="text-xs font-mono font-bold text-[#EDEDED] uppercase tracking-wide block">
                          AI Scoreboard
                        </span>
                      </div>

                      <div className="p-3.5 rounded-card bg-[#171717] border border-[#3ECF8E]/30 space-y-1.5 text-xs font-mono tracking-tight tabular-nums shadow-[inset_0_1px_0_rgba(62,207,142,0.15)]">
                        <div className="flex justify-between py-1 border-b border-white/[0.08]">
                          <span className="text-[#707070]">PLAYER IGN</span>
                          <span className="text-[#EDEDED] font-bold">AX_Sniper</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/[0.08]">
                          <span className="text-[#707070]">BOOYAH RANK</span>
                          <span className="text-[#3ECF8E] font-bold">#1 (+20 PTS)</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/[0.08]">
                          <span className="text-[#707070]">CONFIRMED KILLS</span>
                          <span className="text-[#EDEDED] font-bold">14 (+70 PTS)</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/[0.08]">
                          <span className="text-[#707070]">MATCH SCORE</span>
                          <span className="text-[#3ECF8E] font-bold">90 PTS Total</span>
                        </div>
                        <div className="flex justify-between items-center pt-1">
                          <span className="text-[#707070]">PROMOTED TIER</span>
                          <span className="text-[#EDEDED] font-bold flex items-center gap-1.5">
                            <img src="/ranks/heroic.webp?v=s4" alt="Heroic" className="w-4 h-4 object-contain inline" />
                            Heroic Tier I
                          </span>
                        </div>
                      </div>

                      {/* Authentic Verification Telemetry */}
                      <div className="flex items-center justify-between px-2 text-[11px] font-mono text-[#707070]">
                        <span>Latency: 1.2s</span>
                        <Badge tone="emerald" dot className="px-2 py-0 text-[9px]">
                          Certified
                        </Badge>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: Dual-Vault Escrow */}
                  {!REAL_SCREENSHOTS[activeTab] && activeTab === 'wallet' && (
                    <div className="space-y-3 animate-in fade-in duration-200">
                      {/* Play Wallet Card */}
                      <div className="p-3.5 rounded-card bg-[#171717] border border-white/[0.08]">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="text-[#A0A0A0] font-mono uppercase font-bold">Play Wallet</span>
                          <Badge tone="neutral" className="px-1.5 py-0 text-[9px]">Entry Vault</Badge>
                        </div>
                        <span className="text-lg font-mono font-extrabold text-[#EDEDED] block tracking-tight tabular-nums">
                          500 AX
                        </span>
                      </div>

                      {/* Winning Wallet Card */}
                      <div className="p-3.5 rounded-card bg-[#171717] border border-[#3ECF8E]/30 shadow-[inset_0_1px_0_rgba(62,207,142,0.15)]">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="text-[#3ECF8E] font-mono uppercase font-bold">Winning Wallet</span>
                          <Badge tone="emerald" dot className="px-1.5 py-0 text-[9px]">Withdrawable</Badge>
                        </div>
                        <span className="text-lg font-mono font-extrabold text-[#3ECF8E] block tracking-tight tabular-nums">
                          950 AX <span className="text-xs text-[#707070] font-normal font-sans">(PKR 950)</span>
                        </span>
                      </div>

                      {/* Security Telemetry */}
                      <div className="flex items-center justify-between p-2 rounded-control bg-[#121212] border border-white/[0.08] text-xs font-mono text-[#707070]">
                        <span className="flex items-center gap-1.5">
                          <Shield className="w-3.5 h-3.5 text-[#3ECF8E]" />
                          Fund Security
                        </span>
                        <span className="text-[#3ECF8E]">PIN Enabled</span>
                      </div>
                    </div>
                  )}

                  {/* Bottom Phone Action CTA */}
                  <div className="pt-2">
                    <Button
                      variant="primary"
                      size="sm"
                      fullWidth
                      onClick={() => document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Join Scrim in App
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppExperienceShowcase;
