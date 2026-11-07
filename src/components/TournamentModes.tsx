import { useState } from 'react';
import { Trophy, Swords, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button, Badge, IconOrb } from './primitives';

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
    },
    duo: {
      formatTitle: 'Duo Combat (24 Teams)',
      slots: '24 Teams (48 Players)',
      entry: '100 AX / Team',
      prizePool: '2,160 AX Cash',
    },
    squad: {
      formatTitle: 'Squad 4v4v4 (12 Teams)',
      slots: '12 Squads (48 Players)',
      entry: '200 AX / Squad',
      prizePool: '2,160 AX Cash',
    },
  };

  const csStageData = {
    quarters: {
      team1: { name: 'Team Alpha (Squad A)', seed: 'Seed #1', wins: '4 Wins' },
      team2: { name: 'Team Omega (Squad B)', seed: 'Seed #8', wins: '1 Win' },
      slots: '8 Squads (32 Players)',
      roster: '4v4 Squads',
      entry: '400 AX / Squad',
      prizePool: '2,880 AX Cash',
    },
    semis: {
      team1: { name: 'Team Alpha (Squad A)', seed: 'Seed #1', wins: '4 Wins' },
      team2: { name: 'Team Delta (Squad D)', seed: 'Seed #4', wins: '2 Wins' },
      slots: '4 Squads (16 Players)',
      roster: '4v4 Squads',
      entry: '400 AX / Squad',
      prizePool: '2,880 AX Cash',
    },
    finals: {
      team1: { name: 'Team Alpha (Squad A)', seed: 'Seed #1', wins: '4 Wins' },
      team2: { name: 'Team Phoenix (Squad C)', seed: 'Seed #2', wins: '3 Wins' },
      slots: '2 Squads (8 Players)',
      roster: '4v4 Squads',
      entry: '400 AX / Squad',
      prizePool: '2,880 AX Cash',
    },
  };

  const currentBermuda = bermudaData[bermudaFormat];
  const currentCs = csStageData[csStage];

  const scrollToDownload = () => {
    document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="tournaments"
      className="py-[clamp(80px,10vw,140px)] bg-[#121212] border-b border-white/[0.08] relative overflow-hidden"
      aria-label="Tournament Modes"
    >
      {/* Low-opacity environmental glow behind the card surfaces */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[6%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(ellipse_at_top_right,rgba(62,207,142,0.06)_0%,transparent_70%)] blur-[100px]"
      />
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Header with Clean Linear Switcher */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#EDEDED] font-heading">
            Battle for the <span className="text-[#3ECF8E]">Booyah</span>
          </h2>

          {/* Mode Switcher Tabs */}
          <div className="relative flex p-1 rounded-control bg-bg-2 border border-white/[0.08] mt-8 max-w-md gap-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <button
              onClick={() => setActiveTab('bermuda')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-control text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 active:scale-[0.98] active:duration-100 cursor-pointer ${activeTab === 'bermuda'
                  ? 'bg-accent text-bg-1 font-semibold shadow-[0_1px_3px_rgba(62,207,142,0.35)] ring-1 ring-[#3ECF8E]/30'
                  : 'text-text-2 hover:text-[#EDEDED] hover:bg-[#1E201F]'
                }`}
            >
              <Trophy className="w-4 h-4" strokeWidth={1.5} />
              <span>Bermuda 48P</span>
            </button>
            <button
              onClick={() => setActiveTab('clashsquad')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-control text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 active:scale-[0.98] active:duration-100 cursor-pointer ${activeTab === 'clashsquad'
                  ? 'bg-accent text-bg-1 font-semibold shadow-[0_1px_3px_rgba(62,207,142,0.35)] ring-1 ring-[#3ECF8E]/30'
                  : 'text-text-2 hover:text-[#EDEDED] hover:bg-[#1E201F]'
                }`}
            >
              <Swords className="w-4 h-4" strokeWidth={1.5} />
              <span>Clash Squad 4v4</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: BERMUDA BATTLE ROYALE                             */}
        {/* ======================================================== */}
        {activeTab === 'bermuda' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Clean Platform Specifications */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#EDEDED] font-heading">
                  Bermuda 48-Player Survival
                </h3>
              </div>

              {/* High-Contrast Specifications with Hairlines */}
              <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
                <div className="py-3.5 flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#3ECF8E] flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-[#EDEDED]">Verified In-Game UID Matchmaking</span>
                </div>

                <div className="py-3.5 flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#3ECF8E] flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-[#EDEDED]">Automated AI Vision Verification</span>
                </div>

                <div className="py-3.5 flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#3ECF8E] flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-[#EDEDED]">Automated Play Wallet Refund Guarantee</span>
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
              className="lg:col-span-5 rounded-card bg-[#171717] border border-white/[0.08] p-6 sm:p-7 space-y-5 relative overflow-hidden group hover:border-[#3ECF8E]/40 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)]"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3ECF8E]/40 to-transparent"
              />
              {/* Dynamic Radial Highlight Tracking Mouse */}
              <div
                className="absolute inset-0 pointer-events-none rounded-card opacity-30 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle 280px at ${cardTilt.px}% ${cardTilt.py}%, rgba(62, 207, 142, 0.12), transparent 70%)`,
                }}
              />

              <div className="relative z-10 flex flex-wrap justify-between items-center gap-3 pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <IconOrb icon={Trophy} tone="emerald" size="sm" />
                  <div>
                    <h4 className="text-[#EDEDED] font-bold text-lg font-heading">Bermuda Championship #104</h4>
                  </div>
                </div>
                <Badge tone="emerald" dot pulse>
                  Live
                </Badge>
              </div>

              {/* Sub-format switcher */}
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#121212] rounded-control border border-white/[0.08]">
                {(['solo', 'duo', 'squad'] as const).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setBermudaFormat(fmt)}
                    aria-pressed={bermudaFormat === fmt}
                    aria-label={`Select ${fmt} format`}
                    className={`min-h-[44px] py-2 sm:py-1.5 sm:min-h-0 rounded-control text-xs font-mono font-bold uppercase transition-all duration-200 active:scale-[0.98] active:duration-100 cursor-pointer ${bermudaFormat === fmt
                        ? 'bg-[#3ECF8E] text-[#041B10] font-semibold ring-1 ring-[#3ECF8E]/30 shadow-[0_1px_2px_rgba(0,0,0,0.24)]'
                        : 'text-[#A0A0A0] hover:text-[#EDEDED] hover:bg-[#1E201F]'
                      }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>

              {/* High-Contrast Match Specification Cards Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono tracking-tight tabular-nums">
                <div className="p-3 rounded-control bg-[#121212] border border-white/[0.08]">
                  <span className="text-[10px] text-[#707070] uppercase tracking-wider block">SLOTS</span>
                  <span className="text-[#3ECF8E] font-bold block mt-1">{currentBermuda.slots}</span>
                </div>
                <div className="p-3 rounded-control bg-[#121212] border border-white/[0.08]">
                  <span className="text-[10px] text-[#707070] uppercase tracking-wider block">ROSTER</span>
                  <span className="text-[#EDEDED] font-bold block mt-1 truncate">{currentBermuda.formatTitle}</span>
                </div>
                <div className="p-3 rounded-control bg-[#121212] border border-white/[0.08]">
                  <span className="text-[10px] text-[#707070] uppercase tracking-wider block">ENTRY</span>
                  <span className="text-[#EDEDED] font-bold block mt-1">{currentBermuda.entry}</span>
                </div>
                <div className="p-3 rounded-control bg-[#041B10] border border-[#3ECF8E]/30 shadow-[inset_0_1px_0_rgba(62,207,142,0.15)]">
                  <span className="text-[10px] text-[#3ECF8E] uppercase tracking-wider block">PRIZE POOL</span>
                  <span className="text-[#3ECF8E] font-bold text-sm block mt-1">{currentBermuda.prizePool}</span>
                </div>
              </div>

              {/* Live Room Capacity Indicator */}
              <div className="p-3.5 rounded-control bg-[#121212] border border-white/[0.08] space-y-1.5 text-xs font-mono tracking-tight tabular-nums">
                <div className="flex flex-wrap justify-between items-center gap-2 font-bold">
                  <span className="text-[#A0A0A0] flex items-center gap-1.5">
                    Room Capacity
                  </span>
                  <Badge tone="emerald" dot pulse>
                    44 / 48 (91%)
                  </Badge>
                </div>
                <div className="w-full bg-[#1E201F] h-1.5 rounded-full overflow-hidden border border-white/[0.04]">
                  <div className="bg-[#3ECF8E] h-full w-[91%] shadow-[0_0_8px_rgba(62,207,142,0.4)]" />
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
            {/* Left: Clean Platform Specifications */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#EDEDED] font-heading">
                  Clash Squad 4v4 Tournament Brackets
                </h3>
              </div>

              {/* High-Contrast Specifications with Hairlines */}
              <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
                <div className="py-3.5 flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#3ECF8E] flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-[#EDEDED]">Live Bracket Tree Visualization</span>
                </div>

                <div className="py-3.5 flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#3ECF8E] flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-[#EDEDED]">6-Digit Captain Squad Codes</span>
                </div>

                <div className="py-3.5 flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#3ECF8E] flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-[#EDEDED]">Direct Winning Wallet Settlement</span>
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
              className="lg:col-span-5 rounded-card bg-[#171717] border border-white/[0.08] p-6 sm:p-7 space-y-5 relative overflow-hidden group hover:border-[#3ECF8E]/40 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)]"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3ECF8E]/40 to-transparent"
              />
              <div
                className="absolute inset-0 pointer-events-none rounded-card opacity-30 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle 280px at ${cardTilt.px}% ${cardTilt.py}%, rgba(62, 207, 142, 0.12), transparent 70%)`,
                }}
              />

              <div className="relative z-10 flex flex-wrap justify-between items-center gap-3 pb-3 border-b border-white/[0.08]">
                <div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#3ECF8E]/30 bg-[#041B10]">
                      <img
                        src="/ranks/master.webp?v=s4"
                        alt="Master Rank"
                        className="w-4 h-4 object-contain drop-shadow"
                      />
                    </span>
                    <h4 className="text-[#EDEDED] font-bold text-lg font-heading">CS Masters Cup</h4>
                  </div>
                </div>
                <Badge tone="emerald" dot>
                  Bracket
                </Badge>
              </div>

              {/* Stage Selector */}
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#121212] rounded-control border border-white/[0.08]">
                {(['quarters', 'semis', 'finals'] as const).map((stage) => (
                  <button
                    key={stage}
                    onClick={() => setCsStage(stage)}
                    className={`min-h-[44px] py-2 sm:py-1.5 sm:min-h-0 rounded-control text-xs font-mono font-bold uppercase transition-all duration-200 active:scale-[0.98] active:duration-100 cursor-pointer ${csStage === stage
                        ? 'bg-[#3ECF8E] text-[#041B10] font-semibold ring-1 ring-[#3ECF8E]/30 shadow-[0_1px_2px_rgba(0,0,0,0.24)]'
                        : 'text-[#A0A0A0] hover:text-[#EDEDED] hover:bg-[#1E201F]'
                      }`}
                  >
                    {stage === 'quarters' ? 'Quarters' : stage === 'semis' ? 'Semis' : 'Finals'}
                  </button>
                ))}
              </div>

              {/* High-Contrast Match Specification Cards Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono tracking-tight tabular-nums">
                <div className="p-3 rounded-control bg-[#121212] border border-white/[0.08]">
                  <span className="text-[10px] text-[#707070] uppercase tracking-wider block">SLOTS</span>
                  <span className="text-[#3ECF8E] font-bold block mt-1">{currentCs.slots}</span>
                </div>
                <div className="p-3 rounded-control bg-[#121212] border border-white/[0.08]">
                  <span className="text-[10px] text-[#707070] uppercase tracking-wider block">ROSTER</span>
                  <span className="text-[#EDEDED] font-bold block mt-1">{currentCs.roster}</span>
                </div>
                <div className="p-3 rounded-control bg-[#121212] border border-white/[0.08]">
                  <span className="text-[10px] text-[#707070] uppercase tracking-wider block">ENTRY</span>
                  <span className="text-[#EDEDED] font-bold block mt-1">{currentCs.entry}</span>
                </div>
                <div className="p-3 rounded-control bg-[#041B10] border border-[#3ECF8E]/30 shadow-[inset_0_1px_0_rgba(62,207,142,0.15)]">
                  <span className="text-[10px] text-[#3ECF8E] uppercase tracking-wider block">PRIZE POOL</span>
                  <span className="text-[#3ECF8E] font-bold text-sm block mt-1">{currentCs.prizePool}</span>
                </div>
              </div>

              {/* Dynamic Bracket Matchup Visual */}
              <div className="space-y-2.5 text-xs font-mono tracking-tight tabular-nums">
                <div className="relative overflow-hidden p-3 rounded-control bg-[#041B10] border border-[#3ECF8E]/25 flex justify-between items-center transition-colors duration-200 hover:border-[#3ECF8E]/40">
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-0.5 bg-[#3ECF8E]"
                  />
                  <div>
                    <span className="text-[#EDEDED] font-bold block">{currentCs.team1.name}</span>
                    <span className="text-[10px] text-[#A0A0A0] mt-0.5 block">{currentCs.team1.seed}</span>
                  </div>
                  <span className="text-[#3ECF8E] font-bold">{currentCs.team1.wins}</span>
                </div>

                <div className="p-3 rounded-control bg-[#121212] border border-white/[0.08] flex justify-between items-center transition-colors duration-200 hover:border-white/[0.14]">
                  <div>
                    <span className="text-[#A0A0A0] font-medium block">{currentCs.team2.name}</span>
                    <span className="text-[10px] text-[#707070] mt-0.5 block">{currentCs.team2.seed}</span>
                  </div>
                  <span className="text-[#707070]">{currentCs.team2.wins}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TournamentModes;
