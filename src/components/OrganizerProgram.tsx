import { useState } from 'react';
import { Sliders, ArrowRight, ScanLine, Wallet, Star } from 'lucide-react';
import { Pill } from './primitives/Pill';
import { Button } from './primitives/Button';
import { HudCorners } from './primitives/HudCorners';
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
      desc: 'Configure Bermuda or Clash Squad formats, custom player limits (10–48), match schedules, and custom banners in-app.',
    },
    {
      num: '02',
      title: 'Automated Scoreboard Verification',
      desc: 'No manual scoreboard tallying. AI vision scans player match screenshots automatically, eliminating host dispute overhead.',
    },
    {
      num: '03',
      title: 'Dedicated Organizer Wallet',
      desc: 'Earn 0–20% commission on every match hosted. Your organizer earnings are segregated from player prize pools and withdrawable anytime.',
    },
    {
      num: '04',
      title: 'Verified Participant Ratings',
      desc: 'Build your organizer reputation with authentic 1–5 star reviews restricted exclusively to verified players who participated in your scrims.',
    },
  ];

  return (
    <section
      id="organizers"
      className="py-[clamp(80px,10vw,140px)] bg-bg-1 border-b border-line relative overflow-hidden"
      aria-label="Organizer Program"
    >
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <Pill dot={true} label="ORGANIZER PROGRAM" />
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-text-1 font-heading mt-4">
            Host & Earn <span className="text-accent">Commission</span>
          </h2>
          <p className="text-base sm:text-lg text-text-2 max-w-2xl mt-3 leading-relaxed">
            Run competitive Free Fire tournaments with automated AI scoring and dedicated organizer earnings.
          </p>
        </div>

        {/* ======================================================== */}
        {/* ASYMMETRIC COMPOSITION: List Left, Simulator Right       */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Plain List with Hairlines & Glowing Icon Orbs */}
          <div className="lg:col-span-6 divide-y divide-line border-y border-line">
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
                    <span className="font-mono text-xs font-bold text-accent tracking-widest tabular-nums">
                      /{cap.num}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold font-heading text-text-1 transition-colors group-hover:text-accent">
                      {cap.title}
                    </h3>
                  </div>
                  <p className="text-sm text-text-2 leading-relaxed font-normal">
                    {cap.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Earnings Simulator as the ONE Highlighted Card */}
          <div className="lg:col-span-6 hud-card-highlight relative p-6 sm:p-8 rounded-card space-y-6 transition-all duration-200 ease-out hover:shadow-lift-strong">
            <HudCorners tone="emerald" size="md" inset />
            <div className="flex items-center justify-between gap-3 pb-4 border-b border-line">
              <div className="flex items-center gap-3">
                <IconOrb icon={Sliders} tone="emerald" size="sm" />
                <h3 className="text-lg font-bold font-heading text-text-1 uppercase tracking-wider">
                  Host Earnings Simulator
                </h3>
              </div>
              <span className="text-xs font-mono text-text-3 whitespace-nowrap tracking-tight tabular-nums">
                10% Platform Rake
              </span>
            </div>

            {/* Sliders with 48px touch target height */}
            <div className="space-y-5">
              {/* Slider 1: Participants */}
              <div className="p-4 rounded-control bg-bg-1/70 backdrop-blur-sm border border-line transition-colors hover:border-line-strong">
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-text-3 uppercase font-bold">Lobby Size</span>
                  <span className="text-text-1 font-bold tracking-tight tabular-nums">{participants} Players</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="48"
                  value={participants}
                  onChange={(e) => setParticipants(parseInt(e.target.value, 10))}
                  aria-label="Tournament participants count"
                  className="w-full h-3 bg-bg-3 rounded-control appearance-none cursor-pointer accent-accent transition-shadow hover:accent-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-1"
                />
                <div className="flex justify-between text-[11px] font-mono text-text-3 mt-1.5 tracking-tight tabular-nums">
                  <span>10 (CS)</span>
                  <span>24 (Duo)</span>
                  <span>48 (Bermuda)</span>
                </div>
              </div>

              {/* Slider 2: Entry Fee */}
              <div className="p-4 rounded-control bg-bg-1/70 backdrop-blur-sm border border-line transition-colors hover:border-line-strong">
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-text-3 uppercase font-bold">Entry Fee</span>
                  <span className="text-text-1 font-bold tracking-tight tabular-nums">{entryFee} AX ({entryFee} PKR)</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="10"
                  value={entryFee}
                  onChange={(e) => setEntryFee(parseInt(e.target.value, 10))}
                  aria-label="Entry fee per player"
                  className="w-full h-3 bg-bg-3 rounded-control appearance-none cursor-pointer accent-accent transition-shadow hover:accent-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-1"
                />
                <div className="flex justify-between text-[11px] font-mono text-text-3 mt-1.5 tracking-tight tabular-nums">
                  <span>50 PKR (Entry)</span>
                  <span>200 PKR</span>
                  <span>500 PKR (High Stakes)</span>
                </div>
              </div>

              {/* Slider 3: Host Cut */}
              <div className="p-4 rounded-control bg-bg-1/70 backdrop-blur-sm border border-line transition-colors hover:border-line-strong">
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-text-3 uppercase font-bold">Organizer Cut</span>
                  <span className="text-accent font-bold tracking-tight tabular-nums">{hostCutPercent}% of Entry Revenue</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={hostCutPercent}
                  onChange={(e) => setHostCutPercent(parseInt(e.target.value, 10))}
                  aria-label="Organizer commission percentage"
                  className="w-full h-3 bg-bg-3 rounded-control appearance-none cursor-pointer accent-accent transition-shadow hover:accent-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-1"
                />
                <div className="flex justify-between text-[11px] font-mono text-text-3 mt-1.5 tracking-tight tabular-nums">
                  <span>0% (Community)</span>
                  <span>10% (Standard)</span>
                  <span>20% (Max Cut)</span>
                </div>
              </div>
            </div>

            {/* Economics Breakdown */}
            <div className="p-4 rounded-control bg-bg-1/70 backdrop-blur-sm border border-line space-y-2 text-xs font-mono tracking-tight">
              <div className="flex justify-between py-1 border-b border-line">
                <span className="text-text-2">TOTAL REVENUE</span>
                <span className="text-text-1 font-bold tabular-nums">{totalRevenue.toLocaleString()} PKR</span>
              </div>
              <div className="flex justify-between py-1 border-b border-line">
                <span className="text-text-2">PLATFORM FEE (10%)</span>
                <span className="text-text-3 tabular-nums">{adminFee.toLocaleString()} PKR</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-text-2">PRIZE POOL ({playerPrizePercent}%)</span>
                <span className="text-text-1 font-bold tabular-nums">{playerPrizePool.toLocaleString()} PKR</span>
              </div>
            </div>

            {/* Net Host Payout (Outfit 800) */}
            <div className="relative overflow-hidden p-5 rounded-control bg-bg-1 border border-line-accent shadow-glow">
              <div aria-hidden="true" className="ambient-glow -right-10 -top-12 h-40 w-40" />
              <div className="relative z-10">
                <span className="text-xs font-mono text-accent font-bold uppercase tracking-wider block">
                  Net Organizer Payout
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl sm:text-5xl font-extrabold font-heading text-text-1 tracking-tight tabular-nums">
                    {hostEarnings.toLocaleString()}
                  </span>
                  <span className="text-sm font-mono font-bold text-accent tracking-tight">PKR / Match</span>
                </div>
                <p className="text-xs text-text-2 mt-2 leading-normal">
                  Credited directly to your dedicated Organizer Wallet upon match settlement.
                </p>
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
