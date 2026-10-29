import { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Pill } from './primitives/Pill';
import { ChevronLeft, ChevronRight, Target, Zap, ShieldCheck } from 'lucide-react';

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
      // Subtle section entry reveal
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
      className="py-[clamp(80px,10vw,140px)] bg-bg-1 border-b border-line relative overflow-hidden"
      aria-label="Season Tiers & Ranks"
    >
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Header & Carousel Navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-14 gap-6">
          <div className="tier-reveal">
            <Pill dot={true} label="SEASON 4 RANK SYSTEM" />
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-text-1 font-heading mt-4">
              Competitive <span className="text-accent">Tiers</span>
            </h2>
            <p className="text-base sm:text-lg text-text-2 max-w-2xl mt-3 leading-relaxed">
              Ascend from Bronze to Grandmaster. Every promotion milestone unlocks direct cash bonuses deposited into your Winning Wallet.
            </p>
          </div>

          {/* Broadcast Telemetry Pill & Navigation */}
          <div className="tier-reveal flex items-center gap-3 self-start md:self-end">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-control bg-bg-2 border border-line text-xs font-mono text-text-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>8 TIERS // ACTIVE CIRCUIT</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollTrack('left')}
                className="w-10 h-10 rounded-control border border-line bg-bg-2 hover:bg-bg-3 hover:border-line-strong text-text-2 hover:text-text-1 transition-all flex items-center justify-center cursor-pointer active:scale-95"
                aria-label="Scroll ranks left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollTrack('right')}
                className="w-10 h-10 rounded-control border border-line bg-bg-2 hover:bg-bg-3 hover:border-line-strong text-text-2 hover:text-text-1 transition-all flex items-center justify-center cursor-pointer active:scale-95"
                aria-label="Scroll ranks right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* ESPORTS TIER CAROUSEL / TRACK                            */}
        {/* ======================================================== */}
        <div
          ref={scrollContainerRef}
          className="mb-14 overflow-x-auto no-scrollbar scroll-smooth pb-4 -mx-6 px-6"
        >
          <div className="flex gap-4 min-w-max pb-2">
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
                  className={`w-[200px] sm:w-[220px] p-5 rounded-card transition-all duration-300 border flex flex-col justify-between cursor-pointer relative group text-left select-none outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    isSelected
                      ? 'bg-bg-2 border-accent shadow-[0_0_28px_rgba(0,200,120,0.18)] -translate-y-1.5'
                      : isGrandmaster
                      ? 'bg-bg-2 border-line-accent hover:border-accent hover:-translate-y-1'
                      : 'bg-bg-2 border-line hover:border-line-strong hover:-translate-y-1'
                  }`}
                >
                  {/* Subtle apex ambient light for Grandmaster */}
                  {isGrandmaster && (
                    <div className="absolute inset-0 rounded-card bg-[radial-gradient(ellipse_at_top,rgba(0,200,120,0.10),transparent_70%)] pointer-events-none" />
                  )}

                  {/* Card Header: Monospace Counter & Tag */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[11px] font-mono text-text-3 font-semibold">
                        {String(idx + 1).padStart(2, '0')} / 08
                      </span>
                      {isGrandmaster ? (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-accent/15 text-accent border border-accent/40 tracking-wider">
                          APEX
                        </span>
                      ) : isSelected ? (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-accent/15 text-accent border border-accent/30 tracking-wider">
                          ACTIVE
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-text-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          SIMULATE
                        </span>
                      )}
                    </div>

                    {/* Official 3D Badge Pedestal Showcase */}
                    <div className="h-28 sm:h-32 flex flex-col items-center justify-center relative my-2">
                      {/* Ambient Halo */}
                      <div
                        className={`absolute w-20 h-20 rounded-full blur-xl transition-all duration-300 pointer-events-none ${
                          isSelected
                            ? 'bg-accent/20'
                            : isGrandmaster
                            ? 'bg-accent/15'
                            : 'bg-white/[0.03] group-hover:bg-accent/10'
                        }`}
                      />

                      {/* Rank Emblem */}
                      <img
                        src={tier.badge}
                        alt={`${tier.name} Rank Badge`}
                        loading="lazy"
                        className="h-20 sm:h-24 w-auto max-w-[96px] object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.85)] group-hover:scale-110 transition-transform duration-300 relative z-10"
                      />

                      {/* Pedestal Ground Shadow */}
                      <div className="w-14 h-1.5 bg-black/60 rounded-full blur-[2px] mt-2 relative z-0" />
                    </div>

                    {/* Tier Name & Sub-range */}
                    <h4 className="text-lg sm:text-xl font-extrabold font-heading text-text-1 group-hover:text-accent transition-colors">
                      {tier.name}
                    </h4>
                    <span className="text-xs font-mono text-text-3 block mt-0.5">
                      {tier.range}
                    </span>

                    {/* Requirement tag */}
                    <div className="mt-2.5 inline-block px-2 py-0.5 rounded bg-bg-1 border border-line text-[11px] font-mono font-bold text-text-2">
                      {tier.pts}
                    </div>
                  </div>

                  {/* Card Footer: Bonus Reward */}
                  <div className="mt-4 pt-3 border-t border-line/60">
                    <span className="text-[10px] font-mono text-text-3 uppercase tracking-wider block">
                      Promotion Reward
                    </span>
                    <span
                      className={`text-xs sm:text-sm font-mono font-bold block mt-0.5 ${
                        isGrandmaster || isSelected ? 'text-accent' : 'text-text-1'
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
        {/* RANK-GAP TACTICAL SIMULATOR (Cardless HUD Layout)       */}
        {/* ======================================================== */}
        <div className="border border-line rounded-card bg-bg-2/50 backdrop-blur-sm p-6 sm:p-8 max-w-4xl mx-auto">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-line gap-3 mb-8">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-accent tracking-widest flex items-center gap-2">
                <Target className="w-4 h-4 text-accent" />
                // TACTICAL PROMOTION SIMULATOR
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-text-1 mt-1">
                Calculate Gap to Next Promotion
              </h3>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-control bg-bg-1 border border-line self-start sm:self-auto">
              <Zap className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-mono text-text-2">1 Booyah = +20 PTS</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Interactive Controls */}
            <div className="lg:col-span-7 space-y-6">
              {/* Slider Section */}
              <div>
                <div className="flex justify-between items-baseline text-xs font-mono mb-2.5">
                  <span className="text-text-3 uppercase font-semibold">Your Current Rating</span>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold font-mono text-accent">
                      {currentPts.toLocaleString()}
                    </span>
                    <span className="text-text-3">PTS</span>
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
                  className="w-full h-2.5 bg-bg-1 rounded-control appearance-none cursor-pointer accent-accent"
                />

                {/* Quick Presets */}
                <div className="flex justify-between items-center text-[11px] font-mono text-text-3 mt-2 px-1">
                  <span>0 PTS</span>
                  <button
                    type="button"
                    onClick={() => setCurrentPts(2500)}
                    className="hover:text-accent transition-colors cursor-pointer"
                  >
                    2.5K
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentPts(5000)}
                    className="hover:text-accent transition-colors cursor-pointer"
                  >
                    5.0K
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentPts(7500)}
                    className="hover:text-accent transition-colors cursor-pointer"
                  >
                    7.5K
                  </button>
                  <span>10K+ PTS</span>
                </div>
              </div>

              {/* Target Tier Quick Milestone Selector */}
              <div>
                <span className="text-xs font-mono text-text-3 uppercase font-semibold block mb-2.5">
                  Select Target Promotion Tier
                </span>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
                  {RANK_TIERS.map((t) => {
                    const isCurrent = targetTier === t.name;
                    return (
                      <button
                        key={t.name}
                        type="button"
                        onClick={() => setTargetTier(t.name)}
                        className={`py-2 px-1 rounded-control text-[10px] font-mono font-bold uppercase transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                          isCurrent
                            ? 'bg-accent text-bg-1 shadow-sm'
                            : 'bg-bg-1 text-text-3 border border-line hover:text-text-1 hover:border-line-strong'
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
            <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-line pt-6 lg:pt-0 lg:pl-8 space-y-4">
              {/* Badge Preview & Title */}
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-accent/15 blur-lg" />
                  <img
                    src={selectedTier.badge}
                    alt={`${selectedTier.name} badge`}
                    className="w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] relative z-10"
                  />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-text-3 uppercase block">
                    Target Milestone
                  </span>
                  <div className="text-xl sm:text-2xl font-extrabold font-heading text-text-1">
                    {selectedTier.name}
                  </div>
                  <span className="text-xs font-mono text-accent">
                    {selectedTier.targetMin.toLocaleString()} PTS REQUIRED
                  </span>
                </div>
              </div>

              {/* Telemetry Metrics */}
              <div className="space-y-2.5 pt-2 border-t border-line font-mono text-xs">
                <div className="flex justify-between items-center py-1">
                  <span className="text-text-3 uppercase">Points Needed:</span>
                  <span className="text-sm font-bold text-accent">
                    {ptsNeeded > 0 ? `${ptsNeeded.toLocaleString()} PTS` : 'QUALIFIED'}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-text-3 uppercase">Booyahs Required:</span>
                  <span className="text-sm font-bold text-text-1">
                    {ptsNeeded > 0 ? `~${booyahsNeeded} Clean Matches` : 'Promotion Ready'}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-text-3 uppercase">Bonus Deposit:</span>
                  <span className="text-sm font-bold text-accent">
                    {selectedTier.reward}
                  </span>
                </div>
              </div>

              {/* Progress to Target Bar */}
              <div className="pt-2">
                <div className="flex justify-between text-[11px] font-mono text-text-3 mb-1.5">
                  <span>Progress to {selectedTier.name}</span>
                  <span className="text-text-1 font-bold">{progressPercent}%</span>
                </div>
                <div className="h-2 w-full bg-bg-1 rounded-full overflow-hidden border border-line">
                  <div
                    className="h-full bg-accent transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Guarantee Note */}
              <div className="flex items-center gap-2 pt-1 text-[11px] font-mono text-text-3">
                <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0" />
                <span>Instant Winning Wallet credit upon verification.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardTiers;
