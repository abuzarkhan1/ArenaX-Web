import { ShoppingBag, Percent, Award } from 'lucide-react';
import { Button } from './primitives/Button';
import { IconOrb } from './primitives/IconOrb';

export const ScoutRewards = () => {
  const scrollToDownload = () => {
    document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="scout-rewards"
      className="py-[clamp(80px,10vw,140px)] bg-[#121212] border-b border-white/[0.08] relative overflow-hidden"
      aria-label="Community Scout & Digital Store"
    >
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#EDEDED] font-heading">
            Scout & <span className="text-[#3ECF8E]">Store</span>
          </h2>
          <p className="text-base sm:text-lg text-[#A0A0A0] max-w-2xl mt-3 leading-relaxed font-sans font-normal">
            Invite players to earn recurring royalties from their victories, or redeem coins for digital vouchers.
          </p>
        </div>

        {/* ======================================================== */}
        {/* ONE COMPACT CARD PAIR (Scout Left, Store Right)          */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* Card 1: Scout Program (Base Card) */}
          <div className="relative p-6 sm:p-8 rounded-card bg-[#171717] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_48px_-20px_rgba(0,0,0,0.7)] flex flex-col justify-between transition-all duration-200 ease-out hover:-translate-y-1 hover:border-white/[0.14]">
            <div>
              <div className="flex items-center gap-3 pb-4 border-b border-white/[0.08] mb-6">
                <IconOrb icon={Percent} tone="emerald" size="md" />
                <h3 className="text-xl font-bold font-heading text-[#EDEDED]">
                  Scout Community Royalties
                </h3>
              </div>

              {/* 3 Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="p-3.5 rounded-control bg-[#121212]/80 border border-white/[0.08] text-center transition-colors duration-200 hover:border-[#3ECF8E]/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                  <span className="text-xl sm:text-2xl font-extrabold font-mono text-[#3ECF8E] tabular-nums tracking-tight block">
                    25 AX
                  </span>
                  <span className="text-[10px] font-mono text-[#707070] uppercase block mt-1">
                    Starter Gift
                  </span>
                </div>

                <div className="p-3.5 rounded-control bg-[#121212]/80 border border-white/[0.08] text-center transition-colors duration-200 hover:border-[#3ECF8E]/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                  <span className="text-xl sm:text-2xl font-extrabold font-mono text-[#EDEDED] tabular-nums tracking-tight block">
                    2% Cash
                  </span>
                  <span className="text-[10px] font-mono text-[#707070] uppercase block mt-1">
                    Win Royalty
                  </span>
                </div>

                <div className="p-3.5 rounded-control bg-[#121212]/80 border border-white/[0.08] text-center transition-colors duration-200 hover:border-[#3ECF8E]/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                  <span className="text-xl sm:text-2xl font-extrabold font-mono text-[#3ECF8E] tabular-nums tracking-tight block">
                    Tier AX
                  </span>
                  <span className="text-[10px] font-mono text-[#707070] uppercase block mt-1">
                    Rank Bonuses
                  </span>
                </div>
              </div>

              <p className="text-sm text-[#A0A0A0] leading-relaxed mb-6 font-sans font-normal">
                Earn permanent passive royalties every time your referred squadmate or guild member wins a match scrim. Funded 100% from platform rake with zero player deduction.
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.08]">
              <Button variant="primary" size="md" onClick={scrollToDownload}>
                Get Scout Code in App
              </Button>
            </div>
          </div>

          {/* Card 2: Digital Rewards Store (Neutral Card) */}
          <div className="relative p-6 sm:p-8 rounded-card bg-[#171717] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_48px_-20px_rgba(0,0,0,0.7)] flex flex-col justify-between transition-all duration-200 ease-out hover:-translate-y-1 hover:border-white/[0.14]">
            <div>
              <div className="flex items-center gap-3 pb-4 border-b border-white/[0.08] mb-6">
                <IconOrb icon={ShoppingBag} tone="emerald" size="md" />
                <h3 className="text-xl font-bold font-heading text-[#EDEDED]">
                  In-App Digital Rewards
                </h3>
              </div>

              <p className="text-sm text-[#A0A0A0] leading-relaxed mb-6 font-sans font-normal">
                Prefer in-game digital goods over cashouts? Redeem earned AX Coins inside the mobile app:
              </p>

              {/* 3 Digital Items */}
              <div className="space-y-2.5 mb-6 font-mono text-xs">
                <div className="group/row p-3 rounded-control bg-[#121212]/80 border border-white/[0.08] flex justify-between items-center gap-3 transition-[border-color,background-color] duration-200 hover:border-[#3ECF8E]/30 hover:bg-white/[0.02]">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <IconOrb icon={Award} tone="emerald" size="sm" />
                    <span className="text-[#EDEDED] font-bold">Free Fire 100 + 10 Diamonds</span>
                  </div>
                  <span className="text-[#3ECF8E] font-bold tabular-nums tracking-tight whitespace-nowrap">190 AX</span>
                </div>

                <div className="group/row p-3 rounded-control bg-[#121212]/80 border border-white/[0.08] flex justify-between items-center gap-3 transition-[border-color,background-color] duration-200 hover:border-[#3ECF8E]/30 hover:bg-white/[0.02]">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <IconOrb icon={Award} tone="emerald" size="sm" />
                    <span className="text-[#EDEDED] font-bold">Free Fire 520 Diamonds Top-up</span>
                  </div>
                  <span className="text-[#3ECF8E] font-bold tabular-nums tracking-tight whitespace-nowrap">950 AX</span>
                </div>

                <div className="group/row p-3 rounded-control bg-[#121212]/80 border border-white/[0.08] flex justify-between items-center gap-3 transition-[border-color,background-color] duration-200 hover:border-[#3ECF8E]/30 hover:bg-white/[0.02]">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <IconOrb icon={Award} tone="emerald" size="sm" />
                    <span className="text-[#EDEDED] font-bold">Weekly Diamond Membership</span>
                  </div>
                  <span className="text-[#3ECF8E] font-bold tabular-nums tracking-tight whitespace-nowrap">450 AX</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.08]">
              <Button variant="secondary" size="md" onClick={scrollToDownload}>
                Redeem in App
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScoutRewards;
