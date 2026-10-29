import { ShoppingBag, Percent, Award } from 'lucide-react';
import { Pill } from './primitives/Pill';
import { Button } from './primitives/Button';
import { HudCorners, IconOrb } from './primitives';

export const ScoutRewards = () => {
  const scrollToDownload = () => {
    document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="scout-rewards"
      className="py-[clamp(80px,10vw,140px)] bg-bg-1 border-b border-line relative overflow-hidden"
      aria-label="Community Scout & Digital Store"
    >
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <Pill dot={true} label="COMMUNITY REWARDS" />
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-text-1 font-heading mt-4">
            Scout & <span className="text-accent text-glow-accent">Store</span>
          </h2>
          <p className="text-base sm:text-lg text-text-2 max-w-2xl mt-3 leading-relaxed">
            Invite players to earn recurring royalties from their victories, or redeem coins for digital vouchers.
          </p>
        </div>

        {/* ======================================================== */}
        {/* ONE COMPACT CARD PAIR (Scout Left, Store Right)          */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* Card 1: Scout Program (Base Card) */}
          <div className="hud-card relative p-6 sm:p-8 rounded-card flex flex-col justify-between transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-lift">
            <HudCorners tone="emerald" size="sm" inset className="opacity-50" />
            <div>
              <div className="flex items-center gap-3 pb-4 border-b border-line mb-6">
                <IconOrb icon={Percent} tone="emerald" size="md" />
                <h3 className="text-xl font-bold font-heading text-text-1">
                  Scout Community Royalties
                </h3>
              </div>

              {/* 3 Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="p-3.5 rounded-control bg-bg-1/70 border border-line/80 text-center transition-colors duration-200 hover:border-emerald-500/30">
                  <span className="text-xl sm:text-2xl font-extrabold font-mono text-accent tabular-nums tracking-tight text-glow-accent block">
                    25 AX
                  </span>
                  <span className="text-[10px] font-mono text-text-3 uppercase block mt-1">
                    Starter Gift
                  </span>
                </div>

                <div className="p-3.5 rounded-control bg-bg-1/70 border border-line/80 text-center transition-colors duration-200 hover:border-emerald-500/30">
                  <span className="text-xl sm:text-2xl font-extrabold font-mono text-text-1 tabular-nums tracking-tight block">
                    2% Cash
                  </span>
                  <span className="text-[10px] font-mono text-text-3 uppercase block mt-1">
                    Win Royalty
                  </span>
                </div>

                <div className="p-3.5 rounded-control bg-bg-1/70 border border-line/80 text-center transition-colors duration-200 hover:border-emerald-500/30">
                  <span className="text-xl sm:text-2xl font-extrabold font-mono text-accent tabular-nums tracking-tight text-glow-accent block">
                    Tier AX
                  </span>
                  <span className="text-[10px] font-mono text-text-3 uppercase block mt-1">
                    Rank Bonuses
                  </span>
                </div>
              </div>

              <p className="text-sm text-text-2 leading-relaxed mb-6">
                Earn permanent passive royalties every time your referred squadmate or guild member wins a match scrim. Funded 100% from platform rake with zero player deduction.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-line">
              <span className="text-[11px] font-mono text-text-3 tabular-nums block leading-normal">
                Enforced mathematical 50% lifetime platform rake circuit breaker guaranteeing platform solvency.
              </span>
              <Button variant="primary" size="md" onClick={scrollToDownload}>
                Get Scout Code in App
              </Button>
            </div>
          </div>

          {/* Card 2: Digital Rewards Store (Neutral Card) */}
          <div className="hud-card relative p-6 sm:p-8 rounded-card flex flex-col justify-between transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-lift">
            <div>
              <div className="flex items-center gap-3 pb-4 border-b border-line mb-6">
                <IconOrb icon={ShoppingBag} tone="emerald" size="md" />
                <h3 className="text-xl font-bold font-heading text-text-1">
                  In-App Digital Rewards
                </h3>
              </div>

              <p className="text-sm text-text-2 leading-relaxed mb-6">
                Prefer in-game digital goods over cashouts? Redeem earned AX Coins inside the mobile app:
              </p>

              {/* 3 Digital Items */}
              <div className="space-y-2.5 mb-6 font-mono text-xs">
                <div className="group/row p-3 rounded-control bg-bg-1/70 border border-line flex justify-between items-center gap-3 transition-[border-color,background-color] duration-200 hover:border-emerald-500/25 hover:bg-white/[0.03]">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <IconOrb icon={Award} tone="emerald" size="sm" />
                    <span className="text-text-1 font-bold">Free Fire 100 + 10 Diamonds</span>
                  </div>
                  <span className="text-accent font-bold tabular-nums tracking-tight whitespace-nowrap">190 AX</span>
                </div>

                <div className="group/row p-3 rounded-control bg-bg-1/70 border border-line flex justify-between items-center gap-3 transition-[border-color,background-color] duration-200 hover:border-emerald-500/25 hover:bg-white/[0.03]">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <IconOrb icon={Award} tone="emerald" size="sm" />
                    <span className="text-text-1 font-bold">Free Fire 520 Diamonds Top-up</span>
                  </div>
                  <span className="text-accent font-bold tabular-nums tracking-tight whitespace-nowrap">950 AX</span>
                </div>

                <div className="group/row p-3 rounded-control bg-bg-1/70 border border-line flex justify-between items-center gap-3 transition-[border-color,background-color] duration-200 hover:border-emerald-500/25 hover:bg-white/[0.03]">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <IconOrb icon={Award} tone="emerald" size="sm" />
                    <span className="text-text-1 font-bold">Weekly Diamond Membership</span>
                  </div>
                  <span className="text-accent font-bold tabular-nums tracking-tight whitespace-nowrap">450 AX</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-line text-center">
              <span className="text-[11px] font-mono text-text-3 tabular-nums block">
                Digital top-ups delivered to registered player UID within 2 hours.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScoutRewards;
