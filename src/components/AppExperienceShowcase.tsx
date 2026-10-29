import { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Copy, Check, Eye, Shield, KeyRound } from 'lucide-react';
import { Pill } from './primitives/Pill';
import { Button } from './primitives/Button';

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
    title: 'Match Lobby & Credentials',
    tagline: 'Instant room locking with verified Free Fire UID matching.',
    desc: 'Room ID and Password unlock strictly 10–15 minutes before the match countdown. Only verified registered roster slots can enter.',
  },
  {
    id: 'ocr',
    num: '02',
    title: 'AI Vision Scoreboard OCR',
    tagline: 'End-match screenshots parsed and verified within seconds.',
    desc: 'Computer vision reads player in-game names, damage, kill tallies, and Booyah placement directly from victory screenshots with zero human host bias.',
  },
  {
    id: 'wallet',
    num: '03',
    title: 'Two-Vault Financial Rails',
    tagline: '1 AX Coin = 1 PKR Cash parity with 24-hour payouts.',
    desc: 'Entry balances are kept in the Play Wallet, while prize winnings credit automatically to the Winning Wallet, withdrawable to JazzCash or EasyPaisa.',
  },
];

export const AppExperienceShowcase = () => {
  const [activeTab, setActiveTab] = useState<'match' | 'ocr' | 'wallet'>('match');
  const [copiedRoomId, setCopiedRoomId] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

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
      className="relative bg-bg-1 py-[clamp(80px,10vw,140px)] border-b border-line overflow-hidden"
      aria-label="Inside the Mobile Client"
    >
      {/* Background Ambient Radial Glow (Emerald Only, Max 8%) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[500px] bg-accent/6 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Section Pill & Heading */}
        <div className="mb-12 sm:mb-16">
          <Pill dot={true} label="INSIDE THE ANDROID CLIENT" />
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-text-1 font-heading mt-4">
            Engineered For <span className="text-accent">Esports</span>
          </h2>
          <p className="text-base sm:text-lg text-text-2 max-w-2xl mt-3 leading-relaxed">
            Experience the actual tournament workflow built into our native Android application.
          </p>
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
                  onClick={() => setActiveTab(chapter.id as 'match' | 'ocr' | 'wallet')}
                  className={`p-6 sm:p-7 rounded-card transition-all duration-300 cursor-pointer border ${
                    isActive
                      ? 'bg-bg-2 border-line-accent shadow-broadcast'
                      : 'bg-transparent border-line hover:border-line-strong opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2.5">
                    <span
                      className={`text-xs font-mono font-bold tracking-widest ${
                        isActive ? 'text-accent' : 'text-text-3'
                      }`}
                    >
                      CHAPTER {chapter.num}
                    </span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-text-1 mb-2">
                    {chapter.title}
                  </h3>

                  <p className="text-sm font-medium text-accent mb-2">{chapter.tagline}</p>

                  <p className="text-sm text-text-2 leading-relaxed">{chapter.desc}</p>
                </div>
              );
            })}
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: CSS 3D SMARTPHONE (Signature Scene 1)      */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center perspective-1200">
            {/* Quick Interactive Screen Switcher Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-control bg-bg-2 border border-line mb-6 shadow-sm">
              {CHAPTERS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveTab(c.id as 'match' | 'ocr' | 'wallet')}
                  className={`min-h-[40px] px-3.5 py-1.5 rounded-control text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === c.id
                      ? 'bg-accent text-bg-1 shadow-sm'
                      : 'text-text-2 hover:text-text-1'
                  }`}
                >
                  {c.id === 'match' ? 'Lobby' : c.id === 'ocr' ? 'Scanner' : 'Wallet'}
                </button>
              ))}
            </div>

            {/* 3D Physical Smartphone Frame with CSS perspective */}
            <div
              ref={phoneRef}
              className="relative w-[300px] sm:w-[320px] max-w-[calc(100vw-3rem)] rounded-[44px] p-3 bg-gradient-to-b from-[#2A3035] via-[#1B1F22] to-[#101214] border-2 border-white/20 shadow-broadcast transition-transform duration-500 ease-out preserve-3d"
              style={{
                transform: 'rotateY(-12deg) rotateX(4deg)',
              }}
            >
              {/* Outer Phone Bezel Top Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-black rounded-b-2xl z-40 flex items-center justify-center">
                <div className="w-10 h-1.5 bg-[#2A3035] rounded-full" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#1A1F24] ml-2 border border-white/10" />
              </div>

              {/* Inner OLED Phone Screen */}
              <div className="rounded-[36px] bg-bg-0 overflow-hidden text-left relative flex flex-col justify-between min-h-[560px] border border-line">
                {/* Status Bar */}
                <div className="px-6 pt-3 pb-2 flex justify-between items-center text-xs font-semibold text-text-1 select-none">
                  <span className="font-mono">09:41</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-text-3">5G</span>
                    <div className="w-5 h-2.5 rounded-sm border border-white/50 p-0.5 flex items-center">
                      <div className="w-full h-full bg-accent rounded-[1px]" />
                    </div>
                  </div>
                </div>

                {/* In-App Content Header */}
                <div className="px-4 py-2 border-b border-line flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-accent-dim border border-line-accent flex items-center justify-center text-xs font-black text-accent">
                      AX
                    </div>
                    <div>
                      <span className="text-xs font-bold text-text-1 block">AX_Sniper</span>
                      <span className="text-[10px] text-accent font-mono flex items-center gap-1">
                        <img src="/ranks/grandmaster.webp?v=s4" alt="Grandmaster" className="w-3.5 h-3.5 object-contain inline" />
                        Grandmaster Contender
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-text-3 font-mono block">BALANCE</span>
                    <span className="text-xs font-extrabold text-text-1 font-mono">1,450 AX</span>
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

                  {/* TAB 1: Match Lobby */}
                  {!REAL_SCREENSHOTS[activeTab] && activeTab === 'match' && (
                    <div className="space-y-3 animate-in fade-in duration-200">
                      <div className="p-3.5 rounded-card bg-bg-2 border border-line">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-accent-dim text-accent uppercase">
                            Live Scrim
                          </span>
                          <span className="text-xs font-mono text-text-3">Starts 21:00 PKT</span>
                        </div>
                        <h4 className="text-sm font-extrabold text-text-1 font-heading">
                          Bermuda Championship #402
                        </h4>
                        <div className="flex justify-between text-xs text-text-2 mt-1">
                          <span>Entry: 50 AX</span>
                          <span className="text-accent font-bold">Prize: 2,160 AX</span>
                        </div>
                      </div>

                      {/* Locked vs Unlocked Credentials */}
                      <div className="p-3.5 rounded-card bg-bg-2 border border-line-accent space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-mono font-bold text-accent uppercase flex items-center gap-1.5">
                            <KeyRound className="w-3.5 h-3.5" />
                            Room Credentials
                          </span>
                          <span className="text-[10px] font-mono text-accent bg-accent-dim px-2 py-0.5 rounded">
                            Unlocked
                          </span>
                        </div>
                        <div className="p-2.5 rounded-control bg-bg-1 border border-line font-mono text-xs text-text-1 flex justify-between items-center">
                          <span>ID: 884921 | Pass: arena77</span>
                          <button
                            onClick={copyRoomDetails}
                            className="text-accent hover:text-accent-hover cursor-pointer p-1"
                            title="Copy credentials"
                          >
                            {copiedRoomId ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      <div className="p-3 rounded-card bg-bg-2 border border-line text-xs text-text-3 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-accent flex-shrink-0" />
                        <span>Room slots locked to verified player UIDs only.</span>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: OCR Scanner */}
                  {!REAL_SCREENSHOTS[activeTab] && activeTab === 'ocr' && (
                    <div className="space-y-3 animate-in fade-in duration-200">
                      <div className="p-3.5 rounded-card bg-bg-2 border border-line text-center">
                        <Eye className="w-6 h-6 text-accent mx-auto mb-1.5" />
                        <span className="text-xs font-mono font-bold text-text-1 uppercase block">
                          AI Scoreboard Verification
                        </span>
                        <p className="text-xs text-text-3 mt-1">Multi-player end-match score extraction</p>
                      </div>

                      <div className="p-3.5 rounded-card bg-bg-2 border border-line-accent space-y-1.5 text-xs font-mono">
                        <div className="flex justify-between py-1 border-b border-line">
                          <span className="text-text-3">PLAYER IGN</span>
                          <span className="text-text-1 font-bold">AX_Sniper</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-line">
                          <span className="text-text-3">BOOYAH RANK</span>
                          <span className="text-accent font-bold">#1 Place (+20 PTS)</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-line">
                          <span className="text-text-3">CONFIRMED KILLS</span>
                          <span className="text-text-1 font-bold">14 Kills (+70 PTS)</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-line">
                          <span className="text-text-3">MATCH SCORE</span>
                          <span className="text-accent font-bold">90 PTS Total</span>
                        </div>
                        <div className="flex justify-between items-center pt-1">
                          <span className="text-text-3">PROMOTED TIER</span>
                          <span className="text-text-1 font-bold flex items-center gap-1.5">
                            <img src="/ranks/heroic.webp?v=s4" alt="Heroic" className="w-4 h-4 object-contain inline" />
                            Heroic Tier I
                          </span>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-control bg-accent-dim border border-line-accent text-center text-xs text-accent font-mono font-bold">
                        Result Verified within Seconds
                      </div>
                    </div>
                  )}

                  {/* TAB 3: Two-Vault Wallet */}
                  {!REAL_SCREENSHOTS[activeTab] && activeTab === 'wallet' && (
                    <div className="space-y-3 animate-in fade-in duration-200">
                      {/* Play Wallet Card */}
                      <div className="p-3.5 rounded-card bg-bg-2 border border-line">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-text-3 font-mono uppercase font-bold">Play Wallet</span>
                          <span className="text-text-3 font-mono">Non-Withdrawable</span>
                        </div>
                        <span className="text-lg font-mono font-extrabold text-text-1 block">500 AX</span>
                        <p className="text-[11px] text-text-3 mt-1">Used for match entry fees & bonuses</p>
                      </div>

                      {/* Winning Wallet Card */}
                      <div className="p-3.5 rounded-card bg-bg-2 border border-line-accent">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-accent font-mono uppercase font-bold">Winning Wallet</span>
                          <span className="text-accent font-mono">100% Cash</span>
                        </div>
                        <span className="text-lg font-mono font-extrabold text-accent block">
                          950 AX (PKR 950)
                        </span>
                        <p className="text-[11px] text-text-2 mt-1">Available for 24h JazzCash/EasyPaisa cashout</p>
                      </div>

                      <div className="p-2.5 rounded-control bg-bg-2 border border-line text-center text-xs text-text-3 font-mono">
                        Protected by 6-digit Fund Password
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
