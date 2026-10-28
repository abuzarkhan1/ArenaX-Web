import { useState } from 'react';
import { Eye, ShieldCheck, Zap, Sliders, CheckCircle, Crosshair } from 'lucide-react';

const AIVisionShowcase = () => {
  const [isBooyah, setIsBooyah] = useState(true);
  const [kills, setKills] = useState(6);

  // Authoritative scoring formula: 20 PTS for Booyah + 5 PTS per kill
  const totalPoints = (isBooyah ? 20 : 0) + kills * 5;

  const getRankBadge = (pts) => {
    if (pts >= 60) return { name: 'Grandmaster Contender', color: '#F59E0B' };
    if (pts >= 40) return { name: 'Heroic Tier', color: '#EF4444' };
    if (pts >= 25) return { name: 'Diamond Tier', color: '#00D2FF' };
    return { name: 'Gold Tier', color: '#00C878' };
  };

  const badge = getRankBadge(totalPoints);

  return (
    <section id="ai-vision" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#101214] border-t border-[#30363A] relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00C878]/10 border border-[#00C878]/30 mb-4">
            <Zap className="w-4 h-4 text-[#00C878]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#00C878]">
              ArenaX Vision Engine
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4 font-heading">
            Zero Disputes. <span className="text-[#00C878]">AI-Verified Results.</span>
          </h2>
          <p className="text-[#A1A1AA] text-lg max-w-2xl mx-auto">
            No more waiting hours for scrim hosts to review screenshots. ArenaX uses proprietary Neural Computer Vision to settle scoreboards automatically within seconds.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: AI OCR Pipeline */}
          <div className="lg:col-span-6 premium-card p-5 sm:p-8 md:p-10 rounded-3xl flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.08]">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00C878]/25 to-[#00C878]/5 flex items-center justify-center border border-[#00C878]/30 shadow-inner">
                  <Eye className="w-6 h-6 text-[#00C878]" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-heading">AI Vision Match Verification Pipeline</h3>
                  <p className="text-xs text-[#71717A]">Sub-second multi-player OCR matching</p>
                </div>
              </div>

              <div className="space-y-3.5 mb-8">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-all flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-lg bg-[#00C878]/20 text-[#00C878] font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#00C878]/30">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Screenshot Submission</h4>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed mt-1">
                      Players submit their end-match Free Fire victory or rank summary screenshot directly within the app.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-all flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-lg bg-[#00C878]/20 text-[#00C878] font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#00C878]/30">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Neural Scoreboard OCR Scanner</h4>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed mt-1">
                      Advanced computer vision scans player in-game names (IGN), UIDs, kill counts, damage, and Booyah status.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-all flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-lg bg-[#00C878]/20 text-[#00C878] font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#00C878]/30">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Automated Winning Wallet Payout</h4>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed mt-1">
                      Scores are tallied instantly against the authoritative rulebook, and cash prizes are credited automatically.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#00C878]/10 border border-[#00C878]/30 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#00C878] flex-shrink-0" />
              <span className="text-xs font-semibold text-[#00C878]">
                Protected against Photoshop tampering, duplicate image re-use, and altered kill numbers.
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Combat Points Calculator */}
          <div className="lg:col-span-6 premium-card-accent p-5 sm:p-8 md:p-10 rounded-3xl shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#00C878]/20">
                <div className="flex items-center gap-2.5">
                  <Sliders className="w-5 h-5 text-[#00C878]" />
                  <h3 className="text-lg sm:text-xl font-bold text-white font-heading">Combat Points Calculator</h3>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-md bg-[#00C878]/20 text-[#00C878] font-bold border border-[#00C878]/30">
                  Official Rulebook
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#A1A1AA] mb-6">
                Official scoring rules: <strong className="text-white">1 Booyah = 20 Points</strong> | <strong className="text-white">1 Kill = 5 Points</strong>. Calculate your expected match rating:
              </p>

              {/* Booyah Toggle */}
              <div className="mb-5 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-white">Match Placement</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${isBooyah ? 'bg-[#00C878]/20 text-[#00C878]' : 'bg-white/10 text-[#A1A1AA]'}`}>
                    {isBooyah ? '+20 Points' : '0 Points'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mt-3">
                  <button
                    onClick={() => setIsBooyah(true)}
                    className={`py-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      isBooyah
                        ? 'bg-[#00C878] text-[#0A0D0F] shadow-lg shadow-[#00C878]/25'
                        : 'bg-white/[0.04] text-[#A1A1AA] border border-white/10 hover:text-white'
                    }`}
                  >
                    <CheckCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                    Booyah (#1 Place)
                  </button>
                  <button
                    onClick={() => setIsBooyah(false)}
                    className={`py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      !isBooyah
                        ? 'bg-white/20 text-white border border-white/30'
                        : 'bg-white/[0.04] text-[#A1A1AA] border border-white/10 hover:text-white'
                    }`}
                  >
                    Top 2–50 Finish
                  </button>
                </div>
              </div>

              {/* Kill Count Slider */}
              <div className="mb-6 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Crosshair className="w-4 h-4 text-[#00C878]" />
                    Kill Tally (5 PTS each)
                  </span>
                  <span className="text-base font-extrabold text-[#00C878]">
                    {kills} Kills ({kills * 5} PTS)
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={kills}
                  aria-label="Match Kill Count"
                  onChange={(e) => setKills(parseInt(e.target.value, 10))}
                  className="w-full h-2.5 bg-[#101214] rounded-lg appearance-none cursor-pointer accent-[#00C878]"
                />
                <div className="flex justify-between text-[11px] text-[#71717A] mt-2 font-medium">
                  <span>0</span>
                  <span>5</span>
                  <span>10</span>
                  <span>15</span>
                  <span>20 Kills</span>
                </div>
              </div>
            </div>

            {/* Total Points Display Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#101214]/90 border border-[#00C878]/40 shadow-2xl">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs uppercase font-bold text-[#A1A1AA] tracking-wider block">
                    Calculated Combat Score
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl md:text-5xl font-black text-white font-heading tracking-tight">
                      {totalPoints}
                    </span>
                    <span className="text-sm font-bold text-[#00C878]">PTS</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] uppercase font-bold text-[#71717A] block">Projected Tier</span>
                  <span className="text-sm font-extrabold" style={{ color: badge.color }}>
                    {badge.name}
                  </span>
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
