import { CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';

const PlatformComparison = () => {
  const points = [
    {
      feature: 'Result & Score Verification',
      arenax: 'Automated ArenaX Vision Engine OCR within seconds',
      others: 'Manual host review, prone to bias and fake screenshots',
    },
    {
      feature: 'Prize Money Protection',
      arenax: 'Two-Wallet isolation & cryptographic escrow',
      others: 'Money held in host personal account; high scam risk',
    },
    {
      feature: 'Withdrawal Speed',
      arenax: 'Guaranteed cashout to JazzCash/EasyPaisa within 24h',
      others: 'Days of delay, ghosting, or arbitrary deduction fees',
    },
    {
      feature: 'Scoring Transparency',
      arenax: 'Fixed authoritative rules (20 PTS Booyah, 5 PTS Kill)',
      others: 'Subjective rules changed mid-tournament by hosts',
    },
    {
      feature: 'Match Cancellation Policy',
      arenax: '100% automated refund directly to source wallet',
      others: 'No refunds provided; players blocked on WhatsApp',
    },
    {
      feature: 'Host Reputation & Accountability',
      arenax: 'Verified 1–5★ ratings restricted to real match participants',
      others: 'Anonymous hosts with zero community accountability',
    },
  ];

  return (
    <section id="comparison" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#101214] border-t border-[#30363A] relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00C878]/10 border border-[#00C878]/30 mb-4">
            <ShieldCheck className="w-4 h-4 text-[#00C878]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#00C878]">
              Platform Transparency
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4 font-heading">
            Why Competitive Players <span className="text-[#00C878]">Trust ArenaX</span>
          </h2>
          <p className="text-[#A1A1AA] text-lg max-w-2xl mx-auto">
            See how ArenaX eliminates the risks, delays, and disputes inherent in unregulated WhatsApp and social media scrims.
          </p>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block premium-card rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/[0.08] bg-white/[0.02] text-xs uppercase font-bold">
                  <th className="py-4 px-6 text-[#71717A]">Evaluation Dimension</th>
                  <th className="py-4 px-6 text-[#00C878] bg-[#00C878]/10 border-x border-[#00C878]/20">
                    ArenaX Official Platform
                  </th>
                  <th className="py-4 px-6 text-[#A1A1AA]">
                    Informal WhatsApp / Social Scrims
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {points.map((pt, index) => (
                  <tr key={index} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6 font-bold text-white text-sm">
                      {pt.feature}
                    </td>
                    <td className="py-4 px-6 bg-[#00C878]/[0.03] border-x border-[#00C878]/15 text-[#F3F4F6] font-medium">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#00C878] flex-shrink-0" />
                        <span>{pt.arenax}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-[#71717A]">
                      <div className="flex items-center gap-2.5">
                        <XCircle className="w-4 h-4 text-[#EF4444] flex-shrink-0" />
                        <span>{pt.others}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Responsive Comparison Cards */}
        <div className="md:hidden space-y-3.5">
          {points.map((pt, index) => (
            <div key={index} className="premium-card p-4 sm:p-5 rounded-2xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#71717A] block">
                {pt.feature}
              </span>
              <div className="p-3 rounded-xl bg-[#00C878]/10 border border-[#00C878]/25 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#00C878] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#00C878] block">ArenaX Official</span>
                  <p className="text-xs text-white font-medium mt-0.5">{pt.arenax}</p>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-[#EF4444] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#71717A] block">Informal Scrims</span>
                  <p className="text-xs text-[#A1A1AA] mt-0.5">{pt.others}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformComparison;
