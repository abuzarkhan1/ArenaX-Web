import { useState } from 'react';
import { UserCheck, Sliders, DollarSign, ArrowRight, ShieldCheck, Star, Settings } from 'lucide-react';

const OrganizerProgram = () => {
  const [participants, setParticipants] = useState(48);
  const [entryFee, setEntryFee] = useState(100);
  const [hostCutPercent, setHostCutPercent] = useState(10); // 0% to 20%

  // Official formulas from settlementService.js
  const totalRevenue = participants * entryFee;
  const adminFee = Math.round(totalRevenue * 0.10); // Fixed 10% platform fee
  const hostEarnings = Math.round(totalRevenue * (hostCutPercent / 100));
  const playerPrizePool = totalRevenue - adminFee - hostEarnings;
  const playerPrizePercent = Math.round((playerPrizePool / totalRevenue) * 100);

  const scrollToDownload = () => {
    document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="organizers" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#101214] border-t border-[#30363A] relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00C878]/10 border border-[#00C878]/30 mb-4">
            <UserCheck className="w-4 h-4 text-[#00C878]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#00C878]">
              Decentralized Organizer Program
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4 font-heading">
            Host, Manage & <span className="text-[#00C878]">Earn as an Organizer</span>
          </h2>
          <p className="text-[#A1A1AA] text-lg max-w-2xl mx-auto">
            Become an official ArenaX tournament host. Control every aspect of your tournaments—from schedules and rules to custom slots and prize distributions—with dedicated organizer wallet earnings.
          </p>
        </div>

        {/* 4 Organizer Capabilities Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          <div className="premium-card p-5 sm:p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#00C878]/25 to-[#00C878]/5 flex items-center justify-center text-[#00C878] font-bold text-sm mb-4 border border-[#00C878]/30 shadow-inner">
                <Settings className="w-5 h-5" />
              </div>
              <h4 className="text-white font-bold text-base mb-2 font-heading">Full Match Control</h4>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Configure Bermuda or Clash Squad formats, custom player limits (10–50), match schedules, and custom banner graphics directly in-app.
              </p>
            </div>
          </div>

          <div className="premium-card p-5 sm:p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#00D2FF]/25 to-[#00D2FF]/5 flex items-center justify-center text-[#00D2FF] font-bold text-sm mb-4 border border-[#00D2FF]/30 shadow-inner">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-white font-bold text-base mb-2 font-heading">Automated AI Verification</h4>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                No manual scoreboard tallying. ArenaX Vision Engine scans match screenshots automatically, eliminating player disputes and host overhead.
              </p>
            </div>
          </div>

          <div className="premium-card p-5 sm:p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#F59E0B]/25 to-[#F59E0B]/5 flex items-center justify-center text-[#F59E0B] font-bold text-sm mb-4 border border-[#F59E0B]/30 shadow-inner">
                <DollarSign className="w-5 h-5" />
              </div>
              <h4 className="text-white font-bold text-base mb-2 font-heading">Dedicated Host Wallet</h4>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Earn 0–20% commission on every match hosted. Your organizer earnings are completely segregated from player prize pools and withdrawable anytime.
              </p>
            </div>
          </div>

          <div className="premium-card p-5 sm:p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#00C878]/25 to-[#00C878]/5 flex items-center justify-center text-[#00C878] font-bold text-sm mb-4 border border-[#00C878]/30 shadow-inner">
                <Star className="w-5 h-5" />
              </div>
              <h4 className="text-white font-bold text-base mb-2 font-heading">Verified Host Ratings</h4>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Build your reputation with authentic 1–5 star reviews restricted exclusively to verified players who participated in your matches.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Organizer Earnings Simulator */}
        <div className="premium-card-accent rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Sliders */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#00C878]/20">
                <div className="flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-[#00C878]" />
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">Interactive Earnings Simulator</h3>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-md bg-[#00C878]/20 text-[#00C878] font-bold border border-[#00C878]/30">
                  Live Calculator
                </span>
              </div>

              <p className="text-sm text-[#A1A1AA]">
                Simulate potential earnings based on official platform rules: <strong className="text-white">10% Platform Fee</strong>, <strong className="text-[#00C878]">0–20% Organizer Cut</strong>, and <strong className="text-[#F59E0B]">70–90% Player Prize Pool</strong>.
              </p>

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] uppercase font-bold text-[#71717A] tracking-wider block mr-1">
                  Presets:
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setParticipants(24);
                    setEntryFee(50);
                    setHostCutPercent(10);
                  }}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 transition-all cursor-pointer"
                >
                  Duo Scrim (24p • 50 AX)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setParticipants(48);
                    setEntryFee(100);
                    setHostCutPercent(15);
                  }}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#00C878]/15 hover:bg-[#00C878]/25 text-[#00C878] border border-[#00C878]/30 transition-all cursor-pointer"
                >
                  Bermuda Major (48p • 100 AX)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setParticipants(48);
                    setEntryFee(500);
                    setHostCutPercent(20);
                  }}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/[0.04] hover:bg-white/[0.08] text-[#F59E0B] border border-[#F59E0B]/30 transition-all cursor-pointer"
                >
                  Pro Grand Slam (48p • 500 AX)
                </button>
              </div>

              {/* Slider 1: Participants */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-white">Participants</span>
                  <span className="text-base font-extrabold text-[#00C878]">{participants} Players</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  value={participants}
                  aria-label="Tournament participants count"
                  onChange={(e) => setParticipants(parseInt(e.target.value, 10))}
                  className="w-full h-2.5 bg-[#101214] rounded-lg appearance-none cursor-pointer accent-[#00C878]"
                />
                <div className="flex justify-between text-[11px] text-[#71717A] mt-1.5 font-medium">
                  <span>10 (Clash Squad)</span>
                  <span>24 (Duo)</span>
                  <span>48–50 (Bermuda BR)</span>
                </div>
              </div>

              {/* Slider 2: Entry Fee */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-white">Entry Fee Per Player</span>
                  <span className="text-base font-extrabold text-[#00C878]">{entryFee} AX ({entryFee} PKR)</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="10"
                  value={entryFee}
                  aria-label="Entry fee per player"
                  onChange={(e) => setEntryFee(parseInt(e.target.value, 10))}
                  className="w-full h-2.5 bg-[#101214] rounded-lg appearance-none cursor-pointer accent-[#00C878]"
                />
                <div className="flex justify-between text-[11px] text-[#71717A] mt-1.5 font-medium">
                  <span>50 PKR (Entry)</span>
                  <span>200 PKR (Mid)</span>
                  <span>500 PKR (High Stakes)</span>
                </div>
              </div>

              {/* Slider 3: Organizer Commission */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-white">Organizer Commission Cut</span>
                  <span className="text-base font-extrabold text-[#00C878]">{hostCutPercent}% of Entry Revenue</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={hostCutPercent}
                  aria-label="Organizer commission percentage"
                  onChange={(e) => setHostCutPercent(parseInt(e.target.value, 10))}
                  className="w-full h-2.5 bg-[#101214] rounded-lg appearance-none cursor-pointer accent-[#00C878]"
                />
                <div className="flex justify-between text-[11px] text-[#71717A] mt-1.5 font-medium">
                  <span>0% (Community Scrim)</span>
                  <span>10% (Standard Host)</span>
                  <span>20% (Maximum Permitted)</span>
                </div>
              </div>
            </div>

            {/* Right Column: Earnings Summary Card */}
            <div className="lg:col-span-5 bg-[#101214]/90 p-5 sm:p-7 md:p-8 rounded-2xl border border-[#00C878]/30 space-y-4 shadow-2xl">
              <span className="text-xs uppercase font-bold text-[#A1A1AA] tracking-wider block">
                Calculated Tournament Economics
              </span>

              <div className="space-y-3 pt-2 text-sm">
                <div className="flex justify-between py-2 border-b border-white/[0.08]">
                  <span className="text-[#A1A1AA]">Total Entry Revenue</span>
                  <span className="text-white font-extrabold">{totalRevenue.toLocaleString()} PKR</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/[0.08]">
                  <span className="text-[#A1A1AA]">Platform Fee (10%)</span>
                  <span className="text-[#71717A] font-semibold">{adminFee.toLocaleString()} PKR</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#30363A]">
                  <span className="text-[#A1A1AA]">Guaranteed Prize Pool ({playerPrizePercent}%)</span>
                  <span className="text-[#F59E0B] font-extrabold">{playerPrizePool.toLocaleString()} PKR</span>
                </div>
              </div>

              {/* Host Net Earnings Box */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-[#00C878]/20 to-[#101214] border border-[#00C878]/40 mt-4">
                <span className="text-xs text-[#00C878] font-bold uppercase tracking-wider block">
                  Your Net Organizer Payout
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl md:text-4xl font-black text-white font-heading">
                    {hostEarnings.toLocaleString()}
                  </span>
                  <span className="text-sm font-bold text-[#00C878]">PKR / Match</span>
                </div>
                <p className="text-[11px] text-[#A1A1AA] mt-2">
                  Credited directly to your dedicated Organizer Wallet immediately upon match settlement.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={scrollToDownload}
                  className="w-full bg-[#00C878] hover:bg-[#00A865] text-[#101214] font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#00C878]/20 transition-all cursor-pointer"
                >
                  Apply to Become an Organizer
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrganizerProgram;
