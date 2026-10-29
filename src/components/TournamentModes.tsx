import { useState } from 'react';
import { Trophy, Swords, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import { Pill } from './primitives/Pill';
import { Button } from './primitives/Button';
import { Badge, HudCorners, IconOrb } from './primitives';

export const TournamentModes = () => {
  const [activeTab, setActiveTab] = useState<'bermuda' | 'clashsquad'>('bermuda');
  const [bermudaFormat, setBermudaFormat] = useState<'solo' | 'duo' | 'squad'>('squad');
  const [csStage, setCsStage] = useState<'quarters' | 'semis' | 'finals'>('semis');
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0, px: 50, py: 50 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
    const px = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const py = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setCardTilt({ x, y, px, py });
  };

  const handleCardMouseLeave = () => {
    setCardTilt({ x: 0, y: 0, px: 50, py: 50 });
  };

  const bermudaData = {
    solo: {
      formatTitle: 'Solo Survival (48 Players)',
      slots: '48 / 48 Slots',
      entry: '50 AX (50 PKR)',
      prizePool: '2,160 AX Cash',
      desc: 'Individual survival glory. Every player fights for themselves.',
    },
    duo: {
      formatTitle: 'Duo Combat (24 Teams)',
      slots: '24 Teams (48 Players)',
      entry: '100 AX / Team',
      prizePool: '2,160 AX Cash',
      desc: 'Pair up with your trusted partner using 6-digit squad codes.',
    },
    squad: {
      formatTitle: 'Squad 4v4v4 (12 Teams)',
      slots: '12 Squads (48 Players)',
      entry: '200 AX / Squad',
      prizePool: '2,160 AX Cash',
      desc: 'Full 4-player team coordination. Captains manage rosters.',
    },
  };

  const currentBermuda = bermudaData[bermudaFormat];

  const scrollToDownload = () => {
    document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="tournaments"
      className="py-[clamp(80px,10vw,140px)] bg-bg-1 border-b border-line relative overflow-hidden"
      aria-label="Tournament Modes"
    >
      {/* Low-opacity environmental glow behind the HUD surfaces */}
      <div
        aria-hidden="true"
        className="ambient-glow -top-24 right-[6%] h-[460px] w-[460px] opacity-70"
      />
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <Pill dot={true} label="SANCTIONED FORMATS" />
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-text-1 font-heading mt-4">
            Battle for the <span className="text-accent">Booyah</span>
          </h2>
          <p className="text-base sm:text-lg text-text-2 max-w-2xl mt-3 leading-relaxed">
            Choose your battlefield format. Whether a 48-player survival gauntlet or tactical 4v4 round brackets, every match is verified by AI vision.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="relative flex p-1 rounded-control bg-bg-2/80 backdrop-blur-xl border border-white/[0.08] mt-8 max-w-md gap-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <button
              onClick={() => setActiveTab('bermuda')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-control text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 active:scale-[0.98] active:duration-100 cursor-pointer ${
                activeTab === 'bermuda'
                  ? 'bg-accent text-bg-1 shadow-[0_0_20px_-6px_rgba(16,185,129,0.55)] ring-1 ring-emerald-300/30'
                  : 'text-text-2 hover:bg-white/[0.04] hover:text-text-1'
              }`}
            >
              <Trophy className="w-4 h-4" strokeWidth={1.5} />
              <span>Bermuda BR (48P)</span>
            </button>
            <button
              onClick={() => setActiveTab('clashsquad')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-control text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 active:scale-[0.98] active:duration-100 cursor-pointer ${
                activeTab === 'clashsquad'
                  ? 'bg-accent text-bg-1 shadow-[0_0_20px_-6px_rgba(16,185,129,0.55)] ring-1 ring-emerald-300/30'
                  : 'text-text-2 hover:bg-white/[0.04] hover:text-text-1'
              }`}
            >
              <Swords className="w-4 h-4" strokeWidth={1.5} />
              <span>Clash Squad (4v4)</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: BERMUDA BATTLE ROYALE                             */}
        {/* ======================================================== */}
        {activeTab === 'bermuda' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Clean Rules List */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-mono font-bold uppercase text-accent tracking-widest block mb-1">
                  SURVIVAL FORMAT
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-text-1 font-heading">
                  Bermuda 48-Player Survival
                </h3>
                <p className="text-sm sm:text-base text-text-2 mt-2 leading-relaxed">
                  Drop into Bermuda in Solo, Duo, or Squad formats. Compete against verified players for real cash prize pools. Authoritative scoring: 20 points for Booyah and 5 points per kill.
                </p>
              </div>

              {/* Rules List with Hairlines */}
              <div className="divide-y divide-line border-y border-line">
                <div className="py-3.5 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <span className="text-sm font-bold text-text-1 block">Verified Roster Matchmaking</span>
                    <span className="text-xs text-text-2">Slots lock strictly to registered in-game UIDs.</span>
                  </div>
                </div>

                <div className="py-3.5 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <span className="text-sm font-bold text-text-1 block">Automated AI Vision Verification</span>
                    <span className="text-xs text-text-2">Scoreboard screenshots parsed and verified within seconds.</span>
                  </div>
                </div>

                <div className="py-3.5 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <span className="text-sm font-bold text-text-1 block">Automated Refund Guarantee</span>
                    <span className="text-xs text-text-2">100% fee refunded to Play Wallet if a match fails to start.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  onClick={scrollToDownload}
                  icon={<ArrowRight className="w-4 h-4" strokeWidth={1.5} />}
                >
                  Join Next Bermuda Scrim
                </Button>
              </div>
            </div>

            {/* Right: 3D Specular Tilt Card */}
            <div
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${cardTilt.y}deg) rotateY(${cardTilt.x}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
              className="lg:col-span-5 hud-card p-6 sm:p-7 space-y-5 relative overflow-hidden group hover:border-emerald-500/40 hover:shadow-lift-strong"
            >
              <HudCorners tone="emerald" size="md" inset />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent"
              />
              {/* Dynamic Radial Highlight Tracking Mouse */}
              <div
                className="absolute inset-0 pointer-events-none rounded-card opacity-30 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle 280px at ${cardTilt.px}% ${cardTilt.py}%, rgba(0, 200, 120, 0.15), transparent 70%)`,
                }}
              />

              <div className="relative z-10 flex flex-wrap justify-between items-center gap-3 pb-3 border-b border-line">
                <div className="flex items-center gap-3">
                  <IconOrb icon={Trophy} tone="emerald" size="sm" />
                  <div>
                    <span className="text-[11px] font-mono text-emerald-400 uppercase font-bold tracking-wider block">
                      Interactive Preset
                    </span>
                    <h4 className="text-text-1 font-bold text-lg font-heading">Bermuda Championship #104</h4>
                  </div>
                </div>
                <Badge tone="emerald" dot pulse>
                  Live
                </Badge>
              </div>

              {/* Sub-format switcher */}
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-bg-1/80 backdrop-blur-xl rounded-control border border-white/[0.08]">
                {(['solo', 'duo', 'squad'] as const).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setBermudaFormat(fmt)}
                    className={`py-1.5 rounded-control text-xs font-mono font-bold uppercase transition-all duration-200 active:scale-[0.98] active:duration-100 cursor-pointer ${
                      bermudaFormat === fmt
                        ? 'bg-accent text-bg-1 shadow-[0_0_18px_-6px_rgba(16,185,129,0.55)] ring-1 ring-emerald-300/30'
                        : 'text-text-2 hover:bg-white/[0.04] hover:text-text-1'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>

              <div className="space-y-2 text-xs font-mono tracking-tight tabular-nums">
                <div className="flex justify-between py-2 border-b border-line">
                  <span className="text-text-2">ROSTER</span>
                  <span className="text-text-1 font-bold">{currentBermuda.formatTitle}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-line">
                  <span className="text-text-2">SLOTS</span>
                  <span className="text-emerald-400 font-bold">{currentBermuda.slots}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-line">
                  <span className="text-text-2">ENTRY FEE</span>
                  <span className="text-text-1 font-bold">{currentBermuda.entry}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-text-2">PRIZE POOL</span>
                  <span className="text-emerald-400 font-bold text-sm">{currentBermuda.prizePool}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-control glass-panel space-y-1.5 text-xs font-mono tracking-tight tabular-nums">
                <div className="flex flex-wrap justify-between items-center gap-2 font-bold">
                  <span className="text-text-2 flex items-center gap-1.5">
                    Room Capacity
                  </span>
                  <Badge tone="emerald" dot pulse>
                    44 / 48 (91%)
                  </Badge>
                </div>
                <div className="w-full bg-bg-3 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-accent h-full w-[91%] shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: CLASH SQUAD 4v4                                   */}
        {/* ======================================================== */}
        {activeTab === 'clashsquad' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Clean Rules List */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-mono font-bold uppercase text-accent tracking-widest block mb-1">
                  BRACKET ELIMINATION
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-text-1 font-heading">
                  Clash Squad 4v4 Tournament Brackets
                </h3>
                <p className="text-sm sm:text-base text-text-2 mt-2 leading-relaxed">
                  High-intensity squad tactical combat. Compete in single-elimination tournament brackets with automated round progression from Quarterfinals all the way to the Grand Finals.
                </p>
              </div>

              <div className="divide-y divide-line border-y border-line">
                <div className="py-3.5 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <span className="text-sm font-bold text-text-1 block">Live Bracket Tree Visualization</span>
                    <span className="text-xs text-text-2">Round progression tracked directly inside the mobile app.</span>
                  </div>
                </div>

                <div className="py-3.5 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <span className="text-sm font-bold text-text-1 block">6-Digit Squad Codes</span>
                    <span className="text-xs text-text-2">Captains assemble their 4-player lineup in seconds.</span>
                  </div>
                </div>

                <div className="py-3.5 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <span className="text-sm font-bold text-text-1 block">Direct Cashout Settlement</span>
                    <span className="text-xs text-text-2">Winning prize credits directly to Winning Wallet upon Finals victory.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  onClick={scrollToDownload}
                  icon={<ArrowRight className="w-4 h-4" strokeWidth={1.5} />}
                >
                  Enter 4v4 Bracket
                </Button>
              </div>
            </div>

            {/* Right: 3D Specular Tilt Card */}
            <div
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${cardTilt.y}deg) rotateY(${cardTilt.x}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
              className="lg:col-span-5 hud-card p-6 sm:p-7 space-y-5 relative overflow-hidden group hover:border-emerald-500/40 hover:shadow-lift-strong"
            >
              <HudCorners tone="emerald" size="md" inset />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent"
              />
              <div
                className="absolute inset-0 pointer-events-none rounded-card opacity-30 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle 280px at ${cardTilt.px}% ${cardTilt.py}%, rgba(0, 200, 120, 0.15), transparent 70%)`,
                }}
              />

              <div className="relative z-10 flex flex-wrap justify-between items-center gap-3 pb-3 border-b border-line">
                <div>
                  <span className="text-[11px] font-mono text-emerald-400 uppercase font-bold tracking-wider block">
                    Interactive Tree
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10">
                      <img
                        src="/ranks/master.webp?v=s4"
                        alt="Master Rank"
                        className="w-4 h-4 object-contain drop-shadow"
                      />
                    </span>
                    <h4 className="text-text-1 font-bold text-lg font-heading">CS Masters Cup</h4>
                  </div>
                </div>
                <Badge tone="emerald" dot>
                  Bracket
                </Badge>
              </div>

              {/* Stage Selector */}
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-bg-1/80 backdrop-blur-xl rounded-control border border-white/[0.08]">
                {(['quarters', 'semis', 'finals'] as const).map((stage) => (
                  <button
                    key={stage}
                    onClick={() => setCsStage(stage)}
                    className={`py-1.5 rounded-control text-xs font-mono font-bold uppercase transition-all duration-200 active:scale-[0.98] active:duration-100 cursor-pointer ${
                      csStage === stage
                        ? 'bg-accent text-bg-1 shadow-[0_0_18px_-6px_rgba(16,185,129,0.55)] ring-1 ring-emerald-300/30'
                        : 'text-text-2 hover:bg-white/[0.04] hover:text-text-1'
                    }`}
                  >
                    {stage === 'quarters' ? 'Quarters' : stage === 'semis' ? 'Semis' : 'Finals'}
                  </button>
                ))}
              </div>

              {/* Bracket Round Visual */}
              <div className="space-y-2.5 text-xs font-mono tracking-tight tabular-nums">
                <div className="relative overflow-hidden p-3 rounded-control bg-emerald-500/[0.04] border border-emerald-500/20 flex justify-between items-center transition-colors duration-200 hover:border-emerald-500/[0.35]">
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-0.5 bg-emerald-400/70"
                  />
                  <div>
                    <span className="text-text-1 font-bold block">Team Alpha (Squad A)</span>
                    <span className="text-[10px] text-text-2 mt-0.5 flex items-center gap-1.5">
                      <span>Seed #1</span>
                      <span aria-hidden="true">•</span>
                      <Badge tone="emerald" className="px-1.5 py-0 text-[9px]">
                        Roster Verified
                      </Badge>
                    </span>
                  </div>
                  <span className="text-emerald-400 font-bold">4 Wins</span>
                </div>

                <div className="p-3 rounded-control bg-bg-1/70 border border-white/[0.07] flex justify-between items-center transition-colors duration-200 hover:border-emerald-500/25">
                  <div>
                    <span className="text-text-2 font-medium block">Team Omega (Squad B)</span>
                    <span className="text-[10px] text-text-2 mt-0.5 flex items-center gap-1.5">
                      <span>Seed #4</span>
                      <span aria-hidden="true">•</span>
                      <Badge tone="neutral" className="px-1.5 py-0 text-[9px]">
                        Roster Verified
                      </Badge>
                    </span>
                  </div>
                  <span className="text-text-2">2 Wins</span>
                </div>
              </div>

              <div className="p-3 rounded-control glass-panel text-xs font-mono text-text-2 flex items-center gap-2.5">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border border-emerald-500/[0.15] bg-emerald-500/[0.06]">
                  <ShieldAlert className="w-4 h-4 text-emerald-400" strokeWidth={1.5} />
                </span>
                <span>Single elimination with automated match progression.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TournamentModes;
