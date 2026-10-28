import { Gift, ShoppingBag, Percent, Award, ArrowRight } from 'lucide-react';

const ScoutRewards = () => {
  const scrollToDownload = () => {
    document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="scout-rewards" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#101214] border-t border-[#30363A] relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00C878]/10 border border-[#00C878]/30 mb-4">
            <Gift className="w-4 h-4 text-[#00C878]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#00C878]">
              Community Rewards & Digital Store
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4 font-heading">
            Earn with <span className="text-[#00C878]">Scout Royalties</span> & Digital Store
          </h2>
          <p className="text-[#A1A1AA] text-lg max-w-2xl mx-auto">
            Invite players to your squad or guild. Earn permanent royalties from their victories and redeem accumulated coins for in-game Free Fire Diamonds.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Left Column: Scout Program Breakdown */}
          <div className="lg:col-span-7 premium-card p-5 sm:p-8 md:p-10 rounded-3xl flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.08]">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00C878]/25 to-[#00C878]/5 flex items-center justify-center border border-[#00C878]/30 shadow-inner">
                  <Percent className="w-5 h-5 text-[#00C878]" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-heading">Scout Community Royalty Engine</h3>
                  <p className="text-xs text-[#71717A]">Funded 100% from platform rake with zero player deduction</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-center">
                  <span className="text-2xl font-black text-[#00C878] font-heading block mb-1">25 AX</span>
                  <span className="text-xs font-bold text-white block">Referee Starter Gift</span>
                  <span className="text-[10px] text-[#A1A1AA] mt-1 block">Free starter balance in Play Wallet</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-center">
                  <span className="text-2xl font-black text-[#00D2FF] font-heading block mb-1">2% Cash</span>
                  <span className="text-xs font-bold text-white block">Winner Royalty</span>
                  <span className="text-[10px] text-[#A1A1AA] mt-1 block">Every time your referee wins a match</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-center">
                  <span className="text-2xl font-black text-[#F59E0B] font-heading block mb-1">10,000+</span>
                  <span className="text-xs font-bold text-white block">Tier Milestones</span>
                  <span className="text-[10px] text-[#A1A1AA] mt-1 block">Cash bonuses as referees rank up</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed mb-6">
                Unlike informal referral schemes, ArenaX enforces a mathematical 50% lifetime rake circuit breaker that guarantees platform liquidity and ensures all cashouts remain 100% solvent.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToDownload}
                className="w-full sm:w-auto bg-gradient-to-r from-[#00E58A] to-[#00C878] hover:from-[#00FF9D] hover:to-[#00D982] text-[#0A0D0F] font-black px-6 py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-xl shadow-[#00C878]/20 transition-all cursor-pointer active:scale-[0.98]"
              >
                <span>Get Your Scout Code in App</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Right Column: In-App Digital Top-ups Store Preview */}
          <div className="lg:col-span-5 premium-card-amber p-5 sm:p-8 md:p-10 rounded-3xl flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-amber-500/20">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F59E0B]/25 to-[#F59E0B]/5 flex items-center justify-center border border-[#F59E0B]/30 shadow-inner">
                  <ShoppingBag className="w-5 h-5 text-[#F59E0B]" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-heading">In-App Digital Rewards Store</h3>
                  <p className="text-xs text-[#71717A]">Redeem AX Coins for gaming digital goods</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed mb-6">
                Prefer in-game assets over cashouts? Redeem earned AX Coins directly inside the mobile app store for digital vouchers:
              </p>

              <div className="space-y-3 mb-6">
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2.5">
                    <Award className="w-4 h-4 text-[#00C878]" />
                    <span className="font-bold text-white">Free Fire 100 + 10 Diamonds</span>
                  </div>
                  <span className="text-[#00C878] font-bold">190 AX Coins</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2.5">
                    <Award className="w-4 h-4 text-[#00C878]" />
                    <span className="font-bold text-white">Free Fire 520 Diamonds Top-up</span>
                  </div>
                  <span className="text-[#00C878] font-bold">950 AX Coins</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2.5">
                    <Award className="w-4 h-4 text-[#00D2FF]" />
                    <span className="font-bold text-white">Weekly Diamond Membership</span>
                  </div>
                  <span className="text-[#00D2FF] font-bold">450 AX Coins</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-center">
              <span className="text-xs text-[#A1A1AA]">
                Delivered digitally to your registered player account within 2 hours.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScoutRewards;
