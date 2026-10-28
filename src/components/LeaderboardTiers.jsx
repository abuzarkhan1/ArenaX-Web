import { useState } from 'react';
import { Award, Trophy, Medal, Search, Flame, Shield, ArrowUpRight, Crown, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

const LeaderboardTiers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [simTargetTier, setSimTargetTier] = useState('Heroic');
  const [currentPts, setCurrentPts] = useState(4800);

  const rankTiers = [
    { name: 'Bronze', range: 'Tier I–IV', pts: '0–999 PTS', targetMin: 0, color: '#CD7F32', reward: 'Starter Base', badge: 'Tier I' },
    { name: 'Silver', range: 'Tier I–IV', pts: '1,000–1,999 PTS', targetMin: 1000, color: '#CBD5E1', reward: '+150 AX Cash', badge: 'Tier II' },
    { name: 'Gold', range: 'Tier I–IV', pts: '2,000–3,199 PTS', targetMin: 2000, color: '#EAB308', reward: '+300 AX Cash', badge: 'Tier III' },
    { name: 'Platinum', range: 'Tier I–IV', pts: '3,200–4,599 PTS', targetMin: 3200, color: '#06B6D4', reward: '+600 AX Cash', badge: 'Tier IV' },
    { name: 'Diamond', range: 'Tier I–IV', pts: '4,600–6,199 PTS', targetMin: 4600, color: '#3B82F6', reward: '+1,200 AX Cash', badge: 'Tier V' },
    { name: 'Heroic', range: 'Tier I–IV', pts: '6,200–7,999 PTS', targetMin: 6200, color: '#EF4444', reward: '+2,500 AX Cash', badge: 'Mastery' },
    { name: 'Master', range: 'Tier I–IV', pts: '8,000–9,999 PTS', targetMin: 8000, color: '#A855F7', reward: '+5,000 AX Cash', badge: 'Elite' },
    { name: 'Grandmaster', range: 'Top 300 Elite', pts: '10,000+ PTS', targetMin: 10000, color: '#F59E0B', reward: '+10,000 AX Pool', badge: 'Apex' },
  ];

  // Verified demo player rankings
  const demoPlayers = [
    { rank: 1, name: 'AX_SniperGod', tag: 'Team Falcons', tier: 'Grandmaster VI', points: 12480, winRate: '68%', booyahs: 84, kills: 620, avatar: 'SG', color: '#F59E0B' },
    { rank: 2, name: 'Viper_Shooter', tag: 'Apex Pakistan', tier: 'Grandmaster V', points: 11920, winRate: '64%', booyahs: 79, kills: 580, avatar: 'VS', color: '#CBD5E1' },
    { rank: 3, name: 'Shadow_Rider', tag: 'Karachi Kings', tier: 'Grandmaster IV', points: 11350, winRate: '61%', booyahs: 72, kills: 540, avatar: 'SR', color: '#CD7F32' },
    { rank: 4, name: 'Malik_OP', tag: 'Lahore Warriors', tier: 'Master IV', points: 9840, winRate: '57%', booyahs: 61, kills: 490, avatar: 'MO', color: '#A855F7' },
    { rank: 5, name: 'Bermuda_King', tag: 'Delta Force', tier: 'Master II', points: 8950, winRate: '55%', booyahs: 54, kills: 450, avatar: 'BK', color: '#A855F7' },
    { rank: 6, name: 'Rebel_Queen', tag: 'Toxic Squad', tier: 'Heroic IV', points: 7600, winRate: '52%', booyahs: 48, kills: 410, avatar: 'RQ', color: '#EF4444' },
    { rank: 7, name: 'Ghost_Sniper', tag: 'Rawalpindi Titans', tier: 'Heroic II', points: 6890, winRate: '50%', booyahs: 42, kills: 380, avatar: 'GS', color: '#EF4444' },
    { rank: 8, name: 'Asad_Racer', tag: 'Islamabad United', tier: 'Diamond IV', points: 5950, winRate: '48%', booyahs: 36, kills: 340, avatar: 'AR', color: '#3B82F6' },
  ];

  const filteredPlayers = demoPlayers.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tag.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === 'all' || p.tier.toLowerCase().includes(selectedFilter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  // Calculate target gap
  const selectedTierObj = rankTiers.find((t) => t.name === simTargetTier) || rankTiers[5];
  const pointsNeeded = Math.max(0, selectedTierObj.targetMin - currentPts);
  const booyahsNeeded = Math.ceil(pointsNeeded / 20); // 20 PTS per Booyah
  const killsNeeded = Math.ceil(pointsNeeded / 5); // 5 PTS per kill
  const progressPercent = Math.min(100, Math.round((currentPts / (selectedTierObj.targetMin || 1)) * 100));

  const scrollToDownload = () => {
    document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="leaderboard" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#101214] border-t border-white/5 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#F59E0B]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00C878]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Eyebrow & Title */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B]">
              Season 4 Competitive Standings
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 font-heading">
            Esports Progression & <span className="text-gradient-amber text-[#F59E0B]">Rank Rewards</span>
          </h2>
          <p className="text-[#A1A1AA] text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            From Bronze I to Grandmaster Top 300. Every verified Booyah (+20 PTS) and Kill (+5 PTS) ranks your squad higher, unlocking milestone cash prizes withdrawable to JazzCash or EasyPaisa.
          </p>
        </div>

        {/* 8 Major Tiers - Mobile Horizontal Snap Rail & Desktop Grid */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center justify-between mb-3 px-1 lg:hidden">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#A1A1AA] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              36-Sub-Tier Progression Rail
            </span>
            <span className="text-[10px] text-[#71717A] flex items-center gap-0.5">
              Swipe <ChevronRight className="w-3 h-3 inline" />
            </span>
          </div>

          <div className="flex lg:grid lg:grid-cols-8 gap-2.5 sm:gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            {rankTiers.map((tier, index) => (
              <div
                key={index}
                className="premium-card min-w-[145px] sm:min-w-[160px] lg:min-w-0 snap-start p-3 sm:p-4 rounded-2xl text-center flex flex-col justify-between hover:border-white/20 transition-all duration-200 group flex-shrink-0 lg:flex-shrink"
              >
                <div>
                  <div
                    className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center font-bold text-xs shadow-inner group-hover:scale-110 transition-transform duration-200"
                    style={{
                      backgroundColor: `${tier.color}18`,
                      borderColor: `${tier.color}40`,
                      borderWidth: '1px',
                      color: tier.color,
                      boxShadow: `0 0 16px -4px ${tier.color}30`,
                    }}
                  >
                    <Shield className="w-5 h-5 fill-current" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5 font-heading">{tier.name}</h4>
                  <p className="text-[10px] text-[#A1A1AA]">{tier.range}</p>
                  <p className="text-[10px] text-[#71717A] font-semibold mt-0.5">{tier.pts}</p>
                </div>
                <div className="mt-2.5 pt-2 border-t border-white/[0.08]">
                  <span
                    className="text-[10px] font-extrabold block truncate px-1 py-0.5 rounded"
                    style={{ color: tier.color, backgroundColor: `${tier.color}10` }}
                  >
                    {tier.reward}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Standings Container */}
        <div className="premium-card rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
          {/* Header Bar with Search & Filter Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-[#F59E0B]" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white font-heading">Seasonal Standings</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#00C878]/15 text-[#00C878] border border-[#00C878]/30 uppercase tracking-wider">
                  Live Ladder
                </span>
              </div>
              <p className="text-xs text-[#A1A1AA] mt-1">
                Authoritative rankings synced from Bermuda Battle Royale and Clash Squad tournaments.
              </p>
            </div>

            {/* Filter & Search Bar - Mobile Responsive */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full lg:w-auto">
              {/* Filter Pills */}
              <div className="flex items-center gap-1 p-1 bg-white/[0.03] rounded-xl border border-white/10 overflow-x-auto no-scrollbar">
                {['all', 'Grandmaster', 'Master', 'Heroic'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectedFilter(f)}
                    className={`min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                      selectedFilter === f
                        ? 'bg-[#00C878] text-[#101214] font-bold shadow-md shadow-[#00C878]/25'
                        : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {f === 'all' ? 'All Tiers' : f}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative flex-grow sm:w-60">
                <Search className="w-4 h-4 text-[#71717A] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search player or squad..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full min-h-[40px] bg-white/[0.03] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#00C878] focus:ring-1 focus:ring-[#00C878]/30 transition-all"
                />
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* CHAMPIONSHIP PODIUM                                      */}
          {/* Mobile: Compact 3-Column Pedestal                        */}
          {/* Desktop: Elevated 3-Card Staggered Podium                */}
          {/* ======================================================== */}

          {/* Mobile Stepped Pedestal (under 768px) */}
          <div className="md:hidden my-6">
            <div className="text-center mb-3">
              <span className="text-[10px] font-bold text-[#F59E0B] uppercase tracking-widest inline-flex items-center gap-1">
                <Crown className="w-3 h-3 text-[#F59E0B]" /> Top 3 Podium Leaders
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 items-end pt-4">
              {/* 2nd Place Silver - Left */}
              <div className="premium-card p-3 rounded-2xl text-center relative flex flex-col justify-between border-slate-400/30">
                <div className="w-6 h-6 rounded-full bg-slate-400/20 text-slate-300 font-black text-[10px] flex items-center justify-center mx-auto mb-1 border border-slate-400/40">
                  #2
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-400/10 border border-slate-400/30 flex items-center justify-center mx-auto mb-1.5 font-black text-xs text-slate-300 shadow-md">
                  {demoPlayers[1].avatar}
                </div>
                <h4 className="text-white font-bold text-xs truncate">{demoPlayers[1].name}</h4>
                <p className="text-[10px] text-[#A1A1AA] truncate">{demoPlayers[1].tag}</p>
                <div className="mt-2 pt-1.5 border-t border-white/[0.08]">
                  <span className="text-xs font-black text-white block">{demoPlayers[1].points.toLocaleString()}</span>
                  <span className="text-[9px] text-[#00C878] font-semibold">{demoPlayers[1].winRate} WR</span>
                </div>
              </div>

              {/* 1st Place Gold - Center Elevated */}
              <div className="premium-card-amber p-3 sm:p-4 rounded-2xl text-center relative flex flex-col justify-between border-amber-400/50 shadow-lg shadow-amber-500/15 -translate-y-2">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 text-[#0A0D0F] shadow-md flex items-center gap-1">
                    <Crown className="w-2.5 h-2.5" /> #1
                  </span>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500/20 to-amber-300/30 border-2 border-amber-400/60 flex items-center justify-center mx-auto mb-1.5 font-black text-sm text-amber-300 shadow-lg shadow-amber-500/20 mt-1">
                  {demoPlayers[0].avatar}
                </div>
                <h4 className="text-white font-black text-xs sm:text-sm truncate">{demoPlayers[0].name}</h4>
                <p className="text-[10px] text-amber-400 font-bold truncate flex items-center justify-center gap-0.5">
                  <Flame className="w-3 h-3 fill-current inline flex-shrink-0" />
                  <span className="truncate">{demoPlayers[0].tag}</span>
                </p>
                <div className="mt-2 pt-1.5 border-t border-amber-500/25">
                  <span className="text-xs sm:text-sm font-black text-white block">{demoPlayers[0].points.toLocaleString()}</span>
                  <span className="text-[9px] text-amber-400 font-bold">{demoPlayers[0].booyahs} Booyahs</span>
                </div>
              </div>

              {/* 3rd Place Bronze - Right */}
              <div className="premium-card p-3 rounded-2xl text-center relative flex flex-col justify-between border-amber-700/30">
                <div className="w-6 h-6 rounded-full bg-amber-700/20 text-amber-600 font-black text-[10px] flex items-center justify-center mx-auto mb-1 border border-amber-700/40">
                  #3
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-700/10 border border-amber-700/30 flex items-center justify-center mx-auto mb-1.5 font-black text-xs text-amber-600 shadow-md">
                  {demoPlayers[2].avatar}
                </div>
                <h4 className="text-white font-bold text-xs truncate">{demoPlayers[2].name}</h4>
                <p className="text-[10px] text-[#A1A1AA] truncate">{demoPlayers[2].tag}</p>
                <div className="mt-2 pt-1.5 border-t border-white/[0.08]">
                  <span className="text-xs font-black text-white block">{demoPlayers[2].points.toLocaleString()}</span>
                  <span className="text-[9px] text-[#00C878] font-semibold">{demoPlayers[2].winRate} WR</span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Elevated Staggered Podium (md and above) */}
          <div className="hidden md:grid grid-cols-3 gap-4 lg:gap-6 my-8 items-end">
            {/* 2nd Place Silver */}
            <div className="order-1 premium-card p-6 rounded-3xl text-center relative flex flex-col justify-between border-slate-400/30 hover:border-slate-300/50 transition-all duration-200">
              <div>
                <div className="w-9 h-9 rounded-full bg-slate-400/20 text-slate-300 font-black text-xs flex items-center justify-center mx-auto mb-3 border border-slate-400/40 shadow-inner">
                  #2
                </div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-slate-600/30 to-slate-400/20 border border-slate-400/40 flex items-center justify-center mx-auto mb-3 font-black text-lg text-slate-200 shadow-xl shadow-slate-400/10">
                  <Medal className="w-8 h-8 text-slate-300" />
                </div>
                <h4 className="text-white font-bold text-lg font-heading">{demoPlayers[1].name}</h4>
                <p className="text-xs text-[#A1A1AA] font-medium">{demoPlayers[1].tag}</p>
                <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-400/15 text-slate-300 border border-slate-400/30">
                  {demoPlayers[1].tier}
                </span>
              </div>
              <div className="mt-5 pt-4 border-t border-white/[0.08] grid grid-cols-2 text-center text-xs">
                <div>
                  <span className="text-[10px] text-[#71717A] uppercase font-bold block">Combat Points</span>
                  <span className="font-extrabold text-white text-sm">{demoPlayers[1].points.toLocaleString()}</span>
                </div>
                <div className="border-l border-white/[0.08]">
                  <span className="text-[10px] text-[#71717A] uppercase font-bold block">Win Rate</span>
                  <span className="font-extrabold text-[#00C878] text-sm">{demoPlayers[1].winRate}</span>
                </div>
              </div>
            </div>

            {/* 1st Place Gold (Center - Elevated) */}
            <div className="order-2 premium-card-amber p-6 lg:p-7 rounded-3xl text-center relative flex flex-col justify-between border-amber-400/50 shadow-2xl shadow-amber-500/20 md:-translate-y-4">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 text-[#0A0D0F] shadow-lg shadow-amber-500/30 flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5" /> #1 Champion
                </span>
              </div>
              <div className="mt-2">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500/30 to-amber-300/30 border-2 border-amber-400/60 flex items-center justify-center mx-auto mb-3 font-black text-2xl text-amber-300 shadow-xl shadow-amber-500/30">
                  <Trophy className="w-10 h-10 text-amber-400" />
                </div>
                <h4 className="text-white font-black text-xl font-heading">{demoPlayers[0].name}</h4>
                <p className="text-xs text-amber-400 font-bold flex items-center justify-center gap-1 mt-0.5">
                  <Flame className="w-3.5 h-3.5 fill-current" /> {demoPlayers[0].tag}
                </p>
                <span className="inline-block mt-2 px-3 py-0.5 rounded-full text-xs font-extrabold bg-amber-400/20 text-amber-300 border border-amber-400/40">
                  {demoPlayers[0].tier}
                </span>
              </div>
              <div className="mt-5 pt-4 border-t border-amber-500/25 grid grid-cols-2 text-center text-xs">
                <div>
                  <span className="text-[10px] text-[#A1A1AA] uppercase font-bold block">Combat Points</span>
                  <span className="font-black text-white text-base">{demoPlayers[0].points.toLocaleString()}</span>
                </div>
                <div className="border-l border-amber-500/25">
                  <span className="text-[10px] text-[#A1A1AA] uppercase font-bold block">Booyahs</span>
                  <span className="font-black text-amber-400 text-base">{demoPlayers[0].booyahs}</span>
                </div>
              </div>
            </div>

            {/* 3rd Place Bronze */}
            <div className="order-3 premium-card p-6 rounded-3xl text-center relative flex flex-col justify-between border-amber-700/30 hover:border-amber-600/50 transition-all duration-200">
              <div>
                <div className="w-9 h-9 rounded-full bg-amber-700/20 text-amber-600 font-black text-xs flex items-center justify-center mx-auto mb-3 border border-amber-700/40 shadow-inner">
                  #3
                </div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-900/30 to-amber-700/20 border border-amber-700/40 flex items-center justify-center mx-auto mb-3 font-black text-lg text-amber-500 shadow-xl shadow-amber-700/10">
                  <Medal className="w-8 h-8 text-amber-600" />
                </div>
                <h4 className="text-white font-bold text-lg font-heading">{demoPlayers[2].name}</h4>
                <p className="text-xs text-[#A1A1AA] font-medium">{demoPlayers[2].tag}</p>
                <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-700/15 text-amber-500 border border-amber-700/30">
                  {demoPlayers[2].tier}
                </span>
              </div>
              <div className="mt-5 pt-4 border-t border-white/[0.08] grid grid-cols-2 text-center text-xs">
                <div>
                  <span className="text-[10px] text-[#71717A] uppercase font-bold block">Combat Points</span>
                  <span className="font-extrabold text-white text-sm">{demoPlayers[2].points.toLocaleString()}</span>
                </div>
                <div className="border-l border-white/[0.08]">
                  <span className="text-[10px] text-[#71717A] uppercase font-bold block">Win Rate</span>
                  <span className="font-extrabold text-[#00C878] text-sm">{demoPlayers[2].winRate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* INTERACTIVE TARGET RANK ROADMAP CALCULATOR               */}
          {/* ======================================================== */}
          <div className="mb-8 p-4 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 relative overflow-hidden">
            <div className="grid lg:grid-cols-12 gap-5 items-center">
              {/* Left Explainer */}
              <div className="lg:col-span-5 space-y-1.5 text-center lg:text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00C878]/15 border border-[#00C878]/30 text-[10px] font-bold text-[#00C878] uppercase tracking-wider">
                  <CheckCircle2 className="w-3 h-3" /> Authoritative Formula
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white font-heading">
                  Target Rank Progression Roadmap
                </h4>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  20 PTS per Booyah finish + 5 PTS per frag kill. See exactly what it takes to reach your next milestone payout.
                </p>
              </div>

              {/* Right Inputs & Calculated Gap Card */}
              <div className="lg:col-span-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="grid grid-cols-2 gap-2 flex-grow">
                  <div>
                    <label className="text-[10px] text-[#A1A1AA] block mb-1 font-semibold uppercase tracking-wider">
                      Current Points
                    </label>
                    <input
                      type="number"
                      value={currentPts}
                      onChange={(e) => setCurrentPts(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full min-h-[40px] bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-white font-bold text-xs sm:text-sm focus:outline-none focus:border-[#00C878] focus:ring-1 focus:ring-[#00C878]/30 transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-[#A1A1AA] block mb-1 font-semibold uppercase tracking-wider">
                      Target Major Tier
                    </label>
                    <select
                      value={simTargetTier}
                      onChange={(e) => setSimTargetTier(e.target.value)}
                      className="w-full min-h-[40px] bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-white font-bold text-xs sm:text-sm focus:outline-none focus:border-[#00C878] focus:ring-1 focus:ring-[#00C878]/30 transition-all cursor-pointer"
                    >
                      {rankTiers.map((t) => (
                        <option key={t.name} value={t.name} className="bg-[#101214] text-white">
                          {t.name} ({t.targetMin} PTS)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Live Output Badge */}
                <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-r from-[#00C878]/15 to-[#00D2FF]/10 border border-[#00C878]/40 sm:min-w-[220px]">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] text-[#A1A1AA] uppercase font-bold tracking-wider">Points Gap</span>
                    <span className="text-xs font-black text-[#00C878]">{progressPercent}% Achieved</span>
                  </div>
                  <div className="text-base sm:text-lg font-black text-white mb-2">
                    {pointsNeeded.toLocaleString()} <span className="text-xs font-semibold text-[#A1A1AA]">PTS Needed</span>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-2">
                    <div
                      className="bg-gradient-to-r from-[#00C878] to-[#00D2FF] h-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  <div className="text-[11px] text-[#A1A1AA] flex items-center justify-between font-medium">
                    <span><strong className="text-white">{booyahsNeeded}</strong> Booyahs</span>
                    <span className="text-[#71717A]">or</span>
                    <span><strong className="text-white">{killsNeeded}</strong> Kills</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* RANKINGS DISPLAY                                         */}
          {/* Mobile (< 768px): Responsive Player Cards (0 overflow)  */}
          {/* Desktop (>= 768px): Luxury Table                         */}
          {/* ======================================================== */}

          {/* Mobile Player Cards (< 768px) */}
          <div className="md:hidden space-y-2.5">
            {filteredPlayers.length === 0 ? (
              <div className="text-center py-8 text-[#A1A1AA] text-xs">
                No players match your search filter.
              </div>
            ) : (
              filteredPlayers.map((player) => (
                <div
                  key={player.rank}
                  className="p-3.5 rounded-2xl bg-white/[0.025] border border-white/10 flex items-center justify-between gap-3 hover:border-[#00C878]/30 transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs flex-shrink-0"
                      style={{
                        backgroundColor: `${player.color}15`,
                        color: player.color,
                        border: `1px solid ${player.color}35`,
                      }}
                    >
                      #{player.rank}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white text-xs sm:text-sm truncate font-heading">{player.name}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00C878] flex-shrink-0" />
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-[#A1A1AA] truncate">{player.tag}</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded font-semibold bg-white/5 text-[#CBD5E1] border border-white/10">
                          {player.tier}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className="text-xs sm:text-sm font-extrabold text-[#00C878]">
                      {player.points.toLocaleString()} <span className="text-[9px] font-medium text-[#A1A1AA]">PTS</span>
                    </div>
                    <div className="text-[10px] text-[#71717A] mt-0.5">
                      {player.booyahs} Wins • {player.winRate}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Desktop Table (>= 768px) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase font-bold text-[#71717A] tracking-wider">
                  <th className="py-3 px-4">Rank</th>
                  <th className="py-3 px-4">Player & Squad</th>
                  <th className="py-3 px-4">Tier Badge</th>
                  <th className="py-3 px-4 text-right">Combat Points</th>
                  <th className="py-3 px-4 text-center">Win Rate</th>
                  <th className="py-3 px-4 text-center">Booyahs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredPlayers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-[#A1A1AA] text-xs">
                      No players match your search filter.
                    </td>
                  </tr>
                ) : (
                  filteredPlayers.map((player) => (
                    <tr key={player.rank} className="hover:bg-white/[0.03] transition-colors group">
                      <td className="py-4 px-4">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs"
                          style={{
                            backgroundColor: `${player.color}15`,
                            color: player.color,
                            border: `1px solid ${player.color}35`,
                          }}
                        >
                          #{player.rank}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xs text-white">
                            {player.avatar}
                          </div>
                          <div>
                            <span className="font-bold text-white block group-hover:text-[#00C878] transition-colors">{player.name}</span>
                            <span className="text-xs text-[#71717A]">{player.tag}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold"
                          style={{
                            backgroundColor: `${player.color}15`,
                            color: player.color,
                            border: `1px solid ${player.color}35`,
                          }}
                        >
                          {player.tier}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right font-extrabold text-white text-base">
                        {player.points.toLocaleString()} <span className="text-xs font-normal text-[#A1A1AA]">PTS</span>
                      </td>
                      <td className="py-4 px-4 text-center font-semibold text-[#00C878]">
                        <span className="inline-block px-2 py-0.5 rounded-full bg-[#00C878]/10 border border-[#00C878]/30 text-xs">
                          {player.winRate}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center font-bold text-white">
                        <span className="inline-flex items-center gap-1">
                          <Crown className="w-3.5 h-3.5 text-amber-400" />
                          {player.booyahs}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Callout */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-[#A1A1AA] text-center sm:text-left leading-relaxed">
              Want to see your squad on the national leaderboard? Download ArenaX and start climbing today.
            </p>
            <button
              onClick={scrollToDownload}
              className="min-h-[44px] bg-[#00C878] hover:bg-[#00A865] active:scale-95 text-[#101214] font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#00C878]/25 transition-all cursor-pointer whitespace-nowrap w-full sm:w-auto border border-[#00C878]/40"
            >
              Download App to Compete
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardTiers;
