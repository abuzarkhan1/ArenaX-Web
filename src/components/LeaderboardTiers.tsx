import { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IconOrb } from './primitives/IconOrb';
import { ChevronLeft, ChevronRight, Target, Trophy } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface RankTier {
  name: string;
  badge: string;
  range: string;
  pts: string;
  targetMin: number;
  reward: string;
  isTop?: boolean;
}

const RANK_TIERS: RankTier[] = [
  { name: 'Bronze', badge: '/ranks/bronze.webp?v=s4', range: 'Tier I–IV', pts: '0–999 PTS', targetMin: 0, reward: 'Starter Base' },
  { name: 'Silver', badge: '/ranks/silver.webp?v=s4', range: 'Tier I–IV', pts: '1,000–1,999 PTS', targetMin: 1000, reward: '+150 AX Cash' },
  { name: 'Gold', badge: '/ranks/gold.webp?v=s4', range: 'Tier I–IV', pts: '2,000–3,199 PTS', targetMin: 2000, reward: '+300 AX Cash' },
  { name: 'Platinum', badge: '/ranks/platinum.webp?v=s4', range: 'Tier I–IV', pts: '3,200–4,599 PTS', targetMin: 3200, reward: '+600 AX Cash' },
  { name: 'Diamond', badge: '/ranks/diamond.webp?v=s4', range: 'Tier I–IV', pts: '4,600–6,199 PTS', targetMin: 4600, reward: '+1,200 AX Cash' },
  { name: 'Heroic', badge: '/ranks/heroic.webp?v=s4', range: 'Tier I–IV', pts: '6,200–7,999 PTS', targetMin: 6200, reward: '+2,500 AX Cash' },
  { name: 'Master', badge: '/ranks/master.webp?v=s4', range: 'Tier I–IV', pts: '8,000–9,999 PTS', targetMin: 8000, reward: '+5,000 AX Cash' },
  { name: 'Grandmaster', badge: '/ranks/grandmaster.webp?v=s4', range: 'Apex Contender', pts: '10,000+ PTS', targetMin: 10000, reward: '+10,000 AX Pool', isTop: true },
];

export const LeaderboardTiers = () => {
  const [currentPts, setCurrentPts] = useState(4800);
  const [targetTier, setTargetTier] = useState('Heroic');
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const selectedTier = RANK_TIERS.find((t) => t.name === targetTier) || RANK_TIERS[5];
  const ptsNeeded = Math.max(0, selectedTier.targetMin - currentPts);
  const booyahsNeeded = Math.ceil(ptsNeeded / 20); // 20 PTS per Booyah
  const progressPercent = selectedTier.targetMin === 0
    ? 100
    : Math.min(100, Math.round((currentPts / selectedTier.targetMin) * 100));

  const scrollTrack = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -260 : 260;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Section entry reveal
      gsap.fromTo(
        '.tier-reveal',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ranks"
      className="py-[clamp(80px,10vw,140px)] bg-[#121212] border-b border-white/[0.08] relative overflow-hidden"
      aria-label="Season Tiers & Ranks"
    >
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Header & Carousel Navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-14 gap-6">
          <div className="tier-reveal">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#EDEDED] font-heading">
              Competitive <span className="text-[#3ECF8E]">Tiers</span>
            </h2>
            <p className="text-sm sm:text-base text-[#A0A0A0] max-w-2xl mt-2 font-sans">
              Eight competitive divisions with direct cash milestone rewards.
            </p>
          </div>

          {/* Carousel Navigation Buttons (Mobile Viewport Only) */}
          <div className="tier-reveal flex md:hidden items-center gap-2 self-start">
            <button
              type="button"
              onClick={() => scrollTrack('left')}
              className="w-10 h-10 rounded-control border border-white/[0.08] bg-[#171717] hover:bg-[#1E201F] hover:border-white/20 text-[#A0A0A0] hover:text-[#EDEDED] transition-all duration-200 flex items-center justify-center cursor-pointer active:scale-[0.97]"
              aria-label="Scroll ranks left"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => scrollTrack('right')}
              className="w-10 h-10 rounded-control border border-white/[0.08] bg-[#171717] hover:bg-[#1E201F] hover:border-white/20 text-[#A0A0A0] hover:text-[#EDEDED] transition-all duration-200 flex items-center justify-center cursor-pointer active:scale-[0.97]"
              aria-label="Scroll ranks right"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* COMPLETE 4x2 DIVISION MATRIX & SCROLL TRACK              */}
        {/* ======================================================== */}
        <div
          ref={scrollContainerRef}
          className="mb-14 overflow-x-auto md:overflow-visible no-scrollbar scroll-smooth pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0"
        >
          <div className="flex md:grid md:grid-cols-4 gap-3.5 sm:gap-4 min-w-max md:min-w-0 pb-2 md:pb-0">
            {RANK_TIERS.map((tier, idx) => {
              const isGrandmaster = tier.isTop;
              const isSelected = targetTier === tier.name;

              return (
                <div
                  key={tier.name}
                  onClick={() => setTargetTier(tier.name)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setTargetTier(tier.name);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isSelected}
                  className={`w-[190px] sm:w-[210px] md:w-full p-4 sm:p-5 md:p-3.5 lg:p-5 rounded-card transition-all duration-200 ease-out border flex flex-col justify-between cursor-pointer relative group text-left select-none outline-none focus-visible:ring-2 focus-visible:ring-[#3ECF8E] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${isSelected
                      ? 'bg-[#181a19] border-[#3ECF8E] shadow-[0_0_24px_-8px_rgba(62,207,142,0.30),inset_0_1px_0_rgba(255,255,255,0.08)] -translate-y-1.5'
                      : isGrandmaster
                        ? 'bg-[#171717] border-[#3ECF8E]/40 hover:border-[#3ECF8E] hover:-translate-y-1 hover:shadow-lift'
                        : 'bg-[#171717] border-white/[0.08] hover:border-white/20 hover:-translate-y-1 hover:shadow-lift'
                    }`}
                >
                  {/* Grandmaster Apex Top Sheen */}
                  {isGrandmaster && (
                    <div className="absolute inset-0 rounded-card bg-[radial-gradient(ellipse_at_top,rgba(62,207,142,0.08),transparent_70%)] pointer-events-none" />
                  )}

                  {/* Card Header: Monospace Counter & Tag */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[11px] font-mono text-[#707070] font-semibold tracking-tight tabular-nums">
                        {String(idx + 1).padStart(2, '0')} / 08
                      </span>
                      {isGrandmaster && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#041B10] text-[#3ECF8E] border border-[#3ECF8E]/40 tracking-wider">
                          APEX
                        </span>
                      )}
                    </div>

                    {/* Official 3D Badge Pedestal Showcase */}
                    <div className="h-28 sm:h-32 flex flex-col items-center justify-center relative my-2">
                      {/* Ambient Halo */}
                      <div
                        className={`absolute w-20 h-20 rounded-full blur-xl transition-all duration-300 pointer-events-none ${isSelected
                            ? 'bg-[#3ECF8E]/20'
                            : isGrandmaster
                              ? 'bg-[#3ECF8E]/15'
                              : 'bg-white/[0.02] group-hover:bg-[#3ECF8E]/10'
                          }`}
                      />

                      {/* Rank Emblem */}
                      <img
                        src={tier.badge}
                        alt={`${tier.name} Rank Badge`}
                        loading="lazy"
                        className="h-20 sm:h-24 w-auto max-w-[96px] object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-300 relative z-10"
                      />

                      {/* Pedestal Ground Shadow */}
                      <div className="w-14 h-1.5 bg-black/60 rounded-full blur-[2px] mt-2 relative z-0" />
                    </div>

                    {/* Tier Name & Sub-range */}
                    <h4 className="text-lg sm:text-xl font-extrabold font-heading text-[#EDEDED] group-hover:text-[#3ECF8E] transition-colors">
                      {tier.name}
                    </h4>
                    <span className="text-xs font-mono text-[#707070] block mt-0.5 tracking-tight tabular-nums">
                      {tier.range}
                    </span>

                    {/* Requirement tag */}
                    <div className="mt-2.5 inline-block px-2 py-0.5 rounded bg-[#121212] border border-white/[0.08] text-[11px] font-mono font-bold text-[#A0A0A0] tracking-tight tabular-nums">
                      {tier.pts}
                    </div>
                  </div>

                  {/* Card Footer: Bonus Reward */}
                  <div className="mt-4 pt-3 border-t border-white/[0.08]">
                    <span
                      className={`text-xs sm:text-sm font-mono font-bold block tracking-tight tabular-nums ${isGrandmaster || isSelected ? 'text-[#3ECF8E]' : 'text-[#EDEDED]'
                        }`}
                    >
                      {tier.reward}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* RANK-GAP TACTICAL SIMULATOR                              */}
        {/* ======================================================== */}
        <div className="relative">
          <div className="relative z-10 border border-white/[0.08] rounded-card bg-[#171717] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_48px_-20px_rgba(0,0,0,0.7)] p-6 sm:p-8 max-w-4xl mx-auto">
            {/* Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-white/[0.08] gap-3 mb-8">
              <div className="flex items-center gap-3">
                <IconOrb icon={Target} tone="emerald" size="sm" />
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#EDEDED]">
                  Promotion Gap Simulator
                </h3>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-control bg-[#121212] border border-white/[0.08] self-start sm:self-auto">
                <Trophy className="w-3.5 h-3.5 text-[#3ECF8E]" strokeWidth={1.5} />
                <span className="text-xs font-mono text-[#3ECF8E] font-bold tracking-tight tabular-nums">+20 PTS / Booyah</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Interactive Controls */}
              <div className="lg:col-span-7 space-y-6">
                {/* Slider Section */}
                <div>
                  <div className="flex justify-between items-baseline text-xs font-mono mb-2.5">
                    <span className="text-[#707070] uppercase font-semibold">Current Rating</span>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold font-mono text-[#3ECF8E] tracking-tight tabular-nums">
                        {currentPts.toLocaleString()}
                      </span>
                      <span className="text-[#707070]">PTS</span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="50"
                    value={currentPts}
                    onChange={(e) => setCurrentPts(parseInt(e.target.value, 10))}
                    aria-label="Current Points Rating"
                    className="w-full h-2.5 bg-[#121212] rounded-control appearance-none cursor-pointer accent-[#3ECF8E] hover:accent-[#34B27B] border border-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ECF8E]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212]"
                  />

                  {/* Quick Presets */}
                  <div className="flex justify-between items-center text-[11px] font-mono text-[#707070] mt-2 px-1 tracking-tight tabular-nums">
                    <span>0 PTS</span>
                    <button
                      type="button"
                      onClick={() => setCurrentPts(2500)}
                      aria-label="Set rating to 2,500 points"
                      className="hover:text-[#3ECF8E] inline-block py-2.5 -my-2.5 transition-colors cursor-pointer tabular-nums active:scale-[0.98]"
                    >
                      2.5K
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentPts(5000)}
                      aria-label="Set rating to 5,000 points"
                      className="hover:text-[#3ECF8E] inline-block py-2.5 -my-2.5 transition-colors cursor-pointer tabular-nums active:scale-[0.98]"
                    >
                      5.0K
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentPts(7500)}
                      aria-label="Set rating to 7,500 points"
                      className="hover:text-[#3ECF8E] inline-block py-2.5 -my-2.5 transition-colors cursor-pointer tabular-nums active:scale-[0.98]"
                    >
                      7.5K
                    </button>
                    <span>10K+ PTS</span>
                  </div>
                </div>

                {/* Target Tier Quick Milestone Selector */}
                <div>
                  <span className="text-xs font-mono text-[#707070] uppercase font-semibold block mb-2.5">
                    Target Tier
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {RANK_TIERS.map((t) => {
                      const isCurrent = targetTier === t.name;
                      return (
                        <button
                          key={t.name}
                          type="button"
                          onClick={() => setTargetTier(t.name)}
                          className={`py-2 px-2 rounded-control text-[10px] font-mono font-bold uppercase leading-tight transition-all duration-100 cursor-pointer flex flex-col items-center gap-1.5 active:scale-[0.98] tabular-nums ${isCurrent
                              ? 'bg-[#3ECF8E] text-[#041B10] shadow-sm'
                              : 'bg-[#121212] text-[#707070] border border-white/[0.08] hover:text-[#EDEDED] hover:border-white/20'
                            }`}
                        >
                          <img
                            src={t.badge}
                            alt=""
                            className="w-5 h-5 sm:w-6 sm:h-6 object-contain drop-shadow pointer-events-none"
                          />
                          <span className="truncate max-w-full">{t.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Tactical Promotion Dossier */}
              <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-white/[0.08] pt-6 lg:pt-0 lg:pl-8 space-y-4">
                {/* Badge Preview & Title */}
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-[#3ECF8E]/15 blur-lg" />
                    <img
                      src={selectedTier.badge}
                      alt={`${selectedTier.name} badge`}
                      className="w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] relative z-10"
                    />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-extrabold font-heading text-[#EDEDED]">
                      {selectedTier.name}
                    </div>
                    <span className="text-xs font-mono text-[#3ECF8E] tracking-tight tabular-nums">
                      {selectedTier.targetMin.toLocaleString()} PTS REQUIRED
                    </span>
                  </div>
                </div>

                {/* Telemetry Metrics */}
                <div className="space-y-2.5 pt-2 border-t border-white/[0.08] font-mono text-xs tracking-tight">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-[#707070] uppercase">Points Required:</span>
                    <span className="text-sm font-bold text-[#3ECF8E] tabular-nums">
                      {ptsNeeded > 0 ? `${ptsNeeded.toLocaleString()} PTS` : 'QUALIFIED'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-[#707070] uppercase">Booyahs Required:</span>
                    <span className="text-sm font-bold text-[#EDEDED] tabular-nums">
                      {ptsNeeded > 0 ? `~${booyahsNeeded} Matches` : 'Promotion Ready'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-[#707070] uppercase">Milestone Bonus:</span>
                    <span className="text-sm font-bold text-[#3ECF8E] tabular-nums">
                      {selectedTier.reward}
                    </span>
                  </div>
                </div>

                {/* Progress to Target Bar */}
                <div className="pt-2">
                  <div className="flex justify-between text-[11px] font-mono text-[#707070] mb-1.5 tracking-tight tabular-nums">
                    <span>Progress to {selectedTier.name}</span>
                    <span className="text-[#EDEDED] font-bold">{progressPercent}%</span>
                  </div>
                  <div className="h-2 w-full bg-[#121212] rounded-full overflow-hidden border border-white/[0.08]">
                    <div
                      className="h-full bg-[#3ECF8E] transition-all duration-300 rounded-full shadow-[0_0_8px_rgba(62,207,142,0.4)]"
                      style={{ width: `${progressPercent}%` }}
                    />
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

export default LeaderboardTiers;
