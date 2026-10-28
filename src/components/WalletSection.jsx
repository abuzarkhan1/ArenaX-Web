import { Wallet, ShieldCheck, Lock, ArrowDownLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const WalletSection = () => {
  return (
    <section id="wallet" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#101214] border-t border-[#30363A] relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00C878]/10 border border-[#00C878]/30 mb-4">
            <Wallet className="w-4 h-4 text-[#00C878]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#00C878]">
              Two-Wallet Financial Security
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4 font-heading">
            Zero Abuse. <span className="text-[#00C878]">Guaranteed Liquidity.</span>
          </h2>
          <p className="text-[#A1A1AA] text-lg max-w-2xl mx-auto">
            ArenaX operates a strict Two-Vault architecture. Tournament entry balances are isolated from verified prize money, guaranteeing transparent payouts at 1 AX = 1 PKR parity.
          </p>
        </div>

        {/* Dual Vault Architecture Cards */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-12">
          {/* Vault 1: Play Wallet */}
          <div className="premium-card-cyan p-5 sm:p-8 rounded-3xl relative overflow-hidden shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-white/[0.08] mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00D2FF]/25 to-[#00D2FF]/5 flex items-center justify-center border border-[#00D2FF]/30 shadow-inner">
                    <ArrowDownLeft className="w-6 h-6 text-[#00D2FF]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white font-heading">Play Wallet</h3>
                    <span className="text-xs text-[#00D2FF] font-semibold">Tournament Registration Balance</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#00D2FF]/15 text-[#00D2FF] border border-[#00D2FF]/30">
                  Non-Withdrawable
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed mb-6">
                Holds funds deposited via JazzCash/EasyPaisa and welcome bonuses. Used strictly to register for Bermuda Battle Royale, Clash Squad brackets, and community tournaments.
              </p>

              <ul className="space-y-3 text-sm text-[#F3F4F6]">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00D2FF] flex-shrink-0" />
                  <span>Instant registration deduction with zero processing surcharge.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00D2FF] flex-shrink-0" />
                  <span>100% automated refund to Play Wallet if match is cancelled.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00D2FF] flex-shrink-0" />
                  <span>P2P coin transfer between squadmates with daily velocity safeguards.</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.08] flex justify-between items-center text-xs text-[#71717A]">
              <span>Minimum Deposit: PKR 50</span>
              <span>Manual Admin Slip Verification</span>
            </div>
          </div>

          {/* Vault 2: Winning Wallet */}
          <div className="premium-card-accent p-5 sm:p-8 rounded-3xl relative overflow-hidden shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-white/[0.08] mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00C878]/25 to-[#00C878]/5 flex items-center justify-center border border-[#00C878]/30 shadow-inner">
                    <ArrowUpRight className="w-6 h-6 text-[#00C878]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white font-heading">Winning Wallet</h3>
                    <span className="text-xs text-[#00C878] font-semibold">1 AX Coin = 1 PKR Cash</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#00C878]/20 text-[#00C878] border border-[#00C878]/40">
                  100% Withdrawable
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed mb-6">
                Holds tournament cash prize winnings, milestone cash bonuses, and Scout royalties. Every coin represents 1 PKR with guaranteed payout within 24 hours.
              </p>

              <ul className="space-y-3 text-sm text-[#F3F4F6]">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00C878] flex-shrink-0" />
                  <span>Direct withdrawal to JazzCash, EasyPaisa, or Pakistani Bank Accounts.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00C878] flex-shrink-0" />
                  <span>Secondary Fund Security Password required before withdrawal authorization.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00C878] flex-shrink-0" />
                  <span>Minimum cashout threshold: 100 AX Coins (PKR 100).</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.08] flex justify-between items-center text-xs text-[#71717A]">
              <span>Payout SLA: Within 24 Hours</span>
              <span>Protected by Cryptographic Escrow</span>
            </div>
          </div>
        </div>

        {/* Local Gateways & Fund Security Strip */}
        <div className="premium-card p-5 sm:p-7 md:p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00C878]/25 to-[#00C878]/5 flex items-center justify-center border border-[#00C878]/30 flex-shrink-0 shadow-inner">
              <Lock className="w-6 h-6 text-[#00C878]" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base font-heading">Secondary Fund Security Password</h4>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Even if someone accesses your mobile device, withdrawals cannot be executed without your private 6-digit cryptographic fund password.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3 w-full md:w-auto justify-center">
            <div className="px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-center flex-1 sm:flex-none min-w-[90px]">
              <span className="text-[10px] text-[#71717A] uppercase font-bold block">Method</span>
              <span className="text-xs font-bold text-white">JazzCash</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-center flex-1 sm:flex-none min-w-[90px]">
              <span className="text-[10px] text-[#71717A] uppercase font-bold block">Method</span>
              <span className="text-xs font-bold text-white">EasyPaisa</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-center flex-1 sm:flex-none min-w-[90px]">
              <span className="text-[10px] text-[#71717A] uppercase font-bold block">Method</span>
              <span className="text-xs font-bold text-white">Bank Payout</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WalletSection;
