import { useState } from 'react';
import { Sliders, ArrowRight, ScanLine, Wallet, Star } from 'lucide-react';
import { Button } from './primitives/Button';
import { IconOrb } from './primitives/IconOrb';

const CAPABILITY_ICONS = [Sliders, ScanLine, Wallet, Star];

export const OrganizerProgram = () => {
  const [participants, setParticipants] = useState(48);
  const [entryFee, setEntryFee] = useState(100);
  const [hostCutPercent, setHostCutPercent] = useState(10); // 0% to 20%

  // Official formulas
  const totalRevenue = participants * entryFee;
  const adminFee = Math.round(totalRevenue * 0.10); // Fixed 10% platform fee
  const hostEarnings = Math.round(totalRevenue * (hostCutPercent / 100));
  const playerPrizePool = totalRevenue - adminFee - hostEarnings;
  const playerPrizePercent = Math.round((playerPrizePool / (totalRevenue || 1)) * 100);

  const scrollToDownload = () => {
    document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
  };

  const capabilities = [
    {
      num: '01',
      title: 'Full Match & Bracket Customization',
      desc: 'Configure Bermuda or Clash Squad formats with custom player limits, schedules, and brackets.',
    },
    {
      num: '02',
      title: 'Automated Scoreboard Verification',
      desc: 'Computer vision scans match screenshots automatically, eliminating manual score tallying and disputes.',
    },
    {
      num: '03',
      title: 'Dedicated Organizer Wallet',
      desc: 'Earn 0–20% commission on entry fees, segregated from prize pools and withdrawable anytime.',
    },
    {
      num: '04',
      title: 'Verified Participant Ratings',
      desc: 'Build host reputation with authentic verified player ratings from completed tournament matches.',
    },
  ];

  return (
    <section
      id="organizers"
      className="py-[clamp(80px,10vw,140px)] bg-[#121212] border-b border-white/[0.08] relative overflow-hidden"
      aria-label="Organizer Program"
    >
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#EDEDED] font-heading">
            Host & Earn <span className="text-[#3ECF8E]">Commission</span>
          </h2>
          <p className="text-sm sm:text-base text-[#A0A0A0] max-w-2xl mt-2 font-sans font-normal">
            Automated tournament operations with dedicated organizer commissions.
          </p>
        </div>

        {/* ======================================================== */}
        {/* ASYMMETRIC COMPOSITION: List Left, Simulator Right       */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Plain List with Hairlines & Glowing Icon Orbs */}
          <div className="lg:col-span-6 divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {capabilities.map((cap, index) => (
              <div key={cap.num} className="py-6 sm:py-8 group flex items-start gap-4 sm:gap-5">
                <IconOrb
                  icon={CAPABILITY_ICONS[index]}
                  tone="emerald"
                  size="sm"
                  className="mt-1"
                />
                <div className="min-w-0">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="font-mono text-xs font-bold text-[#3ECF8E] tracking-widest tabular-nums">
                      /{cap.num}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold font-heading text-[#EDEDED] transition-colors group-hover:text-[#3ECF8E]">
                      {cap.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[#A0A0A0] leading-relaxed font-normal font-sans">
                    {cap.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Earnings Simulator as the ONE Highlighted Card */}
          <div className="lg:col-span-6 hud-card-highlight relative p-6 sm:p-8 rounded-card bg-[#181a19] border border-[#3ECF8E]/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_36px_-12px_rgba(62,207,142,0.22),0_20px_48px_-20px_rgba(0,0,0,0.8)] space-y-6 transition-all duration-200 ease-out hover:shadow-lift-strong">
            <div className="flex items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <IconOrb icon={Sliders} tone="emerald" size="sm" />
                <h3 className="text-lg font-bold font-heading text-[#EDEDED] uppercase tracking-wider">
                  Host Earnings Simulator
                </h3>
              </div>
            </div>

            {/* Sliders with 48px touch target height */}
            <div className="space-y-5">
              {/* Slider 1: Participants */}
              <div className="p-4 rounded-control bg-[#121212]/80 border border-white/[0.08] hover:border-white/[0.14] transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-[#707070] uppercase font-bold">Lobby Size</span>
                  <span className="text-[#EDEDED] font-bold tracking-tight tabular-nums">{participants} Players</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="48"
                  value={participants}
                  onChange={(e) => setParticipants(parseInt(e.target.value, 10))}
                  aria-label="Tournament participants count"
                  className="w-full h-3 bg-[#171717] rounded-control appearance-none cursor-pointer accent-[#3ECF8E] hover:accent-[#34B27B] border border-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ECF8E]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212]"
                />
                <div className="flex justify-between text-[11px] font-mono text-[#707070] mt-1.5 tracking-tight tabular-nums">
                  <span>10 CS</span>
                  <span>24 Duo</span>
                  <span>48 BR</span>
                </div>
              </div>

              {/* Slider 2: Entry Fee */}
              <div className="p-4 rounded-control bg-[#121212]/80 border border-white/[0.08] hover:border-white/[0.14] transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-[#707070] uppercase font-bold">Entry Fee</span>
                  <span className="text-[#EDEDED] font-bold tracking-tight tabular-nums">{entryFee} AX ({entryFee} PKR)</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="10"
                  value={entryFee}
                  onChange={(e) => setEntryFee(parseInt(e.target.value, 10))}
                  aria-label="Entry fee per player"
                  className="w-full h-3 bg-[#171717] rounded-control appearance-none cursor-pointer accent-[#3ECF8E] hover:accent-[#34B27B] border border-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ECF8E]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212]"
                />
                <div className="flex justify-between text-[11px] font-mono text-[#707070] mt-1.5 tracking-tight tabular-nums">
                  <span>50 PKR</span>
                  <span>200 PKR</span>
                  <span>500 PKR</span>
                </div>
              </div>

              {/* Slider 3: Host Cut */}
              <div className="p-4 rounded-control bg-[#121212]/80 border border-white/[0.08] hover:border-white/[0.14] transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-[#707070] uppercase font-bold">Organizer Cut</span>
                  <span className="text-[#3ECF8E] font-bold tracking-tight tabular-nums">{hostCutPercent}% of Entry Revenue</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={hostCutPercent}
                  onChange={(e) => setHostCutPercent(parseInt(e.target.value, 10))}
                  aria-label="Organizer commission percentage"
                  className="w-full h-3 bg-[#171717] rounded-control appearance-none cursor-pointer accent-[#3ECF8E] hover:accent-[#34B27B] border border-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ECF8E]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212]"
                />
                <div className="flex justify-between text-[11px] font-mono text-[#707070] mt-1.5 tracking-tight tabular-nums">
                  <span>0%</span>
                  <span>10%</span>
                  <span>20%</span>
                </div>
              </div>
            </div>

            {/* Economics Breakdown */}
            <div className="p-4 rounded-control bg-[#121212]/80 border border-white/[0.08] space-y-2 text-xs font-mono tracking-tight shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
              <div className="flex justify-between py-1 border-b border-white/[0.08]">
                <span className="text-[#A0A0A0]">TOTAL REVENUE</span>
                <span className="text-[#EDEDED] font-bold tabular-nums">{totalRevenue.toLocaleString()} PKR</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/[0.08]">
                <span className="text-[#A0A0A0]">PLATFORM FEE (10%)</span>
                <span className="text-[#707070] tabular-nums">{adminFee.toLocaleString()} PKR</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#A0A0A0]">PRIZE POOL ({playerPrizePercent}%)</span>
                <span className="text-[#EDEDED] font-bold tabular-nums">{playerPrizePool.toLocaleString()} PKR</span>
              </div>
            </div>

            {/* Net Host Payout (Manrope 800) */}
            <div className="relative overflow-hidden p-5 rounded-control bg-[#121212] border border-[#3ECF8E]/30 shadow-[inset_0_1px_0_rgba(62,207,142,0.15),0_8px_20px_-8px_rgba(62,207,142,0.2)]">
              <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-[#3ECF8E]/[0.08] blur-[50px]" />
              <div className="relative z-10">
                <span className="text-xs font-mono text-[#3ECF8E] font-bold uppercase tracking-wider block">
                  Net Organizer Payout
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl sm:text-5xl font-extrabold font-heading text-[#EDEDED] tracking-tight tabular-nums">
                    {hostEarnings.toLocaleString()}
                  </span>
                  <span className="text-sm font-mono font-bold text-[#3ECF8E] tracking-tight">PKR / Match</span>
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              fullWidth
              onClick={scrollToDownload}
              icon={<ArrowRight className="w-4 h-4" strokeWidth={1.5} />}
            >
              Apply to Host Scrims
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrganizerProgram;
